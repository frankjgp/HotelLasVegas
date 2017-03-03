using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using ENTIDAD;
using NEGOCIOS;

namespace PRESENTACION
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["UserData"] == null) Response.Redirect("~/login.aspx");
        }

        [WebMethod()]
        public static object CerrarSesionWM()
        {
            HttpContext.Current.Session.Clear();

            ERespuestaJson objRespuesta = new ERespuestaJson();
            objRespuesta.Resultado = "login.aspx";
            return objRespuesta;
        }

        [WebMethod()]
        public static object InfoSesionWM()
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();

            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];


                List<EMenu> listaMenu = NUsuario.PerfilUsuario(eSession.ID_USUARIO).OrderBy(x => x.ID_PADRE).ToList();

                objRespuesta.Resultado = new
                {
                    Usuario = eSession.DSC_USUARIO,
                    LocalDesc = eSession.LOCAL.DESCRIPCION,
                    ListaMenu = listaMenu,
                    Perfil = eSession.EMPLEADO.CARGO
                };
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }


        [WebMethod()]
        public static object InfoNotificacionAlmacen()
        {
            try
            {
                //if (HttpContext.Current.Session["UserData"] == null)
                //{
                //    return new { error = "Su sesión ha expirado, por favor vuelva a iniciar sesión" };
                //}
                //BETrabajador beSession = (BETrabajador)HttpContext.Current.Session["UserData"];

                //BENotificacion beNotificacion = new BENotificacion();
                //beNotificacion.fe_creacion = DateTime.Now;
                //beNotificacion.nid_perfil_receptor = beSession.beUsuario.nid_perfil;
                //beNotificacion.fl_estado = BENotificacion.Estado.Pendiente;
                //beNotificacion.accion = BENotificacion.Accion.Listar;
                //List<BENotificacion> lista = new BDUtilidad().ObtenerNotificacion(beNotificacion);

                return new List<string>();
            }
            catch (Exception ex)
            {
                return new { error = string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message };
            }
        }

        [WebMethod()]
        public static object InfoNotificacionVenta()
        {
            try
            {
                //if (HttpContext.Current.Session["UserData"] == null)
                //{
                //    return new { error = "Su sesión ha expirado, por favor vuelva a iniciar sesión" };
                //}
                //BETrabajador beSession = (BETrabajador)HttpContext.Current.Session["UserData"];

                //BENotificacion beNotificacion = new BENotificacion();
                //beNotificacion.fe_creacion = DateTime.Now;
                //beNotificacion.co_trabajador_emisor = beSession.co_trabajador;
                //beNotificacion.fl_estado = BENotificacion.Estado.Pendiente;
                //beNotificacion.accion = BENotificacion.Accion.Listar;
                //List<BENotificacion> lista = new BDUtilidad().ObtenerNotificacion(beNotificacion);

                return new List<string>();
            }
            catch (Exception ex)
            {
                return new { error = string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message };
            }
        }

        [WebMethod()]
        public static object RegistrarNotificacion(string comprobante, int idDoc)
        {
            try
            {
                //if (HttpContext.Current.Session["UserData"] == null)
                //{
                //    return new { error = "Su sesión ha expirado, por favor vuelva a iniciar sesión" };
                //}
                //BETrabajador beSession = (BETrabajador)HttpContext.Current.Session["UserData"];

                //BENotificacion beNotificacion = new BENotificacion();
                //beNotificacion.co_comprobante_pago = comprobante;
                //beNotificacion.nid_documento = idDoc;
                //beNotificacion.co_trabajador_emisor = beSession.co_trabajador;
                //beNotificacion.nid_perfil_receptor = BEUtil.PerfilUsuario.Almacen;
                //beNotificacion.accion = BENotificacion.Accion.Guardar;

                //new BDUtilidad().RegistroNotificacion(beNotificacion);

                return new { success = "Se envio satisfactoriamente la notificación" };
            }
            catch (Exception ex)
            {
                return new { error = string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message };
            }
        }

        [WebMethod()]
        public static object ActualizarNotificacion(string comprobante, int idDoc, int estado)
        {
            try
            {
                //if (HttpContext.Current.Session["UserData"] == null)
                //{
                //    return new { error = "Su sesión ha expirado, por favor vuelva a iniciar sesión" };
                //}
                //BETrabajador beSession = (BETrabajador)HttpContext.Current.Session["UserData"];

                //BENotificacion beNotificacion = new BENotificacion();
                //beNotificacion.co_comprobante_pago = comprobante;
                //beNotificacion.nid_documento = idDoc;
                //beNotificacion.co_trabajador_receptor = beSession.co_trabajador;
                //beNotificacion.fl_estado = estado;
                //beNotificacion.accion = BENotificacion.Accion.Editar;

                //new BDUtilidad().RegistroNotificacion(beNotificacion);

                return new { success = "Se actualizo satisfactoriamente la notificación" };
            }
            catch (Exception ex)
            {
                return new { error = string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message };
            }
        }
    }
}