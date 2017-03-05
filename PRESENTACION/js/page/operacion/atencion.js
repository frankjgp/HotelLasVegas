/*Inicializar Script*/
$(function () {
    $(document).prop("title", "LV::Atención");
    $(document).unbind("keydown");

    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    }).on('changeDate', function () {
        var input = $(this).find('input:text');
        if (input.attr('id') == 'txt_fechainicio' || input.attr('id') == 'txt_fechafin') {
            $('#pnl_habitacion').hide();
        }
    });

    //Lista Data Inicial
    $.ajax({
        type: "POST",
        url: "page/operacion/atencion.aspx/ListaInicialWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () {
            $('#sel_bus_tipo').empty();
            $('#sel_tipo').empty();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $('#sel_bus_tipo').append("<option value='0'>Todos</option>");
            $('#sel_tipo').append("<option value='0'>Todos</option>");
            for (var i = 0; i < data.d.Resultado.listaTipo.length; i++) {
                $('#sel_bus_tipo').append("<option value='" + data.d.Resultado.listaTipo[i].ID_TIPO_HABITACION + "'>" + data.d.Resultado.listaTipo[i].DESCRIPCION + "</option>");
                $('#sel_tipo').append("<option value='" + data.d.Resultado.listaTipo[i].ID_TIPO_HABITACION + "'>" + data.d.Resultado.listaTipo[i].DESCRIPCION + "</option>");
            }

            $('#sel_tiporeserva').append("<option value='0'>Seleccione</option>");
            for (var i = 0; i < data.d.Resultado.listaTipoReserva.length; i++) {
                $('#sel_tiporeserva').append("<option value='" + data.d.Resultado.listaTipoReserva[i].ID_TIPO_RESERVA + "'>" + data.d.Resultado.listaTipoReserva[i].DESCRIPCION + "</option>");
            }

            $('#sel_mediopago').append("<option value='0'>Seleccione</option>");
            for (var i = 0; i < data.d.Resultado.listaMedioPago.length; i++) {
                $('#sel_mediopago').append("<option value='" + data.d.Resultado.listaMedioPago[i].ID_MEDIO_PAGO + "'>" + data.d.Resultado.listaMedioPago[i].DESCRIPCION + "</option>");
            }

            $("#txt_bus_fechainicio").val(data.d.Resultado.fechaInicio);
            $("#txt_bus_fechainicio").parent().datepicker("update", $("#txt_bus_fechainicio").val());
            $("#txt_bus_fechafin").val(data.d.Resultado.fechaFin);
            $("#txt_bus_fechafin").parent().datepicker("update", $("#txt_bus_fechafin").val());

            $("#txt_fechainicio").val(data.d.Resultado.fechaInicio);
            $("#txt_fechainicio").parent().datepicker("update", $("#txt_fechainicio").val());
            $("#txt_fechafin").val(data.d.Resultado.fechaFin);
            $("#txt_fechafin").parent().datepicker("update", $("#txt_fechafin").val());
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
});

/*Eventos definidos*/
function fc_calcular_total() {
    var fechaInicio = getDateFromFormat($('#txt_fechainicio').val(), "dd/MM/yyyy");
    var fechaFin = getDateFromFormat($('#txt_fechafin').val(), "dd/MM/yyyy");
    var dias = Math.floor((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24)) + 1;
    var precio = parseFloat($('#txt_precio').val() == "" || isNaN($('#txt_precio').val()) ? "0" : $('#txt_precio').val());
    $('#txt_total').val(toDecimal(precio * dias, 2));
}

