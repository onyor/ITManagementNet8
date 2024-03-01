using ITX.Application.Dtos.FormManagement;
using ITX.Application.Dtos.Identity;
using ITX.Application.Dtos.Predefined;
using ITX.Application.ViewModels;
using System;
using System.Collections.Generic;

namespace ITX.Application
{
    public static class ApplicationData
    {
        public static Guid TempUserId { get; set; }
        public static long EnumTanimId { get; set; }

        public static string LDAPDomain { get; set; }
        public static string LDAPAddress { get; set; }
        public static string ApiBaseURL { get; set; }

        public static List<FormDataViewModel> FormDataList { get; set; }
        public static List<CityDto> CityList { get; set; }
        public static List<CountryDto> CountryList { get; set; }
        public static List<EnumVeriDto> EnumVeriList { get; set; }
        public static List<AppSettingDto> ApplicationSettings { get; set; }
        public static Dictionary<Guid, UserDto> KullaniciListe { get; set; }
        public static Dictionary<long, FormTanimDto> FormTanimList { get; set; }
        public static Dictionary<long, FormAlanDto> FormAlanList { get; set; }
        public static Dictionary<long, FormDegerDto> FormDegerList { get; set; }
        public static Dictionary<long, ValueNumberDto> ValueNumberList { get; set; }
        public static Dictionary<long, ValueTextDto> ValueTextList { get; set; }
        public static Dictionary<long, DegerTarihDto> DegerTarihList { get; set; }
        public static Dictionary<string, List<MenuRoleDto>> MenuRoleList { get; set; }

        public const string EncKey = "d3g1st1rm3";

        public static List<string> CriticalWords;
    }
}

