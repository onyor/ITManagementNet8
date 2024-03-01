using Ardalis.Result;
using ITX.Application.Dtos.Identity;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ITX.Application.Interfaces.Predefined
{
    public interface IMenuService : IBaseService<Menu, MenuDto>
    {
        //Task<Result<MenuDto>> AddAsync(MenuDto dto);
        //Task<Result<MenuDto>> UpdateAsync(MenuDto dto);
        //Task<Result<bool>> DeleteAsync(Expression<Func<Menu, bool>> predicate = null);
        //Task<Result<MenuDto>> GetAsync(Expression<Func<Menu, bool>>? predicate = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes);
        //Task<Result<List<MenuDto>>> GetAllAsync(Expression<Func<Menu, bool>>? predicate = null, Func<IQueryable<Menu>, IOrderedQueryable<Menu>>? orderBy =
        //                                              null, bool isActive = true, bool isDeleted = false, bool enableTracking = true, bool ignoreState = false, params string[] includes);
        new Task<Result<JsonResult>> LoadDataTableAsync(DataTableViewModel vm, Expression<Func<Menu, bool>> predicate = null, Func<IQueryable<Menu>,
                                               IOrderedQueryable<Menu>>? orderBy = null, bool isActive = true, bool isDeleted = false, params string[] includes);
        Task<MenuDto> GetByNameAsync(string name);
        Task<IReadOnlyList<dynamic>> GetMenusByRoleId(string roleId, string path);
        Task<IReadOnlyList<MenuInfoViewModel>> GetMenuInfoByRoleId(string roleId, string path);
        Task<Result<Dictionary<string, List<MenuRoleDto>>>> GetMenusByUrl();
    }
}
