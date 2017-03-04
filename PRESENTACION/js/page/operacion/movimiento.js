function fc_listar_tipo_movimiento() {
    //Lista Data Inicial
    $.ajax({
        type: "POST",
        url: "page/operacion/movimiento.aspx/ListaInicialWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () {
            $('#sel_bus_movimiento').empty();
            $("#pnl_busqueda :input").attr("disabled", true);
        },
        success: function (data, status) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $('#sel_bus_movimiento').append("<option value='0'>Todos</option>");
            $('#sel_movimiento').append("<option value='0'>Seleccione</option>");

            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_bus_movimiento').append("<option value='" + data.d.Resultado[i].ID_TIPO_MOVIMIENTO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
                $('#sel_movimiento').append("<option value='" + data.d.Resultado[i].ID_TIPO_MOVIMIENTO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            $("#pnl_busqueda :input").removeAttr("disabled");
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
}

/*Variables Locales*/
var inputNota;

/*Inicializar Script*/
$(function () {
    $(document).prop("title", "LV::Movimiento");
    $(document).unbind("keydown");

    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    });

    fc_listar_tipo_movimiento();

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
        url: "page/operacion/movimiento.aspx/ListaMovimientosWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            tipo: $("#sel_bus_movimiento").val(), fechaini: $("#txt_bus_fechainicio").val(), fechafin: $("#txt_bus_fechafin").val()
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

            var htmlBotones = '<button name="editar" class="btn btn-primary btn-xs"><i class="icon-pencil"></i></button> ' +
                                '<button name="anular" class="btn btn-danger btn-xs"><i class="icon-trash "></i></button> ';

            var html = '';
            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td style="display:none">' + data.d.Resultado[i].ID_MOVIMIENTO + '</td>';
                html += '<td>' + htmlBotones + '</td>';
                html += '<td>' + data.d.Resultado[i].DESCRIPCION + '</td>';
                html += '<td>' + data.d.Resultado[i].MONTO + '</td>';
                html += '<td>' + formatDate(parseDateServer(data.d.Resultado[i].FECHA_INI), "dd/MM/yyyy") + '</td>';
                html += '<td>' + data.d.Resultado[i].OBSERVACION + '</td></tr>';
            }

            $("#tbl_movimiento tbody").append(html);

            $("#tbl_movimiento button").click(function () {
                if ($(this).attr("name") == "editar") {
                    $('#pnl_movimiento .modal-title').html('Editar Movimiento');

                    $.ajax({
                        type: "POST",
                        url: "page/operacion/movimiento.aspx/ObtenerMovimientoWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ idMovimiento: $(this).parent().parent().find("td").eq(0).html() }),
                        async: true,
                        beforeSend: function () {
                            $("#errorMovimiento").html('');
                            $("#tbl_movimiento button").attr("disabled", true);
                        },
                        success: function (data) {
                            $("#tbl_movimiento button").removeAttr("disabled");

                            if (data.d.error) {
                                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                                return;
                            }

                            $("#txh_idmovimiento").val(data.d.Resultado[0].ID_MOVIMIENTO);
                            $("#sel_movimiento").val(data.d.Resultado[0].ID_TIPO_MOVIMIENTO);
                            $("#txt_fecha").val(formatDate(parseDateServer(data.d.Resultado[0].FECHA_INI), "dd/MM/yyyy"));
                            $("#txt_monto").val(data.d.Resultado[0].MONTO);
                            $("#txt_observacion").val(data.d.Resultado[0].OBSERVACION);

                            $("#pnl_movimiento").modal('show');
                        },
                        error: function (data) {
                            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                            $("#tbl_movimiento button").removeAttr("disabled");
                        }
                    });
                    event.preventDefault();
                } else if ($(this).attr("name") == "anular") {
                    if (confirm("¿Esta seguro de anular movimiento?")) {
                        $.ajax({
                            type: "POST",
                            url: "page/operacion/movimiento.aspx/AnularMovimientoWM",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ idMovimiento: $(this).parent().parent().find("td").eq(0).html() }),
                            async: true,
                            beforeSend: function () {
                                $("#tbl_movimiento button").attr("disabled", true);
                            },
                            success: function (data) {
                                $("#tbl_movimiento button").removeAttr("disabled");

                                if (!data.d.Activo) {
                                    $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                                    return;
                                }

                                $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                                $("#btn_buscar").click();
                            },
                            error: function (data) {
                                $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                                $("#tbl_movimiento button").removeAttr("disabled");
                            }
                        });
                        event.preventDefault();
                    }
                }
            });

            $("#tbl_auto tbody tr").dblclick(function () {
                fc_editar_auto($(this).children(0).html());
                event.preventDefault();
            });
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
        case 76: //LIMPIAR
            if (evt ? evt.altKey : event.altKey) $("#btn_limpiar").click();
            break;
        case 78: //NUEVO
            if (evt ? evt.altKey : event.altKey) $("#btn_nuevo").click();
            break;
        case 71: //GUARDAR
            if (evt ? evt.altKey : event.altKey) {
                if ($("#pnl_movimiento").css('display') == 'block') {
                    $("#btn_guardar").click();
                }
            }
            break;
    }
});

