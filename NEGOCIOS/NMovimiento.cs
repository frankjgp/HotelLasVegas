using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public static class NMovimiento
    {
        public static int ActualizarMovimientos(EMovimiento ent)
        {
            return DMovimiento.ActualizarMovimientos(ent);
        }

        public static List<EMovimiento> ListarMovimientos(EMovimiento ent)
        {
            return DMovimiento.ListarMovimientos(ent);
        }
        public static List<EMovimiento> ListarTiposMovimiento()
        {
            return DMovimiento.ListarTiposMovimiento();
        }

        public static List<EMovimiento> ListarMovimientosReporte(EMovimiento ent)
        {
            return DMovimiento.ListarMovimientosReporte(ent);
        }
        public static List<EMovimiento> ListarAlertaReserva(int ID_LOCAL)
        {
            return DMovimiento.ListarAlertaReserva(ID_LOCAL);
        }
        public static List<EMovimiento> ListarAlertaHabitacion(int ID_LOCAL)
        {
            return DMovimiento.ListarAlertaHabitacion(ID_LOCAL);
        }
        public static string ListarTotalAlerta(int ID_LOCAL)
        {
            return DMovimiento.ListarTotalAlerta(ID_LOCAL);
        }
    }
}
