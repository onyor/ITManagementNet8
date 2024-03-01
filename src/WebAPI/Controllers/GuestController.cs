using Ardalis.Result;
using ITX.Application.Dtos.Predefined;
using ITX.Application.Interfaces.Identity;
using ITX.Application.Interfaces.Predefined;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ITX.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class GuestController : BaseController
    {
        private readonly IEnumVeriService _enumVeriService;
        private readonly ICurrencyDefinitionService _CurrencyDefinitionService;
        private readonly ICountryService _countryService;
        private readonly ICityService _cityService;
        private readonly IDistrictService _districtService;
        private readonly IAppSettingService _AppSettingService;
        private readonly IAnnounceService _announceService;

        public GuestController(IEnumVeriService enumVeriService,
            ICurrencyDefinitionService CurrencyDefinitionService,
            ICountryService countryService,
            ICityService cityService,
            IDistrictService districtService,
            IAppSettingService AppSettingService,
            IAnnounceService announceService
            )
        {
            _enumVeriService = enumVeriService;
            _CurrencyDefinitionService = CurrencyDefinitionService;
            _countryService = countryService;
            _cityService = cityService;
            _districtService = districtService;
            _AppSettingService = AppSettingService;
            _announceService = announceService;
        }

        [HttpPost("GetByNameList")]
        public async Task<Result<List<AppSettingDto>>> GetByNameListAsync([FromBody] List<string> names)
        {
            var results = new List<AppSettingDto>();

            foreach (var name in names)
            {
                var result = await _AppSettingService.GetByNameAsync(name.Trim());
                if (result.Value != null)
                {
                    results.Add(result.Value);
                }
            }

            return Result.Success(results);
        }

        [HttpGet("/CustomerServiceAsync")]
        public async Task<Result<bool>> CustomerServiceAsync()
        {
            var result = await _countryService.CustomerServiceAsync();

            return Result.Success(result.Value);
        }
    }
}
