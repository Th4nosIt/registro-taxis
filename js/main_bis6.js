$(document).ready(function(){

  /*******************************************************/
  /* EVENTO SELECCIONADOR DE LICENCIAS CAMBIO DE TITULAR */
  /*******************************************************/
  $("#contenedorAccionesLicencia").on("change","#sltLicenciaAutorizaciones",function(e){
    if ($("option:selected", this).val()!=0)
    {
      cargarAutorizaciones($("option:selected", this).val());
      $(this).attr("style","");
      $("#resumenLecturaLicencia").html("");
      $("#rayita").removeClass("oculto");
    }
    else
    {
      $(this).css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
      $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><i class='fi-x rojo'></i>&nbsp;Debe elegir una licencia correcta.</label>");
      $("#subSeccionAutorizacion").html("");
      $("#rayita").addClass("oculto");
    }
  }); //fin evento acciones seleccionador licencia

  /***************************************/
  /* EVENTO CLIC EN AGREGAR AUTORIZACION */
  /***************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnAgregarAutorizacion",function(e){
    console.log("mostrando ventana emergente...");
    var licencia= $(this).attr("data-id");
    seccionFormulario("nuevaautorizacion",licencia);
  });


  /***************************************/
  /* EVENTO CLIC EN GUARDAR AUTORIZACION */
  /***************************************/  
  $("#mensajeModal").on("click","#btnGuardarAutorizacion",function(e){
    console.log("agregando autorizacion a la licencia...");
    var formvalid=true;
    var formularioOK=true;
    $("#sltTipoAutorizacion,#inpFechaAutorizacion").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      insertarAutorizacion($("#form_register_autorizacion").serializeArray());
    }
    else
    {
      console.log("Datos incompletos o erróneos.");
      $("#barraDeEstado").html("Datos incompletos o erróneos.");      
    }
  });

  /***************************************************************************/
  /* EVENTO CLIC EN RADIO BUTTON ELIMINAR AUTORIZACIONES */
  /***************************************************************************/  
  $('#contenedorAccionesLicencia').on("click", "input[id^='deleteauth_']", function(e){
    //console.log("borrando " + $(this).data("id") + " y está " + $(this).prop("checked"));
    var miData=$(this).data("id");
    if ($(this).prop("checked"))
    {
      $("#btnEliminarAutorizacion").removeClass("disabled");
      $("#btnEliminarAutorizacion").attr("data-eli",miData);
      $("input[name='deleteauth']").prop("checked",false);
      $(this).prop("checked",true);
    }
    else
    {
      $("#btnEliminarAutorizacion").addClass("disabled").removeAttr("data-eli");
    }

  });

  /****************************************/
  /* EVENTO CLIC EN ELIMINAR AUTORIZACION */
  /****************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnEliminarAutorizacion",function(e){
    var ident= $(this).attr("data-eli");
    console.log("Eliminar autorizacion..." + ident);
    eliminarAutorizacion(ident); 
  });  
});//ready