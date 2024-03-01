using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ITX.Application;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using ITX.Application.Dtos.Identity;

public class AuthorizePageAttribute : ActionFilterAttribute
{

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class BypassAuthorizePageAttribute : Attribute
    {
    }

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (context.ActionDescriptor.EndpointMetadata.Any(m => m is BypassAuthorizePageAttribute))
        {
            return;
        }

        base.OnActionExecuting(context);

        var controllerName = context.RouteData.Values["controller"]?.ToString();
        var actionName = context.RouteData.Values["action"]?.ToString();
        var key = $"{controllerName}/{actionName}";

        if (ApplicationData.MenuRoleList != null && ApplicationData.MenuRoleList.TryGetValue(key, out List<MenuRoleDto> allowedRoles))
        {
            var userRoles = context.HttpContext.User.Claims
                               .Where(c => c.Type == ClaimTypes.Role)
                               .Select(c => c.Value)
                               .ToList();

            var isAuthorized = allowedRoles.Any(allowedRole => userRoles.Contains(allowedRole.RoleName));

            if (!isAuthorized)
                context.Result = new RedirectToActionResult("AccessDenied", "Account", null);
        }
        else
            context.Result = new RedirectToActionResult("AccessDenied", "Account", null);
    }
}

