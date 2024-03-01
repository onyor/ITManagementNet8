using Microsoft.AspNetCore.Identity;

using System;

namespace ITX.Domain.Entities.Identity
{
    public class UserClaim : IdentityUserClaim<Guid>
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
        public User User { get; set; }
    }
}
