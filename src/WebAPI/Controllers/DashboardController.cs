using Ardalis.Result;
using AutoMapper;
using DevExpress.ClipboardSource.SpreadsheetML;
using ITX.Application.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Dynamic;
using System.IO;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ITX.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;

        public DashboardController(IMapper mapper,
            IWebHostEnvironment env)
        {
            _mapper = mapper;
            _env = env;
        }

        [HttpPost("Vertical/Panel1")]  // RiskSituationByRequest
        public async Task<Result<JsonResult>> Panel1()
        {
            var vm = new DataTableViewModel(Request);

            var filePath = Path.Combine(_env.ContentRootPath, "DummyJson", "RiskSituationByRequest.json");

            if (!System.IO.File.Exists(filePath))
                return Result.NotFound();

            var jsonData = await System.IO.File.ReadAllTextAsync(filePath);

            return new JsonResult(new
            {
                draw = vm.Draw,
                recordsFiltered = 0,
                recordsTotal = 0,
                data = JsonSerializer.Deserialize<object>(jsonData)
            });
        }

        [HttpGet("Vertical/Panel2")]  // RequestAndAppointmentCount
        public async Task<Result<string>> Panel2()
        {
            var filePath = Path.Combine(_env.ContentRootPath, "DummyJson", "RequestAndAppointmentCount.json");

            if (!System.IO.File.Exists(filePath))
                return Result.NotFound();

            var jsonData = await System.IO.File.ReadAllTextAsync(filePath);

            return Result<string>.Success(jsonData);
        }

        [HttpGet("Vertical/Panel3")]  // LocationsBySubGrpId
        public async Task<Result<object>> Panel3()
        {

            var filePath = Path.Combine(_env.ContentRootPath, "DummyJson", "LocationsBySubGrpId.json");

            if (!System.IO.File.Exists(filePath))
                return Result.NotFound();

            var jsonData = await System.IO.File.ReadAllTextAsync(filePath);

            return Result<object>.Success(jsonData);
        }

        [HttpGet("Vertical/Panel4")]  // GetAllRequestForAreaAdmin
        public async Task<Result<object>> Panel4()
        {
            var filePath = Path.Combine(_env.ContentRootPath, "DummyJson", "GetAllRequestForAreaAdmin.json");

            if (!System.IO.File.Exists(filePath))
                return Result.NotFound();

            var jsonData = await System.IO.File.ReadAllTextAsync(filePath);

            return Result<object>.Success(jsonData);
        }

        [HttpGet("Vertical/Panel5")]  // GetAdviserCountersDataForAdmin
        public async Task<Result<object>> Panel5()
        {
            var filePath = Path.Combine(_env.ContentRootPath, "DummyJson", "GetAdviserCountersDataForAdmin.json");
            if (!System.IO.File.Exists(filePath))
                return Result.NotFound();

            var jsonData = await System.IO.File.ReadAllTextAsync(filePath);

            return Result<object>.Success(jsonData);
        }

        [HttpGet("Vertical/Panel6")]  // Calendar
        public async Task<Result<object>> Panel6()
        {
            var filePath = Path.Combine(_env.ContentRootPath, "DummyJson", "Calendar.json");
            if (!System.IO.File.Exists(filePath))
                return Result.NotFound();

            var jsonData = await System.IO.File.ReadAllTextAsync(filePath);

            return Result<object>.Success(jsonData);
        }
    }
}