function fc_obtener_reserva(idReserva) {
    $.ajax({
        type: "POST",
        url: "page/operacion/reserva.aspx/ObtenerReservaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ idReserva: idReserva }),
        async: true,
        beforeSend: function () {
            $("#errorAtencion").html('');
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $("#txh_idreserva").val(data.d.Resultado.ID_RESERVA);
            $("#txh_idhabitacion").val(data.d.Resultado.ID_HABITACION);
            $("#txh_idcliente").val(data.d.Resultado.ID_CLIENTE);

            $("#txt_fechainicio").val(formatDate(parseDateServer(data.d.Resultado.FEC_INI), "dd/MM/yyyy"));
            $("#txt_fechainicio").parent().datepicker("update", $("#txt_fechainicio").val());
            $("#txt_fechafin").val(formatDate(parseDateServer(data.d.Resultado.FEC_FIN), "dd/MM/yyyy"));
            $("#txt_fechafin").parent().datepicker("update", $("#txt_fechafin").val());

            $("#txt_nrocliente").val(data.d.Resultado.NUM_CLIENTE);
            $("#txt_nomcliente").val(data.d.Resultado.NOM_CLIENTE);
            $("#txt_habitacion").val(data.d.Resultado.NUM_HABITACION + ' (' + data.d.Resultado.TIPO_HABITACION + ')');
            $("#txt_precio").val(data.d.Resultado.PRECIO_HAB);
            $("#txt_total").val(data.d.Resultado.TOTAL_HAB);
            $("#sel_tiporeserva").val(data.d.Resultado.ID_TIPO_RESERVA);
            $("#txt_adelanto").val(data.d.Resultado.ADELANTO);
            $("#sel_mediopago").val(data.d.Resultado.ID_MEDIO_PAGO);
            $("#txt_observacion").val(data.d.Resultado.OBSERVACION);

            $("#txt_clientereserva").val(data.d.Resultado.NOM_CLIENTE);
            $("#txt_detallereserva").val('Fec.Inicio: ' + $("#txt_fechainicio").val() + ' / Adelanto: ' + $("#txt_adelanto").val());

            $("#txt_clientereserva").prop('disabled', true);
            $("#btn_buscar_reserva").children().attr('class', 'icon-remove');

            $("#txt_nrocliente").prop('disabled', true);
            $("#txt_nomcliente").prop('disabled', true);
            $("#btn_buscar_cliente").prop('disabled', true);
            $("#btn_buscar_cliente").children().attr('class', 'icon-remove');


            $("#pnl_reserva").hide();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
}

function fc_editar_atencion(idAtencion) {
    $('#pnl_atencion .modal-title').html('Editar Atención');

    $.ajax({
        type: "POST",
        url: "page/operacion/atencion.aspx/ObtenerAtencionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ idAtencion: idAtencion }),
        async: true,
        beforeSend: function () {
            $("#errorAtencion").html('');
            $("#tbl_atencion button").attr("disabled", true);
        },
        success: function (data) {
            $("#tbl_atencion button").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $('#txh_idreserva').parent().parent().parent().parent().hide();
            $("#txh_idatencion").val(data.d.Resultado.ID_ATENCION);
            $("#txh_idhabitacion").val(data.d.Resultado.ID_HABITACION);
            $("#txh_idcliente").val(data.d.Resultado.ID_CLIENTE);

            $("#txt_fechainicio").val(formatDate(parseDateServer(data.d.Resultado.FEC_INI), "dd/MM/yyyy"));
            $("#txt_fechainicio").parent().datepicker("update", $("#txt_fechainicio").val());
            $("#txt_fechafin").val(formatDate(parseDateServer(data.d.Resultado.FEC_FIN), "dd/MM/yyyy"));
            $("#txt_fechafin").parent().datepicker("update", $("#txt_fechafin").val());

            $("#txt_nrocliente").val(data.d.Resultado.NUM_CLIENTE);
            $("#txt_nomcliente").val(data.d.Resultado.NOM_CLIENTE);
            $("#txt_habitacion").val(data.d.Resultado.NUM_HABITACION + ' (' + data.d.Resultado.TIPO_HABITACION + ')');
            $("#txt_precio").val(data.d.Resultado.PRECIO_HAB);
            $("#txt_total").val(data.d.Resultado.TOTAL_HAB);
            $("#sel_tiporeserva").val(data.d.Resultado.ID_TIPO_RESERVA);
            $("#txt_adelanto").val(data.d.Resultado.ADELANTO);
            $("#sel_mediopago").val(data.d.Resultado.ID_MEDIO_PAGO);
            $("#txt_observacion").val(data.d.Resultado.OBSERVACION);

            $("#txt_nrocliente").prop('disabled', true);
            $("#txt_nomcliente").prop('disabled', true);
            $("#btn_buscar_cliente").children().attr('class', 'icon-remove');

            $('#pnl_reserva').hide();
            $('#pnl_habitacion').hide();
            $('#pnl_cliente').hide();
            $("#pnl_atencion").modal('show');
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#tbl_atencion button").removeAttr("disabled");
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
                if ($("#pnl_atencion").css('display') == 'block') {
                    $("#btn_guardar").click();
                }
            }
            break;
    }
});

$("#btn_limpiar").click(function () {
    $("#errorDiv").html('');
    $("#sel_bus_tipo").val('0');
    $("#txt_bus_nocliente").val('');
});

$("#btn_nuevo").click(function () {
    $("#errorDiv").html('');
    $("#errorAtencion").html('');
    $('#pnl_atencion .modal-title').html('Nueva Atención');
    $("#txh_idatencion").val('0');
    $("#txh_idreserva").val('0');
    $("#txh_idhabitacion").val('0');
    $("#txh_idcliente").val('0');

    $("#txt_clientereserva").val('');
    $("#txt_detallereserva").val('');

    $("#txt_nrocliente").val('');
    $("#txt_nomcliente").val('');
    $("#txt_habitacion").val('');
    $("#txt_precio").val('');
    $("#sel_tiporeserva").val('0');
    $("#txt_adelanto").val('');
    $("#txt_total").val('');
    $("#sel_mediopago").val('0');
    $("#txt_observacion").val('');

    $("#txt_clientereserva").prop('disabled', false);
    $("#btn_buscar_reserva").children().attr('class', 'icon-search');

    $("#txt_nrocliente").prop('disabled', false);
    $("#txt_nomcliente").prop('disabled', false);
    $("#btn_buscar_cliente").children().attr('class', 'icon-search');

    $('#txh_idreserva').parent().parent().parent().parent().show();
    $('#pnl_reserva').hide();
    $('#pnl_habitacion').hide();
    $('#pnl_cliente').hide();
    $("#pnl_atencion").modal('show');

});

$("#sel_bus_tipo").change(function () {
    $("#btn_buscar").click();
});

$("#pnl_busqueda input:text").keyup(function (e) {
    if (e.keyCode == 13) {
        $("#btn_buscar").click();
    }
});

$("#btn_buscar").click(function () {
    $.ajax({
        type: "POST",
        url: "page/operacion/atencion.aspx/BuscarAtencionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            fechaInicio: $("#txt_bus_fechainicio").val(), fechaFin: $("#txt_bus_fechafin").val(),
            idTipo: $("#sel_bus_tipo").val(), nocliente: $("#txt_bus_nocliente").val()
        }),
        async: true,
        beforeSend: function () {
            $("#btn_buscar").attr("disabled", true);
        },
        success: function (data) {
            $("#btn_buscar").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $('#tbl_atencion tbody').empty();

            var htmlBotones = '<button name="editar" title="Editar" class="btn btn-primary btn-xs"><i class="icon-pencil"></i></button> ' +
                                '<button name="anular" title="Anular" class="btn btn-danger btn-xs"><i class="icon-trash"></i></button> ' +
                                '<button name="terminado" title="Terminar" class="btn btn-success btn-xs"><i class="icon-thumbs-up"></i></button>';
            var html = '';
            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td style="display:none">' + data.d.Resultado[i].ID_ATENCION + '</td>';
                html += '<td>' + (data.d.Resultado[i].ESTADO == 1 ? htmlBotones : '') + '</td>';
                html += '<td>' + data.d.Resultado[i].NUM_HABITACION + '</td>';
                html += '<td>' + data.d.Resultado[i].TIPO_HABITACION + '</td>';
                html += '<td>' + formatDate(parseDateServer(data.d.Resultado[i].FEC_INI), "dd/MM/yyyy") + '</td>';
                html += '<td>' + formatDate(parseDateServer(data.d.Resultado[i].FEC_FIN), "dd/MM/yyyy") + '</td>';
                html += '<td>' + data.d.Resultado[i].NOM_CLIENTE + '</td>';
                html += '<td>' + data.d.Resultado[i].PRECIO_HAB + '</td>';
                html += '<td>' + data.d.Resultado[i].ADELANTO + '</td>';
                html += '<td>' + (data.d.Resultado[i].ID_RESERVA > 0 ? '<span class="label label-info label-mini">Reserva</span>' : '') + '</td>';
                html += '<td>' + data.d.Resultado[i].DSC_ESTADO + '</td></tr>';
            }

            $("#tbl_atencion tbody").append(html);

            $("#tbl_atencion button").click(function () {
                if ($(this).attr("name") == "editar") {
                    fc_editar_atencion($(this).parent().parent().children(0).html());
                    event.preventDefault();
                } else if ($(this).attr("name") == "anular") {
                    if (confirm("¿Esta seguro de anular atención?")) {
                        $.ajax({
                            type: "POST",
                            url: "page/operacion/atencion.aspx/AnularAtencionWM",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ idAtencion: $(this).parent().parent().children(0).html() }),
                            async: true,
                            beforeSend: function () {
                                $("#tbl_atencion button").attr("disabled", true);
                            },
                            success: function (data) {
                                $("#tbl_atencion button").removeAttr("disabled");

                                if (!data.d.Activo) {
                                    $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                                    return;
                                }

                                $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                                $("#btn_buscar").click();
                            },
                            error: function (data) {
                                $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                                $("#tbl_atencion button").removeAttr("disabled");
                            }
                        });
                        event.preventDefault();
                    }
                } else if ($(this).attr("name") == "terminado") {
                    if (confirm("¿Esta seguro de terminar atención?")) {
                        $.ajax({
                            type: "POST",
                            url: "page/operacion/atencion.aspx/TerminarAtencionWM",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ idAtencion: $(this).parent().parent().children(0).html() }),
                            async: true,
                            beforeSend: function () {
                                $("#tbl_atencion button").attr("disabled", true);
                            },
                            success: function (data) {
                                $("#tbl_atencion button").removeAttr("disabled");

                                if (!data.d.Activo) {
                                    $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                                    return;
                                }

                                $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                                $("#btn_buscar").click();
                            },
                            error: function (data) {
                                $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                                $("#tbl_atencion button").removeAttr("disabled");
                            }
                        });
                        event.preventDefault();
                    }
                }
            });
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_buscar").removeAttr("disabled");
        }
    });
});