$("#btn_limpiar").click(function () {
    $("#errorDiv").html('');
    $("#pnl_busqueda input:text").val('');
    $("#pnl_busqueda select").val('0');
    $("#sel_bus_movimiento").focus();
});

$("#btn_nuevo").click(function () {
    $("#errorMovimiento").html('');
    $('#pnl_movimiento .modal-title').html('Registrar Movimiento');
    $("#txh_idmovimiento").val('0');
    $("#pnl_movimiento select").val('0');
    $("#pnl_movimiento input:text").val('');
    $("#pnl_movimiento").modal('show');
});

$("#pnl_busqueda input:text").keyup(function (e) {
    if (e.keyCode == 13) {
        $("#btn_buscar").click();
    }
});

$("#btn_guardar").click(function () {
    $("#errorMovimiento").html('');

    if ($("#sel_movimiento").val() == "0") {
        $("#errorMovimiento").html(GenerarAlertaWarning("Tipo de Movimiento: seleccionar una opción"));
        $("#sel_movimiento").focus();
        return;
    } else if (isNaN($("#txt_monto").val()) != $("#txt_monto").val() =="") {
        $("#errorMovimiento").html(GenerarAlertaWarning("Monto: solo permite números"));
        $("#txt_monto").focus();
        return;
    } else  if (isDate($("#txt_fecha").val(), "dd/MM/yyyy") == false) {
        $("#errorMovimiento").html(GenerarAlertaWarning("Fecha: campo invalido"));
        $("#txt_fecha").focus();
        return;
    }
        var eMovimiento = {
            ID_MOVIMIENTO: $("#txh_idmovimiento").val() == "" ? 0 : $("#txh_idmovimiento").val(),
            FECHA_INI: getDateFromFormat($("#txt_fecha").val(), "dd/MM/yyyy"),
            MONTO: $("#txt_monto").val(),
            ID_TIPO_MOVIMIENTO: $("#sel_movimiento").val(),
            OBSERVACION: $("#txt_observacion").val()
        };

        $.ajax({
            type: "POST",
            url: "page/operacion/movimiento.aspx/ActualizarMovimientosWM",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ eMovimiento: eMovimiento }),
            async: true,
            beforeSend: function () {
                $("#btn_guardar").attr("disabled", true);
            },
            success: function (data) {
                $("#btn_guardar").removeAttr("disabled");

                if (!data.d.Activo) {
                    $("#errorMovimiento").html(GenerarAlertaError(data.d.Mensaje));
                    return;
                }

                $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                $("#pnl_movimiento").modal('hide');
                $("#btn_buscar").click();
            },
            error: function (data) {
                $("#errorMovimiento").html(GenerarAlertaError("Inconveniente en la operación"));
                $("#btn_guardar").removeAttr("disabled");
            }
        });
        event.preventDefault();
    });