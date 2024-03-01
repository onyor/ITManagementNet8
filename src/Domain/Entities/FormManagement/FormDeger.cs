namespace ITX.Domain.Entities.FormManagement
{
    public class FormDeger : BaseEntity<long>
    {
       
        public long FormTanimId { get; set; }
        public long? EskiId { get; set; }

        // Relations
        public FormTanim FormTanim { get; set; }

    }
}
