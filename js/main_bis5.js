$(document).ready(function(){

  /********************************************************/
  /* EVENTO SELECCIONADOR DE LICENCIAS CAMBIO DE VEHICULO */
  /********************************************************/
  $("#contenedorAccionesLicencia").on("change","#sltLicenciaCambioVehiculo",function(e){
    var lic=$(this).val();
    if (lic!=0)
    {
      $.ajax({
        url:"./inc/testlicense.php",
        type: 'POST',
        async: true,
        dataType: 'text',
        beforeSend: function (){
          $("#sltLicenciaCambioVehiculo").prop("disabled",true).addClass("desactivado");
          $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><img src='./../img/ajax-loader.gif' lt='buscando ...'/>&nbsp;</label>");
        },
        data:{'lic':lic},
        success: function(res){
          $("#sltLicenciaCambioVehiculo").prop("disabled",false).removeClass("desactivado");
          //$("#sltLicencia").prop("disabled",false).removeClass("desactivado");        
          if (res)
            $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><span><span class='resumen' id='textoTestLicense'>&nbsp;La licencia tiene asignado un vehículo. Pulse <span class='boton link' id='btn-continuarConCambioVehiculo' data-id='" + lic + "'>aquí</span> para continuar con el cambio de vehículo.</span></label>");
          else
            $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><span class='resumen' id='textoTestLicense'>&nbsp;La licencia no tiene vehiculo. Seleccione otra licencia o consulte con el administrador.</span></label>");
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

  /*******************************************************************************/
  /* EVENTO BOTON CONTINUAR CON CAMBIO DE VEHICULO (CARGA DE DATOS DEL VEHICULO) */
  /*******************************************************************************/  
  $("#contenedorAccionesLicencia").on("click", "#btn-continuarConCambioVehiculo",function(e){
    console.log("Segundo Paso ... carga Vehiculo");
    $("#sltLicenciaCambioVehiculo").prop("disabled",true).addClass("desactivado");
    $("#textoTestLicense").html("Efectuando el cambio de vehículo");
    $("#selectorLicencia").append("<input type='hidden' name='inpLicencia' value='" + $("#sltLicenciaCambioVehiculo option:selected").val() + "' />");
    $("#rayita").removeClass("oculto");
    subSeccionCargaVehiculoActual($(this).attr("data-id"));
  });


  /*****************************************************/
  /* EVENTO CLIC EN PROCEDER CON EL CAMBIO DE VEHICULO */
  /*****************************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnGuardarNuevoVehiculo",function(e){
    var formvalid=true;
    var formularioOK=true;
    $("#sltMarcaV,#sltModeloV,#inpNumBastidor,#inpFechaMatricula,#inpFechaITV,#sltTipoCombustible,#inpPlazas,#inpMatricula,#inpOtros").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      $("#sltMarcaV,#sltModeloV,#inpNumBastidor,#inpFechaMatricula,#inpFechaITV,#sltTipoCombustible,#inpPlazas,#inpMatricula,#inpDiscapacita,#inpGPS,#inpImpresora,#inpPagoTarjeta,#inpMampara,#inpOtros").prop("disabled",false);
      actualizarVehiculo($("#form_register_vehiculo").serializeArray());
    }
    else
      console.log("Datos incompletos.");
  });


  /*************************************************************/
  /* EVENTO PULSAR TECLA ENTER NUMERO IDENTIFICACION TAXIMETRO */
  /*************************************************************/  
  $("#contenedorAccionesLicencia").on("keyup","#inpNumIdentificaCambio",function(e){
    var key = e.charCode || e.keyCode || 0;
    
    if ( key==13 )
    {
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
    }
  });

  /****************************************************/
  /* EVENTO PULSAR ENTER EN LA MATRICULA DEL VEHICULO */
  /****************************************************/  
  $("#contenedorAccionesLicencia").on("focusout","#inpMatriculaCambio",function(e){
    console.log("llega hasta cambio");
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
            data:{'mat':$(this).val(), 'estado':'estado'},
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
                $("#btnGuardarNuevoVehiculo").removeClass("disabled");
                
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


  /*******************************************************/
  /* EVENTO SELECCIONADOR DE LICENCIAS CAMBIO DE EMISORA */
  /*******************************************************/
  $("#contenedorAccionesLicencia").on("change","#sltLicenciaCambioEmisora",function(e){
    var licv=$(this).val();
    var lict=$("#sltLicenciaCambioEmisora option:selected").text();
    if (licv!=0)
    {
      $("#resumenLecturaLicencia").html("<label>&nbsp;<br/><span><span class='resumen' id='textoTestLicense'>&nbsp;Para continuar con editando la emisora de la licencia <u>" + lict + "</u> pulse <span class='boton link' id='btn-continuarConCambioEmisora' data-id='" + licv + "'>aquí</span></strong>.</span></label>");
    }
    else
    {
      $("#resumenLecturaLicencia").html("");
    }
  }); //fin evento acciones seleccionador licencia

  /*******************************************************************************/
  /* EVENTO BOTON CONTINUAR CON CAMBIO DE EMISORA (CARGA DE DATOS DE LA LICENCIA) */
  /*******************************************************************************/  
  $("#contenedorAccionesLicencia").on("click", "#btn-continuarConCambioEmisora",function(e){
    console.log("Segundo Paso ... carga Emisora");
    $("#sltLicenciaCambioEmisora").prop("disabled",true).addClass("desactivado");
    $("#textoTestLicense").html("Efectuando el cambio de emisora");
    $("#selectorLicencia").append("<input type='hidden' name='inpLicencia' value='" + $("#sltLicenciaCambioEmisora option:selected").val() + "' />");
    $("#rayita").removeClass("oculto");
    subSeccionCargaEmisoraActual($(this).attr("data-id"));
  });

  /***********************************/
  /* EVENTO CHANGE EN SELECT EMISORA */
  /***********************************/  
  $("#contenedorAccionesLicencia").on("change","#sltEmisoraCambio",function(e){
    if ($(this).val()==0)
    {
      $("#inpNombreEmisora").val("");
      $("#inpTelefono1").val("");
      $("#inpTelefono2").val("");
      $("#inpFax").val("");
      $("#btnGuardarNuevaEmisora").addClass("disabled");
      //$("#btnGuardarEmisorayFinalizar").addClass("disabled");
    }
    else
    {
      $.ajax({
        url:"./inc/loadEmisora.php",
        type: 'POST',
        async: false,
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
      $("#btnGuardarNuevaEmisora").removeClass("disabled");
    }
  });

  /****************************************************/
  /* EVENTO CLIC EN PROCEDER CON EL CAMBIO DE EMISORA */
  /****************************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnGuardarNuevaEmisora",function(e){
    var formvalid=true;
    var formularioOK=true;
    $("#inpNomEmiCambio,#inpTel1Cambio,#inpTel2Cambio,#inpFaxCambio").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      $("#inpNomEmiCambio,#inpTel1Cambio,#inpTel2Cambio,#inpFaxCambio").prop("disabled",false);
      actualizarEmisora($("#form_register_emisora").serializeArray());
    }
    else
      console.log("Datos incompletos.");
  });





});//ready