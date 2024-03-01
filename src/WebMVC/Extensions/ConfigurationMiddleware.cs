using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using ITX.Application;
using System.Threading.Tasks;

namespace ITX.WebMVC.Extensions
{
    public class ConfigurationMiddleware
    {
        private readonly RequestDelegate _next;

        public ConfigurationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext, IConfiguration configuration)
        {
            httpContext.Items["SecretKey"] = configuration["SecretKey"];
            await _next(httpContext);
        }
    }

}
