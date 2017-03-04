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
    public static class DCliente
    {
        public static List<ECliente> ListarClientes(ECliente objE)
        {
            List<ECliente> lista = new List<ECliente>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_MANTENIMIENTO_CLIENTE", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_CLIENTE", SqlDbType.Int).Value = objE.ID_CLIENTE;
                cmd.Parameters.Add("@NOMBRES", SqlDbType.VarChar).Value = objE.NOMBRES;
                cmd.Parameters.Add("@APELLIDOS", SqlDbType.VarChar).Value = objE.APELLIDOS;
                cmd.Parameters.Add("@ID_TIPO_DOCUMENTO", SqlDbType.Int).Value = objE.ID_TIPO_DOCUMENTO;
                cmd.Parameters.Add("@NUM_DOCUMENTO", SqlDbType.VarChar).Value = objE.NUM_DOCUMENTO;
                cmd.Parameters.Add("@TELEFONOS", SqlDbType.VarChar).Value = objE.TELEFONOS;
                cmd.Parameters.Add("@USU_MOD", SqlDbType.Int).Value = objE.USU_MOD;
                cmd.Parameters.Add("@OPCION", SqlDbType.Int).Value = 1;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        ECliente mItem = new ECliente();
                        mItem.ID_CLIENTE = dr.IsDBNull(dr.GetOrdinal("ID_CLIENTE")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_CLIENTE"));
                        mItem.NOMBRES = dr.IsDBNull(dr.GetOrdinal("NOMBRES")) ? string.Empty : dr.GetString(dr.GetOrdinal("NOMBRES"));
                        mItem.APELLIDOS = dr.IsDBNull(dr.GetOrdinal("APELLIDOS")) ? string.Empty : dr.GetString(dr.GetOrdinal("APELLIDOS"));
                        mItem.ID_TIPO_DOCUMENTO = dr.IsDBNull(dr.GetOrdinal("ID_TIPO_DOCUMENTO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_TIPO_DOCUMENTO"));
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));
                        mItem.NUM_DOCUMENTO = dr.IsDBNull(dr.GetOrdinal("NUM_DOCUMENTO")) ? string.Empty : dr.GetString(dr.GetOrdinal("NUM_DOCUMENTO"));
                        mItem.TELEFONOS = dr.IsDBNull(dr.GetOrdinal("TELEFONOS")) ? string.Empty : dr.GetString(dr.GetOrdinal("TELEFONOS"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

        public static List<ECliente> ListarTiposDocumento()
        {
            List<ECliente> lista = new List<ECliente>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_LISTAR_TIPO_DOCUMENTO", cn);
                cmd.CommandType = CommandType.StoredProcedure;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        ECliente mItem = new ECliente();
                        mItem.ID_TIPO_DOCUMENTO = dr.IsDBNull(dr.GetOrdinal("ID_TIPO_DOCUMENTO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_TIPO_DOCUMENTO"));
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

        public static int ActualizarClientes(ECliente objE)
        {
            int respFinal = 0;

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_MANTENIMIENTO_CLIENTE", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_CLIENTE", SqlDbType.Int).Value = objE.ID_CLIENTE;
                cmd.Parameters.Add("@NOMBRES", SqlDbType.VarChar).Value = objE.NOMBRES;
                cmd.Parameters.Add("@APELLIDOS", SqlDbType.VarChar).Value = objE.APELLIDOS;
                cmd.Parameters.Add("@ID_TIPO_DOCUMENTO", SqlDbType.Int).Value = objE.ID_TIPO_DOCUMENTO;
                cmd.Parameters.Add("@NUM_DOCUMENTO", SqlDbType.VarChar).Value = objE.NUM_DOCUMENTO;
                cmd.Parameters.Add("@TELEFONOS", SqlDbType.VarChar).Value = objE.TELEFONOS;
                cmd.Parameters.Add("@USU_MOD", SqlDbType.Int).Value = objE.USU_MOD;
                cmd.Parameters.Add("@OPCION", SqlDbType.Int).Value = objE.OPCION;

                cn.Open();
                respFinal = cmd.ExecuteNonQuery();
            }
            return respFinal;
        }

        public static List<ECliente> BuscarClientes(ECliente objE)
        {
            List<ECliente> lista = new List<ECliente>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_BUSCAR_CLIENTE", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@NUM_DOCUMENTO", SqlDbType.VarChar).Value = objE.NUM_DOCUMENTO;
                cmd.Parameters.Add("@NOMBRES", SqlDbType.VarChar).Value = objE.NOMBRES;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        ECliente mItem = new ECliente();
                        mItem.ID_CLIENTE = dr.IsDBNull(dr.GetOrdinal("ID_CLIENTE")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_CLIENTE"));
                        mItem.NOMBRES = dr.IsDBNull(dr.GetOrdinal("NOMBRES")) ? string.Empty : dr.GetString(dr.GetOrdinal("NOMBRES"));
                        mItem.ID_TIPO_DOCUMENTO = dr.IsDBNull(dr.GetOrdinal("ID_TIPO_DOCUMENTO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_TIPO_DOCUMENTO"));
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));
                        mItem.NUM_DOCUMENTO = dr.IsDBNull(dr.GetOrdinal("NUM_DOCUMENTO")) ? string.Empty : dr.GetString(dr.GetOrdinal("NUM_DOCUMENTO"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
    }
}
