using Ardalis.Result;
using ITX.Application.Dtos.Predefined;
using ITX.Domain.Entities.Predefined;
using System.Threading.Tasks;

namespace ITX.Application.Interfaces.Predefined
{
    public interface IAppSettingService : IBaseService<AppSetting, AppSettingDto>
    {
        Task<string> GetEntityData(string formName, long id, string propertyName = "Ad");
        Task<Result<AppSettingDto>> GetByNameAsync(string name);
        Task<Result<AppSettingDto>> SetByNameAsync(string name, string value);
    }
}
