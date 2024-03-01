using Microsoft.AspNetCore.Mvc;
using ITX.WebMVC.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebMVC.Controllers.Base;
using System;

namespace WebMVC.Controllers
{
    public class GuestController : BaseController
    {
        private readonly ISessionService _sessionService;

        public GuestController(ISessionService sessionService)
        {
            _sessionService = sessionService;
        }

        [HttpPost]
        public async Task<IActionResult> ClaimUpdateByRole([FromBody] IList<string> roles)
        {
            foreach (var role in roles)
            {
                // Kullanıcıyı çıkış yapacaklar listesine ekle
                _sessionService.GetUserIdsByRole(role);
            }

            // İşlem tamamlandığında bir onay mesajı gönder
            return Ok(new { message = "Kullanıcılar çıkış yapmaya işaretlendi." });
        }

        [HttpPost]
        public async Task<IActionResult> ClaimUpdateByUser([FromBody] IList<Guid> userIds)
        {
            foreach (var userId in userIds)
            {
                // Kullanıcıyı çıkış yapacaklar listesine ekle
                _sessionService.GetUserIdsByUser(userId.ToString());
            }

            // İşlem tamamlandığında bir onay mesajı gönder
            return Ok(new { message = "Kullanıcılar çıkış yapmaya işaretlendi." });
        }
    }
}