$("#txt_clientereserva").keyup(function (e) {
    if (e.keyCode == 13) {
        $("#btn_buscar_reserva").click();
    }
});

$("#btn_buscar_reserva").click(function () {
    if ($("#btn_buscar_reserva").children().attr('class') == 'icon-remove') {
        $("#btn_nuevo").click();
        return;
    }

    $.ajax({
        type: "POST",
        url: "page/operacion/atencion.aspx/BuscarReservaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            nocliente: $("#txt_clientereserva").val()
        }),
        async: true,
        beforeSend: function () {
            $("#btn_buscar_reserva").attr("disabled", true);
        },
        success: function (data) {
            $("#btn_buscar_reserva").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorAtencion").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $('#tbl_reserva tbody').empty();

            var html = '';
            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td style="display:none">' + data.d.Resultado[i].ID_RESERVA + '</td>';
                html += '<td>' + data.d.Resultado[i].NOM_CLIENTE + '</td>';
                html += '<td>' + data.d.Resultado[i].NUM_HABITACION + '</td>';
                html += '<td>' + formatDate(parseDateServer(data.d.Resultado[i].FEC_INI), "dd/MM/yyyy") + '</td>';
                html += '<td>' + formatDate(parseDateServer(data.d.Resultado[i].FEC_FIN), "dd/MM/yyyy") + '</td></tr>';
            }

            $("#tbl_reserva tbody").append(html);

            $("#tbl_reserva tbody tr").dblclick(function () {
                var fila = $(this).find('td');
                fc_obtener_reserva(fila.eq(0).html());
                event.preventDefault();
            });

            $('#pnl_reserva').show();
        },
        error: function (data) {
            $("#errorAtencion").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_buscar_reserva").removeAttr("disabled");
        }
    });
});


