<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="atencion.aspx.cs" Inherits="PRESENTACION.page.operacion.atencion" %>

<input id="txh_idventa" type="hidden" />
<div id="errorDiv"></div>
<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <header class="panel-heading">
                ATENCION DE HABITACION
            </header>
            <div class="panel-body">
                <button id="btn_buscar" type="button" class="btn btn-info btn-sm" title="Buscar">BUSCAR</button>
                <button id="btn_limpiar" type="button" class="btn btn-warning btn-sm">LIMPIAR</button>
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
                            Numero
                            <input id="txt_bus_numero" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Cliente
                            <input id="txt_bus_nocliente" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Moneda
                            <select id="sel_bus_moneda" class="form-control input-sm"></select>
                        </div>
                    </div>
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
                </div>
                <table id="tbl_busqueda" class="table table-striped table-hover table-padding-2">
                    <thead>
                        <tr>
                            <th style="display:none"></th>
                            <th></th>
                            <th>Fecha</th>
                            <th>Dcto.</th>
                            <th>Numero</th>
                            <th>Cliente</th>
                            <th>Forma Pago</th>
                            <th>Moneda</th>
                            <th>Total</th>
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

<div id="pnl_registropago" aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                <h4 class="modal-title">Registro de Pago</h4>
            </div>
            <div class="modal-body">
                <div id="errorRegPago"></div>
                <div class="subheader-fgp">DATOS DE DOCUMENTO</div>
                <div class="row">
                    <div class="col-lg-3">
                        <div class="form-group">
                            Tipo Dcto.
                            <input id="txt_rpago_tipoventa" class="form-control input-sm" type="text" disabled="disabled" />
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Serie
                            <input id="txt_rpago_serieventa" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Numero
                            <input id="txt_rpago_numventa" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Moneda
                            <input id="txt_rpago_monedaventa" class="form-control input-sm" type="text" disabled="disabled" />
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            Total
                            <input id="txt_rpago_totalventa" class="form-control input-sm right-fgp" type="text" disabled="disabled" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="form-group">
                            Cliente
                            <input id="txt_rpago_nocliente" class="form-control input-sm" type="text" disabled="disabled" />
                        </div>
                    </div>
                </div>
                <div class="subheader-fgp">DATOS DE PAGO</div>
                <div id="pnl_registropago_contado" class="panel">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="form-group">
                                Fecha Pago
                                <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                    <input id="txt_rpago_fecpago" type="text" class="form-control input-sm" placeholder="" data-mask="99/99/9999" size="16" />
                                    <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group">
                                Moneda
                                <select id="sel_rpago_moneda" class="form-control input-sm"></select>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group">
                                Tipo Cambio
                                <input id="txt_rpago_tipocambio" class="form-control input-sm right-fgp" type="text" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                Medio Pago
                                <select id="sel_rpago_mediopago" class="form-control input-sm"></select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                N° Dcto. Pago
                                <input id="txt_rpago_nupago" class="form-control input-sm" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 pull-right">
                            <div class="input-group">
                                <span class="input-group-addon">Importe</span>
                                <input id="txt_rpago_abono" class="form-control input-sm right-fgp" disabled="disabled" type="text" />
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">Recibido</span>
                                <input id="txt_rpago_recibido" class="form-control input-sm right-fgp" type="text" />
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon">Devolución</span>
                                <input id="txt_rpago_devolucion" class="form-control input-sm right-fgp" disabled="disabled" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="pnl_registropago_credito" class="panel">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="form-group">
                                Fecha Inicio
                                <div data-date-format="dd/mm/yyyy" class="input-group date dtOp disabled">
                                    <input id="txt_rpago_fecinicio" type="text" class="form-control input-sm" placeholder="" data-mask="99/99/9999" size="16" />
                                    <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="form-group">
                                Importe Inicial
                                <input id="txt_rpago_inicial" class="form-control input-sm right-fgp" type="text"/>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="form-group">
                                Importe Pago
                                <input id="txt_rpago_importe" class="form-control input-sm right-fgp" type="text" disabled="disabled" />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group">
                                Intervalo Dias
                                <div class="input-group">
                                    <input id="txt_rpago_nucuota" class="form-control input-sm" type="text" />
                                    <span class="input-group-btn"><button id="btn_rpago_cuota" class="btn btn-info btn-sm" type="button"><i class="icon-credit-card"></i></button></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <div class="form-group">
                                Letra
                                <div class="form-control input-sm" >
                                    <input id="chk_rpago_letra" type="checkbox" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <table id="tbl_rpago_cuota" class="table table-bordered table-padding-2 table-input-11">
                            <thead>
                                <tr>
                                    <th>Nro.</th>
                                    <th>Fecha</th>
                                    <th class="right-fgp">Monto</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <button id="btn_rpago_guardar" type="button" class="btn btn-primary">GUARDAR</button>
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