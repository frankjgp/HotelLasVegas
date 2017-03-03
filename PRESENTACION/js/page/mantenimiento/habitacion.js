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
            $('#sel_bus_modelo').empty();
            $('#sel_bus_submodelo').empty();
            $('#sel_modelo').empty();
            $('#sel_submodelo').empty();
        },
        success: function (data) {
            if (data.d.error) {
                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                return;
            }
            $('#sel_bus_submodelo').append("<option value='0'>Seleccione</option>");
            $('#sel_submodelo').append("<option value='0'>Seleccione</option>");

            $('#sel_bus_modelo').append("<option value='0'>Todos</option>");
            $('#sel_modelo').append("<option value='0'>Seleccione</option>");
            for (var i = 0; i < data.d.length; i++) {
                $('#sel_bus_modelo').append("<option value='" + data.d[i].nid_modelo_auto + "'>" + data.d[i].no_modelo_auto + "</option>");
                $('#sel_modelo').append("<option value='" + data.d[i].nid_modelo_auto + "'>" + data.d[i].no_modelo_auto + "</option>");
            }
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
});

/*Eventos definidos*/
function fc_obtener_submodelo(control, mensaje, index0, indexSel, modelo) {
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/habitacion.aspx/ObtenerSubModeloWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ modelo: modelo }),
        async: true,
        beforeSend: function () {
            $("#sel_" + control + "modelo").attr("disabled", true);
            $("#sel_" + control + "submodelo").attr("disabled", true);
        },
        success: function (data) {
            $("#sel_" + control + "modelo").removeAttr("disabled");
            $("#sel_" + control + "submodelo").removeAttr("disabled");

            if (data.d.error) {
                $("#error" + mensaje).html(GenerarAlertaError(data.d.error));
                return;
            }

            $('#sel_' + control + 'submodelo').append("<option value='0'>" + index0 + "</option>");
            for (var x = 0; x < data.d.length; x++) {
                $('#sel_' + control + 'submodelo').append("<option value='" + data.d[x].nid_submodelo_auto + "'>" + data.d[x].no_submodelo_auto + "</option>");
            }
            $('#sel_' + control + 'submodelo').val(indexSel);
        },
        error: function (data) {
            $("#error" + mensaje).html(GenerarAlertaError("Inconveniente en la operación"));
            $("#sel_" + control + "modelo").removeAttr("disabled");
            $("#sel_" + control + "submodelo").removeAttr("disabled");
        }
    });
}

function fc_editar_auto(idAuto) {
    $('#pnl_auto .modal-title').html('Editar Auto');

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/habitacion.aspx/ObtenerAutoWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ idAuto: idAuto }),
        async: true,
        beforeSend: function () {
            $("#errorAuto").html('');
            $("#tbl_auto button").attr("disabled", true);
        },
        success: function (data) {
            $("#tbl_auto button").removeAttr("disabled");

            if (data.d.error) {
                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                return;
            }

            $("#txh_idauto").val(data.d.nid_auto);
            $("#txt_placa").val(data.d.nu_placa.trim());
            $("#txt_kilometraje").val(data.d.nu_kilometraje);
            $("#txt_intervalo").val(data.d.nu_intervalo);
            $("#sel_modelo").val(data.d.nid_modelo_auto);
            $("#txh_idcliente").val(data.d.nid_cliente);
            $("#txt_nucliente").val(data.d.nu_cliente);
            $("#txt_nocliente").val(data.d.no_cliente);

            $("#sel_submodelo").empty();
            fc_obtener_submodelo("", "Auto", "Seleccione", data.d.nid_submodelo_auto, data.d.nid_modelo_auto);

            $("#pnl_auto").modal('show');
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#tbl_auto button").removeAttr("disabled");
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
                if ($("#pnl_auto").css('display') == 'block') {
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
    $("#txt_bus_placa").focus();
});

$("#btn_nuevo").click(function () {
    $("#errorAuto").html('');
    $('#pnl_auto .modal-title').html('Registrar Auto');
    $("#txh_idauto").val('0');
    $("#txh_idcliente").val('0');
    $("#pnl_auto select").val('0');
    $("#pnl_auto input:text").val('');
    $("#pnl_auto").modal('show');
    setTimeout('$("#txt_placa").focus()', 1000);
});

