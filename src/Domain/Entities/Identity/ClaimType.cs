using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Domain.Entities.Identity
{
    public class ClaimType : BaseEntity<long>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
