var botonActiva=0; // CONTROLAR LA MODIFICACION EN ELEMENTOS DE FORMULARIOS PARA DETECTAR LA PRIMERA PULSACION Y ACTIVAR EL BOTON CORRESPONDIENTE SOLO UNA VEZ
var estado=0; // 2 -> Solo Lectura; 3 -> Lectura Escritura
var exist=0; // 0 -> No existe  1 -> Existe
$(document).ready(function(){
    $.ajax({
      url:"./inc/state.php",
      type: 'GET',
      async: false,
      success: function(r){
        
        estado=parseInt(r); 
      }
    });
    $(function($){
      $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd-mm-yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: '',
        changeMonth: true,
        changeYear: true,
        yearRange:"c-100:c+5"
      };
      $.datepicker.setDefaults($.datepicker.regional['es']);
    });

  loadPortada();    


  /*****************************************************/
  /* EVENTO SELECCIONADOR DE LICENCIAS DURANTE EL ALTA */
  /*****************************************************/
  $("#contenedorAccionesLicencia").on("change","#sltLicencia",function(e){
    $.ajax({
      url:"./inc/testlicense.php",
      type: 'POST',
      async: true,
      dataType: 'text',
      beforeSend: function (){
        $("#sltLicencia").prop("disabled",true).addClass("desactivado");
        $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><img src='./../img/ajax-loader.gif' lt='buscando ...'/>&nbsp;</label>");
      },
      data:{'lic':$(this).val()},
      success: function(res){
        $("#sltLicencia").prop("disabled",false).removeClass("desactivado");
        if (res)
          $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><span>&nbsp;La licencia ya está en uso</span></label>");
        else
          $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><span class='resumen' id='textoTestLicense'>&nbsp;Licencia libre. Pulse <span class='boton link' id='btn-continuarConTitular'>aquí</span> para continuar con el proceso</span></label>");
      },
      error: function (x,y){
        alert("error");
      }
    });//ajax
  }); //fin evento acciones seleccionador licencia

  /**********************************************/
  /* EVENTO BOTON CONTINUAR CON ALTA DE TITULAR */
  /**********************************************/  
  $("#contenedorAccionesLicencia").on("click", "#btn-continuarConTitular",function(e){
    console.log("Segundo Paso ... añadir Titular");
    $("#sltLicencia").prop("disabled",true).addClass("desactivado");
    //$("#textoTestLicense").html("Añadiendo Titular");
    $("#textoTestLicense").html("");
    $("#selectorLicencia").append("<input type='hidden' name='inpLicencia' value='" + $("#sltLicencia option:selected").val() + "' />");
    $(".progress-indicator li:first").removeClass("active").addClass("completed");
    $("#rayita").removeClass("oculto");
    subSeccionTitular();
  });

  /**********************************************/
  /* EVENTO CAMBIO EN EL COMBO DE REPRESENTANTE */
  /**********************************************/  
  $("#contenedorAccionesLicencia").on("change","#tieneRepresentante",function(e){
    if ($("#tieneRepresentante option:selected").val()==1)
    {
      var contenedor="<div class='row'><div class='large-12 columns espacioAnterior'><fieldset id='fieldsetRepresentante'><legend>Datos del Representante</legend><div class='row'><div class='large-3 columns'><input type='text' id='inpNIFNIER' name='inpNIFNIER' placeholder='NIF / NIE' maxlength='9' /><span class='txtInfoTabula'>Pulse tabulador para validar</span></div><div class='large-9 columns resumen' id='resumenLecturaRepresentante'></div></div><div class='row'><div class='large-6 columns'><label for='inpNomRep'>Nombre del Representante<input type='text' id='inpNomRep' name='inpNomRep' maxlength='40' readonly='readonly'/></label></div><div class='large-6 columns'><label for='inpApeRep'>Apellidos del Representante<input type='text' id='inpApeRep' name='inpApeRep' maxlength='40' readonly='readonly'/></label></div></div><div class='row'><div class='large-8 columns'><label for='inpDomRep'>Domicilio del Representante<input type='text' id='inpDomRep' name='inpDomRep' maxlength='80' readonly='readonly'/></label></div><div class='large-4 columns'><label for='inpTelRep'>Teléfono<input type='text' id='inpTelRep' name='inpTelRep' maxlength='9' readonly='readonly'/></label></div></div></fieldset></div></div>";
      $("#cajaRepresentante").append(contenedor);
      $("#inpNIFNIER").select();
    }
    else
      $("#fieldsetRepresentante").closest(".row").remove();
    
  }); //fin evento change combo representante

  /******************************************/
  /* EVENTO CAMBIO EN EL COMBO DE CONDUCTOR */
  /******************************************/  
  $("#contenedorAccionesLicencia").on("change","#esConductor",function(e){
    if ($("#esConductor option:selected").val()==0)
    {
      var contenedor="<hr /><div class='row'><div class='large-3 columns'><input type='text' id='inpNIFNIEC' name='inpNIFNIEC' placeholder='NIF / NIE' maxlength='9' pattern='^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$' title='El campo debe coincidir con el siguiente formato: 00000000A ó X0000000Z'/><span class='txtInfoTabula'>Pulse tabulador para validar</span></div><div class='large-9 columns resumen' id='resumenLecturaConductor'></div></div><div class='row'><div class='large-6 columns'><label for='inpNomÇon' >Nombre del Conductor<input type='text' id='inpNomCon' name='inpNomCon' readonly='readonly' maxlength='40'/></label></div><div class='large-6 columns'><label for='inpApeCon' >Apellidos del Conductor<input type='text' id='inpApeCon' name='inpApeCon'readonly='readonly' maxlength='40'/></label></div></div><div class='row'><div class='large-6 columns'><label for='inpDomCon' >Domicilio del Conductor<input type='text' id='inpDomCon' name='inpDomCon'readonly='readonly' maxlength='80'/></label></div><div class='large-3 columns'><label for='inpTelCon' >Teléfono<input type='text' id='inpTelCon' name='inpTelCon'readonly='readonly' maxlength='9'/></label></div><div class='large-3 columns'><label for='inpFecAlt' >Fecha de Alta<input type='text' id='inpFecAlt' name='inpFecAlt'readonly='readonly' maxlength='10'/></label></div></div>";
      $("#formularioConductor").append(contenedor).removeClass("oculto");
      $("#inpNIFNIEC").select();
      $("#inpFecAlt").datepicker();
    }
    else
      $("#formularioConductor").html("").addClass("oculto");
    
  }); //fin evento change combo representante

  
 
  // SOLO NUMEROS Y LETRAS

  $("#contenedorAccionesLicencia").on("keypress","#inpNIFNIET,#inpNIFNIER,#inpNIFNIEC,#inpMatricula,#inpMatriculaCambio,#inpNumBastidor",function (e) {
      var regex = new RegExp("^[a-zA-Z0-9]+$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
          return true;
      }

      e.preventDefault();
      return false;
  });

  $("#contenedorAccionesGestion").on("keypress","#inpNIFNIET,#inpNIFNIER,#inpNIFNIEC,#inpMatricula,#inpMatriculaCambio,#inpNumBastidor,#inpNumIdentifica,#inpNumIdentificaAct",function (e) {
      var regex = new RegExp("^[a-zA-Z0-9]+$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
          return true;
      }

      e.preventDefault();
      return false;
  });
  //SOLO NUMEROS

  $("#contenedorAccionesLicencia").on("keypress","#inpTelTit,#inpTelRep,#inpTelCon,#inpPlazas",function (e) {
      var regex = new RegExp("^[0-9]+$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
          return true;
      }

      e.preventDefault();
      return false;
  });
  $("#contenedorAccionesGestion").on("keypress","#inpTelTit,#inpTelRep,#inpTelCon,#inpPlazas",function (e) {
      var regex = new RegExp("^[0-9]+$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
          return true;
      }

      e.preventDefault();
      return false;
  });

  /******************************************************************/
  /* ENLACE MAS INFORMACION AL COINCIDIR NIF DE TITULAR Y CONDUCTOR */
  /******************************************************************/
  $("#contenedorAccionesLicencia").on("click", "#btnMasInfo",function(e){
    seccionFormulario("masInfo");
    console.log("Mostrando mas información");
  });

  /***********************************************************************/
  /* EVENTOS ENTRAR Y SALIR EN EL DNI TITULAR, REPRESENTANTE Y CONDUCTOR */
  /***********************************************************************/  
  // $("#contenedorAccionesLicencia").on("focusin","#inpNIFNIET,#inpNIFNIER,#inpNIFNIEC",function(e){
  //   $(".txtInfoTabula").html("Pulsa tabulador para validar");
  // });

  $("#contenedorAccionesLicencia").on("focusout","#inpNIFNIET,#inpNIFNIER,#inpNIFNIEC",function(e){
    // var key = e.charCode || e.keyCode || 0;
    // //console.log(key + "\n");
    if ( $(this).val().length!=0  )
    {
      //console.log($(this).attr('id'));
      if ($(this).attr('id')=='inpNIFNIET')
      {
        var midni=$(this);
        if (validateFields(midni))
        {
          if ( $("#inpNIFNIETActual")=='undefined' || ($("#inpNIFNIETActual")!='undefined' && $("#inpNIFNIETActual").val()!= $("#inpNIFNIET").val()))
          {
            $.ajax({
              url:"./inc/locatePersona.php",
              type: 'POST',
              async: true,
              dataType: 'json',
              beforeSend: function (){
                $("#inpNIFNIET").prop("readonly","readonly");
                $("#resumenLecturaTitular").html("<img src='./../img/ajax-loader.gif' alt='buscando ...'/> Por favor, espere mientras buscamos el titular en la base de datos");
              },
              data:{'dni':$(this).val(),'tipo':'t'},
              success: function(data){
                if (data=="Sindatos")
                {
                  $("#resumenLecturaTitular").html("<i class='fi-check verde' title='disponible'></i>");   
                  $("#inpNomTit, #inpApeTit, #inpDomTit, #inpTelTit").removeAttr("readonly").closest("label").removeClass("elementoInactivo");
                  $("#tieneRepresentante, #esConductor").prop("disabled",false).removeClass("elementoInactivoFondo");
                  $("#inpNomTit").focus();
                  $("#btnGuardarTitularyContinuar,#btnGuardarNuevoTitular").removeClass("disabled");
                  //$(".txtInfoTabula").html("&nbsp;");
                }
                else if (typeof data['licen'] != 'undefined')
                {
                  $("#resumenLecturaTitular").html("<i class='fi-x rojo' title='no disponible'></i> El NIF/NIE ya dispone de una licencia.");
                  $("#inpNIFNIET").prop("readonly",false).select();
                }
                else
                {
                  $("#resumenLecturaTitular").html("<i class='fi-check verde' title='disponible'></i>");
                  $("#btnGuardarTitularyContinuar,#btnGuardarNuevoTitular").removeClass("disabled");
                  $("#inpNomTit").val(decodeEntities(data['titular'].nomtit)).attr("disabled","disabled");
                  $("#inpApeTit").val(decodeEntities(data['titular'].apetit)).attr("disabled","disabled");
                  $("#inpDomTit").val(decodeEntities(data['titular'].domtit)).attr("disabled","disabled");
                  $("#inpTelTit").val(data['titular'].teltit).attr("disabled","disabled");
                  $("#esConductor").prop("disabled",false).removeClass("elementoInactivoFondo");
                  if (data['titular'].idrep==null)
                  {
                    $("#tieneRepresentante option:eq(0)").prop("selected","selected");
                  }
                  else
                  {
                    $("#tieneRepresentante option:eq(1)").prop("selected","selected");                    
                  }
                  //$(".txtInfoTabula").html("&nbsp;");
                  
                  if (typeof data['repre'] != 'undefined')
                  {
                    var contenedor="<div class='row' id='divRepresentante'><div class='large-12 columns'><hr /><fieldset id='fieldsetRepresentante'><legend>Datos del Representante</legend><div class='row'><div class='large-3 columns'><input type='text' id='inpNIFNIER' name='inpNIFNIER' placeholder='NIF / NIE' value='" + data['repre'].dni + "' readonly='readonly' maxlength='9' disabled='disabled'/></div><div class='large-9 columns resumen' id='resumenLecturaRepresentante'></div></div><div class='row'><div class='large-6 columns'><label for='inpNomRep'>Nombre del Representante<input type='text' id='inpNomRep' name='inpNomRep' value='" + data['repre'].nomrep + "' readonly='readonly' maxlength='40'  disabled='disabled'/></label></div><div class='large-6 columns'><label for='inpApeRep'>Apellidos del Representante<input type='text' id='inpApeRep' name='inpApeRep' value='" + data['repre'].aperep + "' readonly='readonly' maxlength='40'  disabled='disabled'/></label></div></div><div class='row'><div class='large-8 columns'><label for='inpDomRep'>Domicilio del Representante<input type='text' id='inpDomRep' name='inpDomRep' value='" + data['repre'].domrep + "' readonly='readonly' maxlength='80'  disabled='disabled'/></label></div><div class='large-4 columns'><label for='inpTelRep'>Teléfono<input type='text' id='inpTelRep' name='inpTelRep' value='" + data['repre'].telrep + "' readonly='readonly' maxlength='9'  disabled='disabled'/></label></div></div></fieldset></div></div>";
                    $("#cajaRepresentante").append(contenedor);
                  }
                  else
                    $("#tieneRepresentante").prop("disabled",false).removeClass("elementoInactivoFondo");


                }

              },
              error: function (x,y){
                alert("error");
              }
            });//ajax            
          }
          else
          {
            $("#resumenLecturaTitular").html("<i class='fi-x rojo' title='no disponible'></i> El NIF/NIE del nuevo titular no puede coincidir con el actual.");            
          }
        }        
        else
          $("#resumenLecturaTitular").html("Incorrecto");
      }
      else if ($(this).attr('id')=='inpNIFNIER')
      {
        if ( $("#inpNIFNIET").val()!=$("#inpNIFNIER").val() )
        {
          var midni=$(this);
          if (validateFields(midni))
          {
            $.ajax({
              url:"./inc/locatePersona.php",
              type: 'POST',
              async: true,
              dataType: 'json',
              beforeSend: function (){
                $("#inpNIFNIER").prop("readonly","readonly");
                $("#resumenLecturaRepresentante").html("<img src='./../img/ajax-loader.gif' alt='buscando ...'/> Por favor, espere mientras buscamos el representante en la base de datos");
              },
              data:{'dni':$(this).val(),'tipo':'r'},
              success: function(data){
                if (data=="Sindatos")
                {
                  $("#resumenLecturaRepresentante").html("<i class='fi-check verde' title='disponible'></i>");   
                  $("#inpNomRep, #inpApeRep, #inpDomRep, #inpTelRep").removeAttr("readonly").closest("label").removeClass("elementoInactivo");
                  $("#inpNomRep").focus();
                  $("#btnGuardarTitularyContinuar").removeClass("disabled");
                  $(".txtInfoTabula").html("&nbsp;");
                }
                else
                {
                  $("#resumenLecturaRepresentante").html("<i class='fi-check verde' title='disponible'></i>");
                  $("#btnGuardarTitularyContinuar").removeClass("disabled");
                  $("#inpNomRep").val(data['repre'].nomrep).attr("disabled","disabled");
                  $("#inpApeRep").val(data['repre'].aperep).attr("disabled","disabled");
                  $("#inpDomRep").val(data['repre'].domrep).attr("disabled","disabled");
                  $("#inpTelRep").val(data['repre'].telrep).attr("disabled","disabled");
                  $("#esConductor").prop("disabled",false).removeClass("elementoInactivoFondo");
                }

              },
              error: function (x,y){
                alert("error");
              }
            });//ajax
          }        
          else
            $("#resumenLecturaRepresentante").html("Incorrecto");
        }
        else
        {
          $("#resumenLecturaRepresentante").html("<i class='fi-x rojo' title='no disponible'></i> El NIF/NIE del Representante no puede ser igual al del titular.");
          $("#inpNIFNIER").select();
        }
      }
      else
      {
        if ( $("#titularLicencia").val().toUpperCase()!=$("#inpNIFNIEC").val().toUpperCase() )
        {
          //console.log("son diferentes. El primero es " +$("#titularLicencia").val() + " y el segundo es: " + $("#inpNIFNIEC").val());
          var midni=$(this);
          if (validateFields(midni))
          {
            $.ajax({
              url:"./inc/locatePersona.php",
              type: 'POST',
              async: true,
              dataType: 'json',
              beforeSend: function (){
                $("#inpNIFNIEC").prop("readonly","readonly");
                $("#resumenLecturaConductor").html("<img src='./../img/ajax-loader.gif' alt='buscando ...'/> Por favor, espere mientras buscamos el conductor en la base de datos");
              },
              data:{'dni':$(this).val(),'tipo':'c'},
              success: function(data){
                console.log(data);
                if (data=="Sindatos")
                {
                  $("#resumenLecturaConductor").html("<i class='fi-check verde' title='disponible'></i>");   
                  $("#inpNomCon, #inpApeCon, #inpDomCon, #inpTelCon").removeAttr("readonly").closest("label").removeClass("elementoInactivo");
                  $("#inpNomCon").focus();
                  $("#btnGuardarConductoryContinuar,#btnGuardarNuevoConductor").removeClass("disabled");
                  $(".txtInfoTabula").html("&nbsp;");
                }
                else if (typeof data['condu'] != 'undefined')
                {
                  if ( data['condu']!="Enuso" )
                  {
                    $("#resumenLecturaConductor").html("<i class='fi-check verde' title='disponible'></i>");
                    $("#btnGuardarConductoryContinuar").removeClass("disabled");
                    $("#inpNomCon").val(decodeEntities(data['condu'].nomcon)).attr("disabled","disabled");
                    $("#inpApeCon").val(decodeEntities(data['condu'].apecon)).attr("disabled","disabled");
                    $("#inpDomCon").val(decodeEntities(data['condu'].domcon)).attr("disabled","disabled");
                    $("#inpTelCon").val(data['condu'].telcon).attr("disabled","disabled");
                    $("#inpFecAlt").focus();
                    //$("#inpDomCon").prop("readonly",false).select();
                    $("#btnGuardarConductoryContinuar,#btnGuardarNuevoConductor").removeClass("disabled");
                  }
                  else
                  {
                    $("#resumenLecturaConductor").html("<i class='fi-x rojo' title='no disponible'></i> El NIF/NIE ya tiene un contrato en activo con otra licencia.");
                    $("#inpNIFNIEC").prop("readonly",false).select();
                  }
                }

              },
              error: function (x,y){
                alert("error");
              }
            });//ajax
          }        
          else
            $("#resumenLecturaConductor").html("Incorrecto");
        }
        else
        {
          console.log("llega por aqui");
          $("#resumenLecturaConductor").html("<i class='fi-x rojo' title='incorrecto' ></i> El NIF/NIE coincide con el del Titular. <span id='btnMasInfo' class='boton link'>Más información</span>");
          $("#inpNIFNIEC").html("");
        }
      }

    }
  }); //fin evento change combo representante



  /******************************************/
  /* EVENTO DOBLE CLICK BUSCAR OTRO TITULAR */
  /******************************************/  
  $("#contenedorAccionesLicencia").on("dblclick","#inpNIFNIET",function(e){
    //$("#barraDeEstado").html("");
    $(this).prop("readonly",false).select();
    $("#inpNomTit,#inpApeTit,#inpDomTit,#inpTelTit").prop("readonly",true).val("");
    $("#resumenLecturaTitular").html("");
    $("#tieneRepresentante").prop("disabled",true).addClass("elementoInactivoFondo");
    $("#esConductor").prop("disabled",true).addClass("elementoInactivoFondo");

    //Cambiar valor de Select//
    $("#tieneRepresentante option[value='0']").prop("selected","selected");
    $("#esConductor option[value='1']").prop("selected","selected");
    $("#btnGuardarTitularyContinuar").addClass("disabled");

    $("#fieldsetRepresentante").closest(".row").remove();
    $("#fieldsetConductor").closest(".row").remove();
    //$("#contenedorTablas").html("");
  });

  /************************************************/
  /* EVENTO DOBLE CLICK BUSCAR OTRO REPRESENTANTE */
  /************************************************/  
  $("#contenedorAccionesLicencia").on("dblclick","#inpNIFNIER",function(e){
    $(this).prop("readonly",false).select();
    $("#inpNomRep,#inpApeRep,#inpDomRep,#inpTelRep").prop("readonly",true).val("");
    $("#resumenLecturaRepresentante").html("");
  });

  /********************************************/
  /* EVENTO DOBLE CLICK BUSCAR OTRO CONDUCTOR */
  /********************************************/  
  $("#contenedorAccionesLicencia").on("dblclick","#inpNIFNIEC",function(e){
    $(this).prop("readonly",false).select();
    $("#inpNomCon,#inpApeCon,#inpDomCon,#inpTelCon").prop("readonly",true).val("");
    $("#resumenLecturaConductor").html("");
    $(".txtInfoTabula").html("Pulse tabulador para validar");
    $("#btnGuardarConductoryContinuar,#btnGuardarNuevoConductor").addClass("disabled");
  });

  /*************************************************/
  /* EVENTO CLIC EN GUARDAR Y CONTINUAR DE TITULAR */
  /*************************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnGuardarTitularyContinuar",function(e){
    var formvalid=true;
    var formularioOK=true;
    $("#inpNomTit,#inpApeTit,#inpDomTit,#inpTelTit,#inpNomRep,#inpApeRep,#inpDomRep,#inpTelRep,#inpNIFNIER").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      console.log("Todos los campos son correctos");
      // $("#btnGuardarTitularyContinuar").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando para continuar ...'/>&nbsp;");
      $("#inpNomTit,#inpApeTit").prop("disabled",false);
      insertarDatosTitularyLicencia($("#form_register_licencia").serializeArray());
    }
    else
      console.log("Datos incompletos.");
  });

  /***************************************************/
  /* EVENTO CLIC EN GUARDAR Y CONTINUAR DE CONDUCTOR */
  /***************************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnGuardarConductoryContinuar",function(e){
    var formvalid=true;
    var formularioOK=true;
    $("#inpNomCon,#inpApeCon,#inpDomCon,#inpTelCon,#inpNIFNIEC,#inpFecAlt").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      console.log("Todos los campos son correctos");
      insertarDatosConductoryLicencia($("#form_register_licencia").serializeArray());
    }
    else
      console.log("Datos incompletos.");
  });

  /****************************************************/
  /* EVENTO PULSAR ENTER EN LA MATRICULA DEL VEHICULO */
  /****************************************************/  
  $("#contenedorAccionesLicencia").on("focusout","#inpMatricula",function(e){
    // var key = e.charCode || e.keyCode || 0;
    if ( $(this).val().length!=0  )
    {
      var mimatricula=$(this);
        if (validateFields(mimatricula))
        {
          $.ajax({
            url:"./inc/locateVehiculo.php",
            type: 'POST',
            async: true,
            dataType: 'json',
            beforeSend: function (){
              $("#inpMatricula").prop("readonly","readonly");
              $("#resumenLecturaVehiculo").html("<img src='./../img/ajax-loader.gif' alt='buscando ...'/> Por favor, espere mientras buscamos el vehículo en la base de datos");
            },
            data:{'mat':$(this).val()},
            success: function(data){
              if (data=="Sindatos")
              {
                $("#resumenLecturaVehiculo").html("<i class='fi-check verde' title='aceptado'></i>");   
                $("#inpNumIdentifica,#inpNumBastidor, #inpPlazas, #inpOtros").prop("disabled",false).removeAttr("readonly").closest("label").removeClass("elementoInactivo");
                $("#inpNumIdentifica,#inpNumBastidor, #inpPlazas, #inpOtros,#inpFechaMatricula,#inpFechaITV").val("");
                $("#sltMarcaV,#sltTipoCombustible,#inpDiscapacita,#inpGPS,#inpImpresora,#inpMampara,#inpPagoTarjeta").prop("disabled",false).removeClass("elementoInactivoFondo");
                $("#sltMarcaV option:eq(0),#sltModeloV").html("<option value='0'>-- Seleccione</option>");
                $("#sltMarcaV option:eq(0),#sltModeloV option:eq(0),#sltTipoCombustible option:eq(0)").attr("selected","selected");
                $("#inpDiscapacita,#inpGPS,#inpImpresora,#inpMampara,#inpPagoTarjeta").prop("checked",false);
                $("#sltMarcaV").focus();
                $("#inpFechaMatricula,#inpFechaITV").prop("disabled",false).datepicker();
                $("#btnGuardarVehiculoyContinuar").removeClass("disabled");
                
              }
              else if (typeof data['licen'] != 'undefined')
              {
                $("#resumenLecturaVehiculo").html("<i class='fi-x rojo' title='no disponible'></i> La matrícula ya dispone de una licencia.");
                $("#inpMatricula").prop("readonly",false).select();
              }
              else if (data[0]=='baja')
              {
                $("#resumenLecturaVehiculo").html("<i class='fi-x rojo' title='no disponible'></i> El vehículo ha sido dado de baja (" + convertirFecha(data[1]) + "). Si no es correcto, contacte con el administrador. (Código de error:999x0)");
                $("#inpMatriculaCambio").prop("readonly",false).select(); 
              }
              else
              {
                $("#btnGuardarNuevoVehiculo").removeClass("disabled");
                $("#resumenLecturaVehiculo").html("<i class='fi-check verde' title='disponible'></i>");
                //$("#inpNumBastidor, #inpPlazas, #inpOtros").removeAttr("readonly").closest("label").removeClass("elementoInactivo");
                $("#inpNumIdentifica,#inpNumIdentificaCambio").removeAttr("readonly").closest("label").removeClass("elementoInactivo");
                //$("#sltMarcaV,#sltTipoCombustible,#inpDiscapacita,#inpGPS,#inpImpresora,#inpDatafono,#inpMampara,#inpPagoTarjeta").prop("disabled",false).removeClass("elementoInactivoFondo");
                $("#inpNumIdentifica,#inpNumIdentificaCambio").focus();
                $("#btnGuardarVehiculoyContinuar").removeClass("disabled");

                $("#sltMarcaV option[value='" + data['marca'] + "']").prop("selected","selected");
                $("#sltModeloV").html("<option value='" + data['vehi'].idmodve + "'>" + data['modelo'] + "</option>");
                $("#sltTipoCombustible option:eq(" + data['vehi'].idcom + ")").prop("selected","selected");

                var stringFechaMat=convertirFecha(data['vehi'].fecmat);
                var stringFechaITV=convertirFecha(data['vehi'].fecitv);

                $("#inpNumBastidor").val(data['vehi'].numbas).attr("disabled","disabled");
                $("#inpFechaMatricula").val(stringFechaMat).attr("disabled","disabled");
                $("#inpFechaITV").val(stringFechaITV).attr("disabled","disabled");
                $("#inpOtros").val(data['vehi'].otros).attr("disabled","disabled");
                $("#inpPlazas").val(data['vehi'].numpla).attr("disabled","disabled");
                if (data['vehi'].adadis==1)
                  $("#inpDiscapacita").prop( "checked", true );
                if (data['vehi'].gps==1)
                  $("#inpGPS").prop( "checked", true );
                if (data['vehi'].imprec==1)
                  $("#inpImpresora").prop( "checked", true );
                if (data['vehi'].pagtar==1)
                  $("#inpPagoTarjeta").prop( "checked", true );
                if (data['vehi'].mampar==1)
                  $("#impmampar").prop( "checked", true );                 
              }
              // $("#sltMarcaT").closest("label").find(".fa-plus-circle").removeClass("desactivado").addClass("link");
            }
          }); //ajax
          console.log("Matricula correcta")
        }
        else
          console.log("Incorrecta");
    }
  });

  /*********************************************/
  /* EVENTO DOBLE CLICK MATRICULA DEL VEHICULO */
  /*********************************************/  
  $("#contenedorAccionesLicencia").on("dblclick","#inpMatricula",function(e){
    console.log("haciendo doble click");
    $("#inpMatricula").prop("readonly",false);
    $("#resumenLecturaVehiculo").html("");
    $("#inpNumIdentifica,#inpNumBastidor, #inpPlazas, #inpOtros").prop("readonly",true).closest("label").addClass("elementoInactivo");
    $("#sltMarcaV,#sltTipoCombustible,#inpDiscapacita,#inpGPS,#inpImpresora,#inpDatafono,#inpMampara,#inpPagoTarjeta").prop("disabled",true).addClass("elementoInactivoFondo");
    $("#btnGuardarVehiculoyContinuar").addClass("disabled");
  
    $("#inpNumIdentifica").prop("readonly",true).closest("label").addClass("elementoInactivo");
  });


  /***********************************************************/
  /* EVENTO CAMBIO EN EL COMBO DE MARCA VEHICULO Y TAXIMETRO */
  /***********************************************************/  
  $("#contenedorAccionesLicencia").on("change","#sltMarcaV,#sltMarcaT",function(e){
    if ( $(this).data("id")=="ve" )
    {
      if ($("#sltMarcaV option:selected").val()!=0)
      {
        $.ajax({
          url:"./inc/loadselect.php",
          type: 'POST',
          async: true,
          dataType: 'json',
          data:{'mar':$(this).val(),'tipo':$(this).data("id")},
          success: function(data){
            if (data=="Sindatos")
            {
              $("#sltModeloV").html("<option value='0'>Sin valores</option>");
              $("#resumenLecturaVehiculo").html("<i class='fi-x rojo' title='no disponible'></i>&nbsp;No existen modelos para la marca actual. Ir a <strong>Gestión->Marcas/Modelos</strong>");
              $("#sltModeloV").prop("disabled",true).addClass("elementoInactivoFondo");

            }
            else
            {
              var contenido="<option value='0'>-- Seleccione</option>";
              $.each(data['move'],function(clave,valor){
                contenido += "<option value='" + data['move'][clave].id + "'>" + data['move'][clave].modelo + "</option>";
              });//each
              $("#sltModeloV").html(contenido);
              $("#sltModeloV").prop("disabled",false).removeClass("elementoInactivoFondo");
              $("#resumenLecturaVehiculo").html("");
              $("#sltModeloV").focus();
            }
            console.log(data);
          }
        });//ajax        
      }
      else
      {
        $("#sltModeloV").html("<option value='0'>Sin valores</option>");
        $("#sltModeloV").prop("disabled",true).addClass("elementoInactivoFondo");
      }
    }
    else
      if ($("#sltMarcaT option:selected").val()!=0)
      {
        $.ajax({
          url:"./inc/loadselect.php",
          type: 'POST',
          async: true,
          dataType: 'json',
          data:{'mar':$(this).val(),'tipo':$(this).data("id")},
          success: function(data){
            if (data=="Sindatos")
            {
              $("#sltModeloT").html("<option value='0'>Sin valores</option>");
              $("#resumenLecturaVehiculo").html("<i class='fi-x rojo' title='no disponible'></i>&nbsp;No existen modelos para la marca actual. Ir a <strong>Gestión->Taxímetros</strong>");
              $("#sltModeloT").prop("disabled",true).addClass("elementoInactivoFondo");

            }
            else
            {
              var contenido="<option value='0'>-- Seleccione</option>";
              $.each(data['mota'],function(clave,valor){
                contenido += "<option value='" + data['mota'][clave].id + "'>" + data['mota'][clave].modelo + "</option>";
              });//each
              $("#sltModeloT").html(contenido);
              $("#sltModeloT").prop("disabled",false).removeClass("elementoInactivoFondo");
              $("#resumenLecturaVehiculo").html("");
              $("#sltModeloT").focus();
            }
            $("#sltModeloT").closest("label").find(".fa-plus-circle").removeClass("desactivado").addClass("link");
            console.log(data);
          }
        });//ajax
      }
      else
      {
        $("#btnInsertaModeloT").addClass("desactivado").removeClass("link");
        $("#sltModeloT").html("<option value='0'>Sin valores</option>");
        $("#sltModeloT").prop("disabled",true).addClass("elementoInactivoFondo");
      }    
  }); //fin evento change combo marca taximetro y vehiculo

  /*************************************************/
  /* EVENTO CLIC EN GUARDAR Y CONTINUAR DE VEHICULO */
  /*************************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnGuardarVehiculoyContinuar",function(e){
    var formvalid=true;
    var formularioOK=true;
    $("#sltMarcaV,#sltModeloV,#inpNumBastidor,#inpFechaMatricula,#inpFechaITV,#sltTipoCombustible,#inpPlazas,#sltMarcaT,#sltModeloT,#inpNumIdentifica,#inpRevisionTaximetro,#inpFechaValidezTaximetro,#inpMatricula").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      var fm, fi, fecMat, fecItv;
      fm=($("#inpFechaMatricula").val()!="")?$("#inpFechaMatricula").val().split("-"):0;
      fi=($("#inpFechaITV").val()!="")?$("#inpFechaITV").val().split("-"):1;
            
      if (fm!=0)
      {
        fecMat=new Date(fm[2],fm[1]-1,fm[0]);        
      }
      else
      {
        fecMat=fm;
      }
      if (fi!=1)
      {
        fecItv=new Date(fi[2],fi[1]-1,fi[0]);
      }
      else
      {
        fecItv=fi;
      }
      
      if (fecItv>fecMat || fecItv==1 || fecMat==0)
      {
        $("#sltMarcaV,#sltModeloV,#inpNumBastidor,#inpFechaMatricula,#inpFechaITV,#sltTipoCombustible,#inpPlazas,#sltMarcaT,#sltModeloT,#inpNumIdentifica,#inpRevisionTaximetro,#inpFechaValidezTaximetro,#inpMatricula,#inpDiscapacita,#inpGPS,#inpImpresora,#inpPagoTarjeta,#inpMampara").prop("disabled",false);
        $("#inpFechaMatricula,#inpFechaITV").attr('style','');
        insertarDatosVehiculoyActualizaLicencia($("#form_register_licencia").serializeArray());        
      }
      else
      {
        $("#inpFechaMatricula,#inpFechaITV").css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
      }
    }
    else
      console.log("Datos incompletos.");
  });

  /***************************************************************/
  /* EVENTO PERDER FOCO EN CAMPO NUMERO IDENTIFICACION TAXIMETRO */
  /***************************************************************/  
  $("#contenedorAccionesLicencia").on("focusout","#inpNumIdentifica",function(e){
    var minumero=$(this);
    if (validateFields(minumero))
    {
      $.ajax({
        url:"./inc/locateTaximetro.php",
        type: 'POST',
        async: true,
        dataType: 'json',
        beforeSend: function (){
          $("#inpNumIdentifica").prop("readonly","readonly");
          $("#resumenLecturaTaximetro").html("<img src='./../img/ajax-loader.gif' alt='buscando ...'/> Por favor, espere mientras buscamos el taxímetro en la base de datos");
        },
        data:{'numide':$(this).val()},
        success: function(data){
          if (data=="Sindatos")
          {
            $("#resumenLecturaTaximetro").html("<i class='fi-check verde' title='aceptado'></i>");   
            $("#inpNumIdentifica, #inpTaller").removeAttr("readonly").closest("label").removeClass("elementoInactivo");
            $("#sltMarcaT").prop("disabled",false).removeClass("elementoInactivoFondo");
            $("#sltMarcaT").focus();
            $("#inpRevisionTaximetro,#inpFechaValidezTaximetro").datepicker();
            $("#sltMarcaT").closest("label").find(".fa-plus-circle").removeClass("desactivado").addClass("link");
          }
          else if (typeof data['vehi'] != 'undefined')
          {
            $("#resumenLecturaTaximetro").html("<i class='fi-x rojo' title='no disponible'></i> El taxímetro ya pertenece a otro vehículo. Asegúrese de que es correcto o diríjase a <strong>Gestión>Taxímetros</strong>.");
            $("#inpNumIdentifica").prop("readonly",false).select();
          }
          else
          {
            $("#resumenLecturaTaximetro").html("<i class='fi-check verde' title='disponible'></i>");
            $("#btnGuardarVehiculoyContinuar").removeClass("disabled");
            $("#inpTaller").removeAttr("readonly").closest("label").removeClass("elementoInactivo");
            $("#sltMarcaT option[value='" + data['marca'] + "']").prop("selected","selected");
            $("#sltModeloT").html("<option value='" + data['taxim'].idmodta + "'>" + data['modelo'] + "</option>");
            $("#inpRevisionTaximetro,#inpFechaValidezTaximetro").datepicker();
            $("#sltMarcaT").prop("disabled",true).addClass("elementoInactivoFondo");
            //$("#sltMarcaT").closest("label").find(".fa-plus-circle").removeClass("desactivado").addClass("link");  
            $("#inpRevisionTaximetro").focus();                
          }
        }
      }); //ajax
      console.log("Matricula correcta")
    }
    else
      console.log("Incorrecta");
  });

  /*************************************/
  /* EVENTO CAMBIO EN EL COMBO EMISORA */
  /*************************************/  
  $("#contenedorAccionesLicencia").on("change","#sltEmisora",function(e){
    if ($(this).val()==0)
    {
      $("#inpNombreEmisora").val("");
      $("#inpTelefono1").val("");
      $("#inpTelefono2").val("");
      $("#inpFax").val("");
      //$("#btnGuardarEmisorayFinalizar").addClass("disabled");
    }
    else
    {
      $.ajax({
        url:"./inc/loadEmisora.php",
        type: 'POST',
        async: true,
        dataType: 'json',
        data:{'emi':$(this).val()},
        success: function(data){
          $("#inpNombreEmisora").val(data['emi'][0].nomemi);
          $("#inpTelefono1").val(data['emi'][0].telef1);
          $("#inpTelefono2").val(data['emi'][0].telef2);
          $("#inpFax").val(data['emi'][0].fax);
          $("#btnGuardarEmisorayFinalizar").removeClass("disabled");
          console.log(data);
        }
      });//ajax      
    }
    
  }); //fin evento change combo emisora

  /**********************************************/
  /* EVENTO CLIC EN GUARDAR EMISORA Y FINALIZAR */
  /**********************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnGuardarEmisorayFinalizar",function(e){
    insertarEmisorayFin($("#sltEmisora").val(),$("input[name='inpLicencia']").val());
  });

  /*****************************************************/
  /* EVENTO CLIC EN INSERTAR MARCA O MODELO DE TAXIMETRO */
  /*****************************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnInsertaMarcaT,#btnInsertaModeloT,#btnInsertaEmisora",function(e){
    if ( $(this).attr('id')=="btnInsertaMarcaT" )
    {
      if (! $(this).hasClass('desactivado'))
      {
        seccionFormulario('marcaT');
      }
    }
    else if ( $(this).attr('id')=="btnInsertaModeloT" )
    {
      if (! $(this).hasClass('desactivado'))
      {
        seccionFormulario('modeloT',$("#sltMarcaT option:selected").text(),$("#sltMarcaT option:selected").val());
      }
    }
    else if ( $(this).attr('id')=="btnInsertaEmisora" )
    {
      if (! $(this).hasClass('desactivado'))
      {
        seccionFormulario('emisora');
      }
    }
  });

  /******************************************************/
  /* EVENTO CLIC EN GUARDAR MARCA O MODELO DE TAXIMETRO */
  /******************************************************/  
  $("#mensajeModal").on("click","#btnGuardarNuevaMarcaT,#btnGuardarNuevoModeloT",function(e){
    if ( $(this).attr('id')=="btnGuardarNuevaMarcaT" )
    {
      insertarElemento( $('#form_register_auxiliar').serializeArray());
    }
    else if ( $(this).attr('id')=="btnGuardarNuevoModeloT" )
    {
      insertarElemento( $('#form_register_auxiliar').serializeArray());
    }
  });

  /********************************************************/
  /* EVENTO CLIC EN CONTINUAR DESPUES DE AÑADIDA LICENCIA */
  /********************************************************/  
  $("#contenedorFilaAcciones").on("click","#continuaryReiniciar",function(e){
    console.log("llegados a este punto");
    $("#contenedorAccionesLicencia,#contenedorAccionesVehiculo,#contenedorAccionesGestion").html("").addClass("oculto");
    $("#info").removeClass("oculto");
    loadPortada();
  });

  /**********************************/
  /* EVENTO CLIC EN GUARDAR EMISORA */
  /**********************************/  
  $("#mensajeModal").on("click","#btnGuardarEmisora",function(e){
    console.log("agregando emisora...");
    var formvalid=true;
    var formularioOK=true;
    $("#inpEmisora,#inpTel1,#inpTel2,#inpFax").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      console.log("estamos agregando emisora");
      insertarEmisora($("#form_register_emisora").serializeArray());
    }
    else
    {
      console.log("Datos incompletos o erróneos.");
      $("#barraDeEstado").html("Datos incompletos o erróneos.");      
    }
  });

  /********************************************/
  /* EVENTO CLIC EN VER EXPEDIENTE DE PORTADA */
  /********************************************/  
  $("#info").on("click","a[id^='verExpediente_']",function(e){
    console.log("mostrando ventana emergente...");
    var licencia= $(this).attr("data-id");
    seccionFormularioVerExpediente("verExpediente",licencia);
    // seccionFormulario("verExpediente",licencia);
  });

  /*******************/
  /* BOTONES DE MENU */
  /*******************/
  $(".masterhead").on("click", "#btn-notificar,#btn-notificar2",function(e){
    if ($(this).attr("id")=="btn-notificar")
    {
      seccionFormulario("notifica");
    }
  });

  $("#panelAcciones").on("click", "#btn-altaLicencia",function(e){
    console.log("Agregando Licencia...");
    $("#info").addClass("oculto");
    activarMenus(1);
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionLicenciaAlta();
  });
  $("#panelAcciones").on("click", "#btn-cambiotitular",function(e){
    console.log("Cambio de Titular / Transmisiones...");
    activarMenus(1);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionLicenciaCambioTitular();
  });
  $("#panelAcciones").on("click", "#btn-cambioconductor",function(e){
    console.log("Cambio de Conductor...");
    activarMenus(1);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionLicenciaCambioConductor();
  });
  $("#panelAcciones").on("click", "#btn-cambiovehiculo",function(e){
    activarMenus(1);
    console.log("Cambio de Vehiculo...");
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionLicenciaCambioVehiculo();
  });
  $("#panelAcciones").on("click", "#btn-cambioemisora",function(e){
    activarMenus(1);
    console.log("Cambio de Emisora...");
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionLicenciaCambioEmisora();
  });
  $("#panelAcciones").on("click", "#btn-autoriza",function(e){
    console.log("Autorizaciones ...");
    activarMenus(1);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionLicenciaAutorizaciones();
  });
  $("#panelAcciones").on("click", "#btn-subvencion",function(e){
    console.log("Subvenciones ...");
    activarMenus(1);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionLicenciaSubvenciones();
  });  
  $("#panelAcciones").on("click", "#btn-expediente",function(e){
    console.log("Expedientes ...");
    activarMenus(1);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionLicenciaExpedientes();
  });
  $("#panelAcciones").on("click", "#btn-historico",function(e){
    console.log("Historico de Transmisiones ...");
    activarMenus(1);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionLicenciaHistorico();
  });

  $("#panelAcciones").on("click", "#btn-marcaModelo",function(e){
    console.log("Gestionando Marcas/Modelos...");
    activarMenus(3);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionGestionMarcaModelo();
  });
  $("#panelAcciones").on("click", "#btn-emisora",function(e){
    console.log("Gestionando Emisoras...");
    activarMenus(3);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionGestionEmisoras();
  });
  $("#panelAcciones").on("click", "#btn-titular",function(e){
    console.log("Gestionando Titulares...");
    activarMenus(3);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionGestionTitulares();
  });
  $("#panelAcciones").on("click", "#btn-vehiculo",function(e){
    console.log("Gestionando Vehiculos...");
    activarMenus(3);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionGestionVehiculos();
  });
  $("#panelAcciones").on("click", "#btn-taximetro",function(e){
    console.log("Gestionando Taximetros...");
    activarMenus(3);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionGestionTaximetros();
  });
  $("#panelAcciones").on("click", "#btn-conductor",function(e){
    console.log("Gestionando Conductores...");
    activarMenus(3);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionGestionConductores();
  });
  $("#panelAcciones").on("click", "#btn-seguros",function(e){
    console.log("Vehiculando Seguros...");
    activarMenus(2);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionVehiculoSeguros();
  }); 
  $("#panelAcciones").on("click", "#btn-revision",function(e){
    console.log("Vehiculando Revisiones...");
    activarMenus(2);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionVehiculoRevisiones();
  }); 
  $("#panelAcciones").on("click", "#btn-inspeccion",function(e){
    console.log("Vehiculando Inspecciones...");
    activarMenus(2);
    $("#info").addClass("oculto");
    $(this).addClass("desactivado").prop({'disabled':true});
    seccionVehiculoInspecciones();
  });

  /***************************/
  /* ELEMENTOS PADRE DE MENU */
  /***************************/
  $("#panelAcciones").on("click", "#mnLicencia,#mnVehiculo,#mnGestion",function(e){
    $("#cajonMenu ul").not($(this).parent().next().next()).slideUp("slow");
    $(this).parent().next().next().slideDown( "slow" );
  });

  $("#panelAcciones").on("click", "#mnPortada",function(e){
    activarMenus();
    if ( $(this).attr("data-portada")==1 )
    {
      loadPortada();
      $("#info").removeClass("oculto");
      $("#contenedorAccionesVehiculo, #contenedorAccionesGestion,#contenedorAccionesLicencia").addClass("oculto").html("");
      $(this).removeAttr("data-portada");
    }
  });
  

