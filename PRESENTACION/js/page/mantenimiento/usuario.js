/*Inicializar Script*/
$(function () {
    $(document).prop("title", "LV::Usuario");

    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    });

    //Lista Data Inicial
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/usuario.aspx/ListaInicialWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () { },
        success: function (data) {
            if (data.d.error) {
                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                return;
            }

            $('#sel_perfil').append("<option value='0'>Seleccione</option>");
            for (var i = 0; i < data.d.Resultado.listaPerfil.length; i++) {
                $('#sel_perfil').append("<option value='" + data.d.Resultado.listaPerfil[i].ID_PERFIL + "'>" + data.d.Resultado.listaPerfil[i].DESCRIPCION + "</option>");
            }
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
});


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

$("#btn_limpiar").click(function () {
    $("#errorDiv").html('');
    $("#pnl_busqueda input:text").val('');
    $("#txt_bus_nombre").focus();
});

$("#btn_nuevo").click(function () {
    $("#errorEmpleado").html('');
    $('#pnl_empleado .modal-title').html('Registrar Empleado');
    $("#txh_idempleado").val('0');
    $("#txh_idusuario").val('0');
    $("#pnl_empleado select").val('0');
    $("#pnl_empleado input:text").val('');
    $('[name="rad_local"]').prop('checked', false);
    $('#chk_usuario').removeAttr("disabled");
    $('#chk_usuario').prop("checked", false);
    $('#txt_usuario').attr("disabled", "disabled");
    $('#sel_perfil').attr("disabled", "disabled");
    $('#sel_estadousuario').attr("disabled", "disabled");
    $('[name="rad_local"]').attr("disabled", "disabled");
    $("#pnl_empleado").modal('show');
});

