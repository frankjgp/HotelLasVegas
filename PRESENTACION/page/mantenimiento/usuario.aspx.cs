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
    public partial class usuario : System.Web.UI.Page
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

                List<EPerfil> listaPerfil = NUsuario.ListarPerfiles();

                objRespuesta.Resultado = new
                {
                    listaPerfil = listaPerfil
                };
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object BuscarEmpleadoWM(string nombre, string apellidos)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                EEmpleado eEmpleado = new EEmpleado();
                eEmpleado.NOMBRES = nombre;
                eEmpleado.APELLIDOS = apellidos;
                objRespuesta.Resultado = NUsuario.ListarUsuarios(eEmpleado);
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object GuardarEmpleadoWM(EEmpleado eEmpleado)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                if (eEmpleado.ID_EMPLEADO == 0) eEmpleado.OPCION = 2;
                else eEmpleado.OPCION = 3;

                NUsuario.ActualizarUsuarios(eEmpleado);

                objRespuesta.Success("Se guardo satisfactoriamente el empleado");
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object AnularEmpleadoWM(int idEmpleado)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                EEmpleado eEmpleado = new EEmpleado();
                eEmpleado.ID_EMPLEADO = idEmpleado;
                eEmpleado.OPCION = 4;
                NUsuario.ActualizarUsuarios(eEmpleado);

                objRespuesta.Success("Se anulo satisfactoriamente el empleado");
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object ObtenerEmpleadoWM(int idEmpleado)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                EEmpleado eEmpleado = new EEmpleado();
                eEmpleado.ID_EMPLEADO = idEmpleado;
                eEmpleado.OPCION = 1;
                List<EEmpleado> lista = NUsuario.ListarUsuarios(eEmpleado);

                if (lista.Count > 0)
                {
                    objRespuesta.Resultado = lista[0];
                }
                else
                {
                    objRespuesta.Error("No se encontro datos del empleado");
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