$(document).ready(function(){

  /*******************************************************/
  /* EVENTO SELECCIONADOR DE LICENCIAS CAMBIO DE TITULAR */
  /*******************************************************/
  $("#contenedorAccionesLicencia").on("change","#sltLicenciaExpedientes",function(e){
    if ($("option:selected", this).val()!=0)
    {
      $("#resumenLecturaLicencia").html("");
      cargarExpedientes($("option:selected", this).val());      
      $(this).attr("style","");
      $("#rayita").removeClass("oculto");
    }
    else
    {
      $(this).css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
      $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><i class='fi-x rojo'></i>&nbsp;Debe elegir una licencia correcta.</label>");
      $("#subSeccionExpediente").html("");
      $("#rayita").addClass("oculto");
    }
  }); //fin evento acciones seleccionador licencia

  /*************************************/
  /* EVENTO CLIC EN AGREGAR EXPEDIENTE */
  /*************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnAgregarExpediente",function(e){
    console.log("mostrando ventana emergente...");
    var licencia= $(this).attr("data-id");
    seccionFormulario("nuevoexpediente",licencia);
  });


  /*************************************/
  /* EVENTO CLIC EN GUARDAR EXPEDIENTE */
  /*************************************/  
  $("#mensajeModal").on("click","#btnGuardarExpediente",function(e){
    console.log("agregando expediente a la licencia...");
    var formvalid=true;
    var formularioOK=true;
    $("#inpDescripcion,#inpFechaExpediente,#sltTipoExpediente").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      insertarExpediente($("#form_register_expediente").serializeArray());
    }
    else
    {
      console.log("Datos incompletos o erróneos.");
      $("#barraDeEstado").html("Datos incompletos o erróneos.");      
    }
  });

  /***************************************************/
  /* EVENTO CLIC EN RADIO BUTTON ELIMINAR EXPEDIENTE */
  /***************************************************/  
  $('#contenedorAccionesLicencia').on("click", "input[id^='deleteexp_']", function(e){
    //console.log("borrando " + $(this).data("id") + " y está " + $(this).prop("checked"));
    var miData=$(this).data("id");
    if ($(this).prop("checked"))
    {
      $("#btnEliminarExpediente").removeClass("disabled");
      $("#btnEliminarExpediente").attr("data-eli",miData);
      $("input[name='deleteexp']").prop("checked",false);
      $(this).prop("checked",true);
    }
    else
    {
      $("#btnEliminarExpediente").addClass("disabled").removeAttr("data-eli");
    }

  });

  /*************************************/
  /* EVENTO CLIC EN ELIMINAR EXPEDIENTE */
  /*************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnEliminarExpediente",function(e){
    var ident= $(this).attr("data-eli");
    console.log("Eliminar expediente..." + ident);
    eliminarExpediente(ident); 
  });  

  /****************************************/
  /* HISTORICO TRANSMISIONES DE LICENCIAS */
  /****************************************/
  /***************************************************************/
  /* EVENTO SELECCIONADOR DE LICENCIAS HISTORICO TRANSMISIONES */
  /*************************************************************/
  $("#contenedorAccionesLicencia").on("change","#sltLicenciaHistorico",function(e){
    if ($("option:selected", this).val()!=0)
    {
      $("#resumenLecturaLicencia").html("");
      cargarHistorico($("option:selected", this).val());      
      $(this).attr("style","");
      $("#rayita").removeClass("oculto");
    }
    else
    {
      $(this).css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
      $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><i class='fi-x rojo'></i>&nbsp;Debe elegir una licencia correcta.</label>");
      $("#subSeccionHistorico").html("");
      $("#rayita").addClass("oculto");
    }
  }); //fin evento acciones seleccionador licencia

  /**************************************************/
  /* EVENTO CLIC EN RADIO BUTTON ELIMINAR HISTORICO */
  /**************************************************/  
  $('#contenedorAccionesLicencia').on("click", "input[id^='deletehis_']", function(e){
    //console.log("borrando " + $(this).data("id") + " y está " + $(this).prop("checked"));
    var miData=$(this).data("id");
    if ($(this).prop("checked"))
    {
      $("#btnEliminarHistorico").removeClass("disabled");
      $("#btnEliminarHistorico").attr("data-eli",miData);
      $("input[name='deletehis']").prop("checked",false);
      $(this).prop("checked",true);
    }
    else
    {
      $("#btnEliminarHistorico").addClass("disabled").removeAttr("data-eli");
    }

  });

  /*************************************/
  /* EVENTO CLIC EN ELIMINAR HISTORICO */
  /*************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnEliminarHistorico",function(e){
    var ident= $(this).attr("data-eli");
    console.log("Eliminar registro historico..." + ident);
    eliminarHistorico(ident); 
  });  

  /************************************/
  /* EVENTO CLIC EN AGREGAR HISTORICO */
  /************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnAgregarHistorico",function(e){
    console.log("mostrando ventana emergente...");
    var licencia= $(this).attr("data-id");
    seccionFormulario("nuevohistorico",licencia);
  });

  /************************************/
  /* EVENTO CLIC EN GUARDAR HISTORICO */
  /************************************/  
  $("#mensajeModal").on("click","#btnGuardarHistorico",function(e){
    console.log("agregando historico a la licencia...");
    var formvalid=true;
    var formularioOK=true;
    $("#inpFechaTransmision,#inpImporte,#inpNIFNIET,#inpApeNom").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      insertarHistorico($("#form_register_historico").serializeArray());
    }
    else
    {
      console.log("Datos incompletos o erróneos.");
      $("#barraDeEstado").html("Datos incompletos o erróneos.");      
    }
  });

});//ready