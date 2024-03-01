using ITX.Domain.Shared.Enums;
using System;

namespace ITX.Application.ViewModels
{
    public class FormDataViewModel
    {
        public long DegerId { get; set; }
        public string DegerBilgi { get; set; }
        public string? ValueText { get; set; }
        public decimal? ValueNumber { get; set; }
        public DateTime? DegerTarih { get; set; }
        public long FormTanimId { get; set; }
        public string NormalizeAd { get; set; }
        public long FormAlanId { get; set; }
        public string FormAlanAd { get; set; }
        public EnmVeriTip VeriTip { get; set; }//1 metin 2 sayı 3 tarih 4 bool 5 seçilebilir değer 6 mevcut context 7 bağlı
        public long FormDegerId { get; set; }
    }
}
