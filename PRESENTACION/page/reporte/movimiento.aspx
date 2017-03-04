<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="movimiento.aspx.cs" Inherits="PRESENTACION.page.reporte.movimiento" %>

<div id="errorDiv"></div>
<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <header class="panel-heading">
                REPORTE DE
                INGRESOS Y EGRESOS
            </header>
            <div class="panel-body">
                <button id="btn_buscar" type="button" class="btn btn-info btn-sm">BUSCAR</button>
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
                            <th>Movimiento</th>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div class="col-lg-4">
                    <div class="form-group">
                        Total Ingreso:
                            <div class="input-group">
                                <span class="input-group-addon">S/.</span>
                                <input id="txt_ingreso" disabled="disabled" class="form-control input-sm" type="text" />
                            </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="form-group">
                        Total Salida: 
                        <div class="input-group">
                            <span class="input-group-addon">S/.</span>
                            <input id="txt_salida" disabled="disabled" class="form-control input-sm" type="text" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
</div>

<script type="text/javascript">
    $.getScript("js/page/reporte/reporte.js")
    .fail(function (jqxhr, settings, exception) {
        alert("Error: No se ha cargando un complemento del sistema (reporte.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
    });
</script>
