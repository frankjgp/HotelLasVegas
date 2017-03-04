<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="alerta.aspx.cs" Inherits="PRESENTACION.page.operacion.alerta" %>

<div id="errorDiv"></div>
<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <div id="pnl_busqueda" class="panel-body">
                <h4 class="drg-event-title">ALERTA DE RESERVAS POR VENCER</h4>
                <table id="tbl_movimiento" class="table table-striped table-hover table-padding-2">
                    <thead>
                        <tr>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Adelanto</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</div>

<div class="row">
    <div class="col-lg-12">
        <section class="panel">
            <div id="pnl_busqueda2" class="panel-body">
                <h4 class="drg-event-title">ALERTA DE HABITACIONES POR SALIR</h4>
                <table id="tbl_movimiento2" class="table table-striped table-hover table-padding-2">
                    <thead>
                        <tr>
                            <th>Habitación</th>
                            <th>Fecha Fin</th>
                            <th>Adelanto</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</div>

<script type="text/javascript">
    $.getScript("js/page/operacion/alerta.js")
    .fail(function (jqxhr, settings, exception) {
        alert("Error: No se ha cargando un complemento del sistema (alerta.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
    });
</script>
