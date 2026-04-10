/****************************************************************/
/* FUNCION PARA GESTIONAR INSPECCIONES MUNICIPALES DE VEHICULOS */
/****************************************************************/
function seccionVehiculoInspecciones(){
  console.log("llega");
  var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>INSPECCIONES DE VEHICULOS</article></div><hr id='rayita' /><div class='row' id='subseccionFormularioGestionVehiculos'><div class='large-12 columns' id='subSeccionVehiculos'></div></div><form method='post' id='form_register_' data-abide><div class='row'><div class='large-12 columns' id='subSeccionElemVehiculo'></div></form></div>";

  //$("#contenedorAccionesLicencia,#contenedorAccionesGestion").addClass("oculto").html("");
  $("#contenedorAccionesVehiculo").html(contenido);
  cargaInicialVehiculos("","i");
}//fin seccion Gestion Vehiculos

function cargarInspecciones(mat){
  $.ajax({
    url:"./inc/loadElemVehi.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data:{'matri':mat,'elem':'inspec'},
    success: function(data){
      console.log(data);
      $("#subSeccionInspeccionVehiculo").html("");
      var contenido = "<hr /><fieldset id='fieldsetInspeccion'><legend>Histórico de Inspecciones Vehículo/Matrícula: " + mat + "</legend><div class='row'><div class='large-12 columns' id='contenedorTablas'><table id='mitablas'><thead>";
        contenido+="<th rel='0' class='datatable-nosort' width='20%'>Fecha Inspección</th><th rel='1' class='datatable-nosort'>Observaciones</th><th rel='2' class='datatable-nosort' width='5%'></th></thead><tbody>";
      if (data!='Sindatos')
      {
        $.each(data,function(clave,valor){
          //tieneR=(valor.idrep!=null)?1:0;
          contenido += "<tr><td>" + convertirFecha(valor.fecins) + "</td><td>" + valor.obsins + "</td><td><input type='checkbox' name='delete' id='delete_" + valor.id + "' title='Eliminar Inspección' data-id='" + valor.id + "' value='" + valor.id+"' /></td></tr>";
        });//each       
      }
      contenido+="</tbody></table></div></div></fieldset>";
      contenido+="<div class='row' id='cajaBotonAgregarRevision'><div class='large-12 columns a-la-derecha'><a id='btnAgregarInspeccion' data-id='"+mat+"' class='button'>Agregar</a> <a id='btnEliminarElem' data-tipo='i' class='button disabled'>Eliminar</a> <a id='btnCancelarElem' class='button'>Cancelar</a></div></div>";
      //console.log(contenido);

      $("#subSeccionElemVehiculo").html(contenido);
      tablaEspecialSinDatos($("#mitablas"));
    },
    error: function (x,y){
      alert("error");
    }
  });//ajax

}// funcion cargar inspeccion

