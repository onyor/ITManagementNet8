using ITX.Domain.Entities.Identity;
using System;
using System.Collections.Generic;

namespace ITX.Domain.Entities.Predefined
{
    public class City : BaseEntity<long>
    {
        public string Name { get; set; }
        public string Code { get; set; }
         
        public long CountryId { get; set; }
        public long? ZoneId { get; set; }
        public string PhoneCode { get; set; }
        public double? Lat { get; set; }
        public double? Lng { get; set; }
        public Guid? UserId { get; set; }

        // nav properties
        public virtual Country Country { get; set; }
        public virtual User User { get; set; }
        public IList<District> Districts { get; set; }
    }
}
