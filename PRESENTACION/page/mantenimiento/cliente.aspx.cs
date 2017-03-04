using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using ENTIDAD;
using NEGOCIOS;

namespace PRESENTACION.page.mantenimiento
{
	public partial class cliente : System.Web.UI.Page
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
                List<ECliente> objResultado = new List<ECliente>();
                objResultado = NCliente.ListarTiposDocumento();
                if (objResultado.Count == 0)
                {
                    objRespuesta.Error("No se encontraron tipos de documento.");
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
        public static object ListaClientesWM(string nombre, string apellido, string documento)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                List<ECliente> objResultado = new List<ECliente>();
                ECliente objE = new ECliente();
                objE.NOMBRES = nombre;
                objE.APELLIDOS = apellido;
                objE.NUM_DOCUMENTO = documento;

                objResultado = NCliente.ListarClientes(objE);
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
        public static object ObtenerClienteWM(string idCliente)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                List<ECliente> objResultado = new List<ECliente>();
                ECliente objE = new ECliente();
                objE.ID_CLIENTE = Convert.ToInt32(idCliente);

                objResultado = NCliente.ListarClientes(objE);
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
        public static object ActualizarClientesWM(ECliente eCliente)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                int objResultado = 0;
                if (eCliente.ID_CLIENTE == 0) eCliente.OPCION = 2;
                else eCliente.OPCION = 3;
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                eCliente.USU_MOD = eSession.ID_USUARIO;
                objResultado = NCliente.ActualizarClientes(eCliente);
                if (objResultado == 0)
                {
                    objRespuesta.Error("No se realizaron cambios.");
                }
                else
                {
                    objRespuesta.Success("Se guardo satisfactoriamente el cliente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object AnularClienteWM(string idCliente)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                int respuestaFinal = 0;
                ECliente objE = new ECliente();
                objE.ID_CLIENTE = Convert.ToInt32(idCliente);
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objE.USU_MOD = eSession.ID_USUARIO;
                objE.OPCION = 4;
                respuestaFinal = NCliente.ActualizarClientes(objE);
                if (respuestaFinal == 0)
                {
                    objRespuesta.Error("No se realizaron cambios.");
                }
                else
                {
                    objRespuesta.Success("Se eliminó satisfactoriamente el cliente");
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