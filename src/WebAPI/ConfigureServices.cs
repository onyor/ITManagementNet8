using ITX.Application.Interfaces;
using ITX.Application.Shared;
using ITX.Domain.Entities.Identity;
using ITX.Infrastructure.Data;
using ITX.Infrastructure.Services;
using ITX.WebAPI.Extensions;
using ITX.WebAPI.Helpers;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Reflection;
using System.Text;
using ITX.Persistance.Database.Context;
using ITX.Infrastructure.Helpers;

namespace ITX.WebAPI
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddWebUIServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddIdentityCore<User>(opt =>
            {
                opt.Password.RequiredLength = 8;
                opt.Password.RequireUppercase = false;
                opt.Password.RequireLowercase = false;
                opt.Password.RequireDigit = false;
                opt.Password.RequireNonAlphanumeric = false;

                opt.User.RequireUniqueEmail = true;
                opt.SignIn.RequireConfirmedEmail = false;
                opt.Tokens.EmailConfirmationTokenProvider = "emailconfirmation";
                opt.Lockout.AllowedForNewUsers = true;
                opt.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
                opt.Lockout.MaxFailedAccessAttempts = 3;
            })
                            .AddRoles<Role>()
                            .AddRoleManager<RoleManager<Role>>()
                            .AddSignInManager<SignInManager<User>>()
                            .AddRoleValidator<RoleValidator<Role>>()
                            .AddEntityFrameworkStores<ITManagementDbContext>()
                            .AddDefaultTokenProviders();

            services.Configure<DataProtectionTokenProviderOptions>(opt =>
               opt.TokenLifespan = TimeSpan.FromHours(2));

            var jwtConfig = configuration.GetSection("JwtConfiguration").Get<JwtConfiguration>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    var secretKey = Encoding.UTF8.GetBytes(jwtConfig.SecretKey);
                    var encryptionKey = Encoding.UTF8.GetBytes(jwtConfig.EncryptionKey);

                    var validationParameters = new TokenValidationParameters
                    {
                        ClockSkew = TimeSpan.Zero, // default: 5 min
                        RequireSignedTokens = true,

                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(secretKey),

                        RequireExpirationTime = true,
                        ValidateLifetime = true,

                        ValidateAudience = true, //default : false
                        ValidAudience = jwtConfig.Audience,

                        ValidateIssuer = true, //default : false
                        ValidIssuer = jwtConfig.Issuer,

                        TokenDecryptionKey = new SymmetricSecurityKey(encryptionKey)
                    };

                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = validationParameters;
                });


            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            // JWT Configuration

            services.AddSingleton(jwtConfig);
            services.AddScoped<IJwtService, JwtService>();
            services.AddScoped<SanitizeInputFilter>();
            services.AddTransient<SerilogUserNameEnricher>();
            services.AddTransient<SerilogRemoteIPEnricher>();

            return services;
        }
    }
}
