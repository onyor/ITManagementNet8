using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ITX.Domain.Entities.Test;

namespace ITX.Infrastructure.Data.Configurations
{
    public class StudentConfiguration : IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
            builder.ToTable("Student");
            builder.HasKey(x => x.Id);


            DateTime time = new DateTime(2023, 1, 1);

            builder.HasData(new Student
            {
                Id = 1,
                Name = "Veli",
                ScenarioId = 1,
                CityId = 1,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
            
            builder.HasData(new Student
            {
                Id = 2,
                Name = "Ahmet",
                ScenarioId = 2,
                CityId = 2,
                CreatedAt = time,
                CreatedBy = Guid.Empty,
                IsActive = true,
                IsDeleted = false
            });
        }
    }
}
