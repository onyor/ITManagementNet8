using ITX.Application.Dtos.FormManagement;
using ITX.Application.ViewModels;
using Ardalis.Result;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ITX.Domain.Entities.FormManagement;

namespace ITX.Application.Interfaces.FormYonetim
{
    public interface IValueNumberService : IBaseService<ValueNumber, ValueNumberDto>
    {
        Task<Result<List<ValueNumberDto>>> GetAllByFormTanimAlanId(long FormTanimId, long FormAlanId);
        Result<ValueNumberDto> GetByFormInfo(long formDegerId, long formAlanId);
        Task<Result<ValueNumberDto>> Add(ValueNumberDto valueNumber);
        Task<Result<ValueNumberDto>> Update(ValueNumberDto valueNumber);
        Task<bool> Delete(ValueNumberDto valueNumber);
        Task<Result<List<ValueNumberDto>>> GetAll(long FormDegerId, bool isActive = true, bool isDeleted = false);
        Task<Result<ValueNumberDto>> Get(long id);
        Task<JsonResult> LoadDataTable(DataTableViewModel vm, bool isActive = true, bool isDeleted = false);
    }
}
