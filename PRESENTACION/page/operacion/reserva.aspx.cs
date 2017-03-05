using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using ENTIDAD;
using NEGOCIOS;

namespace PRESENTACION.page.operacion
{
    public partial class reserva : System.Web.UI.Page
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

                List<ETipoHabitacion> listaTipo = NHabitacion.ListarTipoHabitacion();
                List<ETipoReserva> listaTipoReserva = NReserva.ListarTipoReserva();
                List<EMedioPago> listaMedioPago = NReserva.ListarMedioPago();

                objRespuesta.Resultado = new
                {
                    listaTipo = listaTipo,
                    listaTipoReserva = listaTipoReserva,
                    listaMedioPago = listaMedioPago,
                    fechaInicio = DateTime.Now.ToShortDateString(),
                    fechaFin = DateTime.Now.AddDays(7).ToShortDateString()
                };
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object BuscarHabitacionWM(string fechaInicio, string fechaFin, int idTipo)
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
                eHabitacion.FECHA_INICIO = Convert.ToDateTime(fechaInicio);
                eHabitacion.FECHA_FIN = Convert.ToDateTime(fechaFin);
                eHabitacion.TIPOHABITACION = new ETipoHabitacion() { ID_TIPO_HABITACION = idTipo };
                objRespuesta.Resultado = NHabitacion.DisponibilidadHabitacion(eHabitacion);
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object BuscarClienteWM(string numero, string nombre)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                ECliente eCliente = new ECliente();
                eCliente.NOMBRES = nombre;
                eCliente.NUM_DOCUMENTO = numero;

                objRespuesta.Resultado = NCliente.BuscarClientes(eCliente);
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }


        [WebMethod()]
        public static object BuscarReservaWM(string fechaInicio, string fechaFin, int idTipo, string nocliente)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                EReserva eReserva = new EReserva();
                eReserva.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
                eReserva.FEC_INI = Convert.ToDateTime(fechaInicio);
                eReserva.FEC_FIN = Convert.ToDateTime(fechaFin);
                eReserva.ID_TIPO_HABITACION = idTipo;
                eReserva.NOM_CLIENTE = nocliente;
                objRespuesta.Resultado = NReserva.ListarReservas(eReserva);
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object GuardarReservaWM(EReserva eReserva)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                eReserva.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
                eReserva.USU_REG = eSession.ID_USUARIO;
                if (eReserva.ID_RESERVA == 0) eReserva.OPCION = 3;
                else eReserva.OPCION = 4;

                NReserva.ActualizarReserva(eReserva);

                objRespuesta.Success("Se guardo satisfactoriamente la reserva");
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object AnularReservaWM(int idReserva)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                EReserva eReserva = new EReserva();
                eReserva.ID_RESERVA = idReserva;
                eReserva.OPCION = 5;
                eReserva.USU_REG = eSession.ID_USUARIO;
                NReserva.ActualizarReserva(eReserva);

                objRespuesta.Success("Se anulo satisfactoriamente la reserva");
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object ObtenerReservaWM(int idReserva)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                EReserva eReserva = new EReserva();
                eReserva.ID_RESERVA = idReserva;
                eReserva.OPCION = 2;
                eReserva = NReserva.ObtenerReserva(eReserva);

                if (eReserva.ID_RESERVA > 0)
                {
                    objRespuesta.Resultado = eReserva;
                }
                else
                {
                    objRespuesta.Error("No se encontro datos de la reserva");
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