$("#btn_buscar").click(function () {
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/usuario.aspx/BuscarEmpleadoWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            nombre: $("#txt_bus_nombre").val(), apellidos: $("#txt_bus_apellido").val()
        }),
        async: true,
        beforeSend: function () {
            $("#btn_buscar").attr("disabled", true);
            $('#tbl_empleado tbody').empty();
        },
        success: function (data) {
            $("#btn_buscar").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            var htmlBotones = '<button name="editar" class="btn btn-primary btn-xs"><i class="icon-pencil"></i></button> ' +
                                '<button name="anular" class="btn btn-danger btn-xs"><i class="icon-trash "></i></button> ';
            var html = '';
            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td style="display:none" data-usu="' + data.d.Resultado[i].USUARIO.ID_USUARIO + '">' + data.d.Resultado[i].ID_EMPLEADO + '</td>';
                html += '<td>' + htmlBotones + '</td>';
                html += '<td>' + data.d.Resultado[i].NOMBRES + '</td>';
                html += '<td>' + data.d.Resultado[i].APELLIDOS + '</td>';
                html += '<td>' + data.d.Resultado[i].CARGO + '</td>';
                html += '<td>' + data.d.Resultado[i].SUELDO + '</td>';
                html += '<td>' + data.d.Resultado[i].USUARIO.DSC_USUARIO + '</td></tr>';
            }

            $("#tbl_empleado tbody").append(html);

            $("#tbl_empleado button").click(function () {
                if ($(this).attr("name") == "editar") {
                    $('#pnl_empleado .modal-title').html('Editar Empleado');

                    $.ajax({
                        type: "POST",
                        url: "page/mantenimiento/usuario.aspx/ObtenerEmpleadoWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ idEmpleado: $(this).parent().parent().find("td").eq(0).html() }),
                        async: true,
                        beforeSend: function () {
                            $("#errorEmpleado").html('');
                            $("#tbl_empleado button").attr("disabled", true);
                        },
                        success: function (data) {
                            $("#tbl_empleado button").removeAttr("disabled");

                            if (data.d.error) {
                                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                                return;
                            }

                            $("#txh_idempleado").val(data.d.co_trabajador);
                            $("#txh_idusuario").val(data.d.beUsuario.co_usuario);
                            $("#txt_dni").val(data.d.nu_dni.trim());
                            $("#txt_natural").val(data.d.no_trabajador);
                            $("#txt_appaterno").val(data.d.no_ap_paterno);
                            $("#txt_apmaterno").val(data.d.no_ap_materno);
                            $("#txt_fecnac").val(formatDate(parseDateServer(data.d.fe_nacimiento), "dd/MM/yyyy"));
                            $("input:radio[value='" + data.d.co_sexo + "']").prop("checked", true);
                            $("#sel_estadocivil").val(data.d.no_estado_civil);
                            $("#sel_area").val(data.d.nid_area);
                            $("#txt_sueldo").val(data.d.nid_tipo_trabajador);
                            $("#txt_correo").val(data.d.no_correo);
                            $("#txt_telefono").val(data.d.nu_telefono.trim());
                            $("#txt_celular").val(data.d.nu_celular.trim());
                            $("#txt_experiencia").val(data.d.tx_experiencia_laboral);
                            $("#sel_departamento").val(data.d.coddpto);
                            $("#txt_direccion").val(data.d.tx_dir_domicilio);
                            $("#sel_corporacion").val(data.d.nid_corporacion);
                            $("#sel_estadotrabajador").val(data.d.fl_activo);

                            fc_obtener_cargo("", "Trabajador", "Seleccione", data.d.nid_cargo, data.d.nid_area);
                            fc_obtener_provincia("Seleccione", data.d.codprov, data.d.coddpto);
                            fc_obtener_distrito("Seleccione", data.d.coddist, data.d.coddpto, data.d.codprov);

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
                            $("#tbl_empleado button").removeAttr("disabled");
                        }
                    });
                    event.preventDefault();
                } else if ($(this).attr("name") == "anular") {
                    if (confirm("¿Esta seguro de anular trabajador?")) {
                        $.ajax({
                            type: "POST",
                            url: "page/mantenimiento/usuario.aspx/AnularEmpleadoWM",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ coTrabajador: $(this).parent().parent().find("td").eq(2).html() }),
                            async: true,
                            beforeSend: function () {
                                $("#tbl_empleado button").attr("disabled", true);
                            },
                            success: function (data) {
                                $("#tbl_empleado button").removeAttr("disabled");

                                if (data.d.error) {
                                    $("#errorDiv").html(GenerarAlertaError(data.d.error));
                                    return;
                                }

                                $("#errorDiv").html(GenerarAlertaSuccess(data.d.success));
                                $("#btn_buscar").click();
                            },
                            error: function (data) {
                                $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                                $("#tbl_empleado button").removeAttr("disabled");
                            }
                        });
                        event.preventDefault();
                    }
                } else if ($(this).attr("name") == "acceso" && $(this).attr("title") == 'Clave') {
                    if (confirm("¿Esta seguro de resetear clave?")) {
                        $.ajax({
                            type: "POST",
                            url: "page/mantenimiento/usuario.aspx/ResetearClaveWM",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({
                                coTrabajador: $(this).parent().parent().find("td").eq(2).html(),
                                corporacion: $(this).parent().parent().find("td").eq(0).html()
                            }),
                            async: true,
                            beforeSend: function () {
                                $("#tbl_empleado button").attr("disabled", true);
                            },
                            success: function (data) {
                                $("#tbl_empleado button").removeAttr("disabled");

                                if (data.d.error) {
                                    $("#errorDiv").html(GenerarAlertaError(data.d.error));
                                    return;
                                }

                                $("#errorDiv").html(GenerarAlertaSuccess(data.d.success));
                                $("#btn_buscar").click();
                            },
                            error: function (data) {
                                $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                                $("#tbl_empleado button").removeAttr("disabled");
                            }
                        });
                        event.preventDefault();
                    }
                } else if ($(this).attr("name") == "acceso") {
                    $('#pnl_acceso .modal-title').html('Acceso ' + $(this).attr("title"));

                    $.ajax({
                        type: "POST",
                        url: "page/mantenimiento/usuario.aspx/ObtenerTrabajadorAccesoWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({
                            coTrabajador: $(this).parent().parent().find("td").eq(2).html(),
                            corporacion: $(this).parent().parent().find("td").eq(0).html(),
                            acceso: $(this).attr("title")
                        }),
                        async: true,
                        beforeSend: function () {
                            $("#tbl_acceso tbody").empty();
                            $("#tbl_empleado button").attr("disabled", true);
                        },
                        success: function (data) {
                            $("#tbl_empleado button").removeAttr("disabled");

                            if (data.d.error) {
                                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                                return;
                            }

                            var htmlAcceso = '';
                            if (data.d.acceso == "Empresa") {
                                for (var i = 0; i < data.d.lista.length; i++) {
                                    htmlAcceso += '<tr><td><label class="label_check" for="chk_empresa' + data.d.lista[i].nid_empresa + '">';
                                    htmlAcceso += '<input style="width: 20px" id="chk_empresa' + data.d.lista[i].nid_empresa + '"';
                                    htmlAcceso += 'value="' + data.d.lista[i].nid_empresa + '" type="checkbox" />';
                                    htmlAcceso += data.d.lista[i].no_comercial + '</label></td></tr>';
                                }
                            } else if (data.d.acceso == "Almacen") {
                                for (var i = 0; i < data.d.lista.length; i++) {
                                    htmlAcceso += '<tr><td><label class="label_check" for="chk_almacen' + data.d.lista[i].nid_almacen + '">';
                                    htmlAcceso += '<input style="width: 20px" id="chk_almacen' + data.d.lista[i].nid_almacen + '"';
                                    htmlAcceso += 'value="' + data.d.lista[i].nid_almacen + '" type="checkbox" />';
                                    htmlAcceso += data.d.lista[i].no_almacen + '</label></td></tr>';
                                }
                            } else if (data.d.acceso == "Local") {
                                for (var i = 0; i < data.d.lista.length; i++) {
                                    htmlAcceso += '<tr><td><label class="label_check" for="chk_local' + data.d.lista[i].nid_local + '">';
                                    htmlAcceso += '<input style="width: 20px" id="chk_local' + data.d.lista[i].nid_local + '"';
                                    htmlAcceso += 'value="' + data.d.lista[i].nid_local + '" type="checkbox" />';
                                    htmlAcceso += data.d.lista[i].no_local + '</label></td></tr>';
                                }
                            } else if (data.d.acceso == "Menu") {
                                var menu = 0;
                                for (var i = 0; i < data.d.listaMenu.length; i++) {
                                    if (data.d.listaMenu[i].nid_menu != menu) {
                                        if (htmlAcceso != '' & data.d.listaMenu.length != (i + 1)) htmlAcceso += '</div></td></tr>';

                                        menu = data.d.listaMenu[i].nid_menu;
                                        htmlAcceso += '<tr><td><div class="control-label menuDetalle"><strong>' + data.d.listaMenu[i].no_menu + '</strong></div><div class="form-group" style="display:none">';
                                    }

                                    htmlAcceso += '<div class="checkbox"><label><input type="checkbox" value="';
                                    htmlAcceso += data.d.listaMenu[i].nid_menu + '~' + data.d.listaMenu[i].nid_opcion + '"/> ';
                                    htmlAcceso += data.d.listaMenu[i].no_opcion + '</label></div>';

                                    if (data.d.listaMenu.length == (i + 1)) {
                                        htmlAcceso += '</div></td></tr>';
                                        break;
                                    }
                                }
                            }

                            $("#tbl_acceso tbody").append(htmlAcceso);
                            $("#txh_idusuario").val(data.d.usuario.co_usuario);
                            $("#txh_acceso").val(data.d.acceso);

                            var listaActual = $("#tbl_acceso").find("input");
                            var accesoActual;

                            if (data.d.acceso == "Menu") {
                                $(".menuDetalle").click(function () {
                                    $(this).parent().find(".form-group").css("display", $(this).parent().find(".form-group").css("display") == "none" ? "" : "none");
                                });

                                accesoActual = data.d.lista;
                            } else {
                                accesoActual = (data.d.acceso == "Empresa" ? data.d.usuario.co_empresa : (data.d.acceso == "Almacen" ? data.d.usuario.co_almacen : data.d.usuario.co_local)).toString().split(",");
                            }

                            for (var i = 0; i < accesoActual.length; i++) {
                                for (var x = 0; x < listaActual.length; x++) {
                                    if (listaActual.eq(x).val() == accesoActual[i]) {
                                        listaActual.eq(x).prop("checked", true);
                                        break;
                                    }
                                }
                            }

                            $("#pnl_acceso").modal('show');
                        },
                        error: function (data) {
                            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                            $("#tbl_empleado button").removeAttr("disabled");
                        }
                    });
                    event.preventDefault();
                }
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

