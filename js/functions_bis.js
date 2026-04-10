/*******************************************/
/* FUNCION PARA GESTIONAR MARCAS Y MODELOS */
/*******************************************/
function seccionGestionMarcaModelo(){
	console.log("llega");
	var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>MARCAS Y MODELOS</article></div><div class='row' id='subseccionFormularioGestionMarcaModelo'><div class='row'><div class='large-4 columns' id='selectorMarcaModelo'><label for='sltMarcaModelo'>Seleccione Marca o Modelo<select id='sltMarcaModelo' name='sltMarcaModelo'><option value='0'>-- Seleccione</option><option value='1'>Marcas</option><option value='2'>Modelos Vehículos</option><option value='3'>Modelos Taxímetros</option></select></label></div><div class='large-8 columns resumen' id='resumenLecturaElemento'></div></div><hr class='oculto' id='rayita' /><div class='row'><div class='large-12 columns' id='subSeccionMarcaModelo'></div></div><form method='post' id='form_register_marca_modelo' data-abide><div class='row'><div class='large-12 columns' id='subSeccionAgregarMarcaModelo'></div></form></div>";

	//$("#contenedorAccionesLicencia,#contenedorAccionesVehiculo").addClass("oculto").html("");
    $("#contenedorAccionesGestion").html(contenido);
}//fin seccion Gestion Marca Modelo


/****************************************/
/* FUNCION PARA AÑADIR MARCAS Y MODELOS */
/****************************************/
function formularioMarcaModelo(tipo){
  var desc;
  if (tipo==1)
  {
    desc="a Marca";
  }
  else
  {
    desc="o Modelo";
  }
  var contenido="<hr /><fieldset id='fieldsetElemento'><legend>Agregar Nuev" + desc + "</legend><div class='row'><div class='large-8 columns'>";

  //"<div class='row'><div class='large-8 columns'><label for='inpDomTit' >Domicilio del Titular<input type='text' id='inpDomTit' name='inpDomTit'readonly='readonly' maxlength='80'/></label></div><div class='large-4 columns'><label for='inpTelTit' >Teléfono<input type='text' id='inpTelTit' name='inpTelTit'readonly='readonly' maxlength='9'/></label></div></div><div class='row' id='cajaRepresentante'><div class='row'><div class='large-12 columns'><select id='tieneRepresentante' name='tieneRepresentante' disabled='disabled' class='elementoInactivoFondo'><option value='0' selected='selected'>No tiene Representante</option><option value='1'>Tiene Representante</option></select></div></div></div><div class='row' id='cajaConductor'><div class='row' id='cajaConductor'><div class='row'><div class='large-12 columns'><select id='esConductor' name='esConductor' disabled='disabled' class='elementoInactivoFondo'><option value='0' >No es conductor</option><option value='1' selected='selected'>Es conductor</option></select></div></div></div></div></fieldset>";
  if (tipo==1)
  {
    contenido+="<label for='inpMarca' >Marca<input type='text' id='inpMarca' name='inpMarca'  maxlength='40'/></label></div><div class='large-4 columns'><label for='sltTipo'>Tipo<select id='sltTipo' name='sltTipo'><option value='0' selected='selected'>-- Seleccione</option><option value='1'>Vehículo</option><option value='2'>Taxímetro</option></select></div></div>";
  }
  else if (tipo==2 || tipo==3)
  {
    contenido+="<label for='inpModelo' >Modelo<input type='text' id='inpModelo' name='inpModelo' maxlength='40'/></label></div><div class='large-4 columns'><label for='sltMarca'>Marca<select id='sltMarca' name='sltMarca'></select></div></div>";
  }
  contenido+="</fieldset>";
  contenido+="<div class='row' id='cajaGuardarMarcaModelo'><div class='large-12 columns a-la-derecha'><a id='btnGuardarMarcaModelo' class='button'>Guardar</a> <a id='btnCancelarMarcaModelo' class='button'>Cancelar</a></div></div>";
  $("#subSeccionAgregarMarcaModelo").html(contenido);
  if ( tipo==2 )
  {
    $("#sltMarca").load("./inc/loadMarca.php",{'tipo':'v'});
  }
  else if ( tipo==3 )
  {
    $("#sltMarca").load("./inc/loadMarca.php",{'tipo':'t'});    
  }
  $("#inpMarca,#inpModelo").focus();
}//fin seccion Alta Marcas Modelos

function insertarMarcaModelo(datos,elem){
	$.ajax({
      url:"./inc/registerMarcaModelo.php",
      type: 'POST',
      async: true,
      dataType: 'json',
      beforeSend: function (){
        $("#btnGuardarMarcaModelo").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando para continuar ...'/>&nbsp;").addClass("disabled");
        $("#sltTipo").prop("disabled",true).addClass("desactivado");
        $("#inpMarca").prop("readonly",true).closest("label").addClass("elementoInactivo");
      },
      data:{'info':datos,'elem':elem},
      success: function(data){
        console.log(data);
        //if (elem==1)
        //{
          if (data[0]==1)
          {
          	//si recibo un 1 todo esta ok
          	var table = $('#mitablam').DataTable();
          	table.row.add([data[1],data[2]]).draw();
            table.rows().invalidate().draw();
          	$("#subSeccionMarcaModelo").removeClass("transparente");
      			$("#mitablam_paginate").removeClass("oculto");
      			$("#subSeccionAgregarMarcaModelo").html("<span class='verde'><i class='fi-check'></i>&nbsp;Guardado correctamente</span>");
      			$("#btnAgregarMarcaModelo").removeClass("disabled");
            $("#sltMarcaModelo").prop("disabled",false);
          }
          else
          {
          	// en caso contrario se muestra el error
          	$("#fieldsetElemento").append("<div class='row'><div class='large-12 columns'>" + data[0] + "</div></div>");
          }
        //}
        //else if (elem==2)
        //{

        //}
      },
      error: function (x,y){
        alert("error");
      }
    });//ajax
}


/***********************************/
/* FUNCION PARA GESTIONAR EMISORAS */
/***********************************/
function seccionGestionEmisoras(){
  console.log("llega");
  var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>EMISORAS</article></div><hr id='rayita' /><div class='row' id='subseccionFormularioGestionEmisoras'><div class='large-12 columns' id='subSeccionEmisora'></div></div><form method='post' id='form_register_emisora' data-abide><div class='row'><div class='large-12 columns' id='subSeccionAgregarEmisora'></div></form></div>";

  //$("#contenedorAccionesLicencia,#contenedorAccionesVehiculo").addClass("oculto").html("");
  $("#contenedorAccionesGestion").html(contenido);
  cargaInicialEmisoras();
}//fin seccion Gestion Marca Modelo

