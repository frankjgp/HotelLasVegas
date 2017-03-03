using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class EEmpleado
    {
        public int ID_EMPLEADO { get; set; }
        public string NOMBRES { get; set; }
        public string APELLIDOS { get; set; }
        public string CARGO { get; set; }
        public decimal SUELDO { get; set; }
        public DateTime FECHA_REG { get; set; }
        public int ESTADO { get; set; }
    }
}
