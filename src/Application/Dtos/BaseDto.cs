
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Application.Dtos
{
    public abstract class BaseDto<TId>
    {
        public TId Id { get; set; }
    }
}
