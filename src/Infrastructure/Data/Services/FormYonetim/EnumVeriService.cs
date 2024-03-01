using Ardalis.Result;
using AutoMapper;
using ITX.Application;
using ITX.Application.Dtos.FormManagement;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.Identity;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.FormManagement;
using ITX.Persistance.Database;
using ITX.Persistance.Database.Context;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using ITX.Infrastructure.Helpers;

namespace ITX.Infrastructure.Data.Services.FormYonetim
{
    public class EnumVeriService : BaseService<EnumVeri, EnumVeriDto>, IEnumVeriService
    {
        public EnumVeriService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<EnumVeri> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {

        }

        public async Task<Result<List<EnumVeriDto>>> GetEnumListAsync(string fType)
        {
            try
            {
                var enumTanimID = SeedData.GetEnumTanimID(fType);
                var sonuc = ApplicationData.EnumVeriList.Where(x => x.EnumTanimId == enumTanimID).OrderBy(x => x.SiraNo).ThenBy(x => x.Deger).ToList();
                //var d = SeedData.GetFormData(enumTanimID);
                //var listForms = await _context.EnumVeris.Where(x => x.EnumTanimId == enumTanimID && x.IsDeleted == false && x.IsActive == true).OrderBy(x => x.SiraNo).ThenBy(x => x.Deger).ToListAsync();
                //var returnList = _mapper.Map<List<EnumVeri>, List<EnumVeriDto>>(listForms);
                return Result<List<EnumVeriDto>>.Success(sonuc);
            }
            catch (Exception ex)
            {
                var bbi = ex.Message;
                return null;
            }
        }

        public async Task<JsonResult> GetEnumListTableAsync(
            DataTableViewModel vm, string fType, bool isActive = true, bool isDeleted = false)
        {
            try
            {
                var enumTanimID = SeedData.GetEnumTanimID(fType);
                var info = ApplicationData.EnumVeriList.Where(x => x.EnumTanimId == enumTanimID).OrderBy(x => x.SiraNo).ThenBy(x => x.Deger).ToList();
                //var d = SeedData.GetFormData(enumTanimID);
                //var listForms = await _context.EnumVeris.Where(x => x.EnumTanimId == enumTanimID && x.IsDeleted == false && x.IsActive == true).OrderBy(x => x.SiraNo).ThenBy(x => x.Deger).ToListAsync();
                //var returnList = _mapper.Map<List<EnumVeri>, List<EnumVeriDto>>(listForms);

                int recordsTotal = info.Count();
                int recordsFiltered = recordsTotal;

                var query = _mapper.Map<List<EnumVeriDto>>(info).AsQueryable();

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
                {
                    query = query.OrderBy($"{vm.SortColumn} {vm.SortColumnDirection}");
                }

                //Search
                if (!string.IsNullOrEmpty(vm.SearchValue))
                {
                    query = query.Where(x =>
                        x.Ad.ToLower().Contains(vm.SearchValue.ToLower()) ||
                        x.Kod.ToLower().Contains(vm.SearchValue.ToLower()) ||
                        x.Deger.ToString().Contains(vm.SearchValue.ToString()) ||
                        x.EnumTanimAd.ToLower().Contains(vm.SearchValue.ToLower())
                        );
                    recordsFiltered = query.Count();
                }

                var pagedData = query.Skip(vm.Skip).Take(vm.PageSize).ToList();

                return new JsonResult(new
                {
                    draw = vm.Draw,
                    recordsFiltered,
                    recordsTotal,
                    data = pagedData
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task<JsonResult> LoadDataTable(
            DataTableViewModel vm, bool isActive = true, bool isDeleted = false)
        {
            try
            {
                var info = _context.EnumVeris.Where(x => x.IsDeleted == isDeleted && x.IsActive == isActive);
                var query = _mapper.Map<List<EnumVeriDto>>(info).AsQueryable();

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
                {
                    query = query.OrderBy($"{vm.SortColumn} {vm.SortColumnDirection}");
                }

                int recordsTotal = query.Count();
                int recordsFiltered = recordsTotal;

                //Search
                if (!string.IsNullOrEmpty(vm.SearchValue))
                {
                    query = query.Where(x =>
                        x.Ad.ToLower().Contains(vm.SearchValue.ToLower()) ||
                        x.Kod.ToLower().Contains(vm.SearchValue.ToLower()) ||
                        x.Deger.ToString().Contains(vm.SearchValue.ToString()) ||
                        x.EnumTanimAd.ToLower().Contains(vm.SearchValue.ToLower())
                        );
                    recordsFiltered = query.Count();
                }

                var pagedData = query.Skip(vm.Skip).Take(vm.PageSize).ToList();

                return new JsonResult(new
                {
                    draw = vm.Draw,
                    recordsFiltered,
                    recordsTotal,
                    data = pagedData
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }
    }
}