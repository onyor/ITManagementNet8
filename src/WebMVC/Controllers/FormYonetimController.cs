using Microsoft.AspNetCore.Mvc;
using WebMVC.Controllers.Base;
using static AuthorizePageAttribute;

namespace WebMVC.Controllers
{
    public class FormYonetimController : BaseController
    {
        public IActionResult FormList() => View();
        public IActionResult FormGoruntuleme() => View();
        [BypassAuthorizePageAttribute]
        public IActionResult AlanList() => View();
        public IActionResult VeriList() => View();
        public IActionResult EnumVeri() => View();
    }
}
