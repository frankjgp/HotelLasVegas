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
    public partial class login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod()]
        public static object AccederWM(string usuario, string clave)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                /*Valida usuario*/
                EUsuario eUsuario = new EUsuario();
                eUsuario.DSC_USUARIO = usuario.Trim();
                eUsuario.PASSWORD = clave.Trim();
                eUsuario = NUsuario.Login(eUsuario);

                if (eUsuario == null)
                    objRespuesta.Error("El usuario no existe o Contraseña incorrecta");
                //else if (beTrabajador.beUsuario.fl_activo == BEUtil.UsuarioEstado.Bloqueado) data = new { estado = "error", descripcion = "El Perfil de Usuario se encuentra bloqueado" };
                //else if (beTrabajador.fl_activo == BEUtil.Estado.Anulado) data = new { estado = "error", descripcion = "El Trabajador se encuentra bloqueado" };
                else
                {
                    HttpContext.Current.Session["UserData"] = eUsuario;
                    objRespuesta.Success("permiso.aspx");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
    }
}