$("#sel_tipo").change(function () {
    $('#pnl_habitacion').hide();
});

$("#btn_buscar_habitacion").click(function () {
    $.ajax({
        type: "POST",
        url: "page/operacion/atencion.aspx/BuscarHabitacionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            fechaInicio: $("#txt_fechainicio").val(), fechaFin: $("#txt_fechafin").val(), idTipo: $("#sel_tipo").val()
        }),
        async: true,
        beforeSend: function () {
            $('#txh_idhabitacion').val('0');
            $('#txt_habitacion').val('');
            $('#txt_precio').val('');
            $("#btn_buscar_habitacion").prop('disabled', true);
        },
        success: function (data) {
            $("#btn_buscar_habitacion").removeAttr('disabled');

            if (!data.d.Activo) {
                $("#errorAtencion").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $('#tbl_habitacion tbody').empty();
            var html = '';
            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td style="display:none">' + data.d.Resultado[i].ID_HABITACION + '</td>';
                html += '<td>' + data.d.Resultado[i].NUMERO + '</td>';
                html += '<td>' + data.d.Resultado[i].TIPOHABITACION.DESCRIPCION + '</td>';
                html += '<td>' + data.d.Resultado[i].PRECIO + '</td>';
                html += '<td>' + data.d.Resultado[i].DSC_ESTADO + '</td></tr>';
            }

            $("#tbl_habitacion tbody").append(html);

            $("#tbl_habitacion tbody tr").dblclick(function () {
                var fila = $(this).find('td');
                $('#txh_idhabitacion').val(fila.eq(0).html());
                $('#txt_habitacion').val(fila.eq(1).html() + ' (' + fila.eq(2).html() + ')');
                $('#txt_precio').val(fila.eq(3).html());
                fc_calcular_total();
                $('#pnl_habitacion').hide();
                event.preventDefault();
            });

            $('#pnl_habitacion').show();
        },
        error: function (data) {
            $("#errorAtencion").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_buscar_habitacion").removeAttr('disabled');
        }
    });
});

