using System.Collections.Generic;

namespace ITX.WebMVC.Models
{
    public class TableAuthorityViewModel
    {
        public string TableName { get; set; }
        public List<string> ActionButtonList { get; set; }
        public List<string> TopButtonList { get; set; }
    }
}
