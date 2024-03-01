using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace ITX.Application.Dtos.Predefined
{
    public class CountryDto : BaseDto<long>
    {
        public string Name { get; set; }
        public int PhoneCode { get; set; }
        public long? CurrencyDefinitionId { get; set; }
        public string CurrencyDefinitionIdSymbol { get; set; }
        public string Code { get; set; }
    }
}

