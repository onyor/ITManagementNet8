namespace ITX.Application.Dtos.FormManagement
{
    public class ValueTextDto : BaseDto<long>
    {
        public string Deger { get; set; }
        public long FormTanimId { get; set; }
        public long FormAlanId { get; set; }
        public long FormDegerId { get; set; }

      

    }
}

