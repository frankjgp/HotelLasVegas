/*Inicializar Script*/
$(function () {
    $(document).prop("title", "LV::Atención");

    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    });

    //Lista Data Inicial
    $.ajax({
        type: "POST",
        url: "page/operacion/atencion.aspx/ListaInicialWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () {
            $('#sel_bus_moneda').empty();
            $('#sel_rpago_moneda').empty();
        },
        success: function (data) {
            if (data.d.error) {
                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                return;
            }

            $('#sel_bus_moneda').append("<option value='0'>Todos</option>");
            for (var z = 0; z < data.d.listaMoneda.length; z++) {
                $('#sel_bus_moneda').append("<option value='" + data.d.listaMoneda[z].no_valor + "'>" + data.d.listaMoneda[z].tx_descripcion + "</option>");
                $('#sel_rpago_moneda').append("<option value='" + data.d.listaMoneda[z].no_valor + "'>" + data.d.listaMoneda[z].tx_descripcion + "</option>");
            }

            $('#sel_rpago_mediopago').append("<option value='0'>Seleccione</option>");
            for (var i = 0; i < data.d.listaMedioPago.length; i++) {
                $('#sel_rpago_mediopago').append("<option value='" + data.d.listaMedioPago[i].co_medio_pago + "'>" + data.d.listaMedioPago[i].no_medio_pago + "</option>");
            }

            $('#txt_rpago_tipocambio').val(data.d.tipoCambio);
            $("#txt_bus_fechainicio").val(data.d.fechaInicio);
            $("#txt_bus_fechafin").val(data.d.fechaFin);

            $("#btn_buscar").click();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
});

/*Eventos por Control*/
$(document).keydown(function (evt) {
    switch (evt ? evt.which : event.keyCode) {
        case 8: //BLOQUE RETROCESO DE PAGINA
            var valor = document.activeElement.value;
            if (valor == undefined) { return false; } break;
        case 13: //BLOQUEA ENTER
            return false; break;
    }
});

/******************************************************BUSQUEDA**************************************************/
var _fl_condicion_pago;

function fc_buscar_correlativo(co_documento, nu_serie) {
    $.ajax({
        type: "POST",
        url: "page/operacion/atencion.aspx/ObtenerCorrelativo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ co_documento: co_documento, nu_serie: nu_serie }),
        async: true,
        success: function (data) {
            if (data.d.nu_serie) {
                $('#txt_rpago_serieventa').val(data.d.nu_serie.trim());
                $("#txt_rpago_numventa").val(data.d.nu_correlativo.trim());
            }
        }
    });
}

