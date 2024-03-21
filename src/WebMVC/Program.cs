using ITX.Application;
using ITX.Persistance.Extensions;
using ITX.WebMVC.Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;

var builder = WebApplication.CreateBuilder(args);

var env = builder.Environment;

// SERILOG configuration
var config = new ConfigurationBuilder()
    .SetBasePath(env.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables()
    .Build();

// Yapılandırma dosyasını al
var configuration = builder.Configuration;

// Serilog'u yapılandır
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(configuration) // appsettings.json'dan oku
    .CreateLogger();

ApplicationData.ApiBaseURL = configuration.GetValue<string>("ApiBaseURL").xToString();

// CORS policy name
const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: MyAllowSpecificOrigins,
        builder =>
        {
            builder.WithOrigins("https://localhost:44336/")
                               .WithHeaders("https://localhost:44336/")
                               .AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod();
        });
});

// Uygulama servislerine Serilog'u ekleyin
builder.Services.AddLogging(lb => lb.AddSerilog());

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddMvc();
builder.Services.AddRazorPages().AddRazorRuntimeCompilation();
//builder.Services.AddRazorPages();
builder.Services.AddHttpContextAccessor();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
{
    options.ExpireTimeSpan = TimeSpan.FromMinutes(43200);
    //options.Cookie.MaxAge = options.ExpireTimeSpan; // optional
    options.SlidingExpiration = false;
});
builder.Services.AddScoped(_ => new DecryptAttribute(configuration["SecretKey"]));
builder.Services.AddSingleton<ISessionService, SessionService>();

var app = builder.Build();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseStaticFiles();

app.UseRouting();

app.UseMiddleware<CookieMiddleware>();

app.UseMiddleware<ConfigurationMiddleware>();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors(MyAllowSpecificOrigins);

app.UseMiddleware<LogoutUsersMiddleware>();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}");

//app.MapControllerRoute("EDevletLoginRoute", "edevletgiris.cshtml", new { controller = "Account", action = "EDevletLogin" });

app.Run();