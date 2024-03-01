using ITX.Domain.Shared.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace ITX.Domain.Entities.FormManagement
{
    public class FormAlan : BaseEntity<long>
    {
        public string Ad { get; set; }
        public string Aciklama { get; set; }
        public EnmVeriTip VeriTip { get; set; }//1 metin 2 sayı 3 tarih 4 bool 5 seçilebilir değer 6 mevcut context 7 bağlı
        public string VeriListe { get; set; }
        public string MinDeger { get; set; }
        public string MaxDeger { get; set; }
        public long? UstId { get; set; }
        public string VarsayilanDeger { get; set; }
        public int SatirSira { get; set; }
        public int SutunSira { get; set; }
        public int SutunGenislik { get; set; }

        [ForeignKey(nameof(FormTanim))]
        public long FormTanimId { get; set; }
        public string Etiket { get; set; }
        public string Ipucu { get; set; }
        public string Tanimlayici { get; set; }
        public string OzelStil { get; set; }
        
        public byte TabloSira { get; set; }
        // Relationships
        public FormTanim FormTanim { get; set; }

    }
}
