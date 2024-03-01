using Microsoft.Extensions.Caching.Memory;
using System.Collections.Generic;

namespace ITX.Persistance.Cache;

public interface ICache
{
    T Get<T>(string key);
    List<T> GetList<T>(string key);
        
    void Set<T>(string key, T data, int? cacheTime = null);

    void SetList<T>(string key, List<T> data, int? cacheTime = null);

    bool IsSet<T>(string key);

    void Remove<T>(string key);

    void RemoveByKey(string key);
}
