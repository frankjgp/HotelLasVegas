<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="habitacion.aspx.cs" Inherits="PRESENTACION.page.mantenimiento.habitacion" %>

<div id="errorDiv"></div>
<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <header class="panel-heading">
                MANTENIMIENTO AUTO
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
                            Nro. Placa
                            <input id="txt_bus_placa" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Modelo
                            <select id="sel_bus_modelo" class="form-control input-sm"></select>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Sub-Modelo
                            <select id="sel_bus_submodelo" class="form-control input-sm"></select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            Nro. Cliente
                            <input id="txt_bus_nucliente" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="form-group">
                            Nombre Cliente
                            <input id="txt_bus_nocliente" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                </div>
                <table id="tbl_auto" class="table table-striped table-hover table-padding-2">
                    <thead>
                        <tr>
                            <th style="display:none"></th>
                            <th></th>
                            <th>Nro. Placa</th>
                            <th>Modelo</th>
                            <th>Kilometraje</th>
                            <th>Cliente</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</div>

<div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="pnl_auto" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                <h4 class="modal-title">Registro Auto</h4>
            </div>
            <div class="modal-body">
                <div id="errorAuto"></div>
                <input id="txh_idauto" type="hidden" />
                <input id="txh_idcliente" type="hidden" />
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            Nro. Placa
                            <input id="txt_placa" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Kilometraje
                            <input id="txt_kilometraje" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Intervalo
                            <div class="input-group">
                                <input id="txt_intervalo" class="form-control input-sm" type="text" />
                                <span class="input-group-addon">Dia(s)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            Modelo
                            <select id="sel_modelo" class="form-control input-sm"></select>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            Sub-Modelo
                            <select id="sel_submodelo" class="form-control input-sm"></select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            Nro. Cliente
                            <div class="input-group">
                                <input id="txt_nucliente" class="form-control input-sm" type="text" disabled="disabled" />
                                <span class="input-group-btn"><button id="btn_buscar_cliente" class="btn btn-info btn-sm" type="button"><i class="icon-search"></i></button></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="form-group">
                            Nombre Cliente
                            <input id="txt_nocliente" class="form-control input-sm" type="text" disabled="disabled" />
                        </div>
                    </div>
                </div>
                <button id="btn_guardar" type="button" class="btn btn-primary">GUARDAR</button>
            </div>
        </div>
    </div>
</div>

<div id="pnl_busquedacliente" aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                <h4 class="modal-title">Busqueda de Clientes</h4>
            </div>
            <div class="modal-body">
                <div id="errorBusquedaCliente"></div>
                <div class="panel">
                    <button id="btn_bcli_buscar" type="button" class="btn btn-info btn-xs">BUSCAR</button>
                </div>
                <div class="row">
                    <div class="col-lg-3">
                        <div class="form-group">
                            Tipo de Persona
                            <select id="sel_bcli_tipopersona" class="form-control input-sm">
                                <option value="0">Todos</option>
                                <option value="J">Juridico</option>
                                <option value="N">Natural</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            N° Documento
                            <input id="txt_bcli_nrodoc" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div id="pnl_bcli_juridico" class="col-lg-6">
                        <div class="form-group">
                            Razon Social
                            <input id="txt_bcli_razonsocial" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div id="pnl_bcli_natural" class="col-lg-6">
                        <div class="form-group">
                            Nombres
                            <input id="txt_bcli_nombre" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                </div>
                <table id="tbl_busquedacliente" class="table table-striped table-hover table-padding-2">
                    <thead>
                        <tr>
                            <th style="display:none"></th>
                            <th></th>
                            <th>Dcto.</th>
                            <th>Numero</th>
                            <th>Nombre/Razon Social</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
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