using System.ComponentModel.DataAnnotations;

namespace ITX.Application.Dtos.FormManagement
{
    public class FormTanimDto : BaseDto<long>
    {
        public string Ad { get; set; }
        public long? UstId { get; set; }
        public string Baslik { get; set; }
        public string Aciklama { get; set; }
        public string NormalizeAd { get; set; } // builder'da unique yapılacak.
        public bool Statik { get; set; } = false;

    }
}

