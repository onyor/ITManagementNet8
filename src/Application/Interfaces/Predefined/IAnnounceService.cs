using Ardalis.Result;
using ITX.Application.Dtos.Predefined;
using ITX.Domain.Entities.Predefined;
using System.Threading.Tasks;

namespace ITX.Application.Interfaces.Predefined
{
    public interface IAnnounceService : IBaseService<Announce, AnnounceDto>
    {}
}
