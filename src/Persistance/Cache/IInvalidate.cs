using Microsoft.Extensions.Caching.Memory;
using System.Threading.Tasks;

namespace ITX.Persistance.Cache;

public interface IInvalidate
{
    Task<bool> Invalidate();
}
