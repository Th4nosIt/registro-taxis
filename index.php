<?php
	require( './../inc/conexion.php' );
  require( './../inc/functions.php');


  if(!isset($_SESSION['logusuario']) || !comprobarGrupo($_SESSION['grupos']) || (!(in_array("GURBANISMO",$_SESSION['grupos'])||in_array("GDURBANISTICA",$_SESSION['grupos'])) && $_SESSION['misGrupos']!=['GURBANCONSULTA']) )
    header('Location: ./../index.php');
 
  //obtenerRolSeguimiento($_SESSION['logusuario'], $conexion);



?>
<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>
    <?php
    if (isset($_SESSION['nombre_registro']))
      echo $_SESSION['nombre_registro'];
    ?>
    </title>
    <!-- FOUNDATION 6 SOLO PARA EL MODULO DE ESCUELA DE MUSICA Y SEGUIMIENTO DE CITAS-->
    <link rel="stylesheet" href="css/foundation.css" />
    <link rel="stylesheet" href="css/styles.css"/>
    <link rel="stylesheet" href="css/motion-ui.min.css" />
    <link rel="stylesheet" href="css/app.css" />
    <!-- <link rel="stylesheet" href="css/foundation.min.css" /> -->
    <!-- <link rel="stylesheet" href="css/docs.css" /> -->
    <!-- <link rel="stylesheet" href="./../css/styles.css"/> -->
    <link rel="stylesheet" href="./../css/jquery.jqplot.min.css"/>
    <!-- <link rel="stylesheet" href="css/foundation-select.css"/> -->
    <link rel="stylesheet" href="./../css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="./../css/jquery-ui.min.css"  />
    <link rel="stylesheet" href="css/progress-wizard.min.css"  />
    <link rel="stylesheet" type="text/css" href="./../css/foundation-icons/foundation-icons.css"  /> <!-- JQUERY UI -->
    <!-- <link rel="stylesheet" href="obras/css/print.css" media="printer" /> -->
    <script src="./../js/vendor/modernizr.js"></script>
  </head>
  <body>

    <input type='hidden' value="<?php if (isset($_SESSION['nombre_registro'])) echo $_SESSION['nombre_registro'];?>" id="registroValor"/>
    <input type='hidden' value="<?php if(isset($_SESSION['anio'])) echo $_SESSION['anio']; else{ $_SESSION['anio']=date('Y'); echo $_SESSION['anio'];}?>" id="anioActual"/>
<div class="row masterhead" id="cabecera">
  <div class="large-6 columns">
    <div class="nav-bar right">


    </div>
    <h1 class='text-white'><img src="./../img/escudo-orotava-2.png" alt="Logotipo Orotava" id="imgcabecera"/> <?php if (isset($_SESSION['nombre_registro'])) echo $_SESSION['nombre_registro'];?>&nbsp;
    </h1>
  </div>
  <div class="large-6 columns a-la-derecha">
    <h6 class='text-white'><span class='negrita'> <?php if (isset($_SESSION['nombre_registro'])) echo $_SESSION['nombre_registro'];?></span> | <a class='text-info' title='Desconectar' href='./../inc/logout.php'><i class='fi-power'></i></a></h6><h6 class='text-white'><span class=''><i class='link fi-mail a-la-derecha size-19' id='btn-notificar' title='Contactar con el Administrador'></i></span></h6>";
    ?>
  </div>
  <!-- <hr/> -->
</div><!-- row cabecera -->
<div class="row" id="miguitasDePan">
  <div class='large-12 columns'>
    <ul class="breadcrumbs">
      <li><a href="./../menu.php">Inicio</a></li>
      <li class="disabled"><?php if (isset($_SESSION['nombre_registro'])) echo $_SESSION['nombre_registro'];?></li>
    </ul>
  </div>
  <hr />
</div><!-- row miguitasDePan -->
<!-- <div class="row">
  
