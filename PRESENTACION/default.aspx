<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="PRESENTACION._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LV::Inicio</title>
    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/bootstrap-reset.css" rel="stylesheet" />
    <!--external css-->
    <link href="assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link href="assets/bootstrap-fileupload/bootstrap-fileupload.css" rel="stylesheet" />
    <link href="assets/bootstrap-datepicker/css/datepicker.css" rel="stylesheet" />
    <link href="assets/bootstrap-datetimepicker/css/datetimepicker.css" rel="stylesheet" />
    <!-- Custom styles for this template -->
    <link href="assets/font-awesome/css/style.css" rel="stylesheet" />
    <link href="assets/font-awesome/css/style-responsive.css" rel="stylesheet" />
    <!-- Estilos personalizados para esta plantilla -->
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/style-responsive.css" rel="stylesheet" />
</head>
<body>
    <section id="container" class="">
        <header class="header white-bg">
            <div class="sidebar-toggle-box">
                <div data-original-title="Mostrar o Esconder Menu" data-placement="right" class="icon-reorder tooltips"></div>
            </div>

            <a href="#" class="logo">SI<span>FCA</span></a>

            <div class="nav notify-row" id="top_menu">
                <!--  notification start -->
                <ul class="nav top-menu">
                    <!-- notification dropdown start-->
                    <li id="header_notification_bar" class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <i class="icon-bell-alt"></i>
                            <span class="badge bg-warning">0</span>
                        </a>
                        <ul class="dropdown-menu extended notification">
                            <%--<div class="notify-arrow notify-arrow-yellow"></div>
                            <li>
                                <p class="yellow">Usted tiene ' + data.d.length.toString() + ' notificacion(es)</p>
                            </li>
                            <li>
                                <a href="#!/page/venta/cotizacion">
                                    <span class="label label-danger">Rechazado</span>Factura 001-632001
                                </a>
                            </li>--%>
                        </ul>
                    </li>
                    <!-- notification dropdown end -->
                </ul>
                <!--  notification end -->
            </div>

            <div class="top-nav">
                <ul class="nav pull-right top-menu">
                    <li class="company-info hidden-phone">
                        <span class="label label-primary" id="companyLogged"></span>
                    </li>
                    <!-- user login dropdown start-->
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <img alt="" src="img/avatar-mini4.jpg" />
                            <span class="username"></span>
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu extended logout">
                            <div class="log-arrow-up"></div>
                            <li class="logoutLastChild"><a href="#" id="cerrarSesion"><i class="icon-key"></i>Cerrar Sesión</a></li>
                        </ul>
                    </li>
                    <!-- user login dropdown end -->
                </ul>
            </div>
        </header>
        <!--sidebar star-->
        <aside>
            <div id="sidebar" class="nav-collapse">
                <!-- sidebar menu start-->
                <ul class="sidebar-menu" id="nav-accordion">
                    <li>
                        <a href="#">
                            <i class="icon-home"></i>
                            <span>Inicio</span>
                        </a>
                    </li>
                </ul>
                <!-- sidebar menu end-->
            </div>
        </aside>
        <!--sidebar end-->
        <!--main content start-->
        <section id="main-content">
            <section class="wrapper site-min-height">
                <!-- page start-->
                Page content goes here
                <!-- page end-->
            </section>
        </section>
        <!--main content end-->
        <!--footer start-->
        <footer class="site-footer">
            <div class="text-center">
                2017 &copy; Sistema de Hoteleria by GCM.
                <a href="#" class="go-top">
                    <i class="icon-angle-up"></i>
                </a>
            </div>
        </footer>
    </section>

    <!-- js placed at the end of the document so the pages load faster -->
    <script src="js/all/jquery.js" type="text/javascript"></script>
    <script src="js/all/jquery-migrate-1.2.1.js" type="text/javascript"></script>
    <script src="js/all/jquery.history.js" type="text/javascript"></script>
    <script src="js/all/bootstrap.min.js" type="text/javascript"></script>
    <script src="js/all/jquery.dcjqaccordion.2.7.js" type="text/javascript"></script>
    <script src="js/all/jquery.scrollTo.min.js" type="text/javascript"></script>
    <script src="js/all/jquery.nicescroll.js" type="text/javascript"></script>
    <script src="assets/bootstrap-fileupload/bootstrap-fileupload.js" type="text/javascript"></script>
    <script src="assets/bootstrap-datepicker/js/bootstrap-datepicker.js" type="text/javascript"></script>
    <script src="assets/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js" type="text/javascript"></script>
    <script src="assets/bootstrap-inputmask/bootstrap-inputmask.min.js" type="text/javascript"></script>
    <!--common script for all pages-->
    <script src="js/general.js" type="text/javascript"></script>
    <script src="js/default.js?v=1.1" type="text/javascript"></script>
    <script src="js/all/date.js" type="text/javascript"></script>
</body>
</html>
