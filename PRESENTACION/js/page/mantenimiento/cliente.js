function fc_listar_tipo_documento() {
    //Lista Data Inicial
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/cliente.aspx/ListaInicialWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () {
            $('#sel_tipodocumento').empty();
            $("#pnl_busqueda :input").attr("disabled", true);
        },
        success: function (data, status) {
            if (!data.d.Activo) {
                $("#msg").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $('#sel_tipodocumento').append("<option value='0'>Seleccione</option>");

            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_tipodocumento').append("<option value='" + data.d.Resultado[i].ID_TIPO_DOCUMENTO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
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
    $(document).prop("title", "LV::Cliente");
    $(document).unbind("keydown");

    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    });

    fc_listar_tipo_documento();

    $(document).keyup(function (e) {
        if (e.keyCode == 13) {
            if ($(this).attr("id") == "pnl_busqueda") $("#btn_buscar").click();
            else $("#pnl_busqueda").focus();
        }
    });

    $("#btn_buscar").click(function () {
        fc_listar_cliente();
    });

});

function fc_listar_cliente() {
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/cliente.aspx/ListaClientesWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            nombre: $("#txt_nombreB").val(), apellido: $("#txt_apellidoB").val(), documento: $("#txt_nrodocB").val()
        }),
        async: true,
        beforeSend: function () {
            $("#btn_buscar").attr("disabled", true);
            $('#tbl_cliente tbody').empty();
        },
        success: function (data) {
            $("#btn_buscar").removeAttr("disabled");

            if (data.d.error) {
                $("#msg").html(GenerarAlertaError(data.d.error));
                return;
            }

            var htmlBotones = '<button name="editar" class="btn btn-primary btn-xs"><i class="icon-pencil"></i></button> ' +
                                '<button name="anular" class="btn btn-danger btn-xs"><i class="icon-trash "></i></button> ';

            var html = '';
            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td style="display:none">' + data.d.Resultado[i].ID_CLIENTE + '</td>';
                html += '<td>' + htmlBotones + '</td>';
                html += '<td>' + data.d.Resultado[i].NOMBRES + '</td>';
                html += '<td>' + data.d.Resultado[i].APELLIDOS + '</td>';
                html += '<td>' + data.d.Resultado[i].DESCRIPCION + '</td>';
                html += '<td>' + data.d.Resultado[i].NUM_DOCUMENTO + '</td>';
                html += '<td>' + data.d.Resultado[i].TELEFONOS + '</td></tr>';
            }

            $("#tbl_cliente tbody").append(html);

            $("#tbl_cliente button").click(function () {
                if ($(this).attr("name") == "editar") {
                    $('#pnl_cliente .modal-title').html('Editar Cliente');

                    $.ajax({
                        type: "POST",
                        url: "page/mantenimiento/cliente.aspx/ObtenerClienteWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ idCliente: $(this).parent().parent().find("td").eq(0).html() }),
                        async: true,
                        beforeSend: function () {
                            $("#errorCliente").html('');
                            $("#tbl_cliente button").attr("disabled", true);
                        },
                        success: function (data) {
                            $("#tbl_cliente button").removeAttr("disabled");

                            if (data.d.error) {
                                $("#msg").html(GenerarAlertaError(data.d.error));
                                return;
                            }

                            $("#txh_idcliente").val(data.d.Resultado[0].ID_CLIENTE);
                            $("#txt_nombre").val(data.d.Resultado[0].NOMBRES.trim());
                            $("#txt_apellido").val(data.d.Resultado[0].APELLIDOS.trim());
                            $("#sel_tipodocumento").val(data.d.Resultado[0].ID_TIPO_DOCUMENTO);
                            $("#txt_nrodoc").val(data.d.Resultado[0].NUM_DOCUMENTO);
                            $("#txt_telefono").val(data.d.Resultado[0].TELEFONOS);
                            
                            $("#pnl_cliente").modal('show');
                        },
                        error: function (data) {
                            $("#msg").html(GenerarAlertaError("Inconveniente en la operación"));
                            $("#tbl_cliente button").removeAttr("disabled");
                        }
                    });
                    event.preventDefault();
                } else if ($(this).attr("name") == "anular") {
                    if (confirm("¿Esta seguro de anular cliente?")) {
                        $.ajax({
                            type: "POST",
                            url: "page/mantenimiento/cliente.aspx/AnularClienteWM",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ idCliente: $(this).parent().parent().find("td").eq(0).html() }),
                            async: true,
                            beforeSend: function () {
                                $("#tbl_cliente button").attr("disabled", true);
                            },
                            success: function (data) {
                                $("#tbl_cliente button").removeAttr("disabled");

                                if (!data.d.Activo) {
                                    $("#msg").html(GenerarAlertaError(data.d.Mensaje));
                                    return;
                                }

                                $("#msg").html(GenerarAlertaSuccess(data.d.Mensaje));
                                $("#btn_buscar").click();
                            },
                            error: function (data) {
                                $("#msg").html(GenerarAlertaError("Inconveniente en la operación"));
                                $("#tbl_cliente button").removeAttr("disabled");
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
                if ($("#pnl_cliente").css('display') == 'block') {
                    $("#btn_guardar").click();
                }
            }
            break;
    }
});

$("#btn_limpiar").click(function () {
    $("#msg").html('');
    $("#pnl_busqueda input:text").val('');
    $("#pnl_busqueda select").val('0');
    $("#txt_nombreB").focus();
});

$("#btn_nuevo").click(function () {
    $("#errorCliente").html('');
    $('#pnl_cliente .modal-title').html('Registrar Cliente');
    $("#txh_idcliente").val('0');
    $("#pnl_cliente select").val('0');
    $("#pnl_cliente input:text").val('');
    $("#pnl_cliente").modal('show');
});

$("#pnl_busqueda input:text").keyup(function (e) {
    if (e.keyCode == 13) {
        $("#btn_buscar").click();
    }
});

$("#btn_guardar").click(function () {
    $("#errorCliente").html('');

    if ($("#sel_tipodocumento").val() == "0") {
        $("#errorCliente").html(GenerarAlertaWarning("Tipo de Documento: seleccionar una opción"));
        $("#sel_tipodocumento").focus();
        return;
    } else if ($("#txt_nombre").val().trim() == "") {
        $("#errorCliente").html(GenerarAlertaWarning("Nombres: ingrese información"));
        $("#txt_nombre").focus();
        return;
    } else if ($("#txt_apellido").val().trim() == "") {
        $("#errorCliente").html(GenerarAlertaWarning("Apellidos: ingrese información"));
        $("#txt_apellido").focus();
        return;
    } else if ($("#txt_nrodoc").val().trim() == "") {
        $("#errorCliente").html(GenerarAlertaWarning("N° Dcto.: ingrese información"));
        $("#txt_nrodoc").focus();
        return;
    } 

    var eCliente = {
        ID_CLIENTE: $("#txh_idcliente").val() == "" ? 0 : $("#txh_idcliente").val(),
        NOMBRES: $("#txt_nombre").val(),
        APELLIDOS: $("#txt_apellido").val(),
        ID_TIPO_DOCUMENTO: $("#sel_tipodocumento").val(),
        NUM_DOCUMENTO: $("#txt_nrodoc").val(),
        TELEFONOS: $("#txt_telefono").val()
    };
    
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/cliente.aspx/ActualizarClientesWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ eCliente: eCliente }),
        async: true,
        beforeSend: function () {
            $("#btn_guardar").attr("disabled", true);
        },
        success: function (data) {
            $("#btn_guardar").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorCliente").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $("#msg").html(GenerarAlertaSuccess(data.d.Mensaje));
            $("#pnl_cliente").modal('hide');
            $("#btn_buscar").click();
        },
        error: function (data) {
            $("#errorCliente").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_guardar").removeAttr("disabled");
        }
    });
    event.preventDefault();
});