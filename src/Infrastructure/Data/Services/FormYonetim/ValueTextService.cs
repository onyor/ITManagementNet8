using Ardalis.Result;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ITX.Application.Dtos.FormManagement;
using ITX.Application.Interfaces.FormYonetim;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.FormManagement;
using ITX.Persistance.Database;
using ITX.Persistance.Database.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using ITX.Application.Interfaces;
using ITX.Infrastructure.Helpers;

namespace ITX.Infrastructure.Data.Services.FormYonetim
{
    public class ValueTextService : BaseService<ValueText, ValueTextDto>, IValueTextService
    {
        private new readonly IMapper _mapper;
        private new readonly ITManagementDbContext _context;

        public ValueTextService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<ValueText> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<Result<ValueTextDto>> Add(ValueTextDto valueTextDto)
        {
            var valueText = _mapper.Map<ValueText>(valueTextDto);
            await _context.ValueTexts.AddAsync(valueText);
            await _context.SaveChangesAsync();
            valueTextDto = _mapper.Map<ValueTextDto>(valueText);
            await FeedApplicationData.InitFormVeri(_context);
            return Result<ValueTextDto>.Success(valueTextDto);
        }
        public Result<ValueTextDto> GetByFormInfo(long formDegerId, long formAlanId)
        {
            ValueText itemToUpdate = _context.ValueTexts.FirstOrDefault(x => x.FormDegerId == formDegerId && x.FormAlanId == formAlanId && x.IsDeleted == false && x.IsActive == true);
            ValueTextDto valueTextDto = _mapper.Map<ValueTextDto>(itemToUpdate);
            return Result<ValueTextDto>.Success(valueTextDto);
        }
        public async Task<Result<ValueTextDto>> Update(ValueTextDto ValueTextDto)
        {
            ValueText itemToUpdate = null;
            if (ValueTextDto.Id > 0)
            {
                itemToUpdate = await GetPrivate(ValueTextDto.Id);
                if (itemToUpdate == null)
                {
                    return await Add(ValueTextDto);
                }
                else
                {
                    itemToUpdate.Deger = ValueTextDto.Deger;
                    await _context.SaveChangesAsync();
                    ValueTextDto = _mapper.Map<ValueTextDto>(itemToUpdate);
                    await FeedApplicationData.InitFormVeri(_context);
                    return Result<ValueTextDto>.Success(ValueTextDto);
                }
            }
            else
                return await Add(ValueTextDto);
        }

        public async Task<bool> Delete(ValueTextDto valueTextDto)
        {
            var itemToUpdate = await GetPrivate(valueTextDto.Id);
            itemToUpdate.IsDeleted = true;
            var result = (await _context.SaveChangesAsync() > 0);
            await FeedApplicationData.InitFormVeri(_context);
            return result;
        }

        public async Task<Result<List<ValueTextDto>>> GetAll(long FormDegerId, bool isActive = true, bool isDeleted = false)
        {
            var listForms = await _context.ValueTexts
                .Where(x => x.FormDegerId == FormDegerId && x.IsDeleted == isDeleted && x.IsActive == isActive)
                .OrderBy(x => x.FormTanimId).ToListAsync();
            var returnList = _mapper.Map<List<ValueText>, List<ValueTextDto>>(listForms);

            return Result<List<ValueTextDto>>.Success(returnList);
        }
        public async Task<Result<List<ValueTextDto>>> GetAllByFormTanimAlanId(long FormTanimId, long FormAlanId)
        {
            var listForms = await _context.ValueTexts
                .Where(x => x.FormTanimId == FormTanimId && x.FormAlanId == FormAlanId)
                .OrderBy(x => x.Deger).ToListAsync();
            var returnList = _mapper.Map<List<ValueText>, List<ValueTextDto>>(listForms);

            return Result<List<ValueTextDto>>.Success(returnList);
        }
        public async Task<Result<ValueTextDto>> Get(long id)
        {
            ValueText itemToUpdate = await GetPrivate(id);
            ValueTextDto valueTextDto = _mapper.Map<ValueTextDto>(itemToUpdate);
            return Result<ValueTextDto>.Success(valueTextDto);
        }
        private async Task<ValueText> GetPrivate(long id)
        {
            return await _context.ValueTexts.FindAsync(id);
        }

        public async Task<JsonResult> LoadDataTable(
            DataTableViewModel vm, bool isActive = true, bool isDeleted = false)
        {
            try
            {
                var info = _context.ValueTexts.Where(x => x.IsDeleted == isDeleted && x.IsActive == isActive);

                var query = info.Select(temp => new
                {
                    ///*  GUNCELLENECEK */
                    Id = temp.Id,
                    Deger = temp.Deger,
                    //Aciklama = temp.Aciklama,
                    //Baslik = temp.Baslik,
                    //NormalizeAd = temp.NormalizeAd,
                    //Statik = temp.Statik
                });

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
                {
                    query = query.OrderBy($"{vm.SortColumn} {vm.SortColumnDirection}");
                }
                int recordsTotal = query.Count();

                //Search
                if (!string.IsNullOrEmpty(vm.SearchValue))
                {
                    ///*  GUNCELLENECEK */
                    //query = query.Where(x =>
                    //    x.Ad.ToLower().Contains(vm.SearchValue.ToLower()) ||
                    //    x.Aciklama.ToLower().Contains(vm.SearchValue.ToLower()) ||
                    //    x.Baslik.ToLower().Contains(vm.SearchValue.ToLower()) ||
                    //    x.NormalizeAd.ToLower().Contains(vm.SearchValue.ToLower()));
                }

                int recordsFiltered = query.Count();
                var data = await query.Skip(vm.Skip).Take(vm.PageSize).ToListAsync();

                return new JsonResult(new
                {
                    draw = vm.Draw,
                    recordsFiltered = recordsFiltered,
                    recordsTotal = recordsTotal,
                    data = query
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }
    }
}