</div> -->
<!-- <div class="row" id="contenedorFichas">-->
<div class="row" id="contenedorFilaAcciones">
  <div class="large-2 columns large-offset-1" id="panelAcciones">
    <div class="row"> 
      <article class="centrado">
        <h3>Acciones</h3>
      </article>
      <div id='cajonMenu' class="large-12 columns radius secondary callout small">
        <div class='large-12 columns'>
          <span id='mnPortada' class="radius expanded size-21"><i class="fi-home"></i>Portada</span>
        </div>         
        <hr />
        <div class='large-12 columns'>
          <span id='mnLicencia' class="radius expanded size-21"><i class="fi-database"></i>Licencias</span>
        </div>         
        <hr />
        <ul class="menu vertical">      
          <li><a id='btn-altaLicencia' >&nbsp;Alta</a></li>
          <li><a id='btn-cambiotitular' >&nbsp;Transmisiones</a></li>
          <li><a id='btn-cambiovehiculo'>&nbsp;Cambio de Vehículo</a></li>
          <li><a id='btn-autoriza' >&nbsp;Autorizaciones</a></li>
          <li><a id='btn-subvencion' >&nbsp;Subvenciones</a></li>
          <li><a id='btn-expediente' >&nbsp;Expedientes</a></li>
          <li><a id='btn-historico' >&nbsp;Histórico</a></li>
        </ul>
        <hr />
        <div class='large-12 columns'>
          <span id='mnVehiculo' class="radius expanded size-21"><i class="fi-wrench"></i>Vehículos</span>
        </div>         
        <hr />
        <ul class="menu vertical" style="display: none;">      
          <li><a id='btn-seguros' >&nbsp;Seguros</a></li>
          <li><a id='btn-revision' >&nbsp;Revisiones</a></li>
          <li><a id='btn-inspeccion' >&nbsp;Inspecciones</a></li>
        </ul>
        <hr />
        <div class='large-12 columns'>
          <span id='mnGestion' class="radius expanded size-21"><i class="fi-widget"></i>Gestión</span>
        </div>         
        <hr />
        <ul class="menu vertical" style="display: none;">      
          <li><a id='btn-marcaModelo' >&nbsp;Marcas/Modelos</a></li>
          <li><a id='btn-emisora' >&nbsp;Emisoras</a></li>
          <li><a id='btn-titular' >&nbsp;Titulares</a></li>
          <li><a id='btn-vehiculo' >&nbsp;Vehículos</a></li>
          <li><a id='btn-taximetro' >&nbsp;Taxímetros</a></li>
          <li><a id='btn-conductor' >&nbsp;Conductores</a></li>
        </ul>
        <hr />
      </div>
      <div id='cajaResultado' class="large-12 columns radius secondary callout small oculto" >

      </div>
    </div>
  </div><!-- /large-3 columns -->
<!--   <div class="large-1 columns large-offset-1"></div> -->

  <div class="large-9 columns large-offset-1">
    <div class="row" id="info"> 
      <article class="centrado">
        <h4>Portada</h4>
      </article>
      <hr />
      <?php
        /*if ( !isset($_SESSION['logrol']) || ((isset($_SESSION['logstate'])) && ($_SESSION['logstate']!=1))  )
          echo "<h5><u>Error</u>: 20008: No tiene permisos para utilizar esta aplicación. Contacte con el administrador.</h5>";
        else{*/
      ?>
      <h5>
        Aplicación para la gestión y registro de Licencias de Taxis otorgadas por el Ayuntamiento de la Orotava...
      </h5>
      <hr />
      <div id='tablaLicencias'></div>
      
    <hr />
    </div><!-- row info -->
    <div class="row oculto" id="contenedorAccionesLicencia"></div>
    <div class="row oculto" id="contenedorAccionesVehiculo"></div>
    <div class="row oculto" id="contenedorAccionesGestion"></div>


  </div><!-- /large-9 columns -->
</div><!-- /row contenedorFilaAcciones -->  

  
<footer class="row" id="pie">
  <div class="large-12 columns">
    <hr/>
    <div class="row">
      <div class="large-6 columns">
        <p>© Excmo. Ayuntamiento de La Orotava 2014 - <?php echo $_SESSION['anio'];?></p>
      </div>
    </div>
  </div>
</footer> <!-- footer row pie -->

<!-- <div id='modificacionesModal' class='reveal tiny' data-reveal data-close-on-click ></div> -->

<div class='small reveal' id='mensajeModal' data-close-on-click='false' data-close-on-esc='false' data-reveal></div>

    <script src="./../js/vendor/jquery.js"></script>
    <script src="./../js/vendor/jquery-ui.min.js"></script>
    <script src="./../js/vendor/tinyLimiter.min.js"></script>
    <!-- FOUNDATION 6 SOLO PARA EL MODULO DE ESCUELA DE MUSICA -->
    <!--<script src="js/foundation.min.js"></script>-->
    <script src="js/foundation.js"></script>
    <script src="js/app.js"></script>
    <!--<script src="./../js/foundation.min.js"></script>-->
    <script src="./../js/vendor/jquery.dataTables.js"></script>
    <script src="js/functions.js"></script>
    <script src="js/functions_bis.js"></script>
    <script src="js/functions_bis2.js"></script>
    <script src="js/functions_bis3.js"></script>
    <script src="js/functions_bis4.js"></script>
    <script src="js/functions_bis5.js"></script>
    <script src="js/functions_bis6.js"></script>
    <script src="js/functions_bis7.js"></script>
    <script src="js/functions_bis8.js"></script>
    <script src="js/validate.js"></script>
    <script src="js/main.js"></script>
    <script src="js/main_bis.js"></script>
    <script src="js/main_bis2.js"></script>
    <script src="js/main_bis3.js"></script>
    <script src="js/main_bis4.js"></script>
    <script src="js/main_bis5.js"></script>
    <script src="js/main_bis6.js"></script>
    <script src="js/main_bis7.js"></script>
    <script src="js/main_bis8.js"></script>
    <!--<script>
    //   // $('select').foundationSelect();
    //   $(document).foundation();
    //   // $(document).foundation('close_on_background_click', true);
    </script>-->
  </body>
</html>