function insertarInspeccion(datosFormulario)
{
  $.ajax({
    url:"./inc/registerElemVehi.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'elem':'inspec'},
    beforeSend: function (){
      $("#btnGuardarInspeccion").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando inspeccion y luego cerrar ...'/>&nbsp;");
    },
    success: function(data){
      if (data[0]==1)
      {
        $("#cajaBotonesInspeccion").html("<div class='large-12 columns centrado'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cerrar</a>");
        $("#inpFechaInspeccion").prop("disabled",true);
        $("#inpObserva").prop("disabled",true).prop("readonly","readonly");
        $("#form_register_inspeccion").append("<small class='verde'> Guardado.</small>");

        var table = $('#mitablas').DataTable();
        table.row.add([convertirFecha(data[1]),data[2],"<input type='checkbox' name='delete' id='delete_" + data[3]  + "' title='Eliminar Inspección' data-id='" + data[3]  + "' value='" + data[3] +"' />"]).draw();
      }
      console.log(data);     
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos revision.

function eliminarInspeccion(ident){
  $.ajax({
    url:"./inc/updateData.php",
    type: 'POST',
    async: true,
    dataType: 'text',
    data: {'elem':'insp','ident':ident},
    success: function(data){
      if (data=='OK')
      {
        var table = $('#mitablas').DataTable();
        console.log("eliminando fila  " + ident);
        //console.log(table.data().count());
        table.row($("input[id='delete_"+ident+"']").closest("tr")).remove().draw();
        $("#btnEliminarElem").addClass("disabled").removeAttr("data-eli");
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

/**************************************************/
/* FUNCION PARA GESTIONAR REVISIONES DE VEHICULOS */
/**************************************************/
function seccionVehiculoRevisiones(){
  console.log("llega");
  var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>REVISIONES DE VEHICULOS</article></div><hr id='rayita' /><div class='row' id='subseccionFormularioGestionVehiculos'><div class='large-12 columns' id='subSeccionVehiculos'></div></div><form method='post' id='form_register_' data-abide><div class='row'><div class='large-12 columns' id='subSeccionElemVehiculo'></div></form></div>";

  //$("#contenedorAccionesLicencia,#contenedorAccionesGestion").addClass("oculto").html("");
  $("#contenedorAccionesVehiculo").html(contenido);
  cargaInicialVehiculos("","r");
}//fin seccion Gestion Vehiculos

function cargarRevisiones(mat){
	$.ajax({
    url:"./inc/loadElemVehi.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data:{'matri':mat,'elem':'revisa'},
    success: function(data){
      console.log(data);
      $("#subSeccionRevisionVehiculo").html("");
      var contenido = "<hr /><fieldset id='fieldsetRevision'><legend>Histórico de Revisiones Vehículo/Matrícula: " + mat + "</legend><div class='row'><div class='large-12 columns' id='contenedorTablas'><table id='mitablas'><thead>";
        contenido+="<th rel='0' class='datatable-nosort' width='20%'>Fecha Revisión</th><th rel='1' class='datatable-nosort'>Observaciones</th><th rel='2' class='datatable-nosort' width='5%'></th></thead><tbody>";
      if (data!='Sindatos')
      {
	      $.each(data,function(clave,valor){
	        //tieneR=(valor.idrep!=null)?1:0;
	        contenido += "<tr><td>" + convertirFecha(valor.fecrev) + "</td><td>" + valor.obsrev + "</td><td><input type='checkbox' name='delete' id='delete_" + valor.id + "' title='Eliminar Revisión' data-id='" + valor.id + "' value='" + valor.id+"' /></td></tr>";
	      });//each      	
      }
      contenido+="</tbody></table></div></div></fieldset>";
      contenido+="<div class='row' id='cajaBotonAgregarRevision'><div class='large-12 columns a-la-derecha'><a id='btnAgregarRevision' data-id='"+mat+"' class='button'>Agregar</a> <a id='btnEliminarElem' data-tipo='r' class='button disabled'>Eliminar</a> <a id='btnCancelarElem' class='button'>Cancelar</a></div></div>";
      //console.log(contenido);

      $("#subSeccionElemVehiculo").html(contenido);
      tablaEspecialSinDatos($("#mitablas"));
    },
    error: function (x,y){
      alert("error");
    }
  });//ajax

}// funcion cargar revision

function insertarRevision(datosFormulario)
{
  $.ajax({
    url:"./inc/registerElemVehi.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'elem':'revisa'},
    beforeSend: function (){
      $("#btnGuardarRevision").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando revision y luego cerrar ...'/>&nbsp;");
    },
    success: function(data){
      if (data[0]==1)
      {
        $("#cajaBotonesRevision").html("<div class='large-12 columns centrado'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cerrar</a>");
        $("#inpFechaRevision").prop("disabled",true);
        $("#inpObserva").prop("disabled",true).prop("readonly","readonly");
        $("#form_register_revision").append("<small class='verde'> Guardado.</small>");

        var table = $('#mitablas').DataTable();
        table.row.add([convertirFecha(data[1]),data[2],"<input type='checkbox' name='delete' id='delete_" + data[3]  + "' title='Eliminar Revisión' data-id='" + data[3]  + "' value='" + data[3] +"' />"]).draw();
      }
      console.log(data);     
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos revision.

function eliminarRevision(ident){
  $.ajax({
    url:"./inc/updateData.php",
    type: 'POST',
    async: true,
    dataType: 'text',
    data: {'elem':'revi','ident':ident},
    success: function(data){
      if (data=='OK')
      {
        var table = $('#mitablas').DataTable();
        console.log("eliminando fila  " + ident);
        //console.log(table.data().count());
        table.row($("input[id='delete_"+ident+"']").closest("tr")).remove().draw();
        $("#btnEliminarElem").addClass("disabled").removeAttr("data-eli");
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

/***********************************************/
/* FUNCION PARA GESTIONAR SEGUROS DE VEHICULOS */
/***********************************************/
function seccionVehiculoSeguros(){
  console.log("llega");
  var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>SEGUROS DE VEHICULOS</article></div><hr id='rayita' /><div class='row' id='subseccionFormularioGestionVehiculos'><div class='large-12 columns' id='subSeccionVehiculos'></div></div><form method='post' id='form_register_' data-abide><div class='row'><div class='large-12 columns' id='subSeccionElemVehiculo'></div></form></div>";

  //$("#contenedorAccionesLicencia,#contenedorAccionesGestion").addClass("oculto").html("");
  $("#contenedorAccionesVehiculo").html(contenido);
  cargaInicialVehiculos("","s");
}//fin seccion Gestion Vehiculos

function cargarSeguros(mat){
	$.ajax({
    url:"./inc/loadElemVehi.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data:{'matri':mat,'elem':'seguro'},
    success: function(data){
      console.log(data);
      $("#subSeccionSeguroVehiculo").html("");
      var contenido = "<hr /><fieldset id='fieldsetSeguro'><legend>Histórico de Seguros Matrícula: " + mat + "</legend><div class='row'><div class='large-12 columns' id='contenedorTablas'><table id='mitablas'><thead>";
        contenido+="<th rel='0' class='datatable-nosort' width='20%'>Fecha Inicio</th><th rel='1' class='datatable-nosort' width='20%'>Fecha Final</th><th rel='2' class='datatable-nosort' >Compañía</th><th rel='3' class='datatable-nosort' width='30%' >Num.Póliza</th><th class='datatable-nosort' width='5%'></th></thead><tbody>";
      if (data!='Sindatos')
      {
	      $.each(data,function(clave,valor){
	        //tieneR=(valor.idrep!=null)?1:0;
	        contenido += "<tr><td>" + convertirFecha(valor.fecini) + "</td><td>" + convertirFecha(valor.fecfin) + "</td><td>" + valor.company + "</td><td>" + valor.numpol + "</td><td><input type='checkbox' name='delete' id='delete_" + valor.id + "' title='Eliminar Seguro' data-id='" + valor.id + "' value='" + valor.id+"' /></td></tr>";
	      });//each      	
      }
      contenido+="</tbody></table></div></div></fieldset>";
      contenido+="<div class='row' id='cajaBotonAgregarSeguro'><div class='large-12 columns a-la-derecha'><a id='btnAgregarSeguro' data-id='"+mat+"' class='button'>Agregar</a> <a id='btnEliminarElem' data-tipo='s' class='button disabled'>Eliminar</a> <a id='btnCancelarElem' class='button'>Cancelar</a></div></div>";
      //console.log(contenido);

      $("#subSeccionElemVehiculo").html(contenido);
      tablaEspecialSinDatos($("#mitablas"));
    },
    error: function (x,y){
      alert("error");
    }
  });//ajax

}// funcion cargar seguros


function insertarSeguro(datosFormulario)
{
  $.ajax({
    url:"./inc/registerElemVehi.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'elem':'seguro'},
    beforeSend: function (){
      $("#btnGuardarSeguro").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando seguro y luego cerrar ...'/>&nbsp;");
    },
    success: function(data){
      if (data[0]==1)
      {
        $("#cajaBotonesSeguro").html("<div class='large-12 columns centrado'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cerrar</a>");
        $("#inpFechaInicioSeguro,#inpFechaFinSeguro").prop("disabled",true);
        $("#inpCompany,#inpNumPoliza").prop("disabled",true).prop("readonly","readonly");
        $("#form_register_assure").append("<small class='verde'> Guardado .</small>");

        var table = $('#mitablas').DataTable();
        table.row.add([convertirFecha(data[1]),convertirFecha(data[2]),data[3],data[4],"<input type='checkbox' name='delete' id='delete_" + data[5]  + "' title='Eliminar Seguro' data-id='" + data[5]  + "' value='" + data[5] +"' />"]).draw();
      }
      console.log(data);     
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos seguro.

function eliminarSeguro(ident){
  $.ajax({
    url:"./inc/updateData.php",
    type: 'POST',
    async: true,
    dataType: 'text',
    data: {'elem':'segu','ident':ident},
    success: function(data){
      if (data=='OK')
      {
        var table = $('#mitablas').DataTable();
        console.log("eliminando fila  " + ident);
        //console.log(table.data().count());
        table.row($("input[id='delete_"+ident+"']").closest("tr")).remove().draw();
        $("#btnEliminarElem").addClass("disabled").removeAttr("data-eli");
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

}//funcion eliminar seguro