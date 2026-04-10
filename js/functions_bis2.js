/**************************************/
/* FUNCION PARA GESTIONAR CONDUCTORES */
/**************************************/
function seccionGestionConductores(){
  console.log("llega a conductores");
  var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>CONDUCTORES</article></div><hr id='rayita' /><div class='row' id='subseccionFormularioGestionConductores'><div class='large-12 columns' id='subSeccionConductores'></div></div><form method='post' id='form_register_conductor' data-abide><div class='row'><div class='large-12 columns' id='subSeccionAgregarConductor'></div></form></div>";

  //$("#contenedorAccionesLicencia,#contenedorAccionesVehiculo").addClass("oculto").html("");
  // $("#contenedorAccionesGestion").html("");
  $("#contenedorAccionesGestion").html(contenido);
  contenido="<fieldset id='fieldsetConductor'><legend>Datos del Conductor del Taxi</legend><div class='row'><div class='large-3 columns'><input type='text' id='inpNIFNIEC' name='inpNIFNIEC' placeholder='NIF / NIE' maxlength='9' /><span class='txtInfoTabula'>Pulse tabulador para validar</span></div><div class='large-9 columns resumen' id='resumenLecturaConductor'></div></div><div class='row'><div class='large-4 columns'><label for='inpNomCon'>Nombre del Conductor<input type='text' id='inpNomCon' name='inpNomCon' maxlength='40' readonly='readonly'/></label></div><div class='large-5 columns'><label for='inpApeCon'>Apellidos del Conductor<input type='text' id='inpApeCon' name='inpApeCon' maxlength='40' readonly='readonly'/></label></div><div class='large-3 columns'><label for='inpTelCon'>Teléfono<input type='text' id='inpTelCon' name='inpTelCon' maxlength='9' readonly='readonly'/></label></div></div><div class='row'><div class='large-12 columns' id='barraDeEstado'></div></div></fieldset><div class='row' id='cajaGuardarConductor'><div class='large-12 columns a-la-derecha'><a id='btnEditarConductor' class='button disabled' disabled='disabled'>Editar</a> <a id='btnActualizarConductor' class='button disabled oculto' disabled='disabled'>Actualizar</a> <a id='btnCancelarConductor' class='button disabled oculto' disabled='disabled'>Cancelar</a> <a id='btnContratos' class='button disabled' disabled='disabled'>Contratos</a></div></div><div id='row'><div class='large-12 colums' id='contenedorTablas'></div></div>";
  $("#subSeccionAgregarConductor").html(contenido);
  $("#inpNIFNIEC").select();
}//fin seccion Gestion Conductores

