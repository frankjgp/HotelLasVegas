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
    public partial class atencion : System.Web.UI.Page
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
        public static object BuscarReservaWM(string nocliente)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                EReserva eAtencion = new EReserva();
                eAtencion.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
                eAtencion.NOM_CLIENTE = nocliente;
                objRespuesta.Resultado = NReserva.ListarReservas(eAtencion).Where(x => x.ESTADO == 1).ToList();
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }


        [WebMethod()]
        public static object BuscarAtencionWM(string fechaInicio, string fechaFin, int idTipo, string nocliente)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                EReserva eAtencion = new EReserva();
                eAtencion.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
                eAtencion.FEC_INI = Convert.ToDateTime(fechaInicio);
                eAtencion.FEC_FIN = Convert.ToDateTime(fechaFin);
                eAtencion.ID_TIPO_HABITACION = idTipo;
                eAtencion.NOM_CLIENTE = nocliente;
                objRespuesta.Resultado = NReserva.ListarAtenciones(eAtencion);
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object GuardarAtencionWM(EReserva eAtencion)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                eAtencion.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
                eAtencion.USU_REG = eSession.ID_USUARIO;
                if (eAtencion.ID_ATENCION == 0) eAtencion.OPCION = 3;
                else eAtencion.OPCION = 4;

                NReserva.ActualizarAtencion(eAtencion);

                objRespuesta.Success("Se guardo satisfactoriamente la atención");
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object TerminarAtencionWM(int idAtencion)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                EReserva eAtencion = new EReserva();
                eAtencion.ID_ATENCION = idAtencion;
                eAtencion.OPCION = 6;
                eAtencion.USU_REG = eSession.ID_USUARIO;
                NReserva.ActualizarAtencion(eAtencion);

                objRespuesta.Success("Se termino satisfactoriamente la atención");
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object AnularAtencionWM(int idAtencion)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                EReserva eAtencion = new EReserva();
                eAtencion.ID_ATENCION = idAtencion;
                eAtencion.OPCION = 5;
                eAtencion.USU_REG = eSession.ID_USUARIO;
                NReserva.ActualizarAtencion(eAtencion);

                objRespuesta.Success("Se anulo satisfactoriamente la atención");
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object ObtenerAtencionWM(int idAtencion)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                EReserva eAtencion = new EReserva();
                eAtencion.ID_ATENCION = idAtencion;
                eAtencion.OPCION = 2;
                eAtencion = NReserva.ObtenerAtencion(eAtencion);

                if (eAtencion.ID_ATENCION > 0)
                {
                    objRespuesta.Resultado = eAtencion;
                }
                else
                {
                    objRespuesta.Error("No se encontro datos de la atención");
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