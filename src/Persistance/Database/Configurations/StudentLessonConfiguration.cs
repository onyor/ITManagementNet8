using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ITX.Domain.Entities.Test;

namespace ITX.Infrastructure.Data.Configurations
{
    public class StudentLessonConfiguration : IEntityTypeConfiguration<StudentLesson>
    {
        public void Configure(EntityTypeBuilder<StudentLesson> builder)
        {
            builder.ToTable("StudentLesson");
            builder.HasKey(x => x.Id);
        }
    }
}
