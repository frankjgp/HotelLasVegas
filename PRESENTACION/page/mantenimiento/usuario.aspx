<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="usuario.aspx.cs" Inherits="PRESENTACION.page.mantenimiento.usuario" %>

<div id="errorDiv"></div>
<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <header class="panel-heading">
                MANTENIMIENTO USUARIO
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
                    <div class="col-lg-3">
                        <div class="form-group">
                            Nombres
                            <input id="txt_bus_nombre" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            Apellidos
                            <input id="txt_bus_apellido" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                </div>
                <table id="tbl_empleado" class="table table-striped table-hover table-padding-2">
                    <thead>
                        <tr>
                            <th style="display: none"></th>
                            <th></th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Cargo</th>
                            <th>Sueldo</th>
                            <th>Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</div>

<input id="txh_idempleado" type="hidden" />
<input id="txh_idusuario" type="hidden" />
<input id="txh_acceso" type="hidden" />

<div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="pnl_empleado" class="modal fade">
    <div class="modal-dialog modal-medium-fgp">
        <div class="modal-content">
            <div class="modal-header">
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                <h4 class="modal-title">Registro Trabajador</h4>
            </div>
            <div class="modal-body">
                <div id="errorEmpleado"></div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            Nombres
                            <input id="txt_nombre" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="form-group">
                            Apellidos
                            <input id="txt_apellido" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8">
                        <div class="form-group">
                            Cargo
                            <input id="txt_cargo" class="form-control input-sm" type="text" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Sueldo
                            <div class="input-group">
                                <span class="input-group-addon">S/.</span>
                                <input id="txt_sueldo" class="form-control input-sm" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="border-head">
                            <label class="label_check" for="chk_usuario">
                                <input id="chk_usuario" value="1" type="checkbox" />REGISTRO USUARIO
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Usuario
                            <input id="txt_usuario" class="form-control input-sm" type="text" disabled="disabled" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Perfil
                            <select id="sel_perfil" class="form-control input-sm"></select>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            Estado
                            <select id="sel_estadousuario" class="form-control input-sm" disabled="disabled">
                                <option value="1" selected>Activo</option>
                                <option value="2">Desactivado</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="form-group">
                            Local
                            <div class="form-control input-sm">
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="rad_local" value="1" />Local 1
                                </label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="rad_local" value="2" />Local 2
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button id="btn_guardar" type="button" class="btn btn-primary">GUARDAR</button>
            </div>
        </div>
    </div>
</div>

<div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="pnl_acceso" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                <h4 class="modal-title">Acceso</h4>
            </div>
            <div class="modal-body">
                <div id="errorAcceso"></div>
                <table id="tbl_acceso" class="table table-padding-2 table-input-11">
                    <thead>
                        <tr>
                            <th>LISTA</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <button id="btn_acceso_guardar" type="button" class="btn btn-primary">GUARDAR</button>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $.getScript("js/page/mantenimiento/usuario.js")
    .fail(function (jqxhr, settings, exception) {
        alert("Error: No se ha cargando un complemento del sistema (usuario.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
    });
</script>
