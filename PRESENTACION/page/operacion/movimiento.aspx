<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="movimiento.aspx.cs" Inherits="PRESENTACION.page.operacion.movimiento" %>

<div id="errorDiv"></div>
<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <header class="panel-heading">
                INGRESOS Y EGRESOS
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
                            Movimiento
                            <select id="sel_bus_movimiento" name="tipo" class="form-control input-sm"></select>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Fecha Inicio
                            <div data-date-format="dd/mm/yyyy"  class="input-group date dtOp">
                                <input id="txt_bus_fechainicio" name="fechaini" type="text" class="form-control input-sm" placeholder="" data-mask="99/99/9999" size="16" />
                                <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Fecha Fin
                            <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                <input id="txt_bus_fechafin" name="fechafin" type="text" class="form-control input-sm" placeholder="" data-mask="99/99/9999" size="16" />
                                <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <table id="tbl_movimiento" class="table table-striped table-hover table-padding-2">
                    <thead>
                        <tr>
                            <th style="display: none"></th>
                            <th></th>
                            <th>Tipo Movimiento</th>
                            <th>Monto</th>
                            <th>Fecha</th>
                            <th>Observacion</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</div>

<input id="txh_idmovimiento" type="hidden" />

<div id="pnl_movimiento" aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" class="modal fade">
    <div class="modal-dialog modal-extend-fgp">
        <div class="modal-content">
            <div class="modal-header">
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                <h4 class="modal-title">Registro Ingresos y Egresos</h4>
            </div>
            <div class="modal-body">
                <div id="errorMovimiento"></div>
                <div class="row">
                    <div class="col-lg-2">
                        <div class="form-group">
                            Movimiento
                            <select id="sel_movimiento" class="form-control input-sm"></select>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Fecha
                            <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                <input id="txt_fecha" type="text" class="form-control input-sm" placeholder="" data-mask="99/99/9999" size="16" />
                                <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Monto
                            <input id="txt_monto" class="form-control input-sm" type="text" maxlength="21" /></div>
                    </div>
                    <div class="col-lg-2">  
                        <div class="form-group">
                            Observación
                            <input id="txt_observacion" class="form-control input-sm" type="text" maxlength="1000" /></div>
                    </div>
                </div>
                <button id="btn_guardar" type="button" class="btn btn-primary">GUARDAR</button>
            </div>

            
        </div>
    </div>
</div>

<script type="text/javascript">
    $.getScript("js/page/operacion/movimiento.js")
    .fail(function (jqxhr, settings, exception) {
        alert("Error: No se ha cargando un complemento del sistema (movimiento.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
    });
</script>