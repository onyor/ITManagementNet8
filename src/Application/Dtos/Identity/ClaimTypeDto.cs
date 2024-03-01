using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Application.Dtos.Identity
{
	public class ClaimTypeDto: BaseDto<long>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}

