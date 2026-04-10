/*********************************************/
/* FUNCIONES PARA CAMBIO DE TITULAR LICENCIA */
/*********************************************/
function seccionLicenciaCambioTitular(){
	var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>CAMBIO DE TITULAR / TRANSMISIONES</article></div><div class='row' id='subseccionFormularioCambioTitular'><form method='post' id='form_register_titular' data-abide><div class='row'><div class='large-3 columns' id='selectorLicencia'><label for='sltLicenciaCambioTitular'>Seleccione Licencia<select id='sltLicenciaCambioTitular' name='sltLicenciaCambioTitular'></select></label><input type='hidden' name='inpLicencia' value=''/></div><div class='large-9 columns resumen' id='resumenLecturaLicencia'></div></div><hr class='oculto' id='rayita' /><div class='row'><div class='large-12 columns' id='subSeccionTitular'></div></div><div class='row'><div class='large-12 columns' id='subSeccionNuevoTitular'></div></div></form></div>";
    

    $("#contenedorAccionesLicencia").html(contenido);
    $("#sltLicenciaCambioTitular").load("./inc/loadselectlicense.php");


}//fin seccion Alta Licencia

function subSeccionTitularCambio(cual){

	if (cual=='actual')
	{
		//** var contenido="<fieldset id='fieldsetTitutarActual'><legend>Datos del Titular Actual</legend><div class='row'><div class='large-2 columns'><input type='text' id='inpNIFNIETActual' placeholder='NIF / NIE' maxlength='9' readonly='readonly'/><input type='hidden' name='inpNIFNIETActual'/></div><div class='large-10 columns' id='resumenLecturaTitularActual'></div></div><div class='row'><div class='large-6 columns'><label for='inpNomTitActual' >Nombre del Titular<input type='text' id='inpNomTitActual' readonly='readonly' maxlength='40'/></label></div><div class='large-6 columns'><label for='inpApeTitActual' >Apellidos del Titular<input type='text' id='inpApeTitActual' readonly='readonly' maxlength='40'/></label></div></div>";
		var contenido="<fieldset id='fieldsetTitutarActual'><legend>Datos Personales del Titular Actual</legend><div class='row'><div class='large-12 columns'>- DNI: <span class='negrita' id='inpNIFNIETActual'></span><input type='hidden' name='inpNIFNIETActual' /><br/> - Nombre y Apellidos: D/Dª. <span class='negrita' id='inpNomTitActual'></span> <span class='negrita' id='inpApeTitActual'></span><br/> - Domicilio: <span class='negrita' id='inpDomTitActual'></span><br/> - Teléfono: <span class='negrita' id='inpTelTitActual'></span></div></div>";
		//<div class='row'><div class='large-8 columns'><label for='inpDomTitActual' >Domicilio del Titular<input type='text' id='inpDomTitActual' readonly='readonly' maxlength='80'/></label></div><div class='large-4 columns'><label for='inpTelTitActual' >Teléfono<input type='text' id='inpTelTitActual' readonly='readonly' maxlength='9'/></label></div></div>";//<div class='row' id='cajaRepresentante'><div class='row'><div class='large-12 columns'><select id='tieneRepresentante' name='tieneRepresentante' disabled='disabled' class='elementoInactivoFondo'><option value='0' selected='selected'>No tiene Representante</option><option value='1'>Tiene Representante</option></select></div></div></div>
		contenido += "</fieldset>";
	    $("#subSeccionTitular").html(contenido);

		contenido="<hr/ ><fieldset id='fieldsetImporte'><legend>Datos del Traspaso</legend><div class='row'><div class='large-3 columns'><label for='inpImporte'>Importe Traspaso<input type='text' id='inpImporte' name='inpImporte' /></label></div><div class='large-3 columns'><label for='inpFecha'>Fecha Traspaso<input type='text' id='inpFechaTraspaso' name='inpFechaTraspaso' readonly='readonly' /></label></div><div class='large-3 columns'></div><div class='large-3 columns'></div></div><div class='row'><div class='large-12 columns'><label for='inpObserva'>Observaciones<textarea id='inpObserva' name='inpObserva' maxlength='250'></textarea></div></div></fieldset>";

	    contenido+="<div class='row' id='cajaBotonImporteContinuar'><div class='large-12 columns a-la-derecha'><a id='btnGuardarImporteContinuar' class='button'>Guardar Importe y continuar con Nuevo Titular</a>&nbsp;<a id='btnCancelarCambio' class='button'>Cancelar</a></div></div>";

	    $("#subSeccionNuevoTitular").html(contenido);
	    

	    $("#inpImporte").focus();
	    $("#inpFechaTraspaso").datepicker();
	    $("#inpImporte").ForceNumericOnly();
	    //$("#form_register_titular").append(contenido);		
	}
	else if (cual=='nuevo')
	{
		console.log("llega bien");
		var contenido="<hr /><fieldset id='fieldsetTitutarNuevo'><legend>Datos del Nuevo Titular</legend><div class='row'><div class='large-3 columns'><input type='text' id='inpNIFNIET' name='inpNIFNIET' placeholder='NIF / NIE' maxlength='9' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' title='El campo debe coincidir con el siguiente formato: 00000000A ó X0000000Z' /><span class='txtInfoTabula'>Pulse tabulador para validar</span></div><div class='large-9 columns resumen' id='resumenLecturaTitular'></div></div><div class='row'><div class='large-6 columns'><label for='inpNomTit' >Nombre del Titular<input type='text' id='inpNomTit' name='inpNomTit' readonly='readonly' maxlength='40'/></label></div><div class='large-6 columns'><label for='inpApeTit' >Apellidos del Titular<input type='text' id='inpApeTit' name='inpApeTit'readonly='readonly' maxlength='40'/></label></div></div><div class='row'><div class='large-8 columns'><label for='inpDomTit' >Domicilio del Titular<input type='text' id='inpDomTit' name='inpDomTit'readonly='readonly' maxlength='80'/></label></div><div class='large-4 columns'><label for='inpTelTit' >Teléfono<input type='text' id='inpTelTit' name='inpTelTit'readonly='readonly' maxlength='9'/></label></div></div><div class='row' id='cajaRepresentante'><div class='row'><div class='large-12 columns'><select id='tieneRepresentante' name='tieneRepresentante' disabled='disabled' class='elementoInactivoFondo'><option value='0' selected='selected'>No tiene Representante</option><option value='1'>Tiene Representante</option></select></div></div></div><input type='hidden' name='esConductor' value='1' /><div class='row'><div class='large-12 columns'><small><div class='nota'><span class='negrita rojo'>Nota:</span> Al efectuar un cambio de titular, éste será almacenado, además,  como conductor del vehículo</div></small></div></div></fieldset>";
	    
	    contenido+="<div class='row' id='cajaBotonCambiarTitular'><div class='large-12 columns a-la-derecha'><a id='btnGuardarNuevoTitular' class='button disabled'>Proceder con la Transmisión de la licencia</a>&nbsp;<a id='btnCancelarCambio' class='button'>Cancelar</a></div></div>";
	    
	    $("#subSeccionNuevoTitular").html(contenido);
	    //$("#form_register_titular").append(contenido);		
	    $("#inpNIFNIET").focus();
	}
} //subseccion titular

