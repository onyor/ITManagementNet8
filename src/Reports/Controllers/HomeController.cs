using Microsoft.AspNetCore.Mvc;

namespace HRM.Reports.Controllers {
    public class HomeController : Controller {
        public IActionResult Index() {
            return View();
        }
        public IActionResult Error() {
            Models.ErrorModel model = new Models.ErrorModel();
            return View(model);
        }

        public IActionResult Designer() {
            Models.ReportDesignerModel model = new Models.ReportDesignerModel();
            return View(model);
        }

        public IActionResult Viewer() {
            return View();
        }
    }
}