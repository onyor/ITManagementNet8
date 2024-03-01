using Ardalis.Result;
using AutoMapper;
using ITX.Application.Dtos.ReportManagement;
using ITX.Application.Dtos.Test;
using ITX.Application.Interfaces.Test;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.Test;
using ITX.Infrastructure.Helpers;
using ITX.Persistance.Database;
using ITX.Persistance.Database.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ITX.Infrastructure.Data.Services.Test
{
    public class ScenarioService : BaseService<Scenario, ScenarioDto>, IScenarioService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ScenarioService(IMapper mapper,
            IHttpContextAccessor httpContextAccessor,
            ITManagementDbContext context,
            IAsyncRepository<Scenario> repository,
            IUnitOfWork unitOfWork, LogResponse logResponse
            ) : base(mapper, context, repository, unitOfWork, logResponse)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Result<JsonResult>> RequestReportViewModel(
           DataTableViewModel vm,
           List<SearchParameterDto> aramaKriter,
           Expression<Func<Scenario, bool>> predicate = null,
           Func<IQueryable<Scenario>, IOrderedQueryable<Scenario>> orderBy = null,
           bool isActive = true,
           bool isDeleted = false,
           params string[] includes)
        {
            try
            {
                string whereCondition = SeedData.CreateWhereCondition(aramaKriter);
                if (string.IsNullOrEmpty(whereCondition))
                    whereCondition = "(IsActive AND !IsDeleted)";
                else
                    whereCondition = "(IsActive AND !IsDeleted) AND " + whereCondition;

                bool isAdmin = _httpContextAccessor.HttpContext?.User?.Claims.Any(c => c.Type == ClaimTypes.Role && c.Value == "Admin") ?? false;

                IQueryable<Scenario> queryable = _context.Set<Scenario>();

                if (predicate != null)
                    queryable = queryable.Where(predicate);

                if (includes.Length > 0)
                    queryable = queryable.IncludeMultiple(includes);

                if (whereCondition.Length > 0)
                    queryable = queryable.Where(whereCondition);

                if (orderBy != null)
                    queryable = orderBy(queryable);


                var dto = _mapper.Map<List<ScenarioDto>>(queryable).AsQueryable();

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
                {
                    dto = dto.OrderBy($"{vm.SortColumn} {vm.SortColumnDirection}");
                }

                //Search
                if (!string.IsNullOrEmpty(vm.SearchValue))
                {
                    dto = dto.Where(x =>
                          (x.CurrencyDefinitionIdName != null && x.CurrencyDefinitionIdName.ToLower().Contains(vm.SearchValue.ToLower())) ||
                        (x.CountryIdName != null && x.CountryIdName.ToLower().Contains(vm.SearchValue.ToLower())) ||
                        (x.RequestLogTypeCodeIdName != null && x.RequestLogTypeCodeIdName.ToLower().Contains(vm.SearchValue.ToLower())) ||
                        (x.UlasimAracIdName != null && x.UlasimAracIdName.ToLower().Contains(vm.SearchValue.ToLower())));
                }

                int recordsTotal = dto.Count();
                int recordsFiltered = recordsTotal;

                var pagedData = dto.Skip(vm.Skip).Take(vm.PageSize).ToList();
                return new JsonResult(new
                {
                    draw = vm.Draw,
                    recordsFiltered = recordsFiltered,
                    recordsTotal = recordsTotal,
                    data = pagedData
                });
            }
            catch (Exception ex)
            {
                return Result<JsonResult>.Error(ex.Message);
            }
        }
    }
}
