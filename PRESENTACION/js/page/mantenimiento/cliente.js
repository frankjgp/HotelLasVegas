﻿/*Variables Locales*/
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

    //Lista Data Inicial
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/cliente.aspx/ListaInicialWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () {
            $('#sel_estadocivil').empty();
            $('#sel_tipodscto').empty();
        },
        success: function (data) {
            if (data.d.error) {
                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                return;
            }

            $('#sel_estadocivil').append("<option value='0'>Seleccione</option>");
            for (var i = 0; i < data.d.listaEstadoCivil.length; i++) {
                $('#sel_estadocivil').append("<option value='" + data.d.listaEstadoCivil[i].no_valor + "'>" + data.d.listaEstadoCivil[i].tx_descripcion + "</option>");
            }

            $('#sel_tipodscto').append("<option value='0'>Ninguno</option>");
            for (var i = 0; i < data.d.listaTipoDscto.length; i++) {
                $('#sel_tipodscto').append("<option value='" + data.d.listaTipoDscto[i].no_valor + "'>" + data.d.listaTipoDscto[i].tx_descripcion + "</option>");
            }

            $('#sel_bus_tipocliente').append("<option value='0'>Todos</option>");
            $('#sel_tipocliente').append("<option value='0'>Ninguno</option>");
            for (var i = 0; i < data.d.listaTipoCliente.length; i++) {
                $('#sel_bus_tipocliente').append("<option value='" + data.d.listaTipoCliente[i].no_valor + "'>" + data.d.listaTipoCliente[i].tx_descripcion + "</option>");
                $('#sel_tipocliente').append("<option value='" + data.d.listaTipoCliente[i].no_valor + "'>" + data.d.listaTipoCliente[i].tx_descripcion + "</option>");
            }
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
});

function fc_editar_cliente(idCliente) {
    $('#pnl_cliente .modal-title').html('Editar Cliente');

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/cliente.aspx/ObtenerClienteWM",
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
                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                return;
            }

            if (data.d.cliente.fl_tipo_persona == "J") {
                $("#btn_buscar_externo").removeAttr("disabled");
                $("#pnl_cliente_juridico").show();
                $("#pnl_cliente_natural").hide();
            } else if (data.d.cliente.fl_tipo_persona == "N") {
                $("#btn_buscar_externo").attr("disabled", true);
                $("#pnl_cliente_natural").show();
                $("#pnl_cliente_juridico").hide();
            }

            $("#sel_tipopersona").attr("disabled", true);
            $("#txh_idcliente").val(data.d.cliente.nid_cliente);
            $("#sel_tipopersona").val(data.d.cliente.fl_tipo_persona);
            $("#txt_tipodoc").val(data.d.cliente.fl_tipo_doc);
            $("#txt_nrodoc").val(data.d.cliente.nu_documento.trim());
            $("#txt_razonsocial").val(data.d.cliente.no_razon_social);
            $("#txt_representante").val(data.d.cliente.no_repres);
            $("#txt_natural").val(data.d.cliente.no_natural);
            $("#txt_appaterno").val(data.d.cliente.no_apaterno);
            $("#txt_apmaterno").val(data.d.cliente.no_amaterno);
            $("#txt_fecnac").val(formatDate(parseDateServer(data.d.cliente.fe_nacimiento), "dd/MM/yyyy"));
            $("input:radio[value='" + data.d.cliente.fl_sexo + "']").prop("checked", true);
            $("#sel_estadocivil").val(data.d.cliente.fl_estado_civil);
            $("#txt_email").val(data.d.cliente.no_email);
            $("#txt_telefono").val(data.d.cliente.nu_telefono);
            $("#txt_celular").val(data.d.cliente.nu_celular);
            $("#txt_direccion").val(data.d.cliente.tx_dir_domicilio);
            $("#txt_localidad").val(data.d.cliente.no_localidad);
            $("#txt_credito").val(data.d.cliente.mo_credito);
            $("#txt_diacredito").val(data.d.cliente.nu_diacredito);
            $("#sel_tipodscto").val(data.d.cliente.fl_tipo_dscto);
            $("#sel_tipocliente").val(data.d.cliente.fl_tipo_cliente);

            $("#tbl_contacto tbody").empty();
            for (var x = 0; x < data.d.listaContacto.length; x++) {
                $("#tbl_contacto tbody").append('<tr>' +
                        '<td><input type="text" class="form-control input-sm" value="' + data.d.listaContacto[x].no_contacto + '"/></td>' +
                        '<td><input type="text" class="form-control input-sm" value="' + data.d.listaContacto[x].no_cargo + '"/></td>' +
                        '<td><input type="text" class="form-control input-sm" value="' + data.d.listaContacto[x].nu_telefono + '"/></td>' +
                        '<td><input type="text" class="form-control input-sm" value="' + data.d.listaContacto[x].nu_celular + '"/></td>' +
                        '<td><input type="text" class="form-control input-sm" value="' + data.d.listaContacto[x].no_email + '"/></td>' +
                        '<td><input type="checkbox" ' + (data.d.listaContacto[x].fl_venta ? 'checked="checked"' : "") + '/></td>' +
                        '<td style="display:none"><input type="text" class="form-control input-sm" value="' + data.d.listaContacto[x].tx_nota + '"/></td>' +
                        '<td class="center">' +
                            '<button class="btn btn-info btn-xs" onclick="fc_nota_contacto(this)"><i class="icon-comment"></i></button>' +
                            '<button class="btn btn-danger btn-xs" onclick="fc_anular_contacto(this)"><i class="icon-minus"></i></button>' +
                        '</td>' +
                    '</tr>');
            }

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

