using Ardalis.Result;
using AutoMapper;
using ITX.Application;
using ITX.Application.Dtos.FormManagement;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.FormYonetim;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.FormManagement;
using ITX.Persistance.Database;
using ITX.Persistance.Database.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using ITX.Infrastructure.Helpers;

namespace ITX.Infrastructure.Data.Services.FormYonetim
{
    public class FormDegerService : BaseService<FormDeger, FormDegerDto>, IFormDegerService
    {
        private new readonly IMapper _mapper;
        private new readonly ITManagementDbContext _context;

        public FormDegerService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<FormDeger> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {
            _mapper = mapper;
            _context = context;
        }

        public new async Task<Result<FormDegerDto>> AddAsync(FormDegerDto formDegerDto)
        {
            Result<FormDegerDto> result = new Result<FormDegerDto>(null);
            try
            {
                var formDeger = _mapper.Map<FormDeger>(formDegerDto);
                await _context.FormDegers.AddAsync(formDeger);
                await _context.SaveChangesAsync();
                formDegerDto = _mapper.Map<FormDegerDto>(formDeger);

            }
            catch (Exception ex)
            {

                return Result<FormDegerDto>.Error(ex.Message);
            }

            return Result<FormDegerDto>.Success(formDegerDto);
        }

        public new async Task<Result<FormDegerDto>> UpdateAsync(FormDegerDto formDegerDto)
        {
            FormDeger itemToUpdate = await GetPrivateAsync(formDegerDto.Id);
            if (itemToUpdate == null)
            {
                return Result<FormDegerDto>.NotFound();
            }

            ///*  GUNCELLENECEK */
            itemToUpdate.FormTanimId = formDegerDto.FormTanimId;


            await _context.SaveChangesAsync();
            formDegerDto = _mapper.Map<FormDegerDto>(itemToUpdate);

            return Result<FormDegerDto>.Success(formDegerDto);
        }

        public async Task<bool> DeleteAsync(FormDegerDto formDegerDto)
        {
            var itemToUpdate = await GetPrivateAsync(formDegerDto.Id);
            itemToUpdate.IsDeleted = true;
            return await _context.SaveChangesAsync() > 0;

        }

        public async Task<Result<List<FormDegerDto>>> GetAllAsync(bool isActive = true, bool isDeleted = false)
        {
            var listForms = await _context.FormDegers
                .Where(x => x.IsDeleted == isDeleted && x.IsActive == isActive)
                .OrderBy(x => x.FormTanimId).ToListAsync();
            var returnList = _mapper.Map<List<FormDeger>, List<FormDegerDto>>(listForms);

            return Result<List<FormDegerDto>>.Success(returnList);
        }
        public async Task<Result<FormDegerDto>> GetAsync(long id)
        {
            FormDeger itemToUpdate = await GetPrivateAsync(id);
            FormDegerDto formDegerDto = _mapper.Map<FormDegerDto>(itemToUpdate);
            return Result<FormDegerDto>.Success(formDegerDto);
        }
        public async Task<Result<List<FormDegerDto>>> GetByFormTanimIdAsync(long FormTanimId)
        {
            List<FormDeger> itemToUpdate = await _context.FormDegers.Where(x => x.FormTanimId == FormTanimId).ToListAsync();
            List<FormDegerDto> formDegerDto = _mapper.Map<List<FormDegerDto>>(itemToUpdate);
            return Result<List<FormDegerDto>>.Success(formDegerDto);
        }
        private async Task<FormDeger> GetPrivateAsync(long id)
        {
            return await _context.FormDegers.FindAsync(id);
        }

        public async Task<JsonResult> LoadDataTableAsync(
            DataTableViewModel vm, bool isActive = true, bool isDeleted = false)
        {
            await FeedApplicationData.InitFormVeri(_context);
            try
            {
                var query = new List<object>();
                var degerList = ApplicationData.FormDataList.Where(x => x.FormTanimId == vm.UstId);
                var groupedList = degerList.GroupBy(x => x.FormDegerId);
                foreach (var item in groupedList)
                {
                    bool addVeriModel = false;
                    var veriModel = new ExpandoObject() as IDictionary<string, Object>;
                    veriModel.Add("id", item.Key);
                    foreach (var snglItem in item)
                    {
                        veriModel.Add(char.ToLower(snglItem.FormAlanAd[0]) + snglItem.FormAlanAd.Substring(1), snglItem.DegerBilgi);
                        if (string.IsNullOrEmpty(vm.SearchValue))
                        {
                            addVeriModel = true;
                        }
                        else
                        {
                            if (snglItem.DegerBilgi.ToLower().Contains(vm.SearchValue.ToLower()))
                                addVeriModel = true;

                        }
                        if (item.Key.ToString() == vm.SearchValue)
                            addVeriModel = true;
                    }
                    if (addVeriModel)
                        query.Add(veriModel);
                }


                if (query.Count == 0)
                {
                    var veriModel = new ExpandoObject() as IDictionary<string, Object>;
                    veriModel.Add("Ad", "Görüntülenecek Veri Yok");
                    query.Add(veriModel);

                }
                int recordsTotal = query.Count;



                int recordsFiltered = query.Count();
                var data = query.Skip(vm.Skip).Take(vm.PageSize).ToList();
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

        public async Task<JsonResult> SimpleLoadDataTableAsync(
            DataTableViewModel vm, bool isActive = true, bool isDeleted = false)
        {
            try
            {
                var query = new List<FormDataViewModel>();
                var degerList = ApplicationData.FormDataList.Where(x => x.FormTanimId == vm.UstId);

                query = degerList.Where(x => x.DegerBilgi != "---").ToList();

                int recordsTotal = query.Count;

                int recordsFiltered = query.Count();
                var data = query.Skip(vm.Skip).Take(vm.PageSize).ToList();
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

        public async Task<string> GetValueTextAsync(
            string formNormalizeAd, string columnName, long formDegerId)
        {
            return await _context.ValueTexts
                .Where(x => x.FormTanim.NormalizeAd == formNormalizeAd
                    && x.FormAlan.Ad == columnName
                    && x.FormDegerId == formDegerId)
                .Select(x => x.Deger).FirstOrDefaultAsync();
        }

        public async Task<decimal> GetValueNumberAsync(
            string formNormalizeAd, string columnName, long formDegerId)
        {
            return await _context.ValueNumbers
                .Where(x => x.FormTanim.NormalizeAd == formNormalizeAd
                    && x.FormAlan.Ad == columnName
                    && x.FormDegerId == formDegerId)
                .Select(x => x.Deger).FirstOrDefaultAsync();
        }

        public async Task<long> GetFormDegerIdFromMetinAsync(
            string formNormalizeAd, string columnName, string valueText)
        {
            return await _context.ValueTexts
                .Where(x => x.FormTanim.NormalizeAd == formNormalizeAd
                    && x.FormAlan.Ad == columnName
                    && x.Deger == valueText)
                .Select(x => x.FormDegerId).FirstOrDefaultAsync();
        }
    }
}
