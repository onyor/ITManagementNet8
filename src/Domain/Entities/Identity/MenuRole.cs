using System;

namespace ITX.Domain.Entities.Identity
{
    public class MenuRole : BaseEntity<long>
    {
        public long MenuId { get; set; }
        public Guid RoleId { get; set; }

        // NAV properties
        public virtual Menu Menu { get; set; }
        public virtual Role Role { get; set; }
    }
}
