using ITX.Application.Dtos.LogManagement;
using ITX.Application.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ITX.Application.Interfaces.Identity
{
    public interface IDataService
    {
        Task<JsonResult> FillDataTableAuditLog(DataTableViewModel vm);
        Task<AuditLogDto> GetAuditLogById(long id);

        List<EnumViewModel> GetEnumListByCode(string enumCode);

    }
}
