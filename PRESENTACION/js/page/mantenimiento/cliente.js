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

            $('#sel_tipodocumento').append("<option value='0'>TODOS</option>");

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
                        url: "page/mantenimiento/usuario.aspx/ListaClientesWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ idEmpleado: $(this).parent().parent().find("td").eq(0).html() }),
                        async: true,
                        beforeSend: function () {
                            $("#errorCliente").html('');
                            $("#pnl_cliente button").attr("disabled", true);
                        },
                        success: function (data) {
                            $("#tbl_cliente button").removeAttr("disabled");

                            if (data.d.error) {
                                $("#msg").html(GenerarAlertaError(data.d.error));
                                return;
                            }

                            $("#txh_idcliente").val(data.d.Resultado[i].ID_CLIENTE);
                            $("#txt_nombre").val(data.d.Resultado[i].NOMBRES.trim());
                            $("#txt_apellido").val(data.d.Resultado[i].APELLIDOS.trim());
                            $("#sel_tipodocumento").val(data.d.Resultado[i].ID_TIPO_DOCUMENTO);
                            $("#txt_nrodoc").val(data.d.Resultado[i].NUM_DOCUMENTO);
                            $("#txt_telefono").val(data.d.Resultado[i].TELEFONOS);

                            if (data.d.beUsuario.no_usuario != "") {
                                $('#chk_usuario').attr("disabled", "disabled");
                                $('#chk_usuario').prop("checked", true);
                                $('#txt_usuario').removeAttr("disabled");
                                $("#sel_perfil").removeAttr("disabled");
                                $('#sel_estadousuario').removeAttr("disabled");
                                $('#chk_anular').removeAttr("disabled");
                                $('#txt_bloqueo').removeAttr("disabled");
                            } else {
                                $('#chk_usuario').removeAttr("disabled");
                                $('#chk_usuario').prop("checked", false);
                                $('#txt_usuario').attr("disabled", "disabled");
                                $("#sel_perfil").attr("disabled", "disabled");
                                $('#sel_estadousuario').attr("disabled", "disabled");
                                $('#chk_anular').attr("disabled", "disabled");
                                $('#txt_bloqueo').attr("disabled", "disabled");
                            }

                            $("#txt_usuario").val(data.d.beUsuario.no_usuario);
                            $("#sel_perfil").val(data.d.beUsuario.nid_perfil);
                            $("#sel_estadousuario").val(data.d.beUsuario.fl_activo);
                            $('#chk_anular').prop("checked", data.d.beUsuario.fl_anular);
                            $("#txt_bloqueo").val(data.d.beUsuario.tx_bloqueo);

                            $("#pnl_empleado").modal('show');
                        },
                        error: function (data) {
                            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                            $("#tbl_cliente button").removeAttr("disabled");
                        }
                    });
                    event.preventDefault();
                } else if ($(this).attr("name") == "anular") {
                    if (confirm("¿Esta seguro de anular cliente?")) {
                        $.ajax({
                            type: "POST",
                            url: "page/mantenimiento/habitacion.aspx/ActualizarClientesWM",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ idCliente: $(this).parent().parent().children(0).html() }),
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
}

function fc_editar_cliente(idCliente) {
    $('#pnl_cliente .modal-title').html('Editar Cliente');

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/cliente.aspx/ListaClientesWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ idCliente: idCliente }),
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

            ID_CLIENTE + '</td>' + htmlBotones;
            html += '<td>' + data.d.Resultado[i].NOMBRES + '</td>';
            html += '<td>' + data.d.Resultado[i].APELLIDOS + '</td>';
            html += '<td>' + data.d.Resultado[i].DESCRIPCION + '</td>';
            html += '<td>' + data.d.Resultado[i].NUM_DOCUMENTO + '</td>';
            html += '<td>' + data.d.Resultado[i].TELEFONOS + '</td></tr>';
            
            $("#txh_idcliente").val(data.d.Resultado[0].ID_CLIENTE);
            $("#txt_nombre").val(data.d.Resultado[0].NOMBRES);
            $("#txt_apellido").val(data.d.Resultado[0].APELLIDOS);
            $("#txt_nrodoc").val(data.d.Resultado[0].NUM_DOCUMENTO);
            $("#txt_telefono").val(data.d.Resultado[0].TELEFONOS);
            $("#sel_tipodocumento").val(data.d.Resultado[0].ID_TIPO_DOCUMENTO);

            $("#pnl_cliente").modal('show');
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#tbl_cliente button").removeAttr("disabled");
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
    $("#errorDiv").html('');
    $("#pnl_busqueda input:text").val('');
    $("#pnl_busqueda select").val('0');
    $("#sel_bus_tipopersona").focus();
});

