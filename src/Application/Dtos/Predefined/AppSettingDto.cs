using ITX.Domain.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace ITX.Application.Dtos.Predefined
{
    public class AppSettingDto : BaseDto<long>
    {
        public string Ad { get; set; }
        public string Aciklama { get; set; }
        public EnmVeriTip EnmVeriTipId { get; set; }
        public string EnmVeriTipIdAd { get; set; }
        public string Deger { get; set; }
    }
}

