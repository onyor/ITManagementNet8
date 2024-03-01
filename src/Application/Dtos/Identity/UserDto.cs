using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ITX.Application.Dtos.Identity
{
    public class UserDto : BaseDto<Guid>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Fullname { get { return this.Name + " " + this.Surname; } set { } }
        public string Title { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordHash { get; set; }
        public string PhoneNumber { get; set; }
        public long? ClientId { get; set; }
        public string[] DormName { get; set; }
        public string CitizenNo { get; set; }
        public Guid? CurrentRoleId { get; set; }
        public string CurrentRoleName { get; set; }
        public string LdapKod { get; set; }
        public string DormServiceCode { get; set; }
        public bool EmailConfirmed { get; set; }
        public string ShowRequestTypeGroups { get; set; }
        public bool ItIsNew { get; set; }
        public bool IsActive { get; set; }
        public string UserName { get; set; }


        #region TokenInfo
        public string Token { get; set; }
        public int ExpirationMinutes { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }
        #endregion

        [Required]
        public List<UserRoleDto> UserRoles { get; set; }
        public List<UserClaimDto> UserClaims { get; set; }
        public List<RoleClaimDto> RoleClaims { get; set; }
        public List<string> YetkiNesneList { get; set; }
    }


    public class LoginResponseModel {
        public StorageModel StorageModel { get; set; }
        public Guid Id { get; set; }
        public string LdapKod { get; set; }
        public List<UserRoleDto> UserRoles { get; set; }
        public List<UserClaimDto> UserClaims { get; set; }
        public List<RoleClaimDto> RoleClaims { get; set; }
        public List<string> YetkiNesneList { get; set; }
    }

    public class  StorageModel
    {
        public long? ClientId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Fullname { get { return this.Name + " " + this.Surname; } set { } }
        public string Title { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string CurrentRoleName { get; set; }
        public string[] DormName { get; set; }
        public bool ItIsNew { get; set; }
        public string CitizenNo { get; set; }
        public Guid? CurrentRoleId { get; set; }
        public string DormServiceCode { get; set; }
        public string ShowRequestTypeGroups { get; set; }
        public List<UserRoleDto> UserRoles { get; set; }

        #region TokenInfo
        public string Token { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }
        public int ExpirationMinutes { get; set; }
        #endregion 
    }
}

