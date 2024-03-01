using ITX.Application.Dtos.FormManagement;
using ITX.Application.ViewModels;
using Ardalis.Result;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ITX.Domain.Entities.FormManagement;

namespace ITX.Application.Interfaces.FormYonetim
{
    public interface IFormTanimService : IBaseService<FormTanim, FormTanimDto>
    {
        Task<Result<FormTanimDto>> GetByNormalizeAdAsync(string NormalizeAd);
        Task<Result<FormTanimDto>> AddAsync(FormTanimDto formTanim);
        Task<Result<FormTanimDto>> UpdateAsync(FormTanimDto formTanim);
        Task<bool> DeleteAsync(FormTanimDto formTanim);
        Task<Result<List<FormTanimDto>>> GetAllAsync(bool isActive = true, bool isDeleted = false);
        Task<Result<List<FormAlanDto>>> LoadDataColAsync(long formTanimId);
        Task<Result<FormTanimDto>> GetAsync(long id);
        Task<JsonResult> LoadDataTableAsync(DataTableViewModel vm, bool isActive = true, bool isDeleted = false);
    }
}
