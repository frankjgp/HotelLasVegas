/*Variables Locales*/
var inputNota;

/*Inicializar Script*/
$(function () {
    $(document).prop("title", "LV::Alerttas");
    $(document).unbind("keydown");

    fc_listar_reservas();
    fc_listar_habitaciones();
});

function fc_listar_reservas() {
    $.ajax({
        type: "POST",
        url: "page/operacion/alerta.aspx/ListaReservasVencerWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () {
            $('#tbl_movimiento tbody').empty();
        },
        success: function (data) {

            if (data.d.error) {
                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                return;
            }

            var html = '';

            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td>' + formatDate(parseDateServer(data.d.Resultado[i].FECHA_INI), "dd/MM/yyyy hh:mm") + '</td>';
                html += '<td>' + formatDate(parseDateServer(data.d.Resultado[i].FECHA_FIN), "dd/MM/yyyy hh:mm") + '</td>';
                html += '<td>' + data.d.Resultado[i].ADELANTO + '</td>';
                html += '<td>' + data.d.Resultado[i].MONTO + '</td></tr>';
            }

            $("#tbl_movimiento tbody").append(html);
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
}

function fc_listar_habitaciones() {
    $.ajax({
        type: "POST",
        url: "page/operacion/alerta.aspx/ListaHabitacionesSalirWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () {
            $('#tbl_movimiento2 tbody').empty();
        },
        success: function (data) {

            if (data.d.error) {
                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                return;
            }

            var html = '';

            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td>' + data.d.Resultado[i].DESCRIPCION + '</td>';
                html += '<td>' + formatDate(parseDateServer(data.d.Resultado[i].FECHA_FIN), "dd/MM/yyyy hh:mm") + '</td>';
                html += '<td>' + data.d.Resultado[i].ADELANTO + '</td>';
                html += '<td>' + data.d.Resultado[i].MONTO + '</td></tr>';
            }

            $("#tbl_movimiento2 tbody").append(html);
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
}

/*Eventos por Control*/
$(document).keydown(function (evt) {
    switch (evt ? evt.which : event.keyCode) {
        case 8: //BLOQUEA RETROCESO DE PAGINA
            var valor = document.activeElement.value;
            if (valor == undefined) { return false; } break;
        case 13: //BLOQUEA ENTER
            return false; break;
    }
});
