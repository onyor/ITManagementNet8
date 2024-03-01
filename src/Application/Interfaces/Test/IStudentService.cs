using ITX.Application.Dtos.Test;
using ITX.Domain.Entities.Test;

namespace ITX.Application.Interfaces.Test
{
    public interface IStudentService : IBaseService<Student, StudentDto>
    {
        
    }
}
