/*********************************************/
/* FUNCIONES PARA CAMBIO DE TITULAR LICENCIA */
/*********************************************/
function seccionLicenciaCambioVehiculo(){
	var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>CAMBIO DE VEHICULO</article></div><div class='row' id='subseccionFormularioCambioVehiculo'><form method='post' id='form_register_vehiculo' data-abide><div class='row'><div class='large-3 columns' id='selectorLicencia'><label for='sltLicenciaCambioVehiculo'>Seleccione Licencia<select id='sltLicenciaCambioVehiculo' name='sltLicenciaCambioVehiculo'></select></label></div><div class='large-9 columns resumen' id='resumenLecturaLicencia'></div></div><hr class='oculto' id='rayita' /><div class='row'><div class='large-12 columns' id='subSeccionVehiculo'></div></div><div class='row'><div class='large-12 columns' id='subSeccionNuevoVehiculo'></div></div></form></div>";

    $("#contenedorAccionesLicencia").html(contenido);
    $("#sltLicenciaCambioVehiculo").load("./inc/loadselectlicense.php");

}//fin seccion Alta Licencia


function subSeccionCargaVehiculoActual(licencia)
{
	$.ajax
	({
	    url:"./inc/locateVehiculo.php",
	    type: 'POST',
	    async: true,
	    dataType: 'json',
	    beforeSend: function (){
	      $("#resumenLecturaLicencia").html("<br/><img src='./../img/ajax-loader.gif' alt='buscando ...'/> Cargando los datos del vehículo actual... ");
	    },
	    data:{'lic':licencia},
	    success: function(data){
	    	subSeccionVehiculoCambio("actual");
	      	$("#resumenLecturaLicencia").html("");

			$("input[name='inpMatriculaActual']").val(data['vehiculo'].matveh);
			$("input[name='inpTaximetroActual']").val(data['vehiculo'].idtax);
			$("#inpMatriculaActual").text(data['vehiculo'].matveh);
			$("#inpMarcaVActual").text(data['vehiculo'].marca);
			$("#inpModeloVActual").text(data['vehiculo'].modelo);
			$("#inpNumBastidorActual").text(data['vehiculo'].numbas);
			$("#inpFechaMatriculaActual").text(convertirFecha(data['vehiculo'].fecmat));
			subSeccionVehiculoCambio("nuevo");
	    },
	    error: function (x,y){
	      alert("error");
	    }
	});//ajax	
}

