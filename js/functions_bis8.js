/*******************************************/
/* FUNCIONES PARA SUBVENCIONES DE LICENCIA */
/*******************************************/
function seccionLicenciaExpedientes(){
	var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>EXPEDIENTES</article></div><div class='row' id='subseccionFormularioExpedientes'><form method='post' id='form_register_expedientes' data-abide><div class='row'><div class='large-3 columns' id='selectorLicencia'><label for='sltLicenciaExpedientes'>Seleccione Licencia<select id='sltLicenciaExpedientes' name='sltLicenciaExpedientes'></select></label></div><div class='large-9 columns resumen' id='resumenLecturaLicencia'></div></div><hr class='oculto' id='rayita' /><div class='row'><div class='large-12 columns' id='subSeccionExpediente'></div></div><div class='row'><div class='large-12 columns' id='subSeccionNuevoExpediente'></div></div></form></div>";

    $("#contenedorAccionesLicencia").html(contenido);
    $("#sltLicenciaExpedientes").load("./inc/loadselectlicense.php");

}//fin seccion Alta Licencia

function cargarExpedientes(elem){
	console.log("Cargando datos de la licencia " + elem);
	$.ajax({
		url:"./inc/loadHistorico.php",
		type: 'POST',
		async: true,
		dataType: 'json',
		data:{'lic':elem,'tipo':'expe'},
		success: function(data){
			$("#subSeccionExpediente").html("");

			var contenido = "<fieldset id='fieldsetExpedientes'><legend>Listado de Expedientes de la Licencia</legend><div class='row'><div class='large-12 columns' id='contenedorTablas'><table id='mitablaex'><thead>";
			contenido+="<th rel='0' class='datatable-nosort' width='15%'>Tipo de Expediente</th><th rel='1' class='datatable-nosort' width='30%'>Fecha de Expediente</th><th rel='2' class='datatable-nosort'>Descripción</th><th rel='3' width='5%'>&nbsp;</th></thead><tbody>";
			if (data!='Sindatos')
			{
				$.each(data['expedi'],function(clave,valor){
				contenido += "<tr><td><a data-id='" + valor.id + "' data-name='expedi_" + valor.id + "'>" + valor.tipoexpediente +  "</a></td><td ><span>" + convertirFecha(valor.fecexp) +  "</span></td><td ><span>" + valor.descripcion +  "</span></td><td><span><input type='checkbox' name='deleteexp' id='deleteexp_" + valor.id + "' data-id='" + valor.id + "' title='Eliminar Expediente' /></span></td></tr>";
				});//each
			}

			contenido+="</tbody></table></div></div></fieldset>";
			contenido+="<div class='row' id='cajaBotonAgregarExpediente'><div class='large-12 columns a-la-derecha'><a id='btnAgregarExpediente' class='button' data-id='" + elem + "'>Agregar</a> <a id='btnEliminarExpediente' class='button disabled' >Eliminar</a></div></div>";

			$("#subSeccionExpediente").html(contenido);
			//var que="Autorizaciones";
/*			if (data!='Sindatos')
			{
				tablaEspecialConDatos($("#mitablaa"),que);
			}
			else
			{
				tablaEspecialSinDatos($("#mitablaa"));
			}*/
			tablaEspecialSinDatos($("#mitablaex"));

		},
		error: function (x,y){
		  alert("error");
		}
  	});//ajax
}