function subSeccionCargaTitularActual(licencia)
{
	$.ajax
	({
	    url:"./inc/locatePersona.php",
	    type: 'POST',
	    async: true,
	    dataType: 'json',
	    beforeSend: function (){
	      $("#resumenLecturaLicencia").html("<br/><img src='./../img/ajax-loader.gif' alt='buscando ...'/> Cargando los datos del titular actual... ");
	    },
	    data:{'lic':licencia,'tipo':'t' },
	    success: function(data){
	    	subSeccionTitularCambio("actual");
	      	$("#resumenLecturaLicencia").html("");

			// if (data=="Sindatos")
			// {
			// 	//$("#resumenLecturaTitular").html("<i class='fi-check verde' title='disponible'></i>");   
			// 	$("#inpNomTit, #inpApeTit, #inpDomTit, #inpTelTit").removeAttr("readonly").closest("label").removeClass("elementoInactivo");
			// 	$("#tieneRepresentante, #esConductor").prop("disabled",false).removeClass("elementoInactivoFondo");
			// 	$("#inpNomTit").focus();
			// 	$("#btnGuardarTitularyContinuar").removeClass("disabled");
			// }
			// else if (typeof data['licen'] != 'undefined')
			// {
			// 	$("#resumenLecturaTitular").html("<i class='fi-x rojo' title='no disponible'></i> El NIF/NIE ya dispone de una licencia.");
			// 	$("#inpNIFNIET").prop("readonly",false).select();

			// }
			$("#btnGuardarTitularyContinuar").removeClass("disabled");
/*			$("input[name='inpNIFNIETActual']").val(data['titular'].dni);
			$("#inpNIFNIETActual").val(data['titular'].dni).attr("disabled","disabled");
			$("#inpNomTitActual").val(data['titular'].nomtit).attr("disabled","disabled");
			$("#inpApeTitActual").val(data['titular'].apetit).attr("disabled","disabled");
			$("#inpDomTitActual").val(data['titular'].domtit).attr("disabled","disabled");
			$("#inpTelTitActual").val(data['titular'].teltit).attr("disabled","disabled");*/

			$("input[name='inpNIFNIETActual']").val(data['titular'].dni);
			$("#inpNIFNIETActual").text(data['titular'].dni);
			$("#inpNomTitActual").text(decodeEntities(data['titular'].nomtit));
			$("#inpApeTitActual").text(decodeEntities(data['titular'].apetit));
			$("#inpDomTitActual").text(decodeEntities(data['titular'].domtit));
			$("#inpTelTitActual").text(data['titular'].teltit);

	    	//-->subSeccionTitularCambio("nuevo");

			//$("#esConductor").prop("disabled",false).removeClass("elementoInactivoFondo");
			//$("#tieneRepresentante option:eq(1)").prop("selected","selected");

			/*if (typeof data['repre'] != 'undefined')
			{
			  var contenedor="<div class='row'><div class='large-12 columns'><fieldset id='fieldsetRepresentante'><legend>Datos del Representante</legend><div class='row'><div class='large-2 columns'><input type='text' id='inpNIFNIER' name='inpNIFNIER' placeholder='NIF / NIE' value='" + data['repre'].dni + "' readonly='readonly' maxlength='9' disabled='disabled'/></div><div class='large-10 columns' id='resumenLecturaRepresentante'></div></div><div class='row'><div class='large-6 columns'><label for='inpNomRep'>Nombre del Representante<input type='text' id='inpNomRep' name='inpNomRep' value='" + data['repre'].nomrep + "' readonly='readonly' maxlength='40'  disabled='disabled'/></label></div><div class='large-6 columns'><label for='inpApeRep'>Apellidos del Representante<input type='text' id='inpApeRep' name='inpApeRep' value='" + data['repre'].aperep + "' readonly='readonly' maxlength='40'  disabled='disabled'/></label></div></div><div class='row'><div class='large-8 columns'><label for='inpDomRep'>Domicilio del Representante<input type='text' id='inpDomRep' name='inpDomRep' value='" + data['repre'].domrep + "' readonly='readonly' maxlength='80'  disabled='disabled'/></label></div><div class='large-4 columns'><label for='inpTelRep'>Teléfono<input type='text' id='inpTelRep' name='inpTelRep' value='" + data['repre'].telrep + "' readonly='readonly' maxlength='9'  disabled='disabled'/></label></div></div></fieldset></div></div>";
			  $("#cajaRepresentante").append(contenedor);
			}
			else
			  $("#tieneRepresentante").prop("disabled",false).removeClass("elementoInactivoFondo");*/




	    },
	    error: function (x,y){
	      alert("error");
	    }
	});//ajax	
}

