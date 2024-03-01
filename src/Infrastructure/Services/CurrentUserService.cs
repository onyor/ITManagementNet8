using ITX.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace ITX.Infrastructure.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetUserId()
        { 
            var claims = _httpContextAccessor.HttpContext?.User?.Claims;

            if (claims == null)
            {
                return "00000000-0000-0000-0000-000000000000";
            }

            if (!claims.Any())
            {
                return "00000000-0000-0000-0000-000000000000";
            }

            return _httpContextAccessor.HttpContext?.User?.Claims.FirstOrDefault(t => t.Type == "UserId").Value;
        }
    }
}
