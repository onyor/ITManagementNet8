using Ardalis.Result;
using AutoMapper;
using ITX.Application.Dtos.FormManagement;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.FormYonetim;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.FormManagement;
using ITX.Infrastructure.Helpers;
using ITX.Persistance.Database;
using ITX.Persistance.Database.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using ITX.Infrastructure.Helpers;

namespace ITX.Infrastructure.Data.Services.FormYonetim
{
    public class DegerTarihService : BaseService<DegerTarih, DegerTarihDto>, IDegerTarihService
    {
        public DegerTarihService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<DegerTarih> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {

        }

        public Result<DegerTarihDto> GetByFormInfo(long formDegerId, long formAlanId)
        {
            DegerTarih itemToUpdate = _context.DegerTarihs.FirstOrDefault(x => x.FormDegerId == formDegerId && x.FormAlanId == x.FormAlanId && x.IsDeleted == false && x.IsActive == true);
            DegerTarihDto DegerTarihDto = _mapper.Map<DegerTarihDto>(itemToUpdate);
            return Result<DegerTarihDto>.Success(DegerTarihDto);
        }

        public async Task<Result<DegerTarihDto>> Add(DegerTarihDto degerTarihDto)
        {
            var degerTarih = _mapper.Map<DegerTarih>(degerTarihDto);
            await _context.DegerTarihs.AddAsync(degerTarih);
            await _context.SaveChangesAsync();
            degerTarihDto = _mapper.Map<DegerTarihDto>(degerTarih);
            await FeedApplicationData.InitFormVeri(_context);
            return Result<DegerTarihDto>.Success(degerTarihDto);
        }

        public async Task<Result<List<DegerTarihDto>>> GetAllByFormTanimAlanId(long FormTanimId, long FormAlanId)
        {
            var listForms = await _context.DegerTarihs
                .Where(x => x.FormTanimId == FormTanimId && x.FormAlanId == FormAlanId)
                .OrderBy(x => x.Deger).ToListAsync();
            var returnList = _mapper.Map<List<DegerTarih>, List<DegerTarihDto>>(listForms);

            return Result<List<DegerTarihDto>>.Success(returnList);
        }
        public async Task<Result<DegerTarihDto>> Update(DegerTarihDto DegerTarihDto)
        {
            DegerTarih itemToUpdate = null;
            if (DegerTarihDto.Id > 0)
            {
                itemToUpdate = await GetPrivate(DegerTarihDto.Id);
                if (itemToUpdate == null)
                {
                    return await Add(DegerTarihDto);
                }
                else
                {
                    itemToUpdate.Deger = DegerTarihDto.Deger;
                    await _context.SaveChangesAsync();
                    DegerTarihDto = _mapper.Map<DegerTarihDto>(itemToUpdate);
                    await FeedApplicationData.InitFormVeri(_context);
                    return Result<DegerTarihDto>.Success(DegerTarihDto);
                }
            }
            else
                return await Add(DegerTarihDto);
        }

        public async Task<bool> Delete(DegerTarihDto degerTarihDto)
        {
            var itemToUpdate = await GetPrivate(degerTarihDto.Id);
            itemToUpdate.IsDeleted = true;
            var result = (await _context.SaveChangesAsync() > 0);
            await FeedApplicationData.InitFormVeri(_context);
            return result;
        }

        public async Task<Result<List<DegerTarihDto>>> GetAll(long FormDegerId, bool isActive = true, bool isDeleted = false)
        {
            var listForms = await _context.DegerTarihs
                 .Where(x => x.FormDegerId == FormDegerId && x.IsDeleted == isDeleted && x.IsActive == isActive)
                .OrderBy(x => x.FormTanimId).ToListAsync();
            var returnList = _mapper.Map<List<DegerTarih>, List<DegerTarihDto>>(listForms);

            return Result<List<DegerTarihDto>>.Success(returnList);
        }

        public async Task<Result<DegerTarihDto>> Get(long id)
        {
            DegerTarih itemToUpdate = await GetPrivate(id);
            DegerTarihDto degerTarihDto = _mapper.Map<DegerTarihDto>(itemToUpdate);
            return Result<DegerTarihDto>.Success(degerTarihDto);
        }

        private async Task<DegerTarih> GetPrivate(long id)
        {
            return await _context.DegerTarihs.FindAsync(id);
        }

        public async Task<JsonResult> LoadDataTable(
            DataTableViewModel vm, bool isActive = true, bool isDeleted = false)
        {
            try
            {
                var info = _context.DegerTarihs.Where(x => x.IsDeleted == isDeleted && x.IsActive == isActive);

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
