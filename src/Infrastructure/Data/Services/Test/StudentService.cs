using Ardalis.Result;
using AutoMapper;
using ITX.Application.Dtos.Test;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.Test;
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.Test;
using ITX.Persistance.Database;
using ITX.Persistance.Database.Context;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Linq;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Dynamic.Core;
using ITX.Infrastructure.Helpers;

namespace ITX.Infrastructure.Data.Services.Test
{
    public class StudentService : BaseService<Student, StudentDto>, IStudentService
    {
        public StudentService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<Student> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {
        }

        public new async Task<Result<JsonResult>> LoadDataTableAsync(
          DataTableViewModel vm,
          Expression<Func<Student, bool>> predicate = null,
          Func<IQueryable<Student>, IOrderedQueryable<Student>> orderBy = null,
          bool isActive = true,
          bool isDeleted = false,
          params string[] includes)
        {
            try
            {
                IQueryable<Student> queryable = _context.Set<Student>();

                if (includes.Length > 0)
                    queryable = queryable.IncludeMultiple(includes);

                queryable = queryable.Where(x => x.IsActive == isActive && x.IsDeleted == isDeleted);

                if (predicate != null)
                    queryable = queryable.Where(predicate);


                if (orderBy != null)
                    queryable = orderBy(queryable);

                var dto = _mapper.Map<List<StudentDto>>(queryable).AsQueryable();

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
                    dto = dto.OrderBy($"{vm.SortColumn} {vm.SortColumnDirection}");

                int recordsTotal = queryable.Count();

                //Search
                if (!string.IsNullOrEmpty(vm.SearchValue))
                {
                    dto = dto.Where(x =>
                        (x.Name != null && x.Name.ToLower().Contains(vm.SearchValue.ToLower())));
                }

                int recordsFiltered = dto.Count();

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
