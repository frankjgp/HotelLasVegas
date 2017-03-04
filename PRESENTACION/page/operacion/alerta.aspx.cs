using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using ENTIDAD;
using NEGOCIOS;


namespace PRESENTACION.page.operacion
{
	public partial class alerta : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
            if (Session["UserData"] == null) Response.Redirect("~/login.aspx");
		}
        [WebMethod()]
        public static object ListaReservasVencerWM()
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                List<EMovimiento> objResultado = new List<EMovimiento>();
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objResultado = NMovimiento.ListarAlertaReserva(eSession.LOCAL.ID_LOCAL);
                if (objResultado.Count == 0)
                {
                    objRespuesta.Error("No se encontraron reservas.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }

        [WebMethod()]
        public static object ListaHabitacionesSalirWM()
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                List<EMovimiento> objResultado = new List<EMovimiento>();
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objResultado = NMovimiento.ListarAlertaHabitacion(eSession.LOCAL.ID_LOCAL);
                if (objResultado.Count == 0)
                {
                    objRespuesta.Error("No se encontraron habitaciones.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
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