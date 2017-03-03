using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public static class NCliente
    {
        public static int ActualizarClientes(ECliente ent)
        {
            return DCliente.ActualizarClientes(ent);
        }

        public static List<ECliente> ListarClientes(ECliente ent)
        {
            return DCliente.ListarClientes(ent);
        }
    }
}
