namespace ITX.Domain.Entities.Test
{
    public class StudentLesson : BaseEntity<long>
    {
        public long StudentId { get; set; }
        public long LessonId { get; set; }

        public Lesson Lesson { get; set; }
        public Student Student { get; set; }
    }
}
