using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ITX.Application;
using ITX.Application.Dtos.ReportManagement;
using ITX.Application.ViewModels;
using ITX.Domain.Shared.Enums;
using ITX.Persistance.Cache;
using ITX.Persistance.Database.Context;
using ITX.Persistance.Extensions;
using System.ComponentModel.DataAnnotations;

namespace ITX.Persistance.Database
{
    public class SeedData
    {
        public static async Task SeedLocationAsync(ITManagementDbContext context)
        {
            await Task.Delay(100);
        }


        public static string enumDegerGetir(long enumTanimID, long? Id)
        {

            if (Id == null || Id == 0)
                return "";
            var enumDeger = ApplicationData.EnumVeriList.Where(x => x.EnumTanimId == enumTanimID && x.Deger == Id).FirstOrDefault().Ad;

            return enumDeger;
        }

        public static string textMask(string pText)
        {
            string returnValue = "";
            byte NoMaskLength = 2;
            byte index = 0;
            foreach (var item in pText.ToArray())
            {
                returnValue += item.ToString();
                index++;
                if (index >= NoMaskLength)
                    break;
            }
            for (int i = 0; i < returnValue.Length - NoMaskLength; i++)
                returnValue += "*";

            returnValue += "***";
            return returnValue;
        }

        public static string enumDegerBilgi(string enumTanimAd, object Id)
        {
            try
            {
                if (Id == null)
                    return "";
                if (Id.xToLong() == 0 && enumTanimAd != "EnmDurum")
                    return "";

                var enumDeger = ApplicationData.EnumVeriList.Where(x => x.EnumTanimAd == enumTanimAd && x.Deger == Id.xToLong()).FirstOrDefault()?.Ad;

                return enumDeger;
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }
        public static string GetFormData(long? formDegerId)
        {
            string deger = "";
            try
            {
                if (formDegerId == null || formDegerId == 0)
                    return "";
                var FormItem = ApplicationData.FormDataList.Where(x => x.FormDegerId == formDegerId).FirstOrDefault();
                if (FormItem != null)
                    deger = FormItem.DegerBilgi;
                else
                    return "Hatalı Veri";
            }
            catch (Exception)
            {

            }

            return deger;
        }

        public static string GetFormExtData(long? formDegerId, string alanAd)
        {
            string deger = "";
            try
            {
                if (formDegerId == null || formDegerId == 0)
                    return "";

                var itemList = ApplicationData.FormDataList.Where(x => x.FormDegerId == formDegerId);
                foreach (var item in itemList)
                {
                    if (item.FormAlanAd == alanAd)
                        return item.DegerBilgi;
                }
            }
            catch (Exception)
            {

            }

            return deger;
        }
        public static object GetFormColData(string normalizeAd, string colAd, string deger)
        {
            try
            {
                if (deger == null || deger == "")
                    return "";

                var itemList = ApplicationData.FormDataList.Where(x => x.NormalizeAd == normalizeAd && x.FormAlanAd == colAd && x.DegerBilgi == deger).FirstOrDefault();
                if (itemList != null)
                {

                    return itemList.FormDegerId;
                }
            }
            catch (Exception ex)
            {
                return "";
            }

            return "";
        }
        public static FormDataViewModel GetFormContainsData(string normalizeAd, string colAd, string deger)
        {
            try
            {
                if (deger == null || deger == "")
                    return null;

                return ApplicationData.FormDataList.Where(x => x.NormalizeAd == normalizeAd && x.FormAlanAd == colAd && deger.Contains(x.DegerBilgi)).FirstOrDefault();

            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static string GetFormColExtData(string normalizeAd, string colAd, string deger, string alanAd)
        {
            try
            {
                if (deger == null || deger == "")
                    return "";

                var itemList = ApplicationData.FormDataList.Where(x => x.NormalizeAd == normalizeAd && x.FormAlanAd == colAd && x.DegerBilgi == deger).FirstOrDefault();
                if (itemList != null)
                {
                    var orjItem = ApplicationData.FormDataList.Where(x => x.FormAlanAd == alanAd && x.FormDegerId == itemList.FormDegerId).FirstOrDefault();
                    return orjItem.DegerBilgi;
                }
            }
            catch (Exception ex)
            {
                return "";
            }

            return "";
        }
        public static string GetFormColExt2ColData(string normalizeAd, string colAd, string deger, string alanAd, string colAd2, string deger2)
        {
            try
            {
                if (deger == null || deger == "")
                    return "";

                var itemList = ApplicationData.FormDataList.Where(x => x.NormalizeAd == normalizeAd && x.FormAlanAd == colAd && x.DegerBilgi == deger).ToList();
                foreach (var item in itemList)
                {
                    var orjItem = ApplicationData.FormDataList.Where(x => x.FormAlanAd == colAd2 && x.FormDegerId == item.FormDegerId
                    && x.DegerBilgi == deger2
                    ).FirstOrDefault();
                    var subItem = ApplicationData.FormDataList.Where(x => x.FormAlanAd == alanAd && x.FormDegerId == orjItem.FormDegerId).FirstOrDefault();
                    return subItem.DegerBilgi;

                }


            }
            catch (Exception ex)
            {
                return "";
            }

            return "";
        }
        public static long GetEnumTanimID(string fType)
        {
            fType = "Enm" + fType.Replace("Enm", "");
            var formEnumTanimId = ApplicationData.EnumTanimId;
            var formData = ApplicationData.FormDataList.FirstOrDefault(x => x.FormTanimId == formEnumTanimId && x.DegerBilgi == fType);
            if (formData != null)
                return formData.FormDegerId;
            else return 0;
        }

        public static string GetEnumTanimAd(long Id)
        {

            var formEnumTanimId = ApplicationData.EnumTanimId;
            var enumTanimAd = ApplicationData.FormDataList.FirstOrDefault(x => x.FormTanimId == formEnumTanimId && x.FormDegerId == Id).ValueText;
            return enumTanimAd;
        }

        public static string CreateWhereCondition(List<SearchParameterDto> aramaKriter)
        {
            var gosterimAdet = aramaKriter.Where(x => x.KolonAd == "GosterimAdet").FirstOrDefault();
            if (gosterimAdet != null)
                aramaKriter.Remove(gosterimAdet);
            var raporAd = aramaKriter.Where(x => x.KolonAd == "RaporAd").FirstOrDefault();
            if (raporAd != null)
                aramaKriter.Remove(raporAd);

            string whereCondition = "";
            var i = 0;
            var k = 0;
            foreach (var item in aramaKriter)
            {
                i = 0;
                if (k > 0)
                    whereCondition += item.BaseOperator;
                whereCondition += "(";
                foreach (var deger in item.AranacakDeger)
                {
                    if (!string.IsNullOrEmpty(deger))
                    {
                        if (i > 0)
                            whereCondition += " OR ";
                        var kolonAd = char.ToUpper(item.KolonAd[0]) + item.KolonAd.Substring(1);
                        if (kolonAd.Contains("_"))
                        {
                            var splitKolonAd = kolonAd.Split("_");
                            kolonAd = splitKolonAd[0];
                            if (splitKolonAd[1] == "1")
                                item.AramaTipi = EnmAramaTip.Buyuktur;
                            else
                                item.AramaTipi = EnmAramaTip.Kucuktur;
                        }

                        if (item.AramaTipi == EnmAramaTip.Esittir)
                        {
                            whereCondition += $"({kolonAd}";

                            if (item.VeriTipi == "string")
                                whereCondition += $"== \"{deger.ToLower()}\" ";
                            else if (item.VeriTipi == "bool")
                                whereCondition += $"== \"{deger}\" ";
                            else if (item.VeriTipi == "date")
                            {
                                DateTime veriBilgi = DateTime.Parse(deger);
                                whereCondition += $">= \"{veriBilgi.ToString("yyyy-MM-dd")}\" and ";
                                whereCondition += $" {kolonAd}";
                                whereCondition += $"< \"{veriBilgi.AddDays(1).ToString("yyyy-MM-dd")}\" ";


                            }
                            else
                                whereCondition += $"== {deger.ToLower()} ";
                        }
                        else if (item.AramaTipi == EnmAramaTip.Icerir)
                        {
                            whereCondition += $"({kolonAd}";

                            whereCondition += $".ToLower().Contains(\"{deger.ToLower()}\")";
                        }
                        else if (item.AramaTipi == EnmAramaTip.Buyuktur)
                        {
                            whereCondition += $"({kolonAd}";

                            whereCondition += $">= \"{deger}\"";
                        }
                        else if (item.AramaTipi == EnmAramaTip.Kucuktur)
                        {
                            whereCondition += $"({kolonAd}";

                            whereCondition += $"<= \"{deger}\"";
                        }
                        else if (item.AramaTipi == EnmAramaTip.Arasinda)
                        {
                            whereCondition += $"({kolonAd}";

                            whereCondition = whereCondition.Substring(0, whereCondition.IndexOf("((" + kolonAd));
                            var bastarKolon = kolonAd.Split("/")[0];
                            var bastarDeger = deger.Split("/")[0];
                            var bittarKolon = kolonAd.Split("/")[1];
                            var bittarDeger = deger.Split("/")[1];

                            whereCondition += $"(({bastarKolon} <= \"{bastarDeger}\" AND {bittarKolon} >=\"{bastarDeger}\") OR " +
                                              $"({bastarKolon} <=\"{bittarDeger}\" AND {bittarKolon} >=\"{bittarDeger}\") OR" +
                                              $"({bastarKolon} >=\"{bastarDeger}\" AND {bittarKolon} <=\"{bittarDeger}\"";
                        }
                        else if (item.AramaTipi == EnmAramaTip.Child)
                        {
                            var columnArr = kolonAd.Split(".");
                            for (int j = 0; j < kolonAd.Split(".").Length; j++)
                            {
                                if (j == 0)
                                {
                                    whereCondition += $"{columnArr[j]}.Any(";
                                    continue;
                                }
                                if (j == kolonAd.Split(".").Length - 1)
                                {
                                    whereCondition += $"{columnArr[j]} == {deger}";
                                    break;
                                }
                                whereCondition += $"{columnArr[j]}.";
                            }
                        }

                        whereCondition += ")";
                        whereCondition = whereCondition.Replace("==  )", "== null)");
                    }
                    i += 1;
                }
                whereCondition += ")";
                k += 1;
            }
            return whereCondition;
        }

        public static string WhereConditionForDatatableSearch(List<SearchParameterDto> aramaKriter)
        {
            string whereCondition = "";
            var i = 0;
            var k = 0;
            foreach (var item in aramaKriter)
            {
                i = 0;
                if (k > 0)
                    whereCondition += " OR ";
                whereCondition += "(";
                foreach (var deger in item.AranacakDeger)
                {
                    if (!string.IsNullOrEmpty(deger))
                    {

                        if (i > 0)
                            whereCondition += " OR ";
                        var kolonAd = char.ToUpper(item.KolonAd[0]) + item.KolonAd.Substring(1);
                        if (kolonAd.Contains("_"))
                        {
                            var splitKolonAd = kolonAd.Split("_");
                            kolonAd = splitKolonAd[0];
                            if (splitKolonAd[1] == "1")
                                item.AramaTipi = EnmAramaTip.Buyuktur;
                            else
                                item.AramaTipi = EnmAramaTip.Kucuktur;
                        }
                        whereCondition += $"({kolonAd}";

                        if (item.AramaTipi == EnmAramaTip.Esittir)
                        {
                            if (item.VeriTipi == "string")
                                whereCondition += $"== \"{deger.ToLower()}\" ";
                            else if (item.VeriTipi == "bool")
                                whereCondition += $"== \"{deger}\" ";
                            else if (item.VeriTipi == "date")
                            {
                                DateTime veriBilgi = DateTime.Parse(deger);
                                whereCondition += $">= \"{veriBilgi.ToString("yyyy-MM-dd")}\" and ";
                                whereCondition += $" {kolonAd}";
                                whereCondition += $"< \"{veriBilgi.AddDays(1).ToString("yyyy-MM-dd")}\" ";


                            }
                            else
                                whereCondition += $"== {deger.ToLower()} ";
                        }
                        else if (item.AramaTipi == EnmAramaTip.Icerir)
                        {
                            whereCondition += $".Replace(\"İ\",\"I\").ToLower().Contains(\"{deger.ToLower()}\")";
                        }
                        else if (item.AramaTipi == EnmAramaTip.Buyuktur)
                        {
                            whereCondition += $">= \"{deger}\"";
                        }
                        else if (item.AramaTipi == EnmAramaTip.Kucuktur)
                        {
                            whereCondition += $"<= \"{deger}\"";
                        }

                        whereCondition += ")";
                        whereCondition = whereCondition.Replace("==  )", "== null)");
                    }
                    i += 1;
                }
                whereCondition += ")";
                k += 1;
            }
            return whereCondition;
        }

        public static async Task FeedApplicationDataAsync(IDbContextFactory<ITManagementDbContext> contextFactory, IMapper mapper, ICache cache, IConfiguration configuration)
        {
            var tasks = new List<Task>();

            tasks.Add(Task.Run(async () =>
            {
                await using var countryContext = contextFactory.CreateDbContext();
                await FeedApplicationData.GetAllCountry(countryContext, mapper);
            }));

            tasks.Add(Task.Run(async () =>
            {
                await using var cityContext = contextFactory.CreateDbContext();
                await FeedApplicationData.GetAllCity(cityContext, mapper);
            }));

            tasks.Add(Task.Run(async () =>
            {
                await using var settingsContext = contextFactory.CreateDbContext();
                await FeedApplicationData.GetApplicationSettings(settingsContext, mapper);
            }));

            tasks.Add(Task.Run(async () =>
            {
                await using var formContext = contextFactory.CreateDbContext();
                await FeedApplicationData.InitFormVeri(formContext);

                await using var formTanimContext = contextFactory.CreateDbContext();
                await FeedApplicationData.GetAllFormTanim(formTanimContext, mapper);
            }));

            tasks.Add(Task.Run(async () =>
            {
                await using var userContext = contextFactory.CreateDbContext();
                await FeedApplicationData.GetAllUser(userContext, mapper);
            }));

            await Task.WhenAll(tasks);

            string? ldapAddress = configuration.GetValue<string>("LDAPAddress");
            string? ldapDomain = configuration.GetValue<string>("LDAPDomain");

            ApplicationData.LDAPAddress = ldapAddress ?? "defaultLDAPAddress";
            ApplicationData.LDAPDomain = ldapDomain ?? "defaultLDAPDomain";

            var criticalWordsSetting = ApplicationData.ApplicationSettings.FirstOrDefault(x => x.Ad == "CriticalWords");
            ApplicationData.CriticalWords =
                (criticalWordsSetting != null && !string.IsNullOrEmpty(criticalWordsSetting.Deger)) ?
                criticalWordsSetting.Deger.Split(",").ToList() :
                ApplicationData.CriticalWords = new List<string>();
        }

        public static string GetEnumDisplayName<TEnum>(TEnum value) where TEnum : Enum
        {
            var fieldInfo = value.GetType().GetField(value.ToString());
            if (fieldInfo == null) return value.ToString();

            var displayAttributes = fieldInfo.GetCustomAttributes(typeof(DisplayAttribute), false) as DisplayAttribute[];
            return displayAttributes?.Length > 0 ? displayAttributes[0].Name : value.ToString();
        }
    }
}