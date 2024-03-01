using ITX.Application.Dtos.FormManagement;
using ITX.Application.ViewModels;
using Ardalis.Result;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ITX.Domain.Entities.FormManagement;

namespace ITX.Application.Interfaces.FormYonetim
{
    public interface IFormDegerService : IBaseService<FormDeger, FormDegerDto>
    {
        Task<Result<List<FormDegerDto>>> GetByFormTanimIdAsync(long FormTanimId);
        Task<Result<FormDegerDto>> AddAsync(FormDegerDto formDeger);
        Task<Result<FormDegerDto>> UpdateAsync(FormDegerDto formDeger);
        Task<bool> DeleteAsync(FormDegerDto formDeger);
        Task<Result<List<FormDegerDto>>> GetAllAsync(bool isActive = true, bool isDeleted = false);
        Task<Result<FormDegerDto>> GetAsync(long id);
        Task<JsonResult> LoadDataTableAsync(DataTableViewModel vm, bool isActive = true, bool isDeleted = false);
        Task<JsonResult> SimpleLoadDataTableAsync(DataTableViewModel vm, bool isActive = true, bool isDeleted = false);

        Task<string> GetValueTextAsync(string formNormalizeAd, string columnName, long formDegerId);
        Task<decimal> GetValueNumberAsync(string formNormalizeAd, string columnName, long formDegerId);
        Task<long> GetFormDegerIdFromMetinAsync(string formNormalizeAd, string columnName, string valueText);
    }
}
