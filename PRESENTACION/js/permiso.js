function ListaPermisos() {
    $.ajax({
        type: "POST",
        url: "permiso.aspx/ListarPermisosWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () {
            $('#local').empty();
            $("#frmPermiso :input").attr("disabled", true);
        },
        success: function (data, status) {
            if (!data.d.Activo) {
                $("#msg").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#local').append("<option value='" + data.d.Resultado[i].ID_LOCAL + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            $("#frmPermiso :input").removeAttr("disabled");
        },
        failure: function (data) { },
        error: function (data) { }
    });
}

$(function () {
    ListaPermisos();

    $(document).keyup(function (e) {
        if (e.keyCode == 13) {
            if ($(this).attr("id") == "local") $("#btnAceptar").click();
            else $("#local").focus();
        }
    });

    $("#btnAceptar").click(function () {
        var msjValida = "";

        if ($("#local").val() == "" || $("#local").val() == "0") msjValida += "Seleccione Local</br>";

        if (msjValida != "") {
            $("#msg").html(GenerarAlertaError(msjValida));
            return;
        }

        $.ajax({
            type: "POST",
            url: "permiso.aspx/AceptarWM",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                idLocal: $("#local :selected").val(),
                local: $("#local :selected").text()
            }),
            async: true,
            beforeSend: function () {
                $("#frmPermiso :input").attr("disabled", true);
            },
            success: function (data) {
                if (!data.d.Activo) {
                    $("#msg").html(GenerarAlertaError(data.d.Mensaje));
                    $("#frmPermiso :input").removeAttr("disabled");
                    $("#local").focus();
                    return;
                }

                window.location = data.d.Resultado;
            },
            error: function (data) {
                $("#msg").html(GenerarAlertaError("Inconveniente en la operación"));
                $("#frmPermiso :input").removeAttr("disabled");
                $("#local").focus();
            }
        });
    });
});