function cargaInicialEmisoras(){
  $.ajax({
    url:"./inc/loadTodasEmisoras.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    success: function(data){
      $("#subSeccionAgregarEmisora").html("");
      var contenido = "<fieldset id='fieldsetEmisora'><legend>Listado de Emisoras Registradas</legend><div class='row'><div class='large-12 columns' id='contenedorTablas'><table id='mitablae'><thead>";
        contenido+="<th rel='0' class='datatable-nosort'>Nombre Comercial</th><th rel='1' class='datatable-nosort' width='20%'>Teléfono 1</th><th rel='2' class='datatable-nosort' width='20%'>Teléfono 2</th><th rel='3' class='datatable-nosort' width='20%'>Fax</th></thead><tbody>";

      if (data!='Sindatos')
      {

        $.each(data['emi'],function(clave,valor){
          contenido += "<tr><td><a data-id='" + valor.id + "' data-name='ediemi_" + valor.id + "'>" + valor.nomemi +  "</a></td><td><span ";
          if (valor.telef1!=null)
          {
            contenido += "data-id='" + valor.telef1 + "'>" + valor.telef1 +  "</span></td><td><span ";          
          }
          else
          {
            contenido += "> -- </span></td><td><span ";                    
          }
          if (valor.telef2!=null)
          {
            contenido += "data-id='" + valor.telef2 + "'>" + valor.telef2 +  "</td><td><span ";          
          }
          else
          {
            contenido += "> -- </span></td><td><span ";                     
          }
          if (valor.fax!=null)
          {
            contenido +="data-id='" + valor.fax + "'>" + valor.fax +  "</td><span ";          
          }
          else
          {
            contenido += "> -- </span></td>";                     
          }
          contenido+="</tr>";
        });//each
      }

      contenido+="</tbody></table></div></div></fieldset>";
      contenido+="<div class='row' id='cajaBotonAgregarEmisora'><div class='large-12 columns a-la-derecha'><a id='btnAgregarEmisora' class='button'>Agregar</a></div></div>";

      $("#subSeccionEmisora").html(contenido);
      var que="Emisoras";
      tablaEspecialConDatos($("#mitablae"),que);
    },
    error: function (x,y){
      alert("error");
    }
  });//ajax
}

/********************************/
/* FUNCION PARA AÑADIR EMISORAS */
/********************************/
function formularioNuevaEmisora(){
  var contenido="<hr /><fieldset id='fieldsetElemento'><legend>Agregar Nueva Emisora</legend><div class='row'><div class='large-12 columns'>";
  contenido+="<label for='inpNomEmi' >Nombre Comercial Emisora<input type='text' id='inpNomEmi' name='inpNomEmi'  maxlength='40'/></label></div></div>";
  contenido+="<div class='row'><div class='large-4 columns'><label for='inpTel1' >Teléfono 1<input type='text' id='inpTel1' name='inpTel1'  maxlength='9'/></label></div><div class='large-4 columns'><label for='inpTel2' >Teléfono 2<input type='text' id='inpTel2' name='inpTel2'  maxlength='9'/></label></div><div class='large-4 columns'><label for='inpFax' >Fax<input type='text' id='inpFax' name='inpFax'  maxlength='9'/></label></div></div>";
 
  contenido+="</fieldset>";
  contenido+="<div class='row' id='cajaGuardarEmisora'><div class='large-12 columns a-la-derecha'><a id='btnGuardarEmisora' class='button'>Guardar</a> <a id='btnCancelarEmisora' class='button'>Cancelar</a></div></div>";
  $("#subSeccionAgregarEmisora").html(contenido);
  $("#inpNomEmi").focus();
}//fin seccion Alta Licencia


function guardarEmisora(datos,id){
  $.ajax({
      url:"./inc/registerEmisora.php",
      type: 'POST',
      async: true,
      dataType: 'json',
      beforeSend: function (){
        $("#btnGuardarEmisora").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando para continuar ...'/>&nbsp;").addClass("disabled");
        $("#inpNomEmi,#inpTel1,#inpTel2,#inpFax").prop("readonly",true).closest("label").addClass("elementoInactivo");
      },
      data:{'info':datos,'emi':id,'tipo':'g'},
      success: function(data){
        console.log(id);
        //SI ESTA AÑADIENDO
        if (id == undefined)
        {
          console.log("por aqui");
          if (data[0]==1)
          {
            //si recibo un 1 todo esta ok
            var table = $('#mitablae').DataTable();
            var primero="<a data-id='" + data[5] + "' data-name='ediemi_" + data[5] + "'>" + data[1] + "</a>";
            $("#mitablae a").removeClass("desactivado").prop({'disabled':false});
            table.row.add([primero,"<span data-id='" +data[2]+ "'>"+data[2]+"</span>","<span data-id='" +data[3]+ "'>"+data[3]+"</span>","<span data-id='" +data[4]+ "'>"+data[4]+"</span>"]).draw();
            $("#subSeccionEmisora").removeClass("transparente");
            $("#mitablae_paginate").removeClass("oculto");
            $("#subSeccionAgregarEmisora").html("<span class='verde'><i class='fi-check'></i>&nbsp;Guardado correctamente</span>");
            $("#btnAgregarEmisora").removeClass("disabled");
          }
          else
          {
            // en caso contrario se muestra el error
            $("#fieldsetElemento").append("<div class='row'><div class='large-12 columns'>" + data[0] + "</div></div>");
          }          
        }
        // SI ESTA EDITANDO
        else
        {
          if (data[0]==1)
          {
            //si recibo un 1 todo esta ok
            console.log(data);
            var re=$("a[data-name='ediemi_" + id + "']");
            re.text(data[1]);
            re.closest("tr").find("td:eq(1)").find("span").text(data[2]);
            re.closest("tr").find("td:eq(2)").find("span").text(data[3]);
            re.closest("tr").find("td:eq(3)").find("span").text(data[4]);
            $("#subSeccionEmisora").removeClass("transparente");
            $("#mitablae_paginate").removeClass("oculto");
            $("#subSeccionAgregarEmisora").html("<span class='verde'><i class='fi-check'></i>&nbsp;Guardado correctamente</span>");
            $("#btnAgregarEmisora").removeClass("disabled");
            $("#mitablae a").removeClass("desactivado").prop({'disabled':false});
          }
          else
          {
            // en caso contrario se muestra el error
            $("#fieldsetElemento").append("<div class='row'><div class='large-12 columns'>" + data[0] + "</div></div>");
          }    
        }
      },
      error: function (x,y){
        alert("error");
      }
    });//ajax
}

