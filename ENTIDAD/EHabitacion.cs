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
        public ETipoHabitacion TIPOHABITACION { get; set; }
        public decimal PRECIO { get; set; }
        public int ID_LOCAL { get; set; }
        public int ESTADO { get; set; }
        public string DSC_ESTADO { get; set; }
        public int USU_REG { get; set; }
        public int OPCION { get; set; }

        #region EXTRAS
        public DateTime FECHA_INICIO { get; set; }
        public DateTime FECHA_FIN { get; set; }
        #endregion
    }
}
