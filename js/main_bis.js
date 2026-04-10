$(document).ready(function(){
  /********************************************/
  /* EVENTO SELECCIONADOR DE MARCAS O MODELOS */
  /********************************************/

  $("#contenedorAccionesGestion").on("change","#sltMarcaModelo",function(e){
    
    var elem=$(this).val();
    if (elem>0)
    {
      $("#rayita").removeClass("oculto");
      $.ajax({
        url:"./inc/loadMarcaModelo.php",
        type: 'POST',
        async: true,
        dataType: 'json',
        beforeSend: function (){
          $("#sltMarcaModelo").prop("disabled",true).addClass("desactivado");
          $("#resumenLecturaElemento").html("<label>&nbsp;<br/><img src='./../img/ajax-loader.gif' lt='buscando ...'/>&nbsp;</label>");
        },
        data:{'tipo':$(this).val()},
        success: function(data){
          $("#subSeccionAgregarMarcaModelo").html("");
          var contenido = "<fieldset id='fieldsetMarcaModelo'><legend>" + $("#sltMarcaModelo option:selected").text()+ "</legend><div class='row'><div class='large-12 columns' id='contenedorTablas'><table id='mitablam'><thead>";
          //console.log(elem);
          if (elem==1)
          {
            contenido+="<th rel='0' >Marca</th><th rel='1' class='datatable-nosort'>Tipo</th></thead><tbody>";
          }
          else if (elem==2 || elem==3 )
          {
            contenido+="<th rel='0' class='datatable-nosort'>Modelo</th><th rel='1' class='datatable-nosort'>Marca</th></thead><tbody>";
          }
        	console.log(data);
      
        	if (data['elem']!='Sindatos')
          {
            $.each(data['elem'],function(clave,valor){
              if (elem==1)
              {
                contenido += "<tr><td>" + valor.marca +  "</td><td>";
                if (valor.tipo==0)
                  contenido += "Vehículo</td></tr>";
                else
                  contenido += "Taxímetro</td></tr>";
              }
              else if ( elem==2 || elem==3 )
              {
                contenido += "<tr><td>" + valor.modelo +  "</td><td>"+ valor.marca + "</td></tr>";
              }

            });//each          
          }
  	
  		    contenido+="</tbody></table></div></div></fieldset>";
          contenido+="<div class='row' id='cajaBotonAgregarMarcaModelo'><div class='large-12 columns a-la-derecha'><a id='btnAgregarMarcaModelo' class='button' data-elem='"+ elem + "'>Agregar</a></div></div>";

        	$("#subSeccionMarcaModelo").html(contenido);
          if ( elem==1 )
          {
            que="Marcas";
          }
          else
          {
            que="Modelos";
          }
          tablaEspecialConDatosOrdenados($("#mitablam"),que);
          $("#sltMarcaModelo").prop("disabled",false).removeClass("desactivado");
          $("#resumenLecturaElemento").html("");
        },
        error: function (x,y){
          alert("error");
        }
      });//ajax 
    }
    else
    {
      $("#rayita").addClass("oculto");
      $("#subSeccionMarcaModelo").html("");
    }
  }); //fin evento acciones seleccionador licencia

  /***********************************************/
  /* EVENTO CLIC EN AGREGAR NUEVA MARCA O MODELO */
  /***********************************************/  
  $("#contenedorAccionesGestion").on("click","#btnAgregarMarcaModelo",function(e){
    $(this).addClass("disabled");
    $("#subSeccionMarcaModelo").addClass("transparente");
    $("#mitablam_paginate").addClass("oculto");
    $("#sltMarcaModelo").prop("disabled",true);
    formularioMarcaModelo($(this).data("elem"));
  });

  /***********************************************/
  /* EVENTO CLIC EN CANCELAR NUEVA MARCA O MODELO */
  /***********************************************/  
  $("#contenedorAccionesGestion").on("click","#btnCancelarMarcaModelo",function(e){
    $("#subSeccionMarcaModelo").removeClass("transparente");
    $("#mitablam_paginate").removeClass("oculto");
    $("#sltMarcaModelo").prop("disabled",false);
    $("#btnAgregarMarcaModelo").removeClass("disabled");
    $("#subSeccionAgregarMarcaModelo").html("");
  });

  /***********************************************/
  /* EVENTO CLIC EN GUARDAR NUEVA MARCA O MODELO */
  /***********************************************/  
  $("#contenedorAccionesGestion").on("click","#btnGuardarMarcaModelo",function(e){
    var formvalid=true;
    var formularioOK=true;
    $("#inpModelo,#sltMarca,#inpMarca,#sltTipo").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      console.log("Todos los campos son correctos");
      insertarMarcaModelo($("#form_register_marca_modelo").serializeArray(),$("#btnAgregarMarcaModelo").data("elem"));
    }
    else
      console.log("Datos incompletos.");
  });

  /****************************************/
  /* EVENTO CLIC EN AGREGAR NUEVA EMISORA */
  /****************************************/  
  $("#contenedorAccionesGestion").on("click","#btnAgregarEmisora",function(e){
    $("#mitablae a").addClass("desactivado").prop({'disabled':true});
    $(this).addClass("disabled");
    $("#subSeccionEmisora").addClass("transparente");
    $("#mitablae_paginate").addClass("oculto");
    formularioNuevaEmisora();
  });

  /*****************************************/
  /* EVENTO CLIC EN CANCELAR NUEVA EMISORA */
  /*****************************************/  
  $("#contenedorAccionesGestion").on("click","#btnCancelarEmisora",function(e){
    $("#mitablae a").removeClass("desactivado").prop({'disabled':false});
    $("#subSeccionEmisora").removeClass("transparente");
    $("#mitablae_paginate").removeClass("oculto");
    $("#btnAgregarEmisora").removeClass("disabled");
    $("#subSeccionAgregarEmisora").html("");
  });

  /******************************************/
  /* EVENTO CLIC EN CANCELAR CAMBIO EMISORA */
  /******************************************/  
  $("#contenedorAccionesLicencia").on("click","#btnCancelarEmisoraCambio",function(e){
    seccionLicenciaCambioEmisora();
  });

  /****************************************/
  /* EVENTO CLIC EN GUARDAR NUEVA EMISORA */
  /****************************************/  
  $("#contenedorAccionesGestion").on("click","#btnGuardarEmisora",function(e){
    var formvalid=true;
    var formularioOK=true;
    $("#inpNomEmi,#inpTel1,#inpTel2,#inpFax").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      console.log("Todos los campos son correctos");
      guardarEmisora($("#form_register_emisora").serializeArray(),$(this).data("id"));
      //insertarMarcaModelo($("#form_register_marca_modelo").serializeArray(),$("#btnAgregarMarcaModelo").data("elem"));
    }
    else
      console.log("Datos incompletos.");
  });

  /*********************************/
  /* EVENTO CLIC EN EDITAR EMISORA */
  /*********************************/  
  $('#contenedorAccionesGestion').on("click", "a[data-name*='ediemi']", function(e){
    $("#mitablae a").addClass("desactivado").prop({'disabled':true});
    $("#btnAgregarEmisora").addClass("disabled");
    $("#subSeccionEmisora").addClass("transparente");
    $("#mitablae_paginate").addClass("oculto");
    var miId=$(e.target).attr('data-id');
    var nom=$(e.target).text();
    var tel1=$(e.target).closest("tr").find("td:eq(1)").find("span").text();
    var tel2=$(e.target).closest("tr").find("td:eq(2)").find("span").text();
    var fax=$(e.target).closest("tr").find("td:eq(3)").find("span").text();
    formularioEditaEmisora(miId,nom,tel1,tel2,fax);    
  });


  /****************************************/
  /* EVENTO CLIC EN AGREGAR NUEVO TITULAR */
  /****************************************/  
  $("#contenedorAccionesGestion").on("click","#btnAgregarTitular",function(e){
    $("#mitablat a").addClass("desactivado").prop({'disabled':true});
    $(this).addClass("disabled");
    $("#subSeccionTitular").addClass("transparente");
    $("#mitablat_paginate").addClass("oculto");
    formularioNuevoTitular();
  });

  /*****************************************/
  /* EVENTO CLIC EN CANCELAR NUEVO TITULAR */
  /*****************************************/  
  $("#contenedorAccionesGestion").on("click","#btnCancelarTitular",function(e){
    $("#mitablat a").removeClass("desactivado").prop({'disabled':false});
    $("#subSeccionTitular").removeClass("transparente");
    $("#mitablat_paginate").removeClass("oculto");
    $("#btnAgregarTitular").removeClass("disabled");
    $("#subSeccionAgregarTitular").html("");
  });

  /********************************************************/
  /* EVENTO PULSAR ENTER EN EL DNI TITULAR, REPRESENTANTE */
  /********************************************************/  
  $("#contenedorAccionesGestion").on("keyup","#inpNIFNIET,#inpNIFNIER",function(e){
    var key = e.charCode || e.keyCode || 0;
    if ( key==13 )
    {
      //console.log($(this).attr('id'));
      if ($(this).attr('id')=='inpNIFNIET')
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
                $("#btnGuardarTitular").removeClass("disabled");
              }
              else
              {
                $("#resumenLecturaTitular").html("<i class='fi-x rojo' title='no disponible'></i>&nbsp;El DNI/NIE ya existe en la base de datos");
                $("#inpNIFNIET").prop("readonly",false).select();

              }
            },
            error: function (x,y){
              alert("error");
            }
          });//ajax
        }        
        else
        {
          $("#inpNIFNIET").select();
          $("#resumenLecturaTitular").html("DNI/NIE Incorrecto");
        }
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
                  $("#btnGuardarTitular").removeClass("disabled");
                }
                else
                {
                  $("#resumenLecturaRepresentante").html("<i class='fi-check verde' title='disponible'></i>");
                  $("#btnGuardarTitularyContinuar").removeClass("disabled");
                  $("#inpNomRep").val(data['repre'].nomrep).removeAttr("readonly");
                  $("#inpApeRep").val(data['repre'].aperep).removeAttr("readonly");
                  $("#inpDomRep").val(data['repre'].domrep).removeAttr("readonly");
                  $("#inpTelRep").val(data['repre'].telrep).removeAttr("readonly");
                  $("#esConductor").prop("disabled",false).removeClass("elementoInactivoFondo");
                }

              },
              error: function (x,y){
                alert("error");
              }
            });//ajax
          }        
          else
            $("#resumenLecturaRepresentante").html("DNI/NIE Incorrecto");
        }
        else
        {
          $("#resumenLecturaRepresentante").html("<i class='fi-x rojo' title='no disponible'></i> El NIF/NIE del Representante no puede ser igual al del titular.");
          $("#inpNIFNIER").select();
        }
      }

    }
    
  }); //fin evento change combo representante
  
  /**********************************************/
  /* EVENTO CAMBIO EN EL COMBO DE REPRESENTANTE */
  /**********************************************/  
  $("#contenedorAccionesGestion").on("change","#tieneRepresentante",function(e){
    if ($("#tieneRepresentante option:selected").val()==1)
    {
      var contenedor="<div class='row'><div class='large-12 columns'><fieldset id='fieldsetRepresentante'><legend>Datos del Representante</legend><div class='row'><div class='large-2 columns'><input type='text' id='inpNIFNIER' name='inpNIFNIER' placeholder='NIF / NIE' maxlength='9' /></div><div class='large-10 columns resumen' id='resumenLecturaRepresentante'></div></div><div class='row'><div class='large-6 columns'><label for='inpNomRep'>Nombre del Representante<input type='text' id='inpNomRep' name='inpNomRep' maxlength='40' readonly='readonly'/></label></div><div class='large-6 columns'><label for='inpApeRep'>Apellidos del Representante<input type='text' id='inpApeRep' name='inpApeRep' maxlength='40' readonly='readonly'/></label></div></div><div class='row'><div class='large-8 columns'><label for='inpDomRep'>Domicilio del Representante<input type='text' id='inpDomRep' name='inpDomRep' maxlength='80' readonly='readonly'/></label></div><div class='large-4 columns'><label for='inpTelRep'>Teléfono<input type='text' id='inpTelRep' name='inpTelRep' maxlength='9' readonly='readonly'/></label></div></div></fieldset></div></div>";
      $("#cajaRepresentante").append(contenedor);
      $("#inpNIFNIER").select();
    }
    else
      $("#fieldsetRepresentante").closest(".row").remove();
    
  }); //fin evento change combo representante


  /**********************************/
  /* EVENTO CLIC EN GUARDAR TITULAR */
  /**********************************/  
  $("#contenedorAccionesGestion").on("click","#btnGuardarTitular",function(e){
    var formvalid=true;
    var formularioOK=true;
    lic=$(this).attr('data-lic');
    $("#inpNomTit,#inpApeTit,#inpDomTit,#inpTelTit,#inpNomRep,#inpApeRep,#inpDomRep,#inpTelRep,#inpNIFNIER").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK){
      console.log("Todos los campos son correctos");
      var nifT=$("#inpNIFNIET").val();
/*      if ( $("#tieneRepresentante option:selected").val()==1 )
      {
        console.log("Tiene Representante");
        var nifR=$("#inpNIFNIER").val();
        $("a[data-id='"+nifT+"']").data("rep",1);
        $("a[data-id='"+nifT+"']").data("repre",nifR);
      }
      else
      {
        console.log("No tiene Representante");
        $("a[data-id='"+nifT+"']").data("rep",0);
        $("a[data-id='"+nifT+"']").data("repre",null);
      }*/

      if ( typeof $("#edit")!="undefined" )
        guardarTitular($("#form_register_titular").serializeArray(),$("#edit").val(),lic);
      else
        guardarTitular($("#form_register_titular").serializeArray());

    }
    else
      console.log("Datos incompletos.");
  });


  /*********************************/
  /* EVENTO CLIC EN EDITAR TITULAR */
  /*********************************/  
  $('#contenedorAccionesGestion').on("click", "a[data-name*='editit']", function(e){
    $("#mitablat a").addClass("desactivado").prop({'disabled':true});
    $("#btnAgregarTitular").addClass("disabled");
    $("#subSeccionTitular").addClass("transparente");
    $("#mitablat_paginate").addClass("oculto");
    var miDni=$(e.target).attr('data-id');
    var nom=$(e.target).attr('data-nom');
    var ape=$(e.target).attr('data-ape');
    var rep=$(e.target).attr('data-rep');
    var repre=$(e.target).attr('data-repre');
    var tel=$(e.target).attr('data-tel');
    var dom=$(e.target).attr('data-dom');
    var lic=$(e.target).attr('data-lic');

    // var tel=$(e.target).closest("tr").find("td:eq(1)").find("span").text();
    // var dom=$(e.target).closest("tr").find("td:eq(2)").find("span").text();
    formularioEditaTitular(miDni,nom,ape,tel,dom,rep,repre,lic);    
  });

  /********************************************/
  /* EVENTO DOBLE CLICK DNI/NIE REPRESENTANTE */
  /********************************************/  
  $("#contenedorAccionesGestion").on("dblclick","#inpNIFNIER",function(e){
    console.log("haciendo doble click");
    $("#inpNIFNIER").prop("readonly",false);
    $("#resumenLecturaVehiculo").html("");
    $("#inpNomRep,#inpApeRep, #inpDomRep, #inpTelRep").val("").prop("readonly",true).closest("label").addClass("elementoInactivo");
    $("#btnGuardarVehiculoyContinuar").addClass("disabled");
  });

  /*****************************************/
  /* EVENTO CLIC EN AGREGAR NUEVO VEHICULO */
  /*****************************************/  
  $("#contenedorAccionesGestion").on("click","#btnAgregarVehiculo",function(e){
    $("#mitablav a").addClass("desactivado").prop({'disabled':true});
    $(this).addClass("disabled");
    $("#subSeccionVehiculos").addClass("transparente");
    $("#mitablav_paginate").addClass("oculto");
    formularioNuevoVehiculo();
  });

  /******************************************/
  /* EVENTO CLIC EN CANCELAR NUEVO VEHICULO */
  /******************************************/  
  $("#contenedorAccionesGestion").on("click","#btnCancelarVehiculo",function(e){
    $("#mitablav a").removeClass("desactivado").prop({'disabled':false});
    $("#subSeccionVehiculos").removeClass("transparente");
    $("#mitablav_paginate").removeClass("oculto");
    $("#btnAgregarVehiculo").removeClass("disabled");
    $("#subSeccionAgregarVehiculo").html("");
  });


  /****************************************************/
  /* EVENTO PULSAR ENTER EN LA MATRICULA DEL VEHICULO */
  /****************************************************/  
  $("#contenedorAccionesGestion").on("focusout","#inpMatricula",function(e){
    if ( $(this).val().length!=0  )
    {
      var mimatricula=$(this);
        if (validateFields(mimatricula))
        {
          $.ajax({
            url:"./inc/locateVehiculo_bis.php",
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
                $("#btnGuardarVehiculo").removeClass("disabled");
              }
              else
              {
                $("#inpMatricula").prop("readonly",false);
                $("#resumenLecturaVehiculo").html("<i class='fi-x rojo' title='no disponible'></i>&nbsp;" + data);

                $("#inpNumIdentifica,#inpNumBastidor, #inpPlazas, #inpOtros").prop("disabled",true).attr("readonly","readonly").closest("label").removeClass("elementoInactivo");
                $("#inpNumIdentifica,#inpNumBastidor, #inpPlazas, #inpOtros,#inpFechaMatricula,#inpFechaITV").val("");
                $("#sltMarcaV,#sltTipoCombustible,#inpDiscapacita,#inpGPS,#inpImpresora,#inpMampara,#inpPagoTarjeta").prop("disabled",true).addClass("elementoInactivoFondo");
                $("#sltMarcaV option:eq(0),#sltModeloV").html("<option value='0'>-- Seleccione</option>");
                $("#sltMarcaV option:eq(0),#sltModeloV option:eq(0),#sltTipoCombustible option:eq(0)").attr("selected","selected");
                $("#inpDiscapacita,#inpGPS,#inpImpresora,#inpMampara,#inpPagoTarjeta").prop("checked",false);
                $("#inpMatricula").focus();
                $("#inpFechaMatricula,#inpFechaITV").prop("disabled",true);
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

  /***********************************/
  /* EVENTO CLIC EN GUARDAR VEHICULO */
  /***********************************/  
  $("#contenedorAccionesGestion").on("click","#btnGuardarVehiculo",function(e){
    var formvalid=true;
    var formularioOK=true;
    $("#sltMarcaV,#sltModeloV,#inpNumBastidor,#inpFechaMatricula,#inpFechaITV,#sltTipoCombustible,#inpPlazas,#sltMarcaT,#sltModeloT,#inpNumIdentifica,#inpRevisionTaximetro,#inpFechaValidezTaximetro,#inpMatricula").each(function(i){
      formvalid=validateFields($(this));
      if (!formvalid){
        formularioOK=false;
        e.preventDefault();
      }
    });//each
    if (formularioOK)
    {
      var fm, fi, fecMat, fecItv;
      fm=($("#inpFechaMatricula").val()!="")?$("#inpFechaMatricula").val().split("-"):0;
      fi=($("#inpFechaITV").val()!="")?$("#inpFechaITV").val().split("-"):1;

      if ( $("#inpRevisionTaximetro").length ) 
      {
        fr=($("#inpRevisionTaximetro").val()!="")?$("#inpRevisionTaximetro").val().split("-"):0;
        fv=($("#inpFechaValidezTaximetro").val()!="")?$("#inpFechaValidezTaximetro").val().split("-"):1;
        if (fr!=0)
        {
          fecRev=new Date(fr[2],fr[1]-1,fr[0]);        
        }
        else
        {
          fecRev=fr;
        }
        if (fv!=1)
        {
          fecVal=new Date(fv[2],fv[1]-1,fv[0]);
        }
        else
        {
          fecVal=fv;
        }
      }
      
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
        //console.log("llega tambien");
        $("#sltMarcaV,#sltModeloV,#inpNumBastidor,#inpFechaMatricula,#inpFechaITV,#sltTipoCombustible,#inpPlazas,#inpMatricula,#inpDiscapacita,#inpGPS,#inpImpresora,#inpPagoTarjeta,#inpMampara").prop("disabled",false);
        if ( $("#inpRevisionTaximetro").length )
        {
          if (fecVal>fecRev)
          {
            $("#sltMarcaT,#sltModeloT,#inpNumIdentifica,#inpRevisionTaximetro,#inpFechaValidezTaximetro,#inpTaller").prop("disabled",false);
            $("#inpFechaMatricula,#inpFechaITV").attr('style','');
          }
          else
          {
            $("#inpRevisionTaximetro,#inpFechaValidezTaximetro").css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
          }
        }
        guardarVehiculo($("#form_register_vehiculo").serializeArray(),$(this).data('act'));
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
  $("#contenedorAccionesGestion").on("focusout","#inpNumIdentifica",function(e){
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
          else if (data=="Enuso")
          {
            $("#resumenLecturaTaximetro").html("<i class='fi-x rojo' title='no disponible'></i> El taxímetro ya pertenece a otro vehículo. Asegúrese de que es correcto o contacte con el administrador (0x999).");
            $("#inpNumIdentifica").prop("readonly",false).select();
          }
          else
          {
            $("#resumenLecturaTaximetro").html("<i class='fi-check verde' title='disponible'></i>");
            $("#btnGuardarVehiculo").removeClass("disabled");
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

  /*********************************/
  /* EVENTO CLIC EN EDITAR VEHICULO */
  /*********************************/  
  $('#contenedorAccionesGestion').on("click", "a[data-name*='ediveh']", function(e){
    $("#mitablav a").addClass("desactivado").prop({'disabled':true});
    $("#btnAgregarVehiculo").addClass("disabled");
    $("#subSeccionVehiculos").addClass("transparente");
    $("#mitablav_paginate").addClass("oculto");
    var mat=$(e.target).attr('data-id');
    formularioEditaVehiculo(mat);    
  });

  /************************************/
  /* EVENTO CLIC EN AGREGAR TAXIMETRO */
  /************************************/  
  $('#contenedorAccionesGestion').on("click", "#btnAgregarTaximetro", function(e){
    formularioNuevoTaximetro();    
  });


  /****************************************/
  /* EVENTO DOBLE CLICK CAMBIAR TAXIMETRO */
  /****************************************/  
  $("#contenedorAccionesGestion").on("dblclick","#btnCambiarTaximetro",function(e){
    seccionFormulario('avisoTaximetro');
  });

  /***************************************************/
  /* EVENTO CAMBIO EN EL COMBO ELEGIR MARCA Y MODELO */
  /***************************************************/  
/*  $("#contenedorAccionesLicencia").on("change","#sltMarcaModelo",function(e){
    if ($(this).val()==0)
    {
      $("#subSeccionMarcaModelo").html("");
    }
    else if ($(this).val()==1)
    {
      $.ajax({
        url:"./inc/loadMarcaModelo.php",
        type: 'POST',
        async: true,
        dataType: 'json',
        data:{'tipo':$(this).val()},
        success: function(data){
          console.log(data);
        }
      });//ajax
    }
    else if ($(this).val()==2)
    {
      $.ajax({
        url:"./inc/loadMarcaModelo.php",
        type: 'POST',
        async: true,
        dataType: 'json',
        data:{'tipo':$(this).val()},
        success: function(data){
          console.log(data);
        }
      });//ajax    
    }
    
  }); //fin evento change combo emisora*/

});//main