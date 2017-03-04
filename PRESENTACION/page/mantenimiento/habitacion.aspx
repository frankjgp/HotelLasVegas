<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="habitacion.aspx.cs" Inherits="PRESENTACION.page.mantenimiento.habitacion" %>

<div id="errorDiv"></div>
<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <header class="panel-heading">
                MANTENIMIENTO HABITACION
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
                    <div class="col-lg-4">
                        <div class="form-group">
                            Número
                            <input id="txt_bus_numero" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Tipo Habitación
                            <select id="sel_bus_tipo" class="form-control input-sm"></select>
                        </div>
                    </div>
                </div>
                <table id="tbl_habitacion" class="table table-striped table-hover table-padding-2">
                    <thead>
                        <tr>
                            <th style="display: none"></th>
                            <th></th>
                            <th>Nro.</th>
                            <th>Tipo</th>
                            <th>Precio</th>
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

<div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="pnl_habitacion" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                <h4 class="modal-title">Registro Habitación</h4>
            </div>
            <div class="modal-body">
                <div id="errorHabitacion"></div>
                <input id="txh_idhabitacion" type="hidden" />
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            Número
                            <input id="txt_numero" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="form-group">
                            Modelo
                            <select id="sel_tipo" class="form-control input-sm"></select>
                        </div>
                    </div>
                </div>
                <div class="row">
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
                            Estado
                            <select id="sel_estado" class="form-control input-sm">
                                <option value="0">Seleccione</option>
                                <option value="1">Activo</option>
                                <option value="2">Mantenimiento</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button id="btn_guardar" type="button" class="btn btn-primary">GUARDAR</button>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $.getScript("js/page/mantenimiento/habitacion.js")
    .fail(function (jqxhr, settings, exception) {
        alert("Error: No se ha cargando un complemento del sistema (habitacion.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
    });
</script>
