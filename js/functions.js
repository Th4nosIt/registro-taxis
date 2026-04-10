/******************************/
/* CARGA INICIAL DE LICENCIAS */
/******************************/
function loadPortada()
{
  $.getJSON("./inc/loadlicenses.php",{'per_page':10},function(data){
    var items;
    items="<table id='mitabla'><thead><th rel='0' width='20%' class='datatable-nosort'>Número de Licencia</th><th rel='1' class='datatable-nosort'>Titular</th><th rel='2' width='20%' class='centrado datatable-nosort'>Estado</th></thead><tbody>";

    if (data.indexOf("Sindatos") == -1)
      $.each(data,function(clave,valor){
        var tit;
        if (valor.idtit!=null)
        {
          lnktit="<a id='verExpediente_" + valor.id + "' title ='Ver Expediente' data-id=" + valor.id + " data-name='" + valor.id + "' >" + valor.numlic +  "</a>";
          tit = valor.apetit + ", " + valor.nomtit;
          sta = "<span class='rojo'>Asignada</span>";
        }
        else{
          lnktit=valor.numlic;
          tit = " - ";
          sta = "<span class='verde'>Sin Asignar</span>";
        }

        items += "<tr><td class='centrado'>" + lnktit+ "</td><td>"+ tit + "</td><td class='centrado'>" + sta + "</td></tr>";
      });//each
    else
      items+="<tr><td></td><td></td><td>No existen datos que mostrar</td><td></td><td></td></tr>";

    items+="</tbody></table>";
    $("#tablaLicencias").html(items);
    tablaEspecialConDatos($("#mitabla"),"Licencias");
    activarMenus(1);
  });//getJSON
}//load portada

/****************************************/
/* FUNCIONES PARA AÑADIR LICENCIA NUEVA */
/****************************************/
function seccionLicenciaAlta(){
	var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>ALTA DE LICENCIA</article></div><div class='row' id='subseccionFormularioAlta'><form method='post' id='form_register_licencia' data-abide><div class='row' ><div id='cajaBarraProgreso'class='large-12 columns'><ul class='progress-indicator'><li class='active'><span class='bubble'></span> Licencia</li><li><span class='bubble'></span> Titular</li><li><span class='bubble'></span> Conductor</li><li><span class='bubble'></span> Vehículo</li><li><span class='bubble'></span> Emisora y Terminar</li></ul></div></div><div class='row'><div class='large-3 columns' id='selectorLicencia'><label for='sltLicencia'>Seleccione Licencia<select id='sltLicencia' name='sltLicencia'></select></label></div><div class='large-9 columns resumen' id='resumenLecturaLicencia'></div></div><hr class='oculto' id='rayita' /><div class='row'><div class='large-12 columns espacioAnterior' id='subSeccionTitular'></div></div></form></div>";
    

    $("#contenedorAccionesLicencia").html(contenido);
    $("#sltLicencia").load("./inc/loadselectlicense.php",{'tipo':'libre'});


}//fin seccion Alta Licencia

function subSeccionTitular(){
  $(".progress-indicator li:eq(1)").addClass("active");
	var contenido="<fieldset id='fieldsetTitutar'><legend>Datos del Titular</legend><div class='row'><div class='large-3 columns'><input type='text' id='inpNIFNIET' name='inpNIFNIET' placeholder='NIF / NIE' maxlength='9' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' title='El campo debe coincidir con el siguiente formato: 00000000A ó X0000000Z'/><span class='txtInfoTabula'>Pulse tabulador para validar</span></div><div class='large-9 columns resumen' id='resumenLecturaTitular'></div></div><div class='row'><div class='large-6 columns'><label for='inpNomTit' >Nombre del Titular<input type='text' id='inpNomTit' name='inpNomTit' readonly='readonly' maxlength='40'/></label></div><div class='large-6 columns'><label for='inpApeTit' >Apellidos del Titular<input type='text' id='inpApeTit' name='inpApeTit'readonly='readonly' maxlength='40'/></label></div></div><div class='row'><div class='large-8 columns'><label for='inpDomTit' >Domicilio del Titular<input type='text' id='inpDomTit' name='inpDomTit'readonly='readonly' maxlength='80'/></label></div><div class='large-4 columns'><label for='inpTelTit' >Teléfono<input type='text' id='inpTelTit' name='inpTelTit'readonly='readonly' maxlength='9'/></label></div></div><div class='row' id='cajaRepresentante'><div class='row'><div class='large-12 columns'><select id='tieneRepresentante' name='tieneRepresentante' disabled='disabled' class='elementoInactivoFondo'><option value='0' selected='selected'>No tiene Representante</option><option value='1'>Tiene Representante</option></select></div></div></div></div></fieldset>";
    
    $("#subSeccionTitular").html(contenido);
    contenido="<div class='row' id='cajaBotonTitularyContinuar'><div class='large-12 columns a-la-derecha'><a id='btnGuardarTitularyContinuar' class='button disabled'>Guardar y continuar</a></div></div>";
    $("#form_register_licencia").append(contenido);
    $("#inpNIFNIET").focus();
}//fin seccion Alta Licencia

function subSeccionConductor(tit){
  var contenido="<input type='hidden' id='titularLicencia' value='" + tit + "' /><hr /><fieldset id='fieldsetSelectorConductor'><legend>Datos del Conductor</legend><div class='row' id='cajaConductor'><div class='large-12 columns'><select id='esConductor' name='esConductor' ><option value='0' >No es Conductor</option><option value='1' selected='selected'>Es Conductor</option></select></div></div><div class='row'><div class='large-12 columns'><small><div class='nota'><span class='negrita rojo'>No es Conductor</span> para añadir un conductor asalariado.<br /><span class='negrita rojo'>Es Conductor</span> para elegir al titular como conductor de la licencia.</div></small></div></div><div id='formularioConductor' class='oculto'></div></fieldset>";
    
    $("#subSeccionConductor").html(contenido);
    contenido="<div class='row' id='cajaBotonConductoryContinuar'><div class='large-12 columns a-la-derecha'><a id='btnGuardarConductoryContinuar' class='button'>Guardar y continuar</a>&nbsp;<a id='btnVolver' class='button disabled'>Atrás</a></div></div>";
    $("#form_register_licencia").append(contenido);
    $("#inpNIFNIET").focus();
}//fin seccion Alta Licencia

function subSeccionVehiculo(){
  //var contenido="<fieldset id='fieldsetVehiculo'><legend>Datos del Vehículo</legend><div class='row'><div class='large-2 columns'><input type='text' id='inpMatricula' name='inpMatricula' placeholder='Matrícula' maxlength='8' pattern='^[0-9]{4}[A-Z|a-z]{3}$' title='El campo debe coincidir con el siguiente formato: 0000ABC ó AA0000MM'/></div><div class='large-10 columns' id='resumenLecturaVehiculo'></div></div><div class='row'><div class='large-4 columns'><label for='sltMarcaV' >Marca<select id='sltMarcaV' name='sltMarcaV' data-id='ve' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-4 columns'><label for='sltModeloV' >Modelo<select id='sltModeloV' name='sltModeloV' disabled='disabled' class='elementoInactivoFondo'><option value=0>--Seleccione</option></select></label></div><div class='large-4 columns'><label for='inpNumBastidor' >Número de Bastidor<input type='text' id='inpNumBastidor' name='inpNumBastidor'readonly='readonly' maxlength='40' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$'/></label></div></div><div class='row'><div class='large-3 columns'><label for='inpFechaMatricula' >Fecha Matriculación<input type='text' id='inpFechaMatricula' name='inpFechaMatricula'readonly='readonly' maxlength='10'/></label></div><div class='large-3 columns'><label for='inpFechaITV' >Fecha Validez ITV<input type='text' id='inpFechaITV' name='inpFechaITV'readonly='readonly' maxlength='10'/></label></div><div class='large-3 columns'><label for='sltTipoCombustible' >Tipo de Combustible<select id='sltTipoCombustible' name='sltTipoCombustible' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-3 columns'><label for='inpPlazas' >Plazas<input type='text' id='inpPlazas' name='inpPlazas'readonly='readonly' maxlength='2' pattern='^[0-9]{2}$'/></label></div></div><div class='row'><fieldset id='elementosAdicionales'><div class='large-3 columns'><label for='inpDiscapacita' >A. Discapacitados<br /><input type='checkbox' id='inpDiscapacita' name='inpDiscapacita' disabled='disabled' title='Adaptado a discapacidados' /></label></div><div class='large-2 columns'><label for='inpGPS' >GPS<br /><input type='checkbox' id='inpGPS' name='inpGPS' disabled='disabled' title='Dispone de GPS'/></label></div><div class='large-3 columns'><label for='inpImpresora' >Impresora Recibos<br /><input type='checkbox' id='inpImpresora' name='inpImpresora' disabled='disabled' title='Dispone de Impresora de Recibos'/></label></div><div class='large-2 columns'><label for='inpPagoTarjeta' >Datáfono<br /><input type='checkbox' id='inpPagoTarjeta' name='inpPagoTarjeta' disabled='disabled' title='Dispone Pago con Tarjeta' /></label></div><div class='large-2 columns'><label for='inpMampara' >Mampara<br /><input type='checkbox' id='inpMampara' name='inpMampara' disabled='disabled' title='Dispone de Mampara' /></label></div></fieldset></div><div class='row'><div class='large-12 columns'><label for='inpOtros' >Otras características<textarea id='inpOtros' name='inpOtros' maxlength='250' size='3' readonly='readonly'></textarea></label></div></div><div class='row' id='cajaTaximetro'><fieldset><legend>Datos del Taximetro</legend><div class='row'><div class='large-4 columns'><input type='text' id='inpNumIdentifica' name='inpNumIdentifica'readonly='readonly' maxlength='40' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' placeholder='Número de identificación'/></div><div class='large-8 columns' id='resumenLecturaTaximetro'></div></div><div class='row'><div class='large-4 columns'><label for='sltMarcaT' >Marca Taxímetro <i class='fa fa-plus-circle desactivado' id='btnInsertaMarcaT'></i><select id='sltMarcaT' name='sltMarcaT' data-id='ta' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-4 columns'><label for='sltModeloT' >Modelo Taxímetro <i class='fa fa-plus-circle desactivado' id='btnInsertaModeloT'></i><select id='sltModeloT' name='sltModeloT' disabled='disabled' class='elementoInactivoFondo'><option value=0>-- Seleccione</option></select></label></div><div class='large-4 columns'><label for='inpRevisionTaximetro' >Fecha Revisión<input type='text' id='inpRevisionTaximetro' name='inpRevisionTaximetro'readonly='readonly' maxlength='10'/></label></div></div><div class='row'><div class='large-8 columns'><label for='inpTaller' >Taller Instalador<input type='text' id='inpTaller' name='inpTaller' readonly='readonly' /></label></div><div class='large-4 columns'><label for='inpFechaValidezTaximetro' >Fecha Validez<input type='text' id='inpFechaValidezTaximetro' name='inpFechaValidezTaximetro'readonly='readonly' maxlength='10'/></label></div></div></div></fieldset>";
	var contenido="<hr /><fieldset id='fieldsetVehiculo'><legend>Datos del Vehículo</legend><div class='row'><div class='large-3 columns'><input type='text' id='inpMatricula' name='inpMatricula' placeholder='Matrícula' maxlength='8' pattern='^[0-9]{4}[A-Z|a-z]{3}$' title='El campo debe coincidir con el siguiente formato: 0000ABC ó AA0000MM'/><span class='txtInfoTabula'>Pulse tabulador para validar</span></div><div class='large-9 columns resumen' id='resumenLecturaVehiculo'></div></div><div class='row'><div class='large-4 columns'><label for='sltMarcaV' >Marca<select id='sltMarcaV' name='sltMarcaV' data-id='ve' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-4 columns'><label for='sltModeloV' >Modelo<select id='sltModeloV' name='sltModeloV' disabled='disabled' class='elementoInactivoFondo'><option value=0>--Seleccione</option></select></label></div><div class='large-4 columns'><label for='inpNumBastidor' >Número de Bastidor<input type='text' id='inpNumBastidor' name='inpNumBastidor'readonly='readonly' maxlength='40' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$'/></label></div></div><div class='row'><div class='large-3 columns'><label for='inpFechaMatricula' >Fecha Matriculación<input type='text' id='inpFechaMatricula' name='inpFechaMatricula'readonly='readonly' maxlength='10'/></label></div><div class='large-3 columns'><label for='inpFechaITV' >Fecha Validez ITV<input type='text' id='inpFechaITV' name='inpFechaITV'readonly='readonly' maxlength='10'/></label></div><div class='large-3 columns'><label for='sltTipoCombustible' >Tipo de Combustible<select id='sltTipoCombustible' name='sltTipoCombustible' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-3 columns'><label for='inpPlazas' >Plazas<input type='text' id='inpPlazas' name='inpPlazas'readonly='readonly' maxlength='1' pattern='^[0-9]{1}$'/></label></div></div><div class='row'><fieldset id='elementosAdicionales'><div class='large-3 columns'><label for='inpDiscapacita' >A. Discapacitados<br /><input type='checkbox' id='inpDiscapacita' name='inpDiscapacita' disabled='disabled' title='Adaptado a discapacidados' /></label></div><div class='large-2 columns'><label for='inpGPS' >GPS<br /><input type='checkbox' id='inpGPS' name='inpGPS' disabled='disabled' title='Dispone de GPS'/></label></div><div class='large-3 columns'><label for='inpImpresora' >Impresora Recibos<br /><input type='checkbox' id='inpImpresora' name='inpImpresora' disabled='disabled' title='Dispone de Impresora de Recibos'/></label></div><div class='large-2 columns'><label for='inpPagoTarjeta' >Datáfono<br /><input type='checkbox' id='inpPagoTarjeta' name='inpPagoTarjeta' disabled='disabled' title='Dispone Pago con Tarjeta' /></label></div><div class='large-2 columns'><label for='inpMampara' >Mampara<br /><input type='checkbox' id='inpMampara' name='inpMampara' disabled='disabled' title='Dispone de Mampara' /></label></div></fieldset></div><div class='row'><div class='large-12 columns'><label for='inpOtros' >Otras características<textarea id='inpOtros' name='inpOtros' maxlength='250' size='3' readonly='readonly'></textarea></label></div></div><div class='row' id='cajaTaximetro'></fieldset>";
    
    $("#subSeccionVehiculo").html(contenido);
    cargarSelect("v");
    contenido="<div class='row' id='cajaBotonVehiculoyContinuar'><div class='large-12 columns a-la-derecha'><a id='btnGuardarVehiculoyContinuar' class='button disabled'>Guardar y continuar</a>&nbsp;<a id='btnVolver' class='button disabled'>Atrás</a></div></div>";
    $("#form_register_licencia").append(contenido);
    $("#inpMatricula").focus();
}//fin seccion Alta Licencia

