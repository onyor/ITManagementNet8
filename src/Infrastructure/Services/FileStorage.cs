using Ardalis.Result;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ITX.Application.Interfaces;
using ITX.Application.Shared;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ITX.Infrastructure.Services
{
    public class FileStorage : IFileStorage
    {
        private readonly IConfiguration _config;
        private readonly ILogger<FileStorage> _logger;
        private readonly IRequestLogService _requestLogService;
        public FileStorage(IConfiguration config, ILogger<FileStorage> logger,
            IRequestLogService requestLogService)
        {
            _config = config;
            _logger = logger;
            _requestLogService = requestLogService;
        }

        public async Task<Result<string>> StoreFileAsync(IFormFile file)
        {
            try
            {
                if (file == null)
                {
                    return Result<string>.Invalid(new List<ValidationError>
                    {
                        new ValidationError
                        {
                            Identifier = nameof(file),
                            ErrorMessage = $"Dosya boş olamaz!",
                        }
                    });
                }

                if (file.Length == 0)
                {
                    return Result<string>.Invalid(new List<ValidationError>
                    {
                        new ValidationError
                        {
                            Identifier = nameof(file),
                            ErrorMessage = $"Dosya boyutu 0 byte olamaz!",
                        }
                    });
                }

                int maxSize = ((int)AppConstants.MaxImageSize / (1024 * 1024));
                if (file.Length > AppConstants.MaxImageSize)
                {
                    return Result<string>.Invalid(new List<ValidationError>
                    {
                        new ValidationError
                        {
                            Identifier = nameof(file),
                            ErrorMessage = $"Dosya boyutu {maxSize} dan daha büyük olamaz!",
                        }
                    });
                }

                var fileExt = Path.GetExtension(file.FileName).ToLower();
                if (!AppConstants.AcceptedImageTypes.Any(s => s == fileExt))
                {
                    return Result<string>.Invalid(new List<ValidationError>
                    {
                        new ValidationError
                        {
                            Identifier = nameof(file),
                            ErrorMessage = $"İzin verilen dosya türleri içinde yok: {fileExt} !",
                        }
                    });
                }

                var uploadFolderPath = Path.Combine(Directory.GetCurrentDirectory(),
                    _config["UploadPath"], "images");
                if (!Directory.Exists(uploadFolderPath))
                {
                    Directory.CreateDirectory(uploadFolderPath);
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadFolderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                _logger.LogInformation("FileStorage.StoreFileAsync: {DosyaAd} yüklendi", file.FileName);
                //await _requestLogService.LogAsync(1, file.FileName, "FileStorage.StoreFileAsync", "Dosya eklendi");

                return Result<string>.Success(fileName);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("FileStorage.StoreFileAsync: {DosyaAd} yüklenirken hata oluştu: {Hata}", file.FileName, ex.Message);
                //await _requestLogService.LogAsync(1, file.FileName, "FileStorage.StoreFileAsync", "Dosya ekleme", RequestLogTypeCode.Hatali, ex.Message);

                return Result<string>.Error(ex.Message);
            }
        }

        public Result<bool> DeleteFile(string fileName)
        {
            try
            {
                var uploadFolderPath = Path.Combine(Directory.GetCurrentDirectory(),
                    _config["UploadPath"], "images");
                var filePath = Path.Combine(uploadFolderPath, fileName);
                if (!File.Exists(filePath))
                {
                    _logger.LogWarning("FileStorage.DeleteFile: {DosyaAd} bulunamadı!", fileName);

                    return Result<bool>.NotFound();
                }

                File.Delete(filePath);
                _logger.LogInformation("FileStorage.DeleteFile: {DosyaAd} silindi", fileName);

                return Result<bool>.Success(true);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("FileStorage.DeleteFile: {DosyaAd} silinirken hata oluştu: {Hata}", fileName, ex.Message);

                return Result<bool>.Error(ex.Message);
            }
        }
    }
}