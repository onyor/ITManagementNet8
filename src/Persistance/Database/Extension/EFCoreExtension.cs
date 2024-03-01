using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace ITX.Persistance.Database.Base;

public static class EFCoreExtension
{

    public static IQueryable<T> IncludeInResult<T, TProperty>(this IQueryable<T> query, params Expression<Func<T, TProperty>>[] paths)
     where T : class
    {
        foreach (var path in paths)
        {
            query = query.Include(path);
        }

        return query;
    }

}