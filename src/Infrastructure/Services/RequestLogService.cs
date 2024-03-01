using Ardalis.Result;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ITX.Application.Dtos.LogManagement;
using ITX.Application.Dtos.ReportManagement;
using ITX.Application.Interfaces;
using ITX.Application.ViewModels;
using ITX.Domain.Entities.LogManagement;
using ITX.Domain.Shared.Enums;
using ITX.Persistance.Database;
using ITX.Persistance.Database.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Nest;
using ITX.Domain.Entities.Test;

namespace ITX.Infrastructure.Services
{
    public class RequestLogService : IRequestLogService
    {
        private readonly ITManagementLogContext _context;
        readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;

        public RequestLogService(
            ITManagementLogContext context,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }

        public async Task LogAsync(long fieldId, string fieldName, string fonksiyon, string islem,
            EnmRequestLogTypeCode logType = EnmRequestLogTypeCode.Basarili, string hataKod = "", bool isSystem = false)
        {
            try
            {
                var requestLog = new RequestLog
                {
                    UserId = GetUserId(),
                    RemoteIp = GetRemoteIp(),
                    Url = GetUrl(),
                    CreatedAt = DateTime.Now,
                    FieldId = fieldId,
                    FieldName = fieldName,
                    Fonksiyon = fonksiyon,
                    Islem = islem,
                    RequestLogTypeCodeId = logType,
                    HataKod = hataKod,
                    IsSystem = isSystem
                };

                await _context.RequestLogs.AddAsync(requestLog);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hata oluştu: {ex.Message}, {ex.InnerException}");
                throw new Exception(ex.ToString());
            }
        }

        public async Task<JsonResult> LoadDataTableAsync(DataTableViewModel vm,
            [FromForm] List<SearchParameterDto> aramaKriter)
        {
            try
            {
                string whereCondition = SeedData.CreateWhereCondition(aramaKriter);

                IQueryable<RequestLog> queryable = _context.Set<RequestLog>();

                if (whereCondition.Length > 0)
                    queryable = queryable.Where(whereCondition);

                var info = await queryable.OrderByDescending(x => x.CreatedAt).ToListAsync();

                int recordsTotal = info.Count();
                int recordsFiltered = recordsTotal;

                var query = (_mapper.Map<List<RequestLogDto>>(info)).AsQueryable();

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection))
                {
                    query = query.OrderBy($"{vm.SortColumn} {vm.SortColumnDirection}");
                }

                if (!string.IsNullOrEmpty(vm.SearchValue))
                {
                    query = query.Where(x =>
                        x.RemoteIp.ToLower().Contains(vm.SearchValue.ToLower()) ||
                        x.Url.ToLower().Contains(vm.SearchValue.ToLower()) ||
                        x.FieldName.ToLower().Contains(vm.SearchValue.ToLower()) ||
                        x.Fonksiyon.ToLower().Contains(vm.SearchValue.ToLower()) ||
                        x.HataKod.ToLower().Contains(vm.SearchValue.ToLower()));
                    recordsFiltered = query.Count();
                }
                recordsFiltered = query.Count();

                // Paging
                var pagedData = query.Skip(vm.Skip).Take(vm.PageSize).ToList();

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
                Console.WriteLine($"Hata oluştu: {ex.Message}, {ex.InnerException}");
                throw new Exception(ex.ToString());
            }
        }

        public async Task<Result<RequestLogDto>> GetAsync(long id)
        {
            try
            {
                var requestLog = await GetPrivate(id);
                if (requestLog == null)
                {
                    return Result<RequestLogDto>.NotFound();
                }

                var dto = _mapper.Map<RequestLogDto>(requestLog);

                return Result<RequestLogDto>.Success(dto);
            }
            catch (Exception ex)
            {
                return Result<RequestLogDto>.Error(ex.Message);
            }
        }

        private async Task<RequestLog> GetPrivate(long id)
        {
            return await _context.RequestLogs
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        private Guid GetUserId()
        {
            var userId = Guid.Empty;
            var claims = _httpContextAccessor.HttpContext?.User?.Claims;

            if (claims == null)
            {
                return userId;
            }

            if (!claims.Any())
            {
                return userId;
            }

            // convert UserId to Guid otherwise, Guid.Empty
            _ = Guid.TryParse(_httpContextAccessor.HttpContext?.User?.Claims.FirstOrDefault(t => t.Type == "UserId").Value, out userId);

            return userId;
        }

        private string GetRemoteIp()
        {
            var remoteIp = _httpContextAccessor.HttpContext?.Connection.RemoteIpAddress.ToString() ?? "unknown";

            return remoteIp;
        }

        private string GetUrl()
        {
            return _httpContextAccessor.HttpContext?.Request.GetDisplayUrl();
        }

        public async Task<Result<List<object>>> GetAllByIslemType()
        {
            try
            {
                var requestLogs = await _context.RequestLogs.Select(x => x.Islem).Distinct().ToListAsync();

                List<object> listIslem = new List<object>();

                foreach (var item in requestLogs)
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


        public void AddAsync(RequestLogDto requestLogDto)
        {
            try
            {
                requestLogDto.UserId = GetUserId();
                requestLogDto.RemoteIp = GetRemoteIp();
                requestLogDto.Url = GetUrl();
                var requestModel = _mapper.Map<RequestLog>(requestLogDto);
                var result = _context.Add(requestModel);
                _context.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
