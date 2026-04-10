$(document).ready(function(){

  /*******************************************/
  /* EVENTO PULSAR ENTER EN EL DNI CONDUCTOR */
  /*******************************************/  
  $("#contenedorAccionesGestion").on("focusout","#inpNIFNIEC",function(e){
    if ( $(this).val().length!=0  )
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
            $("#inpNIFNIEC").prop("readonly","readonly");
            $("#resumenLecturaConductor").html("<img src='./../img/ajax-loader.gif' alt='buscando ...'/> Por favor, espere mientras buscamos el conductor en la base de datos");
          },
          data:{'dni':$(this).val(),'tipo':'c','accion':'a'},
          success: function(data){
            $("#resumenLecturaConductor").html("");
            if (data=="Sindatos")
            {
              //$("#resumenLecturaConductor").html("<i class='fi-x rojo' title='disponible'></i>&nbsp; El NIF/NIE no existe en la base de datos.");   
              $("#barraDeEstado").html("<i class='fi-x rojo' title='disponible'></i>&nbsp; El NIF/NIE no existe en la base de datos.");   
              $("#inpNomCon, #inpApeCon, #inpTelCon").attr("readonly","readonly").closest("label").addClass("elementoInactivo");
              $("#inpNIFNIEC").prop("readonly",false).select();
              $("#btnEditarConductor,#btnContratos").addClass("disabled");
            }
            else
            {
              $("#barraDeEstado").html("<i class='fi-check verde' title='disponible'></i> Datos Correctamente cargados. Doble click en el DNI para buscar otro conductor.");     
              $("#inpNomCon, #inpApeCon, #inpTelCon").prop("readonly",false).closest("label").removeClass("elementoInactivo");
              $("#inpNIFNIEC").prop("readonly",true);
              $("#inpNomCon").select();
              $("#btnEditarConductor,#btnContratos").removeClass("disabled");
              $("#inpApeCon").val(decodeEntities(data['condu'].apecon)).attr("disabled","disabled");
              $("#inpTelCon").val(data['condu'].telcon).attr("disabled","disabled");
              //$("#inpHorCon").val(data['condu'].horario).attr("disabled","disabled").prop("readonly",false);
              $("#inpNomCon").val(decodeEntities(data['condu'].nomcon)).attr("disabled","disabled").select();
            }
          },
          error: function (x,y){
            alert("error");
          }
        });//ajax
      }        
      else
        $("#resumenLecturaTitular").html("Incorrecto");

    }
    
  }); //fin evento change combo conductor

  /**********************************/
  /* EVENTO CLIC EN EDITAR CONDUCTOR */
  /**********************************/  
  $("#contenedorAccionesGestion").on("click","#btnEditarConductor",function(e){
    $("#barraDeEstado").html("Editando ...");
    $("#inpNIFNIEC").prop("readonly",true);
    $("#inpNomCon,#inpApeCon,#inpTelCon").prop("disabled",false);
    $("#btnEditarConductor").addClass("disabled oculto");
    $("#btnActualizarConductor").removeClass("disabled oculto");
    $("#btnContratos").addClass("disabled oculto");
    $("#btnCancelarConductor").removeClass("disabled oculto");
    $("#inpNomCon").focus();
  });

  /********************************************/
  /* EVENTO DOBLE CLICK BUSCAR OTRO CONDUCTOR */
  /********************************************/  
  $("#contenedorAccionesGestion").on("dblclick","#inpNIFNIEC",function(e){
    $("#barraDeEstado").html("");
    $("#inpNIFNIEC").prop("readonly",false).select();
    $("#inpNomCon,#inpApeCon,#inpTelCon").prop("disabled",true).val("");
    $("#btnEditarConductor,#btnContratos").addClass("disabled");
    $("#contenedorTablas").html("");
  });

  /********************************************/
  /* EVENTO CLIC EN CANCELAR EDITAR CONDUCTOR */
  /********************************************/  
  $("#contenedorAccionesGestion").on("click","#btnCancelarConductor",function(e){
    $("#barraDeEstado").html("");
    $("#inpNomCon,#inpApeCon,#inpTelCon").prop("disabled",true);
    $("#btnEditarConductor").removeClass("disabled oculto");
    $("#btnActualizarConductor").addClass("disabled oculto");
    $("#btnContratos").removeClass("disabled oculto");
    $("#btnCancelarConductor").addClass("disabled oculto");
    $("#inpNIFNIEC").prop("readonly",false).select();
  });

  /***************************************/
  /* EVENTO CLIC EN ACTUALIZAR CONDUCTOR */
  /***************************************/  
  $("#contenedorAccionesGestion").on("click","#btnActualizarConductor",function(e){
    $("#barraDeEstado").html("Actualizando ...");
    var formvalid=true;
    var formularioOK=true;
    $("#inpNomCon,#inpApeCon,#inpTelCon").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      guardarConductor($("#form_register_conductor").serializeArray());
    }
    else
    {
      console.log("Datos incompletos o erróneos.");
      $("#barraDeEstado").html("Datos incompletos o erróneos.");      
    }
  });

  /**************************************/
  /* EVENTO CLIC EN CONTRATOS CONDUCTOR */
  /**************************************/  
  $("#contenedorAccionesGestion").on("click","#btnContratos",function(e){
    var dni= $("#inpNIFNIEC").val();
    //console.log("Cargando contratos del conductor... dni:" +dni);
    cargarContratos(dni);
  });
 

 
  /***************************************/
  /* EVENTO CLIC EN EDITAR TIPO CONTRATO */
  /***************************************/  
  $("#contenedorAccionesGestion").on("click","a[id^='editc']",function(e){
    console.log("Cargando contratos del conductor...");
    var idcontrato= $(this).attr('data-id');
    var contrato=($("#spnTipoContrato").text().trim()!="--")?$("#spnTipoContrato").text().trim():"";
    seccionFormulario("editContrato",idcontrato,contrato);
  });

  /*********************************/
  /* EVENTO CLIC EN EDITAR HORARIO */
  /*********************************/
  $("#contenedorAccionesGestion").on("click","a[id^='ediho']",function(e){
    console.log("Cargando contratos del conductor...");
    var idcontrato= $(this).attr('data-id');
    var horario=($("#spnHorario").text().trim()!="--")?$("#spnHorario").text().trim():"";
    seccionFormulario("editHorario",idcontrato,horario);
  });
 
  /***************************************/
  /* EVENTO CLIC EN DAR DE BAJA CONTRATO */
  /***************************************/  
  $("#contenedorAccionesGestion").on("click","a[id^='ediba']",function(e){
    console.log("Cargando contratos del conductor...");
    var idcontrato= $(this).attr('data-id');
    seccionFormulario("bajaContrato",idcontrato);
  });

  /****************************************/
  /* EVENTO CLIC EN GUARDAR TIPO CONTRATO */
  /****************************************/  
  $("#mensajeModal").on("click","#btnGuardarTipoContrato",function(e){
    console.log("editando tipo contrato del conductor...");
    var formvalid=true;
    var formularioOK=true;
    $("#inpTipoContrato").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      actualizarTipoContrato($("#form_register_contrato").serializeArray());
    }
    else
    {
      console.log("Datos incompletos o erróneos.");
      $("#barraDeEstado").html("Datos incompletos o erróneos.");      
    }
  });

  /**********************************/
  /* EVENTO CLIC EN GUARDAR HORARIO */
  /**********************************/  
  $("#mensajeModal").on("click","#btnGuardarHorario",function(e){
    console.log("editando Horario del contrato del conductor...");
    var formvalid=true;
    var formularioOK=true;
    $("#inpHorario").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      actualizarHorario($("#form_register_contrato").serializeArray());
    }
    else
    {
      console.log("Datos incompletos o erróneos.");
      $("#barraDeEstado").html("Datos incompletos o erróneos.");      
    }
  });

  /******************************************/
  /* EVENTO CLIC EN SI DAR DE BAJA CONTRATO */
  /******************************************/  
  $("#mensajeModal").on("click","#btnDarBaja",function(e){
    console.log("dando de baja contrato del conductor...");
    darDeBajaContrato($("#form_register_contrato").serializeArray());
  });

  // /***********************************/
  // /* EVENTO CLIC EN AGREGAR CONTRATO */
  // /***********************************/  
  // $("#contenedorAccionesGestion").on("click","#btnAgregarContrato",function(e){
  //   console.log("mostrando ventana emergente...");
  //   var dni= $("#inpNIFNIEC").val();
  //   seccionFormulario("nuevoContrato",dni);
  // });

  // /****************************************/
  // /* EVENTO CLIC EN GUARDAR CONTRATO */
  // /****************************************/  
  // $("#mensajeModal").on("click","#btnGuardarContrato",function(e){
  //   console.log("agregando contrato al conductor...");
  //   var formvalid=true;
  //   var formularioOK=true;
  //   $("#inpFechaAltaContrato,#inpTipoContrato,#inpHorario").each(function(i){
  //     formvalid=validateFields($(this));
  //     if (!formvalid){
  //       formularioOK=false;
  //       e.preventDefault();
  //     }
  //   });//each
  //   if (formularioOK){
  //     insertarContrato($("#form_register_contrato").serializeArray());
  //   }
  //   else
  //   {
  //     console.log("Datos incompletos o erróneos.");
  //     $("#barraDeEstado").html("Datos incompletos o erróneos.");      
  //   }
  // });

  /************************************/
  /* EVENTO CLIC EN ELIMINAR CONTRATO */
  /************************************/  
  $('#contenedorAccionesGestion').on("click", "input[id^='delete_']", function(e){
    //console.log("borrando " + $(this).data("id") + " y está " + $(this).prop("checked"));
    var miData=$(this).data("id");
    if ($(this).prop("checked"))
    {
      $("#btnEliminarContrato").removeClass("disabled");
      $("#btnEliminarContrato").attr("data-eli",miData);
      $("input[name='delete']").prop("checked",false);
      $(this).prop("checked",true);
    }
    else
    {
      $("#btnEliminarContrato").addClass("disabled").removeAttr("data-eli");
    }

  });

  /************************************/
  /* EVENTO CLIC EN ELIMINAR CONTRATO */
  /************************************/  
  $("#contenedorAccionesGestion").on("click","#btnEliminarContrato",function(e){
    var ident= $(this).attr("data-eli");
    console.log("Eliminar contrato..." + ident);
    eliminarContrato(ident);
  });

















































  /***********************************************************/
  /* EVENTO CAMBIO EN EL COMBO DE MARCA VEHICULO Y TAXIMETRO */
  /***********************************************************/  
  $("#contenedorAccionesGestion").on("change","#sltMarcaV,#sltMarcaT",function(e){
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
              $("#resumenLecturaTaximetro").html("<i class='fi-x rojo' title='no disponible'></i>&nbsp;No existen modelos para la marca actual. Ir a <strong>Gestión->Taxímetros</strong>");
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
              $("#resumenLecturaTaximetro").html("");
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

  /***************************************/
  /* EVENTO CLIC EN EDITAR TAXIMETRO */
  /***************************************/  
  $("#contenedorAccionesGestion").on("click","#btnEditarTaximetro",function(e){
    var formvalid=true;
    var formularioOK=true;
    $("#sltMarcaT,#sltModeloT,#inpNumIdentificaAct,#inpRevisionTaximetro,#inpFechaValidezTaximetro,#inpTaller").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      $("#sltMarcaT,#sltModeloT,#inpNumIdentifica,#inpRevisionTaximetro,#inpFechaValidezTaximetro,#inpTaller").prop("disabled",false);
      guardarTaximetro($("#form_register_taximetro").serializeArray());
    }
    else
      console.log("Datos incompletos.");
  });

  /****************************************************************/
  /* EVENTO PULSAR ENTER EN CAMPO NUMERO IDENTIFICACION TAXIMETRO */
  /****************************************************************/  
  $("#contenedorAccionesGestion").on("focusout","#inpNumIdentificaAct",function(e){
    if ( $(this).val().length!=0  )
    {
      console.log("PULSA TAB");
      var minumero=$(this);
      if (validateFields(minumero))
      {
        $.ajax({
          url:"./inc/locateTaximetro.php",
          type: 'POST',
          async: true,
          dataType: 'json',
          beforeSend: function (){
            $("#inpNumIdentificaAct").prop("readonly","readonly");
            $("#barraDeEstado").html("<img src='./../img/ajax-loader.gif' alt='buscando ...'/> Por favor, espere mientras buscamos el taxímetro en la base de datos");
          },
          data:{'numide':$(this).val()},
          success: function(data){
            if (data=="Sindatos")
            {
              $("#barraDeEstado").html("<i class='fi-x rojo' title='No existe'></i>&nbsp; No existe el taxímetro que intenta localizar");   
              $("#inpNumIdentificaAct").closest("label").removeClass("elementoInactivo");
              $("#inpNumIdentificaAct").prop("readonly",false).select();
              $("#btnActualizarTaximetro").addClass("disabled").prop("disabled",true);
            }
            else if (typeof data['taxim'] != 'undefined')
            {
              $("#barraDeEstado").html("<i class='fi-check verde' title='disponible'></i> Doble click en el Identificador de Taxímetro para localizar otro.");
              $("#btnEditarTaximetro").removeClass("disabled");
              $("#inpTaller").removeAttr("readonly").closest("label").removeClass("elementoInactivo");
              $("#sltMarcaT option[value='" + data['marca'] + "']").prop("selected","selected");
              $("#sltModeloT").html("<option value='" + data['taxim'].idmodta + "'>" + data['modelo'] + "</option>");
              $("#inpNumIdentificaAct,#inpRevisionTaximetro,#inpTaller,#inpFechaValidezTaximetro").prop("disabled",false);
              $("#inpRevisionTaximetro,#inpFechaValidezTaximetro").datepicker();
              //$("#sltMarcaT").prop("disabled",true).addClass("elementoInactivoFondo");
              if ((data['taxim'].fecrev)!=null)
              {
                $("#inpRevisionTaximetro").val(convertirFecha(data['taxim'].fecrev));
              }
              if ((data['taxim'].fecval)!=null)
              {
                $("#inpFechaValidezTaximetro").val(convertirFecha(data['taxim'].fecval));
              }
              $("#inpTaller").val(data['taxim'].taller).focus();            
              $("#btnActualizarTaximetro").removeClass("disabled").prop("disabled",false);
            }
          }
        }); //ajax
        console.log("Num identifica correcto");
      }
      else
        console.log("Incorrecta");
    }
  });

  // /**********************************/
  // /* EVENTO CLIC EN EDITAR VEHICULO */
  // /**********************************/  
  // $('#contenedorAccionesGestion').on("click", "a[data-name*='ediveh']", function(e){
  //   $("#mitablav a").addClass("desactivado").prop({'disabled':true});
  //   $("#btnAgregarVehiculo").addClass("disabled");
  //   $("#subSeccionVehiculos").addClass("transparente");
  //   $("#mitablav_paginate").addClass("oculto");
  //   var mat=$(e.target).attr('data-id');
  //   formularioEditaVehiculo(mat);    
  // });

  /*****************************************/
  /* EVENTO DOBLE CLICK RECARGAR TAXIMETRO */
  /*****************************************/  
  $("#contenedorAccionesGestion").on("dblclick","#inpNumIdentificaAct",function(e){
    $("#inpRevisionTaximetro").html("");
    $("#inpNumIdentificaAct").prop("readonly",false).select();
    $("#inpRevisionTaximetro,#inpTaller,#inpFechaValidezTaximetro").prop("disabled",true).val("");
    $("#sltMarcaT option[value='0']").prop("selected","selected");
    $("#sltModeloT").html("<option value='0' selected='selected'>-- Seleccione</option>");
    $("#btnEditarTaximetro").addClass("disabled");
    $("#barraDeEstado").html("");
    $("#btnActualizarTaximetro").addClass("disabled").prop("disabled",true);    
  });

  /***********************************/
  /* EVENTO CLIC EN ACTUALIZAR TAXIMETRO */
  /***********************************/  
  $("#contenedorAccionesGestion").on("click","#btnActualizarTaximetro",function(e){
    var formvalid=true;
    var formularioOK=true;
    $("#sltMarcaT,#sltModeloT,#inpNumIdentificaAct,#inpRevisionTaximetro,#inpFechaValidezTaximetro,#inpTaller").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      var fr=($("#inpRevisionTaximetro").val()!="")?$("#inpRevisionTaximetro").val().split("-"):0;
      var fv=($("#inpFechaValidezTaximetro").val()!="")?$("#inpFechaValidezTaximetro").val().split("-"):1;
      var fecRev=new Date(fr[2],fr[1]-1,fr[0]);
      var fecVal=new Date(fv[2],fv[1]-1,fv[0]);
      if (fecRev<fecVal || fecRev==0 || fecRev==1)
      {
        $("#sltMarcaT,#sltModeloT,#inpNumIdentificaAct,#inpRevisionTaximetro,#inpFechaValidezTaximetro,#inpTaller").prop("disabled",false);
        guardarTaximetro($("#form_register_taximetro").serializeArray());
        $("#inpRevisionTaximetro,#inpFechaValidezTaximetro").attr('style','');
        $("#btnActualizarTaximetro").addClass("disabled").prop("disabled",true);
        $("#inpNumIdentificaAct").val("");
      }
      else
      {
        $("#inpRevisionTaximetro,#inpFechaValidezTaximetro").css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
      }
    }
    else
      console.log("Datos incompletos.");
  });
  

});//main