using Ardalis.Result;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace ITX.Application.Interfaces
{
    public interface IFileStorage
    {
        Task<Result<string>> StoreFileAsync(IFormFile file);
        Result<bool> DeleteFile(string fileName);
    }
}
