namespace ITX.Persistance.Cache;

using System;
using System.Collections.Generic;
using System.Threading;

/// <summary>
/// Extension methods for ICache interface
/// </summary>
public static class CacheExtensions
{
    public static T Get<T>(this ICache cache, string key, int cacheTime, System.Func<T> acquire)
    {
        return cache.Acquire<T>(key, acquire, cacheTime);
    }

    public static T Get<T>(this ICache cache, string key, TimeSpan cacheTime, System.Func<T> acquire)
    {
        return cache.Acquire<T>(key, acquire, (int)cacheTime.TotalSeconds);
    }
    public static T Get<T>(this ICache cache, string key, System.Func<T> acquire)
    {
        return cache.Acquire<T>(key, acquire);
    }

    public static void Set<T>(this ICache cache, string key, T data, TimeSpan cacheTime)
    {
        var lenght = (int)cacheTime.TotalSeconds;

        if (lenght > 0)
            cache.Set<T>(key, data, lenght);
        else
            cache.Set<T>(key, data);
    }

    public static void Set<T>(this ICache cache, string key, T data, DateTime validUntil)
    {
        cache.Set<T>(key, data, validUntil - DateTime.Now);
    }

    private static T Acquire<T>(this ICache cache, string key, System.Func<T> acquire, int? cacheTime = null)
    {
        if (cache.IsSet<T>(key))
        {
            return cache.Get<T>(key);
        }
        else
        {
            var result = acquire();

            if (result != null)
                cache.Set(key, result, cacheTime);
            return result;

        }
    }
}


