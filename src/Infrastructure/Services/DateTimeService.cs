using ITX.Application.Interfaces;
using System;

namespace ITX.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        private readonly TimeZoneInfo _turkishZone = TimeZoneInfo.FindSystemTimeZoneById("Turkey Standard Time");
        public DateTime Now => TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, _turkishZone);
    }
}
