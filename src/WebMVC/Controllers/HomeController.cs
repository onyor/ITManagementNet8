using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ITX.Application.Dtos.Identity;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using System.Net.Http.Headers;
using ITX.Application.Shared;
using Microsoft.AspNetCore.Http;
using WebMVC.Controllers.Base;
using static AuthorizePageAttribute;

namespace WebMVC.Controllers
{
    //[BypassAuthorizePage]
    public class HomeController : Controller
    {
        public IActionResult Dashboard() => View();
        public IActionResult Tester() => View();
    }
}
