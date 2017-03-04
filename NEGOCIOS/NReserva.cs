using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public static class NReserva
    {
        #region RESERVA
        public static List<EReserva> ListarReservas(EReserva objE)
        {
            return DReserva.ListarReservas(objE);
        }

        public static EReserva ObtenerReserva(EReserva objE)
        {
            return DReserva.ObtenerReserva(objE);
        }

        public static int ActualizarReserva(EReserva objE)
        {
            return DReserva.ActualizarReserva(objE);
        }
        #endregion

        #region ATENCION
        public static List<EReserva> ListarAtenciones(EReserva objE)
        {
            return DReserva.ListarAtenciones(objE);
        }

        public static EReserva ObtenerAtencion(EReserva objE)
        {
            return DReserva.ObtenerAtencion(objE);
        }

        public static int ActualizarAtencion(EReserva objE)
        {
            return DReserva.ActualizarAtencion(objE);
        }
        #endregion
        public static List<ETipoReserva> ListarTipoReserva()
        {
            return DReserva.ListarTipoReserva();
        }

        public static List<EMedioPago> ListarMedioPago()
        {
            return DReserva.ListarMedioPago();
        }
    }
}