function subSeccionEmisora(){
  var contenido="<hr/><fieldset id='fieldsetEmisora'><legend>Emisora a la que está adscrita</legend><div class='row'><div class='large-3 columns'><label for='sltEmisora'>Seleccione Emisora <i class='fa fa-plus-circle link' id='btnInsertaEmisora'></i></label><select id='sltEmisora' name='sltEmisora'></select></div><div class='large-9 columns resumen' id='resumenLecturaEmisora'></div></div><div class='row'><div class='large-12 columns'><label for='inpNombreEmisora' >Nombre Emisora<input type='text' id='inpNombreEmisora' name='inpNombreEmisora' readonly='readonly' maxlength='70'/></label></div></div><div class='row'><div class='large-4 columns'><label for='inpTelefono1' >Teléfono 1<input type='text' id='inpTelefono1' name='inpTelefono1'readonly='readonly' maxlength='9'/></label></div><div class='large-4 columns'><label for='inpTelefono2' >Teléfono 2<input type='text' id='inpTelefono2' name='inpTelefono2'readonly='readonly' maxlength='9'/></label></div><div class='large-4 columns'><label for='inpFax' >Fax<input type='text' id='inpFax' name='inpFax'readonly='readonly' maxlength='9'/></label></div></div></fieldset>";
    
    $("#subSeccionEmisora").html(contenido);
    cargarSelect("e");
    contenido="<div class='row' id='cajaBotonEmisorayFinalizar'><div class='large-12 columns a-la-derecha'><a id='btnGuardarEmisorayFinalizar' class='button'>Guardar y finalizar</a>&nbsp;<a id='btnVolver' class='button disabled'>Atrás</a></div></div>";
    $("#form_register_licencia").append(contenido);
}//fin seccion Alta Licencia



