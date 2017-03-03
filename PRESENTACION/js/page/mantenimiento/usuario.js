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
    $('[name="rad_local"]:checked').each(function (i, item) {
        $(item).prop('checked', false);
    });
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

                            if (!data.d.Activo) {
                                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                                return;
                            }

                            $("#txh_idempleado").val(data.d.Resultado.ID_EMPLEADO);
                            $("#txh_idusuario").val(data.d.Resultado.USUARIO.ID_USUARIO);
                            $("#txt_nombre").val(data.d.Resultado.NOMBRES);
                            $("#txt_apellido").val(data.d.Resultado.APELLIDOS);
                            $("#txt_cargo").val(data.d.Resultado.CARGO);
                            $("#txt_sueldo").val(data.d.Resultado.SUELDO);

                            if (data.d.Resultado.USUARIO.ID_USUARIO != 0) {
                                $('#chk_usuario').attr("disabled", "disabled");
                                $('#chk_usuario').prop("checked", true);
                                $('#txt_usuario').removeAttr("disabled");
                                $("#sel_perfil").removeAttr("disabled");
                                $('#sel_estadousuario').removeAttr("disabled");
                                $('[name="rad_local"]').removeAttr("disabled");
                            } else {
                                $('#chk_usuario').removeAttr("disabled");
                                $('#chk_usuario').prop("checked", false);
                                $('#txt_usuario').attr("disabled", "disabled");
                                $("#sel_perfil").attr("disabled", "disabled");
                                $('#sel_estadousuario').attr("disabled", "disabled");
                                $('[name="rad_local"]').attr("disabled", "disabled");

                            }

                            $("#txt_usuario").val(data.d.Resultado.USUARIO.DSC_USUARIO);
                            $("#sel_perfil").val(data.d.Resultado.USUARIO.PERFIL.ID_PERFIL);
                            $("#sel_estadousuario").val(data.d.Resultado.USUARIO.ESTADO);

                            $('[name="rad_local"]:checked').each(function (i, item) {
                                $(item).prop('checked', false);
                            });
                            var local = data.d.Resultado.USUARIO.LOCAL_PERFIL.split(',');
                            for (var x = 0; x < local.length ; x++) {
                                $('[name="rad_local"][value="' + local[x] + '"]').prop('checked', true);
                            }

                            $("#pnl_empleado").modal('show');
                        },
                        error: function (data) {
                            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                            $("#tbl_empleado button").removeAttr("disabled");
                        }
                    });
                    event.preventDefault();
                } else if ($(this).attr("name") == "anular") {
                    if (confirm("¿Esta seguro de anular empleado?")) {
                        $.ajax({
                            type: "POST",
                            url: "page/mantenimiento/usuario.aspx/AnularEmpleadoWM",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ idEmpleado: $(this).parent().parent().find("td").eq(0).html() }),
                            async: true,
                            beforeSend: function () {
                                $("#tbl_empleado button").attr("disabled", true);
                            },
                            success: function (data) {
                                $("#tbl_empleado button").removeAttr("disabled");

                                if (!data.d.Activo) {
                                    $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                                    return;
                                }

                                $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                                $("#btn_buscar").click();
                            },
                            error: function (data) {
                                $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                                $("#tbl_empleado button").removeAttr("disabled");
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