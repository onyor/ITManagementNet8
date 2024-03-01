using ITX.Application.Repositories.IBase;
using ITX.Domain.Entities.Test;

namespace ITX.Application.Interfaces.Test
{
    public interface IStudentRepository : IAsyncRepository<Student>
    {
        
    }
}
