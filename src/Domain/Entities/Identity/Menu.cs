using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ITX.Domain.Entities.Identity
{
    public class Menu : BaseEntity<long>
    {
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public int? Order { get; set; }
        public string Param { get; set; }
        public long? ParentId { get; set; }
        public bool IsNotMenuVisible { get; set; }

        // NAV properties
        [JsonIgnore]
        public virtual Menu Parent { get; set; }
        public virtual List<MenuRole> MenuRoles { get; set; }
        public virtual List<Menu> Children { get; set; }
    }
}