/***********************************************/
/* FUNCIONES PARA CAMBIO DE CONDUCTOR LICENCIA */
/***********************************************/
function seccionLicenciaCambioConductor(){
	var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>CAMBIO/RENOVACION DE CONDUCTOR</article></div><div class='row' id='subseccionFormularioCambioConductor'><form method='post' id='form_register_conductor' data-abide><div class='row'><div class='large-3 columns' id='selectorLicencia'><label for='sltLicenciaCambioConductor'>Seleccione Licencia<select id='sltLicenciaCambioConductor' name='sltLicenciaCambioConductor'></select></label><input type='hidden' name='inpLicencia' value=''/></div><div class='large-9 columns resumen' id='resumenLecturaLicencia'></div></div><hr class='oculto' id='rayita' /><div class='row'><div class='large-12 columns' id='subSeccionConductor'></div></div><div class='row'><div class='large-12 columns' id='subSeccionNuevoConductor'></div></div></form></div>";
    

    $("#contenedorAccionesLicencia").html(contenido);
    $("#sltLicenciaCambioConductor").load("./inc/loadselectlicense.php");


}//fin seccion Alta Licencia

function subSeccionConductorCambio(cual,resu){

	if (cual=='actual')
	{
		var contenido="<fieldset id='fieldsetConductorActual'><legend>Datos Personales del Conductor Actual</legend>";
		if (resu=="con")
		{
			contenido+="<div class='row'><div class='large-12 columns'>- DNI: <span class='negrita' id='inpNIFNIECActual'></span><input type='hidden' name='inpNIFNIECActual' /><br/> - Nombre y Apellidos: D/Dª. <span class='negrita' id='inpNomConActual'></span> <span class='negrita' id='inpApeConActual'></span><br/> - Domicilio: <span class='negrita' id='inpDomConActual'></span><br/> - Teléfono: <span class='negrita' id='inpTelConActual'></span></div></div>";
		}
		else if (resu=="escon")
		{
			contenido+="<div class='row'><div class='large-12 columns'><span class='negrita'>El titular de la licencia también es conductor del taxi. Si quiere elegir alguien distinto rellene el formulario.</span></div></div>";
		}
		else
		{
			contenido+="<div class='row'><div class='large-12 columns'><span class='negrita'>La licencia no tiene asignada ningún conductor actualmente</span></div></div>";
		}
		contenido += "</fieldset>";
	    $("#subSeccionConductor").html(contenido);

		contenido="<hr /><fieldset id='fieldsetConductorNuevo'><input type='hidden' value='' id='titularLicencia' /><legend>Datos del Nuevo Conductor</legend><div class='row'><div class='large-3 columns'><input type='text' id='inpNIFNIEC' name='inpNIFNIEC' placeholder='NIF / NIE' maxlength='9' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' title='El campo debe coincidir con el siguiente formato: 00000000A ó X0000000Z'/><span class='txtInfoTabula'>Pulse tabulador para validar</span></div><div class='large-9 columns resumen' id='resumenLecturaConductor'></div></div><div class='row'><div class='large-6 columns'><label for='inpNomÇon' >Nombre del Conductor<input type='text' id='inpNomCon' name='inpNomCon' readonly='readonly' maxlength='40'/></label></div><div class='large-6 columns'><label for='inpApeCon' >Apellidos del Conductor<input type='text' id='inpApeCon' name='inpApeCon'readonly='readonly' maxlength='40'/></label></div></div><div class='row'><div class='large-6 columns'><label for='inpDomCon' >Domicilio del Conductor<input type='text' id='inpDomCon' name='inpDomCon'readonly='readonly' maxlength='80'/></label></div><div class='large-3 columns'><label for='inpTelCon' >Teléfono<input type='text' id='inpTelCon' name='inpTelCon'readonly='readonly' maxlength='9'/></label></div><div class='large-3 columns'><label for='inpFecAlt' >Fecha de Alta<input type='text' id='inpFecAlt' name='inpFecAlt'readonly='readonly' maxlength='10'/></label></div></div></fieldset>";
	    
	    contenido+="<div class='row' id='cajaBotonCambiarConductor'><div class='large-12 columns a-la-derecha'><a id='btnGuardarNuevoConductor' class='button disabled'>Proceder con el cambio</a>&nbsp;<a id='btnCancelarCambioC' class='button'>Cancelar</a></div></div>";

	    $("#subSeccionNuevoConductor").html(contenido);
	    

	    $("#inpImporte").focus();
	    $("#inpFecAlt").datepicker();
	    $("#inpImporte").ForceNumericOnly();
	    //$("#form_register_titular").append(contenido);		
	}
/*	else if (cual=='nuevo')
	{
		console.log("llega bien");
		var contenido="<hr /><fieldset id='fieldsetTitutarNuevo'><legend>Datos del Nuevo Titular</legend><div class='row'><div class='large-3 columns'><input type='text' id='inpNIFNIET' name='inpNIFNIET' placeholder='NIF / NIE' maxlength='9' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' title='El campo debe coincidir con el siguiente formato: 00000000A ó X0000000Z' /><span class='txtInfoTabula'>Pulse tabulador para validar</span></div><div class='large-9 columns resumen' id='resumenLecturaTitular'></div></div><div class='row'><div class='large-6 columns'><label for='inpNomTit' >Nombre del Titular<input type='text' id='inpNomTit' name='inpNomTit' readonly='readonly' maxlength='40'/></label></div><div class='large-6 columns'><label for='inpApeTit' >Apellidos del Titular<input type='text' id='inpApeTit' name='inpApeTit'readonly='readonly' maxlength='40'/></label></div></div><div class='row'><div class='large-8 columns'><label for='inpDomTit' >Domicilio del Titular<input type='text' id='inpDomTit' name='inpDomTit'readonly='readonly' maxlength='80'/></label></div><div class='large-4 columns'><label for='inpTelTit' >Teléfono<input type='text' id='inpTelTit' name='inpTelTit'readonly='readonly' maxlength='9'/></label></div></div><div class='row' id='cajaRepresentante'><div class='row'><div class='large-12 columns'><select id='tieneRepresentante' name='tieneRepresentante' disabled='disabled' class='elementoInactivoFondo'><option value='0' selected='selected'>No tiene Representante</option><option value='1'>Tiene Representante</option></select></div></div></div><div class='row' id='cajaConductor'><div class='row' id='cajaConductor'><div class='row'><div class='large-12 columns'><select id='esConductor' name='esConductor' disabled='disabled' class='elementoInactivoFondo'><option value='0' >No es conductor</option><option value='1' selected='selected'>Es conductor</option></select></div></div></div></div></fieldset>";
	    
	    contenido+="<div class='row' id='cajaBotonCambiarTitular'><div class='large-12 columns a-la-derecha'><a id='btnGuardarNuevoTitular' class='button disabled'>Proceder con la Transmisión de la licencia</a>&nbsp;<a id='btnCancelarCambio' class='button'>Cancelar</a></div></div>";
	    
	    $("#subSeccionNuevoTitular").html(contenido);
	    //$("#form_register_titular").append(contenido);		
	    $("#inpNIFNIET").focus();
	}
	*/
} //subseccion titular

