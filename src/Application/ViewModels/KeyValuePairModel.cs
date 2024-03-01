using System.ComponentModel.DataAnnotations.Schema;

namespace ITX.Application.ViewModels
{
    [NotMapped]
    public class KeyValuePairModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }
}
