/*******************************************/
/* FUNCIONES PARA SUBVENCIONES DE LICENCIA */
/*******************************************/
function seccionLicenciaSubvenciones(){
	var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>SUBVENCIONES</article></div><div class='row' id='subseccionFormularioSubvenciones'><form method='post' id='form_register_subvenciones' data-abide><div class='row'><div class='large-3 columns' id='selectorLicencia'><label for='sltLicenciaSubvenciones'>Seleccione Licencia<select id='sltLicenciaSubvenciones' name='sltLicenciaSubvenciones'></select></label></div><div class='large-9 columns resumen' id='resumenLecturaLicencia'></div></div><hr class='oculto' id='rayita' /><div class='row'><div class='large-12 columns' id='subSeccionSubvencion'></div></div><div class='row'><div class='large-12 columns' id='subSeccionNuevaSubvenciones'></div></div></form></div>";

    $("#contenedorAccionesLicencia").html(contenido);
    $("#sltLicenciaSubvenciones").load("./inc/loadselectlicense.php");

}//fin seccion Alta Licencia

function cargarSubvenciones(elem){
	console.log("Cargando datos de la licencia " + elem);
	$.ajax({
		url:"./inc/loadHistorico.php",
		type: 'POST',
		async: true,
		dataType: 'json',
		data:{'lic':elem,'tipo':'subv'},
		success: function(data){
			$("#subSeccionSubvencion").html("");

			var contenido = "<fieldset id='fieldsetSubvenciones'><legend>Listado de Subvenciones de la Licencia</legend><div class='row'><div class='large-12 columns' id='contenedorTablas'><table id='mitablasu'><thead>";
			contenido+="<th rel='0' class='datatable-nosort'>Objeto de la Subvención</th><th rel='1' class='datatable-nosort' width='30%'>Fecha de Subvención</th><th rel='2' width='5%'>&nbsp;</th></thead><tbody>";
			if (data!='Sindatos')
			{
				$.each(data['subven'],function(clave,valor){
				contenido += "<tr><td><a data-id='" + valor.id + "' data-name='subven_" + valor.id + "'>" + valor.objeto +  "</a></td><td ><span>" + convertirFecha(valor.fecoto) +  "</span></td><td><span><input type='checkbox' name='deletesub' id='deletesub_" + valor.id + "' data-id='" + valor.id + "' title='Eliminar Subvencion' /></span></td></tr>";
				});//each
			}

			contenido+="</tbody></table></div></div></fieldset>";
			contenido+="<div class='row' id='cajaBotonAgregarSubvencion'><div class='large-12 columns a-la-derecha'><a id='btnAgregarSubvencion' class='button' data-id='" + elem + "'>Agregar</a> <a id='btnEliminarSubvencion' class='button disabled' >Eliminar</a></div></div>";

			$("#subSeccionSubvencion").html(contenido);
			//var que="Autorizaciones";
/*			if (data!='Sindatos')
			{
				tablaEspecialConDatos($("#mitablaa"),que);
			}
			else
			{
				tablaEspecialSinDatos($("#mitablaa"));
			}*/
			tablaEspecialSinDatos($("#mitablasu"));

		},
		error: function (x,y){
		  alert("error");
		}
  	});//ajax
}

function insertarSubvencion(datosFormulario)
{
  $.ajax({
    url:"./inc/registerHistorico.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'subv'},
    beforeSend: function (){
    	$("#form_register_subvencion #resultado").remove();
		$("#btnGuardarSubvencion").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando subvencion y luego cerrar ...'/>&nbsp;");
    },
    success: function(data){
		if (data[0]==1)
		{
			$("#cajaBotonesSubvenciones").html("<div class='large-12 columns centrado'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cerrar</a>");
			$("#inpFechaSubvencion").prop("disabled",true);
			$("#inpObjeto").prop("disabled",true);
			$("#form_register_subvencion").append("<small id='resultado' class='verde'> Guardado.</small>");

			var table = $('#mitablasu').DataTable();
			table.row.add(["<a data-id='" + data[3] + "' data-name='subven_" + data[3] + "'>" +data[1]+"</a>",convertirFecha(data[2]),"<input type='checkbox' name='deletesub' id='deletesub_" + data[3]  + "' title='Eliminar Subvencion' data-id='" + data[3]  + "' value='" + data[3] +"' />"]).draw();
		}
		else
		{
			$("#form_register_subvencion").append("<small id='resultado' class='rojo'>" + data + "</small>");
		}
		$("#btnGuardarSubvencion img").remove();
      	console.log(data);     
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos revision.

function eliminarSubvencion(ident){
  $.ajax({
    url:"./inc/updateData.php",
    type: 'POST',
    async: true,
    dataType: 'text',
    data: {'elem':'subv','ident':ident},
    success: function(data){
      if (data=='OK')
      {
        var table = $('#mitablasu').DataTable();
        console.log("eliminando fila  " + ident);
        //console.log(table.data().count());
        table.row($("input[id='deletesub_"+ident+"']").closest("tr")).remove().draw();
        $("#btnEliminarSubvencion").addClass("disabled").removeAttr("data-eli");
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