function fc_obtener_venta(fila, condicion) {
    var co_documento = fila.eq(0).html().split(",")[1].trim();

    if (co_documento == "07" || co_documento == "08" || co_documento == "09") {
        if (co_documento == "07")
            window.open('report/page/doc/notacredito.aspx?id=' + fila.eq(0).html().split(",")[0] + '&print=1', '', 'fullscreen=no,width=850,height=600,top=50,left=100,scrollbars=yes,resizable=yes');
        else if (co_documento == "08")
            window.open('report/page/doc/notadebito.aspx?id=' + fila.eq(0).html().split(",")[0] + '&print=1', '', 'fullscreen=no,width=850,height=600,top=50,left=100,scrollbars=yes,resizable=yes');
        else if (co_documento == "09")
            window.open('report/page/doc/guiaremision.aspx?id=' + fila.eq(0).html().split(",")[0] + '&print=1', '', 'fullscreen=no,width=850,height=600,top=50,left=100,scrollbars=yes,resizable=yes');

        $("#btn_buscar").click();

        return;
    }

    $("#txh_idventa").val(fila.eq(0).html());
    $("#txt_rpago_tipoventa").val(fila.eq(3).html());
    $("#txt_rpago_serieventa").val(fila.eq(4).html().split('-')[0]);
    $("#txt_rpago_numventa").val(fila.eq(4).html().split('-')[1]);
    $("#txt_rpago_monedaventa").val(fila.eq(7).html());
    $("#txt_rpago_totalventa").val(fila.eq(8).html());
    $("#txt_rpago_nocliente").val(fila.eq(5).html());

    $('#txt_rpago_serieventa').removeAttr("disabled");
    $("#txt_rpago_numventa").removeAttr("disabled");
    $("#btn_rpago_guardar").removeAttr("disabled");
    _fl_condicion_pago = condicion;

    if ((_fl_condicion_pago).toUpperCase() == "CONTADO") {
        $("#txt_rpago_fecpago").val(formatDate(new Date(), "dd/MM/yyyy"));
        $('#sel_rpago_mediopago').val("008");
        $("#sel_rpago_moneda").val(fila.eq(7).html());
        $("#txt_rpago_nupago").val('');
        $("#txt_rpago_abono").val(fila.eq(8).html());
        $("#txt_rpago_recibido").val('');
        $("#txt_rpago_devolucion").val('');
        $("#pnl_registropago_contado").css("display", "");
        $("#pnl_registropago_credito").css("display", "none");

        setTimeout('$("#txt_rpago_recibido").focus()', 1000);
    } else {
        $("#txt_rpago_fecinicio").val(formatDate(new Date(), "dd/MM/yyyy"));
        $("#txt_rpago_inicial").val('0');
        $("#txt_rpago_importe").val(fila.eq(8).html());
        $("#txt_rpago_nucuota").val('');
        $("#chk_rpago_letra").prop("checked", (fila.eq(6).html() == "Letra" ? true : false));
        $("#tbl_rpago_cuota tbody").empty();
        $("#pnl_registropago_contado").css("display", "none");
        $("#pnl_registropago_credito").css("display", "");

        if (fila.eq(6).html() == "Letra") {
            $("#txt_rpago_inicial").parent().parent().css("display", "none");
            $("#txt_rpago_nucuota").parent().parent().css("display", "none");
            $("#tbl_rpago_cuota").parent().css("display", "none");
        } else {
            $("#txt_rpago_inicial").parent().parent().css("display", "");
            $("#txt_rpago_nucuota").parent().parent().css("display", "");
            $("#tbl_rpago_cuota").parent().css("display", "");
        }

        setTimeout('$("#txt_rpago_nucuota").focus()', 1000);
    }
    $("#errorRegPago").html('');

    if (co_documento == "41") {
        $('#txt_rpago_serieventa').attr("disabled", "disabled");
        $("#txt_rpago_numventa").attr("disabled", "disabled");
    }

    if ($('#txt_rpago_serieventa').val() == "" || $('#txt_rpago_numventa').val() == "") {
        fc_buscar_correlativo(co_documento, "");
    }

    $("#pnl_registropago").modal('show');
}

$("#btn_limpiar").click(function () {
    $("#errorDiv").html('');
    $("#txh_idventa").val('0');
    $("#txt_bus_numero").val('');
    $("#txt_bus_nocliente").val('');
    $("#sel_bus_moneda").val('0');
    $('#tbl_busqueda tbody').empty();
    $('#txt_bus_numero').focus();
});

$("#pnl_busqueda input:text").keyup(function (e) {
    if (e.keyCode == 13) {
        $("#btn_buscar").click();
    }
});

$("#btn_buscar").click(function () {
    $.ajax({
        type: "POST",
        url: "page/operacion/atencion.aspx/BuscarVentaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            numero: $("#txt_bus_numero").val(), nocliente: $("#txt_bus_nocliente").val(), moneda: $("#sel_bus_moneda").val(),
            fechaInicio: $("#txt_bus_fechainicio").val(), fechaFin: $("#txt_bus_fechafin").val()
        }),
        async: true,
        beforeSend: function () {
            $("#btn_buscar").attr("disabled", true);
            $('#tbl_busqueda tbody').empty();
        },
        success: function (data) {
            $("#btn_buscar").removeAttr("disabled");

            if (data.d.error) {
                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                return;
            }

            var htmlBotones = '<td><button name="Contado" class="btn btn-info btn-xs" title="Contado"><i class="icon-money"></i></button> ' +
                '<button name="Credito" class="btn btn-warning btn-xs" title="Credito"><i class="icon-credit-card"></i></button></td>';

            var htmlBotonPrint = '<td><button name="Imprimir" class="btn btn-white btn-xs" title="Imprimir"><i class="icon-print"></i></button></td>';

            var html = '';
            for (var i = 0; i < data.d.length; i++) {
                html += '<tr><td style="display:none">' + data.d[i].nid_documento + ',' + data.d[i].co_comprobante_pago + '</td>';
                html += (data.d[i].fl_print ? htmlBotonPrint : htmlBotones);
                html += '<td>' + formatDate(parseDateServer(data.d[i].fe_creacion), "dd/MM/yyyy") + '</td>';
                html += '<td>' + data.d[i].no_comprobante_pago + '</td>';
                html += '<td>' + (data.d[i].nu_serie.trim() + '-' + data.d[i].nu_correlativo.trim()) + '</td>';
                html += '<td>' + data.d[i].no_cliente + '</td>';
                html += '<td>' + data.d[i].fl_condicion_venta + '</td>';
                html += '<td>' + data.d[i].fl_moneda + '</td>';
                html += '<td class="right-fgp">' + toDecimal(data.d[i].mt_total, 2) + '</td>';
                html += '<td>' + data.d[i].fl_estado + '</td></tr>';
            }

            $("#tbl_busqueda tbody").append(html);

            $("#tbl_busqueda button").click(function () {
                fc_obtener_venta($(this).parent().parent().find("td"), $(this).attr("name"));
            });

            $("#tbl_busqueda tbody tr").dblclick(function () {
                fc_obtener_venta($(this).find("td"), $(this).find("td").eq(6).html());
            });
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_buscar").removeAttr("disabled");
        }
    });
});


