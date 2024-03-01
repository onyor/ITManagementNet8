using Ardalis.Result;
using ITX.Application.Dtos.LogManagement;
using ITX.Application.Dtos.ReportManagement;
using ITX.Application.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ITX.Application.Interfaces
{
    public interface IAuditLogService
    {
        Task<JsonResult> LoadDataTableAsync(DataTableViewModel vm, [FromForm] List<SearchParameterDto> aramaKriter);
        Task<List<AuditLogDto>> AuditListGetByFilterAsync(AuditLogSearchDto dto);
        Task<Result<List<AuditLogDto>>> GetAsync(long id);
        Task<Result<List<object>>> GetAllByIslemType();
        Task<JsonResult> GetLogDetailsAsync(DataTableViewModel vm, AuditLogSearchDto dto);
    }
}
