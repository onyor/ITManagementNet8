using Ardalis.Result.AspNetCore;
using AutoMapper;
using FluentValidation.AspNetCore;
using HotChocolate;
using ITX.Infrastructure;
using ITX.Persistance;
using ITX.Persistance.Cache;
using ITX.Persistance.Database;
using ITX.Persistance.Database.Context;
using ITX.WebAPI.Extensions;
using ITX.WebAPI.GraphQL;
using ITX.WebAPI.Helpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Path = System.IO.Path;

namespace ITX.WebAPI
{
    public class Program
    {
        [Obsolete]
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var env = builder.Environment;

            // SERILOG configuration
            var config = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables()
                .Build();

            //AppConstants.Initialize(config);

            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(config)
#if DEBUG
                .MinimumLevel.Debug()
                .WriteTo.Async(c => c.Console())
#else
                .MinimumLevel.Information()
#endif
                //.MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Information)
                //.MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Information)
                .Enrich.FromLogContext()
                //.Enrich.With(new SerilogUserNameEnricher())
                .CreateLogger();

            builder.Host.UseSerilog((context, services, configuration) => configuration
                   .ReadFrom.Configuration(context.Configuration)
                   .ReadFrom.Services(services)
                   .Enrich.FromLogContext()
                   .Enrich.With(services.GetService<SerilogRemoteIPEnricher>()))
                   .ConfigureAppConfiguration((context, config) =>
                   {
                       var assembly = Assembly.GetExecutingAssembly();
                       var currentPath = System.IO.Path.GetDirectoryName(assembly.Location);

                       config.SetBasePath(currentPath);
                       config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
                   });

            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            // CORS policy name
            const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(
                    name: MyAllowSpecificOrigins,
                    builder =>
                    {
                        builder.WithOrigins("https://localhost:44334/")
                               .WithHeaders("https://localhost:44334/")
                               .AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            builder.Services.AddHttpContextAccessor();

            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddSwaggerDocumentation();

            builder.Services.AddControllers(mvcOptions =>
            {
                mvcOptions.AddResultConvention(resultStatusMap => resultStatusMap.AddDefaultMap());
                mvcOptions.ModelBinderProviders.Insert(0, new NullToEmptyStringProvider());
            })
           .AddFluentValidation()
           .AddJsonOptions(options =>
           {
               options.JsonSerializerOptions.Converters.Add(new TypeToStringConverter());
           });


            builder.Services.AddControllersWithViews();
            builder.Services.AddLocalization(opt => { opt.ResourcesPath = "Resources"; });


            const string culture = "en-US";
            builder.Services.Configure<RequestLocalizationOptions>(options =>
            {
                List<CultureInfo> supportedCultures = new List<CultureInfo> {
                    new CultureInfo("en-US"),
                    new CultureInfo("tr-TR"),
                };

                options.DefaultRequestCulture = new RequestCulture(culture: culture, uiCulture: culture);
                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;
            });

            builder.Services.AddHttpClient();

            builder.Services.AddWebUIServices(config);

            builder.Services.AddInfrastructureServices(config);

            builder.Services.AddPersistanceServices(config);

            builder.Services.AddAutoMapper(mc =>
            {
                var context = builder.Services.BuildServiceProvider().CreateScope().ServiceProvider.GetRequiredService<ITManagementDbContext>();
                mc.AddProfile(new MappingProfiles(context));
            });

            builder.Services
                .AddGraphQLServer()
                .AddQueryType<Query>();

            var app = builder.Build();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.ConfigureExceptionHandler();

            app.UseSerilogRequestLogging();

            app.Use(async (context, next) =>
            {
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture("tr-TR");
                Thread.CurrentThread.CurrentCulture.NumberFormat.CurrencyDecimalSeparator = ".";
                Thread.CurrentThread.CurrentCulture.NumberFormat.CurrencyGroupSeparator = ",";
                Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator = ".";
                Thread.CurrentThread.CurrentCulture.NumberFormat.NumberGroupSeparator = ",";

                await next();
            });

            // var options = app.Services.GetRequiredService<IOptions<RequestLocalizationOptions>>();
            // app.UseRequestLocalization(options.Value);

            app.UseStaticFiles();

            var uploadFolderPath = Path.Combine(Directory.GetCurrentDirectory(),
                config["UploadPath"], "images");

            if (!Directory.Exists(uploadFolderPath))
            {
                Directory.CreateDirectory(uploadFolderPath);
            }
            app.UseDeveloperExceptionPage();


            app.UseSwaggerDocumentation();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(uploadFolderPath),
                RequestPath = "/images"
            });

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors(MyAllowSpecificOrigins);

            // Initialise and seed database
            using (var scope = app.Services.CreateScope())
            {
                #region ITManagementDbContext
                var context = scope.ServiceProvider.GetRequiredService<ITManagementDbContext>();
                var contextFactory = scope.ServiceProvider.GetRequiredService<IDbContextFactory<ITManagementDbContext>>();
                //// Check if the database exists and create it if not
                //if (!await context.Database.CanConnectAsync())
                //{
                //    await context.Database.EnsureCreatedAsync();
                //}
                await context.Database.MigrateAsync();
                #endregion

                #region ITManagementLogContext
                var logContext = scope.ServiceProvider.GetRequiredService<ITManagementLogContext>();
                // Check if the database exists and create it if not
                if (!await logContext.Database.CanConnectAsync())
                {
                    await logContext.Database.EnsureCreatedAsync();
                }
                // Apply migrations
                await logContext.Database.MigrateAsync();
                #endregion

                var cache = scope.ServiceProvider.GetRequiredService<ICache>();

                var mapper = scope.ServiceProvider.GetRequiredService<IMapper>();
                //await SeedData.SeedLocationAsync(context);
                await SeedData.FeedApplicationDataAsync(contextFactory, mapper, cache, config);
            }

            app.MapControllers();

            app.MapGraphQL();

            app.Run();
        }
    }
}
