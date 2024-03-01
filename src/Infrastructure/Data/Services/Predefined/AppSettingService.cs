using Ardalis.Result;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ITX.Application.Dtos.Predefined;
using ITX.Application.Interfaces.Predefined;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Domain.Entities.Test;
using ITX.Domain.Entities.Predefined;
using ITX.Persistance.Database.Context;
using ITX.Persistance.Extensions;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Reflection;
using System.Threading.Tasks;
using ITX.Application.Interfaces;
using ITX.Infrastructure.Helpers;

namespace ITX.Infrastructure.Data.Services.Predefined
{
    public class AppSettingService : BaseService<AppSetting, AppSettingDto>, IAppSettingService
    {
        public AppSettingService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<AppSetting> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {
        }

        public async Task<string> GetEntityData(string formName, long id, string propertyName = "Ad")
        {
            var getEntityTypes = _context.Model.GetEntityTypes().Select(x => x.ClrType).Where(z => z.Name == formName).FirstOrDefault();
            MethodInfo SetMethod = typeof(DbContext).GetMethod(nameof(DbContext.Set), Type.EmptyTypes);
            var tableData = (IQueryable<Object>)SetMethod.MakeGenericMethod(getEntityTypes).Invoke(_context, null);
            var deger = "";
            if (tableData != null && tableData.Count() > 0)
            {
                var valuX = tableData.Where("(IsActive AND !IsDeleted) AND Id==" + id.ToString()).FirstOrDefault();
                if (valuX != null)
                    deger = valuX.xGetMemberValue(propertyName).xToString();
            }
            return Result<string>.Success(deger);
        }

        public async Task<Result<AppSettingDto>> GetByNameAsync(string name)
        {
            try
            {
                var AppSetting = await _unitOfWork.Repository<AppSetting>().GetAsync(predicate: x => x.Ad == name && !x.IsDeleted && x.IsActive);

                var dto = _mapper.Map<AppSettingDto>(AppSetting);

                return Result<AppSettingDto>.Success(dto);
            }
            catch (Exception ex)
            {
                return Result<AppSettingDto>.Error(ex.Message);
            }
        }

        public async Task<Result<AppSettingDto>> SetByNameAsync(string name, string value)
        {
            try
            {
                var AppSetting = await _context.AppSettings
                .FirstOrDefaultAsync(x => x.Ad == name && !x.IsDeleted && x.IsActive);

                AppSetting.Deger = value;

                var dto = _mapper.Map<AppSettingDto>(AppSetting);

                await _context.SaveChangesAsync();

                return Result<AppSettingDto>.Success(dto);
            }
            catch (Exception ex)
            {
                return Result<AppSettingDto>.Error(ex.Message);
            }
        }
    }
}
