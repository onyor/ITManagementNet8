using ITX.Application.Interfaces.Test;
using ITX.Domain.Entities.Test;
using ITX.Persistance.Database.Base;
using ITX.Persistance.Database.Context;

namespace ITX.Infrastructure.Data.Repositories.Test
{
    public class StudentRepository : EfRepositoryBase<Student>, IStudentRepository
    {
        public StudentRepository(ITManagementDbContext context) : base(context)
        {

        }
    }
}
