using Microsoft.AspNetCore.Http;
using Serilog.Core;
using Serilog.Events;
using System.Linq;

namespace ITX.WebAPI.Helpers
{
    // https://nblumhardt.com/2020/09/serilog-inject-dependencies/
    public class SerilogUserNameEnricher : ILogEventEnricher
    {
        readonly IHttpContextAccessor _httpContextAccessor;

        // IHttpContextAccessor supplied through constructor injection
        public SerilogUserNameEnricher(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public void Enrich(LogEvent logEvent, ILogEventPropertyFactory factory)
        {
            string userName = "00000000-0000-0000-0000-000000000000";

            var claims = _httpContextAccessor.HttpContext?.User?.Claims;
            if (claims == null) return;
            if (!claims.Any()) return;

            userName = _httpContextAccessor.HttpContext?.User?.Claims
                .FirstOrDefault(t => t.Type == "UserId").Value;
            var userNameProperty = factory.CreateProperty("UserName", userName);
            logEvent.AddPropertyIfAbsent(userNameProperty);
        }
    }
}