$("#sel_bus_modelo").change(function () {
    $('#sel_bus_submodelo').empty();

    if ($("#sel_bus_modelo").val() == "0") {
        $('#sel_bus_submodelo').append("<option value='0'>Seleccione</option>");
    } else {
        fc_obtener_submodelo("bus_", "Div", "Todos", 0, $("#sel_bus_modelo").val());
    }
});

$("#sel_modelo").change(function () {
    $('#sel_submodelo').empty();

    if ($("#sel_modelo").val() == "0") {
        $('#sel_submodelo').append("<option value='0'>Seleccione</option>");
    } else {
        fc_obtener_submodelo("", "Div", "Seleccione", 0, $("#sel_modelo").val());
    }
});

$("#pnl_busqueda input:text").keyup(function (e) {
    if (e.keyCode == 13) {
        $("#btn_buscar").click();
    }
});

$("#btn_buscar").click(function () {
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/habitacion.aspx/BuscarAutoWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            placa: $("#txt_bus_placa").val(), modelo: $("#sel_bus_modelo").val(), submodelo: $("#sel_bus_submodelo").val(),
            nuCliente: $("#txt_bus_nucliente").val(), noCliente: $("#txt_bus_nocliente").val()
        }),
        async: true,
        beforeSend: function () {
            $("#errorDiv").html('');
            $("#btn_buscar").attr("disabled", true);
        },
        success: function (data) {
            $("#btn_buscar").removeAttr("disabled");

            if (data.d.error) {
                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                return;
            }

            $('#tbl_auto tbody').empty();

            var htmlBotones = '<td><button name="editar" class="btn btn-primary btn-xs"><i class="icon-pencil"></i></button>' +
                                '<button name="anular" class="btn btn-danger btn-xs"><i class="icon-trash "></i></button></td>';
            var html = '';
            for (var i = 0; i < data.d.length; i++) {
                html += '<tr><td style="display:none">' + data.d[i].nid_auto + '</td>' + htmlBotones;
                html += '<td>' + data.d[i].nu_placa + '</td>';
                html += '<td>' + data.d[i].no_modelo_auto + '</td>';
                html += '<td>' + data.d[i].nu_kilometraje + '</td>';
                html += '<td>' + data.d[i].no_cliente + '</td></tr>';
            }

            $("#tbl_auto tbody").append(html);

            $("#tbl_auto button").click(function () {
                if ($(this).attr("name") == "editar") {
                    fc_editar_auto($(this).parent().parent().children(0).html());
                    event.preventDefault();
                } else if ($(this).attr("name") == "anular") {
                    if (confirm("¿Esta seguro de anular auto?")) {
                        $.ajax({
                            type: "POST",
                            url: "page/mantenimiento/habitacion.aspx/AnularAutoWM",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ idAuto: $(this).parent().parent().children(0).html() }),
                            async: true,
                            beforeSend: function () {
                                $("#tbl_auto button").attr("disabled", true);
                            },
                            success: function (data) {
                                $("#tbl_auto button").removeAttr("disabled");

                                if (data.d.error) {
                                    $("#errorDiv").html(GenerarAlertaError(data.d.error));
                                    return;
                                }

                                $("#errorDiv").html(GenerarAlertaSuccess(data.d.success));
                                $("#btn_buscar").click();
                            },
                            error: function (data) {
                                $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                                $("#tbl_auto button").removeAttr("disabled");
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
});

$("#btn_guardar").click(function () {
    $("#errorAuto").html('');

    if ($("#txt_placa").val().trim() == "") {
        $("#errorAuto").html(GenerarAlertaWarning("Placa: ingres campo"));
        $("#txt_placa").focus();
        return;
    } else if ($("#txt_kilometraje").val() != "" && isNaN($("#txt_kilometraje").val())) {
        $("#errorAuto").html(GenerarAlertaWarning("Kilometraje: valor invalido"));
        $("#txt_kilometraje").focus();
        return;
    } else if ($("#txt_intervalo").val() != "" && isNaN($("#txt_intervalo").val())) {
        $("#errorAuto").html(GenerarAlertaWarning("Intervalo: valor invalido"));
        $("#txt_intervalo").focus();
        return;
    } else if ($("#sel_modelo").val() == "0") {
        $("#errorAuto").html(GenerarAlertaWarning("Modelo: seleccione una opción"));
        $("#sel_modelo").focus();
        return;
    } else if ($("#txh_idcliente").val() == "0") {
        $("#errorAuto").html(GenerarAlertaWarning("Cliente: seleccione una opción"));
        return;
    }

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/habitacion.aspx/GuardarAutoWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            nid_auto: $("#txh_idauto").val() == "" ? 0 : $("#txh_idauto").val(),
            nu_placa: $("#txt_placa").val(),
            nu_kilometraje: ($("#txt_kilometraje").val() == "" ? 0 : $("#txt_kilometraje").val()),
            nu_intervalo: ($("#txt_intervalo").val() == "" ? 0 : $("#txt_intervalo").val()),
            nid_modelo_auto: $("#sel_modelo").val(),
            nid_submodelo_auto: $("#sel_submodelo").val(),
            nid_cliente: $("#txh_idcliente").val()
        }),
        async: true,
        beforeSend: function () {
            $("#btn_guardar").attr("disabled", true);
        },
        success: function (data) {
            $("#btn_guardar").removeAttr("disabled");

            if (data.d.error) {
                $("#errorAuto").html(GenerarAlertaError(data.d.error));
                return;
            }

            $("#errorDiv").html(GenerarAlertaSuccess(data.d.success));
            $("#pnl_auto").modal('hide');
        },
        error: function (data) {
            $("#errorAuto").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_guardar").removeAttr("disabled");
        }
    });
    event.preventDefault();
});


