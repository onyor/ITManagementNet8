using Ardalis.Result;
using AutoMapper;
using ITX.Application.Dtos.FormManagement;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.FormYonetim;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.FormManagement;
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
    public class FormAlanService : BaseService<FormAlan, FormAlanDto>, IFormAlanService
    {
        private new readonly IMapper _mapper;
        private new readonly ITManagementDbContext _context;

        public FormAlanService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<FormAlan> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {
            _mapper = mapper;
            _context = context;
        }

        public new async Task<Result<FormAlanDto>> AddAsync(FormAlanDto formAlanDto)
        {
            try
            {
                var formAlan = _mapper.Map<FormAlan>(formAlanDto);
                await _context.FormAlans.AddAsync(formAlan);
                await _context.SaveChangesAsync();
                formAlanDto = _mapper.Map<FormAlanDto>(formAlan);
                return Result<FormAlanDto>.Success(formAlanDto);
            }
            catch (Exception ex)
            {

                return Result<FormAlanDto>.Error(ex.Message);
            }


        }

        public new async Task<Result<FormAlanDto>> UpdateAsync(FormAlanDto formAlanDto)
        {

            FormAlan itemToUpdate = await GetPrivateAsync(formAlanDto.Id);
            if (itemToUpdate == null)
            {
                return Result<FormAlanDto>.NotFound();
            }

            itemToUpdate.Ad = formAlanDto.Ad;
            itemToUpdate.Aciklama = formAlanDto.Aciklama;
            itemToUpdate.Etiket = formAlanDto.Etiket;
            itemToUpdate.Ipucu = formAlanDto.Ipucu;
            itemToUpdate.MaxDeger = formAlanDto.MaxDeger;
            itemToUpdate.MinDeger = formAlanDto.MinDeger;
            itemToUpdate.OzelStil = formAlanDto.OzelStil;
            itemToUpdate.SatirSira = formAlanDto.SatirSira;
            itemToUpdate.SutunSira = formAlanDto.SutunSira;
            itemToUpdate.SutunGenislik = formAlanDto.SutunGenislik;
            itemToUpdate.Tanimlayici = formAlanDto.Tanimlayici;
            itemToUpdate.UstId = formAlanDto.UstId;
            itemToUpdate.VarsayilanDeger = formAlanDto.VarsayilanDeger;
            itemToUpdate.VeriListe = formAlanDto.VeriListe;
            itemToUpdate.TabloSira = formAlanDto.TabloSira;
            itemToUpdate.VeriTip = formAlanDto.VeriTip;

            await _context.SaveChangesAsync();
            formAlanDto = _mapper.Map<FormAlanDto>(itemToUpdate);
            return Result<FormAlanDto>.Success(formAlanDto);
        }

        public async Task<bool> DeleteAsync(FormAlanDto formAlanDto)
        {
            var itemToUpdate = await GetPrivateAsync(formAlanDto.Id);
            itemToUpdate.IsDeleted = true;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Result<List<FormAlanDto>>> GetAllAsync(long ustId, bool isActive = true, bool isDeleted = false)
        {
            var listForms = await _context.FormAlans
                .Where(x => x.FormTanimId == ustId && x.IsDeleted == isDeleted && x.IsActive == isActive)
                .OrderBy(x => x.SatirSira).ThenBy(x => x.SutunSira).ToListAsync();
            var returnList = _mapper.Map<List<FormAlan>, List<FormAlanDto>>(listForms);

            return Result<List<FormAlanDto>>.Success(returnList);
        }

        public async Task<Result<FormAlanDto>> GetByFormTanimIdWithName(long formTanimId, string colAd)
        {
            FormAlan itemToUpdate = await _context.FormAlans.Where(x => x.FormTanimId == formTanimId && x.Ad == colAd).FirstOrDefaultAsync();
            FormAlanDto formAlanDto = _mapper.Map<FormAlanDto>(itemToUpdate);
            return Result<FormAlanDto>.Success(formAlanDto);
        }
        public async Task<Result<FormAlanDto>> GetAsync(long id)
        {
            FormAlan itemToUpdate = await GetPrivateAsync(id);
            FormAlanDto formAlanDto = _mapper.Map<FormAlanDto>(itemToUpdate);
            return Result<FormAlanDto>.Success(formAlanDto);
        }
        private async Task<FormAlan> GetPrivateAsync(long id)
        {
            return await _context.FormAlans.FindAsync(id);
        }

        public async Task<JsonResult> LoadDataTableAsync(
            DataTableViewModel vm, bool isActive = true, bool isDeleted = false)
        {
            try
            {
                var queryAll = _context.FormAlans.Where(x => x.IsDeleted == isDeleted && x.IsActive == isActive && x.FormTanimId == vm.UstId);
                int recordsTotal = await queryAll.CountAsync();
                int recordsFiltered = recordsTotal;

                var query = queryAll.Select(temp => new
                {
                    Id = temp.Id,
                    Ad = temp.Ad,
                    Aciklama = temp.Aciklama,
                    Etiket = temp.Etiket,
                    Ipucu = temp.Ipucu,
                    MaxDeger = temp.MaxDeger,
                    MinDeger = temp.MinDeger,
                    OzelStil = temp.OzelStil,
                    SatirSira = temp.SatirSira,
                    SutunSira = temp.SutunSira,
                    SutunGenislik = temp.SutunGenislik,
                    Tanimlayici = temp.Tanimlayici,
                    UstId = temp.UstId,
                    VarsayilanDeger = temp.VarsayilanDeger,
                    VeriListe = temp.VeriListe,
                    VeriTip = temp.VeriTip,
                    TabloSira = temp.TabloSira
                });

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
                        x.Aciklama.ToLower().Contains(vm.SearchValue.ToLower()));

                    recordsFiltered = await query.CountAsync();
                }

                var data = await query.Skip(vm.Skip).Take(vm.PageSize).ToListAsync();

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
                throw new Exception(ex.ToString());
            }
        }
    }
}
