﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class EReserva
    {
        public int ID_ATENCION { get; set; }
        public int ID_RESERVA { get; set; }
        public int ID_CLIENTE { get; set; }
        public int ID_HABITACION { get; set; }
        public DateTime FEC_INI { get; set; }
        public DateTime FEC_FIN { get; set; }
        public int ID_TIPO_RESERVA { get; set; }
        public string TIPO_RESERVA { get; set; }
        public decimal ADELANTO { get; set; }
        public decimal PRECIO_HAB { get; set; }
        public decimal TOTAL_HAB { get; set; }
        public int ID_MEDIO_PAGO { get; set; }
        public string MEDIO_PAGO { get; set; }
        public string OBSERVACION { get; set; }
        public int USU_REG { get; set; }
        public int ID_LOCAL { get; set; }
        public int ESTADO { get; set; }
        public int OPCION { get; set; }

        #region EXTRA
        public string NUM_CLIENTE { get; set; }
        public string NOM_CLIENTE { get; set; }
        public string NUM_HABITACION { get; set; }
        public int ID_TIPO_HABITACION { get; set; }
        public string TIPO_HABITACION { get; set; }
        public string DSC_ESTADO { get; set; }
        #endregion

    }
}
