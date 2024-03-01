using ITX.Domain.Shared.Enums;

namespace ITX.Domain.Entities.Predefined
{
    public class AppSetting : BaseEntity<long>
    {
        public string Ad { get; set; }
        public string Aciklama { get; set; }
        public EnmVeriTip EnmVeriTipId { get; set; }
        public string Deger { get; set; }
    }
}