/*****************************************Busqueda Cliente*****************************************/
$("#btn_buscar_cliente").click(function () {
    $("#errorBusquedaCliente").html('');

    $('#tbl_busquedacliente tbody').empty();
    $("#pnl_busquedacliente").modal('show');
});

$("#sel_bcli_tipopersona").change(function () {
    $('#pnl_bcli_juridico').css("display", "");
    $('#pnl_bcli_natural').css("display", "");

    if ($("#sel_bcli_tipopersona").val() == "J") {
        $('#pnl_bcli_natural').css("display", "none");
    } else if ($("#sel_bcli_tipopersona").val() == "N") {
        $('#pnl_bcli_juridico').css("display", "none");
    }
});

$("#pnl_busquedacliente input:text").keyup(function (e) {
    if (e.keyCode == 13) {
        $("#btn_bcli_buscar").click();
    }
});

$("#btn_bcli_buscar").click(function () {
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/habitacion.aspx/BuscarClienteWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            tipoPersona: $("#sel_bcli_tipopersona").val(), nroDoc: $("#txt_bcli_nrodoc").val(),
            nombre: $("#txt_bcli_nombre").val(), razonSocial: $("#txt_bcli_razonsocial").val()
        }),
        async: true,
        beforeSend: function () {
            $("#errorBusquedaCliente").html('');
            $("#btn_bcli_buscar").attr("disabled", true);
        },
        success: function (data) {
            $("#btn_bcli_buscar").removeAttr("disabled");

            if (data.d.error) {
                $("#errorBusquedaCliente").html(GenerarAlertaError(data.d.error));
                return;
            }

            $('#tbl_busquedacliente tbody').empty();

            var htmlBotones = '<td><button name="seleccionar" class="btn btn-primary btn-xs"><i class="icon-plus"></i></button></td>';
            var html = '';
            for (var i = 0; i < data.d.length; i++) {
                html += '<tr><td style="display:none">' + data.d[i].nid_cliente + '</td>' + htmlBotones;
                html += '<td>' + data.d[i].fl_tipo_doc + '</td>';
                html += '<td>' + data.d[i].nu_documento + '</td>';
                html += '<td>' + (data.d[i].fl_tipo_persona == 'J' ? data.d[i].no_razon_social : data.d[i].no_natural + ' ' + data.d[i].no_apaterno + ' ' + data.d[i].no_amaterno) + '</td></tr>';
            }

            $("#tbl_busquedacliente tbody").append(html);

            $("#tbl_busquedacliente button").click(function () {
                if ($(this).attr("name") == "seleccionar") {
                    var filaCliente = $(this).parent().parent().find("td");

                    $("#txh_idcliente").val(filaCliente.eq(0).html());
                    $("#txt_nucliente").val(filaCliente.eq(3).html());
                    $("#txt_nocliente").val(filaCliente.eq(4).html());

                    $("#pnl_busquedacliente").modal('hide');
                    event.preventDefault();
                }
            });
        },
        error: function (data) {
            $("#errorBusquedaCliente").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_bcli_buscar").removeAttr("disabled");
        }
    });
});