/*******************************************/
/* FUNCION PARA CARGAR FOMRULARIO EMISORAS */
/*******************************************/
function formularioEditaEmisora(ident,nom,tel1,tel2,fax){
  t1=(tel1!=" -- ")?tel1:"";
  t2=(tel2!=" -- ")?tel2:"";
  fa=(fax!=" -- ")?fax:"";
  var contenido="<hr/><fieldset id='fieldsetElemento'><legend>Editar Emisora</legend><div class='row'><div class='large-12 columns'>";
  contenido+="<label for='inpNomEmi' >Nombre Comercial Emisora<input type='text' id='inpNomEmi' name='inpNomEmi'  maxlength='40' value='" + nom +"'/></label></div></div>";
  contenido+="<div class='row'><div class='large-4 columns'><label for='inpTel1' >Teléfono 1<input type='text' id='inpTel1' name='inpTel1'  maxlength='9' value='" + t1 +"'/></label></div><div class='large-4 columns'><label for='inpTel2'>Teléfono 2<input type='text' id='inpTel2' name='inpTel2'  maxlength='9' value='" + t2  +"'/></label></div><div class='large-4 columns'><label for='inpFax' >Fax<input type='text' id='inpFax' name='inpFax' maxlength='9' value='" + fa +"'/></label></div></div>";
 
  contenido+="</fieldset>";
  contenido+="<div class='row' id='cajaGuardarEmisora'><div class='large-12 columns a-la-derecha'><a id='btnGuardarEmisora' data-id='" + ident + "' class='button'>Guardar Cambios</a> <a id='btnCancelarEmisora' class='button'>Cancelar</a></div></div>";
  $("#subSeccionAgregarEmisora").html(contenido);
  $("#inpNomEmi").focus();
}//fin seccion Alta Licencia




/************************************/
/* FUNCION PARA GESTIONAR TITULARES */
/************************************/
function seccionGestionTitulares(){
  console.log("llega");
  var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>TITULARES</article></div><hr id='rayita' /><div class='row' id='subseccionFormularioGestionTitulares'><div class='large-12 columns' id='subSeccionTitular'></div></div><form method='post' id='form_register_titular' data-abide><div class='row'><div class='large-12 columns' id='subSeccionAgregarTitular'></div></form></div>";

  //$("#contenedorAccionesLicencia,#contenedorAccionesVehiculo").addClass("oculto").html("");
  $("#contenedorAccionesGestion").html(contenido);
  cargaInicialTitulares();
}//fin seccion Gestion Marca Modelo

function cargaInicialTitulares(){
  $.ajax({
    url:"./inc/loadTodosTitulares.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    success: function(data){
      $("#subSeccionAgregarTitular").html("");
      var contenido = "<fieldset id='fieldsetTitular'><legend>Listado de Titulares Registrados</legend><div class='row'><div class='large-12 columns' id='contenedorTablas'><table id='mitablat'><thead>";
        contenido+="<th rel='0' class='datatable-nosort' >Nombre y Apellidos</th><th rel='1' class='datatable-nosort' width='15%'>NIF/NIE</th><th rel='2' width='15%' class='datatable-nosort'>Lic.</th></thead><tbody>";
      if (data!='Sindatos')
      {
        $.each(data['tit'],function(clave,valor){
          tieneR=(valor.idrep!=null)?1:0;
          lic=(valor.numlic!=null)?valor.numlic:"--";
          contenido += "<tr><td><a data-lic='" + lic + "' data-id='" + valor.dni + "' data-name='editit_" + valor.dni + "' data-nom='" + valor.nomtit + "' data-ape='" + valor.apetit + "' data-rep='" + tieneR + "' data-repre='" + valor.idrep + "' data-dom='" + valor.domtit+ "' data-tel='" + valor.teltit + "'>" + valor.nomtit +  " " +valor.apetit+ "</a></td><td><span data-id='" + valor.dni +"'>" + valor.dni+ "</span></td><td>" + lic + "</td></tr>";
        });//each
      }

      contenido+="</tbody></table></div></div></fieldset>";
      contenido+="<div class='row' id='cajaBotonAgregarTitular'><div class='large-12 columns a-la-derecha'><a id='btnAgregarTitular' class='button'>Agregar</a></div></div>";
      //console.log(contenido);

      $("#subSeccionTitular").html(contenido);
      var que="Titulares";
      tablaEspecialConDatos($("#mitablat"),que);
    },
    error: function (x,y){
      alert("error");
    }
  });//ajax
}

/*********************************/
/* FUNCION PARA AÑADIR TITULARES */
/*********************************/
function formularioNuevoTitular(){
  var contenido="<hr /><fieldset id='fieldsetElemento'><legend>Agregar Nuevo Titular</legend><div class='row'><div class='large-2 columns'><input type='text' id='inpNIFNIET' name='inpNIFNIET' placeholder='NIF / NIE' maxlength='9' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' title='El campo debe coincidir con el siguiente formato: 00000000A ó X0000000Z'/></div><div class='large-10 columns resumen' id='resumenLecturaTitular'></div></div><div class='row'><div class='large-6 columns'><label for='inpNomTit' >Nombre del Titular<input type='text' id='inpNomTit' name='inpNomTit' readonly='readonly' maxlength='40'/></label></div><div class='large-6 columns'><label for='inpApeTit' >Apellidos del Titular<input type='text' id='inpApeTit' name='inpApeTit'readonly='readonly' maxlength='40'/></label></div></div><div class='row'><div class='large-8 columns'><label for='inpDomTit' >Domicilio del Titular<input type='text' id='inpDomTit' name='inpDomTit'readonly='readonly' maxlength='80'/></label></div><div class='large-4 columns'><label for='inpTelTit' >Teléfono<input type='text' id='inpTelTit' name='inpTelTit'readonly='readonly' maxlength='9'/></label></div></div><div class='row' id='cajaRepresentante'><div class='row'><div class='large-12 columns'><select id='tieneRepresentante' name='tieneRepresentante' disabled='disabled' class='elementoInactivoFondo'><option value='0' selected='selected'>No tiene Representante</option><option value='1'>Tiene Representante</option></select></div></div></div></div></fieldset>";

  contenido+="<div class='row' id='cajaGuardarTitular'><div class='large-12 columns a-la-derecha'><a id='btnGuardarTitular' class='button disabled'>Guardar</a> <a id='btnCancelarTitular' class='button'>Cancelar</a></div></div>";
  $("#subSeccionAgregarTitular").html(contenido);
  $("#inpNIFNIET").focus();
}//fin seccion Alta Licencia