$("#btn_buscar").click(function () {
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/cliente.aspx/BuscarClienteWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            tipoPersona: $("#sel_bus_tipopersona").val(), nroDoc: $("#txt_bus_nrodoc").val(), nombre: $("#txt_bus_nombre").val(),
            razonSocial: $("#txt_bus_razonsocial").val(), tipoCliente: $("#sel_bus_tipocliente").val(),
            represen: $("#txt_bus_representante").val(), anulado: $("#chk_bus_anulado").prop("checked")
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

            $('#tbl_cliente tbody').empty();

            var htmlBotones = '<td><button name="editar" class="btn btn-primary btn-xs"><i class="icon-pencil"></i></button>' +
                                '<button name="anular" class="btn btn-danger btn-xs"><i class="icon-trash "></i></button></td>';
            var html = '';
            for (var i = 0; i < data.d.length; i++) {
                html += '<tr><td style="display:none">' + data.d[i].nid_cliente + '</td>' + htmlBotones;
                html += '<td>' + data.d[i].fl_tipo_doc + '</td>';
                html += '<td>' + data.d[i].nu_documento + '</td>';
                html += '<td>' + (data.d[i].fl_tipo_persona == 'J' ? data.d[i].no_razon_social : data.d[i].no_natural + ' ' + data.d[i].no_apaterno + ' ' + data.d[i].no_amaterno) + '</td>';
                html += '<td class="right-fgp">S/. ' + data.d[i].mo_credito + '</td></tr>';
            }

            $("#tbl_cliente tbody").append(html);

            $("#tbl_cliente button").click(function () {
                if ($(this).attr("name") == "editar") {
                    fc_editar_cliente($(this).parent().parent().children(0).html());
                    event.preventDefault();
                } else if ($(this).attr("name") == "anular") {
                    if (confirm("¿Esta seguro de anular cliente?")) {
                        $.ajax({
                            type: "POST",
                            url: "page/mantenimiento/cliente.aspx/AnularClienteWM",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ idCliente: $(this).parent().parent().children(0).html() }),
                            async: true,
                            beforeSend: function () {
                                $("#tbl_cliente button").attr("disabled", true);
                            },
                            success: function (data) {
                                $("#tbl_cliente button").removeAttr("disabled");

                                if (data.d.error) {
                                    $("#errorDiv").html(GenerarAlertaError(data.d.error));
                                    return;
                                }

                                $("#errorDiv").html(GenerarAlertaSuccess(data.d.success));
                                $("#btn_buscar").click();
                            },
                            error: function (data) {
                                $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                                $("#tbl_cliente button").removeAttr("disabled");
                            }
                        });
                        event.preventDefault();
                    }
                }
            });

            $("#tbl_cliente tbody tr").dblclick(function () {
                fc_editar_cliente($(this).children(0).html());
                event.preventDefault();
            });
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_buscar").removeAttr("disabled");
        }
    });
});


