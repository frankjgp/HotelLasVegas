using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using ENTIDAD;
using NEGOCIOS;

namespace PRESENTACION.page.mantenimiento
{
    public partial class habitacion : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod()]
        public static object ListaInicialWM()
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();

            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                objRespuesta.Resultado = NHabitacion.ListarTipoHabitacion();
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object BuscarHabitacionWM(string numero, int idTipo)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                EHabitacion eHabitacion = new EHabitacion();
                eHabitacion.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
                eHabitacion.NUMERO = numero;
                eHabitacion.TIPOHABITACION = new ETipoHabitacion() { ID_TIPO_HABITACION = idTipo };
                objRespuesta.Resultado = NHabitacion.ListarHabitaciones(eHabitacion);
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object GuardarHabitacionWM(EHabitacion eHabitacion)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                eHabitacion.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
                eHabitacion.USU_REG = eSession.ID_USUARIO;
                if (eHabitacion.ID_HABITACION == 0) eHabitacion.OPCION = 2;
                else eHabitacion.OPCION = 3;

                NHabitacion.ActualizarHabitaciones(eHabitacion);

                objRespuesta.Success("Se guardo satisfactoriamente la habitación");
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object AnularHabitacionWM(int idHabitacion)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                EHabitacion eHabitacion = new EHabitacion();
                eHabitacion.ID_HABITACION = idHabitacion;
                eHabitacion.OPCION = 4;
                NHabitacion.ActualizarHabitaciones(eHabitacion);

                objRespuesta.Success("Se anulo satisfactoriamente la habitación");
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object ObtenerHabitacionWM(int idHabitacion)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                EHabitacion eHabitacion = new EHabitacion();
                eHabitacion.ID_HABITACION = idHabitacion;
                eHabitacion.OPCION = 1;
                List<EHabitacion> lista = NHabitacion.ListarHabitaciones(eHabitacion);

                if (lista.Count > 0)
                {
                    objRespuesta.Resultado = lista[0];
                }
                else
                {
                    objRespuesta.Error("No se encontro datos de la habitación");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }
    }
}