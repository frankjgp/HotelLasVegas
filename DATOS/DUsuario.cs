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
        public static List<EEmpleado> ListarUsuarios(EEmpleado objE)
        {
            if (objE.USUARIO == null) objE.USUARIO = new EUsuario();
            if (objE.USUARIO.PERFIL == null) objE.USUARIO.PERFIL = new EPerfil();

            List<EEmpleado> lista = new List<EEmpleado>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_MANTENIMIENTO_USUARIO", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_EMPLEADO", SqlDbType.Int).Value = objE.ID_EMPLEADO;
                cmd.Parameters.Add("@NOMBRES", SqlDbType.VarChar).Value = objE.NOMBRES;
                cmd.Parameters.Add("@APELLIDOS", SqlDbType.VarChar).Value = objE.APELLIDOS;
                cmd.Parameters.Add("@CARGO", SqlDbType.VarChar).Value = objE.CARGO;
                cmd.Parameters.Add("@SUELDO", SqlDbType.Decimal).Value = objE.SUELDO;
                cmd.Parameters.Add("@ESTADO", SqlDbType.Int).Value = objE.ESTADO;

                cmd.Parameters.Add("@ID_USUARIO", SqlDbType.Int).Value = objE.USUARIO.ID_USUARIO;
                cmd.Parameters.Add("@DSC_USUARIO", SqlDbType.VarChar).Value = objE.USUARIO.DSC_USUARIO;
                cmd.Parameters.Add("@ID_PERFIL", SqlDbType.Int).Value = objE.USUARIO.PERFIL.ID_PERFIL;
                cmd.Parameters.Add("@LOCAL", SqlDbType.VarChar).Value = objE.USUARIO.LOCAL_PERFIL;
                cmd.Parameters.Add("@ESTADO_USUARIO", SqlDbType.Int).Value = objE.USUARIO.ESTADO;

                cmd.Parameters.Add("@OPCION", SqlDbType.Int).Value = 1;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EEmpleado mItem = new EEmpleado();
                        mItem.ID_EMPLEADO = dr.IsDBNull(dr.GetOrdinal("ID_EMPLEADO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_EMPLEADO"));
                        mItem.NOMBRES = dr.IsDBNull(dr.GetOrdinal("NOMBRES")) ? string.Empty : dr.GetString(dr.GetOrdinal("NOMBRES"));
                        mItem.APELLIDOS = dr.IsDBNull(dr.GetOrdinal("APELLIDOS")) ? string.Empty : dr.GetString(dr.GetOrdinal("APELLIDOS"));
                        mItem.CARGO = dr.IsDBNull(dr.GetOrdinal("CARGO")) ? string.Empty : dr.GetString(dr.GetOrdinal("CARGO"));
                        mItem.SUELDO = dr.IsDBNull(dr.GetOrdinal("SUELDO")) ? 0 : dr.GetDecimal(dr.GetOrdinal("SUELDO"));

                        mItem.USUARIO = new EUsuario();
                        mItem.USUARIO.ID_USUARIO = dr.IsDBNull(dr.GetOrdinal("ID_USUARIO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_USUARIO"));
                        mItem.USUARIO.DSC_USUARIO = dr.IsDBNull(dr.GetOrdinal("DSC_USUARIO")) ? string.Empty : dr.GetString(dr.GetOrdinal("DSC_USUARIO"));
                        mItem.USUARIO.ESTADO = dr.IsDBNull(dr.GetOrdinal("ESTADO_USUARIO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ESTADO_USUARIO"));
                        mItem.USUARIO.LOCAL_PERFIL = dr.IsDBNull(dr.GetOrdinal("LOCAL")) ? string.Empty : dr.GetString(dr.GetOrdinal("LOCAL"));

                        mItem.USUARIO.PERFIL = new EPerfil();
                        mItem.USUARIO.PERFIL.ID_PERFIL = dr.IsDBNull(dr.GetOrdinal("ID_PERFIL")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_PERFIL"));

                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

        public static int ActualizarUsuarios(EEmpleado objE)
        {
            int respFinal = 0;
            if (objE.USUARIO == null) objE.USUARIO = new EUsuario();
            if (objE.USUARIO.PERFIL == null) objE.USUARIO.PERFIL = new EPerfil();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_MANTENIMIENTO_USUARIO", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_EMPLEADO", SqlDbType.Int).Value = objE.ID_EMPLEADO;
                cmd.Parameters.Add("@NOMBRES", SqlDbType.VarChar).Value = objE.NOMBRES;
                cmd.Parameters.Add("@APELLIDOS", SqlDbType.VarChar).Value = objE.APELLIDOS;
                cmd.Parameters.Add("@CARGO", SqlDbType.VarChar).Value = objE.CARGO;
                cmd.Parameters.Add("@SUELDO", SqlDbType.Decimal).Value = objE.SUELDO;
                cmd.Parameters.Add("@ESTADO", SqlDbType.Int).Value = objE.ESTADO;

                cmd.Parameters.Add("@ID_USUARIO", SqlDbType.Int).Value = objE.USUARIO.ID_USUARIO;
                cmd.Parameters.Add("@DSC_USUARIO", SqlDbType.VarChar).Value = objE.USUARIO.DSC_USUARIO;
                cmd.Parameters.Add("@ID_PERFIL", SqlDbType.Int).Value = objE.USUARIO.PERFIL.ID_PERFIL;
                cmd.Parameters.Add("@LOCAL", SqlDbType.VarChar).Value = objE.USUARIO.LOCAL_PERFIL;
                cmd.Parameters.Add("@ESTADO_USUARIO", SqlDbType.Int).Value = objE.USUARIO.ESTADO;
                cmd.Parameters.Add("@OPCION", SqlDbType.Int).Value = objE.OPCION;

                cn.Open();
                respFinal = cmd.ExecuteNonQuery();
            }
            return respFinal;
        }

        public static List<EPerfil> ListarPerfiles()
        {
            List<EPerfil> lista = new List<EPerfil>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_LISTAR_PERFIL", cn);
                cmd.CommandType = CommandType.StoredProcedure;

                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EPerfil mItem = new EPerfil();
                        mItem.ID_PERFIL = dr.IsDBNull(dr.GetOrdinal("ID_PERFIL")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_PERFIL"));
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));

                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

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
                        eUsuario.ESTADO = dr.IsDBNull(dr.GetOrdinal("ESTADO")) ? 0 : dr.GetInt32(dr.GetOrdinal("ESTADO"));

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

        public static int CambiarClave(EUsuario ent)
        {
            int respFinal = 0;

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnLasVegas)))
            {
                SqlCommand cmd = new SqlCommand("USP_CAMBIAR_CLAVE", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID_USUARIO", SqlDbType.VarChar).Value = ent.ID_USUARIO;
                cmd.Parameters.Add("@PASSWORD", SqlDbType.VarChar).Value = EUtil.getMd5Hash(ent.PASSWORD);

                cn.Open();
                respFinal = cmd.ExecuteNonQuery();
            }
            return respFinal;
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
