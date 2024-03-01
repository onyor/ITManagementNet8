using System.ComponentModel.DataAnnotations;

namespace ITX.Domain.Entities.Predefined
{
    public class District : BaseEntity<long>
    {
        [Required(ErrorMessage = "İlçe adı boş olamaz!")]
        public string Name { get; set; }
        public string Code { get; set; }
        public long CityId { get; set; }
        public City City { get; set; }
    }
}
