using Ardalis.Result;
using ITX.Application.Dtos.ReportManagement;
using ITX.Application.Dtos.Test;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.Test;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ITX.Application.Interfaces.Test
{
    public interface IScenarioService : IBaseService<Scenario, ScenarioDto>
    {
        Task<Result<JsonResult>> RequestReportViewModel(
           DataTableViewModel vm,
           List<SearchParameterDto> aramaKriter,
           Expression<Func<Scenario, bool>> predicate = null,
           Func<IQueryable<Scenario>, IOrderedQueryable<Scenario>> orderBy = null,
           bool isActive = true,
           bool isDeleted = false,
           params string[] includes);
    }
}
