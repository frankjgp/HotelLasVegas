using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using ENTIDAD;
using NEGOCIOS;

namespace PRESENTACION
{
    public partial class cambiarclave : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod()]
        public static object CambiarWM(string clave)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["UserData"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];

                eSession.PASSWORD = clave;
                NUsuario.CambiarClave(eSession);

                objRespuesta.Resultado = "permiso.aspx";
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
    }
}