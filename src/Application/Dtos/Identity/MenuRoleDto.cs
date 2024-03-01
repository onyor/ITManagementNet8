namespace ITX.Application.Dtos.Identity
{
    public class MenuRoleDto : BaseDto<long>
    {
        public int MenuId { get; set; }
        public string MenuName { get; set; }
        public string RoleId { get; set; }
        public string RoleName { get; set; }
    }
}