function insertarExpediente(datosFormulario)
{
  $.ajax({
    url:"./inc/registerHistorico.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'expe'},
    beforeSend: function (){
    	$("#form_register_expediente #resultado").remove();
		$("#btnGuardarExpediente").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando expediente y luego cerrar ...'/>&nbsp;");
    },
    success: function(data){
		if (data[0]==1)
		{
			$("#cajaBotonesExpediente").html("<div class='large-12 columns centrado'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cerrar</a>");
			$("#inpFechaExpediente").prop("disabled",true);
			$("#inpDescripcion").prop("disabled",true);
			$("#sltTipoExpediente").prop("disabled",true).addClass("desactivado");
			$("#form_register_expediente").append("<small id='resultado' class='verde'> Guardado.</small>");

			var table = $('#mitablaex').DataTable();
			table.row.add(["<a data-id='" + data[4] + "' data-name='expedi_" + data[3] + "'>" +data[1]+"</a>",convertirFecha(data[2]),data[3],"<input type='checkbox' name='deleteexp' id='deleteexp_" + data[3]  + "' title='Eliminar Expediente' data-id='" + data[4]  + "' value='" + data[4] +"' />"]).draw();
		}
		else
		{
			$("#form_register_expediente").append("<small id='resultado' class='rojo'>" + data + "</small>");
		}
		$("#btnGuardarExpediente img").remove();
      	console.log(data);     
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos revision.

function eliminarExpediente(ident){
  $.ajax({
    url:"./inc/updateData.php",
    type: 'POST',
    async: true,
    dataType: 'text',
    data: {'elem':'expe','ident':ident},
    success: function(data){
      if (data=='OK')
      {
        var table = $('#mitablaex').DataTable();
        console.log("eliminando fila  " + ident);
        //console.log(table.data().count());
        table.row($("input[data-id='"+ident+"']").closest("tr")).remove().draw();
        $("#btnEliminarExpediente").addClass("disabled").removeAttr("data-eli");
      }
      else
      {

      console.log(data);     
      }
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });
}// funcion eliminar revision

/*************************************************/
/* FUNCIONES HISTORICO TRANSMISIONES DE LICENCIA */
/*************************************************/
function seccionLicenciaHistorico(){
	var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>HISTÓRICO TRASMISIONES DE LICENCIA</article></div><div class='row' id='subseccionFormularioHistoricos'><form method='post' id='form_register_historicos' data-abide><div class='row'><div class='large-3 columns' id='selectorLicencia'><label for='sltLicenciaHistorico'>Seleccione Licencia<select id='sltLicenciaHistorico' name='sltLicenciaHistorico'></select></label></div><div class='large-8 columns resumen' id='resumenLecturaLicencia'></div></div><hr class='oculto' id='rayita' /><div class='row'><div class='large-12 columns' id='subSeccionHistorico'></div></div><div class='row'><div class='large-12 columns' id='subSeccionNuevoHistorico'></div></div></form></div>";

    $("#contenedorAccionesLicencia").html(contenido);
    $("#sltLicenciaHistorico").load("./inc/loadselectlicense.php",{'tipo':'todos'});

}//fin seccion Alta Licencia

function cargarHistorico(elem){
	console.log("Cargando datos de la licencia " + elem);
	$.ajax({
		url:"./inc/loadHistorico.php",
		type: 'POST',
		async: true,
		dataType: 'json',
		data:{'lic':elem,'tipo':'hist'},
		success: function(data){
			console.log(data);
			$("#subSeccionHistorico").html("");

			var contenido = "<fieldset id='fieldsetExpedientes'><legend>Listado de Transmisiones de la Licencia</legend><div class='row'><div class='large-12 columns' id='contenedorTablas'><table id='mitablaht'><thead>";
			contenido+="<th rel='0' class='datatable-nosort' width='25%'>Fecha Transmisión</th><th rel='1' class='datatable-nosort'>Antiguo Titular</th><th rel='2' width='5%'>&nbsp;</th></thead><tbody>";
			if (data!='Sindatos')
			{
				$.each(data['histor'],function(clave,valor){
				contenido += "<tr><td>" + convertirFecha(valor.fectra) +  "</a></td><td ><span>(" + valor.dniTitOld.toUpperCase() + ") " + valor.nomapeOldTit +  "</span></td><td><span><input type='checkbox' name='deletehis' id='deletehis_" + valor.id + "' data-id='" + valor.id + "' title='Eliminar Registro' /></span></td></tr>";
				});//each
			}

			contenido+="</tbody></table></div></div></fieldset>";
			contenido+="<div class='row' id='cajaBotonAgregarHistorico'><div class='large-12 columns a-la-derecha'><a id='btnAgregarHistorico' class='button' data-id='" + elem + "'>Agregar Nuevo Registro</a> <a id='btnEliminarHistorico' class='button disabled' >Eliminar</a></div></div>";

			$("#subSeccionHistorico").html(contenido);
			//var que="Autorizaciones";
/*			if (data!='Sindatos')
			{
				tablaEspecialConDatos($("#mitablaa"),que);
			}
			else
			{
				tablaEspecialSinDatos($("#mitablaa"));
			}*/
			tablaEspecialSinDatos($("#mitablaht"));

		},
		error: function (x,y){
		  alert("error");
		}
  	});//ajax
}

function eliminarHistorico(ident){
  $.ajax({
    url:"./inc/updateData.php",
    type: 'POST',
    async: true,
    dataType: 'text',
    data: {'elem':'hist','ident':ident},
    success: function(data){
      if (data=='OK')
      {
        var table = $('#mitablaht').DataTable();
        console.log("eliminando fila  " + ident);
        //console.log(table.data().count());
        table.row($("input[id='deletehis_"+ident+"']").closest("tr")).remove().draw();
        $("#btnEliminarHistorico").addClass("disabled").removeAttr("data-eli");
      }
      else
      {

      console.log(data);     
      }
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });
}// funcion eliminar historico

function insertarHistorico(datosFormulario)
{
  $.ajax({
    url:"./inc/registerHistorico.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'hist'},
    beforeSend: function (){
    	$("#form_register_historico #resultado").remove();
		$("#btnGuardarHistorico").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando entrada y luego cerrar ...'/>&nbsp;");
    },
    success: function(data){
		if (data[0]==1)
		{
			$("#cajaBotonesHistorico").html("<div class='large-12 columns centrado'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cerrar</a>");
			$("#inpFechaTransmision").prop("disabled",true);
			$("#inpImporte").prop("disabled",true);
			$("#inpNIFNIET").prop("disabled",true);
			$("#inpApeNom").prop("disabled",true);
			$("#form_register_historico").append("<small id='resultado' class='verde'> Guardado.</small>");
			histo="("+data[3]+ ") " + data[2];
			var table = $('#mitablaht').DataTable();
			table.row.add([convertirFecha(data[1]),histo,"<input type='checkbox' name='deletehis' id='deletehis_" + data[3]  + "' title='Eliminar Registro' data-id='" + data[3]  + "' value='" + data[3] +"' />"]).draw();
		}
		else
		{
			$("#form_register_historico").append("<small id='resultado' class='rojo'>" + data + "</small>");
		}
		$("#btnGuardarHistorico img").remove();
      	console.log(data);     
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos historico.