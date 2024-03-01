using Ardalis.Result;
using AutoMapper;
using ITX.Application.Dtos.Identity;
using ITX.Application.Interfaces;
using ITX.Application.Interfaces.Identity;
using ITX.Application.Models;
using ITX.Domain.Entities.Identity;
using ITX.Infrastructure.Helpers;
using ITX.WebAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace ITX.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseController
    {
        private readonly IJwtService _jwtService;
        private readonly IMapper _mapper;
        private readonly RoleManager<Role> _roleManager;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IUserService _userService;
        private readonly IRequestLogService _requestLogService;

        public AccountController(
            IJwtService jwtService,
            IMapper mapper,
            RoleManager<Role> roleManager,
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IUserService userService,
            IRequestLogService requestLogService
        )
        {
            _jwtService = jwtService;
            _mapper = mapper;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _userManager = userManager;
            _userService = userService;
            _requestLogService = requestLogService;
        }

        [HttpGet]
        public async Task<Result<UserDto>> GetCurrentUser()
        {
            var userId = Guid.Parse(HttpContext.User.Claims.First(t => t.Type == "UserId").Value);
            if (userId == Guid.Empty)
            {
                return Result<UserDto>.Error("LoginError400");
            }

            var result = await _userService.BuildUserDtoAsync(userId, "", "", "");

            return result.Value;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<Result<LoginResponseModel>> Login([FromForm] LoginDto dto)
        {
            try
            {
                ErrorResponse errorResponse = new ErrorResponse(requestLogService: _requestLogService);
                errorResponse.Errors = new ObservableCollection<ApiError>();

                UserDto userDto = new UserDto();
                if (dto.UserName == null || dto.Password == null)
                {
                    errorResponse.Errors.Add(new ApiError { FieldName = "UserName", ErrorMessage = "Giriş Bilgileri Hatalı!" });
                    return Result<LoginResponseModel>.Error(string.Join(',', errorResponse.Errors));
                }
                else
                {
                    //userDto = await _userService.GetByEmailAsync(dto.Email);
                    userDto = await _userService.GetByUserNameAsync(dto.UserName);
                    userDto.CitizenNo = dto.CitizenNo; // Sonra Kaldırılacak.

                    if (userDto.Email == null)
                    {
                        errorResponse.Errors.Add(new ApiError { FieldName = "UserName", ErrorMessage = "Hatalı kullanıcı Adı!" });
                        return Result<LoginResponseModel>.Error(string.Join(',', errorResponse.Errors));
                    }

                    var oLDAPLogin = LDAPHelper.ADAuthenticate(dto.UserName, dto.Password);
                    if (!oLDAPLogin.IsSuccess)
                    {
                        var resultUserLogin = await _signInManager.CheckPasswordSignInAsync(_mapper.Map<User>(userDto), dto.Password, false);
                        if (!resultUserLogin.Succeeded)
                        {
                            errorResponse.Errors.Add(new ApiError { FieldName = "Password", ErrorMessage = "Hatalı Bilgi Girişi!" });
                            return Result<LoginResponseModel>.Error(string.Join(',', errorResponse.Errors));
                        }
                    }

                    if (!userDto.UserRoles.Any())
                        errorResponse.Errors.Add(new ApiError { FieldName = "Roles", ErrorMessage = "Kullanıcıya ait geçerli bir rol bulunamadı!" });
                }

                if (errorResponse.Errors.Any())
                    return Result<LoginResponseModel>.Error(string.Join(',', errorResponse.Errors));

                return Result<LoginResponseModel>.Success(await ReturnUserInfo(userDto));
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpPost("loginAsUser")]
        public async Task<Result<LoginResponseModel>> LoginAsUser([FromForm] string email)
        {
            var adminId = HttpContext.User.Claims.First(t => t.Type == "UserId").Value;
            var userDto = await _userService.GetByEmailAsync(email);

            if (userDto == null)
            {
                return Result<LoginResponseModel>.Error("LoginError400");
            }

            if (!userDto.UserRoles.Any())
            {
                return Result<LoginResponseModel>.Forbidden();
            }

            return Result<LoginResponseModel>.Success(await ReturnUserInfo(userDto, adminId));
        }

        private async Task<LoginResponseModel> ReturnUserInfo(UserDto userDto, string adminId = "")
        {
            try
            {
                if (adminId != "")
                    await _userService.LogUserAction(Guid.Parse(adminId), "Login-As", userDto.Id.ToString());
                else
                    await _userService.LogUserAction(userDto.Id, "Login");


                var result = (await _userService.BuildUserDtoAsync(userDto.Id, userDto.CitizenNo, userDto.DormServiceCode, userDto.ShowRequestTypeGroups)).Value;

                var refreshToken = _jwtService.GenerateRefreshToken();

                SetRefreshToken(refreshToken, result);

                var loginModel = _mapper.Map<LoginResponseModel>(result);
                var storageModel = _mapper.Map<StorageModel>(result);
                loginModel.StorageModel = storageModel;
                loginModel.StorageModel.ItIsNew = userDto.ItIsNew;

                return loginModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        private void SetRefreshToken(RefreshToken newRefreshToken, UserDto user)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };

            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.Created;
            user.TokenExpires = newRefreshToken.Expires;
        }
    }
}


