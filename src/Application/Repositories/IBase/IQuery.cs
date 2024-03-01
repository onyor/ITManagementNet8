using System.Linq;

namespace ITX.Application.Repositories.IBase;

public interface IQuery<T>
{
    IQueryable<T> Query();
}