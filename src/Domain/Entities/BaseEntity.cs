using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ITX.Domain.Entities
{
    public abstract class BaseEntity<TId>
    {
        [Column(Order = 0)]
        public TId Id { get; set; }
        [Column(Order = 94)]
        public DateTime CreatedAt { get; set; }
        [Column(Order = 95)]
        public Guid CreatedBy { get; set; }
        [Column(Order = 96)]
        public DateTime? UpdatedAt { get; set; }
        [Column(Order = 97)]
        public Guid? UpdatedBy { get; set; }
        [Column(Order = 98)]
        public bool IsActive { get; set; }
        [Column(Order = 99)]
        public bool IsDeleted { get; set; }
    }
}
