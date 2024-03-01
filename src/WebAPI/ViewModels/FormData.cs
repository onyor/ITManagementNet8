using System.Collections.Generic;

namespace ITX.WebAPI.ViewModels
{ 
    public class FormDataList
    {
        public long Id { get; set; }
        public long FormTanimId { get; set; }
        public List<FormData> DataList { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }

    }
     
    public class FormData
    {
        public long Id { get; set; }
        public string Name { get; set; }

        public string Value{ get; set; }
    }
}
