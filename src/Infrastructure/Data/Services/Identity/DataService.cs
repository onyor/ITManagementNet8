using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ITX.Application.Dtos.LogManagement;
using ITX.Application.Interfaces.Identity;
using ITX.Application.ViewModels;
using ITX.Persistance.Database.Context;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace ITX.Infrastructure.Data.Services.Identity
{
    public class DataService : IDataService
    {
        private readonly ITManagementDbContext _context;
        private readonly IMapper _mapper;

        public DataService(
            ITManagementDbContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // AUDITLOG TABLE
        public async Task<JsonResult> FillDataTableAuditLog(DataTableViewModel vm)
        {
            int recordsTotal = await _context.AuditLogs
                .Include(x => x.User).CountAsync();
            int recordsFiltered = recordsTotal;

            var auditLogInfo = _context.AuditLogs
                .Include(x => x.User); //.DefaultIfEmpty();
            var auditLogData = auditLogInfo.Select(tempAuditLog => new
            {
                tempAuditLog.Id,
                tempAuditLog.Type,
                tempAuditLog.UserId,
                UserInfo = tempAuditLog.User.Name + " " +
                    tempAuditLog.User.Surname + " (" +
                    tempAuditLog.User.Email + ")",
                tempAuditLog.TableName,
                tempAuditLog.CreatedAt,
                tempAuditLog.OldValues,
                tempAuditLog.NewValues,
                tempAuditLog.AffectedColumns,
                tempAuditLog.PrimaryKey
            });

            //Sorting
            if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
            {
                auditLogData = auditLogData.OrderBy($"{vm.SortColumn} {vm.SortColumnDirection}");
            }
            else
            {
                auditLogData = auditLogData.OrderByDescending(x => x.CreatedAt);
            }

            //Search
            if (!string.IsNullOrEmpty(vm.SearchValue))
            {
                auditLogData = auditLogData.Where(m =>
                    m.UserInfo.ToLower().Contains(vm.SearchValue.ToLower()) ||
                    m.Type.ToLower().Contains(vm.SearchValue.ToLower()) ||
                    m.TableName.ToLower().Contains(vm.SearchValue.ToLower()));
                recordsFiltered = await auditLogData.CountAsync();
            }

            var data = await auditLogData.Skip(vm.Skip).Take(vm.PageSize).ToListAsync();

            return new JsonResult(new
            {
                draw = vm.Draw,
                recordsFiltered,
                recordsTotal,
                data
            });
        }

        public async Task<AuditLogDto> GetAuditLogById(long id)
        {
            var auditLog = await _context.AuditLogs
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id);

            return _mapper.Map<AuditLogDto>(auditLog);
        }

        public List<EnumViewModel> GetEnumListByCode(string enumCode)
        {
            return enumCode.ToLower() switch
            {
                //"amrbaudrate" => EnumExtensions.GetEnumList<EnmAsaletDurum>(),

                _ => null,
            };
        }

    }
}
