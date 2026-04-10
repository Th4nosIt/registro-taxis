$(document).ready(function(){

  /*******************************************************/
  /* EVENTO SELECCIONADOR DE LICENCIAS CAMBIO DE TITULAR */
  /*******************************************************/
  $("#contenedorAccionesLicencia").on("change","#sltLicenciaCambioTitular",function(e){
    var lic=$(this).val();
    if (lic!=0)
    {
      $.ajax({
        url:"./inc/testlicense.php",
        type: 'POST',
        async: true,
        dataType: 'text',
        beforeSend: function (){
          $("#sltLicenciaCambioTitular").prop("disabled",true).addClass("desactivado");
          $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><img src='./../img/ajax-loader.gif' lt='buscando ...'/>&nbsp;</label>");
        },
        data:{'lic':lic},
        success: function(res){
          $("#sltLicenciaCambioTitular").prop("disabled",false).removeClass("desactivado");          
          //$("#sltLicencia").prop("disabled",false).removeClass("desactivado");
          if (res)
            $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><span><span class='resumen' id='textoTestLicense'>&nbsp;La licencia tiene asignado un titular. Pulse <span class='boton link' id='btn-continuarConTransmision' data-id='" + lic + "'>aquí</span> para continuar con la transmisión.</span></label>");
          else
            $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><span class='resumen' id='textoTestLicense'>&nbsp;La licencia no tiene titular. Seleccione otra licencia o consulte con el administrador.</span></label>");
        },
        error: function (x,y){
          alert("error");
        }
      });//ajax      
    }
    else
    {
      $("#resumenLecturaLicencia").html("");
    }
  }); //fin evento acciones seleccionador licencia

  /***********************************************************************/
  /* EVENTO BOTON CONTINUAR CON TRANSMISION (CARGA DE DATOS DEL TITULAR) */
  /***********************************************************************/  
  $("#contenedorAccionesLicencia").on("click", "#btn-continuarConTransmision",function(e){
    console.log("Segundo Paso ... carga Titular");
    $("#sltLicenciaCambioTitular").prop("disabled",true).addClass("desactivado");
    $("#textoTestLicense").html("Efectuando la transmisión de la licencia");
    $("#selectorLicencia input[name='inpLicencia']").val( $("#sltLicenciaCambioTitular option:selected").val() );
    $("#rayita").removeClass("oculto");
    subSeccionCargaTitularActual($(this).attr("data-id"));
  });

  /****************************************/
  /* EVENTO CLIC EN GUARDAR NUEVO TITULAR */
  /****************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnGuardarNuevoTitular",function(e){
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
      actualizarDatosTitularyLicencia($("#form_register_titular").serializeArray());
    }
    else
      console.log("Datos incompletos.");
  });

  /*********************************************************/
  /* EVENTO SELECCIONADOR DE LICENCIAS CAMBIO DE CONDUCTOR */
  /*********************************************************/
  $("#contenedorAccionesLicencia").on("change","#sltLicenciaCambioConductor",function(e){
    var lic=$(this).val();
    if (lic!=0)
    {
      $.ajax({
        url:"./inc/testlicense.php",
        type: 'POST',
        async: true,
        dataType: 'text',
        beforeSend: function (){
          $("#sltLicenciaCambioConductor").prop("disabled",true).addClass("desactivado");
          $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><img src='./../img/ajax-loader.gif' lt='buscando ...'/>&nbsp;</label>");
        },
        data:{'lic':lic},
        success: function(res){
          $("#sltLicenciaCambioConductor").prop("disabled",false).removeClass("desactivado");          
          //$("#sltLicencia").prop("disabled",false).removeClass("desactivado");
          if (res)
            $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><span><span class='resumen' id='textoTestLicense'>&nbsp; Pulse <span class='boton link' id='btn-continuarConCambio' data-id='" + lic + "'>aquí</span> para continuar con el cambio/renovación.</span></label>");
          else
            $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><span class='resumen' id='textoTestLicense'>&nbsp;Existe un problema. Seleccione otra licencia o consulte con el administrador.</span></label>");
        },
        error: function (x,y){
          alert("error");
        }
      });//ajax      
    }
    else
    {
      $("#resumenLecturaLicencia").html("");
    }
  }); //fin evento acciones seleccionador licencia

  /********************************************************************/
  /* EVENTO BOTON CONTINUAR CON CAMBIO (CARGA DE DATOS DEL CONDUCTOR) */
  /********************************************************************/  
  $("#contenedorAccionesLicencia").on("click", "#btn-continuarConCambio",function(e){
    console.log("Segundo Paso ... carga Conductor");
    $("#sltLicenciaCambioConductor").prop("disabled",true).addClass("desactivado");
    $("#textoTestLicense").html("Efectuando el cambio/renovación del titular");
    //$("#selectorLicencia").append("<input type='hidden' name='inpLicencia' value='" + $("#sltLicenciaCambioConductor option:selected").val() + "' />");
    $("#selectorLicencia input[name='inpLicencia']").val($("#sltLicenciaCambioConductor option:selected").val());
    $("#rayita").removeClass("oculto");
    subSeccionCargaConductorActual($(this).attr("data-id"));
  });

  /******************************************/
  /* EVENTO CLIC EN GUARDAR NUEVO CONDUCTOR */
  /******************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnGuardarNuevoConductor",function(e){
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
      // $("#btnGuardarTitularyContinuar").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando para continuar ...'/>&nbsp;");
      actualizarDatosConductor($("#form_register_conductor").serializeArray());
    }
    else
      console.log("Datos incompletos.");
  });


  /**********************************************************/
  /* EVENTO CLIC EN GUARDAR IMPORTE Y CONTINUAR CON TITULAR */
  /**********************************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnGuardarImporteContinuar",function(e){
    var formvalid=true;
    var formularioOK=true;
    $("#inpImporte,#inpFechaTraspaso,#inpObserva").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      console.log("Todos los campos son correctos");
      // $("#btnGuardarTitularyContinuar").prepend("<img src='./../img/ajax-loader-blue-3.gif' alt='guardando para continuar ...'/>&nbsp;");
      actualizarHistorial($("#form_register_titular").serializeArray());
    }
    else
      console.log("Datos incompletos.");
  });

  /**********************************/
  /* EVENTO CLIC EN CANCELAR CAMBIO */
  /**********************************/  
  $("#contenedorAccionesLicencia").on("click","#btnCancelarCambio",function(e){
    $("#sltLicenciaCambioTitular").removeClass("desactivado").prop("disabled",false);
    $("#subSeccionTitular,#subSeccionNuevoTitular").html("");
    $("#sltLicenciaCambioTitular").prop("selectedIndex", 0);
  });
  $("#contenedorAccionesLicencia").on("click","#btnCancelarCambioC",function(e){
    $("#sltLicenciaCambioConductor").removeClass("desactivado").prop("disabled",false);
    $("#subSeccionConductor,#subSeccionNuevoConductor").html("");
    $("#sltLicenciaCambioConductor").prop("selectedIndex", 0);
  });

});//ready