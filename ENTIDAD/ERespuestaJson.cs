using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class ERespuestaJson
    {
        public ERespuestaJson()
        {
            Activo = true;
            TipoMensaje = Tipo.Success;
        }

        public bool Activo { get; set; }
        public string TipoMensaje { get; set; }
        public string Mensaje { get; set; }
        public dynamic Resultado { get; set; }

        public void Success(string mensaje)
        {
            Activo = true;
            TipoMensaje = Tipo.Success;
            Mensaje = mensaje;
        }

        public void Error(string mensaje)
        {
            Activo = false;
            TipoMensaje = Tipo.Error;
            Mensaje = mensaje;
        }

        void Warning(string mensaje)
        {
            Activo = false;
            TipoMensaje = Tipo.Warning;
            Mensaje = mensaje;
        }

        public class Tipo
        {
            public static string Error = "error";
            public static string Warning = "warning";
            public static string Success = "success";
        }
    }
}
