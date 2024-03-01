using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Application.Dtos.Test
{
    public class LessonDto : BaseDto<long>
    {
        public string Name { get; set; }
    }
}

