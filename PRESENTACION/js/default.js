var _globalNotificacion;

function documentLoad() {
    var url = $(location).attr('href');

    if (url.indexOf("#!") != -1) {

        var elem = url.split("#!/");
        var get = elem[elem.length - 1];

        $(".wrapper").empty().html("Cargando...");

        $.get(get + '.aspx', function (data) {
            $(".wrapper").html(data);

            if ($("#sidebar").css("position") == "absolute") $('#sidebar > ul').hide();

            $('body, html').animate({
                scrollTop: 0
            }, 1000);
        }).fail(function () {
            $(".wrapper").empty().html(GenerarAlertaWarning("No disponible."));
        });

    } else {
        $.get('page/inicio.aspx', function (data) {
            $(".wrapper").html(data);

            $('body, html').animate({
                scrollTop: 0
            }, 1000);
        });
    }
}

$(document).ready(function () {
    $.history.init(documentLoad);

    InfoSesion();

    $("#cerrarSesion").click(function () {
        $.ajax({
            type: "POST",
            url: "default.aspx/CerrarSesionWM",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (data, status) {
                window.location = data.d;
            },
            error: function (data) { }
        });
    });
});

function InfoSesion() {
    $.ajax({
        type: "POST",
        url: "default.aspx/InfoSesionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data, status) {
            if (data.d.estado == "error") {
                alert(data.d.descripcion);
                window.location = "login.aspx";
                return;
            }
            /************************SESSION****************************/
            $(".username").text(data.d.Usuario);
            $("#companyLogged").text(data.d.EmpresaDesc + " - " + data.d.LocalDesc);

            /************************MENU****************************/
            var htmlMenu = '';
            var nid_menu_anterior = 0;

            for (var i = 0; i < data.d.ListaMenu.length; i++) {
                //Lista de Menus
                if (data.d.ListaMenu[i].nid_menu != nid_menu_anterior) {
                    
                    if (htmlMenu != '') htmlMenu += '</ul></li>';

                    htmlMenu += '<li class="sub-menu">' +
                                      '<a href="javascript:;" >' +
                                          '<i class="icon-gears"></i>' +
                                          '<span>' + data.d.ListaMenu[i].no_menu + '</span>' +
                                      '</a><ul class="sub">';
                }
                nid_menu_anterior = data.d.ListaMenu[i].nid_menu;

                //Lista de Opciones
                htmlMenu += '<li><a  href="#!/' + data.d.ListaMenu[i].url_pagina + '">' + data.d.ListaMenu[i].no_opcion + '</a></li>';
            }

            $(".sidebar-menu").append(htmlMenu);

            if (data.d.Perfil == 2) _globalNotificacion = setInterval(InfoNotificacionAlmacen, 10000);

            $.getScript("js/all/common-scripts.js")
            .fail(function (jqxhr, settings, exception) {
                alert("Error: No se ha cargando un complemento del sistema (common-scripts.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
            });
        },
        error: function (data) { }
    });
}

function EnviarNotificacion(comprobante, idDoc) {
    $.ajax({
        type: "POST",
        url: "default.aspx/RegistrarNotificacion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            comprobante: comprobante, idDoc: idDoc
        }),
        async: true,
        success: function (data) {
            if (data.d.error) {
                alert(data.d.error);
            }
        },
        error: function (data) { }
    });
}

function InfoNotificacionAlmacen() {
    $.ajax({
        type: "POST",
        url: "default.aspx/InfoNotificacionAlmacen",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {
            if (data.d.error) {
                return;
            }

            $("#header_notification_bar ul").empty();
            $("#header_notification_bar a span").html("0");

            if (data.d.length > 0) {
                var htmlNotif = '';
                for (var i = 0; i < data.d.length; i++) {
                    htmlNotif += '<li><a href="#!/' + data.d[i].co_comprobante_pago.trim() + '-' + data.d[i].nid_documento.toString() + '#!/page/almacen/ordenalmacen">' +
                        '<span class="label label-warning">Pendiente</span>' + data.d[i].no_comprobante_pago + ' ' + data.d[i].nu_documento + '</a>';
                }

                $("#header_notification_bar a span").html(data.d.length.toString());
                $("#header_notification_bar ul").append(htmlNotif);

                $('#audio_fca')[0].play(); //Emite sonido de alerta
            }
        },
        error: function (data) { }
    });
}

function InfoNotificacionUsuario() {
    $.ajax({
        type: "POST",
        url: "default.aspx/InfoNotificacionVenta",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {
            if (data.d.error) {
                return;
            }

            $("#header_notification_bar ul").empty();

            var htmlNotif = '<div class="notify-arrow notify-arrow-yellow"></div><li><p class="yellow">Usted tiene ' + data.d.length.toString() + ' notificacion(es)</p></li>';

            for (var i = 0; i < data.d.length; i++) {
                htmlMenu += '<li><a href="#!/page/almacen/almacen#!/' + data.d[i].no_comprobante_pago + '-' + data.d[i].nid_documento.toString() + '">' +
                    '<span class="label label-warning">Pendiente</span>' + data.d[i].no_comprobante_pago + ' ' + data.d[i].nu_documento + '</a>';
            }

            $("#header_notification_bar a span").html(data.d.length.toString());
            $("#header_notification_bar ul").append(htmlMenu);
        },
        error: function (data) { }
    });
}