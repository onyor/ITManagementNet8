using ITX.Application.Dtos.FormManagement;
using ITX.Application.ViewModels;
using Ardalis.Result;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ITX.Domain.Entities.FormManagement;

namespace ITX.Application.Interfaces.FormYonetim
{
    public interface IValueTextService : IBaseService<ValueText, ValueTextDto>
    {
        Task<Result<List<ValueTextDto>>> GetAllByFormTanimAlanId(long FormTanimId, long FormAlanId);
        Result<ValueTextDto> GetByFormInfo(long formDegerId, long formAlanId);
        Task<Result<ValueTextDto>> Add(ValueTextDto valueText);
        Task<Result<ValueTextDto>> Update(ValueTextDto valueText);
        Task<bool> Delete(ValueTextDto valueText);
        Task<Result<List<ValueTextDto>>> GetAll(long FormDegerId, bool isActive = true, bool isDeleted = false);
        Task<Result<ValueTextDto>> Get(long id);
        Task<JsonResult> LoadDataTable(DataTableViewModel vm, bool isActive = true, bool isDeleted = false);
    }
}
