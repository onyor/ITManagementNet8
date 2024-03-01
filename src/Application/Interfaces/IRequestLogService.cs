using ITX.Application.Dtos.LogManagement;
using ITX.Application.ViewModels;
using Ardalis.Result;
using ITX.Domain.Shared.Enums;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ITX.Application.Dtos.ReportManagement;
using System.Collections.Generic;

namespace ITX.Application.Interfaces
{
    public interface IRequestLogService
    {
        Task LogAsync(long fieldId, string fieldName, string fonksiyon, string islem,
            EnmRequestLogTypeCode logType = EnmRequestLogTypeCode.Basarili, string hataKod = "", bool isSystem = false);
        Task<JsonResult> LoadDataTableAsync(DataTableViewModel vm, [FromForm] List<SearchParameterDto> aramaKriter);
        Task<Result<RequestLogDto>> GetAsync(long id);
        Task<Result<List<object>>> GetAllByIslemType();
        void AddAsync(RequestLogDto requestLogDto);
    }
}