function subSeccionCargaConductorActual(licencia)
{
	$.ajax
	({
	    url:"./inc/locatePersona.php",
	    type: 'POST',
	    async: true,
	    dataType: 'json',
	    beforeSend: function (){
	      $("#resumenLecturaLicencia").html("<br/><img src='./../img/ajax-loader.gif' alt='buscando ...'/> Cargando los datos del conductor actual... ");
	    },
	    data:{'lic':licencia,'tipo':'c' },
	    success: function(data){
	    	if (data=="Sinconductor")
	    	{
	    		subSeccionConductorCambio("actual","sin");
	    	}
	    	else
	    	{
	    		if (data=="Esconductor")
	    		{
	    			console.log("Es conductor el propio titular");
	    			subSeccionConductorCambio("actual","escon");

	    		}
	    		else
	    		{
		    		subSeccionConductorCambio("actual","con");
		    		$("input[name='inpNIFNIECActual']").val(data['condu'].dni);
					$("#inpNIFNIECActual").text(data['condu'].dni);
					$("#inpNomConActual").text(decodeEntities(data['condu'].nomcon));
					$("#inpApeConActual").text(decodeEntities(data['condu'].apecon));
					$("#inpDomConActual").text(decodeEntities(data['condu'].domcon));
					$("#inpTelConActual").text(data['condu'].telcon);
					$("#titularLicencia").val(data['titular']);	    			
	    		}
	    	}

	      	$("#resumenLecturaLicencia").html("");

			$("#btnGuardarConductor").removeClass("disabled");
	    },
	    error: function (x,y){
	      alert("error");
	    }
	});//ajax	
}


