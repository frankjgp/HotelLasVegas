<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="cliente.aspx.cs" Inherits="PRESENTACION.page.mantenimiento.cliente" %>

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
                            Tipo de Persona
                            <select id="sel_bus_tipopersona" class="form-control input-sm">
                                <option value="0">Todos</option>
                                <option value="J">Juridico</option>
                                <option value="N">Natural</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            N° Documento
                            <input id="txt_bus_nrodoc" class="form-control input-sm" type="text" maxlength="11" />
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Tipo de Cliente
                            <select id="sel_bus_tipocliente" class="form-control input-sm"></select>
                        </div>
                    </div>
                    <div class="col-lg-1">
                        <div class="form-group">
                            Anulados
                            <div class="form-control input-sm" >
                                <input id="chk_bus_anulado" type="checkbox" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            Razon Social
                            <input id="txt_bus_razonsocial" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Nombres
                            <input id="txt_bus_nombre" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            Representante
                            <input id="txt_bus_representante" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                </div>
                <table id="tbl_cliente" class="table table-striped table-hover table-padding-2">
                    <thead>
                        <tr>
                            <th style="display: none"></th>
                            <th></th>
                            <th>Tipo de Dcto.</th>
                            <th>N° Documento</th>
                            <th>Nombre/Razon Social</th>
                            <th class="right-fgp">Credito</th>
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
                    <div class="col-lg-3">
                        <div class="form-group">
                            Tipo de Persona
                            <select id="sel_tipopersona" class="form-control input-sm">
                                <option value="0">Seleccione</option>
                                <option value="J">Juridico</option>
                                <option value="N">Natural</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Tipo Dcto.
                            <input id="txt_tipodoc" class="form-control input-sm" type="text" disabled="disabled" />
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            N° Dcto.
                            <div class="input-group">
                                <input id="txt_nrodoc" class="form-control input-sm" type="text" maxlength="11" />
                                <span class="input-group-btn">
                                    <button id="btn_buscar_externo" class="btn btn-info btn-sm" type="button"><i class="icon-cog"></i></button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="pnl_cliente_juridico" class="row">
                    <div class="col-lg-8">
                        <div class="form-group">
                            Razon Social
                            <input id="txt_razonsocial" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Representante
                            <input id="txt_representante" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                </div>
                <div id="pnl_cliente_natural" class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            Nombres
                            <input id="txt_natural" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Ap. Paterno
                            <input id="txt_appaterno" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Ap. Materno
                            <input id="txt_apmaterno" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            Sexo
                            <div class="form-control">
                                <label class="radio-inline">
                                    <input type="radio" name="rad_sexo" value="M" />Mas.
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="rad_sexo" value="F" />Fem.
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            Estado Civil
                            <select id="sel_estadocivil" class="form-control input-sm"></select>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            Fecha Nacimiento
                            <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                <input id="txt_fecnac" type="text" class="form-control input-sm" placeholder="" data-mask="99/99/9999" size="16" />
                                <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8">
                        <div class="form-group">
                            Dirección
                            <input id="txt_direccion" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Localidad
                            <input id="txt_localidad" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3">
                        <div class="form-group">
                            Max. Credito
                            <div class="input-group">
                                <span class="input-group-addon">S/.</span>
                                <input id="txt_credito" class="form-control input-sm" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            Max. Credito
                            <div class="input-group">
                                <span class="input-group-addon">Dias</span>
                                <input id="txt_diacredito" class="form-control input-sm" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            Tipo Descuento
                            <select id="sel_tipodscto" class="form-control input-sm">
                                <option value="0">Seleccione</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            Tipo Cliente
                            <select id="sel_tipocliente" class="form-control input-sm"></select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <table id="tbl_contacto" class="table table-bordered table-padding-2 table-input-11">
                            <thead>
                                <tr>
                                    <th>Contacto</th>
                                    <th>Cargo</th>
                                    <th>Telefono</th>
                                    <th>Celular</th>
                                    <th>Email</th>
                                    <th>Venta</th>
                                    <th style="display:none">Nota</th>
                                    <th>
                                        <button id="btn_add_contacto" class="btn btn-success btn-xs"><i class="icon-plus"></i></button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
                <button id="btn_guardar" type="button" class="btn btn-primary">GUARDAR</button>
            </div>
        </div>
    </div>
</div>

<div id="pnl_cliente_nota" aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                <h4 class="modal-title">Cliente: Notas</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="form-group">
                            <input id="txt_nota" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                </div>
                <button id="btn_nota_guardar" type="button" class="btn btn-primary">GUARDAR</button>
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