/***********************************************************REGISTRO DE PAGO*******************************************************/
function fc_anular_cuota(obj) {
    $(obj).parent().parent().remove();
}

$("#txt_rpago_serieventa,#txt_rpago_numventa").keydown(function (e) {
    if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
        if (e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 13 && e.keyCode != 37
            && e.keyCode != 39 && e.keyCode != 9 && e.keyCode != 35 && e.keyCode != 36) {
            event.preventDefault();
        }
    }
});

$("#txt_rpago_serieventa").keyup(function (e) {
    if (e.keyCode == 13) {
        if ($('#txt_rpago_serieventa').val() == "" || isNaN($('#txt_rpago_serieventa').val())) {
            $('#txt_rpago_numventa').val("");
            return;
        }
        fc_buscar_correlativo($("#txh_idventa").val().split(",")[1], $('#txt_rpago_serieventa').val());
    }
});

$("#sel_rpago_moneda").change(function () {
    var abono = 0;

    if ($("#sel_rpago_moneda").val() == "Soles" && $("#txt_rpago_monedaventa").val() == "Dolares") {
        abono = toDecimal(parseFloat($("#txt_rpago_totalventa").val()) * parseFloat($("#txt_rpago_tipocambio").val()), 2);
    } else if ($("#sel_rpago_moneda").val() == "Dolares" && $("#txt_rpago_monedaventa").val() == "Soles") {
        abono = toDecimal(parseFloat($("#txt_rpago_totalventa").val()) / parseFloat($("#txt_rpago_tipocambio").val()), 2);
    } else {
        abono = toDecimal(parseFloat($("#txt_rpago_totalventa").val()), 2);
    }

    $("#txt_rpago_abono").val(abono);
});

$("#chk_rpago_letra").click(function () {
    if ($("#chk_rpago_letra").prop("checked")) {
        $("#txt_rpago_inicial").parent().parent().css("display", "none");
        $("#txt_rpago_nucuota").parent().parent().css("display", "none");
        $("#tbl_rpago_cuota").parent().css("display", "none");
    } else {
        $("#txt_rpago_inicial").parent().parent().css("display", "");
        $("#txt_rpago_nucuota").parent().parent().css("display", "");
        $("#tbl_rpago_cuota").parent().css("display", "");
        $("#txt_rpago_nucuota").focus();
    }
});

$("#txt_rpago_nucuota").keyup(function (e) {
    if (e.keyCode == 13) {
        $("#btn_rpago_cuota").click();
    }
});

$("#btn_rpago_cuota").click(function () {

    if (isDate($("#txt_rpago_fecinicio").val(), "dd/MM/yyyy") == false) {
        $("#errorRegPago").html(GenerarAlertaWarning("Fecha Inicio: campo invalido"));
        $("#txt_rpago_fecinicio").focus();
        return;
    } else if ($("#txt_rpago_nucuota").val().trim() == "") {
        $("#errorRegPago").html(GenerarAlertaWarning("Intervalo Días: campo invalido"));
        $("#txt_rpago_nucuota").focus();
        return;
    }

    var importe = parseFloat($("#txt_rpago_importe").val());
    var dias = $("#txt_rpago_nucuota").val().split(',');
    var cuota = toDecimal(importe / dias.length, 2);
    var total = 0;

    $("#tbl_rpago_cuota tbody").empty();

    for (var x = 0; x < dias.length; x++) {
        if (x == (dias.length - 1)) cuota = toDecimal(importe - total, 2);
        else total += parseFloat(cuota);

        var fecha = getDateFromFormat($("#txt_rpago_fecinicio").val(), "dd/MM/yyyy");
        var fechaActual = getDateFromFormat($("#txt_rpago_fecinicio").val(), "dd/MM/yyyy");
        fecha.setDate(fechaActual.getDate() + (isNaN(dias[x]) ? 0 : parseInt(dias[x]) - 1));

        $("#tbl_rpago_cuota tbody").append('<tr>' +
                                                '<td class="center">' + (x + 1) + '</td>' +
                                                '<td><input type="text" class="form-control input-sm" value="' + formatDate(fecha, "dd/MM/yyyy") + '"/></td>' +
                                                '<td><input type="text" class="form-control input-sm right-fgp" value="' + cuota + '"/></td>' +
                                                '<td class="center"><button class="btn btn-danger btn-xs" onclick="fc_anular_cuota(this)">' +
                                                    '<i class="icon-minus"></i></button>' +
                                                '</td>' +
                                            '</tr>');
    }
});

