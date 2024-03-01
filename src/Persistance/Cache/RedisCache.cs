using System;
using System.Collections.Generic;

namespace ITX.Persistance.Cache;

public class RedisCache : ICache
{

    public RedisCache()
    {

    }
  
    public T Get<T>(string key)
    {
        var typeSafeKey = this.GetTypeSafeKey<T>(key);
        return default(T);
        //return (T)this.Cache[typeSafeKey];
    }

    public List<T> GetList<T>(string key)
    {
        throw new NotImplementedException();
    }

    public bool IsSet<T>(string key)
    {
        throw new NotImplementedException();
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
        throw new NotImplementedException();
    }

    public void SetList<T>(string key, List<T> data, int? cacheTime = null)
    {
        throw new NotImplementedException();
    }

    private string GetTypeSafeKey<T>(string key)
    {
        return $"{typeof(T).Name}-{key}";
    }
}