function actualizarDatosTitularyLicencia(datosFormulario)
{
  $.ajax({
    url:"./inc/updateLicencia.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'t'},
    beforeSend: function (){
      $("#btnGuardarNuevoTitular").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='actualizando datos del nuevo titular ...'/>&nbsp;");
    },
    success: function(data){
		// $("#form_register_titular > .row:eq(1) > .large-12").remove();
		//fieldsetTitutarActual
		$("#form_register_titular > .row:gt(1) ").remove();
		$("#form_register_titular").append("<div class='row'><div class='large-12 columns' id='cajaResultadoTraspaso'></div></div>");

    	if (data[0]==1)
    	{

			$("#fieldsetTitutarActual").append("<div class='row'><div class='large-12 columns destacado'><i class='fi-check verde'></i>&nbsp; Licencia traspasada correctamente</div></div>");
			$("input[name='inpNIFNIETActual']").val(data[1]);
			$("#inpNIFNIETActual").text(decodeEntities(data[1]));
			$("#inpNomTitActual").text(decodeEntities(data[3]));
			$("#inpApeTitActual").text(decodeEntities(data[2]));
			$("#inpDomTitActual").text(decodeEntities(data[4]));
			$("#inpTelTitActual").text(data[5]);
			$("#cajaResultadoTraspaso").html("<fieldset id='resultadoAccion'><legend>Resultado de la Acción</legend></fieldset>");
			contenido="<div class='row'><div class='large-12 columns'>La licencia ha sido traspasada correctamente. Click <a id='continuaryReiniciar'>aqui</a> para continuar.</span></div></div>";
			$("#resultadoAccion").html(contenido).addClass("sinErrores");
    	}
    	else
    	{
			$("#form_register_titular").append("<div class='row'><div class='large-12 columns' ><fieldset id='registroErrores'><legend> <i class='fi-x rojo'></i>&nbsp; Se han producido los siguientes errores: </legend><div class='row'><div class='large-12 columns' id='errores'></div></div></fieldset></div></div>");

			$.each(data,function(clave,valor){
	          //tieneR=(valor.idrep!=null)?1:0;
	          $("#errores").append("<div class='row'><div class='large-12 columns'> - " + valor + "</div></div>");
	        });//each 
    	}

		console.log(data);      
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos licencia.

function actualizarDatosConductor(datosFormulario)
{
  $.ajax({
    url:"./inc/updateConductor.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'c'},
    beforeSend: function (){
      $("#btnGuardarNuevoConductor").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='actualizando datos del nuevo conductor ...'/>&nbsp;");
    },
    success: function(data){
		// $("#form_register_titular > .row:eq(1) > .large-12").remove();
		//fieldsetTitutarActual
		$("#form_register_conductor > .row:gt(1) ").remove();
		$("#form_register_conductor").append("<div class='row'><div class='large-12 columns' id='cajaResultadoTraspaso'></div></div>");

    	if (data[0]==1)
    	{

			$("#fieldsetConductorActual").append("<div class='row'><div class='large-12 columns destacado'><i class='fi-check verde'></i>&nbsp; Cambio realizado correctamente</div></div>");
			// $("input[name='inpNIFNIETActual']").val(data[1]);
			// $("#inpNIFNIETActual").text(decodeEntities(data[1]));
			// $("#inpNomTitActual").text(decodeEntities(data[3]));
			// $("#inpApeTitActual").text(decodeEntities(data[2]));
			// $("#inpDomTitActual").text(decodeEntities(data[4]));
			// $("#inpTelTitActual").text(data[5]);
			$("#cajaResultadoTraspaso").html("<fieldset id='resultadoAccion'><legend>Resultado de la Acción</legend></fieldset>");
			contenido="<div class='row'><div class='large-12 columns'>El cambio se ha realizado correctamente. Click <a id='continuaryReiniciar'>aqui</a> para continuar.</span></div></div>";
			$("#resultadoAccion").html(contenido).addClass("sinErrores");
    	}
    	else
    	{
			$("#form_register_titular").append("<div class='row'><div class='large-12 columns' ><fieldset id='registroErrores'><legend> <i class='fi-x rojo'></i>&nbsp; Se han producido los siguientes errores: </legend><div class='row'><div class='large-12 columns' id='errores'></div></div></fieldset></div></div>");

			$.each(data,function(clave,valor){
	          //tieneR=(valor.idrep!=null)?1:0;
	          $("#errores").append("<div class='row'><div class='large-12 columns'> - " + valor + "</div></div>");
	        });//each 
    	}

		console.log(data);      
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos licencia.

function actualizarHistorial(datosFormulario)
{
  $.ajax({
    url:"./inc/updateLicencia.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'i'},
    beforeSend: function (){
      $("#btnGuardarNuevoTitular").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='actualizando datos del nuevo titular ...'/>&nbsp;");
    },
    success: function(data){
		subSeccionTitularCambio("nuevo");		
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar importe y fecha.