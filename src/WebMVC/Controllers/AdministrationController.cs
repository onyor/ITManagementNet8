using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ITX.Application.Shared;
using System.Linq;
using System.Reflection;
using WebMVC.Controllers.Base;
using static AuthorizePageAttribute;
using Ardalis.Result;

namespace WebMVC.Controllers
{

    public class AdministrationController : BaseController
    {
        public IActionResult Menu() => View();
        public new IActionResult User() => View();
        public IActionResult Role() => View();
        public IActionResult AuditLog() => View();
        public IActionResult RequestLog() => View();
        public IActionResult RestoreData() => View();
        public IActionResult AdministrationClaim() => View();
        public IActionResult ClaimType() => View();

        [BypassAuthorizePageAttribute]
        [HttpPost]
        public Result<JsonResult> GetAllControllers()
        {
            var result = Assembly.GetExecutingAssembly()
                                 .GetTypes()
                                 .Where(type => typeof(Controller).IsAssignableFrom(type))
                                 .SelectMany(type => type.GetMethods(BindingFlags.Instance | BindingFlags.DeclaredOnly | BindingFlags.Public))
                                 .Where(m => !m.GetCustomAttributes(typeof(System.Runtime.CompilerServices.CompilerGeneratedAttribute), true).Any())
                                 .GroupBy(x => x.DeclaringType.Name)
                                 .Select(x => x.Key).ToList();

            return Result<JsonResult>.Success(new JsonResult(result));

        }


        [BypassAuthorizePageAttribute]
        [HttpPost]
        public Result<JsonResult> GetControllerActions(string controllerName)
        {
            var result = Assembly.GetExecutingAssembly()
                                 .GetTypes()
                                 .Where(type => typeof(Controller).IsAssignableFrom(type))
                                 .SelectMany(type => type.GetMethods(BindingFlags.Instance | BindingFlags.DeclaredOnly | BindingFlags.Public))
                                 .Where(m => !m.GetCustomAttributes(typeof(System.Runtime.CompilerServices.CompilerGeneratedAttribute), true).Any())
                                 .GroupBy(x => x.DeclaringType.Name)
                                 .Where(x => x.Key == controllerName)
                                 .Select(x => x.Select(y => y.Name)).FirstOrDefault();

            return Result<JsonResult>.Success(new JsonResult(result));
        }
    }
}
