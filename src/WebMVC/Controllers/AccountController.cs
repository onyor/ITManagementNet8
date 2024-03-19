using ITX.Application;
using ITX.Application.Dtos.Identity;
using ITX.WebMVC.Extensions;
using ITX.WebMVC.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using WebMVC.Controllers.Base;
using static AuthorizePageAttribute;

namespace WebMVC.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;
        private readonly ISessionService _sessionService;
        private readonly ILogger _logger;

        public AccountController(IHttpContextAccessor httpContextAccessor, IConfiguration configuration, ISessionService sessionService)
        {
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
            _sessionService = sessionService;
            _logger = Log.ForContext<AccountController>();
        }

        [BypassAuthorizePageAttribute]
        public IActionResult Login() => View();
        public IActionResult ForgotPassword() => View();
        [BypassAuthorizePageAttribute]
        public IActionResult AccessDenied() => View();
        public IActionResult AccountSettings() => View();
        public IActionResult ConfirmEmail() => View();
        public IActionResult ResetPassword() => View();
        [BypassAuthorizePageAttribute]
        public IActionResult ClientProfile() => View();

        [BypassAuthorizePageAttribute]
        [HttpPost]
        public async Task<ActionResult> Login(LoginViewModel model)
        {
            try
            {
                // İstek atmadan önce gelen verilerin doğruluğunu kontrol edebilirsiniz.
                // API'nize istek atmak için HttpClient sınıfını kullanabilirsiniz.
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(ApplicationData.ApiBaseURL + "Account/");
                    _logger.Information("API Base: {APIBase}", ApplicationData.ApiBaseURL);
                    _logger.Information("LoginViewModel UserName", model.UserName);
                    _logger.Information("LoginViewModel Password", model.Password);

                    using (var content = new MultipartFormDataContent())
                    {
                        content.Add(new StringContent(model.UserName), "UserName");
                        content.Add(new StringContent(model.Password), "Password");

                        var response = await client.PostAsync("Login", content);

                        var jsonString = await response.Content.ReadAsStringAsync();
                        if (response.StatusCode == System.Net.HttpStatusCode.OK)
                        {
                            var jsonObj = JsonConvert.DeserializeObject<JObject>(jsonString);

                            var valuePart = jsonObj["value"].ToString();

                            var loginInfo = JsonConvert.DeserializeObject<LoginResponseModel>(valuePart);

                            var claims = new List<Claim>()
                            {
                                 new Claim("UserId", loginInfo.Id.ToString()),
                                 new Claim(ClaimTypes.Name, loginInfo.StorageModel.Name + " " + loginInfo.StorageModel.Surname),
                                 new Claim(ClaimTypes.Email, loginInfo.StorageModel.Email),
                                 new Claim("Token", loginInfo.StorageModel.Token),
                                 new Claim("ExpiresAt", (DateTime.Now + TimeSpan.FromMinutes((double)loginInfo.StorageModel.ExpirationMinutes)).ToString())
                            };

                            var ActionUrl = "Dashboard";
                            var ActionController = "Home";

                            if (loginInfo.UserRoles.Any(x => x.RoleName.Contains("Danışan")))
                            {
                                ActionUrl = "Request";
                                ActionController = "Request";

                                if (string.IsNullOrEmpty(model.CitizenNo) || model.CitizenNo == "11111111111" || model.CitizenNo.Length != 11)
                                {
                                    ModelState.AddModelError("CitizenNo", "TC Kimlik Numarası eksik veya hatalı!");
                                    ModelState.AddModelError("IsValid", "false");
                                    return View(model);
                                }
                            }

                            if (loginInfo.UserRoles.Any(x => x.RoleName.Contains("Tester")))
                            {
                                ActionUrl = "Tester";
                                ActionController = "Home";
                            }


                            // Rol bilgileri ekleniyor
                            foreach (var role in loginInfo.UserRoles)
                            {
                                claims.Add(new Claim(ClaimTypes.Role, role.RoleName));
                            }

                            // UserClaims ekleniyor
                            if (loginInfo.UserClaims != null)
                            {
                                foreach (var claim in loginInfo.UserClaims)
                                {
                                    claims.Add(new Claim(claim.ClaimType, claim.ClaimValue));
                                }
                            }

                            // RoleClaims ekleniyor
                            if (loginInfo.RoleClaims != null)
                            {
                                foreach (var claim in loginInfo.RoleClaims)
                                {
                                    claims.Add(new Claim(claim.ClaimType, claim.ClaimValue));
                                }
                            }

                            // ClaimsIdentity ve AuthenticationProperties oluşturuluyor
                            var claimsIdentity = new ClaimsIdentity(claims, "Login");
                            var authProps = new AuthenticationProperties
                            {
                                ExpiresUtc = DateTime.UtcNow + TimeSpan.FromMinutes(43200) // 30 gün
                            };

                            // Kullanıcıyı sisteme giriş yapmış olarak işaretleme
                            await _httpContextAccessor.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProps);

                            // SessionService üzerinden kullanıcının claimlerini saklama
                            _sessionService.SaveClaimsForUser(loginInfo.Id.ToString(), claims);

                            if (response.StatusCode == System.Net.HttpStatusCode.OK)
                            {
                                var menusResponse = await client.GetAsync(ApplicationData.ApiBaseURL + "Identity/GetMenusByUrl");

                                if (menusResponse.IsSuccessStatusCode)
                                {
                                    var menusContent = await menusResponse.Content.ReadAsStringAsync();

                                    var menusJsonObj = JsonConvert.DeserializeObject<JObject>(menusContent);

                                    var valueObj = menusJsonObj["value"].ToString();

                                    var menuRoleList = JsonConvert.DeserializeObject<Dictionary<string, List<MenuRoleDto>>>(valueObj);

                                    ApplicationData.MenuRoleList = menuRoleList;
                                }
                            }

                            string serializedModel = System.Text.Json.JsonSerializer.Serialize(loginInfo.StorageModel);
                            TempData["StorageModel"] = serializedModel;

                            return RedirectToAction(ActionUrl, ActionController);
                        }
                        else
                        {
                            var errorResponse = JsonConvert.DeserializeObject<ErrorResponse>(jsonString);
                            if (errorResponse != null)
                                foreach (var error in errorResponse.Errors)
                                {
                                    ModelState.AddModelError(error.FieldName, error.ErrorMessage);
                                }

                            ModelState.AddModelError("IsValid", "false");
                            return View(model);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                TempData["Message"] = ex.Message;
                return RedirectToAction("Login");
            }
        }

        [HttpPost]
        public async Task<ActionResult> LoginForRegionalManager()
        {
            try
            {
                // Mevcut kullanıcının claim'lerini al
                var currentClaims = _httpContextAccessor.HttpContext.User.Claims.ToList();

                // "Danışman" rolünü içeren claim'i bul ve çıkar
                var advisorRoleClaim = currentClaims.FirstOrDefault(c => c.Type == ClaimTypes.Role && c.Value.Contains("Danışman"));
                if (advisorRoleClaim != null)
                {
                    currentClaims.Remove(advisorRoleClaim);
                }

                var claimsIdentity = new ClaimsIdentity(currentClaims, "Login");
                var authProps = new AuthenticationProperties
                {
                    ExpiresUtc = DateTime.UtcNow + TimeSpan.FromMinutes(43200) // 1 ay.
                };

                await _httpContextAccessor.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProps);

                return Json(new { redirectUrl = Url.Action("Dashboard", "Home") });
            }
            catch (Exception ex)
            {
                return Json(new { error = true, message = ex.Message });
            }
        }

        [BypassAuthorizePageAttribute]
        [HttpPost]
        public async Task<ActionResult> LoginAsUser(string email, string token)
        {

            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(ApplicationData.ApiBaseURL + "Account/");

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    using (var content = new MultipartFormDataContent())
                    {
                        content.Add(new StringContent(email), "Email");
                        var response = await client.PostAsync("loginAsUser", content);

                        if (response.StatusCode == System.Net.HttpStatusCode.OK)
                        {
                            var jsonString = await response.Content.ReadAsStringAsync();

                            var jsonObj = JsonConvert.DeserializeObject<JObject>(jsonString);

                            var valuePart = jsonObj["value"].ToString();

                            var loginInfo = JsonConvert.DeserializeObject<LoginResponseModel>(valuePart);

                            var claims = new List<Claim>()
                            {
                                 new Claim("UserId", loginInfo.Id.ToString()),
                                 new Claim(ClaimTypes.Name, loginInfo.StorageModel.Name + " " + loginInfo.StorageModel.Surname),
                                 new Claim(ClaimTypes.Email, loginInfo.StorageModel.Email),
                                 new Claim("Token", loginInfo.StorageModel.Token),
                                 new Claim("ExpiresAt", (DateTime.Now + TimeSpan.FromMinutes((double)loginInfo.StorageModel.ExpirationMinutes)).ToString())
                            };

                            var ActionUrl = "Dashboard";
                            var ActionController = "Home";

                            if (loginInfo.UserRoles.Any(x => x.RoleName.Contains("Tester")))
                            {
                                ActionUrl = "Tester";
                                ActionController = "Home";
                            }

                            foreach (var role in loginInfo.UserRoles)
                                claims.Add(new Claim(ClaimTypes.Role, role.RoleName));

                            // UserClaims ekleniyor
                            if (loginInfo.UserClaims != null)
                                foreach (var claim in loginInfo.UserClaims)
                                    claims.Add(new Claim(claim.ClaimType, claim.ClaimValue));

                            // RoleClaims ekleniyor
                            if (loginInfo.RoleClaims != null)
                                foreach (var claim in loginInfo.RoleClaims)
                                    claims.Add(new Claim(claim.ClaimType, claim.ClaimValue));
                            var claimsIdentity = new ClaimsIdentity(claims, "Login");
                            var authProps = new AuthenticationProperties
                            {
                                ExpiresUtc = DateTime.UtcNow + TimeSpan.FromMinutes(43200) // 1ay.
                            };

                            await _httpContextAccessor.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProps);

                            // SessionService üzerinden kullanıcının claimlerini saklama
                            _sessionService.SaveClaimsForUser(loginInfo.Id.ToString(), claims);

                            if (response.StatusCode == System.Net.HttpStatusCode.OK)
                            {
                                var menusResponse = await client.GetAsync(ApplicationData.ApiBaseURL + "Identity/GetMenusByUrl");

                                if (menusResponse.IsSuccessStatusCode)
                                {
                                    var menusContent = await menusResponse.Content.ReadAsStringAsync();

                                    var menusJsonObj = JsonConvert.DeserializeObject<JObject>(menusContent);

                                    var valueObj = menusJsonObj["value"].ToString();

                                    var menuRoleList = JsonConvert.DeserializeObject<Dictionary<string, List<MenuRoleDto>>>(valueObj);
                                    ApplicationData.MenuRoleList = menuRoleList;
                                }
                            }

                            string serializedModel = System.Text.Json.JsonSerializer.Serialize(loginInfo.StorageModel);
                            TempData["StorageModel"] = serializedModel;

                            return RedirectToAction(ActionUrl, ActionController);
                        }
                        return RedirectToAction("AccessDenied");
                    }
                }
            }
            catch (Exception ex)
            {
                TempData["Message"] = ex.Message;
                return RedirectToAction("Login");
            }
        }
    }
}