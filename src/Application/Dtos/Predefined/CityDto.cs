using System;
using System.ComponentModel.DataAnnotations;

namespace ITX.Application.Dtos.Predefined
{
    public class CityDto : BaseDto<long>
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public long CountryId { get; set; }
        public string PhoneCode { get; set; }
        public string CountryIdAd { get; set; }
        public long? ZoneId { get; set; }
        public string ZoneIdAd { get; set; }
        public double? Lat { get; set; }
        public double? Lng { get; set; }
        public Guid? UserId { get; set; }
    }
}