$("#btn_nuevo").click(function () {
    $("#errorCliente").html('');
    $('#pnl_cliente .modal-title').html('Registrar Cliente');
    $("#txh_idcliente").val('0');
    $("#pnl_cliente select").val('0');
    $("#pnl_cliente input:text").val('');
    $('#tbl_contacto tbody').empty();
    $("#btn_buscar_externo").attr("disabled", true);
    $("#sel_tipopersona").removeAttr("disabled");
    $("#pnl_cliente_juridico").hide();
    $("#pnl_cliente_natural").hide();
    $("#pnl_cliente").modal('show');
    setTimeout('$("#sel_tipopersona").focus()', 1000);
});

$("#pnl_busqueda input:text").keyup(function (e) {
    if (e.keyCode == 13) {
        $("#btn_buscar").click();
    }
});

$("#btn_guardar").click(function () {
    $("#errorCliente").html('');

    if ($("#sel_tipopersona").val() == "0") {
        $("#errorCliente").html(GenerarAlertaWarning("Tipo de Persona: seleccionar una opcion"));
        $("#sel_tipopersona").focus();
        return;
    } else if (isNaN($("#txt_nrodoc").val())) {
        $("#errorCliente").html(GenerarAlertaWarning("N° Dcto.: solo permite numeros"));
        $("#txt_nrodoc").focus();
        return;
    } else if ($("#sel_tipopersona").val() == "J") {
        if ($("#txt_nrodoc").val().length != 11) {
            $("#errorCliente").html(GenerarAlertaWarning("N° Dcto.: ingresar 11 digitos"));
            $("#txt_nrodoc").focus();
            return;
        } else if ($("#txt_razonsocial").val().length < 10) {
            $("#errorCliente").html(GenerarAlertaWarning("Razon social: ingresar campo"));
            $("#txt_razonsocial").focus();
            return;
        }
    } else if ($("#sel_tipopersona").val() == "N") {
        if ($("#txt_nrodoc").val().length != 8) {
            $("#errorCliente").html(GenerarAlertaWarning("N° Dcto.: ingresar 8 digitos"));
            $("#txt_nrodoc").focus();
            return;
        } else if ($("#txt_natural").val().length < 3) {
            $("#errorCliente").html(GenerarAlertaWarning("Nombres: ingresar campo"));
            $("#txt_natural").focus();
            return;
        } else if ($("#txt_appaterno").val().length < 3) {
            $("#errorCliente").html(GenerarAlertaWarning("Ap. Paterno: ingresar campo"));
            $("#txt_appaterno").focus();
            return;
        } else if ($("#txt_apmaterno").val().length < 3) {
            $("#errorCliente").html(GenerarAlertaWarning("Ap. Materno: ingresar campo"));
            $("#txt_apmaterno").focus();
            return;
        } else if ($("input:radio[name=rad_sexo]:checked").length == 0) {
            $("#errorCliente").html(GenerarAlertaWarning("Sexo: seleccionar una opcion"));
            $("input:radio[name=rad_sexo]").focus();
            return;
        } else if ($("#txt_fecnac").val() != "" && isDate($("#txt_fecnac").val(), "dd/MM/yyyy") == false) {
            $("#errorCliente").html(GenerarAlertaWarning("Fec. Nacimiento: campo invalido"));
            $("#txt_fecnac").focus();
            return;
        }
    }
    if ($("#txt_credito").val() != "" && isNaN($("#txt_credito").val())) {
        $("#errorCliente").html(GenerarAlertaWarning("Max. Credito: valor invalido"));
        $("#txt_credito").focus();
        return;
    }
    else if ($("#txt_diacredito").val() != "" && isNaN($("#txt_diacredito").val())) {
        $("#errorCliente").html(GenerarAlertaWarning("Max. dias Credito: valor invalido"));
        $("#txt_diacredito").focus();
        return;
    }

    var ls_contacto = '';

    $("#tbl_contacto tbody tr").each(function () {
        var rowtel = $(this).find('input');
        if ($.trim(rowtel.eq(0).val()) != '' || $.trim(rowtel.eq(1).val()) != '' || $.trim(rowtel.eq(2).val()) != '' || $.trim(rowtel.eq(3).val()) != '' || $.trim(rowtel.eq(4).val()) != '')
            ls_contacto += rowtel.eq(0).val() + '~' + rowtel.eq(1).val() + '~' + rowtel.eq(2).val() + '~' + rowtel.eq(3).val() + '~' + rowtel.eq(4).val() + '~' + rowtel.eq(6).val() + '~' + (rowtel.eq(5).prop("checked") ? "1" : "0") + '|';
    });
    if (ls_contacto != '') ls_contacto = ls_contacto.substr(0, ls_contacto.length - 1);

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/cliente.aspx/GuardarClienteWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            nid_cliente: $("#txh_idcliente").val() == "" ? 0 : $("#txh_idcliente").val(),
            fl_tipo_persona: $("#sel_tipopersona").val(),
            fl_tipo_doc: $("#txt_tipodoc").val(),
            nu_documento: $("#txt_nrodoc").val(),
            no_razon_social: ($("#sel_tipopersona").val() == "J" ? $("#txt_razonsocial").val() : ""),
            no_repres: ($("#sel_tipopersona").val() == "J" ? $("#txt_representante").val() : ""),
            no_natural: ($("#sel_tipopersona").val() == "N" ? $("#txt_natural").val() : ""),
            no_apaterno: ($("#sel_tipopersona").val() == "N" ? $("#txt_appaterno").val() : ""),
            no_amaterno: ($("#sel_tipopersona").val() == "N" ? $("#txt_apmaterno").val() : ""),
            fe_nacimiento: ($("#sel_tipopersona").val() == "N" ? ($("#txt_fecnac").val() == "" ? "01/01/1900" : $("#txt_fecnac").val()) : "01/01/1900"),
            fl_sexo: ($("#sel_tipopersona").val() == "N" ? $("input:radio[name=rad_sexo]:checked").val() : "I"),
            fl_estado_civil: ($("#sel_tipopersona").val() == "N" ? $("#sel_estadocivil").val() : "0"),
            ls_contacto: ls_contacto,
            tx_dir_domicilio: $("#txt_direccion").val(),
            no_localidad: $("#txt_localidad").val(),
            mo_credito: ($("#txt_credito").val() == "" ? 0 : $("#txt_credito").val()),
            nu_diacredito: ($("#txt_diacredito").val() == "" ? 0 : $("#txt_diacredito").val()),
            fl_tipo_dscto: $("#sel_tipodscto").val(),
            fl_tipo_cliente: $("#sel_tipocliente").val()
        }),
        async: true,
        beforeSend: function () {
            $("#btn_guardar").attr("disabled", true);
        },
        success: function (data) {
            $("#btn_guardar").removeAttr("disabled");

            if (data.d.error) {
                $("#errorCliente").html(GenerarAlertaError(data.d.error));
                return;
            }

            $("#errorDiv").html(GenerarAlertaSuccess(data.d.success));
            $("#pnl_cliente").modal('hide');
        },
        error: function (data) {
            $("#errorCliente").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_guardar").removeAttr("disabled");
        }
    });
    event.preventDefault();
});