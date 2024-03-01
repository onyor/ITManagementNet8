using System.Collections.Generic;

namespace ITX.Application.Dtos.Test
{
	public class StudentLessonDto: BaseDto<long>
    {
        public long StudentId { get; set; }
		public string StudentIdName { get; set; }
        public long LessonId { get; set; }
		public string LessonIdName { get; set; }
    }
}

