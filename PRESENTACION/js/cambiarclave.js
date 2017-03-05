$(function () {
    $("#info").html(GenerarAlertaInfo("Debe cambiar su contraseña por seguridad antes de ingresar al sistema."));

    $("#frmCambiar input").keypress(function (e) {
        if (e.keyCode == 13) {
            if ($(this).attr("id") == "clave") $("#claveR").focus();
            else $("#btnCambiar").click();
        }
    });

    $("#btnCambiar").click(function () {
        var claveUno = $("#clave").val();
        var claveDos = $("#claveR").val();

        if ($.trim(claveUno) == "") {
            $("#msg").html(GenerarAlertaError("Debe ingresar su nueva contraseña y no debe contener espacios."));
            return;
        }

        if (claveUno != claveDos) {
            $("#msg").html(GenerarAlertaError("Las contraseñas deben ser iguales"));
            return;
        }

        $.ajax({
            type: "POST",
            url: "cambiarClave.aspx/CambiarWM",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ clave: $("#clave").val() }),
            async: true,
            beforeSend: function () {
                $("#frmCambiar :input").attr("disabled", true);
            },
            success: function (data) {
                if (!data.d.Activo) {
                    $("#msg").html(GenerarAlertaError(data.d.Mensaje));
                    $("#clave").val("");
                    $("#claveR").val("");
                    $("#frmCambiar :input").removeAttr("disabled");
                    return;
                }

                window.location = data.d.Resultado;
            },
            error: function (data) {
                $("#msg").html(GenerarAlertaError("Inconveniente en la operación"));
                $("#frmCambiar :input").removeAttr("disabled");
                $("#usuario").focus();
            }
        });
    });
});