using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Application.Dtos.Identity
{
    public class UserClaimDto
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string UserIdName { get; set; }
        public string ClaimType { get; set; }
        public long ClaimTypeId { get; set; }
        public string ClaimValue { get; set; }

        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class BulkUserClaimsDto
    {
        public List<long> ClaimTypeIds { get; set; }
        public List<Guid> UserIds { get; set; }
    }
}
