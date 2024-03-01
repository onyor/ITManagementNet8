using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace ITX.Domain.Entities.Predefined
{
    public class Country : BaseEntity<long>
    {
        [Required(ErrorMessage = "Ülke adı boş olamaz!")]
        public string Name { get; set; }
        public int PhoneCode { get; set; }
        public long? CurrencyDefinitionId { get; set; }
        public string Code { get; set; }
        
        // nav properties
        public CurrencyDefinition CurrencyDefinition { get; set; }
        public IList<City> Cities { get; set; }
    }
}
