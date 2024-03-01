using ITX.Application.Dtos.FormManagement;
using ITX.Application.ViewModels;
using Ardalis.Result;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ITX.Domain.Entities.FormManagement;

namespace ITX.Application.Interfaces.FormYonetim
{
    public interface IFormAlanService : IBaseService<FormAlan, FormAlanDto>
    {
        Task<Result<FormAlanDto>> GetByFormTanimIdWithName(long formTanimId, string colAd);
        Task<Result<FormAlanDto>> AddAsync(FormAlanDto formAlan);
        Task<Result<FormAlanDto>> UpdateAsync(FormAlanDto formAlan);
        Task<bool> DeleteAsync(FormAlanDto formAlan);

        Task<Result<List<FormAlanDto>>> GetAllAsync(long ustId, bool isActive = true, bool isDeleted = false);
        Task<Result<FormAlanDto>> GetAsync(long id);

        Task<JsonResult> LoadDataTableAsync(DataTableViewModel vm, bool isActive = true, bool isDeleted = false);
    }
}
