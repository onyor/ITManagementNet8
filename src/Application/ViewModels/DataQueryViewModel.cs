using System;

namespace ITX.Application.ViewModels
{
    public class DataQueryViewModel
    {
        public long? UstId { get; set; }
        public DateTime? BasTar { get; set; }
        public DateTime? BitTar { get; set; }
        public string AranacakDeger { get; set; }
        public string AranacakAlan { get; set; }
    }
}
