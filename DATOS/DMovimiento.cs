using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using System.Data;
using System.Data.SqlClient;

namespace DATOS
{
    public static class DMovimiento
    {
        public static List<EMovimiento> ListarMovimientos(EMovimiento objE)
        {
            List<EMovimiento> lista = new List<EMovimiento>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_MANTENIMIENTO_MOVIMIENTO", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_MOVIMIENTO", SqlDbType.Int).Value = objE.ID_MOVIMIENTO;
                cmd.Parameters.Add("@ID_TIPO_MOVIMIENTO", SqlDbType.Int).Value = objE.ID_TIPO_MOVIMIENTO;
                cmd.Parameters.Add("@FECHA_INI", SqlDbType.Date).Value = objE.FECHA_INI;
                cmd.Parameters.Add("@FECHA_FIN", SqlDbType.Date).Value = objE.FECHA_FIN;
                cmd.Parameters.Add("@MONTO", SqlDbType.Decimal).Value = objE.MONTO;
                cmd.Parameters.Add("@OBSERVACION", SqlDbType.VarChar).Value = objE.OBSERVACION;
                cmd.Parameters.Add("@ID_LOCAL", SqlDbType.Int).Value = objE.ID_LOCAL;
                cmd.Parameters.Add("@USU_MOD", SqlDbType.Int).Value = objE.USU_MOD;
                cmd.Parameters.Add("@OPCION", SqlDbType.Int).Value = objE.OPCION;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EMovimiento mItem = new EMovimiento();
                        mItem.ID_MOVIMIENTO = dr.IsDBNull(dr.GetOrdinal("ID_MOVIMIENTO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_MOVIMIENTO"));
                        mItem.FECHA_INI = dr.IsDBNull(dr.GetOrdinal("FECHA")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FECHA"));
                        mItem.MONTO = dr.IsDBNull(dr.GetOrdinal("MONTO")) ? 0 : dr.GetDecimal(dr.GetOrdinal("MONTO"));
                        mItem.ID_TIPO_MOVIMIENTO = dr.IsDBNull(dr.GetOrdinal("ID_TIPO_MOVIMIENTO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_TIPO_MOVIMIENTO"));
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));
                        mItem.OBSERVACION = dr.IsDBNull(dr.GetOrdinal("OBSERVACION")) ? string.Empty : dr.GetString(dr.GetOrdinal("OBSERVACION"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

        public static List<EMovimiento> ListarTiposMovimiento()
        {
            List<EMovimiento> lista = new List<EMovimiento>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_LISTAR_TIPO_MOVIMIENTO", cn);
                cmd.CommandType = CommandType.StoredProcedure;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EMovimiento mItem = new EMovimiento();
                        mItem.ID_TIPO_MOVIMIENTO = dr.IsDBNull(dr.GetOrdinal("ID_TIPO_MOVIMIENTO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_TIPO_MOVIMIENTO"));
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
        public static int ActualizarMovimientos(EMovimiento objE)
        {
            int respFinal = 0;

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_MANTENIMIENTO_MOVIMIENTO", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_MOVIMIENTO", SqlDbType.Int).Value = objE.ID_MOVIMIENTO;
                cmd.Parameters.Add("@ID_TIPO_MOVIMIENTO", SqlDbType.Int).Value = objE.ID_TIPO_MOVIMIENTO;
                cmd.Parameters.Add("@FECHA_INI", SqlDbType.Date).Value = objE.FECHA_INI;
                cmd.Parameters.Add("@FECHA_FIN", SqlDbType.Date).Value = objE.FECHA_FIN;
                cmd.Parameters.Add("@MONTO", SqlDbType.Decimal).Value = objE.MONTO;
                cmd.Parameters.Add("@OBSERVACION", SqlDbType.VarChar).Value = objE.OBSERVACION;
                cmd.Parameters.Add("@ID_LOCAL", SqlDbType.Int).Value = objE.ID_LOCAL;
                cmd.Parameters.Add("@USU_MOD", SqlDbType.Int).Value = objE.USU_MOD;
                cmd.Parameters.Add("@OPCION", SqlDbType.Int).Value = objE.OPCION;

                cn.Open();
                respFinal = cmd.ExecuteNonQuery();
            }
            return respFinal;
        }

        public static List<EMovimiento> ListarMovimientosReporte(EMovimiento objE)
        {
            List<EMovimiento> lista = new List<EMovimiento>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_REPORTE_MOVIMIENTO", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@FECHA_INI", SqlDbType.Date).Value = objE.FECHA_INI;
                cmd.Parameters.Add("@FECHA_FIN", SqlDbType.Date).Value = objE.FECHA_FIN;
                cmd.Parameters.Add("@ID_LOCAL", SqlDbType.Int).Value = objE.ID_LOCAL;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EMovimiento mItem = new EMovimiento();
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));
                        mItem.FECHA_INI = dr.IsDBNull(dr.GetOrdinal("FECHA")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FECHA"));
                        mItem.MONTO = dr.IsDBNull(dr.GetOrdinal("MONTO")) ? 0 : dr.GetDecimal(dr.GetOrdinal("MONTO"));
                        mItem.TIPO = dr.IsDBNull(dr.GetOrdinal("TIPO")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

        public static List<EMovimiento> ListarAlertaReserva(int ID_LOCAL)
        {
            List<EMovimiento> lista = new List<EMovimiento>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_ALERTA_RESERVAS_VENCER", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_LOCAL", SqlDbType.Int).Value = ID_LOCAL;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EMovimiento mItem = new EMovimiento();
                        mItem.FECHA_INI = dr.IsDBNull(dr.GetOrdinal("FEC_INI")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FEC_INI"));
                        mItem.FECHA_FIN = dr.IsDBNull(dr.GetOrdinal("FEC_FIN")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FEC_FIN"));
                        mItem.ADELANTO = dr.IsDBNull(dr.GetOrdinal("ADELANTO")) ? 0 : dr.GetDecimal(dr.GetOrdinal("ADELANTO"));
                        mItem.MONTO = dr.IsDBNull(dr.GetOrdinal("TOTAL_HAB")) ? 0 : dr.GetDecimal(dr.GetOrdinal("TOTAL_HAB"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
        public static List<EMovimiento> ListarAlertaHabitacion(int ID_LOCAL)
        {
            List<EMovimiento> lista = new List<EMovimiento>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_ALERTA_HABITACIONES_SALIR", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_LOCAL", SqlDbType.Int).Value = ID_LOCAL;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EMovimiento mItem = new EMovimiento();
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));
                        mItem.FECHA_FIN = dr.IsDBNull(dr.GetOrdinal("FEC_FIN")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FEC_FIN"));
                        mItem.ADELANTO = dr.IsDBNull(dr.GetOrdinal("ADELANTO")) ? 0 : dr.GetDecimal(dr.GetOrdinal("ADELANTO"));
                        mItem.MONTO = dr.IsDBNull(dr.GetOrdinal("TOTAL_HAB")) ? 0 : dr.GetDecimal(dr.GetOrdinal("TOTAL_HAB"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

        public static string ListarTotalAlerta(int ID_LOCAL)
        {
            string lista = "";

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_TOTAL_ALERTAS", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_LOCAL", SqlDbType.Int).Value = ID_LOCAL;

                cn.Open();
                lista = cmd.ExecuteScalar().ToString();
            }
            return lista;
        }
    }
}