/*
    $("#panelAcciones").on("click", "#btn-buscarUsuario",function(e){
      console.log("Buscando Usuario...");
      $("#info").addClass("oculto");
      $(this).addClass("desactivado").prop({'disabled':true});
      seccionBuscaUsuario();      
      // $("#btn-agregarUsuario").removeClass("desactivado").prop({'disabled':false});

      // $("#contenedorAccionesUsuario").removeClass("oculto").html("Aqui va el contenido de buscar");
    });

    $("#panelAcciones").on("click", "#btn-trasladarUsuario",function(e){
      console.log("Trasladando Usuario...");
    });

    /*************************************************/
    /* EVENTOS DE ALTA DE USUARIO                    */
    /*************************************************/
    //EVENTO QUE COMPRUEBA LA EXISTENCIA DE DUPLICADOS DE NIF/NIE EN BD DURANTE EL ALTA
/*    $("#contenedorAccionesUsuario").on("focusout", "#inp_dni",function(e){
      //console.log("saliendo del dni");
      valor=$(this).val();
      if (valor.length>0){
        var patronDNI_NIE= /^[0-9]{8}[A-Z|a-z]{1}$|^[X-Z|x-z]{1}[0-9]{7}[A-Z|a-z]{1}$/;
        if (!patronDNI_NIE.test(valor)){
          $("#cajaAviso").html("<label class='error'><br/><img src='./../img/ko.png' alt='Incorrecto'/> Formato no aceptado</label>");
          $("#inp_dni").css({'background-color':'rgba(255,157,157,0.3)','border':'1px solid #ff9090'});
        }
        else{
          $.post("./inc/locateduplicity.php",{'iden':$(this).val()})
          .done(function(data){
            //console.log(data);
            if (data==1){
              $("#cajaAviso").html("<label class='error'><br/><img src='./../img/ko.png' alt='Incorrecto'/> DNI /NIE ya existe</label>");
              $("#inp_dni").css({'background-color':'rgba(255,157,157,0.3)','border':'1px solid #ff9090'});
              exist=1;
            }
            else{
              $("#cajaAviso").html("");
              $("#inp_dni").attr('style','');
              exist=0;
            }
          });          
        }
      }
      else{
        $("#cajaAviso").html("");
      }
    });
    //FIN EVENTO QUE COMPRUEBA LA EXISTENCIA DE DUPLICADOS DE NIF/NIE EN BD DURANTE EL ALTA
    

    //BOTON GUARDAR FORMULARIO DE ALTA
    $("#contenedorAccionesUsuario").on("click", "#btn-agregar-nuevo-usuario",function(e){
      console.log("Intento de guardar...");
        //alert("ff");
      var formvalid=true;
      var formularioOK=true;

      $("#form_register_usuario input[type=text], #form_register_usuario input[type=tel],#form_register_usuario input[type=email],#form_register_usuario textarea, #form_register_usuario select").each(function(i){
        formvalid=validateFields($(this));
        //alert(formvalid);
        if (!formvalid){
          formularioOK=false;
         // e.preventDefault();
        }
      });//each
      if (formularioOK && !exist){
        insertUser( $('#form_register_usuario').serializeArray(), $("#inp_dni").val());
      }
      //e.preventDefault();
    });
    //FIN BOTON GUARDAR FORMULARIO DE ALTA

    /*************************************************/
    /* EVENTOS VER, BUSCAR Y EDICION DE USUARIOS             */
    /*************************************************/
    // VER/CARGAR FICHA USUARIO DESPUES DE AÑADIR