function subSeccionVehiculoCambio(cual){

	if (cual=='actual')
	{
		var contenido="<fieldset id='fieldsetVehiculoActual'><legend>Datos del Vehículo actualmente asociado a esta licencia</legend><div class='row'><div class='large-12 columns'>- Matrícula: <span class='negrita' id='inpMatriculaActual'></span><input type='hidden' name='inpMatriculaActual' /><input type='hidden' name='inpTaximetroActual' /><br/> - Marca y Modelo: <span class='negrita' id='inpMarcaVActual'></span> <span class='negrita' id='inpModeloVActual'></span><br/> - Número de Bastidor: <span class='negrita' id='inpNumBastidorActual'></span><br/> - Fecha Matrículación: <span class='negrita' id='inpFechaMatriculaActual'></span></div></div>";
		//<div class='row'><div class='large-8 columns'><label for='inpDomTitActual' >Domicilio del Titular<input type='text' id='inpDomTitActual' readonly='readonly' maxlength='80'/></label></div><div class='large-4 columns'><label for='inpTelTitActual' >Teléfono<input type='text' id='inpTelTitActual' readonly='readonly' maxlength='9'/></label></div></div>";//<div class='row' id='cajaRepresentante'><div class='row'><div class='large-12 columns'><select id='tieneRepresentante' name='tieneRepresentante' disabled='disabled' class='elementoInactivoFondo'><option value='0' selected='selected'>No tiene Representante</option><option value='1'>Tiene Representante</option></select></div></div></div>
		contenido += "</fieldset>";
	    $("#subSeccionVehiculo").html(contenido);

		/*contenido="<fieldset id='fieldsetImporte'><legend>Datos del Traspaso</legend><div class='row'><div class='large-3 columns'><label for='inpImporte'>Importe Traspaso<input type='text' id='inpImporte' name='inpImporte' /></label></div><div class='large-3 columns'><label for='inpFecha'>Fecha Traspaso<input type='text' id='inpFecha' name='inpFechaTraspaso' readonly='readonly' /></label></div><div class='large-3 columns'></div><div class='large-3 columns'></div></div><div class='row'><div class='large-12 columns'><label for='inpObserva'>Observaciones<textarea id='inpObserva' name='inpObserva' maxlength='250'></textarea></div></div></fieldset>";

	    contenido+="<div class='row' id='cajaBotonImporteContinuar'><div class='large-12 columns a-la-derecha'><a id='btnGuardarImporteContinuar' class='button'>Guardar Importe y continuar con Nuevo Titular</a></div></div>";

	    $("#subSeccionNuevoTitular").html(contenido);*/
	    

/*	    $("#inpImporte").focus();
	    $("#inpFecha").datepicker();
	    $("#inpImporte").ForceNumericOnly();*/
	    //$("#form_register_titular").append(contenido);		
	}
	else if (cual=='nuevo')
	{
		console.log("llega bien boen");
		var contenido="<hr /><fieldset id='fieldsetElemento'><legend>Agregar Nuevo Vehículo</legend><div class='row'><div class='large-3 columns'><input type='text' id='inpMatriculaCambio' name='inpMatriculaCambio' placeholder='Matrícula' maxlength='8' pattern='^[0-9]{4}[A-Z|a-z]{3}$' title='El campo debe coincidir con el siguiente formato: 0000ABC ó AA0000MM'/><span class='txtInfoTabula'>Pulse tabulador para validar</span></div><div class='large-9 columns resumen' id='resumenLecturaVehiculo'></div></div><div class='row'><div class='large-4 columns'><label for='sltMarcaV' >Marca<select id='sltMarcaV' name='sltMarcaV' data-id='ve' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-4 columns'><label for='sltModeloV' >Modelo<select id='sltModeloV' name='sltModeloV' disabled='disabled' class='elementoInactivoFondo'><option value=0>--Seleccione</option></select></label></div><div class='large-4 columns'><label for='inpNumBastidor' >Número de Bastidor<input type='text' id='inpNumBastidor' name='inpNumBastidor'readonly='readonly' maxlength='40' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$'/></label></div></div><div class='row'><div class='large-3 columns'><label for='inpFechaMatricula' >Fecha Matriculación<input type='text' id='inpFechaMatricula' name='inpFechaMatricula'readonly='readonly' maxlength='10'/></label></div><div class='large-3 columns'><label for='inpFechaITV' >Fecha Validez ITV<input type='text' id='inpFechaITV' name='inpFechaITV'readonly='readonly' maxlength='10'/></label></div><div class='large-3 columns'><label for='sltTipoCombustible' >Tipo de Combustible<select id='sltTipoCombustible' name='sltTipoCombustible' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-3 columns'><label for='inpPlazas' >Plazas<input type='text' id='inpPlazas' name='inpPlazas'readonly='readonly' maxlength='1' pattern='^[0-9]{1}$'/></label></div></div><div class='row'><fieldset id='elementosAdicionales'><div class='large-3 columns'><label for='inpDiscapacita' >A. Discapacitados<br /><input type='checkbox' id='inpDiscapacita' name='inpDiscapacita' disabled='disabled' title='Adaptado a discapacidados' /></label></div><div class='large-2 columns'><label for='inpGPS' >GPS<br /><input type='checkbox' id='inpGPS' name='inpGPS' disabled='disabled' title='Dispone de GPS'/></label></div><div class='large-3 columns'><label for='inpImpresora' >Impresora Recibos<br /><input type='checkbox' id='inpImpresora' name='inpImpresora' disabled='disabled' title='Dispone de Impresora de Recibos'/></label></div><div class='large-2 columns'><label for='inpPagoTarjeta' >Datáfono<br /><input type='checkbox' id='inpPagoTarjeta' name='inpPagoTarjeta' disabled='disabled' title='Dispone Pago con Tarjeta' /></label></div><div class='large-2 columns'><label for='inpMampara' >Mampara<br /><input type='checkbox' id='inpMampara' name='inpMampara' disabled='disabled' title='Dispone de Mampara' /></label></div></fieldset></div><div class='row'><div class='large-12 columns'><label for='inpOtros' >Otras características<textarea id='inpOtros' name='inpOtros' maxlength='250' size='3' readonly='readonly'></textarea></label></div></div>";
		//<div class='row' id='cajaTaximetro'><fieldset><legend>Datos del Taxímetro</legend><div class='row'><div class='large-4 columns'><input type='text' id='inpNumIdentificaCambio' name='inpNumIdentificaCambio'readonly='readonly' maxlength='40' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' placeholder='Número de identificación'/></div><div class='large-8 columns' id='resumenLecturaTaximetro'></div></div><div class='row'><div class='large-4 columns'><label for='sltMarcaT' >Marca Taxímetro <select id='sltMarcaT' name='sltMarcaT' data-id='ta' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-4 columns'><label for='sltModeloT' >Modelo Taxímetro <select id='sltModeloT' name='sltModeloT' disabled='disabled' class='elementoInactivoFondo'><option value=0>-- Seleccione</option></select></label></div><div class='large-4 columns'><label for='inpRevisionTaximetro' >Fecha Revisión<input type='text' id='inpRevisionTaximetro' name='inpRevisionTaximetro'readonly='readonly' maxlength='10'/></label></div></div><div class='row'><div class='large-8 columns'><label for='inpTaller' >Taller Instalador<input type='text' id='inpTaller' name='inpTaller' readonly='readonly' /></label></div><div class='large-4 columns'><label for='inpFechaValidezTaximetro' >Fecha Validez<input type='text' id='inpFechaValidezTaximetro' name='inpFechaValidezTaximetro'readonly='readonly' maxlength='10'/></label></div></div></div>
		contenido+="<div class='row'><div class='large-12 columns'><small><div class='nota'><span class='negrita rojo'>Nota:</span> Al efectuar un cambio de vehículo, los datos del taxímetro (si tiene alguno asociado) pasarán a estar disponibles en el nuevo. Si tiene dudas, consulte con el administrador.</div></small></div></div></fieldset>";
	    
	    $("#subSeccionNuevoVehiculo").html(contenido);
	    contenido="<div class='row' id='cajaBotonCambiarVehiculo'><div class='large-12 columns a-la-derecha'><a id='btnGuardarNuevoVehiculo' class='button disabled'>Proceder con el cambio de Vehículo</a></div></div>";
	    $("#form_register_vehiculo").append(contenido);
	    cargarSelect("v");
	    $("#inpMatriculaCambio").focus();
	}
} //subseccion titular

