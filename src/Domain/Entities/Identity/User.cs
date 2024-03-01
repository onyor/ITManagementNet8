using Microsoft.AspNetCore.Identity;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ITX.Domain.Entities.Identity
{
    public class User : IdentityUser<Guid>
    {
        [StringLength(40)]
        [Required]
        public string Name { get; set; }

        [StringLength(40)]
        [Required]
        public string Surname { get; set; }

        [StringLength(40)]
        public string Title { get; set; }

        [NotMapped]
        public string Fullname
        {
            get { return this.Name + " " + this.Surname; }
        }
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime? TokenCreated { get; set; }
        public DateTime? TokenExpires { get; set; }

        // UI Settings
        public Guid? CurrentRoleId { get; set; }   // current role

        // Auditing
        public DateTime CreatedAt { get; set; }
        public Guid CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public Guid? UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string UserName { get; set; }

        // NAV properties
        public virtual List<UserRole> UserRoles { get; set; }
        public virtual List<UserClaim> UserClaims { get; set; }
        public virtual Role CurrentRole { get; set; }

    }
}