/*    $("#contenedorAccionesUsuario").on("click", "span[id^='verUsuario_'],i[data-name^='verUsuario_']",function(e){
      //console.log("llega");
      var id=$(this).data("id");
      var source=$(this).data("origen");
      // $("#contenedorUsuarioIndividual").removeClass("oculto").html("Editando usuario " + id);
      if (source=='insert')
        $("#contenedorAccionesUsuario contenedorAltaUsuario").remove();

      $("#contenedorAccionesUsuario").addClass("oculto");
      verResumenUsuarioIndividual(id,source);
    });
    // FIN VER/CARGAR FICHA USUARIO DESPUES DE AÑADIR
    // BOTON BUSCAR USUARIO
    $("#contenedorFilaAcciones").on("click","#btn-locateUser",function(e){
      if ($("#txtBuscar").val().length>0){
        var ref = $("#sltCriterio option:selected").val();
        var txt = $("#txtBuscar").val();
        buscarUsuario(ref,txt);
      }
    });
    // FIN BOTON BUSCAR USUARIO

    // PULSAR TECLA CUADRO DE TEXTO BUSCAR
    $('#contenedorAccionesUsuario').on("keyup", "input[id='txtBuscar']", function(e){
      if ($("#txtBuscar").val().length>0){
        //console.log($("#txtBuscar").val().length);
        
        if ($("#txtBuscar").val().length>=1){
          console.log($("#btn-locateUser").attr("class"));
          $("#btn-locateUser").removeClass("disabled");
        }
        if (e.keyCode == '13'){
          var ref = $("#sltCriterio option:selected").val();
          var txt = $("#txtBuscar").val();
          buscarUsuario(ref,txt);
        }
      }
      else{
        $("#btn-locateUser").addClass("disabled");
      }
    });
     /* AL PEGAR DEL CORTAPAPELES */
