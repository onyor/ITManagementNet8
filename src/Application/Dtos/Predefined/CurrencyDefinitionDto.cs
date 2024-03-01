using System.ComponentModel.DataAnnotations;

namespace ITX.Application.Dtos.Predefined
{
    public class CurrencyDefinitionDto : BaseDto<long>
    {
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Symbol { get; set; }
    }
}

