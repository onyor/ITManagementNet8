using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ITX.WebMVC.Components
{
    public class LogModel
    {
        public string DName { get; set; }
        public string PName { get; set; }
    }

    public class LogDetailModalViewComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync(LogModel model)
        {
            return View(model);
        }
    }

}