function guardarTitular(datos,id,lic){
  $.ajax({
    url:"./inc/registerTitular.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datos},
    beforeSend: function (){
      $("#btnGuardarTitular").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando ...'/>&nbsp;");
    },
    success: function(data){
      if (data[0]==1)
      {
        tieneR=(data[5]==1)?1:0;
        repre=(data[6]!=null)?data[6]:null;
        tel=(data[7]!=undefined)?data[7]:"";
        console.log(id);
        $("#mitablat a").removeClass("desactivado").prop({'disabled':false});
        //si recibo un 1 todo esta ok
        var table = $('#mitablat').DataTable();
        if (id!=undefined)
        {
          table.row($("a[data-id='"+id+"']").closest("tr")).remove().draw();
          //console.log("id es:" + id);
        }
        console.log("tiene R: " + tieneR);
        var primero="<a data-id='" + data[1] + "' data-name='editit_" + data[1] + "' data-nom='" + data[2]+ "' data-ape='" + data[3] + "' data-rep='" + tieneR + "' data-repre='" + repre + "' data-dom='" + data[4]+ "' data-tel='" + data[7] + "'>" + data[2] + " " + data[3] + "</a>";
        table.row.add([primero,"<span data-id='" +data[1]+ "'>"+data[1]+"</span>","<span data-id='" +data[1]+ "'>"+data[8]+"</span>"]).draw();
        $("#subSeccionTitular").removeClass("transparente");
        $("#mitablat_paginate").removeClass("oculto");
        $("#subSeccionAgregarTitular").html("<span class='verde'><i class='fi-check'></i>&nbsp;Guardado correctamente</span>");
        $("#btnAgregarTitular").removeClass("disabled");
      }
      else
      {
        // en caso contrario se muestra el error
        $("#fieldsetElemento").append("<div class='row'><div class='large-12 columns'>" + data[0] + "</div></div>");
      }                  
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}

/********************************************/
/* FUNCION PARA CARGAR FORMULARIO TITULARES */
/********************************************/
function formularioEditaTitular(ident,nom,ape,tel,dom,tieneR,rep,lic){
  tele=(tel!=" -- ")?tel:"";
  // var contenido="<fieldset id='fieldsetElemento'><legend>Editar Elemento</legend><div class='row'><div class='large-12 columns'>";
  // contenido+="<label for='inpNomEmi' >Nombre Comercial Emisora<input type='text' id='inpNomEmi' name='inpNomEmi'  maxlength='40' value='" + nom +"'/></label></div></div>";
  // contenido+="<div class='row'><div class='large-4 columns'><label for='inpTel1' >Teléfono 1<input type='text' id='inpTel1' name='inpTel1'  maxlength='9' value='" + t1 +"'/></label></div><div class='large-4 columns'><label for='inpTel2'>Teléfono 2<input type='text' id='inpTel2' name='inpTel2'  maxlength='9' value='" + t2  +"'/></label></div><div class='large-4 columns'><label for='inpFax' >Fax<input type='text' id='inpFax' name='inpFax' maxlength='9' value='" + fa +"'/></label></div></div>";

  var contenido="<hr /><fieldset id='fieldsetElemento'><legend>Editar Titular</legend><div class='row'><div class='large-3 columns'><input type='hidden' id='edit' value='" + ident + "' /><input type='text' id='inpNIFNIET' name='inpNIFNIET' placeholder='NIF / NIE' value='" + ident + "' readonly='readonly' /><span class='txtInfoTabula'>Pulse tabulador para validar</span></div><div class='large-9 columns resumen' id='resumenLecturaTitular'></div></div><div class='row'><div class='large-6 columns'><label for='inpNomTit' >Nombre del Titular<input type='text' id='inpNomTit' name='inpNomTit'  maxlength='40' value='" + nom + "' /></label></div><div class='large-6 columns'><label for='inpApeTit' >Apellidos del Titular<input type='text' id='inpApeTit' name='inpApeTit' value='" +ape + "' maxlength='40'/></label></div></div><div class='row'><div class='large-8 columns'><label for='inpDomTit' >Domicilio del Titular<input type='text' id='inpDomTit' name='inpDomTit' value='" + dom + "' maxlength='80'/></label></div><div class='large-4 columns'><label for='inpTelTit' >Teléfono<input type='text' id='inpTelTit' name='inpTelTit' value='" + tele + "' maxlength='9'/></label></div></div><div class='row' id='cajaRepresentante'><div class='row'><div class='large-12 columns'><select id='tieneRepresentante' name='tieneRepresentante' ><option value='0'>No tiene Representante</option><option value='1'>Tiene Representante</option></select></div></div></div></div><div class='row' id='cajaRepresentante'></div></fieldset>";
 
  // contenido+="</fieldset>";
  contenido+="<div class='row' id='cajaGuardarTitular'><div class='large-12 columns a-la-derecha'><a id='btnGuardarTitular' data-id='" + ident + "' data-lic='" + lic + "' class='button'>Guardar Cambios</a> <a id='btnCancelarTitular' class='button'>Cancelar</a></div></div>";
  $("#subSeccionAgregarTitular").html(contenido);


  if (tieneR==1)
  {
    $("#tieneRepresentante").prop("disabled",false).removeClass("elementoInactivoFondo");
    $("#tieneRepresentante >option[value='1']").attr('selected', 'selected');

    $.ajax({
    url:"./inc/loadRepresentante.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'dniR':rep},
    beforeSend: function (){
      $("#resumenLecturaTitular").html("<img src='./../img/ajax-loader.gif' alt='cargando ...'/>&nbsp;");
    },
    success: function(data){
      console.log(data);
      var contenedor="<div class='row'><div class='large-12 columns'><fieldset id='fieldsetRepresentante'><legend>Datos del Representante</legend><div class='row'><div class='large-2 columns'><input type='text' id='inpNIFNIER' name='inpNIFNIER' placeholder='NIF / NIE' value='" + rep + "' readonly='readonly' maxlength='9'/></div><div class='large-10 columns resumen' id='resumenLecturaRepresentante'></div></div><div class='row'><div class='large-6 columns'><label for='inpNomRep'>Nombre del Representante<input type='text' id='inpNomRep' name='inpNomRep' value='" + data[0]['nomrep'] + "'  maxlength='40'  /></label></div><div class='large-6 columns'><label for='inpApeRep'>Apellidos del Representante<input type='text' id='inpApeRep' name='inpApeRep' value='" + data[0]['aperep'] + "'  maxlength='40'  /></label></div></div><div class='row'><div class='large-8 columns'><label for='inpDomRep'>Domicilio del Representante<input type='text' id='inpDomRep' name='inpDomRep' value='" + data[0]['domrep'] + "'  maxlength='80'  /></label></div><div class='large-4 columns'><label for='inpTelRep'>Teléfono<input type='text' id='inpTelRep' name='inpTelRep' value='" + data[0]['telrep'] + "'  maxlength='9' /></label></div></div></fieldset></div></div>";

      $("#cajaRepresentante").append(contenedor);  
      $("#resumenLecturaTitular").html("");

    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
  }
  else
  {
    $("#tieneRepresentante >option[value='0']").attr('selected', 'selected');    
  }
  $("#inpNomTit").focus();
}//fin seccion formulario titulares



/************************************/
/* FUNCION PARA GESTIONAR VEHICULOS */
/************************************/
function seccionGestionVehiculos(){
  console.log("llega");
  var contenido="<div class='large-12 columns'><article class='centrado granTitulo'>VEHICULOS</article></div><hr id='rayita' /><div class='row' id='subseccionFormularioGestionVehiculos'><div class='large-12 columns' id='subSeccionVehiculos'></div></div><form method='post' id='form_register_vehiculo' data-abide><div class='row'><div class='large-12 columns' id='subSeccionAgregarVehiculo'></div></form></div>";

 // $("#contenedorAccionesLicencia,#contenedorAccionesVehiculo").addClass("oculto").html("");
  $("#contenedorAccionesGestion").html(contenido);
  cargaInicialVehiculos("<div class='large-12 columns a-la-derecha'><a id='btnAgregarVehiculo' class='button'>Agregar</a></div>","v");
}//fin seccion Gestion Vehiculos

function cargaInicialVehiculos(boton,tipo){
  $.ajax({
    url:"./inc/loadTodosVehiculos.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    success: function(data){
      //console.log(data);
      $("#subSeccionAgregarVehiculo").html("");
      var contenido = "<fieldset id='fieldsetVehiculo'><legend>Listado de Vehículos Registrados</legend><div class='row'><div class='large-12 columns' id='contenedorTablas'><table id='mitablav'><thead>";
        contenido+="<th rel='0' class='datatable-nosort' width='10%'>Matrícula</th><th rel='1' class='datatable-nosort' width='30%'>Marca/Modelo</th><th rel='2' class='datatable-nosort' width='20%'>Num.Bastidor</th><th rel='3' class='datatable-nosort' width='20%'>Fecha Mat.</th><th rel='4' class='datatable-nosort' width='20%'>ITV</th><th rel='5' class='datatable-nosort' width='10%'>Lic.</th><th>&nbsp;</th></thead><tbody>";
      if (data!='Sindatos')
      {
        $.each(data['veh'],function(clave,valor){
          tieneR=(valor.idrep!=null)?1:0;
          deBaja=(valor.baja==1)?"rojo":"verde";
          lic=(valor.numlic!=null)?valor.numlic:"--";
          comment=(valor.fechabaja!=null)?convertirFecha(valor.fechabaja):"Activo";
          vfecmat=(valor.fecmat!=null)?convertirFecha(valor.fecmat):"--";
          vfecitv=(valor.fecitv!=null)?convertirFecha(valor.fecitv):"--";
          contenido += "<tr><td><a data-id='" + valor.matveh + "' data-tipo='" + tipo + "' data-name='ediveh_" + valor.matveh + "' >" + valor.matveh + "</a></td><td><span data-id='" + valor.matveh +"'>" + valor.marca + " " + valor.modelo + "</span></td><td><span data-id='" + valor.matveh + "'>" + valor.numbas + "</span></td><td><span data-id='" + valor.matveh + "'>" + vfecmat + "</span></td><td><span data-id='" + valor.matveh + "'>" + vfecitv + "</span></td><td>" + lic+ "</td><td><i class='fi-record " + deBaja + "' title='" + comment+ "'></i></td></tr>";
        });//each        
      }

      contenido+="</tbody></table></div></div></fieldset>";
      contenido+="<div class='row' id='cajaBotonesVehiculo'>" + boton + "</div>";
      //console.log(contenido);

      $("#subSeccionVehiculos").html(contenido);
      var que="Vehiculos";
      tablaEspecialConDatos($("#mitablav"),que);
    },
    error: function (x,y){
      alert("error");
    }
  });//ajax
}
/*********************************/
/* FUNCION PARA AÑADIR VEHICULOS */
/*********************************/
function formularioNuevoVehiculo(){
  var contenido="<hr /><fieldset id='fieldsetElemento'><legend>Agregar Nuevo Elemento</legend><div class='row'><div class='large-2 columns'><input type='text' id='inpMatricula' name='inpMatricula' placeholder='0000ABC' maxlength='8' pattern='^[0-9]{4}[A-Z|a-z]{3}$' title='El campo debe coincidir con el siguiente formato: 0000ABC ó AA0000MM'/></div><div class='large-10 columns resumen' id='resumenLecturaVehiculo'></div></div><div class='row'><div class='large-4 columns'><label for='sltMarcaV' >Marca<select id='sltMarcaV' name='sltMarcaV' data-id='ve' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-4 columns'><label for='sltModeloV' >Modelo<select id='sltModeloV' name='sltModeloV' disabled='disabled' class='elementoInactivoFondo'><option value=0>--Seleccione</option></select></label></div><div class='large-4 columns'><label for='inpNumBastidor' >Número de Bastidor<input type='text' id='inpNumBastidor' name='inpNumBastidor'readonly='readonly' maxlength='40' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$'/></label></div></div><div class='row'><div class='large-3 columns'><label for='inpFechaMatricula' >Fecha Matriculación<input type='text' id='inpFechaMatricula' name='inpFechaMatricula'readonly='readonly' maxlength='10'/></label></div><div class='large-3 columns'><label for='inpFechaITV' >Fecha Validez ITV<input type='text' id='inpFechaITV' name='inpFechaITV'readonly='readonly' maxlength='10'/></label></div><div class='large-3 columns'><label for='sltTipoCombustible' >Tipo de Combustible<select id='sltTipoCombustible' name='sltTipoCombustible' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-3 columns'><label for='inpPlazas' >Plazas<input type='text' id='inpPlazas' name='inpPlazas'readonly='readonly' maxlength='1' pattern='^[0-9]{1}$'/></label></div></div><div class='row'><fieldset id='elementosAdicionales'><div class='large-3 columns'><label for='inpDiscapacita' >A. Discapacitados<br /><input type='checkbox' id='inpDiscapacita' name='inpDiscapacita' disabled='disabled' title='Adaptado a discapacidados' /></label></div><div class='large-2 columns'><label for='inpGPS' >GPS<br /><input type='checkbox' id='inpGPS' name='inpGPS' disabled='disabled' title='Dispone de GPS'/></label></div><div class='large-3 columns'><label for='inpImpresora' >Impresora Recibos<br /><input type='checkbox' id='inpImpresora' name='inpImpresora' disabled='disabled' title='Dispone de Impresora de Recibos'/></label></div><div class='large-2 columns'><label for='inpPagoTarjeta' >Datáfono<br /><input type='checkbox' id='inpPagoTarjeta' name='inpPagoTarjeta' disabled='disabled' title='Dispone Pago con Tarjeta' /></label></div><div class='large-2 columns'><label for='inpMampara' >Mampara<br /><input type='checkbox' id='inpMampara' name='inpMampara' disabled='disabled' title='Dispone de Mampara' /></label></div></fieldset></div><div class='row'><div class='large-12 columns'><label for='inpOtros' >Otras características<textarea id='inpOtros' name='inpOtros' maxlength='250' size='3' readonly='readonly'></textarea></label></div></div><div class='row' id='cajaTaximetro'><fieldset><legend>Datos del Taximetro</legend><div class='row'><div class='large-4 columns'><input type='text' id='inpNumIdentifica' name='inpNumIdentifica'readonly='readonly' maxlength='40' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' placeholder='Número de identificación'/></div><div class='large-8 columns resumen' id='resumenLecturaTaximetro'></div></div><div class='row'><div class='large-4 columns'><label for='sltMarcaT' >Marca Taxímetro <select id='sltMarcaT' name='sltMarcaT' data-id='ta' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-4 columns'><label for='sltModeloT' >Modelo Taxímetro <select id='sltModeloT' name='sltModeloT' disabled='disabled' class='elementoInactivoFondo'><option value=0>-- Seleccione</option></select></label></div><div class='large-4 columns'><label for='inpRevisionTaximetro' >Fecha Revisión<input type='text' id='inpRevisionTaximetro' name='inpRevisionTaximetro'readonly='readonly' maxlength='10'/></label></div></div><div class='row'><div class='large-8 columns'><label for='inpTaller' >Taller Instalador<input type='text' id='inpTaller' name='inpTaller' readonly='readonly' /></label></div><div class='large-4 columns'><label for='inpFechaValidezTaximetro' >Fecha Validez<input type='text' id='inpFechaValidezTaximetro' name='inpFechaValidezTaximetro'readonly='readonly' maxlength='10'/></label></div></div></div></fieldset>";

  contenido+="<div class='row' id='cajaGuardarVehiculo'><div class='large-12 columns a-la-derecha'><a id='btnGuardarVehiculo' class='button disabled'>Guardar</a> <a id='btnCancelarVehiculo' class='button'>Cancelar</a></div></div>";
  $("#subSeccionAgregarVehiculo").html(contenido);
  cargarSelect("v");
  $("#inpMatricula").focus();
}//fin seccion Alta Licencia




/********************************************/
/* FUNCION PARA CARGAR FORMULARIO TAXIMETRO */
/********************************************/
function formularioNuevoTaximetro(){
  var contenido ="<div class='row' id='cajaTaximetro'><fieldset class='elementoInactivoFondo'><legend>Datos del Taximetro&nbsp;</legend><div class='row'><div class='large-3 columns'><input type='text' id='inpNumIdentifica' name='inpNumIdentifica' maxlength='40' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' placeholder='Número de identificación' /><span class='txtInfoTabula'>Pulse tabulador para validar</span></div><div class='large-9 columns resumen' id='resumenLecturaTaximetro'></div></div><div class='row'><div class='large-4 columns'><label for='sltMarcaT' >Marca Taxímetro <select id='sltMarcaT' name='sltMarcaT' data-id='ta' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-4 columns'><label for='sltModeloT' >Modelo Taxímetro <select id='sltModeloT' name='sltModeloT' disabled='disabled' class='elementoInactivoFondo'><option value=0>-- Seleccione</option></select></label></div><div class='large-4 columns'><label for='inpRevisionTaximetro' >Fecha Revisión<input type='text' id='inpRevisionTaximetro' name='inpRevisionTaximetro' readonly='readonly' maxlength='10' /></label></div></div><div class='row'><div class='large-8 columns'><label for='inpTaller' >Taller Instalador<input type='text' id='inpTaller' name='inpTaller' /></label></div><div class='large-4 columns'><label for='inpFechaValidezTaximetro' >Fecha Validez<input type='text' id='inpFechaValidezTaximetro' name='inpFechaValidezTaximetro'readonly='readonly' maxlength='10' /></label></div></div></div>";
  $("#agregarTaximetro").html(contenido);
  cargarSelect("t");
}
/********************************************/
/* FUNCION PARA CARGAR FORMULARIO VEHICULOS */
/********************************************/
function formularioEditaVehiculo(ident){
  // var contenido="<fieldset id='fieldsetElemento'><legend>Editar Elemento</legend><div class='row'><div class='large-12 columns'>";
  // contenido+="<label for='inpNomEmi' >Nombre Comercial Emisora<input type='text' id='inpNomEmi' name='inpNomEmi'  maxlength='40' value='" + nom +"'/></label></div></div>";
  // contenido+="<div class='row'><div class='large-4 columns'><label for='inpTel1' >Teléfono 1<input type='text' id='inpTel1' name='inpTel1'  maxlength='9' value='" + t1 +"'/></label></div><div class='large-4 columns'><label for='inpTel2'>Teléfono 2<input type='text' id='inpTel2' name='inpTel2'  maxlength='9' value='" + t2  +"'/></label></div><div class='large-4 columns'><label for='inpFax' >Fax<input type='text' id='inpFax' name='inpFax' maxlength='9' value='" + fa +"'/></label></div></div>";
  // var et=new Array();
  // $.post("./inc/loadselect.php",{'step':'v'},function(data){
  //   et=data;
  // });
  //   console.log(et);
  var contenido;
  $.getJSON("./inc/locateVehiculoEditar.php",{'mat':ident},function(data){
    //console.log(data['vehi']);
    var fm=(data['vehi'].fecmat!=null)?convertirFecha(data['vehi'].fecmat):"";
    var fi=(data['vehi'].fecitv!=null)?convertirFecha(data['vehi'].fecitv):"";
    if (data['taximetros']!=0)
    {
      var fr=(data['vehi'].fecrev!=null)?convertirFecha(data['vehi'].fecrev):"";
      var fv=(data['vehi'].fecval!=null)?convertirFecha(data['vehi'].fecval):"";
      var numide=data['vehi'].numide;
      var taller=data['vehi'].taller;
    }
    else
    {
      var fr="";
      var fv="";
      var numide="";
      var taller="";
    }
    contenido="<hr /><fieldset id='fieldsetElemento'><legend>Editar Vehículo</legend><div class='row'><div class='large-3 columns'><input type='text' placeholder='0000ABC' maxlength='8' pattern='^[0-9]{4}[A-Z|a-z]{3}$' title='El campo debe coincidir con el siguiente formato: 0000ABC ó AA0000MM' readonly='readonly' value='" + data['vehi'].matveh + "' id='inpMatriculaEdit'/><input type='hidden' id='inpMatricula' name='inpMatricula' value='" + data['vehi'].matveh + "'/><span class='txtInfoTabula'>Pulse tabulador para validar</span></div><div class='large-9 columns resumen' id='resumenLecturaVehiculo'></div></div><div class='row'><div class='large-4 columns'><label for='sltMarcaV' >Marca<select id='sltMarcaV' name='sltMarcaV' data-id='ve' ></select></label></div><div class='large-4 columns'><label for='sltModeloV' >Modelo<select id='sltModeloV' name='sltModeloV' ><option value=0>--Seleccione</option></select></label></div><div class='large-4 columns'><label for='inpNumBastidor' >Número de Bastidor<input type='text' id='inpNumBastidor' name='inpNumBastidor' maxlength='40' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' value='" + data['vehi'].numbas+ "'/></label></div></div><div class='row'><div class='large-3 columns'><label for='inpFechaMatricula' >Fecha Matriculación<input type='text' id='inpFechaMatricula' name='inpFechaMatricula'readonly='readonly' maxlength='10' value='" + fm + "'/></label></div><div class='large-3 columns'><label for='inpFechaITV' >Fecha Validez ITV<input type='text' id='inpFechaITV' name='inpFechaITV'readonly='readonly' maxlength='10' value='" + fi + "'/></label></div><div class='large-3 columns'><label for='sltTipoCombustible' >Tipo de Combustible<select id='sltTipoCombustible' name='sltTipoCombustible' ></select></label></div><div class='large-3 columns'><label for='inpPlazas' >Plazas<input type='text' id='inpPlazas' name='inpPlazas' maxlength='1' pattern='^[0-9]{1}$' value='" + data['vehi'].numpla + "' /></label></div></div><div class='row'><fieldset id='elementosAdicionales'><div class='large-3 columns'><label for='inpDiscapacita' >A. Discapacitados<br /><input type='checkbox' id='inpDiscapacita' name='inpDiscapacita' title='Adaptado a discapacidados' /></label></div><div class='large-2 columns'><label for='inpGPS' >GPS<br /><input type='checkbox' id='inpGPS' name='inpGPS' title='Dispone de GPS'/></label></div><div class='large-3 columns'><label for='inpImpresora' >Impresora Recibos<br /><input type='checkbox' id='inpImpresora' name='inpImpresora' title='Dispone de Impresora de Recibos'/></label></div><div class='large-2 columns'><label for='inpPagoTarjeta' >Datáfono<br /><input type='checkbox' id='inpPagoTarjeta' name='inpPagoTarjeta' title='Dispone Pago con Tarjeta' /></label></div><div class='large-2 columns'><label for='inpMampara' >Mampara<br /><input type='checkbox' id='inpMampara' name='inpMampara' title='Dispone de Mampara' /></label></div></fieldset></div><div class='row'><div class='large-12 columns'><label for='inpOtros' >Otras características<textarea id='inpOtros' name='inpOtros' maxlength='250' size='3' >" + data['vehi'].otros + "</textarea></label></div></div>";

    if (data['taximetros']!=0)
    {
    contenido +="<div class='row' id='cajaTaximetro'><fieldset class='elementoInactivoFondo'><legend>Datos del Taximetro&nbsp;<span class='link boton' id='btnCambiarTaximetro' aria-hidden='true' title='Taxímetro asociado con vehículo. Doble click para cambiarlo.'><i class='fa fa-expeditedssl'></i> Cambiar</span></legend><div class='row'><div class='large-3 columns'><input type='text' id='inpNumIdentifica' name='inpNumIdentifica' maxlength='40' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' placeholder='Número de identificación' readonly='readonly' disabled='disabled' value='" + numide + "'/><span class='txtInfoTabula'>Pulse tabulador para validar</span></div><div class='large-9 columns resumen' id='resumenLecturaTaximetro'></div></div><div class='row'><div class='large-4 columns'><label for='sltMarcaT' >Marca Taxímetro <select id='sltMarcaT' name='sltMarcaT' data-id='ta' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-4 columns'><label for='sltModeloT' >Modelo Taxímetro <select id='sltModeloT' name='sltModeloT' disabled='disabled' class='elementoInactivoFondo'><option value=0>-- Seleccione</option></select></label></div><div class='large-4 columns'><label for='inpRevisionTaximetro' >Fecha Revisión<input type='text' id='inpRevisionTaximetro' name='inpRevisionTaximetro'readonly='readonly' maxlength='10' disabled='disabled' value='" + fr + "'/></label></div></div><div class='row'><div class='large-8 columns'><label for='inpTaller' >Taller Instalador<input type='text' id='inpTaller' name='inpTaller' disabled='disabled' readonly='readonly' value='" + taller + "'/></label></div><div class='large-4 columns'><label for='inpFechaValidezTaximetro' >Fecha Validez<input type='text' id='inpFechaValidezTaximetro' name='inpFechaValidezTaximetro'readonly='readonly'disabled='disabled' maxlength='10' value='" + fv + "'/></label></div></div></div>";
    }
    else
    {
      // contenido +="<div class='row' id='cajaTaximetro'><fieldset class='elementoInactivoFondo'><legend>Datos del Taximetro&nbsp;</legend><div class='row'><div class='large-4 columns'><input type='text' id='inpNumIdentifica' name='inpNumIdentifica' maxlength='40' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' placeholder='Número de identificación' /></div><div class='large-8 columns resumen' id='resumenLecturaTaximetro'></div></div><div class='row'><div class='large-4 columns'><label for='sltMarcaT' >Marca Taxímetro <select id='sltMarcaT' name='sltMarcaT' data-id='ta' disabled='disabled' class='elementoInactivoFondo'></select></label></div><div class='large-4 columns'><label for='sltModeloT' >Modelo Taxímetro <select id='sltModeloT' name='sltModeloT' disabled='disabled' class='elementoInactivoFondo'><option value=0>-- Seleccione</option></select></label></div><div class='large-4 columns'><label for='inpRevisionTaximetro' >Fecha Revisión<input type='text' id='inpRevisionTaximetro' name='inpRevisionTaximetro' readonly='readonly' maxlength='10' /></label></div></div><div class='row'><div class='large-8 columns'><label for='inpTaller' >Taller Instalador<input type='text' id='inpTaller' name='inpTaller' /></label></div><div class='large-4 columns'><label for='inpFechaValidezTaximetro' >Fecha Validez<input type='text' id='inpFechaValidezTaximetro' name='inpFechaValidezTaximetro'readonly='readonly' maxlength='10' /></label></div></div></div>";
      contenido +="<div class='row' id='agregarTaximetro'><div class='large-12 columns centrado'><a id='btnAgregarTaximetro' data-id='" + ident + "' class='button warning' data-act='1'>Agregar Taxímetro</a></div></div>";
    }

    contenido+="</fieldset><div class='row' id='cajaGuardarVehiculo'><div class='large-12 columns a-la-derecha'><a id='btnGuardarVehiculo' data-id='" + ident + "' class='button' data-act='1'>Guardar Cambios</a> <a id='btnCancelarVehiculo' class='button'>Cancelar</a></div></div>";
    $("#subSeccionAgregarVehiculo").html(contenido);
    cargarSelect("v");
    console.log(data['vehi'].idmarta);
    $("#sltMarcaV option[value='"+data['vehi'].idmarve+"']").prop("selected","selected");
    $("#sltTipoCombustible option[value='"+data['vehi'].idcom+"']").prop("selected","selected");
    $("#sltMarcaT option[value='"+data['vehi'].idmarta+"']").prop("selected","selected");
    contenido="";
    //console.log(data['vehiculos']);
    $.each(data['vehiculos'],function(clave,valor){
        contenido += "<option value='" + valor.identificador + "'>" + valor.modelo + "</option>";
        //console.log("valor " + valor.identificador + " modelo " + valor.modelo);
      });//each
    $("#sltModeloV").append(contenido);
    contenido="";
    $.each(data['taximetros'],function(clave,valor){
      contenido += "<option value='" + valor.identificador + "'>" + valor.modelo + "</option>";
      //console.log(contenido);
    });//each
    $("#sltModeloT").append(contenido);
    $("#sltModeloV option[value='"+data['vehi'].idmodve+"']").prop("selected","selected");
    $("#sltModeloT option[value='"+data['vehi'].idmodta+"']").prop("selected","selected");
    //console.log(contenido);
    if (data['vehi'].adadis==1){$("#inpDiscapacita").prop("checked","checked");}
    if (data['vehi'].gps==1){$("#inpGPS").prop("checked","checked");}
    if (data['vehi'].imprec==1){$("#inpImpresora").prop("checked","checked");}
    if (data['vehi'].pagtar==1){$("#inpPagoTarjeta").prop("checked","checked");}
    if (data['vehi'].mampar==1){$("#inpMampara").prop("checked","checked");}

    $('#inpFechaITV,#inpFechaMatricula,#inpFechaValidezTaximetro,#inpRevisionTaximetro').datepicker();

    //$("#sltMarcaV").css("background-color","red");
    //alert("Seleccionado " + $("#sltMarcaV option:selected").val());

  });

 
  // contenido+="</fieldset>";
  


  // if (tieneR==1)
  // {
  //   $("#tieneRepresentante").prop("disabled",false).removeClass("elementoInactivoFondo");
  //   $("#tieneRepresentante >option[value='1']").attr('selected', 'selected');

  //   $.ajax({
  //   url:"./inc/loadRepresentante.php",
  //   type: 'POST',
  //   async: true,
  //   dataType: 'json',
  //   data: {'dniR':rep},
  //   beforeSend: function (){
  //     $("#resumenLecturaTitular").html("<img src='./../img/ajax-loader.gif' alt='cargando ...'/>&nbsp;");
  //   },
  //   success: function(data){
  //     console.log(data);
  //     var contenedor="<div class='row'><div class='large-12 columns'><fieldset id='fieldsetRepresentante'><legend>Datos del Representante</legend><div class='row'><div class='large-2 columns'><input type='text' id='inpNIFNIER' name='inpNIFNIER' placeholder='NIF / NIE' value='" + rep + "' readonly='readonly' maxlength='9'/></div><div class='large-10 columns' id='resumenLecturaRepresentante'></div></div><div class='row'><div class='large-6 columns'><label for='inpNomRep'>Nombre del Representante<input type='text' id='inpNomRep' name='inpNomRep' value='" + data[0]['nomrep'] + "'  maxlength='40'  /></label></div><div class='large-6 columns'><label for='inpApeRep'>Apellidos del Representante<input type='text' id='inpApeRep' name='inpApeRep' value='" + data[0]['aperep'] + "'  maxlength='40'  /></label></div></div><div class='row'><div class='large-8 columns'><label for='inpDomRep'>Domicilio del Representante<input type='text' id='inpDomRep' name='inpDomRep' value='" + data[0]['domrep'] + "'  maxlength='80'  /></label></div><div class='large-4 columns'><label for='inpTelRep'>Teléfono<input type='text' id='inpTelRep' name='inpTelRep' value='" + data[0]['telrep'] + "'  maxlength='9'  /></label></div></div></fieldset></div></div>";

  //     $("#cajaRepresentante").append(contenedor);  
  //     $("#resumenLecturaTitular").html("");

  //   },
  //   error: function (x,y){
  //     console.log("Se ha producido un error al recibir la respuesta del servidor.");
  //   }
  // });//ajax
  // }
  // else
  // {
  //   $("#tieneRepresentante >option[value='0']").attr('selected', 'selected');    
  // }
  // $("#inpNomTit").focus();
}//fin seccion formulario vehiculo

function guardarVehiculo(datosFormulario,proc)
{
  $.ajax({
    url:"./inc/registerVehiculo.php",
    type: 'POST',
    async: true,
    dataType: 'json',
    data: {'info':datosFormulario,'tipo':'v','procedi':proc},
    beforeSend: function (){
      $("#btnGuardarVehiculo").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando para continuar ...'/>&nbsp;");
    },
    success: function(data){
      if (data[0]==1)
      {
        /*
        $datos[0]=1;
        $datos[1]=$mat;
        $datos[2]=$tupla['marca'];
        $datos[3]=$tupla['modelo'];
        $datos[4]=$numide;
        $datos[5]=date("d-m-Y", strtotime($fecmat));
        $datos[6]=date("d-m-Y", strtotime($fecitv));
        */

        // tieneR=(data[5]==1)?1:0;
        // repre=(data[6]!=null)?data[6]:null;
        // tel=(data[7]!=undefined)?data[7]:"";
        // console.log(id);
        lic=(data[7]!=null)?data[7]:"--";
        $("#mitablav a").removeClass("desactivado").prop({'disabled':false});
        //si recibo un 1 todo esta ok
        var table = $('#mitablav').DataTable();
        if (proc!=undefined)
        {
          table.row($("a[data-id='"+data[1]+"']").closest("tr")).remove().draw();
          //console.log("id es:" + id);
        }
        state=(data[8]=="1")?"<i class='fi-record rojo' title='" + data[9]+ "'></i>":"<i class='fi-record verde' title='Activo'></i>";
        //console.log("tiene R: " + tieneR);
        var primero="<a data-id='" + data[1] + "' data-name='ediveh_" + data[1] + "'>" + data[1] +  "</a>";
        table.row.add([primero,"<span data-id='" + data[1] +"'>" + data[2] + " " + data[3] + "</span>","<span data-id='" + data[1] + "'>" + data[4] + "</span>", "<span data-id='" + data[1] + "'>" + data[5] + "</span>","<span data-id='" + data[1] + "'>" + data[6] + "</span>","<span data-id='" + data[1] + "'>" + lic + "</span>",state]).draw();
        $("#subSeccionVehiculos").removeClass("transparente");
        $("#mitablav_paginate").removeClass("oculto");
        $("#subSeccionAgregarVehiculo").html("<span class='verde'><i class='fi-check'></i>&nbsp;Guardado correctamente</span>");
        $("#btnAgregarVehiculo").removeClass("disabled");
      }
      else
      {
        // en caso contrario se muestra el error
        $("#fieldsetElemento").append("<div class='row'><div class='large-12 columns'>" + data[0] + "</div></div>");
      }

      $("#btnGuardarVehiculo img").remove();
    },
    error: function (x,y){
      console.log("Se ha producido un error al recibir la respuesta del servidor.");
    }
  });//ajax
}//insertar vehiculo.