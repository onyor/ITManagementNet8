using System.ComponentModel.DataAnnotations;

namespace ITX.Domain.Entities.Predefined
{
    public class CurrencyDefinition : BaseEntity<long>
    {
        [Required(ErrorMessage = "Döviz Adı boş olamaz!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Döviz Kısa Adı boş olamaz!")]
        public string ShortName { get; set; }

        [Required(ErrorMessage = "Döviz Sembolü boş olamaz!")]
        public string Symbol { get; set; }
    }
}
