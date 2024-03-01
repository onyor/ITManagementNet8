using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Domain.Entities.Test
{
    public class Lesson : BaseEntity<long>
    {
        public string Name { get; set; }
        public List<StudentLesson> StudentLessons { get; set; }
    }
}
