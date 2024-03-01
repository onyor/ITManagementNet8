using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Web.Http;

namespace WebMVC.Controllers.Base
{
    [AuthorizePage]
    public class BaseController : Controller
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
        }

        // Action çağrıldıktan sonra çalışacak kod
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            base.OnActionExecuted(context);

            // Burada her istekten sonra yapılacak işlemleri ekleyin
            // Örneğin, bazı kaynakları temizleyebilirsiniz
        }
    }
}
