using Microsoft.AspNetCore.Mvc;
using WebMVC.Controllers.Base;
using static AuthorizePageAttribute;

namespace WebMVC.Controllers
{
    [BypassAuthorizePage]
    public class HomeController : BaseController
    {
        public IActionResult Dashboard() => View();
        public IActionResult Tester() => View();
    }
}
