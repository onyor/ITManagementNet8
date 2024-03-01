using Ardalis.Result;
using Ardalis.Specification;
using AutoMapper;
using FluentValidation;
using ITX.Application.Dtos;
using ITX.Application.Dtos.ReportManagement;
using ITX.Application.Repositories.IBase;
using ITX.Application.Shared;
using ITX.Application.Specifications;
using ITX.Application.ViewModels;
using ITX.Domain.Entities;
using ITX.Domain.Shared.Enums;
using ITX.Infrastructure.Helpers;
using ITX.Persistance.Database;
using ITX.Persistance.Database.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Threading.Tasks;
using VirtoCommerce.Platform.Core.Common;

namespace ITX.Infrastructure.Data
{
    public class BaseService<TEntity, TEntityDto>
        where TEntity : BaseEntity<long>, new()
        where TEntityDto : BaseDto<long>, new()
    {
        protected IAsyncRepository<TEntity> _repository { get; }
        protected IUnitOfWork _unitOfWork { get; }
        protected ITManagementDbContext _context { get; }
        protected IMapper _mapper { get; }
        private readonly ValidatorFactory _validator = new ValidatorFactory();

        private readonly LogResponse _logResponse;
        public BaseService(IMapper mapper, ITManagementDbContext context, IAsyncRepository<TEntity> repository, IUnitOfWork unitOfWork, LogResponse logResponse)
        {
            _mapper = mapper;
            _context = context;
            _repository = repository;
            _unitOfWork = unitOfWork;
            _logResponse = logResponse;
        }

        public IQueryable<TEntity> Query()
        {
            return _context.Set<TEntity>();
        }

        public async Task<Result<TEntityDto>> AddAsync(TEntityDto entityDto)
        {
            try
            {
                var entity = _mapper.Map<TEntity>(entityDto);
                var validator = _validator.CreateValidator<TEntity>();
                if (validator != null)
                {
                    var valResult = await validator.ValidateAsync(entity);
                    if (!valResult.IsValid)
                        return Result<TEntityDto>.Invalid(valResult.AsErrors());
                }

                var info = await _unitOfWork.Repository<TEntity>().AddAndSaveAsync(entity);

                entityDto = _mapper.Map<TEntityDto>(info);

                _logResponse.ApiLog.Add(new ApiLog { FieldId = entityDto.Id, FieldName = !string.IsNullOrEmpty(typeof(TEntity).Name) ? typeof(TEntity).Name : "entityDto", Islem = "Base Servis Ekleme İşlemi", Fonksiyon = "BaseService.AddAsync", RequestLogTypeCodeId = EnmRequestLogTypeCode.Basarili, HataKod = "", IsSystem = true });

                return Result<TEntityDto>.Success(entityDto);
            }
            catch (Exception ex)
            {
                _logResponse.ApiLog.Add(new ApiLog { FieldId = entityDto.Id, FieldName = !string.IsNullOrEmpty(typeof(TEntity).Name) ? typeof(TEntity).Name : "entityDto", Islem = "Base Servis Ekleme İşlemi", Fonksiyon = "BaseService.AddAsync", RequestLogTypeCodeId = EnmRequestLogTypeCode.Hatali, HataKod = ex.Message, IsSystem = true });

                return Result<TEntityDto>.Error(ex.Message);
            }
        }

        public async Task<Result<TEntityDto>> UpdateAsync(TEntityDto entityDto)
        {
            try
            {
                var entity = await _unitOfWork.Repository<TEntity>().GetAsync(predicate: x => x.Id == entityDto.Id, ignoreState: true);

                var mapEntity = _mapper.Map(entityDto, entity);

                var entityFromDB = await _unitOfWork.Repository<TEntity>().UpdateAndSaveAsync(mapEntity);

                var result = _mapper.Map(entityFromDB, entityDto);

                _logResponse.ApiLog.Add(new ApiLog { FieldId = entityDto.Id, FieldName = !string.IsNullOrEmpty(typeof(TEntity).Name) ? typeof(TEntity).Name : "entityDto", Islem = "Base Servis Güncelleme İşlemi", Fonksiyon = "BaseService.UpdateAsync", RequestLogTypeCodeId = EnmRequestLogTypeCode.Basarili, HataKod = "", IsSystem = true });
                return Result<TEntityDto>.Success(result);
            }
            catch (Exception ex)
            {
                _logResponse.ApiLog.Add(new ApiLog { FieldId = entityDto.Id, FieldName = !string.IsNullOrEmpty(typeof(TEntity).Name) ? typeof(TEntity).Name : "entityDto", Islem = "Base Servis Güncelleme İşlemi", Fonksiyon = "BaseService.UpdateAsync", RequestLogTypeCodeId = EnmRequestLogTypeCode.Hatali, HataKod = ex.Message, IsSystem = true });
                return Result<TEntityDto>.Error(ex.Message);
            }
        }

        public async Task<Result<bool>> DeleteAsync(Expression<Func<TEntity, bool>> predicate = null)
        {
            try
            {
                var info = await _unitOfWork.Repository<TEntity>().DeleteAsync(predicate);

                _logResponse.ApiLog.Add(new ApiLog { FieldId = 1, FieldName = !string.IsNullOrEmpty(typeof(TEntity).Name) ? typeof(TEntity).Name : "entityDto", Islem = "Base Servis Silme İşlemi", Fonksiyon = "BaseService.DeleteAsync", RequestLogTypeCodeId = EnmRequestLogTypeCode.Basarili, HataKod = "", IsSystem = true });

                return Result<bool>.Success(info);
            }
            catch (Exception ex)
            {
                _logResponse.ApiLog.Add(new ApiLog { FieldId = 0, FieldName = !string.IsNullOrEmpty(typeof(TEntity).Name) ? typeof(TEntity).Name : "entityDto", Islem = "Base Servis Silme İşlemi", Fonksiyon = "BaseService.DeleteAsync", RequestLogTypeCodeId = EnmRequestLogTypeCode.Hatali, HataKod = ex.Message, IsSystem = true });

                return Result<bool>.Error(ex.Message);
            }
        }

        public async Task<Result<List<TEntityDto>>> GetAllAsync(Expression<Func<TEntity, bool>>? predicate = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy =
                                                      null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes)
        {
            try
            {
                var info = await _unitOfWork.Repository<TEntity>().GetAllAsync(predicate: predicate, includes: includes, orderBy: orderBy, isActive: isActive, isDeleted: isDeleted, ignoreState: ignoreState);

                var entityDtoList = _mapper.Map<List<TEntityDto>>(info);

                return Result<List<TEntityDto>>.Success(entityDtoList);
            }
            catch (Exception ex)
            {
                return Result<List<TEntityDto>>.Error(ex.Message);
            }
        }

        public async Task<Result<TEntityDto>> GetAsync(Expression<Func<TEntity, bool>>? predicate = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes)
        {
            try
            {
                var info = await _unitOfWork.Repository<TEntity>().GetAsync(predicate: predicate, includes: includes, isActive: isActive, isDeleted: isDeleted, ignoreState: ignoreState);
                if (info != null)
                {
                    var entityDto = _mapper.Map<TEntityDto>(info);
                    return Result<TEntityDto>.Success(entityDto);
                }
                else
                    return Result<TEntityDto>.Error();
            }
            catch (Exception ex)
            {
                return Result<TEntityDto>.Error(ex.Message);
            }
        }

        public async Task<Result<JsonResult>> LoadDataTableAsync(DataTableViewModel vm, Expression<Func<TEntity, bool>> predicate = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null, bool isActive = true, bool isDeleted = false, params string[] includes)
        {
            try
            {
                var typeStr = typeof(TEntityDto);

                if (vm.SortColumn != null)
                {
                    if (vm.SortColumn.Contains("Id"))
                    {
                        var pos = vm.SortColumn.IndexOf("Id");
                        vm.SortColumn = vm.SortColumn.Substring(0, pos + 2);
                    }
                    if (vm.SortColumn.Contains("Name"))
                    {
                        var pos = vm.SortColumn.IndexOf("Name");
                        vm.SortColumn = vm.SortColumn.Substring(0, pos);
                    }
                }

                IQueryable<TEntity> queryable = Query();


                if (predicate != null)
                    queryable = queryable.Where(predicate);


                queryable = queryable.IncludeMultiple(includes).Where(x => x.IsDeleted == isDeleted && x.IsActive == isActive);

                //Sorting
                if (!string.IsNullOrEmpty(vm.SortColumn) && !string.IsNullOrEmpty(vm.SortColumnDirection) && !vm.SortColumn.Contains("Id"))
                {
                    queryable = queryable.OrderBy(vm.SortColumn.Replace("Form_", "") + " " + vm.SortColumnDirection);
                }

                if (orderBy != null)
                    queryable = orderBy(queryable);

                int recordsTotal = queryable.Count();
                int recordsFiltered = recordsTotal;

                //Search
                if (!string.IsNullOrEmpty(vm.SearchValue))
                {
                    List<SearchParameterDto> parameters = new List<SearchParameterDto>();
                    string[] aranacakDeger = { vm.SearchValue };

                    foreach (var item in vm.SearchList)
                    {
                        if (!item.Contains("Form_") && !item.Contains("Enum_") && !item.Contains("Domain_"))
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
                        else if (item.Contains("Domain_"))
                        {
                            parameters.Add(new SearchParameterDto { AramaTipi = EnmAramaTip.Icerir, AranacakDeger = aranacakDeger, KolonAd = item.Replace("Domain_", "").Replace("Id", "."), VeriTipi = "string" });
                        }
                    }

                    var whereContidion = SeedData.WhereConditionForDatatableSearch(parameters);

                    queryable = (IOrderedQueryable<TEntity>)queryable.Where(whereContidion);

                    recordsFiltered = queryable.Count();
                }

                //"c => new {Id,UlasimAracId,Cinsiyet.Name,RequestLogTypeCodeId,TestDescription,TestDeger,TestBaslik,CountryId,CurrencyDefinitionId,TestTarih}"

                var selectString = "c => new { Id, ";
                foreach (var item in vm.ColumnList.Where(x => x != "Id").ToList())
                {
                    selectString += (item.Contains("Id")) ? item.Substring(0, item.IndexOf("Id") + 2) : item;
                    selectString += ",";
                }

                foreach (var item in vm.DomainList)
                {
                    if (!item.Contains("."))
                        selectString += item.Replace("Domain_", "") + ",";
                }
                selectString = selectString.Remove(selectString.Length - 1);
                selectString += "}";

                IEnumerable<TEntity> pagedData = await queryable.Skip(vm.Skip).Take(vm.PageSize).Select<TEntity>(selectString).ToListAsync();

                var result = _mapper.Map<List<TEntityDto>>(pagedData);

                return new JsonResult(new
                {
                    draw = vm.Draw,
                    recordsFiltered = recordsFiltered,
                    recordsTotal = recordsTotal,
                    data = result
                });

            }
            catch (Exception ex)
            {
                return Result<JsonResult>.Error(ex.Message);
            }
        }



        public async Task<Result<object>> GetFilteredProjectionAsync(Expression<Func<TEntity, bool>>? predicate = null, Expression<Func<TEntity, object>>? selector = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes)
        {
            try
            {
                var info = await _unitOfWork.Repository<TEntity>().GetFilteredProjectionAsync(predicate: predicate, selector: selector, isActive: isActive, isDeleted: isDeleted, ignoreState: ignoreState, includes: includes);


                return Result<object>.Success(info);
            }
            catch (Exception ex)
            {
                return Result<List<object>>.Error(ex.Message);
            }
        }

        public async Task<Result<object>> GetAllFilteredProjectionAsync(Expression<Func<TEntity, bool>>? predicate = null, Expression<Func<TEntity, object>>? selector = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null, bool isActive = true, bool isDeleted = false, bool ignoreState = false, params string[] includes)
        {
            try
            {
                var info = await _unitOfWork.Repository<TEntity>().GetAllFilteredProjectionAsync(predicate: predicate, selector: selector, orderBy: orderBy, isActive: isActive, isDeleted: isDeleted, ignoreState: ignoreState, includes: includes);


                return Result<IList<object>>.Success(info);
            }
            catch (Exception ex)
            {
                return Result<List<object>>.Error(ex.Message);
            }
        }

        public async Task<Result<List<TEntityDto>>> UpdateOrAddEntitiesAsync(
         Expression<Func<TEntity, bool>> filter,
         List<long> ids,
         Func<long, TEntityDto> createNewEntity,
         Func<TEntity, long> getIdFromEntity)
        {
            try
            {
                var existingEntities = await _unitOfWork.Repository<TEntity>().GetAllAsync(filter, ignoreState: true);
                var existingIds = existingEntities.Select(getIdFromEntity).ToList();

                // Eğer ids null veya boşsa, tüm ilgili kayıtları silinmiş olarak işaretle
                if (ids == null || ids.Count == 0)
                {
                    foreach (var entity in existingEntities)
                    {
                        entity.IsDeleted = true;
                        await _unitOfWork.Repository<TEntity>().UpdateAsync(entity);
                    }
                }
                else
                {
                    // Var olmayanları ekle ve var olan ancak silinmiş olanları aktifleştir
                    foreach (var id in ids)
                    {
                        var existingEntity = existingEntities.FirstOrDefault(e => getIdFromEntity(e) == id);

                        if (existingEntity != null)
                        {
                            if (existingEntity.IsDeleted)
                            {
                                existingEntity.IsDeleted = false;
                                await _unitOfWork.Repository<TEntity>().UpdateAsync(existingEntity);
                                _logResponse.ApiLog.Add(new ApiLog { FieldId = id, FieldName = !string.IsNullOrEmpty(typeof(TEntity).Name) ? typeof(TEntity).Name : "entityDto", Islem = "Base Servis UpdateOrAddEntitiesAsync Ekleme İşlemi.", Fonksiyon = "BaseService.UpdateOrAddEntitiesAsync", RequestLogTypeCodeId = EnmRequestLogTypeCode.Basarili, HataKod = "", IsSystem = true });
                            }
                        }
                        else
                        {
                            var newEntityDto = createNewEntity(id);
                            var newEntity = _mapper.Map<TEntity>(newEntityDto);
                            await _unitOfWork.Repository<TEntity>().AddAsync(newEntity);
                            existingEntities.Add(newEntity);
                            _logResponse.ApiLog.Add(new ApiLog { FieldId = id, FieldName = !string.IsNullOrEmpty(typeof(TEntity).Name) ? typeof(TEntity).Name : "entityDto", Islem = "Base Servis UpdateOrAddEntitiesAsync Ekleme İşlemi.", Fonksiyon = "BaseService.UpdateOrAddEntitiesAsync", RequestLogTypeCodeId = EnmRequestLogTypeCode.Basarili, HataKod = "", IsSystem = true });
                        }
                    }

                    // Artık kullanılmayan kayıtları işaretle
                    var idsToRemove = existingIds.Except(ids);
                    foreach (var existingEntity in existingEntities.Where(e => idsToRemove.Contains(getIdFromEntity(e))))
                    {
                        existingEntity.IsDeleted = true;
                        await _unitOfWork.Repository<TEntity>().UpdateAsync(existingEntity);
                    }
                }

                await _unitOfWork.SaveAsync();

                return Result<List<TEntityDto>>.Success(_mapper.Map<List<TEntityDto>>(existingEntities));
            }
            catch (Exception ex)
            {
                _logResponse.ApiLog.Add(new ApiLog { FieldId = 0, FieldName = !string.IsNullOrEmpty(typeof(TEntity).Name) ? typeof(TEntity).Name : "entityDto", Islem = "Base Servis UpdateOrAddEntitiesAsync İşlemi", Fonksiyon = "BaseService.UpdateOrAddEntitiesAsync", RequestLogTypeCodeId = EnmRequestLogTypeCode.Hatali, HataKod = ex.Message, IsSystem = true });

                return Result<List<TEntityDto>>.Error(ex.Message);
            }
        }


    }
}

public static class DataAccessExtensions
{
    internal static IQueryable<T> IncludeMultiple<T>(this IQueryable<T> query,
        params string[] includes) where T : class
    {
        if (includes != null)
        {
            query = includes.Aggregate(query, (current, include) => current.Include(include));
        }
        return query;
    }
}