$("#chk_usuario").click(function () {
    if ($(this).is(":checked")) {
        $('#txt_usuario').removeAttr("disabled");
        $("#sel_perfil").removeAttr("disabled");
        $('#sel_estadousuario').removeAttr("disabled");
        $('[name="rad_local"]').removeAttr("disabled");
        $('#txt_usuario').val("");
        $('#sel_estadousuario').val("1");
    } else {
        $('#txt_usuario').attr("disabled", "disabled");
        $("#sel_perfil").attr("disabled", "disabled");
        $('#sel_estadousuario').attr("disabled", "disabled");
        $('[name="rad_local"]').attr("disabled", "disabled");
    }
});

$("#btn_guardar").click(function () {
    $("#errorEmpleado").html('');

    if ($("#txt_nombre").val().length < 3) {
        $("#errorEmpleado").html(GenerarAlertaWarning("Nombres: ingresar campo"));
        $("#txt_nombre").focus();
        return;
    } else if ($("#txt_apellido").val().length < 3) {
        $("#errorEmpleado").html(GenerarAlertaWarning("Apellidos: ingresar campo"));
        $("#txt_apellido").focus();
        return;
    } else if ($("#txt_cargo").val() == "0") {
        $("#errorEmpleado").html(GenerarAlertaWarning("Cargo: ingresar campo"));
        $("#txt_cargo").focus();
        return;
    } else if ($("#txt_sueldo").val() == "" || isNaN($("#txt_sueldo").val())) {
        $("#errorEmpleado").html(GenerarAlertaWarning("Sueldo: ingresar monto valido"));
        $("#txt_sueldo").focus();
        return;
    } else if ($("#chk_usuario").is(":checked")) {
        if ($("#txt_usuario").val().length < 3) {
            $("#errorEmpleado").html(GenerarAlertaWarning("Usuario: ingresar campo"));
            $("#txt_usuario").focus();
            return;
        } else if ($("#sel_perfil").val() == "0") {
            $("#errorEmpleado").html(GenerarAlertaWarning("Perfil: seleccione una opción"));
            $("#sel_perfil").focus();
            return;
        } else if ($("#sel_estadousuario").val() == "") {
            $("#errorEmpleado").html(GenerarAlertaWarning("Estado Usuario: seleccione una opción"));
            $("#sel_estadousuario").focus();
            return;
        } else if ($('[name="rad_local"]:checked').length == 0) {
            $("#errorEmpleado").html(GenerarAlertaWarning("Local: seleccione una opción"));
            return;
        }
    }

    var local = '';
    $('[name="rad_local"]:checked').each(function (i, item) {
        local += $(item).val() + ',';
    });
    if (local.length > 0) local = local.substr(0, local.length - 1);

    var eEmpleado = {
        ID_EMPLEADO: $("#txh_idempleado").val() == "" ? 0 : $("#txh_idempleado").val(),
        NOMBRES: $("#txt_nombre").val(),
        APELLIDOS: $("#txt_apellido").val(),
        CARGO: $("#txt_cargo").val(),
        SUELDO: $("#txt_sueldo").val(),
        USUARIO: {
            ID_USUARIO: $("#txh_idusuario").val() == "" ? 0 : $("#txh_idusuario").val(),
            DSC_USUARIO: $("#txt_usuario").val(),
            PERFIL: {
                ID_PERFIL: $("#sel_perfil").val()
            },
            LOCAL_PERFIL: local
        }
    };
    console.log(eEmpleado);

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/usuario.aspx/GuardarEmpleadoWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ eEmpleado: eEmpleado }),
        async: true,
        beforeSend: function () {
            $("#btn_guardar").attr("disabled", true);
        },
        success: function (data) {
            $("#btn_guardar").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorEmpleado").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
            $("#pnl_empleado").modal('hide');
            $("#btn_buscar").click();
        },
        error: function (data) {
            $("#errorEmpleado").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_guardar").removeAttr("disabled");
        }
    });
    event.preventDefault();
});

