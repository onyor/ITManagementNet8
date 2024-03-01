using ITX.Domain.Entities.Identity;
using ITX.Domain.Shared.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace ITX.Application.Dtos.LogManagement
{


    public class RequestLogDto : BaseDto<long>
    {
        public Guid UserId { get; set; } // UserId
        public string UserIdAdSoyad { get; set; } 
        public string RemoteIp { get; set; }
        public string Url { get; set; }
        public DateTime CreatedAt { get; set; }
        public long FieldId { get; set; }
        public string FieldName { get; set; }
        public string Fonksiyon { get; set; }
        public string Islem { get; set; }
        public EnmRequestLogTypeCode RequestLogTypeCodeId { get; set; }
        public string LogTypeAd { get; set; }
        public string HataKod { get; set; }
        public bool IsSystem { get; set; } // eg: executed by background jobs, workers

    }
}

