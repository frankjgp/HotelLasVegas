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
    public static class DHabitacion
    {
        public static List<EHabitacion> ListarHabitaciones(EHabitacion objE)
        {
            if (objE.TIPOHABITACION == null) objE.TIPOHABITACION = new ETipoHabitacion();

            List<EHabitacion> lista = new List<EHabitacion>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_MANTENIMIENTO_HABITACION", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_HABITACION", SqlDbType.Int).Value = objE.ID_HABITACION;
                cmd.Parameters.Add("@NUMERO", SqlDbType.VarChar).Value = objE.NUMERO;
                cmd.Parameters.Add("@ID_TIPO_HABITACION", SqlDbType.Int).Value = objE.TIPOHABITACION.ID_TIPO_HABITACION;
                cmd.Parameters.Add("@PRECIO", SqlDbType.Decimal).Value = objE.PRECIO;
                cmd.Parameters.Add("@ID_LOCAL", SqlDbType.Int).Value = objE.ID_LOCAL;
                cmd.Parameters.Add("@ESTADO", SqlDbType.Int).Value = objE.ESTADO;
                cmd.Parameters.Add("@USU_REG", SqlDbType.Int).Value = objE.USU_REG;
                cmd.Parameters.Add("@OPCION", SqlDbType.Int).Value = 1;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EHabitacion mItem = new EHabitacion();
                        mItem.ID_HABITACION = dr.IsDBNull(dr.GetOrdinal("ID_HABITACION")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_HABITACION"));
                        mItem.ID_LOCAL = dr.IsDBNull(dr.GetOrdinal("ID_LOCAL")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_LOCAL"));
                        mItem.NUMERO = dr.IsDBNull(dr.GetOrdinal("NUMERO")) ? string.Empty : dr.GetString(dr.GetOrdinal("NUMERO"));
                        mItem.TIPOHABITACION = new ETipoHabitacion();
                        mItem.TIPOHABITACION.ID_TIPO_HABITACION = dr.IsDBNull(dr.GetOrdinal("ID_TIPO_HABITACION")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_TIPO_HABITACION"));
                        mItem.TIPOHABITACION.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));
                        mItem.PRECIO = dr.IsDBNull(dr.GetOrdinal("PRECIO")) ? 0 : dr.GetDecimal(dr.GetOrdinal("PRECIO"));
                        mItem.ESTADO = dr.IsDBNull(dr.GetOrdinal("ESTADO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ESTADO"));
                        mItem.DSC_ESTADO = (mItem.ESTADO == 2 ? "Mantenimiento" : "Activo");

                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

        public static int ActualizarHabitaciones(EHabitacion objE)
        {
            int respFinal = 0;
            if (objE.TIPOHABITACION == null) objE.TIPOHABITACION = new ETipoHabitacion();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_MANTENIMIENTO_HABITACION", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_HABITACION", SqlDbType.Int).Value = objE.ID_HABITACION;
                cmd.Parameters.Add("@NUMERO", SqlDbType.VarChar).Value = objE.NUMERO;
                cmd.Parameters.Add("@ID_TIPO_HABITACION", SqlDbType.Int).Value = objE.TIPOHABITACION.ID_TIPO_HABITACION;
                cmd.Parameters.Add("@PRECIO", SqlDbType.Decimal).Value = objE.PRECIO;
                cmd.Parameters.Add("@ID_LOCAL", SqlDbType.Int).Value = objE.ID_LOCAL;
                cmd.Parameters.Add("@ESTADO", SqlDbType.Int).Value = objE.ESTADO;
                cmd.Parameters.Add("@USU_REG", SqlDbType.Int).Value = objE.USU_REG;
                cmd.Parameters.Add("@OPCION", SqlDbType.Int).Value = objE.OPCION;

                cn.Open();
                respFinal = cmd.ExecuteNonQuery();
            }
            return respFinal;
        }

        public static List<ETipoHabitacion> ListarTipoHabitacion()
        {
            List<ETipoHabitacion> lista = new List<ETipoHabitacion>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_LISTAR_TIPO_HABITACION", cn);
                cmd.CommandType = CommandType.StoredProcedure;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        ETipoHabitacion mItem = new ETipoHabitacion();
                        mItem.ID_TIPO_HABITACION = dr.IsDBNull(dr.GetOrdinal("ID_TIPO_HABITACION")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_TIPO_HABITACION"));
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));

                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
    }
}
