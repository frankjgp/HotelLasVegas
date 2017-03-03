using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public static class NUsuario
    {
        public static EUsuario Login(EUsuario ent)
        {
            return DUsuario.Login(ent);
        }

        public static List<ELocal> PermisoLocal(int id_usuario)
        {
            return DUsuario.PermisoLocal(id_usuario);
        }

        public static List<EMenu> PerfilUsuario(int id_usuario)
        {
            return DUsuario.PerfilUsuario(id_usuario).ToList();
        }
    }
}
