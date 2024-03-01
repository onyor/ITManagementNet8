using Ardalis.Result;
using ITX.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace ITX.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : BaseController
    {
        private readonly IFileStorage _fileStorage;

        public FilesController(IFileStorage fileStorage
            )
        {
            _fileStorage = fileStorage;
        }

        [HttpPost()]
        public async Task<Result<string>> Upload(IFormFile file)
        {
            try
            {
                var storeResult = await _fileStorage.StoreFileAsync(file);

                return storeResult;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);

                return Result<string>.Error(ex.Message);
            }
        }

        [HttpDelete("{filename}")]
        public Result<bool> Delete(string filename)
        {
            try
            {
                var deleteResult = _fileStorage.DeleteFile(filename);

                return deleteResult;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);

                return Result<bool>.Error(ex.Message);
            }
        }

    }
}
