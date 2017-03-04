using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using ENTIDAD;

namespace DATOS
{
    public static class DReserva
    {
        #region RESERVA
        public static List<EReserva> ListarReservas(EReserva objE)
        {
            List<EReserva> lista = new List<EReserva>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_MANTENIMIENTO_RESERVA", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_RESERVA", SqlDbType.Int).Value = objE.ID_RESERVA;
                cmd.Parameters.Add("@ID_CLIENTE", SqlDbType.Int).Value = objE.ID_CLIENTE;
                cmd.Parameters.Add("@ID_HABITACION", SqlDbType.Int).Value = objE.ID_HABITACION;
                cmd.Parameters.Add("@FEC_INI", SqlDbType.DateTime).Value = EUtil.getFechaValida(objE.FEC_INI);
                cmd.Parameters.Add("@FEC_FIN", SqlDbType.DateTime).Value = EUtil.getFechaValida(objE.FEC_FIN);
                cmd.Parameters.Add("@ID_TIPO_RESERVA", SqlDbType.Int).Value = objE.ID_TIPO_RESERVA;
                cmd.Parameters.Add("@ADELANTO", SqlDbType.Decimal).Value = objE.ADELANTO;
                cmd.Parameters.Add("@PRECIO_HAB", SqlDbType.Decimal).Value = objE.PRECIO_HAB;
                cmd.Parameters.Add("@TOTAL_HAB", SqlDbType.Decimal).Value = objE.TOTAL_HAB;
                cmd.Parameters.Add("@ID_MEDIO_PAGO", SqlDbType.Int).Value = objE.ID_MEDIO_PAGO;
                cmd.Parameters.Add("@OBSERVACION", SqlDbType.VarChar).Value = objE.OBSERVACION;
                cmd.Parameters.Add("@USU_REG", SqlDbType.Int).Value = objE.USU_REG;
                cmd.Parameters.Add("@ID_LOCAL", SqlDbType.Int).Value = objE.ID_LOCAL;

                cmd.Parameters.Add("@NOM_CLIENTE", SqlDbType.VarChar).Value = objE.NOM_CLIENTE;
                cmd.Parameters.Add("@ID_TIPO_HABITACION", SqlDbType.Int).Value = objE.ID_TIPO_HABITACION;

