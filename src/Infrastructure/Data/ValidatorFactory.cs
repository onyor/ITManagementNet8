using FluentValidation;
using ITX.Application.Dtos.Predefined;

using ITX.Domain.Entities;
using ITX.Domain.Entities.Predefined;
using ITX.Infrastructure.Data.Validators;
using ITX.Shared.Extensions;
using System;
using System.Linq;

public class ValidatorFactory
{
    public BaseValidator<TEntity> CreateValidator<TEntity>()
        where TEntity : class, new()
    {
        try
        {
            var entityName = string.Join(".", typeof(TEntity).FullName.Split('.')[^2..]);
            return (BaseValidator<TEntity>)GetInstance("ITX.Infrastructure.Data.Validators." + entityName + "Validator");
        }
        catch (Exception ex)
        {

            throw ex;
        }
    }
    public object GetInstance(string strFullyQualifiedName)
    {
        Type t = Type.GetType(strFullyQualifiedName);
        if (t != null)
            return Activator.CreateInstance(t);
        else
            return null;
    }
}
