using Microsoft.EntityFrameworkCore.ChangeTracking;

using ITX.Domain.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace ITX.Domain.Entities.LogManagement
{
    public class AuditLogEntry
    {
        public AuditLogEntry(EntityEntry entry)
        {
            Entry = entry;
        }

        public EntityEntry Entry { get; }
        public Guid UserId { get; set; }
        public string TableName { get; set; }
        public Dictionary<string, object> KeyValues { get; } = new();
        public Dictionary<string, object> OldValues { get; } = new();
        public Dictionary<string, object> NewValues { get; } = new();
        public List<PropertyEntry> TemporaryProperties { get; } = new();
        public EnmAuditLogTypeCode AuditLogTypeCodeId { get; set; }
        public List<string> ChangedColumns { get; } = new();
        public bool HasTemporaryProperties => TemporaryProperties.Any();

        public AuditLog ToAudit()
        {
            var auditLog = new AuditLog
            {
                UserId = UserId,
                Type = AuditLogTypeCodeId.ToString(),
                TableName = TableName,
                CreatedAt = DateTime.Now,
                PrimaryKey = JsonSerializer.Serialize(KeyValues),
                OldValues = OldValues.Count == 0 ? null : JsonSerializer.Serialize(OldValues),
                NewValues = NewValues.Count == 0 ? null : JsonSerializer.Serialize(NewValues),
                AffectedColumns = ChangedColumns.Count == 0 ? null : JsonSerializer.Serialize(ChangedColumns)
            };

            return auditLog;
        }
    }
}
