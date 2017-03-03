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
    public static class DUsuario
    {
        public static EUsuario Login(EUsuario ent)
        {
            EUsuario eUsuario = null;

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_LOGIN", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@usuario", SqlDbType.VarChar).Value = ent.DSC_USUARIO;
                cmd.Parameters.Add("@password", SqlDbType.VarChar).Value = EUtil.getMd5Hash(ent.PASSWORD);

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        eUsuario = new EUsuario();
                        eUsuario.ID_USUARIO = dr.IsDBNull(dr.GetOrdinal("ID_USUARIO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_USUARIO"));
                        eUsuario.DSC_USUARIO = dr.IsDBNull(dr.GetOrdinal("DSC_USUARIO")) ? string.Empty : dr.GetString(dr.GetOrdinal("DSC_USUARIO"));

                        eUsuario.EMPLEADO = new EEmpleado();
                        eUsuario.EMPLEADO.ID_EMPLEADO = dr.IsDBNull(dr.GetOrdinal("ID_EMPLEADO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_EMPLEADO"));
                        eUsuario.EMPLEADO.NOMBRES = dr.IsDBNull(dr.GetOrdinal("NOMBRES")) ? string.Empty : dr.GetString(dr.GetOrdinal("NOMBRES"));
                        eUsuario.EMPLEADO.APELLIDOS = dr.IsDBNull(dr.GetOrdinal("APELLIDOS")) ? string.Empty : dr.GetString(dr.GetOrdinal("APELLIDOS"));
                        eUsuario.EMPLEADO.CARGO = dr.IsDBNull(dr.GetOrdinal("CARGO")) ? string.Empty : dr.GetString(dr.GetOrdinal("CARGO"));
                    }
                }
            }
            return eUsuario;
        }

        public static List<ELocal> PermisoLocal(int id_usuario)
        {
            List<ELocal> lista = new List<ELocal>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_LOGIN_LOCAL", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@id_usuario", SqlDbType.Int).Value = id_usuario;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        ELocal eLocal = new ELocal();
                        eLocal.ID_LOCAL = dr.IsDBNull(dr.GetOrdinal("ID_LOCAL")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_LOCAL"));
                        eLocal.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));
                        lista.Add(eLocal);
                    }
                }
            }
            return lista;
        }

        public static List<EMenu> PerfilUsuario(int id_usuario)
        {
            List<EMenu> lista = new List<EMenu>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_LOGIN_PERFIL", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@id_usuario", SqlDbType.Int).Value = id_usuario;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EMenu eMenu = new EMenu();
                        eMenu.ID_MENU = dr.IsDBNull(dr.GetOrdinal("ID_MENU")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_MENU"));
                        eMenu.ID_PADRE = dr.IsDBNull(dr.GetOrdinal("ID_PADRE")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_PADRE"));
                        eMenu.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));
                        eMenu.URL = dr.IsDBNull(dr.GetOrdinal("URL")) ? string.Empty : dr.GetString(dr.GetOrdinal("URL"));
                        lista.Add(eMenu);
                    }
                }
            }
            return lista;
        }
    }
}
