using AutoMapper;
using ITX.Application.Dtos.Test;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.Test;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Domain.Entities.Test;
using ITX.Persistance.Database.Context;
using ITX.Infrastructure.Helpers;

namespace ITX.Infrastructure.Data.Services.Test
{
    public class StudentLessonService : BaseService<StudentLesson, StudentLessonDto>, IStudentLessonService
    {
        public StudentLessonService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<StudentLesson> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {
        }
    }
}
