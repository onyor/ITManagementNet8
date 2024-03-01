using System;

namespace ITX.Application.Dtos.LogManagement
{
    public class AuditLogSearchDto
    {
        public Guid UserId { get; set; }
        public string Type { get; set; }
        public string TableName { get; set; }
        public DateTime? BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string   PrimaryKey{ get; set; }
    }
}
