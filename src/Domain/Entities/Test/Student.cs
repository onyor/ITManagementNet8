using ITX.Domain.Entities.Predefined;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Domain.Entities.Test
{
    public class Student : BaseEntity<long>
    {
        public string Name { get; set; }
        public long CityId { get; set; }
        public City City { get; set; }
        public long ScenarioId { get; set; }
        public Scenario Scenario { get; set; }
        public List<StudentLesson> StudentLessons { get; set; }
    }
}
