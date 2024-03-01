using System.Collections.Generic;

namespace ITX.Application.ViewModels
{
    public class MenuInfoViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public int? Order { get; set; }
        public string Param { get; set; }
        public long? ParentId { get; set; }
        public string ParentName { get; set; }
        public MenuInfoViewModel Parent { get; set; }
        public List<MenuInfoViewModel> SubMenus { get; set; }
    }
}
