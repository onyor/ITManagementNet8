using System;
using System.Collections.Generic;
using System.Runtime.Caching;

namespace ITX.Persistance.Cache;

public class MemoryCache : ICache
{
  
    public T Get<T>(string key)
    {
        var typeSafeKey = this.GetTypeSafeKey<T>(key);

        return (T)this.Cache[typeSafeKey];
    }

    public List<T> GetList<T>(string key)
    {
        var typeSafeKey = this.GetTypeSafeKey<List<T>>(key);

        return (List<T>)this.Cache[typeSafeKey];
    }

    public bool IsSet<T>(string key)
    {
        var typeSafeKey = this.GetTypeSafeKey<T>(key);
        return this.Cache.Contains(typeSafeKey);
    }

    public void Remove<T>(string key)
    {
        throw new NotImplementedException();
    }

    public void RemoveByKey(string key)
    {
        throw new NotImplementedException();
    }

    public void Set<T>(string key, T data, int? cacheTime = null)
    {
        cacheTime = cacheTime ?? int.MaxValue;
        var typeSafeKey = this.GetTypeSafeKey<T>(key);

        var policy = new CacheItemPolicy()
        {
            AbsoluteExpiration = DateTime.Now + TimeSpan.FromSeconds(cacheTime.Value)
        };

        if (data != null)
        {
            if (this.Cache.Contains(typeSafeKey))
                this.Cache.Remove(typeSafeKey);

            this.Cache.Add(new CacheItem(typeSafeKey, data), policy);
        }
    }

    public void SetList<T>(string key, List<T> data, int? cacheTime = null)
    {
        cacheTime = cacheTime ?? int.MaxValue;
        var typeSafeKey = this.GetTypeSafeKey<List<T>>(key);

        var policy = new CacheItemPolicy()
        {
            AbsoluteExpiration = DateTime.Now + TimeSpan.FromSeconds(cacheTime.Value)
        };

        if (data != null)
        {
            if (this.Cache.Contains(typeSafeKey))
                this.Cache.Remove(typeSafeKey);

            this.Cache.Add(new CacheItem(typeSafeKey, data), policy);
        }
    }

    private ObjectCache Cache
    {
        get
        {
            return System.Runtime.Caching.MemoryCache.Default;
        }
    }

    private string GetTypeSafeKey<T>(string key)
    {
        return $"{typeof(T).Name}-{key}";
    }
}
