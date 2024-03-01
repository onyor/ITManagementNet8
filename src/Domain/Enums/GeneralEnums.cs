using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ITX.Domain.Shared.Enums
{
    public enum EnmGender
    {
        [Display(Name = "Tanımsız")]
        Undefined = 0,

        [Display(Name = "Erkek")]
        Male = 10,

        [Display(Name = "Kadın")]
        Female = 20,
    }

    public enum EnmVeriTip
    {
        [Display(Name = "Tanımsız")]
        Undefined = 0,

        [Display(Name = "Sayı")]
        Number = 10,

        [Display(Name = "Tarih")]
        Date = 20,

        [Display(Name = "Saat")]
        Hour = 21,

        [Display(Name = "Tarih Saat")]
        LongDate = 22,

        [Display(Name = "Bool")]
        Bool = 30,

        [Display(Name = "Metin")]
        Text = 40,

        [Display(Name = "Liste Oluştur")]
        List = 50,

        [Display(Name = "Mevcut Veri")]
        ExistData = 60,

        [Display(Name = "Bağlı Veri")]
        RelatedData = 70
    }

    public enum EnmAramaTip
    {
        [Display(Name = "Tanımsız")]
        Undefined = 0,

        [Display(Name = "Eşittir")]
        Esittir = 10,

        [Display(Name = "İçerir")]
        Icerir = 20,

        [Display(Name = "Küçüktür")]
        Kucuktur = 30,

        [Display(Name = "Büyüktür")]
        Buyuktur = 40,

        [Display(Name = "Arasinda")]
        Arasinda = 50,

        [Display(Name = "Child")]
        Child = 60,
    }

    public enum EnmRequestLogTypeCode
    {
        [Display(Name = "Tanımsız")]
        Undefined = 0,

        [Display(Name = "Başarılı")]
        Basarili = 10,

        [Display(Name = "Başarısız")]
        Basarisiz = 20,

        [Display(Name = "Hatalı")]
        Hatali = 30,

        [Display(Name = "Tarihçe")]
        Tarihce = 40,
    }
}