$("#btn_acceso_guardar").click(function () {
    $("#errorAcceso").html('');

    var ls_acceso = "";
    var listaActual = $("#tbl_acceso").find("input");

    if ($("#txh_acceso").val() == "Menu") {
        for (var i = 0; i < listaActual.length; i++) {
            ls_acceso += listaActual.eq(i).val() + "~" + (listaActual.eq(i).is(":checked") ? "0" : "1") + "|";
        }
    } else {
        for (var i = 0; i < listaActual.length; i++) {
            if (listaActual.eq(i).is(":checked")) {
                ls_acceso += listaActual.eq(i).val() + ",";
            }
        }
    }

    if (ls_acceso != '') {
        ls_acceso = ls_acceso.substr(0, ls_acceso.length - 1);
    }

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/usuario.aspx/GuardarTrabajadorAccesoWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            acceso: $("#txh_acceso").val(),
            co_usuario: $("#txh_idusuario").val(),
            ls_acceso: ls_acceso
        }),
        async: true,
        beforeSend: function () {
            $("#btn_acceso_guardar").attr("disabled", true);
        },
        success: function (data) {
            $("#btn_acceso_guardar").removeAttr("disabled");

            if (data.d.error) {
                $("#errorAcceso").html(GenerarAlertaError(data.d.error));
                return;
            }

            $("#errorDiv").html(GenerarAlertaSuccess(data.d.success));
            $("#pnl_acceso").modal('hide');
        },
        error: function (data) {
            $("#errorAcceso").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_acceso_guardar").removeAttr("disabled");
        }
    });
    event.preventDefault();
});