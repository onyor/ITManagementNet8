namespace ITX.Application.Dtos.Identity
{
    public class MenuDto : BaseDto<long>
    {
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public int? Order { get; set; }
        public string Param { get; set; }
        public long? ParentId { get; set; }
        public string ParentName { get; set; }
        public bool IsNotMenuVisible { get; set; }

        public MenuRoleDto[] MenuRoles { get; set; }
    }
}

