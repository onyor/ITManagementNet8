﻿using ITX.Application.Repositories.IBase;
using ITX.Domain.Entities.Predefined;

namespace ITX.Application.Repositories.Predefined
{
    public interface IAppSettingRepository : IAsyncRepository<AppSetting>
    {
    }
}
