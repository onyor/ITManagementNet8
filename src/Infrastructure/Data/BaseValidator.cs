using DevExpress.XtraGauges.Core.Base;
using FluentValidation;
using Microsoft.AspNetCore.Mvc.ViewFeatures.Internal;

using ITX.Domain.Entities;
using ITX.Infrastructure.Data.Validators;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace ITX.Shared.Extensions
{
    public abstract class BaseValidator<TEntity> : AbstractValidator<TEntity>
        where TEntity : class, new()
    {
        public BaseValidator()
        {
            
        }

        public static explicit operator BaseValidator<TEntity>(MenuValidator v)
        {
            throw new NotImplementedException();
        }
    }
}