function guardarConductor(datosFormulario){
  $.ajax({
    url:"./inc/registerConductor.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario},
    beforeSend: function (){
      $("#btnActualizarConductor").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando para continuar ...'/>&nbsp;");
    },
    success: function(data){
      if (data[0]==1)
      {
        $("#barraDeEstado").html("<i class='fi-check verde' title='completado'></i>&nbsp;Actualización completada con éxito.");
        $("#inpNomCon,#inpApeCon,#inpTelCon").prop("disabled",true);
        $("#btnEditarConductor").removeClass("disabled oculto");
        $("#btnActualizarConductor").addClass("disabled oculto");
        $("#btnContratos").removeClass("disabled oculto");
        $("#btnCancelarConductor").addClass("disabled oculto");
      }
      $("#btnActualizarConductor img").remove().addClass("disabled");
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}// fin funcion guardar conductor

function cargarContratos(usuario){
  $.ajax({
    url:"./inc/loadContratos.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'user':usuario},
    beforeSend: function (){
      $("#btnEditarConductor").addClass("disabled");
      $("#btnContratos").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='cargar contratos ...'/>&nbsp;").addClass("disabled");
    },
    success: function(data){
      var contenido="<fieldset id='fieldsetContratos'><legend>Contratos del Conductor " + usuario.toUpperCase() + "</legend><div class='row'><div class='large-12 columns'><table id='mitablac'><thead><th rel='0' class='datatable-nosort' width='15%'>Fecha Alta</th><th rel='1' class='datatable-nosort' width='20%'>Tipo de Contrato</th><th rel='2' class='datatable-nosort'>Horario</th><th rel='3' class='datatable-nosort' width='15%'>Fecha Baja</th><th rel='4'>Licencia</th><th rel='5' width='5%'>&nbsp;</th></thead><tbody>";
      if(data!="Sindatos")
      //{
        //contenido+="<tr><td>Sin Datos</td><td></td><td></td><td></td><td></td></tr>";
      //}
      //else
      {
        $.each(data,function(clave,valor){
          if (valor.fecbaj==null)
          {
            tc=(valor.tipoco!=null)?"<span id='spnTipoContrato'>" + valor.tipoco + "</span>":"-- ";
            tc+=" <a id='editc_" + valor.id + "' title='Editar Tipo de Contrato' data-id='"+valor.id+"'><i class='fa fa-pencil-square-o warning'></i></a>";
            ho=(valor.horario!=null)?"<span id='spnHorario'>" + valor.horario + "</span>":"-- ";
            ho+=" <a id='ediho_" + valor.id + "' title='Editar Horario' data-id='"+valor.id+"'><i class='fa fa-pencil-square-o warning'></i></a>";
            fb=(valor.fecbaj!=null)?convertirFecha(valor.fecbaj):"-- ";
            check="<a id='ediba_" + valor.id + "' title='Dar de Baja' data-id='"+valor.id+"'><i class='fi-arrow-down'></i></a>";
          }
          else
          {
            tc=(valor.tipoco!=null)?valor.tipoco:"--";
            ho=(valor.horario!=null)?valor.horario:"--";            
            fb=(valor.fecbaj!=null)?convertirFecha(valor.fecbaj):"--";
            check="";
          }
          contenido += "<tr><td>" + convertirFecha(valor.fecalt) + "</td><td>" + tc + "</td><td>" + ho + "</td><td>" + fb + "</td><td>" + valor.numlic + "</td><td>" + check + "</td></tr>";
        });//each
      }

      //contenido +="</tbody></table></div></div><div class='row'><div class='large-12 columns'><a id='btnAgregarContrato' class='button' data-lic='" + data[0].+ "'>Añadir Contrato</a> <a id='btnEliminarContrato' class='button disabled' data-eli=''>Eliminar</a></div></div></fieldset>";
      contenido +="</tbody></table></div></div></fieldset>";
      $("#contenedorTablas").html(contenido);
      tablaEspecialSinDatos($("#mitablac"));
/*      if (data=="Sindatos")
      {
        tablaEspecialSinDatos($("#mitablac"));
      }
      else
      {
        tablaEspecialConDatos($("#mitablac"),"Contratos");        
      }*/
      $("#btnContratos img").remove();

    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//fin funcion cargar contratos

function eliminarContrato(ident){
  $.ajax({
    url:"./inc/updateData.php",
    type: 'POST',
    async: true,
    dataType: 'text',
    data: {'elem':'cont','ident':ident},
    success: function(data){
      if (data=='OK')
      {
        var table = $('#mitablac').DataTable();
        console.log("eliminando fila  " + ident);
        //console.log(table.data().count());
        table.row($("input[id='delete_"+ident+"']").closest("tr")).remove().draw();
        $("#btnEliminarContrato").addClass("disabled").removeAttr("data-eli");

        // if ( ! table.data().count() ) {
        //   $("#fieldsetContratos #mitablac").closest(".row").remove();
        //   var contenido="<table id='mitablac'><thead><th rel='0' class='datatable-nosort' width='20%'>Fecha Alta</th><th rel='1' class='datatable-nosort' width='20%'>Tipo de Contrato</th><th rel='2' class='datatable-nosort'>Horario</th><th rel='3' class='datatable-nosort' width='20%'>Fecha Baja</th><th rel='4' width='5%'>&nbsp;</th></thead><tbody></tbody></table>";
        //   $("#fieldsetContratos").prepend(contenido);
        //   tablaEspecialSinDatos($("#mitablac"));
        // }
        

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

}//funcion eliminar contrato



function actualizarTipoContrato(datosFormulario)
{
  $.ajax({
    url:"./inc/updateContrato.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'tc'},
    beforeSend: function (){
      $("#btnGuardarTipoContrato").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando tipo de contrato y luego cerrar ...'/>&nbsp;");
    },
    success: function(data){
      if (data[0]==1)
      {
        t=$("#contrato").val();
        $("#editc_"+t).closest("td").text(data[1]);
        
        $("#spnTipoContrato").text(decodeEntities(data[1]));
        $("#cajaBotonesContrato").html("<div class='large-12 columns centrado'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cerrar</a>");
        $("#inpTipoContrato").prop("disabled",true).prop("readonly","readonly");
        $("#form_register_contrato").append("<small class='verde'> Actualizado .</small>");
      }
      else
      {
        $("#spnTipoContrato").addClass("rojo");
      }
      console.log(data);     
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos contrato.


function actualizarHorario(datosFormulario)
{
  $.ajax({
    url:"./inc/updateContrato.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'ho'},
    beforeSend: function (){
      $("#btnGuardarHorario").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando horario y luego cerrar ...'/>&nbsp;");
    },
    success: function(data){
      if (data[0]==1)
      {
        t=$("#contrato").val();
        $("#ediho_"+t).closest("td").text(data[1]);
        $("#spnHorario").text(decodeEntities(data[1]));
        $("#cajaBotonesContrato").html("<div class='large-12 columns centrado'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cerrar</a>");
        $("#inpHorario").prop("disabled",true).prop("readonly","readonly");
        $("#form_register_contrato").append("<small class='verde'> Actualizado .</small>");
      }
      else
      {
        $("#spnHorario").addClass("rojo");
      }
      console.log(data);
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos contrato.


function darDeBajaContrato(datosFormulario)
{
  $.ajax({
    url:"./inc/updateContrato.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'ba'},
    beforeSend: function (){
      $("#btnDarBaja").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='dar de baja y luego cerrar ...'/>&nbsp;");
    },
    success: function(data){
      if (data[0]==1)
      {
        $("#cajaBotonesContrato").html("<div class='large-12 columns centrado'><a id='btnCancelarEmergente' class='button' data-close aria-label='Close modal'>Cerrar</a>");
        $("#form_register_contrato").append("<small class='verde'> Se ha dado de baja satisfactoriamente .</small>");
        $("#mitablac i").remove();
      }
      else
      {
        $("#spnTipoContrato").closest("tr").addClass("rojo");
      }
      console.log(data);
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar datos contrato.

















/*************************************/
/* FUNCION PARA GESTIONAR TAXIMETROS */
/*************************************/
function seccionGestionTaximetros(){
  console.log("llega a taximetros");
  var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>TAXIMETROS</article></div><hr id='rayita' /><div class='row' id='subseccionFormularioGestionTaximetros'><div class='large-12 columns' id='subSeccionTaximetros'></div></div><form method='post' id='form_register_taximetro' data-abide><div class='row'><div class='large-12 columns' id='subSeccionAgregarTaximetro'></div></form></div>";

  //$("#contenedorAccionesLicencia,#contenedorAccionesVehiculo").addClass("oculto").html("");
  $("#contenedorAccionesGestion").html(contenido);
  contenido="<fieldset id='fieldsetElemento'><legend>Datos del Taximetro</legend><div class='row'><div class='large-4 columns'><input type='text' id='inpNumIdentificaAct' name='inpNumIdentificaAct' maxlength='40' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' placeholder='Número de identificación' /><span class='txtInfoTabula'>Pulse tabulador para validar</span></div><div class='large-8 columns resumen' id='resumenLecturaTaximetro'></div></div><div class='row'><div class='large-4 columns'><label for='sltMarcaT' >Marca Taxímetro <select id='sltMarcaT' name='sltMarcaT' data-id='ta' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-4 columns'><label for='sltModeloT' >Modelo Taxímetro <select id='sltModeloT' name='sltModeloT' disabled='disabled' class='elementoInactivoFondo'><option value=0>-- Seleccione</option></select></label></div><div class='large-4 columns'><label for='inpRevisionTaximetro' >Fecha Revisión<input type='text' id='inpRevisionTaximetro' name='inpRevisionTaximetro'readonly='readonly' maxlength='10' disabled='disabled' /></label></div></div><div class='row'><div class='large-8 columns'><label for='inpTaller' >Taller Instalador<input type='text' id='inpTaller' name='inpTaller' disabled='disabled' readonly='readonly' /></label></div><div class='large-4 columns'><label for='inpFechaValidezTaximetro' >Fecha Validez<input type='text' id='inpFechaValidezTaximetro' name='inpFechaValidezTaximetro'readonly='readonly'disabled='disabled' maxlength='10' /></label></div></div><div class='row'><div class='large-12 columns' id='barraDeEstado'></div></div></fieldset><div class='row' id='cajaGuardarVehiculo'><div class='large-12 columns a-la-derecha'><a id='btnActualizarTaximetro' class='button disabled' disabled='disabled'>Actualizar</a></div></div>";
  $("#subSeccionAgregarTaximetro").html(contenido);
  $("#inpNumIdentificaAct").select();
  cargarSelect("t");
}//fin seccion Gestion Taximetros


function guardarTaximetro(datosFormulario)
{
  $.ajax({
    url:"./inc/registerVehiculo.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'t'},
    beforeSend: function (){
      $("#btnActualizarTaximetro").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando para continuar ...'/>&nbsp;");
    },
    success: function(data){
      if (data[0]==1)
      {
        $("#barraDeEstado").html("<i class='fi-check verde' title='completado'></i>&nbsp;Actualización completada con éxito.");
        $("#sltMarcaT option[value='0']").prop("selected","selected")
        $("#sltModeloT").html("<option value='0'>-- Seleccione</option>");
        $("#inpRevisionTaximetro,#inpFechaValidezTaximetro,#inpTaller").val("");
        $("#inpRevisionTaximetro,#inpFechaValidezTaximetro,#inpTaller,#sltMarcaT,#sltModeloT").prop("disabled",true);
        $("#inpNumIdentificaAct").prop("readonly",false).prop("disabled",false).select();
      }
      $("#btnActualizarTaximetro img").remove().addClass("disabled");
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar vehiculo.