$("#txt_rpago_recibido").keyup(function (e) {
    var abono = parseFloat($("#txt_rpago_abono").val());
    var recibido = (isNaN($("#txt_rpago_recibido").val()) || $("#txt_rpago_recibido").val() == "") ? 0 : parseFloat($("#txt_rpago_recibido").val());


    if (isNaN($("#txt_rpago_recibido").val())) $("#txt_rpago_recibido").val("");

    $("#txt_rpago_devolucion").val(toDecimal(recibido - abono, 2));

    if (e.keyCode == 13 && $("#btn_rpago_guardar").prop("disabled")) {
        $("#pnl_registropago").modal('hide');
    } else if (e.keyCode == 13 && abono <= recibido) {
        $("#btn_rpago_guardar").click();
    }
});

$("#txt_rpago_inicial").keyup(function (e) {
    var importe = parseFloat($("#txt_rpago_totalventa").val());
    var inicial = (isNaN($("#txt_rpago_inicial").val()) || $("#txt_rpago_inicial").val() == "") ? 0 : parseFloat($("#txt_rpago_inicial").val());


    if (isNaN($("#txt_rpago_inicial").val())) $("#txt_rpago_inicial").val("");

    importe = toDecimal(importe - inicial, 2);

    $("#txt_rpago_importe").val(importe);

    var dias = $("#tbl_rpago_cuota tbody").find("tr");
    if (dias.length > 0) {
        var cuota = toDecimal(importe / dias.length, 2);
        var total = 0;

        for (var x = 0; x < dias.length; x++) {
            if (x == (dias.length - 1)) cuota = toDecimal(importe - total, 2);
            else total += parseFloat(cuota);

            dias.eq(x).find("td").eq(2).children().val(cuota);
        }
    }
});

