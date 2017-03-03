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
            if (data.d.error) {
                $("#msg").html(GenerarAlertaError(data.d.error));
                return;
            }

            for (var i = 0; i < data.d.listaLocal.length; i++) {
                $('#local').append("<option value='" + data.d.listaLocal[i].nid_local + "'>" + data.d.listaLocal[i].no_local + "</option>");
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
            if ($(this).attr("id") == "empresa") $("#almacen").focus();
            else if ($(this).attr("id") == "almacen") $("#local").focus();
            else if ($(this).attr("id") == "local") $("#btnAceptar").click();
            else $("#empresa").focus();
        }
    });

    $("#btnAceptar").click(function () {
        var msjValida = "";
        if ($("#empresa").val() == "" || $("#empresa").val() == "0") msjValida += "Seleccione Empresa</br>";
        if ($("#almacen").val() == "" || $("#almacen").val() == "0") msjValida += "Seleccione Almacen</br>";
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
                idEmpresa: $("#empresa :selected").val(),
                idAlmacen: $("#almacen :selected").val(),
                idLocal: $("#local :selected").val(),
                empresa: $("#empresa :selected").text(),
                almacen: $("#almacen :selected").text(),
                local: $("#local :selected").text()
            }),
            async: true,
            beforeSend: function () {
                $("#frmPermiso :input").attr("disabled", true);
            },
            success: function (data) {
                if (data.d.error) {
                    $("#msg").html(GenerarAlertaError(data.d.error));
                    $("#frmPermiso :input").removeAttr("disabled");
                    $("#empresa").focus();
                    return;
                }
                
                window.location = data.d.redirect;
            },
            error: function (data) {
                $("#msg").html(GenerarAlertaError("Inconveniente en la operación"));
                $("#frmPermiso :input").removeAttr("disabled");
                $("#usuario").focus();
            }
        });
    });
});