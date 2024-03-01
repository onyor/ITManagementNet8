using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using ITX.Application.Dtos.Identity;
using ITX.Application.Interfaces;
using ITX.Application.Models;
using ITX.Application.Shared;
using ITX.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ITX.Infrastructure.Services
{
    public class JwtService : IJwtService
    {
        private readonly JwtConfiguration _jwtConfig;
        private readonly UserManager<User> _userManager;

        public JwtService(
            JwtConfiguration jwtConfig,
            UserManager<User> userManager)
        {
            _jwtConfig = jwtConfig;
            _userManager = userManager;
        }

        public int GetMinutes => _jwtConfig.ExpirationMinutes;

        public string CreateToken(UserDto userDto)
        {
            var claims = new List<Claim>
            {
                new Claim("UserId", userDto.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.GivenName, userDto.Name),
                new Claim(JwtRegisteredClaimNames.FamilyName, userDto.Surname),
                new Claim(JwtRegisteredClaimNames.Email, userDto.Email),
            };

            if (userDto?.ClientId > 0)
                claims.Add(new Claim("ClientId", userDto.ClientId.ToString()));

            claims.AddRange(userDto.UserRoles.Select(role => new Claim(ClaimTypes.Role, role.RoleName)));
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var encryptionKey = Encoding.UTF8.GetBytes(_jwtConfig.EncryptionKey);
            var encryptingCredentials = new EncryptingCredentials(new SymmetricSecurityKey(encryptionKey),
                SecurityAlgorithms.Aes128KW, SecurityAlgorithms.Aes128CbcHmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Audience = _jwtConfig.Audience,
                EncryptingCredentials = encryptingCredentials,
                Expires = DateTime.Now.AddMinutes(_jwtConfig.ExpirationMinutes),
                IssuedAt = DateTime.Now,
                Issuer = _jwtConfig.Issuer,
                NotBefore = DateTime.Now.AddMinutes(_jwtConfig.NotBeforeMinutes),
                SigningCredentials = creds,
                Subject = new ClaimsIdentity(claims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(2)
            };
            return refreshToken;
        }

    }
}