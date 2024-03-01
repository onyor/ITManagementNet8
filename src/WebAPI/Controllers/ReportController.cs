using AutoMapper;
using ITX.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ITX.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IRequestLogService _requestLogService;


        public ReportController(IMapper mapper,
            IRequestLogService requestLogService
            )
        {
            _mapper = mapper;
            _requestLogService = requestLogService;
        }

    }
}
