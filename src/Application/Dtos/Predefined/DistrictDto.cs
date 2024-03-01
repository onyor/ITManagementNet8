namespace ITX.Application.Dtos.Predefined
{
    public class DistrictDto : BaseDto<long>
    {
        public string Name { get; set; }
        public long CityId { get; set; }
        public string CityIdName { get; set; }
        public int? Population { get; set; }
        public int? Altitude { get; set; }

    }
}

