using AutoMapper;
using ITX.Application.Interfaces.Test;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Domain.Entities.Test;
using ITX.Persistance.Database.Context;

namespace ITX.Infrastructure.Data.Services.Test
{
    public class TestManagementService : ITestManagementService
    {
        private readonly IMapper _mapper;
        private readonly ITManagementDbContext _context;
        private readonly IUnitOfWork _unitOfWork;
        public TestManagementService(IMapper mapper, ITManagementDbContext context, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _context = context;
            _unitOfWork = unitOfWork;
        }



    }
}
