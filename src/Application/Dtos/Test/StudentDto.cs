using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Application.Dtos.Test
{
    public class StudentDto : BaseDto<long>
    {
        public string Name { get; set; }
        public long CityId { get; set; }
        public string CityIdName { get; set; }
        public string Lessons { get; set; }
        public List<long>? LessonIds { get; set; }
        public long ScenarioId { get; set; }
        public string ScenarioIdName { get; set; }
    }
}

