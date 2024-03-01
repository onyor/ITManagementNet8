namespace ITX.Domain.Entities.FormManagement
{
    public class ValueText : BaseEntity<long>
    {
        public string Deger { get; set; }
        public long FormTanimId { get; set; }
        public long FormAlanId { get; set; }
        public long FormDegerId { get; set; }

        // nav properties
        public virtual FormTanim FormTanim { get; set; }
        public virtual FormAlan FormAlan { get; set; }
        public virtual FormDeger FormDeger { get; set; }

    }
}
