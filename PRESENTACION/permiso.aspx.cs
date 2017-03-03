using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;

namespace PRESENTACION
{
    public partial class permiso : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["UserData"] == null) Response.Redirect("~/login.aspx");
        }

        [WebMethod()]
        public static object ListarPermisosWM()
        {
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    return new { error = "Su sesión ha expirado, por favor vuelva a iniciar sesión" };
                }
                //BETrabajador beSession = (BETrabajador)HttpContext.Current.Session["UserData"];

                //BDTrabajador bdTrabajador = new BDTrabajador();
                //List<BEEmpresa> listaEmpresa = bdTrabajador.Obtener_UsuarioEmpresa(beSession.beUsuario);
                //List<BEAlmacen> listaAlmacen = bdTrabajador.Obtener_UsuarioAlmacen(beSession.beUsuario);
                //List<BELocal> listaLocal = bdTrabajador.Obtener_UsuarioLocal(beSession.beUsuario);

                return new { listaLocal = new List<string>() };
            }
            catch (Exception ex)
            {
                return new { error = string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message };
            }
        }

        [WebMethod()]
        public static object AceptarWM(int idLocal, string local)
        {
            object data = null;
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    return new { error = "Su sesión ha expirado, por favor vuelva a iniciar sesión" };
                }
                //BETrabajador beSession = (BETrabajador)HttpContext.Current.Session["UserData"];

                //beSession.nid_empresa = idEmpresa;
                //beSession.no_empresa = empresa;
                //beSession.nid_almacen = idAlmacen;
                //beSession.no_almacen = almacen;
                //beSession.nid_local = idLocal;
                //beSession.no_local = local;

                //HttpContext.Current.Session["UserData"] = beSession;

                data = new { redirect = "go.aspx" };
            }
            catch (Exception ex)
            {
                data = new { error = string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message };
            }
            return data;
        }
    }
}