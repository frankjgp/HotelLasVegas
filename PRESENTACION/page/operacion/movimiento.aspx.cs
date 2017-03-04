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
	public partial class movimiento : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
            if (Session["UserData"] == null) Response.Redirect("~/login.aspx");
		}
        [WebMethod()]
        public static object ListaInicialWM()
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                List<EMovimiento> objResultado = new List<EMovimiento>();
                objResultado = NMovimiento.ListarTiposMovimiento();
                if (objResultado.Count == 0)
                {
                    objRespuesta.Error("No se encontraron tipos de movimientos.");
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
        public static object ListaMovimientosWM(string tipo, string fechaini, string fechafin)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                List<EMovimiento> objResultado = new List<EMovimiento>();
                EMovimiento objE = new EMovimiento();
                objE.ID_TIPO_MOVIMIENTO = Convert.ToInt32(tipo);
                objE.FECHA_INI = Convert.ToDateTime(fechaini.Trim() == "" ? DateTime.MinValue.ToShortDateString() : fechaini.Trim());
                objE.FECHA_FIN = Convert.ToDateTime(fechafin.Trim() == "" ? DateTime.MaxValue.ToShortDateString() : fechafin.Trim());
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objE.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
                objE.OPCION = 1;
                objResultado = NMovimiento.ListarMovimientos(objE);
                if (objResultado.Count == 0)
                {
                    objRespuesta.Error("No se encontraron registros.");
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
        public static object ObtenerMovimientoWM(string idMovimiento)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                List<EMovimiento> objResultado = new List<EMovimiento>();
                EMovimiento objE = new EMovimiento();
                objE.ID_MOVIMIENTO = Convert.ToInt32(idMovimiento);
                objE.OPCION = 5;
                objResultado = NMovimiento.ListarMovimientos(objE);
                if (objResultado.Count == 0)
                {
                    objRespuesta.Error("No se encontraron registros.");
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
        public static object ActualizarMovimientosWM(EMovimiento eMovimiento)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                int objResultado = 0;
                if (eMovimiento.ID_MOVIMIENTO == 0) eMovimiento.OPCION = 2;
                else eMovimiento.OPCION = 3;
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                eMovimiento.USU_MOD = eSession.ID_USUARIO;
                eMovimiento.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
                objResultado = NMovimiento.ActualizarMovimientos(eMovimiento);
                if (objResultado == 0)
                {
                    objRespuesta.Error("No se realizaron cambios.");
                }
                else
                {
                    objRespuesta.Success("Se guardo satisfactoriamente el movimiento");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }

        [WebMethod()]
        public static object AnularMovimientoWM(string idMovimiento)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                int respuestaFinal = 0;
                EMovimiento objE = new EMovimiento();
                objE.ID_MOVIMIENTO = Convert.ToInt32(idMovimiento);
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objE.USU_MOD = eSession.ID_USUARIO;
                objE.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
                objE.OPCION = 4;
                respuestaFinal = NMovimiento.ActualizarMovimientos(objE);
                if (respuestaFinal == 0)
                {
                    objRespuesta.Error("No se realizaron cambios.");
                }
                else
                {
                    objRespuesta.Success("Se eliminó satisfactoriamente el movimiento");
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