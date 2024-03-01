using Microsoft.VisualBasic;
using ITX.Domain.Shared.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace ITX.Domain.Entities.Predefined
{
    public class Announce : BaseEntity<long>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsPublish { get; set; }
    } 
}
