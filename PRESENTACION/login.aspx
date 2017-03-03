<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="PRESENTACION.login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Las Vegas</title>
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
        <form id="frmLogin" class="form-signin">
            <h2 class="form-signin-heading">LAS VEGAS</h2>
            <div class="login-wrap">
                <div id="msgError"></div>
                <label class="control-label">Usuario</label>
                <input id="usuario" name="usuario" type="text" class="form-control" placeholder="Usuario" autofocus="autofocus" />
                <label class="control-label">Contraseña</label>
                <input id="clave" name="clave" type="password" class="form-control" placeholder="Contraseña" />
                <button id="btnAcceder" type="button" class="btn btn-lg btn-login btn-block">Ingresar</button>
            </div>
        </form>
    </div>
    <script src="js/all/jquery.js" type="text/javascript"></script>
    <script src="js/all/bootstrap.min.js" type="text/javascript"></script>
    <script src="js/general.js" type="text/javascript"></script>
    <script src="js/login.js" type="text/javascript"></script>
</body>
</html>
