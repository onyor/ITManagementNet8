using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Domain.Entities.FormManagement
{
    public class EnumVeri : BaseEntity<long>
    {
        public string Ad { get; set; }
        public string Aciklama { get; set; }
        public int Deger { get; set; }
        public int SiraNo { get; set; }
        public string Kod { get; set; }
        public long EnumTanimId { get; set; }

    }
}
