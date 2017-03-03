<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="cambiarclave.aspx.cs" Inherits="PRESENTACION.cambiarclave" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LV::Cambiar clave</title>
    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap-reset.css" rel="stylesheet" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <!--external css-->
    <link href="assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <!-- Custom styles for this template -->
    <link href="assets/font-awesome/css/style.css" rel="stylesheet" />
    <link href="assets/font-awesome/css/style-responsive.css" rel="stylesheet" />
</head>
<body class="login-body">
    <div class="container">
        <form id="frmCambiar" class="form-signin">
            <h2 class="form-signin-heading">LAS VEGAS</h2>
            <div class="login-wrap">
                <div id="info"></div>
                <div id="msg"></div>
                <label class="control-label">Contraseña Nueva</label>
                <input id="clave" type="password" class="form-control" autofocus="autofocus" />
                <label class="control-label">Repetir Contraseña Nueva</label>
                <input id="claveR" type="password" class="form-control" />
                <button id="btnCambiar" type="button" class="btn btn-lg btn-login btn-block">Aceptar</button>
            </div>
        </form>
    </div>
    <script src="js/all/jquery.js" type="text/javascript"></script>
    <script src="js/all/bootstrap.min.js" type="text/javascript"></script>
    <script src="js/general.js" type="text/javascript"></script>
    <script src="js/cambiarClave.js" type="text/javascript"></script>
</body>
</html>
