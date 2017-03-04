/*Inicializar Script*/
$(function () {
    $(document).prop("title", "LV::Habitación");
    $(document).unbind("keydown");

    //Lista Data Inicial
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/habitacion.aspx/ListaInicialWM",
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
            $('#sel_tipo').append("<option value='0'>Seleccione</option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_bus_tipo').append("<option value='" + data.d.Resultado[i].ID_TIPO_HABITACION + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
                $('#sel_tipo').append("<option value='" + data.d.Resultado[i].ID_TIPO_HABITACION + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
});

/*Eventos definidos*/
function fc_editar_habitacion(idHabitacion) {
    $('#pnl_habitacion .modal-title').html('Editar Habitación');

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/habitacion.aspx/ObtenerHabitacionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ idHabitacion: idHabitacion }),
        async: true,
        beforeSend: function () {
            $("#errorHabitacion").html('');
            $("#tbl_habitacion button").attr("disabled", true);
        },
        success: function (data) {
            $("#tbl_habitacion button").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $("#txh_idhabitacion").val(data.d.Resultado.ID_HABITACION);
            $("#txt_numero").val(data.d.Resultado.NUMERO);
            $("#txt_precio").val(data.d.Resultado.PRECIO);
            $("#sel_tipo").val(data.d.Resultado.TIPOHABITACION.ID_TIPO_HABITACION);
            $("#sel_estado").val(data.d.Resultado.ESTADO);

            $("#pnl_habitacion").modal('show');
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#tbl_habitacion button").removeAttr("disabled");
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
                if ($("#pnl_habitacion").css('display') == 'block') {
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
    $("#txt_bus_numero").focus();
});

$("#btn_nuevo").click(function () {
    $("#errorDiv").html('');
    $("#errorHabitacion").html('');
    $('#pnl_habitacion .modal-title').html('Registrar Habitación');
    $("#txh_idhabitacion").val('0');
    $("#pnl_habitacion select").val('0');
    $("#pnl_habitacion input:text").val('');
    $("#pnl_habitacion").modal('show');
    setTimeout('$("#txt_numero").focus()', 1000);
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
        url: "page/mantenimiento/habitacion.aspx/BuscarHabitacionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            numero: $("#txt_bus_numero").val(), idTipo: $("#sel_bus_tipo").val()
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

            $('#tbl_habitacion tbody').empty();

            var htmlBotones = '<td><button name="editar" class="btn btn-primary btn-xs"><i class="icon-pencil"></i></button>' +
                                '<button name="anular" class="btn btn-danger btn-xs"><i class="icon-trash "></i></button></td>';
            var html = '';
            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td style="display:none">' + data.d.Resultado[i].ID_HABITACION + '</td>' + htmlBotones;
                html += '<td>' + data.d.Resultado[i].NUMERO + '</td>';
                html += '<td>' + data.d.Resultado[i].TIPOHABITACION.DESCRIPCION + '</td>';
                html += '<td>' + data.d.Resultado[i].PRECIO + '</td>';
                html += '<td>' + data.d.Resultado[i].DSC_ESTADO + '</td></tr>';
            }

            $("#tbl_habitacion tbody").append(html);

            $("#tbl_habitacion button").click(function () {
                if ($(this).attr("name") == "editar") {
                    fc_editar_habitacion($(this).parent().parent().children(0).html());
                    event.preventDefault();
                } else if ($(this).attr("name") == "anular") {
                    if (confirm("¿Esta seguro de anular habitación?")) {
                        $.ajax({
                            type: "POST",
                            url: "page/mantenimiento/habitacion.aspx/AnularHabitacionWM",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ idHabitacion: $(this).parent().parent().children(0).html() }),
                            async: true,
                            beforeSend: function () {
                                $("#tbl_habitacion button").attr("disabled", true);
                            },
                            success: function (data) {
                                $("#tbl_habitacion button").removeAttr("disabled");

                                if (!data.d.Activo) {
                                    $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                                    return;
                                }

                                $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                                $("#btn_buscar").click();
                            },
                            error: function (data) {
                                $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                                $("#tbl_habitacion button").removeAttr("disabled");
                            }
                        });
                        event.preventDefault();
                    }
                }
            });

            $("#tbl_habitacion tbody tr").dblclick(function () {
                fc_editar_habitacion($(this).children(0).html());
                event.preventDefault();
            });
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_buscar").removeAttr("disabled");
        }
    });
});

$("#btn_guardar").click(function () {
    $("#errorHabitacion").html('');

    if ($("#txt_numero").val().trim() == "") {
        $("#errorHabitacion").html(GenerarAlertaWarning("Numero: ingresar campo"));
        $("#txt_numero").focus();
        return;
    } else if ($("#sel_tipo").val() == "0") {
        $("#errorHabitacion").html(GenerarAlertaWarning("Tipo: seleccione una opción"));
        $("#sel_tipo").focus();
        return;
    } else if ($("#txt_precio").val() == "" || isNaN($("#txt_precio").val())) {
        $("#errorHabitacion").html(GenerarAlertaWarning("Precio: ingresar monto valido"));
        $("#txt_precio").focus();
        return;
    } else if ($("#sel_estado").val() == "0") {
        $("#errorHabitacion").html(GenerarAlertaWarning("Estado: seleccione una opción"));
        $("#sel_estado").focus();
        return;
    }

    var eHabitacion = {
        ID_HABITACION: $("#txh_idhabitacion").val() == "" ? 0 : $("#txh_idhabitacion").val(),
        NUMERO: $("#txt_numero").val(),
        TIPOHABITACION: {
            ID_TIPO_HABITACION: $("#sel_tipo").val()
        },
        PRECIO: ($("#txt_precio").val() == "" ? 0 : $("#txt_precio").val()),
        ESTADO: $("#sel_estado").val(),
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/habitacion.aspx/GuardarHabitacionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ eHabitacion: eHabitacion }),
        async: true,
        beforeSend: function () {
            $("#btn_guardar").attr("disabled", true);
        },
        success: function (data) {
            $("#btn_guardar").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorHabitacion").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
            $("#pnl_habitacion").modal('hide');
            $("#btn_buscar").click();
        },
        error: function (data) {
            $("#errorHabitacion").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_guardar").removeAttr("disabled");
        }
    });
    event.preventDefault();
});