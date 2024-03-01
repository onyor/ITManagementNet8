using Ardalis.Result;
using AutoMapper;
using ITX.Application.Dtos.FormManagement;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.FormYonetim;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Application.ViewModels;
using ITX.Domain.Entities;
using ITX.Domain.Entities.FormManagement;
using ITX.Domain.Shared.Enums;
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
    public class FormTanimService : BaseService<FormTanim, FormTanimDto>, IFormTanimService
    {
        private new readonly IMapper _mapper;
        private new readonly ITManagementDbContext _context;

        public FormTanimService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<FormTanim> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {
            _mapper = mapper;
            _context = context;
        }

        public new async Task<Result<FormTanimDto>> AddAsync(FormTanimDto formTanimDto)
        {
            var formTanim = _mapper.Map<FormTanim>(formTanimDto);
            await _context.FormTanims.AddAsync(formTanim);
            await _context.SaveChangesAsync();
            formTanimDto = _mapper.Map<FormTanimDto>(formTanim);

            return Result<FormTanimDto>.Success(formTanimDto);
        }

        public new async Task<Result<FormTanimDto>> UpdateAsync(FormTanimDto formTanimDto)
        {
            FormTanim itemToUpdate = await GetPrivateAsync(formTanimDto.Id);
            if (itemToUpdate == null)
            {
                return Result<FormTanimDto>.NotFound();
            }

            itemToUpdate.Ad = formTanimDto.Ad;
            itemToUpdate.Aciklama = formTanimDto.Aciklama;
            itemToUpdate.Baslik = formTanimDto.Baslik;
            itemToUpdate.NormalizeAd = formTanimDto.NormalizeAd;
            itemToUpdate.Statik = formTanimDto.Statik;

            await _context.SaveChangesAsync();
            formTanimDto = _mapper.Map<FormTanimDto>(itemToUpdate);

            return Result<FormTanimDto>.Success(formTanimDto);
        }

        public async Task<bool> DeleteAsync(FormTanimDto formTanimDto)
        {
            var itemToUpdate = await GetPrivateAsync(formTanimDto.Id);

            if (itemToUpdate != null)
            {
                var formAlans = await _context.FormAlans.Where(x => x.FormTanimId == itemToUpdate.Id).ToListAsync();
                if (formAlans != null)
                {
                    foreach (var alanItem in formAlans)
                    {
                        var veriTip = alanItem.VeriTip;

                        var formDegers = await _context.FormDegers.Where(x => x.FormTanimId == itemToUpdate.Id).ToListAsync();
                        if (formDegers != null)
                        {
                            foreach (var degerItem in formDegers)
                            {
                                degerItem.IsDeleted = true;
                            }
                        }

                        IEnumerable<BaseEntity<long>> degerList;
                        switch (veriTip)
                        {
                            case EnmVeriTip.Text:
                                degerList = await _context.ValueTexts.Where(x => x.FormTanimId == itemToUpdate.Id).ToListAsync();
                                break;
                            case EnmVeriTip.Number:
                                degerList = await _context.ValueNumbers.Where(x => x.FormTanimId == itemToUpdate.Id).ToListAsync();
                                break;
                            case EnmVeriTip.Date:
                                degerList = await _context.DegerTarihs.Where(x => x.FormTanimId == itemToUpdate.Id).ToListAsync();
                                break;
                            default:
                                degerList = new List<BaseEntity<long>>();
                                break;
                        }
                        if (degerList != null)
                        {
                            foreach (var degerItem in degerList)
                            {
                                degerItem.IsDeleted = true;
                            }
                        }

                        alanItem.IsDeleted = true;
                    }
                }
            }

            itemToUpdate.IsDeleted = true;

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Result<List<FormAlanDto>>> LoadDataColAsync(long formTanimId)
        {
            try
            {
                var listForms = await _context.FormAlans
                    .Where(x => x.FormTanimId == formTanimId && !x.IsDeleted && x.TabloSira > 0)
                    .OrderBy(x => x.TabloSira).ToListAsync();
                var returnList = _mapper.Map<List<FormAlan>, List<FormAlanDto>>(listForms);

                return Result<List<FormAlanDto>>.Success(returnList);
            }
            catch (Exception ex)
            {
                return Result<List<FormAlanDto>>.Error(ex.Message);
            }
        }

        public async Task<Result<List<FormTanimDto>>> GetAllAsync(bool isActive = true, bool isDeleted = false)
        {
            try
            {
                var listForms = await _context.FormTanims
                    .Where(x => x.IsDeleted == isDeleted && x.IsActive == isActive)
                    .OrderBy(x => x.Ad).ToListAsync();
                var returnList = _mapper.Map<List<FormTanim>, List<FormTanimDto>>(listForms);

                return Result<List<FormTanimDto>>.Success(returnList);
            }
            catch (Exception ex)
            {
                return Result<List<FormTanimDto>>.Error(ex.Message);
            }
        }

        public async Task<Result<FormTanimDto>> GetAsync(long id)
        {
            FormTanim itemToUpdate = await GetPrivateAsync(id);
            FormTanimDto formTanimDto = _mapper.Map<FormTanimDto>(itemToUpdate);

            return Result<FormTanimDto>.Success(formTanimDto);
        }

        public async Task<Result<FormTanimDto>> GetByNormalizeAdAsync(string NormalizeAd)
        {
            FormTanim itemToUpdate = await _context.FormTanims.Where(x => x.NormalizeAd == NormalizeAd).FirstOrDefaultAsync();
            FormTanimDto formTanimDto = _mapper.Map<FormTanimDto>(itemToUpdate);

            return Result<FormTanimDto>.Success(formTanimDto);
        }

        private async Task<FormTanim> GetPrivateAsync(long id)
        {
            return await _context.FormTanims.FindAsync(id);
        }

        public async Task<JsonResult> LoadDataTableAsync(
            DataTableViewModel vm, bool isActive = true, bool isDeleted = false)
        {
            try
            {
                var FormTanimList = _context.FormTanims.Where(x => x.IsActive && !x.IsDeleted);
                int recordsTotal = FormTanimList.Count();
                int recordsFiltered = recordsTotal;

                var FormTanimData = FormTanimList.Select(temp => new
                {
                    Id = temp.Id,
                    Ad = temp.Ad,
                    Aciklama = temp.Aciklama,
                    Baslik = temp.Baslik,
                    NormalizeAd = temp.NormalizeAd,
                    Statik = temp.Statik
                });

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
                {
                    FormTanimData = FormTanimData.OrderBy($"{vm.SortColumn} {vm.SortColumnDirection}");
                }

                //Search
                if (!string.IsNullOrEmpty(vm.SearchValue))
                {
                    FormTanimData = FormTanimData.Where(m =>
                    m.Id.Equals(vm.SearchValue) ||
                        m.Ad.ToLower().Contains(vm.SearchValue.ToLower()) ||
                        m.Baslik.ToLower().Contains(vm.SearchValue.ToLower()) ||
                        m.Aciklama.ToLower().Contains(vm.SearchValue.ToLower()) ||
                        m.NormalizeAd.ToLower().Contains(vm.SearchValue.ToLower()));
                    recordsFiltered = FormTanimData.Count();
                }

                var data = FormTanimData.Skip(vm.Skip).Take(vm.PageSize);

                return new JsonResult(new
                {
                    draw = vm.Draw,
                    recordsFiltered = recordsFiltered,
                    recordsTotal = recordsTotal,
                    data = data
                });

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
