using ITX.Domain.Shared.Enums;
using System;

namespace ITX.Application.Dtos.LogManagement
{
    public class RequestLogSearchDto
    {
        public Guid UserId { get; set; } // UserId
        //public string RemoteIp { get; set; }
        //public string Url { get; set; }
        public DateTime? BeginDate { get; set; }
        public DateTime? EndDate { get; set; }

        public long FieldId { get; set; }
        //public string FieldName { get; set; }
        //public string Fonksiyon { get; set; }
        //public string Islem { get; set; }
        public EnmRequestLogTypeCode RequestLogTypeCodeId { get; set; }
        //public string HataKod { get; set; }
        public bool IsSystem { get; set; } // eg: executed by background jobs, workers
    }
}

