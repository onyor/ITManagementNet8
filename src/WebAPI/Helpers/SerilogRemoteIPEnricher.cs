using Microsoft.AspNetCore.Http;
using Serilog.Core;
using Serilog.Events;

namespace ITX.WebAPI.Helpers
{
    public class SerilogRemoteIPEnricher : ILogEventEnricher
    {
        readonly IHttpContextAccessor _httpContextAccessor;

        // IHttpContextAccessor supplied through constructor injection
        public SerilogRemoteIPEnricher(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public void Enrich(LogEvent logEvent, ILogEventPropertyFactory factory)
        {
            string remoteIP = $"({_httpContextAccessor.HttpContext?.Connection.RemoteIpAddress.ToString() ?? "unknown"})";
            logEvent.AddPropertyIfAbsent(new LogEventProperty("RemoteIP", new ScalarValue(remoteIP)));
        }
    }
}