$("#pnl_busqueda input:text").keyup(function (e) {
    if (e.keyCode == 13) {
        $("#btn_buscar").click();
    }
});

$("#sel_tipopersona").change(function () {
    $("#pnl_cliente_juridico").hide();
    $("#pnl_cliente_natural").hide();
    $("#btn_buscar_externo").attr("disabled", true);
    $("#txt_tipodoc").val('');

    if ($(this).val() == "J") {
        $("#btn_buscar_externo").removeAttr("disabled");
        $("#txt_tipodoc").val('RUC');
        $("#pnl_cliente_juridico").show();
    } else if ($(this).val() == "N") {
        $("#txt_tipodoc").val('DNI');
        $("#pnl_cliente_natural").show();
    }
});

$("#btn_buscar_externo").click(function () {
    $("#errorCliente").html('');
    if ($("#sel_tipopersona").val() == "J") {
        if (isNaN($("#txt_nrodoc").val())) {
            $("#errorCliente").html(GenerarAlertaWarning("N° Dcto.: solo permite numeros"));
            return;
        }
        else if ($("#txt_nrodoc").val().length != 11) {
            $("#errorCliente").html(GenerarAlertaWarning("N° Dcto.: 11 digitos"));
            return;
        } else {
            $.ajax({
                type: "POST",
                url: "page/mantenimiento/cliente.aspx/ObtenerClienteExternoWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ nroDoc: $("#txt_nrodoc").val() }),
                async: true,
                beforeSend: function () {
                    $("#btn_buscar_externo").attr("disabled", true);
                },
                success: function (data) {
                    $("#btn_buscar_externo").removeAttr("disabled");

                    if (data.d.error) {
                        $("#errorCliente").html(GenerarAlertaError(data.d.error));
                        return;
                    }

                    $("#txt_razonsocial").val();
                },
                error: function (data) {
                    $("#errorCliente").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#btn_buscar_externo").removeAttr("disabled");
                }
            });
        }
    }
});

$("#btn_add_contacto").click(function () {
    $("#tbl_contacto tbody").append('<tr>' +
                                        '<td><input type="text" class="form-control input-sm"/></td>' +
                                        '<td><input type="text" class="form-control input-sm"/></td>' +
                                        '<td><input type="text" class="form-control input-sm"/></td>' +
                                        '<td><input type="text" class="form-control input-sm"/></td>' +
                                        '<td><input type="text" class="form-control input-sm"/></td>' +
                                        '<td><input type="checkbox" /></td>' +
                                        '<td style="display:none"><input type="text" class="form-control input-sm"/></td>' +
                                        '<td class="center">' +
                                            '<button class="btn btn-info btn-xs" onclick="fc_nota_contacto(this)"><i class="icon-comment"></i></button>' +
                                            '<button class="btn btn-danger btn-xs" onclick="fc_anular_contacto(this)"><i class="icon-minus"></i></button>' +
                                        '</td>' +
                                    '</tr>');
});

function fc_anular_contacto(obj) {
    $(obj).parent().parent().remove();
}

function fc_nota_contacto(obj) {
    inputNota = $(obj).parent().parent().find("input").eq(6);
    $("#txt_nota").val(inputNota.val());
    $("#pnl_cliente_nota").modal('show');
}

$("#btn_nota_guardar").click(function () {
    inputNota.val($("#txt_nota").val());
    $("#pnl_cliente_nota").modal('hide');
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