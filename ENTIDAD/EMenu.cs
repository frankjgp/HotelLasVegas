using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class EMenu
    {
        public int ID_MENU { get; set; }
        public int ID_PADRE { get; set; }
        public string DESCRIPCION { get; set; }
        public string URL { get; set; }
    }
}