function cargarSelect(step,identity){
	/*****************************/
	/* RELLENAR SELECT VEHICULOS */
	/*****************************/
	$.ajax({
    url:"./inc/loadselect.php",
    type: 'POST',
    async: false,
    dataType: 'json',
    data:{'step':step},
    success: function(data){
      //console.log(data);
  	  if (step=="v")
      {
        /**************************/
    		/* SELECT MARCA VEHICULOS */
    		/**************************/
    		var contenido="<option value='0'>-- Seleccione</option>";
    		$.each(data['mave'],function(clave,valor){
    			contenido += "<option value='" + data['mave'][clave].id + "'>" + data['mave'][clave].marca + "</option>";
    		});//each
    		$("#sltMarcaV").html(contenido);
    		/**************************/
    		/* SELECT MARCA TAXIMETRO */
    		/**************************/
        if (typeof data['mata']!='undefined')
        {
    		var contenido="<option value='0'>-- Seleccione</option>";
          $.each(data['mata'],function(clave,valor){
            contenido += "<option value='" + data['mata'][clave].id + "'>" + data['mata'][clave].marca + "</option>";
          });//each
          $("#sltMarcaT").html(contenido);          
        }

        

    		/**********************/
    		/* SELECT COMBUSTIBLE */
    		/**********************/
    		var contenido="<option value='0'>-- Seleccione</option>";
    		$.each(data['combu'],function(clave,valor){
    			contenido += "<option value='" + data['combu'][clave].id + "'>" + data['combu'][clave].combus + "</option>";
    		});//each
    		$("#sltTipoCombustible").html(contenido); 
      }
      else if (step=="t")
      {
        /**************************/
        /* SELECT MARCA TAXIMETRO */
        /**************************/
        var contenido="<option value='0'>-- Seleccione</option>";
        $.each(data['mata'],function(clave,valor){
          contenido += "<option value='" + data['mata'][clave].id + "'>" + data['mata'][clave].marca + "</option>";
        });//each
        $("#sltMarcaT").html(contenido);
      }
      else if (step=='e')
      {
        /********************************/
        /* SELECT EMISORAS DE RADIOTAXI */
        /********************************/
        if (typeof data['emi'] !='undefined')
        {
          var contenido="<option value='0'>Desconocida</option>";
          $.each(data['emi'],function(clave,valor){
            contenido += "<option value='" + data['emi'][clave].id + "'>" + data['emi'][clave].nomemi + "</option>";
          });//each
        }
        else
        {
          var contenido="<option>Dato no disponible</option>";
        }
        $("#sltEmisora").html(contenido);          

      }
      else if (step=='ec')
      {
        /********************************/
        /* SELECT EMISORAS DE RADIOTAXI */
        /********************************/
        if (typeof data['emi'] !='undefined')
        {
          var contenido="<option value='0'> -- </option>";
          $.each(data['emi'],function(clave,valor){
            if (data['emi'][clave].id!=identity)
            {
              contenido += "<option value='" + data['emi'][clave].id + "'>" + data['emi'][clave].nomemi + "</option>";
            }
          });//each
        }
        else
        {
          var contenido="<option>Dato no disponible</option>";
        }
        $("#sltEmisoraCambio").html(contenido);          

      }
      else if (step=='au')
      {
        /*************************/
        /* SELECT AUTORIZACIONES */
        /*************************/
        var contenido="<option value='0'>-- Seleccione</option>";
        $.each(data['autoriza'],function(clave,valor){
          contenido += "<option value='" + data['autoriza'][clave].id + "'>" + data['autoriza'][clave].tipoautorizacion + "</option>";
        });//each
        $("#sltTipoAutorizacion").html(contenido);
      }   
      else if (step=='ex')
      {
        /***********************/
        /* SELECT  EXPEDIENTES */
        /***********************/
        var contenido="<option value='0'>-- Seleccione</option>";
        $.each(data['expedi'],function(clave,valor){
          contenido += "<option value='" + data['expedi'][clave].id + "'>" + data['expedi'][clave].tipoexpediente + "</option>";
        });//each
        $("#sltTipoExpediente").html(contenido);
      }   

        
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}

function insertarDatosTitularyLicencia(datosFormulario)
{
  $.ajax({
    url:"./inc/registerLicencia.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'t'},
    beforeSend: function (){
      $("#btnGuardarTitularyContinuar").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando para continuar ...'/>&nbsp;");
    },
    success: function(data){
      $(".progress-indicator li:eq(1)").removeClass("active").addClass("completed");
      $(".progress-indicator li:eq(2)").addClass("active");
      $("#btnGuardarTitularyContinuar img").remove();
      //$("#textoTestLicense").html("<span class=''><strong>Titular:</strong>(" + data[1]+ ") " + data[2] + ", " + data[3]+ " </span>");
      $("#cajaResultado").html("<span class='datosResumen'><strong>Titular:</strong>(" + data[1]+ ") " + data[3] + ", " + data[2]+ " </span><br/>").removeClass("oculto");
      $("#form_register_licencia > .row:eq(2) > .large-12").remove();
      $("#cajaBotonTitularyContinuar").remove();
      $("#form_register_licencia > .row:eq(1)").append("<div class='large-12 columns' id='subSeccionConductor'></div>");
      $("#rayita").remove();
      var tit=data[1];
      //subSeccionVehiculo();
      subSeccionConductor(tit);

      console.log(data);      
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos licencia.

function insertarDatosConductoryLicencia(datosFormulario)
{
  $.ajax({
    url:"./inc/registerLicencia.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'c'},
    beforeSend: function (){
      $("#btnGuardarConductoryContinuar").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando para continuar ...'/>&nbsp;");
    },
    success: function(data){
      $(".progress-indicator li:eq(2)").removeClass("active").addClass("completed");
      $(".progress-indicator li:eq(3)").addClass("active");
      $("#btnGuardarConductoryContinuar img").remove();
      //$("#textoTestLicense").html("<span class=''><strong>Titular:</strong>(" + data[1]+ ") " + data[2] + ", " + data[3]+ " </span>");
      $("#cajaResultado").append("<span class='datosResumen'><strong>Conductor:</strong>(" + data[1]+ ") " + data[3] + ", " + data[2]+ " </span><br/>").removeClass("oculto");
      $("#form_register_licencia > .row:eq(1) > .large-12").remove();
      $("#cajaBotonConductoryContinuar").remove();
      $("#form_register_licencia > .row:eq(1)").append("<div class='large-12 columns' id='subSeccionVehiculo'></div>");
      $("#rayita").remove();
      var tit=data[1];
      subSeccionVehiculo();
      console.log(data);      
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos licencia.


function insertarDatosVehiculoyActualizaLicencia(datosFormulario)
{
  $.ajax({
    url:"./inc/registerLicencia.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'v'},
    beforeSend: function (){
      $("#btnGuardarVehiculoyContinuar").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando para continuar ...'/>&nbsp;");
    },
    success: function(data){
      $(".progress-indicator li:eq(3)").removeClass("active").addClass("completed");
      $(".progress-indicator li:eq(4)").addClass("active");
      $("#sltMarcaV,#sltModeloV,#inpNumBastidor,#inpFechaMatricula,#inpFechaITV,#sltTipoCombustible,#inpPlazas,#sltMarcaT,#sltModeloT,#inpNumIdentifica,#inpRevisionTaximetro,#inpFechaValidezTaximetro,#inpMatricula,#inpDiscapacita,#inpGPS,#inpImpresora,#inpPagoTarjeta,#inpMampara").prop("disabled",true);
      $("#btnGuardarVehiculoyContinuar img").remove();
      //$("#textoTestLicense").append("<span class=''><strong>Vehículo:</strong>(" + data[1]+ ") " + data[2] + ", " + data[3]+ " </span>");
      $("#cajaResultado").append("<span class='datosResumen'><strong>Vehículo:</strong>(" + data[1]+ ") " + data[2] + ", " + data[3]+ " </span>");
      $("#form_register_licencia > .row:eq(1) > .large-12").remove();
      $("#cajaBotonVehiculoyContinuar").remove();
      $("#form_register_licencia > .row:eq(1)").append("<div class='large-12 columns' id='subSeccionEmisora'></div>");
      $("#rayita").remove();
      subSeccionEmisora();

      console.log(data);      
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos licencia.

function insertarEmisorayFin(emisora,licencia)
{
  $.ajax({
    url:"./inc/registerLicencia.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'emi':emisora,'lic':licencia,'tipo':'e'},
    beforeSend: function (){
      $("#btnGuardarEmisorayFinalizar").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando para finalizar ...'/>&nbsp;");
    },
    success: function(data){
      var contenido;
      $("#rayita").remove();
      if (data[0]==1)
      {
        $(".progress-indicator li:eq(4)").removeClass("active").addClass("completed");
        contenido="<fieldset class='sinErrores'><span class=''>La licencia ha sido almacenada correctamente. Click <a id='continuaryReiniciar'>aqui</a> para continuar.</span></fieldset>";
        $("#btn-altaLicencia").removeClass("desactivado").prop("disabled",false);
      }
      else
      { 
        contenido="<fieldset class='conErrores'><span class='negrita'>Se han producido los siguientes errores:</span><br/>";
        $.each(data,function(clave,valor){
          contenido+="<span>" + data[clave] + "</span><br/>";
        });//each
      }
      contenido+="</fieldset>";
      $("#form_register_licencia").append(contenido);
      $("#fieldsetEmisora").remove();
      $("#cajaBotonEmisorayFinalizar").remove();
      $("#cajaResultado").addClass("oculto").html();
      $("#resumenLecturaLicencia").html("");
      

      console.log(data);      
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos licencia.

function insertarElemento(datosFormulario)
{
  $.ajax({
    url:"./inc/registerElemento.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario},
    beforeSend: function (){
      $("#btnGuardarElemento").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando ...'/>&nbsp;");
    },
    success: function(data){
      console.log(data);
      var contenido;
      if (typeof data['modelo'] != 'undefined')
      {
        contenido="<option value='0'>--Seleccione</option>";
        $.each(data['modelo']['todos'],function(clave,valor){
          contenido+="<option value='" + data['modelo']['todos'][clave].ident+ "'";
          if ( data['modelo']['current'] == data['modelo']['todos'][clave].ident)
          {
            contenido += "selected='selected'";
          }
          contenido+=">" + data['modelo']['todos'][clave].descripcion + "</option>";
        });//each


        $("#sltModeloT").html(contenido); 
        $("#btnInsertaModeloT").removeClass("desactivado").addClass("link");
        $("#sltModeloT").removeClass("elementoInactivoFondo").prop("disabled",false);
      }
      else if (typeof data['marca'] != 'undefined')
      {
        contenido="<option value='0'>--Seleccione</option>";
        $.each(data['marca']['todos'],function(clave,valor){
          contenido+="<option value='" + data['marca']['todos'][clave].ident+ "'";
          if ( data['marca']['current'] == data['marca']['todos'][clave].ident)
          {
            contenido += "selected='selected'";
          }
          contenido+=">" + data['marca']['todos'][clave].descripcion + "</option>";
        });//each


        $("#sltMarcaT").html(contenido); 
        $("#btnInsertaModeloT").removeClass("desactivado").addClass("link");
      }
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos licencia.

function desvincularTaximetro(matricula){
  $.ajax({
    url:"./inc/updateData.php",
    type: 'POST',
    async: true,
    dataType: 'text',
    data: {'elem':'tax','mat':matricula},
    success: function(data){
      if (data=='OK')
      {
        console.log("BIEN: "+data);
      }
      else
      {
        console.log(data);
      }
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}

function insertarContrato(datosFormulario)
{
  $.ajax({
    url:"./inc/registerContrato.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario},
    beforeSend: function (){
      $("#btnGuardarContrato").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando contrato y luego cerrar ...'/>&nbsp;");
    },
    success: function(data){
      if (data[0]==1)
      {
        $("#cajaBotonesContrato").html("<div class='large-12 columns centrado'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cerrar</a>");
        $("#inpFechaAltaContrato").prop("disabled",true);
        $("#inpHorario,#inpTipoContrato").prop("disabled",true).prop("readonly","readonly");
        $("#form_register_contrato").append("<small class='verde'> Guardado.</small>");

        var table = $('#mitablac').DataTable();
        /*if ( !table.data().count() ) {
          $("#fieldsetContratos #mitablac").closest(".row").remove();
          var contenido="<table id='mitablac'><thead><th rel='0' class='datatable-nosort' width='20%'>Fecha Alta</th><th rel='1' class='datatable-nosort' width='20%'>Tipo de Contrato</th><th rel='2' class='datatable-nosort'>Horario</th><th rel='3' class='datatable-nosort' width='20%'>Fecha Baja</th><th rel='4' width='5%'>&nbsp;</th></thead><tbody></tbody></table>";
          $("#fieldsetContratos").prepend(contenido);
          tablaEspecialConDatos($("#mitablac"));
          var table = $('#mitablac').DataTable();
        }*/

        table.row.add([data[1],data[2],data[3],"--","<input type='checkbox' name='delete' id='delete_" + data[4]  + "' title='Eliminar Contrato' data-id='" + data[4]  + "' value='" + data[4] +"' />"]).draw();
      }
      console.log(data);     
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos contrato.


function insertarEmisora(datosFormulario)
{
  $.ajax({
    url:"./inc/registerEmisora.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario, 'tipo':'i'},
    beforeSend: function (){
      $("#form_register_emisora #resultado").remove();
      $("#btnGuardarEmisora").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando expediente y luego cerrar ...'/>&nbsp;");
    },
    success: function(data){
    if (data[0]==1)
    {
      $("#cajaBotonesEmisora").html("<div class='large-12 columns centrado'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cerrar</a>");
      $("#inpEmisora,#inpTel1,#inpTel2,#inpFax").prop("disabled",true);
      $("#form_register_emisora").append("<small id='resultado' class='verde'> Guardado.</small>");
      $("#inpNombreEmisora").val(data[1]);
      tel1=(data[2]!=" -- ")?data[2]:"";
      $("#inpTelefono1").val(tel1);
      tel2=(data[3]!=" -- ")?data[3]:"";
      $("#inpTelefono2").val(tel2);
      fax=(data[4]!=" -- ")?data[4]:"";
      $("#inpFax").val(fax);
      $("#sltEmisora").append("<option value='" + data[5] + "' selected='selected'>" + data[1]+ "</option>");
    }
    else
    {
      $("#form_register_emisora").append("<small id='resultado' class='rojo'>" + data + "</small>");
    }
    $("#btnGuardarEmisora img").remove();
        console.log(data);     
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos Emisora.
/***************************************/
/* FUNCIONES PARA AÑADIR USUARIO NUEVO */
/***************************************/
/*function seccionAltaUsuario(){
	var contenido="<div class='large-12 columns'>	<article class='centrado tituloUsuario'>ALTA DE USUARIO</article></div><div class='row' id='contenedorAltaUsuario'>	<form method='post' id='form_register_usuario' data-abide>		<table id='tablaNuevoUsuario'>			<tr>				<td>					<div class='row'>						<div class='large-12 columns'>							<fieldset><div class='row'><div class='large-3 columns'><label for='inp_dni'>NIF/NIE *										<input type='text' id='inp_dni' name='inp_dni' maxlength='9'  tabindex='1' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' class='mayusculas'  title='El campo debe coincidir con el siguiente formato: 00000000A ó X0000000Z' required />											</label>									</div>									<div class='large-3 columns'><span id='cajaAviso'></span></div><div class='large-3 columns'><label for='inp_numexp'>Número de Expediente										<input type='text' id='inp_numexp' name='inp_numexp' maxlength='5' tabindex='2' pattern='^[\\d]{5}$' title='Introduzca sólo números' />											</label>									</div>  <div class='large-3 columns'><fieldset><!--ACTIVAR SI ES NECESARIO<legend>Otras Características</legend><label for='chk_sad'><input type='checkbox' name='chk_sad' id='chk_sad' tabindex='3' />SAD </label><label for='chk_fallecido'><input type='checkbox' name='chk_fallecido' id='chk_fallecido' tabindex='4' />Fallecido </label>ACTIVAR SI ES NECESARIO--></fieldset></div></div>								<div class='row'>									<div class='large-6 columns'>										<label for='inp_nombre'>Nombre * (<span id='contadorNom' class='size-12 negrita'>50</span>)											<input type='text' id='inp_nombre' name='inp_nombre' maxlength='50' placeholder='nombre de pila del usuario' tabindex='5' pattern='^[A-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžßÇŒÆČŠŽ∂ðÀÁÂÄÃÅĄČĆĘÈÉÊËĖĮÌÍÎÏŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑÇČŠŽßÇŒÆČŠŽ∂Ð ]{3,50}$' title='Introduzca sólo letras'class='mayusculas' required/>											</label>									</div>									<div class='large-6 columns'>										<label for='inp_apellidos'>Apellidos * (<span id='contadorApe' class='size-12 negrita'>50</span>) 																			<input type='text' id='inp_apellidos' name='inp_apellidos' maxlength='50' placeholder='apellidos del usuario' tabindex='6' pattern='^[A-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžßÇŒÆČŠŽ∂ðÀÁÂÄÃÅĄČĆĘÈÉÊËĖĮÌÍÎÏŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑÇČŠŽßÇŒÆČŠŽ∂Ð ]{2,50}$' title='Introduzca sólo letras'' class='mayusculas' required />										</label>									</div>							</div>								<div class='row'>									<div class='large-8 columns'>										<label for='inp_direccion'>Dirección * (<span id='contadorDir' class='size-12 negrita'>80</span>)											<input type='text' id='inp_direccion' name='inp_direccion' maxlength='80' placeholder='ej: C/Falsa, 123' tabindex='7' class='mayusculas' required />										</label>									</div>									</div>								<div class='row'>									<div class='large-7 columns'>										<label for='inp_lugarNac'>Lugar de Nacimiento (<span id='contadorLug' class='size-12 negrita'>100</span>)											<input type='text' id='inp_lugarNac' name='inp_lugarNac' maxlength='100' placeholder='Ej. Venezuela' tabindex='8' class='mayusculas' pattern='^[A-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžßÇŒÆČŠŽ∂ðÀÁÂÄÃÅĄČĆĘÈÉÊËĖĮÌÍÎÏŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑÇČŠŽßÇŒÆČŠŽ∂Ð  ]{3,50}$' title='Introduzca sólo letras' />										</label>									</div>									<div class='large-5 columns'>										<label for='inp_fechaNac'>Fecha de Nacimiento											<input type='text' id='inp_fechaNac' name='inp_fechaNac' maxlength='10' placeholder='dd/mm/aaaa' readonly='readonly' tabindex='9' />										</label>									</div>								</div>								<div class='row'>									<div class='large-4 columns'>										<label for='sltEstadoCivil'>Estado Civil											<select id='sltEstadoCivil' name='sltEstadoCivil' tabindex='10' >											</select>										</label>									</div>									<div class='large-4 columns'>										<label for='sltEstudios'>Nivel de Estudios											<select id='sltEstudios' name='sltEstudios' tabindex='11' >											</select>										</label>									</div>	<div class='large-4 columns'>										<label for='sltSituacionLaboral'>Situación Laboral											<select id='sltSituacionLaboral' name='sltSituacionLaboral' tabindex='12' >											</select>										</label>									</div>							</div><div class='row'>									<div class='large-3 columns'>										<label for='inp_telefono'>Teléfono Fijo											<input type='tel' id='inp_telefono' name='inp_telefono' maxlength='9' placeholder='9/8XXXXXXXX' tabindex='13' pattern='^[8|9]{1}[\\d]{8}$' title='Este no parece teléfono fijo válido' />											</select>										</label>									</div>									<div class='large-3 columns'>										<label for='inp_movil'>Teléfono Móvil											<input type='tel' id='inp_movil' name='inp_movil' maxlength='9' placeholder='6/7XXXXXXXX' tabindex='14' pattern='^[6|7]{1}[\\d]{8}$' title='Este no parece teléfono móvil válido'/>											</select>										</label>									</div>	<div class='large-6 columns'>										<label for='inp_email'>Email											<input type='email' id='inp_email' name='inp_email' maxlength='150' placeholder='ej. ejemplo@ejemplo.org' tabindex='15' pattern='^\\w+([\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+$' class='minusculas' />											</label>									</div>							</div>							<div class='row'>									<div class='large-12 columns'>										<label for='inp_observa'>Observaciones (<span id='contadorObs' class='size-12 negrita'>500</span>)											<textarea id='inp_observa' name='inp_observa' maxlength='500' tabindex='16' ></textarea>										</label>									</div>									</div></fieldset><span class='size-10'>* Campos obligatorios</span>						</div>					</div>				</td>			</tr></table>								<div class='row'>						<div class='large-12 columns'>							<div class='centrado' id='row_btn_save'>								<button id='btn-agregar-nuevo-usuario' class='button' type='button'>Guardar</button>									</div>								</div>							</div>		</form></div>";

    $("#contenedorAccionesUsuario").removeClass("oculto").html(contenido);
	$("#sltEstadoCivil").load("./inc/loadselect.php",{'elem':'ec'});
	$("#sltEstudios").load("./inc/loadselect.php",{'elem':'ne'});
	$("#sltSituacionLaboral").load("./inc/loadselect.php",{'elem':'sl'});
	$('#inp_fechaNac').datepicker();

	//EVENTO FOCUS IN y OUT
	$("#chk_sad,#chk_fallecido").focusin(function(){
		$(this).closest("label").addClass("destacado");
	});
	$("#chk_sad,#chk_fallecido").focusout(function(){
		$(this).closest("label").removeClass("destacado");
	});

	$("#inp_dni").focus();

} // Alta de usuario

function insertUser( datos, dni  ){
	console.log("INSERTANDO...");
	//$("#txtDNI,#txtNombre,#txtApellidos,#txtDireccion").val('');
	$.ajax({
	    url:"./inc/adduser.php",
	    type: 'POST',
	    async: true,
	    dataType: 'text',
    	beforeSend: function (){
	    	$("#btn-agregar-nuevo-usuario").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='Cargando ...'/>&nbsp;");
		},
	    data:{'info':datos},
	    success: function(res){
	    	//alert(res);
	    	if (res){
		    	$("#contenedorAltaUsuario").html("<div class='large-12 columns centrado'><i class='fi-check verde'></i>&nbsp;Usuario añadido correctamente. Acceder a su <span id='verUsuario_" + dni.toUpperCase() + "' data-id='" + dni.toUpperCase() + "' data-origen='insert' class='link'>ficha</span>.</div>");
		    	$("#btn-agregarUsuario").removeClass("desactivado").prop({'disabled':false});
			}
			else{
		    	$("#contenedorAltaUsuario").html("<div class='large-12 columns centrado'><i class='fi-x-circle rojo'></i>&nbsp;Vaya... No se ha podido añadir el usuario. Inténtalo de nuevo más tarde. Si el error persiste ponte en contacto con el administrador a travé del formulario de contacto <i id='btn-notificar2' class='fi-mail'></i>.</div>");
		    	$("#btn-agregarUsuario").removeClass("desactivado").prop({'disabled':false});
		    }
	    },
	    error: function (x,y){
	    	alert("error");
	    }
	});//ajax
}//insertar Usuario

/***************************************/
/* FUNCIONES PARA VER RESUMEN USUARIOS */
/***************************************/

/*function verResumenUsuarioIndividual(ident,source){
	var contenido;
	$.ajax({
		url:'./inc/loaduser.php',
		type:'GET',
		data: {'id':ident,'resumen':1},
		async:false,
	    dataType: "json",
	    success: function(resp){

	    	contenido = "<div class='row' id='contenedorVerUsuario'><article class='centrado'><span class='subrayado size-36'>VER FICHA RESUMEN USUARIO<input type='hidden' value='" + resp['usuario'][0].ident + "' id='numeroUsuario' /></strong></span></article>";
	  
	      	contenido += "<div class='callout'>";

	      	contenido += "<div class='row'><div class='large-2 columns'><span class='negrita size-14'>Fecha de Alta:&nbsp;</span><div class='callout small' ><span class='size-16'>" + convertirFecha(resp['usuario'][0].alta) + "</span></div></div><div class='large-2 columns'><span class='negrita size-14'>DNI/NIE:&nbsp;</span><div class='callout small' ><span class='size-16'>" + resp['usuario'][0].ident + "</span></div></div>";
	      	contenido += "<div class='large-2 columns'><span class='negrita size-14'>Nº. Expediente:&nbsp;</span><div class='callout small' ><span class='size-16'>";
	      	
	      	if (resp['usuario'][0].numExp != null)
	      		contenido += resp['usuario'][0].numExp;
	      	else
	      		contenido += "--";
	      	contenido += "</span></div></div>";

	      	contenido += "<div class='large-6 columns'><span class='negrita size-14'>Apellidos y Nombre:&nbsp;</span><div class='callout small' ><span class='size-16'>" + resp['usuario'][0].name.toUpperCase() + " " + resp['usuario'][0].surname.toUpperCase();

	      	if (resp['usuario'][0].age!=null)
	      		contenido +=" (" + resp['usuario'][0].age + ")";

	      	contenido +="</span></div></div></div></div>";
	      	contenido +="<div class='row a-la-derecha'><div class='large-12 columns'><a id='btn-verOcultarInfoUser' class='secondary button' title='Ver más info'><i class='fi-arrow-down'></i></a></div></div>";

	      	contenido += "<div class='callout' id='subcontenInfoUser'><div class='row'><div class='large-5 columns'><span class='negrita size-14'>Dirección:&nbsp;</span><div class='callout small' ><span class='size-16'>" + resp['usuario'][0].address.toUpperCase() + "</span></div></div><div class='large-4 columns'><span class='negrita size-14'>Lugar de Nacimiento:&nbsp;</span><div class='callout small' ><span class='size-16'>";
	      	if (resp['usuario'][0].birthPlace!=null)
	      		contenido += resp['usuario'][0].birthPlace.toUpperCase();
	      	else
	      		contenido += "--";

	      	contenido +="</span></div></div><div class='large-3 columns'><span class='negrita size-14'>Fecha de Nacimiento:&nbsp;</span><div class='callout small' ><span class='size-16'>";
	      	if (resp['usuario'][0].birthDay!=null)
	      		contenido += convertirFecha(resp['usuario'][0].birthDay);
	      	else
	      		contenido += "--";
	      	
	      	contenido +="</span></div></div></div>";


	      	contenido += "<div class='row'><div class='large-4 columns'><span class='negrita size-14'>Estado Civil:&nbsp;</span><div class='callout small' ><span class='size-16'>" + resp['usuario'][0].descECivil + "</span></div></div><div class='large-4 columns'><span class='negrita size-14'>Nivel de Estudios:&nbsp;</span><div class='callout small' ><span class='size-16'>" + resp['usuario'][0].descStudy + "</span></div></div><div class='large-4 columns'><span class='negrita size-14'>Situación Laboral:&nbsp;</span><div class='callout small' ><span class='size-16'>" + resp['usuario'][0].descLabor + "</span></div></div></div>";

	      	contenido += "<div class='row'><div class='large-2 columns'><span class='negrita size-14'>Teléfono Fijo:&nbsp;</span><div class='callout small' ><span class='size-16'>";

      		if ( resp['usuario'][0].phone!=null )
      		{
      			var tfno = resp['usuario'][0].phone;
    			var splitTel=tfno.slice(0,3).toString() +"."+ tfno.slice(3,6).toString() +"."+ tfno.slice(6,9).toString();
      			contenido += splitTel;
      		}
      		else
	      		contenido += "--";

			contenido += "</span></div></div><div class='large-2 columns'><span class='negrita size-14'>Teléfono Móvil:&nbsp;</span><div class='callout small' ><span class='size-16'>";  			

			if ( resp['usuario'][0].mobile!=null )
      		{
      			var tfno = resp['usuario'][0].mobile;
    			var splitTel=tfno.slice(0,3).toString() +"."+ tfno.slice(3,6).toString() +"."+ tfno.slice(6,9).toString();
      			contenido += splitTel;
      		}
      		else
	      		contenido += "--";

	      	contenido += "</span></div></div><div class='large-8 columns'><span class='negrita size-14'>Email:&nbsp;</span><div class='callout small' ><span class='size-16'>";+ "</span></div></div>";

      		if (resp['usuario'][0].email!="")
      			contenido +=  resp['usuario'][0].email;
      		else
      			contenido += "--";

	      	
	      	contenido += "</span></div></div></div>";
	      	contenido += "<div class='row'><div class='large-12 columns'><span class='negrita size-14'>Observaciones:&nbsp;</span><div class='callout small' ><span class='size-16'>";

	      	if (resp['usuario'][0].observa!=null)
	      		contenido +=resp['usuario'][0].observa;
	      	else
	      		contenido += "--";
	      	contenido += "</span></div></div></div>";

	    	/*
	    	if (typeof resp['padres'] != 'undefined')
	    	{
	    		segundaColumna=true;
	    		contenido += "<tr><td colspan='2' class='centrado'><div class='row'><span class='negrita size-18'>Datos de los Padres</span>";
	    		$.each(resp['padres'],function(clave,valor){
	    			contenido +="<span class='size-16'>";
	    			if (resp['padres'][clave].generoPa=="0")
	    				contenido += "<i class='fi-male-symbol'></i>&nbsp;";
	    			else
	    				contenido += "<i class='fi-female-symbol'></i>&nbsp;";
	    			contenido += "( " + resp['padres'][clave].dniPa + ") " + resp['padres'][clave].nombrePa + " " + resp['padres'][clave].apellidosPa + "</span>";
	    		});//each
	    		contenido += "</span></div></td></tr>";
	    		// contenido += editablePad + "</span></div></td></tr>";
	    	}//if*/

/*	    	if (source=='insert')    	
	    		contenido += "</div></div><div class='row'><div class='large-12 columns centrado'><a id='btn-ir-menu-principal' class='button' title='Atrás'> <i class='fi-arrow-left'></i> Menú Principal </a></div></div></div>";
	    	else
	    		contenido += "</div></div><div class='row'><div class='large-12 columns centrado'><a id='btn-volverListaUsuario' class='button' title='Atrás'> <i class='fi-arrow-left'></i> Volver </a></div></div></div>";


	    	$("#contenedorUsuarioIndividual").html(contenido).removeClass("oculto");

	    }
	});//ajax
	//console.log("AAA" + contenido);
	return contenido;

} //function ver Resumen usuario creado

/***************************************/
/* FUNCIONES BUSCAR Y LISTAR USUARIOS  */
/***************************************/

/*function seccionBuscaUsuario(){
	var contenido="<div class='row' id='formBuscar'><article class='centrado'><h4>Buscar Usuario</h4></article><div class='row'><div class='large-2 columns'>&nbsp;</div><div class='large-8 columns'>		<div class='large-12 medium-12 columns radius callout' >		<div class='row'>			<div class='large-12 columns '>					<legend>Criterio de Búsqueda del Usuario:</legend>				<select id='sltCriterio'>					<option value='dni' selected='selected'>DNI / NIE</option>					<option value='nom'>Nombre</option>						<option value='ape'>Apellidos</option>					<option value='exp' >Num. Expediente</option></select>				</div>		</div>		<div class='row'>			<div class='large-10 medium-9 columns '>				<input type='text' maxlength='75' id='txtBuscar' name='txtBuscar' />					</div>					<div class='large-2 medium-3 columns'>					<a class='button disabled' id='btn-locateUser'>Buscar</a></div></div></div></div><div class='large-2 columns'>&nbsp;</div></div></div>";

	contenido += "<div class='row oculto' id='resultadoBusqueda'></div>";
	$("#info").addClass("oculto");
	$("#contenedorAccionesUsuario").removeClass("oculto").html(contenido);
	$("#txtBuscar").focus();

	
} // Alta de usuario

function buscarUsuario(ref,txt){
	$.ajax({
		url:'./inc/locateuser.php',
		type:'GET',
		data: {'ref':ref, 'txt':txt},
	    dataType:"json",
	    beforeSend: function(){
	    	$("#formBuscar").addClass("oculto");
	    	$("#resultadoBusqueda").html("<img src='./../img/ajax-loader.gif' alt='Cargando ...'/>&nbsp;<span class='size-16'>Un momento por favor... Estamos realizando la consulta ...</span>").removeClass('oculto').addClass("centrado cargando");
	    },
	    success: function(resp){
	    	var contador=0;
	    	var contenido = "<article class='negrita centrado'><h4>Resultados de la Búsqueda</h4></article><table id='mitablaUsuarios' width='100%'><thead><tr><th width='4%' rel='0'></th><th class='centrado' width='12%' rel='1'>DNI</th><th rel='2'>Usuario</th><th rel='3'>Dirección</th><th width='12%' class='centrado' rel='4'>Núm. Expediente</th></tr></thead><tbody>";
	    	if (resp.indexOf("Sindatos")==-1)
	    	{
		    	$.each(resp,function(clave,valor){
		    		contenido += "<tr><td><i title='Ver/Editar' data-id=" + resp[clave].ident + " data-name='verUsuario_" + resp[clave].ident + "' data-origen='locate' class='fi-eye tipoEnlace size-21'></i></td><td class='centrado'>" + resp[clave].ident + "</td><td>" + resp[clave].surname + ", " + resp[clave].name + "</td><td>" + resp[clave].address + "<td class='centrado'>" + resp[clave].exp + "</td></tr>";
		    	});//each
		    }
		    else
		    {
		    	contenido += "<tr><td></td><td></td><td>No existen datos que mostrar</td><td></td><td></td></tr>";
		    }

		    contenido+="</tbody></table><div class='row centrado'><a class='button' id='btn-volverBuscar'>Volver</a></div>";

	    	$("#resultadoBusqueda").html(contenido).removeClass("centrado cargando");
		    
	    	if (resp.indexOf("Sindatos")==-1 && resp.length>10)
		    {
		    	tablaEspecialConDatos( $("#mitablaUsuarios") );		    	
		    }
		    else
		    {
		    	tablaEspecialSinDatos( $("#mitablaUsuarios") );		    	
		    }

	    }
	});//ajax
} //buscar usuario

function verListaUsuarios(){

	$("#contenedorTabla").addClass("boton-loading centrado").html("<img src='./../img/ajax-loader.gif' alt='Cargando ...'/>&nbsp;");
	$.getJSON("./inc/cargarelementos.php",{que:queCargar,anio:anyo},function(data){
		var items;
		if(queCargar=="ins"){
			//console.log(data);
			items="<table id='mitabla'><thead><th rel='0'>Ref.</th><th rel='1' class='datatable-nosort'>Domicilio Tributario</th><th rel='2'>Tributo</th><th rel='3'>Sujeto Pasivo</th><th rel='4'>Situación</th></thead><tbody>";

			if (data.indexOf("Sindatos")==-1)
				$.each(data,function(clave,valor){
					items += "<tr><td class='centrado'><span class='link' id='verExpediente_" + valor.ref + "' title ='Ver Expediente' data-id=" + valor.ref + " data-name='" + valor.ref + "' >" + valor.ref +  "</span></td><td>"+ valor.domicilioTributario+ "</td><td>" + valor.tributo + "</td><td>"+ valor.dni;
					if (valor.apellidosSujeto!=null)
						items+= " " + valor.apellidosSujeto + ", ";
					items+= " " + valor.nombreSujeto+ "</td><td>";
					if (valor.situacion==null)
						items += "No establecido";
					else if (valor.situacion==0)
						items += "En trámite";
					else
						items += "Finalizado";
					items += "</td></tr>";
				});//each
			else
				items+="<tr><td></td><td></td><td>No existen datos que mostrar</td><td></td><td></td></tr>";

		}
			// $("#tabla").html("<tr><th>Login</th><th>Tipo de Acceso</th><th>Estado</th></tr>" + items);*/
/*		else{
			//console.log("SUJE");
			items="<table id='mitabla'><thead><th rel='0'>DNI/CIF</th><th rel='1' >Nombre o Razón Social</th></thead><tbody>";

			if (data.indexOf("Sindatos")==-1)
				$.each(data,function(clave,valor){
					items+="<tr><td class='centrado'><span class='link' id='verSujeto_" + valor.dni + "' title ='Ver Sujeto' data-id=" + valor.dni + " data-name='" + valor.dni + "' >" + valor.dni +  "</span></td><td>";
					if (valor.apellidos!=null)
						items+= valor.apellidos + ", ";
					items+=valor.nombre + "</td>";
					
					items+="</tr>";
				});//each
			else
				items+="<tr><td></td><td></td><td>No existen datos que mostrar</td><td></td><td></td></tr>";
		}
		 items+="</tbody></table>";
		$("#contenedorTabla").html(items);

		if (data.indexOf("Sindatos")==-1)
			if (queCargar=="ins")
				tablaEspecialConDatos($("#mitabla"));
			else
				tablaEspecialConDatosSujetos($("#mitabla"));

		else
			tablaEspecialSinDatos($("#mitabla"));


		//console.log(usuarios);
	});//getJSON

} //function ver Lista de usuarios


/************************************/
/* FUNCIONES PARA ENVIO DE MENSAJES */
/************************************/

function seccionFormularioVerExpediente(tipo,lic){
  if (tipo=='verExpediente')
  {
    $.ajax({
      url:'./inc/loadLicencia.php',
      type:'POST',
      async:false,
      data: {'lic':lic},
      dataType:"json",
      beforeSend: function()
      {
        //algo
      },
      success: function(data)
      {
        if (data!='Sindatos')
        {
          resp=data['lic'][0];
          // if (typeof data['con']!='undefined')
          // {
          //   resp2=data['con'][0];
          // }
          var contenido;
          contenido="<article class='centrado'><h2>Datos Resumen de la licencia " +resp.numlic+ "</h2></article><div class='row'><div class='large-12 columns'><h4 class='centrado'>Titular</h4></div></div><div class='row'><div class='large-12 columns' id='datosTitular'>";
      
          tel=(resp.teltit!="" && resp.teltit!=null)?resp.teltit:"--";
          contenido +="<div class='row fichaResumen'><div class='large-3 columns fich'><strong>DNI</strong>:<br />" + resp.dnit + "</div><div class='large-9 columns fich'><strong>Nombre y Apellidos:</strong><br />" + resp.nomtit + " " + resp.apetit + "</div></div>";
          contenido  += "<div class='row fichaResumen'><div class='large-8 columns fich'><strong>Domicilio:</strong><br />" + resp.domtit + "</div><div class='large-4 columns fich'><strong>Teléfono:</strong><br />" + tel + "</div></div>";
          if (resp.esconductor=="1")
          {
            contenido  += "<div class='row'><div class='large-12 columns centrado'><strong>El titular es conductor de la licencia.</strong></div></div>";        
          }
          else
          {
            hor=(resp.horario!="" && resp.horario!=null)?resp.horario:"--";
            tel=(resp.telcon!="" && resp.telcon!=null)?resp.telcon:"--";
            contenido  += "<div class='row'><div class='large-12 columns'><h4 class='centrado'>Conductor</h4></div></div>";
            contenido  += "<div class='row fichaResumen'><div class='large-3 columns fich'><strong>DNI</strong>:<br />" + resp.dnic + "</div><div class='large-9 columns fich'><strong>Nombre y Apellidos:</strong><br />" + resp.nomcon + " " + resp.apecon + "</div></div>";
            contenido  += "<div class='row fichaResumen'><div class='large-8 columns fich'><strong>Horario:</strong><br />" + hor + "</div><div class='large-4 columns fich'><strong>Teléfono:</strong><br />" + tel + "</div></div>";
          }
          contenido +="</div></div><div class='row'><div class='large-12 columns'><h4 class='centrado'>Vehículo</h4></div></div><div class='row'><div class='large-12 columns' id='datosVehiculo'>";

          var otros= (resp.otros!=null && resp.otros!="")?resp.otros:"--";
          fMat=(resp.fecmat!=null)?convertirFecha(resp.fecmat):"--";
          fITV=(resp.fecitv!=null)?convertirFecha(resp.fecitv):"--";
          contenido += "<div class='row fichaResumen'><div class='large-2 columns fich'><strong>Matrícula</strong>:<br />" + resp.matveh + "</div><div class='large-6 columns fich'><strong>Marca y Modelo:</strong><br />" + resp.marca + " " + resp.modelo + "</div><div class='large-4 columns fich'><strong>Fecha de Matrículación:</strong><br />" + fMat  + "</div></div>";
          contenido  += "<div class='row fichaResumen'><div class='large-4 columns fich'><strong>Fecha última ITV registrada:</strong><br />" + fITV + "</div><div class='large-8 columns fich'><strong>Otros:</strong><br />" + otros + "</div></div>";
          contenido +="</div></div><div class='row'><div class='large-12 columns' id='datosEmisora'></div></div><div class='row'><div class='large-12 columns' id='otrosDatos'></div></div><button class='a-la-derecha close-button' data-close aria-label='Close modal' type='button'>  <span aria-hidden='true'>&times;</span></button>";

          // $("#datosVehiculo").html(resumen);
          $('#resumenModal').html(contenido);          
        }
        else
        {
          $('#resumenModal').html("<article class='centrado'><h2>La licencia " + lic + " no contiene datos actualizados</h2></article><button class='a-la-derecha close-button' data-close aria-label='Close modal' type='button'>  <span aria-hidden='true'>&times;</span></button>"); 
        }
      }
    });//ajax
  }
  
  // $("#resumenLicencia").html(resumen);
  // console.log(resumen);
  var popup=new Foundation.Reveal($('#resumenModal'));
  popup.open(); 
}

/********************************************/
/* FUNCIONES PARA ENVIO DE MENSAJES MODALES */
/********************************************/

function seccionFormulario(tipo,marca,idmar){

	if (tipo=="notifica")
	{
		var contenido="<article class='centrado'><h2>Contactar</h2><h5>Comunique cualquier incidencia o sugerencia de la aplicación</h5></article><div id='contentComunica'><div class='large-12 columns'>		<div class='large-12 medium-12 columns radius callout' >		<div class='row '>			<div class='large-12 columns'>									<select class='size-12' id='sltTipo'>					<option value='not' selected='selected'>Notificar Errores</option>					<option value='sug'>Comunicar Sugerencias</option>						<option value='otros'>Otros</option></select>				</div>		</div>		<div class='row'>			<div class='large-8 medium-8 columns '>				<input class='size-12' type='text' maxlength='50' id='txtAsunto' name='txtAsunto' placeholder='Breve resumen de su mensaje o asunto del mensaje'/>					</div>							<div class='large-12 medium-12 columns '>				<span class='size-12' >Mensaje: (<span class='negrita size-9' id='cuentaCaracteres'>1000</span>) </span><textarea id='txtMsj' name='txtMsj' placeholder='Mensaje completo' rows='4'  maxlength='1000'></textarea>					</div></div><div class='row'><div class='large-12 medium-12 columns'>					<a class='button' id='btn-enviar'>Enviar</a>					</div></div>					</div></div></div><button class='a-la-derecha close-button' data-close aria-label='Close modal' type='button'>  <span aria-hidden='true'>&times;</span></button>";
    $("#mensajeModal").html(contenido);

	}
  else if (tipo=="modeloT")
  {
    var contenido="<article class='centrado'><h2>Nuevo Modelo</h2><h5>Marca: <u>" + marca + "</u></h5></article><form method='post' id='form_register_auxiliar' data-abide><div class='row'><input type='hidden' name='inpTipo' value='moT' /><input type='hidden' name='inpMarca' value='" + idmar + "' /><div class='large-12 columns'><label for='inpNuevoModeloT'>Escriba el nuevo modelo<input type='text' name='inpNuevoModeloT' id='inpNuevoModeloT' maxlength='40' /></label></div></div><div class='row'><div class='large-12 columns centrado'><a id='btnGuardarNuevoModeloT' class='button'>Guardar y volver</a></div></div></form><button class='a-la-derecha close-button' data-close aria-label='Close modal' type='button'><span aria-hidden='true'>&times;</span></button>";
    $("#mensajeModal").html(contenido);
    //$("#inpNuevoModeloT").focus();
  }
  else if (tipo=="marcaT")
  {
    var contenido="<article class='centrado'><h2>Nueva Marca</h2><h5>Taxímetro</h5></article><div class='row'><form method='post' id='form_register_auxiliar' data-abide><div class='row'><input type='hidden' name='inpTipo' value='maT' /><div class='large-12 columns'><label for='inpNuevaMarcaT'>Escriba la nueva marca<input type='text' name='inpNuevaMarcaT' id='inpNuevaMarcaT' maxlength='20' pattern='^[a-zA-Z]+$' /></label></div></div><div class='row'><div class='large-12 columns centrado'><a id='btnGuardarNuevaMarcaT' class='button'>Guardar y volver</a></div></div></form><button class='a-la-derecha close-button' data-close aria-label='Close modal' type='button'><span aria-hidden='true'>&times;</span></button>";
    $("#mensajeModal").html(contenido);
  }
  else if (tipo=='avisoTaximetro')
  {
    var contenido="<article class='centrado'><h2><i class='fa fa-times-circle rojo'></i>&nbsp;Atención</h2><h5>Eliminar Taxímetro</h5></article><div class='row'><div class='large-12 columns'>Confirme si desea eliminar los datos del taxímetro que posee el vehículo actualmente y asociar uno nuevo. <strong>Confirmar</strong> elimina el taxímetro. <strong>Cancelar</strong> detiene la operación sin aplicar cambios.</div></div><div class='row'><div class='large-12 columns'>&nbsp;</div></div><div class='row'><div class='large-6 columns a-la-derecha'><a id='btnConfirmarEmergente' class='button' data-close>Confirmar</a></div><div class='large-6 columns'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cancelar</a></div></div>";
    $("#mensajeModal").html(contenido);
  }
  else if (tipo=='nuevoContrato')
  {
    dni=marca;
    var contenido="<article class='centrado'><h2>Nuevo Contrato</h2><h5>dni: "+dni+"</h5></article><form method='post' id='form_register_contrato' data-abide><input type='hidden' name='inpDNINIEC' value='"+dni+"' /><div class='row'><div class='large-4 columns'><label for='inpFechaAltaContrato' >Fecha Alta<input type='text' id='inpFechaAltaContrato' name='inpFechaAltaContrato' readonly='readonly' maxlength='10' /></label></div></div><div class='row'><div class='large-6 columns'><label for='inpTipoContrato' >Tipo de Contrato<input type='text' id='inpTipoContrato' name='inpTipoContrato' maxlength='50' /></label></div><div class='large-6 columns'><label for='inpHorario' >Horario<input type='text' id='inpHorario' name='inpHorario' maxlength='50' /></label></div></div><div class='row'>  <div class='large-12 columns'>&nbsp;</div></div></form><div class='row' id='cajaBotonesContrato'><div class='large-6 columns a-la-derecha' ><a id='btnGuardarContrato' class='button' >Guardar</a></div><div class='large-6 columns'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cancelar</a></div></div>";
    $("#mensajeModal").html(contenido);
    $("#inpFechaAltaContrato").datepicker();
  }
  else if (tipo=='nuevoSeguro')
  {
    matricula=marca;
    var contenido="<article class='centrado'><h2>Nuevo Seguro</h2><h5>Matrícula: "+matricula+"</h5></article><form method='post' id='form_register_assure' data-abide><input type='hidden' name='inpMatricula' value='"+matricula+"' /><div class='row'><div class='large-6 columns'><label for='inpFechaInicioSeguro' >Fecha Inicial Vigencia<input type='text' id='inpFechaInicioSeguro' name='inpFechaInicioSeguro' readonly='readonly' maxlength='10' /></label></div><div class='large-6 columns'><label for='inpFechaFinSeguro' >Fecha fin Vigencia<input type='text' id='inpFechaFinSeguro' name='inpFechaFinSeguro' readonly='readonly' maxlength='10' /></label></div></div><div class='row'><div class='large-6 columns'><label for='inpCompany' >Compañía<input type='text' id='inpCompany' name='inpCompany' maxlength='50' /></label></div><div class='large-6 columns'><label for='inpNumPoliza' >Número de Póliza<input type='text' id='inpNumPoliza' name='inpNumPoliza' maxlength='50' /></label></div></div><div class='row'>  <div class='large-12 columns'>&nbsp;</div></div></form><div class='row' id='cajaBotonesSeguro'><div class='large-6 columns a-la-derecha' ><a id='btnGuardarSeguro' class='button' >Guardar</a></div><div class='large-6 columns'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cancelar</a></div></div>";
    $("#mensajeModal").html(contenido);
    $("#inpFechaInicioSeguro,#inpFechaFinSeguro").datepicker();
  }
  else if (tipo=='nuevaRevision')
  {
    matricula=marca;
    var contenido="<article class='centrado'><h2>Nueva Revisión</h2><h5>Matrícula: "+matricula+"</h5></article><form method='post' id='form_register_revision' data-abide><input type='hidden' name='inpMatricula' value='"+matricula+"' /><div class='row'><div class='large-4 columns'><label for='inpFechaRevision' >Fecha Revisión<input type='text' id='inpFechaRevision' name='inpFechaRevision' readonly='readonly' maxlength='10' /></label></div></div><div class='row'><div class='large-12 columns'><label for='inpObserva' >Observaciones<textarea id='inpObserva' name='inpObserva' maxlength='200' rows='3'></textarea></label></div></div><div class='row'>  <div class='large-12 columns'>&nbsp;</div></div></form><div class='row' id='cajaBotonesRevision'><div class='large-6 columns a-la-derecha' ><a id='btnGuardarRevision' class='button' >Guardar</a></div><div class='large-6 columns'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cancelar</a></div></div>";
    $("#mensajeModal").html(contenido);
    $("#inpFechaRevision").datepicker();
  }
  else if (tipo=='nuevaInspeccion')
  {
    matricula=marca;
    var contenido="<article class='centrado'><h2>Nueva Inspección</h2><h5>Matrícula: "+matricula+"</h5></article><form method='post' id='form_register_inspeccion' data-abide><input type='hidden' name='inpMatricula' value='"+matricula+"' /><div class='row'><div class='large-4 columns'><label for='inpFechaInspeccion' >Fecha Inspección<input type='text' id='inpFechaInspeccion' name='inpFechaInspeccion' readonly='readonly' maxlength='10' /></label></div></div><div class='row'><div class='large-12 columns'><label for='inpObserva' >Observaciones<textarea id='inpObserva' name='inpObserva' maxlength='200' rows='3'></textarea></label></div></div><div class='row'>  <div class='large-12 columns'>&nbsp;</div></div></form><div class='row' id='cajaBotonesInspeccion'><div class='large-6 columns a-la-derecha' ><a id='btnGuardarInspeccion' class='button' >Guardar</a></div><div class='large-6 columns'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cancelar</a></div></div>";
    $("#mensajeModal").html(contenido);
    $("#inpFechaInspeccion").datepicker();
  }
  else if (tipo=='nuevaautorizacion')
  {
    lic=marca;
    licencia=marca<10?"0"+marca:marca;

    var contenido="<article class='centrado'><h2>Nueva Autorización</h2><h5>LM-"+licencia+"</h5></article><form method='post' id='form_register_autorizacion' data-abide><input type='hidden' name='inpLicencia' value='"+lic+"' /><div class='row'><div class='large-7 columns'><label for='sltTipoAutorizacion' >Tipo Autorización<select id='sltTipoAutorizacion' name='sltTipoAutorizacion'><option value='0'>-- Seleccione</option></select></label></div><div class='large-5 columns'><label for='inpFechaAutorizacion' >Fecha de Autorización<input type='text' id='inpFechaAutorizacion' name='inpFechaAutorizacion' readonly='readonly'/></label></div></div><div class='row'>  <div class='large-12 columns'>&nbsp;</div></div></form><div class='row' id='cajaBotonesAutorizacion'><div class='large-6 columns a-la-derecha' ><a id='btnGuardarAutorizacion' class='button' >Guardar</a></div><div class='large-6 columns'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cancelar</a></div></div>";
    $("#mensajeModal").html(contenido);
    $("#inpFechaAutorizacion").datepicker();
    cargarSelect('au');
  }
  else if (tipo=='nuevasubvencion')
  {
    lic=marca;
    licencia=marca<10?"0"+marca:marca;

    var contenido="<article class='centrado'><h2>Nueva Subvención</h2><h5>LM-"+licencia+"</h5></article><form method='post' id='form_register_subvencion' data-abide><input type='hidden' name='inpLicencia' value='"+lic+"' /><div class='row'><div class='large-12 columns'><label for='inpObjeto' >Objeto de la Subvención<textarea id='inpObjeto' name='inpObjeto'></textarea></label></div></div><div class='row'><div class='large-5 columns'><label for='inpFechaSubvencion' >Fecha de la Subvención<input type='text' id='inpFechaSubvencion' name='inpFechaSubvencion' readonly='readonly'/></label></div></div><div class='row'>  <div class='large-12 columns'>&nbsp;</div></div></form><div class='row' id='cajaBotonesSubvenciones'><div class='large-6 columns a-la-derecha' ><a id='btnGuardarSubvencion' class='button' >Guardar</a></div><div class='large-6 columns'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cancelar</a></div></div>";
    $("#mensajeModal").html(contenido);
    $("#inpFechaSubvencion").datepicker();
  }
  else if (tipo=='nuevoexpediente')
  {
    lic=marca;
    licencia=marca<10?"0"+marca:marca;

    var contenido="<article class='centrado'><h2>Nuevo Expediente</h2><h5>LM-"+licencia+"</h5></article><form method='post' id='form_register_expediente' data-abide><input type='hidden' name='inpLicencia' value='"+lic+"' /><div class='row'><div class='large-7 columns'><label for='sltTipoExpediente' >Tipo de Expediente<select id='sltTipoExpediente' name='sltTipoExpediente'><option value='0'>-- Seleccione</option></select></label></div><div class='large-5 columns'><label for='inpFechaExpediente' >Fecha de Expediente<input type='text' id='inpFechaExpediente' name='inpFechaExpediente' readonly='readonly'/></label></div></div><div class='row'><div class='large-12 columns'><label for='inpDescripcion' >Descripción del Expediente<textarea id='inpDescripcion' name='inpDescripcion'></textarea></label></div></div><div class='row'>  <div class='large-12 columns'>&nbsp;</div></div></form><div class='row' id='cajaBotonesExpediente'><div class='large-6 columns a-la-derecha' ><a id='btnGuardarExpediente' class='button' >Guardar</a></div><div class='large-6 columns'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cancelar</a></div></div>";
    $("#mensajeModal").html(contenido);
    $("#inpFechaExpediente").datepicker();
    cargarSelect('ex');
  }
  else if (tipo=='nuevohistorico')
  {
    lic=marca;
    licencia=marca<10?"0"+marca:marca;

    var contenido="<article class='centrado'><h2>Nueva Entrada Histórico</h2><h5>Licencia: LM-"+licencia+"</h5></article><form method='post' id='form_register_historico' data-abide><input type='hidden' name='inpLicencia' value='"+lic+"' /><div class='row'><div class='large-6 columns'><label for='inpFechaTransmision' >Fecha de la Transmisión<input type='text' id='inpFechaTransmision' name='inpFechaTransmision' readonly='readonly' /></label></div><div class='large-6 columns'><label for='inpImporte' >Importe<input type='text' id='inpImporte' name='inpImporte' /></label></div></div><div class='row'><div class='large-4 columns'><label for='inpNIFNIET' >NIF/NIE antiguo titular<input type='text' maxlength='9' id='inpNIFNIET' name='inpNIFNIET' placeholder='NIF/NIE' /></label></div><div class='large-8 columns'><label for='inpApeNom' >Apellidos y Nombre antiguo titular<input type='text' maxlength='70' id='inpApeNom' name='inpApeNom' /></label></div><div class='row'>  <div class='large-12 columns'>&nbsp;</div></div></form><div class='row' id='cajaBotonesHistorico'><div class='large-6 columns a-la-derecha' ><a id='btnGuardarHistorico' class='button' >Guardar</a></div><div class='large-6 columns'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cancelar</a></div></div>";
    $("#mensajeModal").html(contenido);
    $("#inpFechaTransmision").datepicker();
    $("#inpImporte").ForceNumericOnly();

  }
  else if (tipo=='emisora')
  {
   
    var contenido="<article class='centrado'><h2>Nueva Emisora</h2></article><form method='post' id='form_register_emisora' data-abide><div class='row'><div class='large-12 columns'><label for='inpEmisora' >Denominación<input type='text' id='inpEmisora' name='inpEmisora' /></label></div></div><div class='row'><div class='large-4 columns'><label for='inpTel1' >Teléfono 1<input type='text' maxlength='9' id='inpTel1' name='inpTel1' /></label></div><div class='large-4 columns'><label for='inpTel2' >Teléfono 2<input type='text' maxlength='9' id='inpTel2' name='inpTel2' /></label></div><div class='large-4 columns'><label for='inpFax' >Fax<input type='text' maxlength='9' id='inpFax' name='inpFax' /></label></div></div><div class='row'>  <div class='large-12 columns'>&nbsp;</div></div></form><div class='row' id='cajaBotonesEmisora'><div class='large-6 columns a-la-derecha' ><a id='btnGuardarEmisora' class='button' >Guardar</a></div><div class='large-6 columns'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cancelar</a></div></div>";
    $("#mensajeModal").html(contenido);
    $("#inpTel1,#inpTel2,#inpFax").ForceNumericOnly();
  }
  else if (tipo=='masInfo')
  {
   
    var contenido="<article class='centrado'><h2>Más Información</h2></article><div class='row'><div class='large-12 columns'><span class=''>Por seguridad, el NIF/NIE del <strong>titular</strong> no puede coincidir con el del <strong>conductor</strong>. Si ambos datos deben ser la misma persona, obligatoriamente debe elegir <strong>Es conductor</strong> del desplegable.</span></div></div><div class='row'>&nbsp;</div><div class='row centrado' id='cajaBotonesEmisora' ><div class='large-12 columns'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Aceptar</a></div></div></div>";
    $("#mensajeModal").html(contenido);
  }
  else if (tipo=='editContrato')
  {
    idcontrato=marca;
    contrato=idmar;
    var contenido="<article class='centrado'><h2>Editar Tipo de Contrato</h2></article><form method='post' id='form_register_contrato' data-abide><input type='hidden' id='contrato' name='contrato' value='"+idcontrato+"' /><div class='row'><div class='large-12 columns'><label for='inpTipoContrato' >Tipo de Contrato<input type='text' id='inpTipoContrato' name='inpTipoContrato' maxlength='50' value='"+contrato+"' /></label></div></div><div class='row'>  <div class='large-12 columns'>&nbsp;</div></div></form><div class='row' id='cajaBotonesContrato'><div class='large-6 columns a-la-derecha' ><a id='btnGuardarTipoContrato' class='button' >Guardar</a></div><div class='large-6 columns'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cancelar</a></div></div>";
    $("#mensajeModal").html(contenido);
  }
  else if (tipo=='editHorario')
  {
    idcontrato=marca;
    horario=idmar;
    var contenido="<article class='centrado'><h2>Editar Horario</h2></article><form method='post' id='form_register_contrato' data-abide><input type='hidden' id='contrato' name='contrato' value='"+idcontrato+"' /><div class='row'><div class='large-12 columns'><label for='inpHorario' >Horario<input type='text' id='inpHorario' name='inpHorario' maxlength='50' value='"+horario+"' /></label></div></div><div class='row'>  <div class='large-12 columns'>&nbsp;</div></div></form><div class='row' id='cajaBotonesContrato'><div class='large-6 columns a-la-derecha' ><a id='btnGuardarHorario' class='button' >Guardar</a></div><div class='large-6 columns'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cancelar</a></div></div>";
    $("#mensajeModal").html(contenido);
  }
  else if (tipo=='bajaContrato')
  {
    idcontrato=marca;
    var contenido="<article class='centrado'><h2>Dar de Baja Contrato</h2></article><h5>Al dar de baja un contrato, el conductor será desvinculado de la licencia actual. ¿Está seguro de continuar? Si pulsa <strong>Sí</strong> se procederá con la baja. En caso contrario se cancelará el proceso.</h5><form method='post' id='form_register_contrato' data-abide><input type='hidden' name='contrato' value='"+idcontrato+"' /><div class='row'><div class='row'>  <div class='large-12 columns'>&nbsp;</div></div></form><div class='row' id='cajaBotonesContrato'><div class='large-6 columns a-la-derecha' ><a id='btnDarBaja' class='button' >Sí</a></div><div class='large-6 columns'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cancelar</a></div></div>";
    $("#mensajeModal").html(contenido);
  }

  var popup=new Foundation.Reveal($('#mensajeModal'));
  popup.open(); 
  $("#inpNuevaMarcaT,#inpNuevoModeloT").focus();
  //$("#inpEmisora").focus();
} // seccion Formulario

function enviarEmail( tipo, asunto, mensaje ){
	$.ajax({
	    url:"./../inc/enviomsg.php",
	    type: 'POST',
	    async: true,
	    dataType: 'html',
	    data: {'tip':tipo, 'asu':asunto, 'men':mensaje },
    	beforeSend: function (){
	    	$("#btn-enviar").prepend("<img src='./../img/ajax-loader-blue.gif' alt='Cargando ...'/>&nbsp; ");
		},
	    success: function(res){
	    	//$("#btn-enviar").html("Enviado").addClass("disabled");
	    	$("#txtAsunto, #txtMsj").attr("readonly","readonly");
	    	$("#sltTipo").attr("disabled","disabled");
	    	
	    	if (res==1){
	    		msg= "<i class='fi-check verde'></i>&nbsp;Su mensaje ha sido enviado correctamente. En breve atenderemos tu petición... <br/>Gracias por tu colaboración.<a class='close-reveal-modal' aria-label='Close'>&#215;</a>";
	    	}
	    	else{
	    		msg="<i class='fi-x-circle rojo'></i>&nbsp;Ups... Ha ocurrido algo imprevisto enviando tu mensaje... <br />Inténtalo de nuevo más tarde. Gracias.<a class='close-reveal-modal' aria-label='Close'>&#215;</a>";
	    	}
	    	//$("#btn-enviar").closest(".large-12").html(msg);
	    	/*$("#contentComunica").prev().find("h5").remove();
	    	$("#contentComunica").html(msg).addClass("centrado");*/
	    	
	    	$("#mensajeModal").html(msg).addClass("centrado");

	    	$("#btn-notificar").prop("disabled",false).removeClass("desactivado");


	    },
	    error: function (x,y){
	    	alert("error");
	    }
	});//ajax

} // enviar email

/*****************************************************/
/* FUNCIONES PARA ESTABLECER FORMATO DE SALIDA FECHA */
/*****************************************************/

function convertirFecha(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
}

/********************************************************/
/* FUNCIONES PARA ESTABLECER FORMATO DE TABLA DE SALIDA */
/********************************************************/


function tablaEspecialSinDatos(nombre){
	nombre.dataTable({
		"language":
			{
			    "sProcessing":     "Procesando...",
			    "sLengthMenu":     "Mostrar _MENU_",
			    "sZeroRecords":    "No se encontraron resultados",
			    "sEmptyTable":     "Ningún dato disponible en esta tabla",
			    "sInfo":           "Mostrando desde _START_ hasta _END_ de _TOTAL_",
			    "sInfoEmpty":      "No hay registros",
			    "sInfoFiltered":   "(Cantidad Total de Registros: _MAX_)",
			    "sInfoPostFix":    "",
			    "sSearch":         "Buscar:",
			    "sUrl":            "",
			    "sInfoThousands":  ",",
			    "sLoadingRecords": "Cargando...",
			    "oPaginate": {
			        "sFirst":    "Primero",
			        "sLast":     "Último",
			        "sNext":     "Siguiente",
			        "sPrevious": "Anterior"
			    },
			    "oAria": {
			        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
			    }
			},
    	"columnDefs": [{
        	targets: "datatable-nosort",
        	orderable: false
        }],
        "bLengthChange": false,
        'iDisplayLength': 10,
        "bFilter": false, "bInfo": false,
        "bPaginate": false,
        "bSort": false

   	});//tabla
}
function tablaEspecialConDatos(nombre,que){
	nombre.dataTable({
		//"order": [[ 0, "desc" ]],
		"language":
			{
			    "sProcessing":     "Procesando...",
			    "sLengthMenu":     "Ver _MENU_",
			    "sZeroRecords":    "No se encontraron coincidencias",
			    "sEmptyTable":     "Ningún dato disponible en esta tabla",
			    "sInfo":           "Número de " + que +": <strong>_TOTAL_</strong>",
			    "sInfoEmpty":      "No hay " + que,
			    "sInfoFiltered":   "(Total: <strong>_MAX_</strong>)",
			    "sInfoPostFix":    "",
			    "sSearch":         "Buscar:",
			    "sUrl":            "",
			    "sInfoThousands":  ",",
			    "sLoadingRecords": "Cargando...",
			    "oPaginate": {
			        "sFirst":    "Primero",
			        "sLast":     "Último",
			        "sNext":     "Siguiente",
			        "sPrevious": "Anterior"
			    }
			},
        'iDisplayLength': 5,
        "bSort": false
   	});//tabla
}
function tablaEspecialConDatosOrdenados(nombre,que){
  nombre.dataTable({
    //"order": [[ 0, "desc" ]],
    "language":
      {
          "sProcessing":     "Procesando...",
          "sLengthMenu":     "Ver _MENU_",
          "sZeroRecords":    "No se encontraron coincidencias",
          "sEmptyTable":     "Ningún dato disponible en esta tabla",
          "sInfo":           "Número de " + que +": <strong>_TOTAL_</strong>",
          "sInfoEmpty":      "No hay " + que,
          "sInfoFiltered":   "(Total: <strong>_MAX_</strong>)",
          "sInfoPostFix":    "",
          "sSearch":         "Buscar:",
          "sUrl":            "",
          "sInfoThousands":  ",",
          "sLoadingRecords": "Cargando...",
          "oPaginate": {
              "sFirst":    "Primero",
              "sLast":     "Último",
              "sNext":     "Siguiente",
              "sPrevious": "Anterior"
          }
      },
        'iDisplayLength': 5,
        "bSort": true
    });//tabla
}


/*//convierte fecha a formato dd/mm/aaaa
function convertirFecha(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
}*/

jQuery.fn.ForceNumericOnly = function()
{
    return this.each(function()
    {
        $(this).keydown(function(e)
        {
            var key = e.charCode || e.keyCode || 0;

            return (
                key == 8 || //ESC
                key == 9 || //TAB
                key == 13 || //ENTER
                key == 46 ||
                key == 190 || // PUNTO DECIMAL EN TECLADO ALFANUMERICO
                key == 110 || // PUNTO DECIMAL EN TECLADO NUMERICO
                (key >= 35 && key <= 40) || //FUNCIONES ESPECIALES SUPR,INICIO,REPAG,INSERT,FIN,AVPAG
                (key >= 48 && key <= 57) || //NUMEROS EN TECLADO ALFANUMERICO
                (key >= 96 && key <= 105)); //NUMEROS EN TECLADO NUMERICO
        });
    });
};
var decodeEntities = (function () {
    //create a new html document (doesn't execute script tags in child elements)
    var doc = document.implementation.createHTMLDocument("");
    var element = doc.createElement('div');

    function getText(str) {
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
        return str;
    }

    function decodeHTMLEntities(str) {
        if (str && typeof str === 'string') {
            var x = getText(str);
            while (str !== x) {
                str = x;
                x = getText(x);
            }
            return x;
        }
    }
    return decodeHTMLEntities;
})();

function activarMenus(caja){
  $(".menu a[id^='btn-']").removeClass("desactivado").prop({'disabled':false});
  if (caja==1)
  {
    $("#contenedorAccionesLicencia").removeClass("oculto");
    $("#contenedorAccionesVehiculo, #contenedorAccionesGestion").addClass("oculto").html("");
  }
  else if (caja==2)
  {
    $("#contenedorAccionesVehiculo").removeClass("oculto");
    $("#contenedorAccionesLicencia, #contenedorAccionesGestion").addClass("oculto").html("");    
  }
  else if (caja==3)
  {
    $("#contenedorAccionesGestion").removeClass("oculto");
    $("#contenedorAccionesLicencia, #contenedorAccionesVehiculo").addClass("oculto").html("");    
  }
  $("#mnPortada").attr("data-portada",1);
}