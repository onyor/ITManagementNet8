using ITX.Domain.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace ITX.Application.Dtos.ReportManagement
{
    public class SearchParameterDto
    {
        private string[] aranacakDeger;

        public SearchParameterDto()
        {
            this.BaseOperator = "AND";
        }

        public string KolonAd { get; set; }
        public string[] AranacakDeger { get => aranacakDeger; set => aranacakDeger = value; }
        public string VeriTipi { get; set; }
        public EnmAramaTip AramaTipi { get; set; } // 0-eşittir, 1 contains, 2 büyüktür, 3 küçüktür
        public string BaseOperator { get; set; } // "and" & "or" & "not"
    }
}
