namespace ITX.Application.Dtos.FormManagement
{
    public class ValueNumberDto : BaseDto<long>
    {
        public decimal Deger { get; set; }
        public long FormTanimId { get; set; }
        public long FormAlanId { get; set; }
        public long FormDegerId { get; set; }

    }
}

