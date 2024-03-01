using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebMVC.Controllers.Base;

namespace WebMVC.Controllers
{
    public class PredefinedController : BaseController
    {
        public IActionResult CurrencyDefinition() => View();
        public IActionResult Country() => View();
        public IActionResult City() => View();
        public IActionResult District() => View();
        public IActionResult AppSetting() => View();
        public IActionResult Announce() => View();
        public IActionResult PredefinedManagement() => View();
    }
}





