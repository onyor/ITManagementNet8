using System;

namespace ITX.Application.Dtos.Identity
{
    public class UserRoleDto
    {
        public Guid UserId { get; set; }
        public Guid RoleId { get; set; }

        public string UserName { get; set; }
        public string RoleName { get; set; }
    }
}

