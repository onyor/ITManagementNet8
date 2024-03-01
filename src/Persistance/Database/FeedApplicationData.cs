using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using ITX.Application;
using ITX.Application.ViewModels;
using ITX.Application.Dtos.Identity;
using ITX.Application.Dtos.FormManagement;
using ITX.Application.Dtos.Predefined;
using ITX.Persistance.Cache;
using ITX.Persistance.Database.Context;
using ITX.Domain.Entities.Predefined;

namespace ITX.Persistance.Database
{
    public static class FeedApplicationData
    {
        public static async Task GetAllCountry(ITManagementDbContext _context, IMapper _mapper)
        {
            var countrys = await _context.Countrys.Where(x => x.IsDeleted == false).OrderBy(x => x.Name).ToListAsync();
            if (countrys != null) ApplicationData.CountryList = _mapper.Map<List<CountryDto>>(countrys);
        }

        public static async Task GetAllCity(ITManagementDbContext _context, IMapper _mapper)
        {
            var citys = await _context.Citys.Where(x => x.IsDeleted == false).OrderBy(x => x.Name).ToListAsync();
            if (citys != null) ApplicationData.CityList = _mapper.Map<List<CityDto>>(citys);
        }

        public static async Task GetApplicationSettings(ITManagementDbContext _context, IMapper _mapper)
        {
            var AppSettinglari = _context.AppSettings.Where(x => x.IsActive && !x.IsDeleted).OrderBy(x => x.Ad);
            if (AppSettinglari != null) ApplicationData.ApplicationSettings = _mapper.Map<List<AppSettingDto>>(AppSettinglari);
        }

        public static async Task InitFormVeri(ITManagementDbContext _context)
        {
            var resultData = new List<FormDataViewModel>();

            var valueTextList = await _context.ValueTexts.Include(x => x.FormAlan).Include(x => x.FormTanim).Where(x => !x.IsDeleted && x.IsActive).OrderBy(x => x.FormAlan.TabloSira).ToListAsync();
            foreach (var item in valueTextList)
            {
                FormDataViewModel formDataDto = new FormDataViewModel();
                formDataDto.DegerBilgi = item.Deger;
                formDataDto.DegerId = item.Id;
                formDataDto.ValueText = item.Deger;
                formDataDto.FormDegerId = item.FormDegerId;
                formDataDto.FormAlanId = item.FormAlanId;
                //var formAlan = formAlanList.Where(x => x.Id == item.FormAlanId).FirstOrDefault();
                formDataDto.FormAlanAd = item.FormAlan.Ad;
                formDataDto.VeriTip = item.FormAlan.VeriTip;
                formDataDto.FormTanimId = item.FormTanimId;
                formDataDto.NormalizeAd = item.FormTanim.NormalizeAd;

                if (item.Deger != null)
                    resultData.Add(formDataDto);
            }

            var valueNumberList = await _context.ValueNumbers.Include(x => x.FormAlan).Include(x => x.FormTanim).Where(x => !x.IsDeleted && x.IsActive).ToListAsync();
            foreach (var item in valueNumberList)
            {
                FormDataViewModel formDataDto = new FormDataViewModel();
                formDataDto.DegerBilgi = item.Deger.ToString();
                formDataDto.DegerId = item.Id;
                formDataDto.ValueNumber = item.Deger;
                formDataDto.FormDegerId = item.FormDegerId;
                formDataDto.FormAlanId = item.FormAlanId;
                formDataDto.FormAlanAd = item.FormAlan.Ad;
                formDataDto.VeriTip = item.FormAlan.VeriTip;
                formDataDto.FormTanimId = item.FormTanimId;
                formDataDto.NormalizeAd = item.FormTanim.NormalizeAd;

                resultData.Add(formDataDto);
            }

            var degerTarihList = await _context.DegerTarihs.Include(x => x.FormAlan).Include(x => x.FormTanim).Where(x => !x.IsDeleted && x.IsActive).ToListAsync();
            foreach (var item in degerTarihList)
            {
                FormDataViewModel formDataDto = new FormDataViewModel();
                formDataDto.DegerBilgi = item.Deger.ToString();
                formDataDto.DegerId = item.Id;
                formDataDto.DegerTarih = item.Deger;
                formDataDto.FormDegerId = item.FormDegerId;
                formDataDto.FormAlanId = item.FormAlanId;
                formDataDto.FormAlanAd = item.FormAlan.Ad;
                formDataDto.VeriTip = item.FormAlan.VeriTip;
                formDataDto.FormTanimId = item.FormTanimId;
                formDataDto.NormalizeAd = item.FormTanim.NormalizeAd;

                resultData.Add(formDataDto);
            }

            ApplicationData.FormDataList = resultData;

        }

        public static async Task GetAllFormTanim(ITManagementDbContext _context, IMapper _mapper)
        {
            var enumTanim = (await _context.FormTanims.Where(x => x.NormalizeAd == "EnumTanim").FirstOrDefaultAsync());
            if (enumTanim != null)
            {
                ApplicationData.EnumTanimId = enumTanim.Id;
                var enumVeriList = _context.EnumVeris.Where(z => z.IsActive && !z.IsDeleted).OrderBy(x => x.EnumTanimId).ThenBy(z => z.Ad);
                if (enumVeriList != null) ApplicationData.EnumVeriList = _mapper.Map<List<EnumVeriDto>>(enumVeriList);
            }

            var formTanimList = _mapper.Map<List<FormTanimDto>>(await _context.FormTanims.Where(x => x.IsActive && !x.IsDeleted).ToListAsync());
            if (formTanimList != null) ApplicationData.FormTanimList = formTanimList.ToDictionary(x => x.Id);

            var formAlanList = _mapper.Map<List<FormAlanDto>>(await _context.FormAlans.Where(x => x.IsActive && !x.IsDeleted).ToListAsync());
            if (formAlanList != null) ApplicationData.FormAlanList = formAlanList.ToDictionary(x => x.Id);

            var formDegerList = _mapper.Map<List<FormDegerDto>>(await _context.FormDegers.ToListAsync());
            if (formDegerList != null) ApplicationData.FormDegerList = formDegerList.ToDictionary(x => x.Id);

            var valueNumberList = _mapper.Map<List<ValueNumberDto>>(await _context.ValueNumbers.ToListAsync());
            if (valueNumberList != null) ApplicationData.ValueNumberList = valueNumberList.ToDictionary(x => x.Id);

            var valueTextList = _mapper.Map<List<ValueTextDto>>(await _context.ValueTexts.ToListAsync());
            if (valueTextList != null) ApplicationData.ValueTextList = valueTextList.ToDictionary(x => x.Id);

            var degerTarihList = _mapper.Map<List<DegerTarihDto>>(await _context.DegerTarihs.ToListAsync());
            if (degerTarihList != null) ApplicationData.DegerTarihList = degerTarihList.ToDictionary(x => x.Id);
        }

        public static async Task GetAllUser(ITManagementDbContext _context, IMapper _mapper)
        {
            var userList = _mapper.Map<List<UserDto>>(await _context.Users.Where(x => x.IsActive && !x.IsDeleted).ToListAsync());
            if (userList != null) ApplicationData.KullaniciListe = userList.ToDictionary(x => x.Id);
        }
       

    }
}
