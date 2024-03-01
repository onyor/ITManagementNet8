using Microsoft.AspNetCore.Http;
using ITX.Application;
using System.Threading.Tasks;

namespace ITX.WebMVC.Extensions
{
    public class CookieMiddleware
    {
        private readonly RequestDelegate _next;

        public CookieMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Çerez ekleyin.
            context.Response.Cookies.Append("ApiBaseUrl", ApplicationData.ApiBaseURL);

            // Sonraki middleware'e geçin.
            await _next(context);
        }
    }
}
