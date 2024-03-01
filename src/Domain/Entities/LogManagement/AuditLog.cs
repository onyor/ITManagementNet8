
using ITX.Domain.Entities.Identity;
using System;

namespace ITX.Domain.Entities.LogManagement
{
    public class AuditLog
    {
        public long Id { get; set; }
        public Guid UserId { get; set; }
        public string Type { get; set; }
        public string TableName { get; set; }
        public DateTime CreatedAt { get; set; }
        public string OldValues { get; set; }
        public string NewValues { get; set; }
        public string AffectedColumns { get; set; }
        public string PrimaryKey { get; set; }

        // NAV properties
        public virtual User User { get; set; }
    }
}