                cmd.Parameters.Add("@OPCION", SqlDbType.Int).Value = 1;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EReserva mItem = new EReserva();
                        mItem.ID_RESERVA = dr.IsDBNull(dr.GetOrdinal("ID_RESERVA")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_RESERVA"));
                        mItem.ID_HABITACION = dr.IsDBNull(dr.GetOrdinal("ID_HABITACION")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_HABITACION"));
                        mItem.NUM_HABITACION = dr.IsDBNull(dr.GetOrdinal("NUMERO")) ? string.Empty : dr.GetString(dr.GetOrdinal("NUMERO"));
                        mItem.TIPO_HABITACION = dr.IsDBNull(dr.GetOrdinal("TIPO_HABITACION")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO_HABITACION"));
                        mItem.ID_CLIENTE = dr.IsDBNull(dr.GetOrdinal("ID_CLIENTE")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_CLIENTE"));
                        mItem.NUM_CLIENTE = dr.IsDBNull(dr.GetOrdinal("NUM_DOCUMENTO")) ? string.Empty : dr.GetString(dr.GetOrdinal("NUM_DOCUMENTO"));
                        mItem.NOM_CLIENTE = dr.IsDBNull(dr.GetOrdinal("NOMBRES")) ? string.Empty : dr.GetString(dr.GetOrdinal("NOMBRES"));
                        mItem.FEC_INI = dr.IsDBNull(dr.GetOrdinal("FEC_INI")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FEC_INI"));
                        mItem.FEC_FIN = dr.IsDBNull(dr.GetOrdinal("FEC_FIN")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FEC_FIN"));
                        mItem.TIPO_RESERVA = dr.IsDBNull(dr.GetOrdinal("TIPO_RESERVA")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO_RESERVA"));
                        mItem.PRECIO_HAB = dr.IsDBNull(dr.GetOrdinal("PRECIO_HAB")) ? 0 : dr.GetDecimal(dr.GetOrdinal("PRECIO_HAB"));
                        mItem.ADELANTO = dr.IsDBNull(dr.GetOrdinal("ADELANTO")) ? 0 : dr.GetDecimal(dr.GetOrdinal("ADELANTO"));
                        mItem.ESTADO = dr.IsDBNull(dr.GetOrdinal("ESTADO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ESTADO"));
                        mItem.DSC_ESTADO = (mItem.ESTADO == 1 ? "Pendiente" : "Atendido");

                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

        public static EReserva ObtenerReserva(EReserva objE)
        {
            EReserva eReserva = new EReserva();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_MANTENIMIENTO_RESERVA", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_RESERVA", SqlDbType.Int).Value = objE.ID_RESERVA;
                cmd.Parameters.Add("@ID_CLIENTE", SqlDbType.Int).Value = objE.ID_CLIENTE;
                cmd.Parameters.Add("@ID_HABITACION", SqlDbType.Int).Value = objE.ID_HABITACION;
                cmd.Parameters.Add("@FEC_INI", SqlDbType.DateTime).Value = EUtil.getFechaValida(objE.FEC_INI);
                cmd.Parameters.Add("@FEC_FIN", SqlDbType.DateTime).Value = EUtil.getFechaValida(objE.FEC_FIN);
                cmd.Parameters.Add("@ID_TIPO_RESERVA", SqlDbType.Int).Value = objE.ID_TIPO_RESERVA;
                cmd.Parameters.Add("@ADELANTO", SqlDbType.Decimal).Value = objE.ADELANTO;
                cmd.Parameters.Add("@PRECIO_HAB", SqlDbType.Decimal).Value = objE.PRECIO_HAB;
                cmd.Parameters.Add("@TOTAL_HAB", SqlDbType.Decimal).Value = objE.TOTAL_HAB;
                cmd.Parameters.Add("@ID_MEDIO_PAGO", SqlDbType.Int).Value = objE.ID_MEDIO_PAGO;
                cmd.Parameters.Add("@OBSERVACION", SqlDbType.VarChar).Value = objE.OBSERVACION;
                cmd.Parameters.Add("@USU_REG", SqlDbType.Int).Value = objE.USU_REG;
                cmd.Parameters.Add("@ID_LOCAL", SqlDbType.Int).Value = objE.ID_LOCAL;

                cmd.Parameters.Add("@NOM_CLIENTE", SqlDbType.VarChar).Value = objE.NOM_CLIENTE;
                cmd.Parameters.Add("@ID_TIPO_HABITACION", SqlDbType.Int).Value = objE.ID_TIPO_HABITACION;

                cmd.Parameters.Add("@OPCION", SqlDbType.Int).Value = 2;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        eReserva.ID_RESERVA = dr.IsDBNull(dr.GetOrdinal("ID_RESERVA")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_RESERVA"));
                        eReserva.ID_HABITACION = dr.IsDBNull(dr.GetOrdinal("ID_HABITACION")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_HABITACION"));
                        eReserva.NUM_HABITACION = dr.IsDBNull(dr.GetOrdinal("NUMERO")) ? string.Empty : dr.GetString(dr.GetOrdinal("NUMERO"));
                        eReserva.TIPO_HABITACION = dr.IsDBNull(dr.GetOrdinal("TIPO_HABITACION")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO_HABITACION"));
                        eReserva.ID_CLIENTE = dr.IsDBNull(dr.GetOrdinal("ID_CLIENTE")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_CLIENTE"));
                        eReserva.NUM_CLIENTE = dr.IsDBNull(dr.GetOrdinal("NUM_DOCUMENTO")) ? string.Empty : dr.GetString(dr.GetOrdinal("NUM_DOCUMENTO"));
                        eReserva.NOM_CLIENTE = dr.IsDBNull(dr.GetOrdinal("NOMBRES")) ? string.Empty : dr.GetString(dr.GetOrdinal("NOMBRES"));
                        eReserva.FEC_INI = dr.IsDBNull(dr.GetOrdinal("FEC_INI")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FEC_INI"));
                        eReserva.FEC_FIN = dr.IsDBNull(dr.GetOrdinal("FEC_FIN")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FEC_FIN"));
                        eReserva.ID_TIPO_RESERVA = dr.IsDBNull(dr.GetOrdinal("ID_TIPO_RESERVA")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_TIPO_RESERVA"));
                        eReserva.TIPO_RESERVA = dr.IsDBNull(dr.GetOrdinal("TIPO_RESERVA")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO_RESERVA"));
                        eReserva.PRECIO_HAB = dr.IsDBNull(dr.GetOrdinal("PRECIO_HAB")) ? 0 : dr.GetDecimal(dr.GetOrdinal("PRECIO_HAB"));
                        eReserva.ADELANTO = dr.IsDBNull(dr.GetOrdinal("ADELANTO")) ? 0 : dr.GetDecimal(dr.GetOrdinal("ADELANTO"));
                        eReserva.TOTAL_HAB = dr.IsDBNull(dr.GetOrdinal("TOTAL_HAB")) ? 0 : dr.GetDecimal(dr.GetOrdinal("TOTAL_HAB"));
                        eReserva.ID_MEDIO_PAGO = dr.IsDBNull(dr.GetOrdinal("ID_MEDIO_PAGO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_MEDIO_PAGO"));
                        eReserva.OBSERVACION = dr.IsDBNull(dr.GetOrdinal("OBSERVACION")) ? string.Empty : dr.GetString(dr.GetOrdinal("OBSERVACION"));
                        eReserva.ESTADO = dr.IsDBNull(dr.GetOrdinal("ESTADO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ESTADO"));
                        eReserva.DSC_ESTADO = (eReserva.ESTADO == 1 ? "Pendiente" : "Atendido");
                    }
                }
            }
            return eReserva;
        }

        public static int ActualizarReserva(EReserva objE)
        {
            int respFinal = 0;

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_MANTENIMIENTO_RESERVA", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_RESERVA", SqlDbType.Int).Value = objE.ID_RESERVA;
                cmd.Parameters.Add("@ID_CLIENTE", SqlDbType.Int).Value = objE.ID_CLIENTE;
                cmd.Parameters.Add("@ID_HABITACION", SqlDbType.Int).Value = objE.ID_HABITACION;
                cmd.Parameters.Add("@FEC_INI", SqlDbType.DateTime).Value = EUtil.getFechaValida(objE.FEC_INI);
                cmd.Parameters.Add("@FEC_FIN", SqlDbType.DateTime).Value = EUtil.getFechaValida(objE.FEC_FIN);
                cmd.Parameters.Add("@ID_TIPO_RESERVA", SqlDbType.Int).Value = objE.ID_TIPO_RESERVA;
                cmd.Parameters.Add("@ADELANTO", SqlDbType.Decimal).Value = objE.ADELANTO;
                cmd.Parameters.Add("@PRECIO_HAB", SqlDbType.Decimal).Value = objE.PRECIO_HAB;
                cmd.Parameters.Add("@TOTAL_HAB", SqlDbType.Decimal).Value = objE.TOTAL_HAB;
                cmd.Parameters.Add("@ID_MEDIO_PAGO", SqlDbType.Int).Value = objE.ID_MEDIO_PAGO;
                cmd.Parameters.Add("@OBSERVACION", SqlDbType.VarChar).Value = objE.OBSERVACION;
                cmd.Parameters.Add("@USU_REG", SqlDbType.Int).Value = objE.USU_REG;
                cmd.Parameters.Add("@ID_LOCAL", SqlDbType.Int).Value = objE.ID_LOCAL;

                cmd.Parameters.Add("@NOM_CLIENTE", SqlDbType.VarChar).Value = objE.NOM_CLIENTE;
                cmd.Parameters.Add("@ID_TIPO_HABITACION", SqlDbType.Int).Value = objE.ID_TIPO_HABITACION;

                cmd.Parameters.Add("@OPCION", SqlDbType.Int).Value = objE.OPCION;

                cn.Open();
                respFinal = cmd.ExecuteNonQuery();
            }
            return respFinal;
        }
        #endregion 

        #region ATENCION
        public static List<EReserva> ListarAtenciones(EReserva objE)
        {
            List<EReserva> lista = new List<EReserva>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_MANTENIMIENTO_ATENCION", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_ATENCION", SqlDbType.Int).Value = objE.ID_ATENCION;
                cmd.Parameters.Add("@ID_RESERVA", SqlDbType.Int).Value = objE.ID_RESERVA;
                cmd.Parameters.Add("@ID_CLIENTE", SqlDbType.Int).Value = objE.ID_CLIENTE;
                cmd.Parameters.Add("@ID_HABITACION", SqlDbType.Int).Value = objE.ID_HABITACION;
                cmd.Parameters.Add("@FEC_INI", SqlDbType.DateTime).Value = EUtil.getFechaValida(objE.FEC_INI);
                cmd.Parameters.Add("@FEC_FIN", SqlDbType.DateTime).Value = EUtil.getFechaValida(objE.FEC_FIN);
                cmd.Parameters.Add("@ID_TIPO_RESERVA", SqlDbType.Int).Value = objE.ID_TIPO_RESERVA;
                cmd.Parameters.Add("@ADELANTO", SqlDbType.Decimal).Value = objE.ADELANTO;
                cmd.Parameters.Add("@PRECIO_HAB", SqlDbType.Decimal).Value = objE.PRECIO_HAB;
                cmd.Parameters.Add("@TOTAL_HAB", SqlDbType.Decimal).Value = objE.TOTAL_HAB;
                cmd.Parameters.Add("@ID_MEDIO_PAGO", SqlDbType.Int).Value = objE.ID_MEDIO_PAGO;
                cmd.Parameters.Add("@OBSERVACION", SqlDbType.VarChar).Value = objE.OBSERVACION;
                cmd.Parameters.Add("@USU_REG", SqlDbType.Int).Value = objE.USU_REG;
                cmd.Parameters.Add("@ID_LOCAL", SqlDbType.Int).Value = objE.ID_LOCAL;

                cmd.Parameters.Add("@NOM_CLIENTE", SqlDbType.VarChar).Value = objE.NOM_CLIENTE;
                cmd.Parameters.Add("@ID_TIPO_HABITACION", SqlDbType.Int).Value = objE.ID_TIPO_HABITACION;

                cmd.Parameters.Add("@OPCION", SqlDbType.Int).Value = 1;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EReserva mItem = new EReserva();
                        mItem.ID_ATENCION = dr.IsDBNull(dr.GetOrdinal("ID_ATENCION")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_ATENCION"));
                        mItem.ID_RESERVA = dr.IsDBNull(dr.GetOrdinal("ID_RESERVA")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_RESERVA"));
                        mItem.ID_HABITACION = dr.IsDBNull(dr.GetOrdinal("ID_HABITACION")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_HABITACION"));
                        mItem.NUM_HABITACION = dr.IsDBNull(dr.GetOrdinal("NUMERO")) ? string.Empty : dr.GetString(dr.GetOrdinal("NUMERO"));
                        mItem.TIPO_HABITACION = dr.IsDBNull(dr.GetOrdinal("TIPO_HABITACION")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO_HABITACION"));
                        mItem.ID_CLIENTE = dr.IsDBNull(dr.GetOrdinal("ID_CLIENTE")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_CLIENTE"));
                        mItem.NUM_CLIENTE = dr.IsDBNull(dr.GetOrdinal("NUM_DOCUMENTO")) ? string.Empty : dr.GetString(dr.GetOrdinal("NUM_DOCUMENTO"));
                        mItem.NOM_CLIENTE = dr.IsDBNull(dr.GetOrdinal("NOMBRES")) ? string.Empty : dr.GetString(dr.GetOrdinal("NOMBRES"));
                        mItem.FEC_INI = dr.IsDBNull(dr.GetOrdinal("FEC_INI")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FEC_INI"));
                        mItem.FEC_FIN = dr.IsDBNull(dr.GetOrdinal("FEC_FIN")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FEC_FIN"));
                        mItem.TIPO_RESERVA = dr.IsDBNull(dr.GetOrdinal("TIPO_RESERVA")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO_RESERVA"));
                        mItem.PRECIO_HAB = dr.IsDBNull(dr.GetOrdinal("PRECIO_HAB")) ? 0 : dr.GetDecimal(dr.GetOrdinal("PRECIO_HAB"));
                        mItem.ADELANTO = dr.IsDBNull(dr.GetOrdinal("ADELANTO")) ? 0 : dr.GetDecimal(dr.GetOrdinal("ADELANTO"));
                        mItem.ESTADO = dr.IsDBNull(dr.GetOrdinal("ESTADO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ESTADO"));
                        mItem.DSC_ESTADO = (mItem.ESTADO == 1 ? "Activo" : "Terminado");

                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

        public static EReserva ObtenerAtencion(EReserva objE)
        {
            EReserva eReserva = new EReserva();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_MANTENIMIENTO_ATENCION", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_ATENCION", SqlDbType.Int).Value = objE.ID_ATENCION;
                cmd.Parameters.Add("@ID_RESERVA", SqlDbType.Int).Value = objE.ID_RESERVA;
                cmd.Parameters.Add("@ID_CLIENTE", SqlDbType.Int).Value = objE.ID_CLIENTE;
                cmd.Parameters.Add("@ID_HABITACION", SqlDbType.Int).Value = objE.ID_HABITACION;
                cmd.Parameters.Add("@FEC_INI", SqlDbType.DateTime).Value = EUtil.getFechaValida(objE.FEC_INI);
                cmd.Parameters.Add("@FEC_FIN", SqlDbType.DateTime).Value = EUtil.getFechaValida(objE.FEC_FIN);
                cmd.Parameters.Add("@ID_TIPO_RESERVA", SqlDbType.Int).Value = objE.ID_TIPO_RESERVA;
                cmd.Parameters.Add("@ADELANTO", SqlDbType.Decimal).Value = objE.ADELANTO;
                cmd.Parameters.Add("@PRECIO_HAB", SqlDbType.Decimal).Value = objE.PRECIO_HAB;
                cmd.Parameters.Add("@TOTAL_HAB", SqlDbType.Decimal).Value = objE.TOTAL_HAB;
                cmd.Parameters.Add("@ID_MEDIO_PAGO", SqlDbType.Int).Value = objE.ID_MEDIO_PAGO;
                cmd.Parameters.Add("@OBSERVACION", SqlDbType.VarChar).Value = objE.OBSERVACION;
                cmd.Parameters.Add("@USU_REG", SqlDbType.Int).Value = objE.USU_REG;
                cmd.Parameters.Add("@ID_LOCAL", SqlDbType.Int).Value = objE.ID_LOCAL;

                cmd.Parameters.Add("@NOM_CLIENTE", SqlDbType.VarChar).Value = objE.NOM_CLIENTE;
                cmd.Parameters.Add("@ID_TIPO_HABITACION", SqlDbType.Int).Value = objE.ID_TIPO_HABITACION;

                cmd.Parameters.Add("@OPCION", SqlDbType.Int).Value = 2;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        eReserva.ID_ATENCION = dr.IsDBNull(dr.GetOrdinal("ID_ATENCION")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_ATENCION"));
                        eReserva.ID_RESERVA = dr.IsDBNull(dr.GetOrdinal("ID_RESERVA")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_RESERVA"));
                        eReserva.ID_HABITACION = dr.IsDBNull(dr.GetOrdinal("ID_HABITACION")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_HABITACION"));
                        eReserva.NUM_HABITACION = dr.IsDBNull(dr.GetOrdinal("NUMERO")) ? string.Empty : dr.GetString(dr.GetOrdinal("NUMERO"));
                        eReserva.TIPO_HABITACION = dr.IsDBNull(dr.GetOrdinal("TIPO_HABITACION")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO_HABITACION"));
                        eReserva.ID_CLIENTE = dr.IsDBNull(dr.GetOrdinal("ID_CLIENTE")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_CLIENTE"));
                        eReserva.NUM_CLIENTE = dr.IsDBNull(dr.GetOrdinal("NUM_DOCUMENTO")) ? string.Empty : dr.GetString(dr.GetOrdinal("NUM_DOCUMENTO"));
                        eReserva.NOM_CLIENTE = dr.IsDBNull(dr.GetOrdinal("NOMBRES")) ? string.Empty : dr.GetString(dr.GetOrdinal("NOMBRES"));
                        eReserva.FEC_INI = dr.IsDBNull(dr.GetOrdinal("FEC_INI")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FEC_INI"));
                        eReserva.FEC_FIN = dr.IsDBNull(dr.GetOrdinal("FEC_FIN")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FEC_FIN"));
                        eReserva.ID_TIPO_RESERVA = dr.IsDBNull(dr.GetOrdinal("ID_TIPO_RESERVA")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_TIPO_RESERVA"));
                        eReserva.TIPO_RESERVA = dr.IsDBNull(dr.GetOrdinal("TIPO_RESERVA")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO_RESERVA"));
                        eReserva.PRECIO_HAB = dr.IsDBNull(dr.GetOrdinal("PRECIO_HAB")) ? 0 : dr.GetDecimal(dr.GetOrdinal("PRECIO_HAB"));
                        eReserva.ADELANTO = dr.IsDBNull(dr.GetOrdinal("ADELANTO")) ? 0 : dr.GetDecimal(dr.GetOrdinal("ADELANTO"));
                        eReserva.TOTAL_HAB = dr.IsDBNull(dr.GetOrdinal("TOTAL_HAB")) ? 0 : dr.GetDecimal(dr.GetOrdinal("TOTAL_HAB"));
                        eReserva.ID_MEDIO_PAGO = dr.IsDBNull(dr.GetOrdinal("ID_MEDIO_PAGO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_MEDIO_PAGO"));
                        eReserva.OBSERVACION = dr.IsDBNull(dr.GetOrdinal("OBSERVACION")) ? string.Empty : dr.GetString(dr.GetOrdinal("OBSERVACION"));
                        eReserva.ESTADO = dr.IsDBNull(dr.GetOrdinal("ESTADO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ESTADO"));
                        eReserva.DSC_ESTADO = (eReserva.ESTADO == 1 ? "Activo" : "Terminado");
                    }
                }
            }
            return eReserva;
        }

        public static int ActualizarAtencion(EReserva objE)
        {
            int respFinal = 0;

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_MANTENIMIENTO_ATENCION", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_ATENCION", SqlDbType.Int).Value = objE.ID_ATENCION;
                cmd.Parameters.Add("@ID_RESERVA", SqlDbType.Int).Value = objE.ID_RESERVA;
                cmd.Parameters.Add("@ID_CLIENTE", SqlDbType.Int).Value = objE.ID_CLIENTE;
                cmd.Parameters.Add("@ID_HABITACION", SqlDbType.Int).Value = objE.ID_HABITACION;
                cmd.Parameters.Add("@FEC_INI", SqlDbType.DateTime).Value = EUtil.getFechaValida(objE.FEC_INI);
                cmd.Parameters.Add("@FEC_FIN", SqlDbType.DateTime).Value = EUtil.getFechaValida(objE.FEC_FIN);
                cmd.Parameters.Add("@ID_TIPO_RESERVA", SqlDbType.Int).Value = objE.ID_TIPO_RESERVA;
                cmd.Parameters.Add("@ADELANTO", SqlDbType.Decimal).Value = objE.ADELANTO;
                cmd.Parameters.Add("@PRECIO_HAB", SqlDbType.Decimal).Value = objE.PRECIO_HAB;
                cmd.Parameters.Add("@TOTAL_HAB", SqlDbType.Decimal).Value = objE.TOTAL_HAB;
                cmd.Parameters.Add("@ID_MEDIO_PAGO", SqlDbType.Int).Value = objE.ID_MEDIO_PAGO;
                cmd.Parameters.Add("@OBSERVACION", SqlDbType.VarChar).Value = objE.OBSERVACION;
                cmd.Parameters.Add("@USU_REG", SqlDbType.Int).Value = objE.USU_REG;
                cmd.Parameters.Add("@ID_LOCAL", SqlDbType.Int).Value = objE.ID_LOCAL;

                cmd.Parameters.Add("@NOM_CLIENTE", SqlDbType.VarChar).Value = objE.NOM_CLIENTE;
                cmd.Parameters.Add("@ID_TIPO_HABITACION", SqlDbType.Int).Value = objE.ID_TIPO_HABITACION;

                cmd.Parameters.Add("@OPCION", SqlDbType.Int).Value = objE.OPCION;

                cn.Open();
                respFinal = cmd.ExecuteNonQuery();
            }
            return respFinal;
        }
        #endregion

        public static List<ETipoReserva> ListarTipoReserva()
        {
            List<ETipoReserva> lista = new List<ETipoReserva>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_LISTAR_TIPO_RESERVA", cn);
                cmd.CommandType = CommandType.StoredProcedure;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        ETipoReserva mItem = new ETipoReserva();
                        mItem.ID_TIPO_RESERVA = dr.IsDBNull(dr.GetOrdinal("ID_TIPO_RESERVA")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_TIPO_RESERVA"));
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));

                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

        public static List<EMedioPago> ListarMedioPago()
        {
            List<EMedioPago> lista = new List<EMedioPago>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_LISTAR_MEDIO_PAGO", cn);
                cmd.CommandType = CommandType.StoredProcedure;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EMedioPago mItem = new EMedioPago();
                        mItem.ID_MEDIO_PAGO = dr.IsDBNull(dr.GetOrdinal("ID_MEDIO_PAGO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_MEDIO_PAGO"));
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));

                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
    }
}
