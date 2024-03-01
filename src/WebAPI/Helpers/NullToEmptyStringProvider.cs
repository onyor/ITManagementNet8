using System;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ITX.WebAPI.Helpers
{
    public class NullToEmptyStringProvider : IModelBinderProvider
    {
        public IModelBinder GetBinder(ModelBinderProviderContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            if (context.Metadata.ModelType == typeof(string))
            {
                return new NullToEmptyStringBinder();
            }

            return null;
        }
    }


}
