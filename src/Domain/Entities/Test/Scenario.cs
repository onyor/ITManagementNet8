using ITX.Domain.Entities.Predefined;
using ITX.Domain.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Domain.Entities.Test
{
    public class Scenario : BaseEntity<long>
    {
        public string Name { get; set; }
        public long? UlasimAracId { get; set; } // Form
        public EnmGender? GenderId { get; set; } // Enm
        public EnmRequestLogTypeCode? RequestLogTypeCodeId { get; set; } // Enm
        public string TestDescription { get; set; }
        public int? TestDeger { get; set; }
        public string TestBaslik { get; set; }
        public long CountryId { get; set; } // Domain-Predefined
        public long CityId { get; set; } // Domain-Predefined
        public long CurrencyDefinitionId { get; set; } // Domain-Predefined
        public DateTime TestTarih { get; set; }

        public Country Country { get; set; }
        public City City { get; set; }
        public List<Student> Students { get; set; }
        public CurrencyDefinition CurrencyDefinition { get; set; }
    }
}
