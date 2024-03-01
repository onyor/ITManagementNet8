using System;

namespace ITX.Application.Dtos.LogManagement
{
    public class AuditLogDto : BaseDto<long>
    {
        public Guid UserId { get; set; }
        public string Type { get; set; }
        public string TableName { get; set; }
        public DateTime CreatedAt { get; set; }
        public string OldValues { get; set; }
        public string NewValues { get; set; }
        public string AffectedColumns { get; set; }
        public string PrimaryKey { get; set; }
        public string PrimaryInfo { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        public string UserEmail { get; set; }
        public string UserInfo => UserName + " " + UserSurname + " (" + UserEmail + ")";
    }
}

