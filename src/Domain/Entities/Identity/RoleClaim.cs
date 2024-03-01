using Microsoft.AspNetCore.Identity;

using System;

namespace ITX.Domain.Entities.Identity
{
    public class RoleClaim : IdentityRoleClaim<Guid>
    {
        // Auditing
        public DateTime CreatedAt { get; set; }
        public Guid CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public Guid? UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public long ClaimTypeId { get; set; }
        public ClaimType ClaimTypeModel { get; set; }
        public Role Role { get; set; }
    }
}
