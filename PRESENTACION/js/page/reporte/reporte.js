/*Variables Locales*/
var inputNota;

/*Inicializar Script*/
$(function () {
    $(document).prop("title", "LV::Reporte de Movimientos");
    $(document).unbind("keydown");

    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    });


    $(document).keyup(function (e) {
        if (e.keyCode == 13) {
            if ($(this).attr("id") == "pnl_busqueda") $("#btn_buscar").click();
            else $("#pnl_busqueda").focus();
        }
    });

    $("#btn_buscar").click(function () {
        fc_listar_movimiento();
    });

});

function fc_listar_movimiento() {
    $.ajax({
        type: "POST",
        url: "page/reporte/movimiento.aspx/ListaInicialWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            fechaini: $("#txt_bus_fechainicio").val(), fechafin: $("#txt_bus_fechafin").val()
        }),
        async: true,
        beforeSend: function () {
            $("#btn_buscar").attr("disabled", true);
            $('#tbl_movimiento tbody').empty();
        },
        success: function (data) {
            $("#btn_buscar").removeAttr("disabled");

            if (data.d.error) {
                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                return;
            }

            var html = '';
            var acuIngreso = 0.00;
            var acuSalida = 0.00;

            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td>' + data.d.Resultado[i].DESCRIPCION + '</td>';
                html += '<td>' + formatDate(parseDateServer(data.d.Resultado[i].FECHA_INI), "dd/MM/yyyy") + '</td>';
                html += '<td>' + data.d.Resultado[i].TIPO + '</td>';
                html += '<td>' + data.d.Resultado[i].MONTO + '</td></tr>';
                if (data.d.Resultado[i].TIPO.trim() == 'Ingreso') {
                    acuIngreso = acuIngreso + data.d.Resultado[i].MONTO;
                }else if(data.d.Resultado[i].TIPO.trim() == 'Salida') {
                    acuSalida = acuSalida + data.d.Resultado[i].MONTO;
                }
            }

            $("#txt_ingreso").val(acuIngreso.toString());
            $("#txt_salida").val(acuSalida.toString());
            $("#tbl_movimiento tbody").append(html);
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_buscar").removeAttr("disabled");
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
        case 66: //BUSCAR
            if (evt ? evt.altKey : event.altKey) $("#btn_buscar").click();
            break;
    }
});

$("#pnl_busqueda input:text").keyup(function (e) {
    if (e.keyCode == 13) {
        $("#btn_buscar").click();
    }
});
