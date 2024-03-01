using System;
using System.Threading.Tasks;

namespace ITX.Persistance.Cache;

public abstract class InvalidateBase
{
        private readonly IServiceProvider _serviceProvider;
    public DateTime? LastInvalidateTime { get; private set; }

    public virtual TimeSpan? InvalidatePeriod { get; }

    public virtual Task<bool> Invalidate()
    {
        this.LastInvalidateTime = DateTime.Now;

        return Task.FromResult(true);
    }
}
