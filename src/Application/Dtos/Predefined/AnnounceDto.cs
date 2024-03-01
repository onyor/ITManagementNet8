using ITX.Domain.Shared.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace ITX.Application.Dtos.Predefined
{
    public class AnnounceDto : BaseDto<long>
    {

        public string Title { get; set; }
        public string ShownTypeIdName { get; set; }

        public string Content { get; set; }
        public int Order { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsPublish { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