$("#btn_rpago_guardar").click(function () {
    $("#errorRegPago").html('');

    var ls_detalle = "";

    if ($("#txt_rpago_serieventa").val().trim() == "") {
        $("#errorRegPago").html(GenerarAlertaWarning("Serie: ingresar campo"));
        $("#txt_rpago_serieventa").focus();
        return;
    } else if ($("#txt_rpago_numventa").val().trim() == "") {
        $("#errorRegPago").html(GenerarAlertaWarning("Numero: ingresar campo"));
        $("#txt_rpago_numventa").focus();
        return;
    }

    if (_fl_condicion_pago == "Contado") {
        if (isDate($("#txt_rpago_fecpago").val(), "dd/MM/yyyy") == false) {
            $("#errorRegPago").html(GenerarAlertaWarning("Fecha Pago: campo invalido"));
            $("#txt_rpago_fecpago").focus();
            return;
        } else if ($("#sel_rpago_moneda").val() == "0") {
            $("#errorRegPago").html(GenerarAlertaWarning("Moneda: seleccione una opcion"));
            $("#sel_rpago_moneda").focus();
            return;
        } else if (isNaN($("#txt_rpago_tipocambio").val())) {
            $("#errorRegPago").html(GenerarAlertaWarning("Tipo Cambio: campo invalido"));
            $("#txt_rpago_tipocambio").focus();
            return;
        } else if ($("#sel_rpago_mediopago").val() == "0") {
            $("#errorRegPago").html(GenerarAlertaWarning("Medio Pago: seleccione una opcion"));
            $("#sel_rpago_mediopago").focus();
            return;
        } else if ($("#txt_rpago_recibido").val() == "" || isNaN($("#txt_rpago_recibido").val())) {
            $("#errorRegPago").html(GenerarAlertaWarning("Importe Recibido: campo invalido"));
            $("#txt_rpago_recibido").focus();
            return;
        }
    } else {
        if (isDate($("#txt_rpago_fecinicio").val(), "dd/MM/yyyy") == false) {
            $("#errorRegPago").html(GenerarAlertaWarning("Fecha Inicio: campo invalido"));
            $("#txt_rpago_fecinicio").focus();
            return;
        } else if (!$("#chk_rpago_letra").prop("checked")) {
            if ($("#tbl_rpago_cuota tbody").find("tr").length == 0) {
                $("#errorRegPago").html(GenerarAlertaWarning("Intervalo Dias: generar cuotas"));
                $("#txt_rpago_nucuota").focus();
                return;
            }

            var detalle = $("#tbl_rpago_cuota tbody").find("tr");

            for (var z = 0; z < detalle.length; z++) {
                var fila = $(detalle[z]).find("td");

                if (isDate(fila.eq(1).children().val(), "dd/MM/yyyy") == false) {
                    $("#errorRegPago").html(GenerarAlertaWarning("Fecha invalida"));
                    fila.eq(1).children().focus();
                    return;
                } else if (fila.eq(2).children().val().trim() == "" || parseFloat(fila.eq(2).children().val()) <= 0) {
                    $("#errorRegPago").html(GenerarAlertaWarning("Monto invalido"));
                    fila.eq(2).children().focus();
                    return;
                }

                var numero = fila.eq(0).html();
                var fecha = fila.eq(1).children().val();
                var monto = toDecimal(parseFloat(fila.eq(2).children().val()), 2);

                ls_detalle += numero + "~" + fecha + "~" + monto + "|";
            }

            ls_detalle = ls_detalle.substr(0, ls_detalle.length - 1);
        }
    }

    $.ajax({
        type: "POST",
        url: "page/operacion/atencion.aspx/GuardarCuentaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            nid_documento: $("#txh_idventa").val().split(",")[0],
            nu_documento: $("#txt_rpago_serieventa").val().trim() + "-" + $("#txt_rpago_numventa").val().trim(),
            fl_condicion: _fl_condicion_pago,
            fl_letra: ($("#chk_rpago_letra").prop("checked") ? 1 : 0),
            fl_moneda: (_fl_condicion_pago == "Contado" ? $("#sel_rpago_moneda").val() : $("#txt_rpago_monedaventa").val()),
            fe_pago: (_fl_condicion_pago == "Contado" ? $("#txt_rpago_fecpago").val() : ""),
            mo_cambio: (_fl_condicion_pago == "Contado" ? $("#txt_rpago_tipocambio").val() : 0),
            co_medio_pago: (_fl_condicion_pago == "Contado" ? $("#sel_rpago_mediopago").val() : ""),
            nu_medio_pago: (_fl_condicion_pago == "Contado" ? $("#txt_rpago_nupago").val() : ""),
            mt_abono: (_fl_condicion_pago == "Contado" ? $("#txt_rpago_abono").val() : ($("#txt_rpago_inicial").val() == "" ? 0 : $("#txt_rpago_inicial").val())),
            fe_inicio: $("#txt_rpago_fecinicio").val(),
            ls_detalle: ls_detalle
        }),
        async: true,
        beforeSend: function () {
            $("#btn_rpago_guardar").attr("disabled", true);
        },
        success: function (data) {
            if (data.d.error) {
                $("#btn_rpago_guardar").removeAttr("disabled");
                $("#errorRegPago").html(GenerarAlertaError(data.d.error));
                return;
            }

            if (_fl_condicion_pago == "Contado") $("#txt_rpago_recibido").focus();
            else $("#pnl_registropago").modal('hide');

            var tipoDoc = $("#txh_idventa").val().trim().split(",")[1];

            if (tipoDoc == "01") window.open('report/page/doc/facturaventa.aspx?id=' + $("#txh_idventa").val().split(",")[0] + '&print=1', '', 'fullscreen=no,width=850,height=600,top=50,left=100,scrollbars=yes,resizable=yes');
            else if (tipoDoc == "03") window.open('report/page/doc/boletaventa.aspx?id=' + $("#txh_idventa").val().split(",")[0] + '&print=1', '', 'fullscreen=no,width=850,height=600,top=50,left=100,scrollbars=yes,resizable=yes');
            else if (tipoDoc == "41") window.open('report/page/doc/notaventa.aspx?id=' + $("#txh_idventa").val().split(",")[0], '', 'fullscreen=no,width=850,height=600,top=50,left=100,scrollbars=yes,resizable=yes');

            $("#btn_buscar").click();
            $("#errorDiv").html(GenerarAlertaSuccess(data.d.success));
        },
        error: function (data) {
            $("#btn_rpago_guardar").removeAttr("disabled");
            $("#errorRegPago").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
    event.preventDefault();
});