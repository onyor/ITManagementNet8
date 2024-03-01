using ITX.Application.Dtos.FormManagement;
using ITX.Application.ViewModels;
using Ardalis.Result;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ITX.Domain.Entities.Test;
using ITX.Domain.Entities.FormManagement;

namespace ITX.Application.Interfaces.FormYonetim
{
    public interface IDegerTarihService : IBaseService<DegerTarih, DegerTarihDto>
    {
        Task<Result<List<DegerTarihDto>>> GetAllByFormTanimAlanId(long FormTanimId, long FormAlanId);
        Result<DegerTarihDto> GetByFormInfo(long formDegerId, long formAlanId);
        Task<Result<DegerTarihDto>> Add(DegerTarihDto degerTarih);
        Task<Result<DegerTarihDto>> Update(DegerTarihDto degerTarih);
        Task<bool> Delete(DegerTarihDto degerTarih);
        Task<Result<List<DegerTarihDto>>> GetAll(long FormDegerId, bool isActive = true, bool isDeleted = false);
        Task<Result<DegerTarihDto>> Get(long id);
        Task<JsonResult> LoadDataTable(DataTableViewModel vm, bool isActive = true, bool isDeleted = false);
    }
}
