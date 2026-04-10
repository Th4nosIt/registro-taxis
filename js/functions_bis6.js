/*********************************************/
/* FUNCIONES PARA AUTORIZACIONES DE LICENCIA */
/*********************************************/
function seccionLicenciaAutorizaciones(){
	var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>AUTORIZACIONES</article></div><div class='row' id='subseccionFormularioAutorizaciones'><form method='post' id='form_register_autorizaciones' data-abide><div class='row'><div class='large-3 columns' id='selectorLicencia'><label for='sltLicenciaAutorizaciones'>Seleccione Licencia<select id='sltLicenciaAutorizaciones' name='sltLicenciaAutorizaciones'></select></label></div><div class='large-9 columns resumen' id='resumenLecturaLicencia'></div></div><hr class='oculto' id='rayita' /><div class='row'><div class='large-12 columns' id='subSeccionAutorizacion'></div></div><div class='row'><div class='large-12 columns' id='subSeccionNuevaAutorizacion'></div></div></form></div>";

    $("#contenedorAccionesLicencia").html(contenido);
    $("#sltLicenciaAutorizaciones").load("./inc/loadselectlicense.php");

}//fin seccion Alta Licencia

function cargarAutorizaciones(elem){
	console.log("Cargando datos de la licencia " + elem);
	$.ajax({
		url:"./inc/loadHistorico.php",
		type: 'POST',
		async: true,
		dataType: 'json',
		data:{'lic':elem,'tipo':'auth'},
		success: function(data){
			$("#subSeccionAutorizacion").html("");

			var contenido = "<fieldset id='fieldsetAutorizaciones'><legend>Listado de Autorizaciones de la Licencia</legend><div class='row'><div class='large-12 columns' id='contenedorTablas'><table id='mitablaa'><thead>";
			contenido+="<th rel='0' class='datatable-nosort'>Tipo de Autorización</th><th rel='1' class='datatable-nosort' width='30%'>Fecha de Autorización</th><th rel='2' class='datatable-nosort' width='5%'>Estado</th><th rel='3'>&nbsp;</th></thead><tbody>";
			if (data!='Sindatos')
			{
				$.each(data['autoriza'],function(clave,valor){
				var estado=(valor.active==1)?"Activa":"Inactiva";
				contenido += "<tr><td><a data-id='" + valor.id + "' data-name='autori_" + valor.id + "'>" + valor.tipoautorizacion +  "</a></td><td ><span>" + convertirFecha(valor.fecaut) +  "</span></td><td><span>" + estado +  "</span></td><td><span><input type='checkbox' name='deleteauth' id='deleteauth_" + valor.id + "' data-id='" + valor.id + "' title='Eliminar Autorizacion' /></span></td></tr>";
				});//each
			}

			contenido+="</tbody></table></div></div></fieldset>";
			contenido+="<div class='row' id='cajaBotonAgregarAutorizacion'><div class='large-12 columns a-la-derecha'><a id='btnAgregarAutorizacion' class='button' data-id='" + elem + "'>Agregar</a> <a id='btnEliminarAutorizacion' class='button disabled' >Eliminar</a></div></div>";

			$("#subSeccionAutorizacion").html(contenido);
			//var que="Autorizaciones";
/*			if (data!='Sindatos')
			{
				tablaEspecialConDatos($("#mitablaa"),que);
			}
			else
			{
				tablaEspecialSinDatos($("#mitablaa"));
			}*/
			tablaEspecialSinDatos($("#mitablaa"));

		},
		error: function (x,y){
		  alert("error");
		}
  	});//ajax
}

function insertarAutorizacion(datosFormulario)
{
  $.ajax({
    url:"./inc/registerHistorico.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'auth'},
    beforeSend: function (){
    	$("#form_register_autorizacion #resultado").remove();
		$("#btnGuardarAutorizacion").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando autorizacion y luego cerrar ...'/>&nbsp;");
    },
    success: function(data){
		if (data[0]==1)
		{
			$("#cajaBotonesAutorizacion").html("<div class='large-12 columns centrado'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cerrar</a>");
			$("#inpFechaAutorizacion").prop("disabled",true);
			$("#sltTipoAutorizacion").prop("disabled",true).addClass("desactivado");
			$("#form_register_autorizacion").append("<small id='resultado' class='verde'> Guardado.</small>");

			var table = $('#mitablaa').DataTable();
			table.row.add([data[1],convertirFecha(data[2]),"Activa","<input type='checkbox' name='deleteauth' id='deleteauth_" + data[3]  + "' title='Eliminar Autorizacion' data-id='" + data[3]  + "' value='" + data[3] +"' />"]).draw();
		}
		else
		{
			$("#form_register_autorizacion").append("<small id='resultado' class='rojo'>" + data + "</small>");
		}
		$("#btnGuardarAutorizacion img").remove();
      	console.log(data);     
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos revision.

function eliminarAutorizacion(ident){
  $.ajax({
    url:"./inc/updateData.php",
    type: 'POST',
    async: true,
    dataType: 'text',
    data: {'elem':'auth','ident':ident},
    success: function(data){
      if (data=='OK')
      {
        var table = $('#mitablaa').DataTable();
        console.log("eliminando fila  " + ident);
        //console.log(table.data().count());
        table.row($("input[id='deleteauth_"+ident+"']").closest("tr")).remove().draw();
        $("#btnEliminarAutorizacion").addClass("disabled").removeAttr("data-eli");
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