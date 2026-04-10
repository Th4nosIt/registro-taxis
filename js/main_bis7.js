$(document).ready(function(){

  /*******************************************************/
  /* EVENTO SELECCIONADOR DE LICENCIAS CAMBIO DE TITULAR */
  /*******************************************************/
  $("#contenedorAccionesLicencia").on("change","#sltLicenciaSubvenciones",function(e){
    if ($("option:selected", this).val()!=0)
    {
      $("#resumenLecturaLicencia").html("");
      cargarSubvenciones($("option:selected", this).val());
      $(this).attr("style","");
      $("#rayita").removeClass("oculto");
    }
    else
    {
      $(this).css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
      $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><i class='fi-x rojo'></i>&nbsp;Debe elegir una licencia correcta.</label>");
      $("#subSeccionSubvencion").html("");
      $("#rayita").addClass("oculto");
    }
  }); //fin evento acciones seleccionador licencia

  /***************************************/
  /* EVENTO CLIC EN AGREGAR AUTORIZACION */
  /***************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnAgregarSubvencion",function(e){
    console.log("mostrando ventana emergente...");
    var licencia= $(this).attr("data-id");
    seccionFormulario("nuevasubvencion",licencia);
  });


  /*************************************/
  /* EVENTO CLIC EN GUARDAR SUBVENCION */
  /*************************************/  
  $("#mensajeModal").on("click","#btnGuardarSubvencion",function(e){
    console.log("agregando subvencion a la licencia...");
    var formvalid=true;
    var formularioOK=true;
    $("#inpObjeto,#inpFechaSubvencion").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      insertarSubvencion($("#form_register_subvencion").serializeArray());
    }
    else
    {
      console.log("Datos incompletos o erróneos.");
      $("#barraDeEstado").html("Datos incompletos o erróneos.");      
    }
  });

  /*****************************************************/
  /* EVENTO CLIC EN RADIO BUTTON ELIMINAR SUBVENCIONES */
  /*****************************************************/  
  $('#contenedorAccionesLicencia').on("click", "input[id^='deletesub_']", function(e){
    //console.log("borrando " + $(this).data("id") + " y está " + $(this).prop("checked"));
    var miData=$(this).data("id");
    if ($(this).prop("checked"))
    {
      $("#btnEliminarSubvencion").removeClass("disabled");
      $("#btnEliminarSubvencion").attr("data-eli",miData);
      $("input[name='deletesub']").prop("checked",false);
      $(this).prop("checked",true);
    }
    else
    {
      $("#btnEliminarSubvencion").addClass("disabled").removeAttr("data-eli");
    }

  });

  /**************************************/
  /* EVENTO CLIC EN ELIMINAR SUBVENCION */
  /**************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnEliminarSubvencion",function(e){
    var ident= $(this).attr("data-eli");
    console.log("Eliminar subvencion..." + ident);
    eliminarSubvencion(ident); 
  });  
});//ready