using System.Collections.Generic;

namespace ITX.Application.ViewModels
{
    public class ComboTreeViewModel
    {
        public long Id { get; set; }
        public long? ParentId { get; set; }
        public string Title { get; set; }
        public List<ComboTreeViewModel> Subs { get; set; }
    }
}
