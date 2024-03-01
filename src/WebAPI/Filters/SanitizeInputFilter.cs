using Ganss.Xss;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;

public class SanitizeInputFilter : IActionFilter
{
    private readonly HtmlSanitizer _sanitizer;

    public SanitizeInputFilter()
    {
        _sanitizer = new HtmlSanitizer();
        // Burada gerekirse sanitizer'ınızı özelleştirebilirsiniz.
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class BypassSanitizeFilterAttribute : Attribute
    {
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (context.ActionDescriptor.EndpointMetadata.Any(m => m is BypassSanitizeFilterAttribute))
        {
            return;
        }

        var parameters = context.ActionDescriptor.Parameters;
        foreach (var parameter in parameters)
        {
            if (context.ActionArguments.ContainsKey(parameter.Name))
            {
                var argument = context.ActionArguments[parameter.Name];
                if (argument is string str)
                {
                    context.ActionArguments[parameter.Name] = _sanitizer.Sanitize(str);
                }
                else if (argument != null)
                {
                    foreach (var property in argument.GetType().GetProperties())
                    {
                        if (property.PropertyType == typeof(string) && property.CanWrite)
                        {
                            var value = (string)property.GetValue(argument);
                            if (value != null)
                            {
                                var sanitizedValue = _sanitizer.Sanitize(value);
                                property.SetValue(argument, sanitizedValue);
                            }
                        }
                    }
                }
            }
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        // Post-action logic
    }
}
