using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Application.Extensions
{
    public static class ClaimsExtensions
    {
        // Kullanıcı Roleri İçin;
        public static bool HasAnyRole(this ClaimsPrincipal claimsPrincipal, params string[] roleName)
        {
            var allClaims = claimsPrincipal.FindAll(ClaimTypes.Role).Select(x => x.Value);

            return roleName.Any(x => allClaims.Contains(x));
        }

    }
}
