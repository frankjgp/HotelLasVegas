using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public static class NHabitacion
    {
        public static List<EHabitacion> ListarHabitaciones(EHabitacion objE)
        {
            return DHabitacion.ListarHabitaciones(objE);
        }

        public static int ActualizarHabitaciones(EHabitacion objE)
        {
            return DHabitacion.ActualizarHabitaciones(objE);
        }

        public static List<ETipoHabitacion> ListarTipoHabitacion()
        {
            return DHabitacion.ListarTipoHabitacion();
        }

        public static List<EHabitacion> DisponibilidadHabitacion(EHabitacion objE)
        {
            return DHabitacion.DisponibilidadHabitacion(objE);
        }
    }
}
