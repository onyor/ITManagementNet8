using Microsoft.AspNetCore.Mvc;

namespace WebMVC.Controllers
{
    public class TestController : Controller
    {
        public IActionResult Lesson() => View();
        public IActionResult Student() => View();
        public IActionResult GeneralReport() => View();
        public IActionResult Scenario(string param)
        {
            ViewBag.CountryId = param;
            return View();
        }
    }
}
