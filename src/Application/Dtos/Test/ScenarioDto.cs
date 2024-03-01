using ITX.Domain.Shared.Enums;
using System;

namespace ITX.Application.Dtos.Test
{
    public class ScenarioDto : BaseDto<long>
    {
        public string Name { get; set; }
        public long? UlasimAracId { get; set; } // Form
        public string UlasimAracIdName { get; set; }
        public EnmGender? GenderId { get; set; } // Enm
        public string GenderIdName { get; set; }
        public EnmRequestLogTypeCode? RequestLogTypeCodeId { get; set; } // Enm
        public string RequestLogTypeCodeIdName { get; set; }
        public string TestDescription { get; set; }
        public int? TestDeger { get; set; }
        public string TestBaslik { get; set; }
        public long CountryId { get; set; } // Domain-Predefined
        public string CountryIdName { get; set; }
        public long CityId { get; set; } // Domain-Predefined
        public string CityIdName { get; set; }
        public long StudentId { get; set; } // Domain-Test
        public string StudentIdName { get; set; }
        public long CurrencyDefinitionId { get; set; } // Domain-Predefined
        public string CurrencyDefinitionIdName { get; set; }
        public DateTime TestTarih { get; set; }
    }
}

