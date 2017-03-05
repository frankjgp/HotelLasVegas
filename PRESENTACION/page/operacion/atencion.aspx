<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="atencion.aspx.cs" Inherits="PRESENTACION.page.operacion.atencion" %>

<div id="errorDiv"></div>
<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <header class="panel-heading">
                ATENCION
            </header>
            <div class="panel-body">
                <button id="btn_buscar" type="button" class="btn btn-info btn-sm">BUSCAR</button>
                <button id="btn_limpiar" type="button" class="btn btn-warning btn-sm">LIMPIAR</button>
                <button id="btn_nuevo" type="button" class="btn btn-success btn-sm">NUEVO</button>
            </div>
        </section>
    </div>
</div>
<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <div id="pnl_busqueda" class="panel-body">
                <h4 class="drg-event-title">Criterios de Busqueda</h4>
                <div class="row">
                    <div class="col-lg-2">
                        <div class="form-group">
                            Fecha Inicio
                            <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                <input id="txt_bus_fechainicio" type="text" class="form-control input-sm" placeholder="" data-mask="99/99/9999" size="16" />
                                <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Fecha Fin
                            <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                <input id="txt_bus_fechafin" type="text" class="form-control input-sm" placeholder="" data-mask="99/99/9999" size="16" />
                                <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Tipo Habitación
                            <select id="sel_bus_tipo" class="form-control input-sm"></select>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Cliente
                            <input id="txt_bus_nocliente" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                </div>
                <table id="tbl_atencion" class="table table-striped table-hover table-padding-2">
                    <thead>
                        <tr>
                            <th style="display: none"></th>
                            <th></th>
                            <th>Habitación</th>
                            <th>Tipo</th>
                            <th>Fec.Inicio</th>
                            <th>Fec.Fin</th>
                            <th>Cliente</th>
                            <th>Precio</th>
                            <th>Adelanto</th>
                            <th></th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</div>

<div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="pnl_atencion" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                <h4 class="modal-title">Atención de Habitación</h4>
            </div>
            <div class="modal-body">
                <div id="errorAtencion"></div>
                <input id="txh_idatencion" type="hidden" />
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            Reserva de Cliente
                            <div class="input-group">
                                <input id="txh_idreserva" type="hidden" />
                                <input id="txt_clientereserva" class="form-control input-sm" type="text" />
                                <span class="input-group-btn"><button id="btn_buscar_reserva" class="btn btn-info btn-sm" type="button"><i class="icon-search"></i></button></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            Detalle de Reserva
                            <input id="txt_detallereserva" class="form-control input-sm" type="text" readonly="readonly" />
                        </div>
                    </div>
                </div>
                <div id="pnl_reserva" class="panel" style="max-height: 100px">
                    <table id="tbl_reserva" class="table table-striped table-hover table-padding-2">
                        <thead>
                            <tr>
                                <th style="display: none"></th>
                                <th>Cliente</th>
                                <th>Habitación</th>
                                <th>Fec.Inicio</th>
                                <th>Fec.Fin</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            Fecha Inicio
                            <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                <input id="txt_fechainicio" type="text" class="form-control input-sm" placeholder="" data-mask="99/99/9999" size="16" disabled="disabled" />
                                <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Fecha Fin
                            <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                <input id="txt_fechafin" type="text" class="form-control input-sm" placeholder="" data-mask="99/99/9999" size="16" disabled="disabled" />
                                <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Tipo Habitación
                            <div class="input-group">
                                <select id="sel_tipo" class="form-control input-sm"></select>
                                <span class="input-group-btn"><button id="btn_buscar_habitacion" class="btn btn-info btn-sm" type="button"><i class="icon-search"></i></button></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="pnl_habitacion" class="panel" style="max-height: 100px">
                    <table id="tbl_habitacion" class="table table-striped table-hover table-padding-2">
                        <thead>
                            <tr>
                                <th style="display: none"></th>
                                <th>Habitación</th>
                                <th>Tipo</th>
                                <th>Precio</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            Documento de Cliente
                            <div class="input-group">
                                <input id="txh_idcliente" type="hidden" />
                                <input id="txt_nrocliente" class="form-control input-sm" type="text" />
                                <span class="input-group-btn"><button id="btn_buscar_cliente" class="btn btn-info btn-sm" type="button"><i class="icon-search"></i></button></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="form-group">
                            Nombre de Cliente
                            <input id="txt_nomcliente" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                </div>
                <div id="pnl_cliente" class="panel" style="max-height: 100px">
                    <table id="tbl_cliente" class="table table-striped table-hover table-padding-2">
                        <thead>
                            <tr>
                                <th style="display: none"></th>
                                <th>Tipo Doc.</th>
                                <th>Nro. Doc.</th>
                                <th>Nombres</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            Habitación
                            <input id="txh_idhabitacion" type="hidden" />
                            <input id="txt_habitacion" class="form-control input-sm" type="text" disabled="disabled" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Precio
                            <div class="input-group">
                                <span class="input-group-addon">S/</span>
                                <input id="txt_precio" class="form-control input-sm" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Total
                            <div class="input-group">
                                <span class="input-group-addon">S/</span>
                                <input id="txt_total" class="form-control input-sm" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            Adelanto
                            <div class="input-group">
                                <span class="input-group-addon">S/</span>
                                <input id="txt_adelanto" class="form-control input-sm" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Medio de Pago
                            <select id="sel_mediopago" class="form-control input-sm"></select>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Tipo Reserva
                            <select id="sel_tiporeserva" class="form-control input-sm"></select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="form-group">
                            Observacion
                            <textarea id="txt_observacion" class="form-control input-sm" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <button id="btn_guardar" type="button" class="btn btn-primary">GUARDAR</button>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $.getScript("js/page/operacion/atencion.js")
    .fail(function (jqxhr, settings, exception) {
        alert("Error: No se ha cargando un complemento del sistema (atencion.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
    });
</script>
