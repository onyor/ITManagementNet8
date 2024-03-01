using Microsoft.AspNetCore.Mvc;

using WebMVC.Controllers.Base;
namespace ITX.WebMVC.Controllers
{
    public class ReportController : BaseController
    {
        public IActionResult GeneralReport() => View();
        public IActionResult SurveyStatistics() => View();
        public IActionResult EventInfoStatistics() => View();
    }
}
