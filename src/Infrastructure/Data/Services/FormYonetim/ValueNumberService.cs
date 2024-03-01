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
    public class ValueNumberService : BaseService<ValueNumber, ValueNumberDto>, IValueNumberService
    {
        private new readonly IMapper _mapper;
        private new readonly ITManagementDbContext _context;

        public ValueNumberService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<ValueNumber> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<Result<ValueNumberDto>> Add(ValueNumberDto valueNumberDto)
        {
            Result<ValueNumberDto> result = new Result<ValueNumberDto>(null);
            try
            {
                var valueNumber = _mapper.Map<ValueNumber>(valueNumberDto);
                await _context.ValueNumbers.AddAsync(valueNumber);
                await _context.SaveChangesAsync();
                valueNumberDto = _mapper.Map<ValueNumberDto>(valueNumber);
                await FeedApplicationData.InitFormVeri(_context);

            }
            catch (Exception ex)
            {
                return Result<ValueNumberDto>.Error(ex.Message);
            }
            return Result<ValueNumberDto>.Success(valueNumberDto);
        }

        public async Task<Result<ValueNumberDto>> Update(ValueNumberDto valueNumberDto)
        {
            ValueNumber itemToUpdate = null;
            if (valueNumberDto.Id > 0)
            {
                itemToUpdate = await GetPrivate(valueNumberDto.Id);
                if (itemToUpdate == null)
                {
                    return await Add(valueNumberDto);
                }
                else
                {
                    itemToUpdate.Deger = valueNumberDto.Deger;
                    await _context.SaveChangesAsync();
                    valueNumberDto = _mapper.Map<ValueNumberDto>(itemToUpdate);
                    await FeedApplicationData.InitFormVeri(_context);
                    return Result<ValueNumberDto>.Success(valueNumberDto);
                }
            }
            else
                return await Add(valueNumberDto);
        }
        public async Task<Result<List<ValueNumberDto>>> GetAllByFormTanimAlanId(long FormTanimId, long FormAlanId)
        {
            var listForms = await _context.ValueNumbers
                .Where(x => x.FormTanimId == FormTanimId && x.FormAlanId == FormAlanId)
                .OrderBy(x => x.Deger).ToListAsync();
            var returnList = _mapper.Map<List<ValueNumber>, List<ValueNumberDto>>(listForms);

            return Result<List<ValueNumberDto>>.Success(returnList);
        }
        public async Task<bool> Delete(ValueNumberDto valueNumberDto)
        {
            var itemToUpdate = await GetPrivate(valueNumberDto.Id);
            itemToUpdate.IsDeleted = true;
            var result = (await _context.SaveChangesAsync() > 0);
            await FeedApplicationData.InitFormVeri(_context);
            return result;
        }

        public async Task<Result<List<ValueNumberDto>>> GetAll(long FormDegerId, bool isActive = true, bool isDeleted = false)
        {
            var listForms = await _context.ValueNumbers
                 .Where(x => x.FormDegerId == FormDegerId && x.IsDeleted == isDeleted && x.IsActive == isActive)
                .OrderBy(x => x.FormTanimId).ToListAsync();
            var returnList = _mapper.Map<List<ValueNumber>, List<ValueNumberDto>>(listForms);

            return Result<List<ValueNumberDto>>.Success(returnList);
        }
        public async Task<Result<ValueNumberDto>> Get(long id)
        {
            ValueNumber itemToUpdate = await GetPrivate(id);
            ValueNumberDto valueNumberDto = _mapper.Map<ValueNumberDto>(itemToUpdate);
            return Result<ValueNumberDto>.Success(valueNumberDto);
        }
        public Result<ValueNumberDto> GetByFormInfo(long formDegerId, long formAlanId)
        {
            ValueNumber itemToUpdate = _context.ValueNumbers.FirstOrDefault(x => x.FormDegerId == formDegerId && x.FormAlanId == x.FormAlanId && x.IsDeleted == false && x.IsActive == true);
            ValueNumberDto valueNumberDto = _mapper.Map<ValueNumberDto>(itemToUpdate);
            return Result<ValueNumberDto>.Success(valueNumberDto);
        }
        private async Task<ValueNumber> GetPrivate(long id)
        {
            return await _context.ValueNumbers.FindAsync(id);
        }

        public async Task<JsonResult> LoadDataTable(
            DataTableViewModel vm, bool isActive = true, bool isDeleted = false)
        {
            try
            {
                var info = _context.ValueNumbers.Where(x => x.IsDeleted == isDeleted && x.IsActive == isActive);

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