$("#txt_precio").keyup(function (e) {
    fc_calcular_total();
});

$("#txt_nrocliente,#txt_nomcliente").keyup(function (e) {
    if (e.keyCode == 13) {
        $("#btn_buscar_cliente").click();
    }
});

$("#btn_buscar_cliente").click(function () {
    if ($("#btn_buscar_cliente").children().attr('class') == 'icon-remove') {
        $("#txh_idcliente").val('0');
        $("#txt_nrocliente").val('');
        $("#txt_nomcliente").val('');
        $("#txt_nrocliente").prop('disabled', false);
        $("#txt_nomcliente").prop('disabled', false);
        $("#btn_buscar_cliente").children().attr('class', 'icon-search');
        return;
    }

    $.ajax({
        type: "POST",
        url: "page/operacion/atencion.aspx/BuscarClienteWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            numero: $("#txt_nrocliente").val(), nombre: $("#txt_nomcliente").val()
        }),
        async: true,
        beforeSend: function () {
            $("#btn_buscar_cliente").attr("disabled", true);
            $('#tbl_cliente tbody').empty();
        },
        success: function (data) {
            $("#btn_buscar_cliente").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorAtencion").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            var html = '';
            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td style="display:none">' + data.d.Resultado[i].ID_CLIENTE + '</td>';
                html += '<td>' + data.d.Resultado[i].DESCRIPCION + '</td>';
                html += '<td>' + data.d.Resultado[i].NUM_DOCUMENTO + '</td>';
                html += '<td>' + data.d.Resultado[i].NOMBRES + '</td></tr>';
            }

            $("#tbl_cliente tbody").append(html);

            $("#tbl_cliente tbody tr").dblclick(function () {
                var fila = $(this).find('td');
                $("#txh_idcliente").val(fila.eq(0).html());
                $("#txt_nrocliente").val(fila.eq(2).html());
                $("#txt_nomcliente").val(fila.eq(3).html());
                $("#txt_nrocliente").prop('disabled', true);
                $("#txt_nomcliente").prop('disabled', true);
                $("#btn_buscar_cliente").children().attr('class', 'icon-remove');
                $('#pnl_cliente').hide();
                event.preventDefault();
            });

            $('#pnl_cliente').show();
        },
        error: function (data) {
            $("#errorAtencion").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_buscar_cliente").removeAttr("disabled");
        }
    });
});

