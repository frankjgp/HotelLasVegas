using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class EHabitacion
    {
        public int ID_HABITACION { get; set; }
        public string NUMERO { get; set; }
        public int ID_TIPO_HABITACION { get; set; }
        public decimal PRECIO { get; set; }
        public int ID_LOCAL { get; set; }
        public string DESCRIPCION { get; set; }
    }
}
