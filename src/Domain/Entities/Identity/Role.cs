using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ITX.Domain.Entities.Identity
{
    public class Role : IdentityRole<Guid>
    {
        [StringLength(255)]
        [Required]
        public string Description { get; set; }

        [NotMapped]
        public string[] Permissions { get; set; }

        // Auditing
        public DateTime CreatedAt { get; set; }
        public Guid CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public Guid? UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        // NAV properties
        public List<UserRole> UserRoles { get; set; }
        public List<MenuRole> MenuRoles { get; set; }
        public virtual List<RoleClaim> RoleClaims { get; set; }

    }
}
