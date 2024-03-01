namespace ITX.Domain.Entities.FormManagement
{
    public class FormTarihce : BaseEntity<long>
    {
        public long FormTanimId { get; set; }
        public long FormDegerId { get; set; }
        public string JsonVeri { get; set; }

        public virtual FormTanim FormTanim { get; set; }
        public virtual FormDeger FormDeger { get; set; }
    }
}
