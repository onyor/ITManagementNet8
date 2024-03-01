using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using System.Net;

namespace ITX.WebAPI.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null)
                    {
                        //logger.LogError($"Something went wrong: {contextFeature.Error}");
                        await context.Response.WriteAsync(new
                        {
                            StatusCode = context.Response.StatusCode,
                            Message = "Internal Server Error.",
                            Error = contextFeature.Error
                        }.ToString());
                    }
                });
            });
        }

        // https://andrewlock.net/creating-a-custom-error-handler-middleware-function/
        //public static void ConfigureExceptionHandler(this IApplicationBuilder app, IHostEnvironment env)
        //{
        //    if (env.IsDevelopment())
        //    {
        //        app.Use(WriteDevelopmentResponse);
        //    }
        //    else
        //    {
        //        app.Use(WriteProductionResponse);
        //    }
        //}

        //private static Task WriteDevelopmentResponse(HttpContext httpContext, Func<Task> next)
        //=> WriteResponse(httpContext, includeDetails: true);

        //private static Task WriteProductionResponse(HttpContext httpContext, Func<Task> next)
        //    => WriteResponse(httpContext, includeDetails: false);

        //private static async Task WriteResponse(HttpContext httpContext, bool includeDetails)
        //{
        //    // Try and retrieve the error from the ExceptionHandler middleware
        //    var exceptionDetails = httpContext.Features.Get<IExceptionHandlerFeature>();
        //    var ex = exceptionDetails?.Error;

        //    // Should always exist, but best to be safe!
        //    if (ex != null)
        //    {
        //        // ProblemDetails has it's own content type
        //        httpContext.Response.ContentType = "application/problem+json";

        //        // Get the details to display, depending on whether we want to expose the raw exception
        //        var title = includeDetails ? "An error occured: " + ex.Message : "An error occured";
        //        var details = includeDetails ? ex.ToString() : null;

        //        var problem = new ProblemDetails
        //        {
        //            Status = 500,
        //            Title = title,
        //            Detail = details
        //        };

        //        // This is often very handy information for tracing the specific request
        //        var traceId = Activity.Current?.Id ?? httpContext?.TraceIdentifier;
        //        if (traceId != null)
        //        {
        //            problem.Extensions["traceId"] = traceId;
        //        }

        //        //Serialize the problem details object to the Response as JSON (using System.Text.Json)
        //        var stream = httpContext.Response.Body;
        //        await JsonSerializer.SerializeAsync(stream, problem);
        //    }
        //}
    }
}
