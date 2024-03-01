using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Threading.Tasks;

namespace ITX.WebMVC.Extensions
{
    public class LogoutUsersMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ISessionService _sessionService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public LogoutUsersMiddleware(RequestDelegate next, ISessionService sessionService, IHttpContextAccessor httpContextAccessor)
        {
            _next = next;
            _sessionService = sessionService;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task Invoke(HttpContext context, ISessionService sessionService)
        {
            
            var userId = context.User.Claims.FirstOrDefault(c => c.Type == "UserId");
            if (userId != null && sessionService.ShouldLogout(userId.Value))
            {
                // Kullanıcı çıkış yap
                await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

                // Çerezleri temizle (opsiyonel, ihtiyaca göre ayarlanabilir)
                var cookies = context.Request.Cookies.Keys;
                foreach (var cookie in cookies)
                {
                    context.Response.Cookies.Delete(cookie);
                }

                sessionService.ClearLogout(userId.Value);

                // Kullanıcıyı giriş sayfasına yönlendir
                context.Response.Redirect("/Account/Login");
                return;
            }

            await _next(context);
        }
    }
}
