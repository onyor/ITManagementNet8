
using ITX.Domain.Shared.Enums;
using System;

namespace ITX.Domain.Entities.LogManagement
{
    public class RequestLog
    {
        // SET by System
        public long Id { get; set; }//tablodan kaldır
        public Guid? UserId { get; set; } // UserId //arama
        public string RemoteIp { get; set; } //arama
        public string Url { get; set; }//tablodan kaldır
        public DateTime CreatedAt { get; set; }//arama

        // SET by Developer
        public long? FieldId { get; set; }//tablodan kaldır
        public string FieldName { get; set; }//tablodan kaldır
        public string Fonksiyon { get; set; }
        public string Islem { get; set; }
        public EnmRequestLogTypeCode RequestLogTypeCodeId { get; set; }//arama
        public string HataKod { get; set; }//tablodan kaldır
        public bool IsSystem { get; set; } // eg: executed by background jobs, workers
    }
}
