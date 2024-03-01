using Ardalis.Result;
using AutoMapper;
using ITX.Application.Dtos.Identity;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.Predefined;
using ITX.Application.Repositories.IBase;
using ITX.Application.Shared;
using ITX.Application.Specifications;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.Identity;
using ITX.Infrastructure.Data.Validators;
using ITX.Infrastructure.Helpers;
using ITX.Persistance.Database.Context;
using ITX.Persistance.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Infrastructure.Data.Services.Identity
{
    public class MenuService : BaseService<Menu, MenuDto>, IMenuService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MenuService(IMapper mapper,
         ITManagementDbContext context,
         IAsyncRepository<Menu> repository,
         IHttpContextAccessor httpContextAccessor,
         IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public new async Task<Result<MenuDto>> AddAsync(MenuDto dto)
        {
            var menu = _mapper.Map<Menu>(dto);

            var validator = new MenuValidator(); new MenuValidator();
            var valResult = await validator.ValidateAsync(menu);
            if (!valResult.IsValid)
            {
                return Result<MenuDto>.Invalid(valResult.AsErrors());
            }

            menu.IsActive = true;
            if (menu.ParentId == 0)
            {
                menu.ParentId = null;
            }
            await _context.Menus.AddAsync(menu);
            await _context.SaveChangesAsync();

            return Result<MenuDto>.Success(_mapper.Map<MenuDto>(menu));
        }

        public new async Task<Result<MenuDto>> UpdateAsync(MenuDto dto)
        {
            try
            {
                var menu = _mapper.Map<Menu>(dto);
                bool isAdmin = _httpContextAccessor.HttpContext?.User?.Claims.Any(c => c.Type == ClaimTypes.Role && c.Value == "Admin") ?? false;
                var oldMenu = await _context.Menus
                    .Include(x => x.MenuRoles)
                    .SingleOrDefaultAsync(x => x.Id == menu.Id);

                var oldRoleIds = oldMenu.MenuRoles.Select(x => x.RoleId).ToList();
                var newRoleIds = menu.MenuRoles.Select(x => x.RoleId).ToList();

                var roleIdsToAdd = newRoleIds.Except(oldRoleIds);
                foreach (var roleId in roleIdsToAdd)
                {
                    oldMenu.MenuRoles.Add(new MenuRole
                    {
                        MenuId = menu.Id,
                        RoleId = roleId
                    });
                }

                var roleIdsToRemove = oldRoleIds.Except(newRoleIds);
                foreach (var roleId in roleIdsToRemove)
                {
                    var roleMenu = oldMenu.MenuRoles.FirstOrDefault(x => x.RoleId == roleId);
                    if (roleMenu != null)
                        if (isAdmin)
                            oldMenu.MenuRoles.Remove(roleMenu);
                        else
                            if (roleId != Guid.Parse("b79f1af0-5a42-42ab-9b7f-9d3c8ae8f14e"))
                            oldMenu.MenuRoles.Remove(roleMenu);

                }

                oldMenu.Name = menu.Name;
                oldMenu.Icon = menu.Icon;
                oldMenu.Url = menu.Url;
                oldMenu.Description = menu.Description;
                oldMenu.Order = menu.Order;
                oldMenu.Param = menu.Param;
                oldMenu.IsNotMenuVisible = menu.IsNotMenuVisible;

                oldMenu.UpdatedAt = DateTime.Now;

                if (menu.ParentId == 0 || menu.Id == menu.ParentId)
                {
                    oldMenu.ParentId = null;
                }
                else
                {
                    oldMenu.ParentId = menu.ParentId;
                }

                await _context.SaveChangesAsync();
                return Result<MenuDto>.Success(_mapper.Map<MenuDto>(menu));

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public async Task<Result<bool>> DeleteAsync(Expression<Func<Menu, bool>> predicate = null)
        //{
        //    var dto = await GetAsync(predicate);
        //    if (dto == null)
        //    {
        //        throw new Exception("Entity not found");
        //    }

        //    // Assuming TEntity has a property named "IsDeleted"
        //    var property = typeof(UserClaimDto).GetProperty("IsDeleted");
        //    if (property == null)
        //    {
        //        throw new Exception("IsDeleted property not found on type " + typeof(MenuAllDto).Name);
        //    }

        //    property.SetValue(dto, true);
        //    //return (await UpdateAsync(dto) != null);
        //    return null;
        //}

        public async Task<Result<List<MenuDto>>> GetAllAsync(Expression<Func<Menu, bool>> predicate = null, Func<IQueryable<Menu>, IOrderedQueryable<Menu>> orderBy =
                                                      null, bool isActive = true, bool isDeleted = false, bool enableTracking = true, bool ignoreState = false, params string[] includes)
        {
            var menus = await _context.Menus.Where(x => x.IsActive && !x.IsDeleted)
                .OrderBy(x => x.ParentId)
                    .ThenBy(y => y.Order)
                .ToListAsync();

            return _mapper.Map<List<MenuDto>>(menus);
        }

        public new async Task<Result<JsonResult>> LoadDataTableAsync(DataTableViewModel vm, Expression<Func<Menu, bool>> predicate = null, Func<IQueryable<Menu>, IOrderedQueryable<Menu>> orderBy = null, bool isActive = true, bool isDeleted = false, params string[] includes)
        {
            try
            {
                int recordsTotal = _context.Menus.Where(x => /*x.IsActive && */!x.IsDeleted).Count();
                int recordsFiltered = recordsTotal;

                var menuInfo = _context.Menus
                    .Include(x => x.Parent)
                    .Include(x => x.MenuRoles)
                        .ThenInclude(y => y.Role)
                    .Where(x => /*x.IsActive &&*/ !x.IsDeleted);

                //foreach (var menu in menuInfo)
                //{
                //    menu.MenuRoles = menu.MenuRoles
                //        .Where(mr => mr.IsActive && !mr.IsDeleted)
                //        .ToList();
                //}
                var menuData = menuInfo.Select(tempMenu => new
                {
                    tempMenu.Id,
                    tempMenu.Name,
                    tempMenu.Order,
                    ParentName = tempMenu.ParentId != null ? tempMenu.Parent.Name : "",
                    tempMenu.Url,
                    RoleNames = tempMenu.MenuRoles.Select(x => x.Role.Name),
                    MenuRolesCsv = string.Join(", ", tempMenu.MenuRoles.Select(x => x.Role.Name))
                });

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
                {
                    menuData = menuData.OrderByDescending(x => x.Name).ThenBy($"{vm.SortColumn} {vm.SortColumnDirection}");
                }

                //Search
                if (!string.IsNullOrEmpty(vm.SearchValue))
                {
                    // İlk olarak, veritabanından veriyi çekin
                    var menuDataList = await menuData.ToListAsync();

                    var normalizedSearchValue = StringExtension.NormalizeTurkishCharacters(vm.SearchValue).ToLower(new CultureInfo("tr-TR"));

                    menuData = menuDataList.Where(m =>
                        StringExtension.NormalizeTurkishCharacters(m.Name).ToLower(new CultureInfo("tr-TR")).Contains(normalizedSearchValue) ||
                        StringExtension.NormalizeTurkishCharacters(m.ParentName).ToLower(new CultureInfo("tr-TR")).Contains(normalizedSearchValue) ||
                        m.RoleNames.Any(x => StringExtension.NormalizeTurkishCharacters(x).ToLower(new CultureInfo("tr-TR")).Contains(normalizedSearchValue)))
                        .AsQueryable();

                    recordsFiltered = menuData.Count();
                }

                var data = menuData.Skip(vm.Skip).Take(vm.PageSize);

                return new JsonResult(new
                {
                    draw = vm.Draw,
                    recordsFiltered,
                    recordsTotal,
                    data
                });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MenuDto> GetByNameAsync(string name)
        {
            var menu = await _context.Menus
                .FirstOrDefaultAsync(x => x.Name == name && x.IsActive && !x.IsDeleted);

            return _mapper.Map<MenuDto>(menu);
        }

        public async Task<IReadOnlyList<Menu>> GetAllWithoutParentAsync()
        {
            return await _context.Menus
                .Where(x => x.ParentId == null)
                .OrderBy(x => x.ParentId)
                    .ThenBy(y => y.Order)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<dynamic>> GetMenusByRoleId(string roleId, string path)
        {


            var menus = await (from menu in _context.Menus
                               join menuRole in _context.MenuRoles on menu.Id equals menuRole.MenuId
                               where !menu.IsDeleted && roleId.Contains(menuRole.RoleId.ToString())
                               orderby menu.Order

                               select new MenuInfoViewModel
                               {
                                   Id = menu.Id,
                                   Name = menu.Name,
                                   Description = menu.Description,
                                   Icon = menu.Icon,
                                   Url = menu.Param != null && menu.Param.Length > 0 ? menu.Url + "?param=" + menu.Param : menu.Url,
                                   Order = menu.Order,
                                   ParentId = menu.ParentId
                               }).Distinct().ToListAsync();

            return menus;
        }

        public async Task<IReadOnlyList<MenuInfoViewModel>> GetMenuInfoByRoleId(string roleId, string path)
        {
            var menus = await (from menu in _context.Menus
                               join menuRole in _context.MenuRoles on menu.Id equals menuRole.MenuId
                               where !menu.IsDeleted && roleId.Contains(menuRole.RoleId.ToString()) && !menu.IsNotMenuVisible
                               orderby menu.Order
                               select new MenuInfoViewModel
                               {
                                   Id = menu.Id,
                                   Name = menu.Name,
                                   Description = menu.Description,
                                   Icon = menu.Icon,
                                   Url = menu.Param != null && menu.Param.Length > 0 ? menu.Url + "?param=" + menu.Param : menu.Url,
                                   Order = menu.Order,
                                   ParentId = menu.ParentId
                               }).Distinct().ToListAsync();


            List<MenuInfoViewModel> menuList = new List<MenuInfoViewModel>();
            await AddChildMenu(menuList, null, null, menus);

            return menuList;
        }

        public async Task<Result<Dictionary<string, List<MenuRoleDto>>>> GetMenusByUrl()
        {
            try
            {
                var menus = await _context.Menus
                    .Include(x => x.MenuRoles).ThenInclude(x => x.Role)
                    .Where(m => m.Url != "" && !m.IsDeleted && m.IsActive && m.MenuRoles.Any(mR => !mR.IsDeleted && mR.IsActive))
                    .ToListAsync();

                var groupedMenuRoleDtos = menus.SelectMany(m => m.MenuRoles,
                                            (m, mR) =>
                                            new { Url = m.Url ?? "DefaultUrl", mR })
                               .GroupBy(x => x.Url)
                               .ToDictionary(
                                   group => group.Key,
                                   group => _mapper.Map<List<MenuRoleDto>>(group.Select(x => x.mR).ToList())
                               );

                return Result<Dictionary<string, List<MenuRoleDto>>>.Success(groupedMenuRoleDtos);
            }
            catch (Exception ex)
            {
               return Result<Dictionary<string, List<MenuRoleDto>>>.Error(ex.Message);
            }
        }

        private async Task<List<MenuInfoViewModel>> AddChildMenu(List<MenuInfoViewModel> menuList, long? topMenuId, string topMenuName, List<MenuInfoViewModel> mainList)
        {
            var childMenus = mainList.Where(x => x.ParentId == topMenuId).OrderBy(x => x.Order).ToList();
            foreach (var childMenu in childMenus)
            {
                MenuInfoViewModel mi = new MenuInfoViewModel();
                mi.Id = childMenu.Id;
                mi.Description = childMenu.Description;
                mi.Icon = childMenu.Icon;
                mi.ParentId = topMenuId;
                mi.Name = childMenu.Name;
                mi.Order = childMenu.Order;
                mi.Url = childMenu.Url;
                mi.ParentName = topMenuName;
                List<MenuInfoViewModel> menuListChild = new List<MenuInfoViewModel>();
                mi.SubMenus = await AddChildMenu(menuListChild, mi.Id, mi.Name, mainList);
                menuList.Add(mi);
            }
            return menuList;
        }

        private string GenerateURL(DataRow[] menu, DataTable table, StringBuilder sb, string path = "")
        {
            if (menu.Length > 0)
            {
                foreach (DataRow dr in menu)
                {
                    var param = "";
                    if (dr["Param"].ToString() != "")
                        param = "?param=" + dr["Param"].ToString();

                    string url = dr["Url"].ToString() + param;
                    string menuText = "";
                    //string cookieValue = Request.Cookies["language"];

                    menuText = dr["Name"].ToString();
                    string icon = dr["Icon"].ToString();
                    string pid = dr["Id"].ToString();
                    string parentId = dr["ParentId"].ToString();

                    DataRow[] subMenu = table.Select(string.Format("ParentId = '{0}'", pid));

                    if (subMenu.Length == 0)
                    {
                        //menuText += "<span class='badge badge-info right'>6</span>";
                        string line = "";

                        if (!string.IsNullOrEmpty(path) && url.Contains(path))
                        {
                            line = string.Format("<li class=\"active\"><a href=\"/{0}\" class=\"nav-link\" title=\"{1}\" data-filter-tags=\"{1}\"><i class=\"{2}\"></i> <span class=\"nav-link-text\">{1}</span></a></li>", url, menuText, "nav-icon " + icon);
                        }
                        else
                        {
                            line = string.Format("<li><a href=\"/{0}\" class=\"nav-link\" title=\"{1}\" data-filter-tags=\"{1}\"><i class=\"{2}\"></i> <span class=\"nav-link-text\">{1}</span></a></li>", url, menuText, "nav-icon " + icon);
                        }

                        sb.Append(line);
                    }

                    if (subMenu.Length > 0 && !pid.Equals(parentId))
                    {
                        //string line = String.Format(@"<li class=""treeview""><a href=""#""><i class=""{0}""></i> <span>{1}</span><span class=""pull-right-container""><i class=""fa fa-angle-left pull-right""></i></span></a><ul class=""treeview-menu"">", icon, menuText);
                        string line = string.Format("<li><a   class=\"nav-link\" title=\"{1}\" data-filter-tags=\"{1}\"><i class=\"{2}\"></i> <span class=\"nav-link-text\">{1}</span></a> <ul class=\"nav nav-treeview\">", "url", menuText, "nav-icon " + icon);

                        for (int i = 0; i < subMenu.Length; i++)
                        {
                            if (subMenu[i].ItemArray[2].Equals(path))
                            {
                                line = string.Format("<li class=\"active open\"><a   class=\"nav-link\" title=\"{1}\" data-filter-tags=\"{1}\"><i class=\"{2}\"></i> <span class=\"nav-link-text\">{1}</span></a> <ul class=\"nav nav-treeview\">", "url", menuText, "nav-icon " + icon);
                                // active = false;
                            }
                        }
                        var subMenuBuilder = new StringBuilder();
                        sb.AppendLine(line);
                        sb.Append(GenerateURL(subMenu, table, subMenuBuilder, path));
                        sb.Append("</ul></li>");
                    }
                }
            }

            return sb.ToString();
        }
    }
}
