using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class EUsuario
    {
        public EEmpleado EMPLEADO { get; set; }
        public int ID_USUARIO { get; set; }
        public string DSC_USUARIO { get; set; }
        public string PASSWORD { get; set; }
        public DateTime FECHA_REG { get; set; }
        public int ESTADO { get; set; }

        public EPerfil PERFIL { get; set; }
        public string LOCAL_PERFIL { get; set; }

        #region EXTRAS
        public ELocal LOCAL { get; set; }
        #endregion
    }
}
