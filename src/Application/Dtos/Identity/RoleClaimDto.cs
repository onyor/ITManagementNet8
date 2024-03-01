using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ITX.Application.Dtos.Identity
{
    public class RoleClaimDto
    {
        public int Id { get; set; }
        public Guid RoleId { get; set; }
        public string RoleIdName { get; set; }
        public string ClaimType { get; set; }
        public long ClaimTypeId { get; set; }
        public string ClaimValue { get; set; }

        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class BulkRoleClaimsDto
    {
        public List<long> ClaimTypeIds { get; set; }
        public List<Guid> RoleIds { get; set; }
    }


}
