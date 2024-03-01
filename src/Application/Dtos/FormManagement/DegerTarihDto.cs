using System;

namespace ITX.Application.Dtos.FormManagement
{
    public class DegerTarihDto : BaseDto<long>
    {
        public DateTime Deger { get; set; }
        public long FormTanimId { get; set; }
        public long FormAlanId { get; set; }
        public long FormDegerId { get; set; }


    }
}

