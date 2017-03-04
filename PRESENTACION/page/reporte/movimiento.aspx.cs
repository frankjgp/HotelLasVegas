using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using ENTIDAD;
using NEGOCIOS;


namespace PRESENTACION.page.reporte
{
	public partial class movimiento : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
            if (Session["UserData"] == null) Response.Redirect("~/login.aspx");
		}
        [WebMethod()]
        public static object ListaInicialWM(string fechaini, string fechafin)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                List<EMovimiento> objResultado = new List<EMovimiento>();
                EMovimiento objE = new EMovimiento();
                objE.FECHA_INI = Convert.ToDateTime(fechaini.Trim() == "" ? DateTime.MinValue.ToShortDateString() : fechaini.Trim());
                objE.FECHA_FIN = Convert.ToDateTime(fechafin.Trim() == "" ? DateTime.MaxValue.ToShortDateString() : fechafin.Trim());
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objE.ID_LOCAL = eSession.LOCAL.ID_LOCAL;

                objResultado = NMovimiento.ListarMovimientosReporte(objE);
                if (objResultado.Count == 0)
                {
                    objRespuesta.Error("No se encontraron movimientos.");
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