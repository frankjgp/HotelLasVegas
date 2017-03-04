using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class EMovimiento
    {
        public int ID_MOVIMIENTO { get; set; }
        public int ID_TIPO_MOVIMIENTO { get; set; }
        public string DESCRIPCION { get; set; }
        public DateTime FECHA_INI { get; set; }
        public DateTime FECHA_FIN { get; set; }
        public decimal MONTO { get; set; }
        public string OBSERVACION { get; set; }
        public int USU_MOD { get; set; }
        public int ID_LOCAL { get; set; }
        public string TIPO { get; set; }
        public decimal ADELANTO { get; set; }
        public int OPCION { get; set; }

    }
}
