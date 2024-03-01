using ITX.Persistance.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;

namespace ITX.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BaseController : ControllerBase
    {
        private ILogger<FilesController> _loggerInstance;
        protected ILogger<FilesController> Logger => _loggerInstance ??= HttpContext.RequestServices.GetService<ILogger<FilesController>>();


        [ApiExplorerSettings(IgnoreApi = true)]
        public Guid GetActiveUserId() => Guid.Parse(HttpContext.User.Claims.First(t => t.Type == "UserId").Value);

        [ApiExplorerSettings(IgnoreApi = true)]
        public long GetActiveClientId() => (long)(HttpContext?.User?.Claims.First(t => t.Type == "ClientId").Value.xToLong());

        [ApiExplorerSettings(IgnoreApi = true)]
        public string GenerateRandomPassword(byte PasswordLength = 10)
        {
            string ResultData = "";
            Random r = new Random();
            //for (int i = 0; i < PasswordLength; i++)
            //    ResultData += r.Next(0, 9).ToString();
            ResultData = r.Next(0, 999999).ToString("D" + PasswordLength);

            return ResultData;
        }
    }
}