/*    $('#contenedorAccionesUsuario').on("paste", "input[id='txtBuscar']", function(e){
      $("#btn-locateUser").removeClass("disabled");
    });
    /*****************************/
    // FIN PULSAR TECLA CUADRO DE TEXTO BUSCAR

    // BOTON VOLVER A FORMULARIO BUSQUEDA USUARIO
/*    $("#contenedorAccionesUsuario").on("click", "a[id='btn-volverBuscar']",function(e){
      $("#resultadoBusqueda").html("").addClass("oculto");
      $("#formBuscar").removeClass("oculto");
    });
    // FIN BOTON VOLVER A FORMULARIO BUSQUEDA USUARIO

    // BOTON VOLVER A LISTA USUARIOS BUSCADOS
    $("#contenedorUsuarioIndividual").on("click", "a[id='btn-volverListaUsuario']",function(e){
      $("#contenedorUsuarioIndividual").html("").addClass("oculto");
      $("#contenedorAccionesUsuario").removeClass("oculto");
      $("#resultadoBusqueda").removeClass("oculto");
    });
    // FIN BOTON VOLVER A LISTA USUARIOS BUSCADOS

    // BOTON VER/OCULTAR INFORMACION SECUNDARIA USUARIO
    $("#contenedorUsuarioIndividual").on("click", "a[id='btn-verOcultarInfoUser']",function(e){
      //console.log("llegando");
      $("#subcontenInfoUser").slideToggle("slow",function(){
        if ($('#subcontenInfoUser').is(':hidden'))
          $("#btn-verOcultarInfoUser").attr("title","Ver más info");
        else
          $("#btn-verOcultarInfoUser").attr("title","Ocultar");

      });
    });
    // FIN BOTON VER/OCULTAR INFORMACION SECUNDARIA USUARIO
    
    
    // CUADRO DE TEXTO BUSCAR USUARIO
/*    $("#contenedorAlumno").on("keyup","#txtBuscar", function(e){
      if ( $(this).val().length>0 )
        $("#btn-buscarAlumno").removeClass("disabled");
      else
        $("#btn-buscarAlumno").addClass("disabled");
    });
    // FIN CUADRO DE TEXTO BUSCAR USUARIO  
*/
    /*************************************************/
    /* EVENTOS DE FORMULARIO DE CONTACTO             */
    /*************************************************/
    $("#mensajeModal").on("click","#btn-enviar",function(e){
      var estado=true;
      /* COMPROBAR QUE EL CAMPO ASUNTO NO ESTE VACIO ANTES DEL ENVIO */
      if($("#txtAsunto").val().length == 0 ){
          $("#txtAsunto").css({'background-color':'rgba(255,157,157,0.3)','border':'1px solid #ff9090'});
      estado=false;
        }
        else
          $("#txtAsunto").attr('style','');

      /* COMPROBAR QUE EL CUERPO DEL MENSJAE NO ESTE VACIO ANTES DEL ENVIO */

      if($("#txtMsj").val().length == 0 ){
          $("#txtMsj").css({'background-color':'rgba(255,157,157,0.3)','border':'1px solid #ff9090'});
      estado=false;
        }
        else
          $("#txtMsj").attr('style','');

        if (estado)
          enviarEmail( $("#sltTipo option:selected").val(), $("#txtAsunto").val(), $("#txtMsj").val() );
    });

    $("#mensajeModal").on("keypress","#txtMsj",function(e){
      var limite=$(e.target).attr("maxlength");
    var elem=$("#cuentaCaracteres");
    $(this).limiter(limite, elem);
    });
    $('#mensajeModal').on("click","#btnConfirmarEmergente", function(e){
      $("#cajaTaximetro").find("fieldset").removeClass("elementoInactivoFondo");
      console.log("confirmado");
      $("#inpNumIdentifica").val("").prop("readonly",false).prop("disabled",false);
      $("#sltMarcaT").prop("disabled",false).removeClass("elementoInactivoFondo");
      $("#sltMarcaT option[value='0']").prop("selected","selected");
      $("#sltModeloT").prop("disabled",false).removeClass("elementoInactivoFondo");
      $("#sltModeloT").html("<option value='0' selected='selected'>-- Seleccione</option>");
      $("#inpRevisionTaximetro,#inpFechaValidezTaximetro").prop("disabled",false).datepicker().val("");
      $("#inpTaller").val("").prop("readonly",false).prop("disabled",false);
      desvincularTaximetro($("#inpMatricula").val());
    });
}); //document ready