function actualizarVehiculo(datosFormulario)
{
  $.ajax({
    url:"./inc/registerVehiculo.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'cv'},
    beforeSend: function (){
      $("#btnGuardarNuevoVehiculo").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando vehiculo ...'/>&nbsp;");
    },
    success: function(data){
      $("#subSeccionNuevoVehiculo").remove();
      $("#cajaBotonCambiarVehiculo").remove();
      var contenido;
      $("#subSeccionVehiculo").html("<fieldset id='resultadoAccion'><legend>Resultado de la Acción</legend></fieldset>");    
      if (data[0]==1)
      {
      	contenido="<div class='row'><div class='large-12 columns'>La licencia ha cambiado de vehículo correctamente. Click <a id='continuaryReiniciar'>aqui</a> para continuar.</span></div></div>";
		$("#resultadoAccion").addClass("sinErrores");
      }
      else
      {
      	$.each(data,function(clave,valor){
      		contenido+="<div class='row'><div class='large-12 columns'>" + valor + "</div></div>";
        });//each
		$("#resultadoAccion").addClass("conErrores");
      }
      $("#resultadoAccion").append(contenido);
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos licencia.

/*********************************************/
/* FUNCIONES PARA CAMBIO DE EMISORA LICENCIA */
/*********************************************/
function seccionLicenciaCambioEmisora(){
	var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>SUSTITUCIÓN DE EMISORA</article></div><div class='row' id='subseccionFormularioCambioEmisora'><form method='post' id='form_register_emisora' data-abide><div class='row'><div class='large-3 columns' id='selectorLicencia'><label for='sltLicenciaCambioEmisora'>Seleccione Licencia<select id='sltLicenciaCambioEmisora' name='sltLicenciaCambioEmisora'></select></label></div><div class='large-9 columns resumen' id='resumenLecturaLicencia'></div></div><hr class='oculto' id='rayita' /><div class='row'><div class='large-12 columns' id='subSeccionEmisora'></div></div><div class='row'><div class='large-12 columns' id='subSeccionNuevaEmisora'></div></div></form></div>";

    $("#contenedorAccionesLicencia").html(contenido);
    $("#sltLicenciaCambioEmisora").load("./inc/loadselectlicense.php");

}//fin seccion Cambio Emisora Licencia

function subSeccionCargaEmisoraActual(licencia)
{
	$.ajax
	({
	    url:"./inc/locateEmisora.php",
	    type: 'POST',
	    async: true,
	    dataType: 'json',
	    beforeSend: function (){
	      $("#resumenLecturaLicencia").html("<br/><img src='./../img/ajax-loader.gif' alt='buscando ...'/> Cargando los datos de la emisora actual... ");
	    },
	    data:{'lic':licencia},
	    success: function(data){
	    	subSeccionEmisoraCambio("actual");
	    	var ide;
	    	if (data==0)
	    	{
				$("#inpNombreActual").text("Sin Asignar");
				$("#inpTelefonoUnoActual").text(" -- ");
				$("#inpTelefonoDosActual").text(" -- ");
				$("#inpFaxActual").text(" -- ");
	    	}
	    	else
	    	{
	    		//$("input[name='inpEmisoraActual']").val(data['vehiculo'].id);
				$("#inpNombreActual").text(data['emisora'].nomemi);
				$("#inpTelefonoUnoActual").text(data['emisora'].telef1);
				$("#inpTelefonoDosActual").text(data['emisora'].telef2);
				$("#inpFaxActual").text(data['emisora'].fax);
				ide=data['emisora'].id;
	    	}
	      	$("#resumenLecturaLicencia").html("");

			
			subSeccionEmisoraCambio("nuevo",ide);
	    },
	    error: function (x,y){
	      alert("error");
	    }
	});//ajax	
}

function subSeccionEmisoraCambio(cual,ident){

	if (cual=='actual')
	{
		var contenido="<fieldset id='fieldsetEmisoraActual'><legend>Datos de la Emisora actualmente asociada a esta licencia</legend><div class='row'><div class='large-12 columns'>- Nombre: <span class='negrita' id='inpNombreActual'></span><br/> - Teléfono 1: <span class='negrita' id='inpTelefonoUnoActual'></span> <br/> - Teléfono 2: <span class='negrita' id='inpTelefonoDosActual'></span><br/> - Fax: <span class='negrita' id='inpFaxActual'></span></div></div>";
		//<div class='row'><div class='large-8 columns'><label for='inpDomTitActual' >Domicilio del Titular<input type='text' id='inpDomTitActual' readonly='readonly' maxlength='80'/></label></div><div class='large-4 columns'><label for='inpTelTitActual' >Teléfono<input type='text' id='inpTelTitActual' readonly='readonly' maxlength='9'/></label></div></div>";//<div class='row' id='cajaRepresentante'><div class='row'><div class='large-12 columns'><select id='tieneRepresentante' name='tieneRepresentante' disabled='disabled' class='elementoInactivoFondo'><option value='0' selected='selected'>No tiene Representante</option><option value='1'>Tiene Representante</option></select></div></div></div>
		contenido += "</fieldset>";
	    $("#subSeccionEmisora").html(contenido);

		/*contenido="<fieldset id='fieldsetImporte'><legend>Datos del Traspaso</legend><div class='row'><div class='large-3 columns'><label for='inpImporte'>Importe Traspaso<input type='text' id='inpImporte' name='inpImporte' /></label></div><div class='large-3 columns'><label for='inpFecha'>Fecha Traspaso<input type='text' id='inpFecha' name='inpFechaTraspaso' readonly='readonly' /></label></div><div class='large-3 columns'></div><div class='large-3 columns'></div></div><div class='row'><div class='large-12 columns'><label for='inpObserva'>Observaciones<textarea id='inpObserva' name='inpObserva' maxlength='250'></textarea></div></div></fieldset>";

	    contenido+="<div class='row' id='cajaBotonImporteContinuar'><div class='large-12 columns a-la-derecha'><a id='btnGuardarImporteContinuar' class='button'>Guardar Importe y continuar con Nuevo Titular</a></div></div>";

	    $("#subSeccionNuevoTitular").html(contenido);*/
	    

/*	    $("#inpImporte").focus();
	    $("#inpFecha").datepicker();
	    $("#inpImporte").ForceNumericOnly();*/
	    //$("#form_register_titular").append(contenido);		
	}
	else if (cual=='nuevo')
	{
		console.log("llega bien boen");
		var contenido="<hr /><fieldset id='fieldsetEmisora'><legend>Nueva Emisora</legend><div class='row'><div class='large-3 columns'><label for='sltEmisoraCambio'>Seleccione Emisora </label><select id='sltEmisoraCambio' name='sltEmisoraCambio'></select></div><div class='large-9 columns resumen' id='resumenLecturaEmisora'></div></div><div class='row'><div class='large-12 columns'><label for='inpNombreEmisora' >Nombre Emisora<input type='text' id='inpNombreEmisora'  readonly='readonly' maxlength='70'/></label></div></div><div class='row'><div class='large-4 columns'><label for='inpTelefono1' >Teléfono 1<input type='text' id='inpTelefono1' readonly='readonly' maxlength='9'/></label></div><div class='large-4 columns'><label for='inpTelefono2' >Teléfono 2<input type='text' id='inpTelefono2' readonly='readonly' maxlength='9'/></label></div><div class='large-4 columns'><label for='inpFax' >Fax<input type='text' id='inpFax' readonly='readonly' maxlength='9'/></label></div></div></fieldset>";
	    
	    $("#subSeccionNuevaEmisora").html(contenido);
	    contenido="<div class='row' id='cajaBotonCambiarEmisora'><div class='large-12 columns a-la-derecha'><a id='btnGuardarNuevaEmisora' class='button disabled'>Proceder con el cambio de Emisora</a> <a id='btnCancelarEmisoraCambio' class='button'>Cancelar</a></div></div>";
	    $("#form_register_emisora").append(contenido);
	    cargarSelect("ec",ident);
	    $("#inpNomEmiCambio").focus();
	}
} //subseccion titular

function actualizarEmisora(datosFormulario)
{
  $.ajax({
    url:"./inc/registerEmisora.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'ce'},
    beforeSend: function (){
      $("#btnGuardarNuevaEmisora").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando emisora ...'/>&nbsp;");
    },
    success: function(data){
      $("#subSeccionNuevaEmisora").remove();
      $("#cajaBotonCambiarEmisora").remove();
      var contenido;
      $("#subSeccionEmisora").html("<fieldset id='resultadoAccion'><legend>Resultado de la Acción</legend></fieldset>");    
      if (data[0]==1)
      {
      	contenido="<div class='row'><div class='large-12 columns'>La licencia ha cambiado de emisora correctamente. Click <a id='continuaryReiniciar'>aqui</a> para continuar.</span></div></div>";
		$("#resultadoAccion").addClass("sinErrores");
      }
      else
      {
      	$.each(data,function(clave,valor){
      		contenido+="<div class='row'><div class='large-12 columns'>" + valor + "</div></div>";
        });//each
		$("#resultadoAccion").addClass("conErrores");
      }
      $("#resultadoAccion").append(contenido);
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
} //actualizar emisora