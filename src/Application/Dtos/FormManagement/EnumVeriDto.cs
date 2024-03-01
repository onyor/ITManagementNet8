using System.ComponentModel.DataAnnotations;

namespace ITX.Application.Dtos.FormManagement
{
    public class EnumVeriDto : BaseDto<long>
    {
        public string Ad { get; set; }
        public string Aciklama { get; set; }
        public int Deger { get; set; }
        public int SiraNo { get; set; }
        public string Kod { get; set; }
        public long EnumTanimId { get; set; }
        public string EnumTanimAd { get; set; }

    }
}