$("#btn_guardar").click(function () {
    $("#errorAtencion").html('');

    if ($("#txh_idhabitacion").val() == "" || $("#txh_idhabitacion").val() == "0") {
        $("#errorAtencion").html(GenerarAlertaWarning("Habitacion: seleccione un registro"));
        return;
    } else if ($("#txh_idcliente").val() == "" || $("#txh_idcliente").val() == "0") {
        $("#errorAtencion").html(GenerarAlertaWarning("Cliente: seleccione un registro"));
        $("#txt_nrocliente").focus();
        return;
    } else if ($("#txt_precio").val() == "" || isNaN($("#txt_precio").val())) {
        $("#errorAtencion").html(GenerarAlertaWarning("Precio: ingresar monto valido"));
        $("#txt_precio").focus();
        return;
    } else if ($("#sel_tiporeserva").val() == null || $("#sel_tiporeserva").val() == "0") {
        $("#errorAtencion").html(GenerarAlertaWarning("Tipo Reserva: seleccione una opción"));
        $("#sel_tiporeserva").focus();
        return;
    } else if ($("#txt_adelanto").val() == "" || isNaN($("#txt_adelanto").val())) {
        $("#errorAtencion").html(GenerarAlertaWarning("Adelanto: ingresar monto valido"));
        $("#txt_adelanto").focus();
        return;
    } else if ($("#sel_mediopago").val() == null || $("#sel_mediopago").val() == "0") {
        $("#errorAtencion").html(GenerarAlertaWarning("Medio Pago: seleccione una opción"));
        $("#sel_mediopago").focus();
        return;
    }

    var eAtencion = {
        ID_ATENCION: $("#txh_idatencion").val() == "" ? 0 : $("#txh_idatencion").val(),
        ID_RESERVA: $("#txh_idreserva").val() == "" ? 0 : $("#txh_idreserva").val(),
        ID_CLIENTE: $("#txh_idcliente").val(),
        ID_HABITACION: $("#txh_idhabitacion").val(),
        FEC_INI: getDateFromFormat($("#txt_fechainicio").val(), 'dd/MM/yyyy'),
        FEC_FIN: getDateFromFormat($("#txt_fechafin").val(), 'dd/MM/yyyy'),
        ID_TIPO_RESERVA: $("#sel_tiporeserva").val(),
        ADELANTO: ($("#txt_adelanto").val() == "" ? 0 : $("#txt_adelanto").val()),
        PRECIO_HAB: ($("#txt_precio").val() == "" ? 0 : $("#txt_precio").val()),
        TOTAL_HAB: ($("#txt_total").val() == "" ? 0 : $("#txt_total").val()),
        ID_MEDIO_PAGO: $("#sel_mediopago").val(),
        OBSERVACION: $("#txt_observacion").val()
    };

    $.ajax({
        type: "POST",
        url: "page/operacion/atencion.aspx/GuardarAtencionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ eAtencion: eAtencion }),
        async: true,
        beforeSend: function () {
            $("#btn_guardar").attr("disabled", true);
        },
        success: function (data) {
            $("#btn_guardar").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorAtencion").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
            $("#pnl_atencion").modal('hide');
            $("#btn_buscar").click();
        },
        error: function (data) {
            $("#errorAtencion").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_guardar").removeAttr("disabled");
        }
    });
    event.preventDefault();
});