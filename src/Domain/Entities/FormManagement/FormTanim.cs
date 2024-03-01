using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ITX.Domain.Entities.FormManagement
{
    public class FormTanim : BaseEntity<long>
    {
        [Required(ErrorMessage = "Ad boş olamaz!")]
        public string Ad { get; set; }
        public long? UstId { get; set; }
        public string Baslik { get; set; }
        public string Aciklama { get; set; }
        public string NormalizeAd { get; set; } // builder'da unique yapılacak.
        public bool Statik { get; set; } = false;

        // NAV properties
        [ForeignKey("UstId")]
        public virtual FormTanim UstNesne { get; set; }
        public IList<FormTanim> AltNesneler { get; set; }
    }
}
