using Ardalis.Result;
using ITX.Application.Dtos.FormManagement;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.FormManagement;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ITX.Application.Interfaces.Identity
{
    public interface IEnumVeriService : IBaseService<EnumVeri, EnumVeriDto>
    {
        Task<Result<List<EnumVeriDto>>> GetEnumListAsync(string fType);
        Task<JsonResult> GetEnumListTableAsync(DataTableViewModel vm, string fType, bool isActive = true, bool isDeleted = false);
        Task<JsonResult> LoadDataTable(DataTableViewModel vm, bool isActive = true, bool isDeleted = false);
    }
}
