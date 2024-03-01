using Ardalis.Result;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nest;
using ITX.Application.Dtos.LogManagement;
using ITX.Application.Dtos.ReportManagement;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.Predefined;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.LogManagement;
using ITX.Domain.Shared.Enums;
using ITX.Persistance.Database;
using ITX.Persistance.Database.Context;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using System.Security.AccessControl;

namespace ITX.Infrastructure.Services
{
    class ColumnInfo
    {
        public string columnName { get; set; }
        public string columnType { get; set; }
        public bool columnEnabled { get; set; }
    }
    public class AuditLogService : IAuditLogService
    {
        private readonly ITManagementDbContext _context;
        private readonly IAppSettingService _appSettingService;
        private readonly IMapper _mapper;

        public AuditLogService(
            ITManagementDbContext context,
            IAppSettingService appSettingService,
            IMapper mapper)
        {
            _appSettingService = appSettingService;
            _context = context;
            _mapper = mapper;
        }

        private async Task<AuditLog> GetPrivateAsync(long id, bool isDeleted = false)
        {
            return await _context.AuditLogs
                    .Include(x => x.User)
                    .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<JsonResult> LoadDataTableAsync(DataTableViewModel vm, [FromForm] List<SearchParameterDto> aramaKriter)
        {
            try
            {
                if (vm.SortColumn != null)
                {
                    if (vm.SortColumn.Contains("Id"))
                    {
                        var pos = vm.SortColumn.IndexOf("Id");
                        vm.SortColumn = vm.SortColumn.Substring(0, pos + 2);
                    }
                }

                string whereCondition = SeedData.CreateWhereCondition(aramaKriter);

                IQueryable<AuditLog> queryable = _context.Set<AuditLog>();

                if (whereCondition.Length > 0)
                    queryable = queryable.Where(whereCondition);

                var info = queryable.Include(x => x.User).OrderByDescending(x => x.CreatedAt);

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
                {
                    info = info.OrderBy(vm.SortColumn.Replace("Form_", "") + " " + vm.SortColumnDirection);
                }

                int recordsTotal = info.Count();
                int recordsFiltered = recordsTotal;

                List<ColumnInfo> columnList = new List<ColumnInfo>() {
                  new ColumnInfo { columnName = "Id", columnType = "long", columnEnabled = false },
                  new ColumnInfo { columnName = "TableName", columnType = "string", columnEnabled = true },
                  new ColumnInfo { columnName = "UserInfo", columnType = "string", columnEnabled = false },
                  new ColumnInfo { columnName = "PrimaryKey", columnType = "string", columnEnabled = true },
                  new ColumnInfo { columnName = "Type", columnType = "string", columnEnabled = true },
                  new ColumnInfo { columnName = "OldValues", columnType = "string", columnEnabled = true },
                  new ColumnInfo { columnName = "NewValues", columnType = "string", columnEnabled = true },
                  new ColumnInfo { columnName = "CreatedAt", columnType = "date", columnEnabled = false }
                };

                //Search
                if (!string.IsNullOrEmpty(vm.SearchValue))
                {
                    List<SearchParameterDto> parameters = new List<SearchParameterDto>();
                    string[] aranacakDeger = { vm.SearchValue };

                    foreach (var item in vm.SearchList)
                    {
                        if (!(columnList.FirstOrDefault(x => x.columnName == item).columnEnabled))
                            continue;

                        if (!item.Contains("Form_") && !item.Contains("Enum_"))
                            parameters.Add(new SearchParameterDto { AramaTipi = EnmAramaTip.Icerir, AranacakDeger = aranacakDeger, KolonAd = item, VeriTipi = "string" });
                        else if (item.Contains("Form_"))
                        {
                            var formItem = Application.ApplicationData.FormDataList.Where(x => x.NormalizeAd == item.Replace("Form_", "").Replace("Id", "") && x.DegerBilgi.ToLower().Contains(vm.SearchValue.ToLower()));
                            if (formItem.Count() > 0)
                            {

                                parameters.Add(new SearchParameterDto { AramaTipi = EnmAramaTip.Esittir, AranacakDeger = formItem.Select(x => x.FormDegerId.ToString()).ToArray(), KolonAd = item.Replace("Form_", ""), VeriTipi = "long" });
                            }
                        }
                        else if (item.Contains("Enum_"))
                        {
                            var enumItem = Application.ApplicationData.EnumVeriList.Where(x => x.EnumTanimAd == item.Replace("Enum_", "Enm").Replace("Id", "") && x.Ad.ToLower().Contains(vm.SearchValue.ToLower()));
                            if (enumItem.Count() > 0)
                            {
                                parameters.Add(new SearchParameterDto { AramaTipi = EnmAramaTip.Esittir, AranacakDeger = enumItem.Select(x => x.Deger.ToString()).ToArray(), KolonAd = item.Replace("Enum_", ""), VeriTipi = "long" });
                            }
                        }
                    }
                    var whereContidion = SeedData.WhereConditionForDatatableSearch(parameters);

                    info = (IOrderedQueryable<AuditLog>)info.Where(whereContidion);

                    recordsFiltered = info.Count();
                }

                var pageList = info.Skip(vm.Skip).Take(vm.PageSize).ToList();

                var pagedData = (_mapper.Map<List<AuditLogDto>>(pageList));


                //foreach (var item in query)
                //{
                //    item.Type = item.Type switch
                //    {
                //        "Delete" => "Sil",
                //        "Create" => "Oluştur",
                //        "Update" => "Güncelle",
                //        "None" => "Yok",
                //        "Login" => "Sisteme Giriş",
                //        _ => "",
                //    };
                //}

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
                throw new Exception(ex.ToString());
            }
        }

        public async Task<List<AuditLogDto>> AuditListGetByFilterAsync(AuditLogSearchDto dto)
        {
            try
            {
                var info = await _context.AuditLogs
                    .Include(x => x.User).Where(x => x.TableName == dto.TableName && x.UserId == dto.UserId).OrderByDescending(x => x.CreatedAt).Take(10).ToListAsync();

                int recordsTotal = info.Count();
                int recordsFiltered = recordsTotal;

                var query = (_mapper.Map<List<AuditLogDto>>(info));

                return Result<List<AuditLogDto>>.Success(query);
            }
            catch (Exception ex)
            {
                return Result<List<AuditLogDto>>.Error(ex.Message);
            }
        }

        public async Task<JsonResult> GetLogDetailsAsync(DataTableViewModel vm, AuditLogSearchDto dto)
        {
            try
            {
                var endData = ":" + dto.PrimaryKey + "}";

                IQueryable<AuditLog> query = _context.AuditLogs
                    .Include(x => x.User)
                    .Where(x => x.TableName == dto.TableName && x.PrimaryKey.EndsWith(endData))
                    .OrderByDescending(x => x.CreatedAt);

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
                {
                    query = query.OrderBy($"{vm.SortColumn} {vm.SortColumnDirection}");
                }

                int recordsTotal = query.Count();
                int recordsFiltered = recordsTotal;

                if (!string.IsNullOrEmpty(vm.SearchValue))
                {
                    query = query.Where(x => x.NewValues.ToLower().Contains(vm.SearchValue.ToLower()));
                    recordsFiltered = query.Count();
                }
                recordsFiltered = query.Count();

                var info = (_mapper.Map<List<AuditLogDto>>(query));

                // Paging
                var pagedData = info.Skip(vm.Skip).Take(vm.PageSize).ToList();

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
                throw new Exception(ex.ToString());
            }
        }

        public async Task<Result<List<AuditLogDto>>> GetAsync(long id)
        {
            try
            {
                var auditLog = await _context.AuditLogs
                    .Include(x => x.User).Where(x => x.Id == id)
                    .ToListAsync();

                var dto = _mapper.Map<List<AuditLogDto>>(auditLog);

                return Result<List<AuditLogDto>>.Success(dto);
            }
            catch (Exception ex)
            {
                return Result<List<AuditLogDto>>.Error(ex.Message);
            }
        }


        public async Task<Result<List<object>>> GetAllByIslemType()
        {
            try
            {
                var auditLogs = await _context.AuditLogs.Select(x => x.Type).Distinct().ToListAsync();

                List<object> listIslem = new List<object>();

                foreach (var item in auditLogs)
                {
                    var obj = new
                    {
                        key = item,
                        value = item
                    };
                    listIslem.Add(obj);
                }

                return Result<List<object>>.Success(listIslem);
            }
            catch (Exception ex)
            {
                return Result<List<object>>.Error(ex.Message);
            }
        }
    }
}
