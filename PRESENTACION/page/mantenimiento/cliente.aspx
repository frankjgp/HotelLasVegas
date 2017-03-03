<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="cliente.aspx.cs" Inherits="PRESENTACION.page.mantenimiento.cliente" %>

<head>
    <style type="text/css">
        #txt_bus_nrodoc0 {
            width: 197px;
        }
    </style>
</head>

<div id="errorDiv"></div>
<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <header class="panel-heading">
                MANTENIMIENTO CLIENTE
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
                            Nombres&nbsp;
                            <input id="txt_nombreB" class="form-control input-sm" type="text" maxlength="200" /></div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Apellidos&nbsp;
                            <input id="txt_bus_nrodocB" class="form-control input-sm" type="text" maxlength="200" /></div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Tipo de Documento
                            <select id="sel_tipodocumentoB" class="form-control input-sm" name="D1">
                                <option value="0">Todos</option>
                                <option value="J">Juridico</option>
                                <option value="N">Natural</option>
                            </select></div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            N° Documento
                            <input id="txt_nrodocB" class="form-control input-sm" type="text" maxlength="20" />
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Teléfonos
                            <input id="txt_telefonoB" class="form-control input-sm" type="text" maxlength="1000" />
                        </div>
                    </div>
                </div>
                
                <table id="tbl_cliente" class="table table-striped table-hover table-padding-2">
                    <thead>
                        <tr>
                            <th style="display: none"></th>
                            <th></th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Tipo de documento</th>
                            <th>Número de documento</th>
                            <th>Teléfonos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <%--<tr>
                            <td style="display:none">1</td>
                            <td>DNI</td>
                            <td>46875540</td>
                            <td>Frank Guerra Palomino</td>
                            <td>S/. 1000</td>
                            <td>
                                <button class="btn btn-success btn-xs"><i class="icon-ok"></i></button>
                                <button class="btn btn-primary btn-xs"><i class="icon-pencil"></i></button>
                                <button class="btn btn-danger btn-xs"><i class="icon-trash "></i></button>
                            </td>
                        </tr>--%>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</div>

<div id="pnl_cliente" aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" class="modal fade">
    <div class="modal-dialog modal-extend-fgp">
        <div class="modal-content">
            <div class="modal-header">
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                <h4 class="modal-title">Registro Cliente</h4>
            </div>
            <div class="modal-body">
                <div id="errorCliente"></div>
                <input id="txh_idcliente" type="hidden" />
                <div class="row">
                    <div class="col-lg-2">
                        <div class="form-group">
                            Nombres&nbsp;
                            <input id="txt_nombre" class="form-control input-sm" type="text" maxlength="200" /></div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Apellidos&nbsp;
                            <input id="txt_apellidos" class="form-control input-sm" type="text" maxlength="200" /></div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Tipo de Documento
                            <select id="sel_tipodocumento" class="form-control input-sm" name="D1">
                                <option value="0">Todos</option>
                                <option value="J">Juridico</option>
                                <option value="N">Natural</option>
                            </select></div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            N° Documento
                            <input id="txt_nrodoc" class="form-control input-sm" type="text" maxlength="20" />
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Teléfonos
                            <input id="txt_telefono" class="form-control input-sm" type="text" maxlength="1000" />
                        </div>
                    </div>
                </div>
                <button id="btn_guardar" type="button" class="btn btn-primary">GUARDAR</button>
            </div>

            
        </div>
    </div>
</div>

<script type="text/javascript">
    $.getScript("js/page/mantenimiento/cliente.js")
    .fail(function (jqxhr, settings, exception) {
        alert("Error: No se ha cargando un complemento del sistema (cliente.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
    });
</script>