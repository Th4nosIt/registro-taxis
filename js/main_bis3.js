$(document).ready(function(){
	/************************************************************************/
	/* EVENTO CLIC EN EDITAR SEGUROS, REVISIONES E INSPECCIONES DE VEHICULO */
	/************************************************************************/  
	$('#contenedorAccionesVehiculo').on("click", "a[data-name*='ediveh']", function(e){
		$("#mitablav a").addClass("desactivado").prop({'disabled':true});
		$("#subSeccionVehiculos").addClass("transparente");
		$("#mitablav_paginate").addClass("oculto");
		var mat=$(e.target).attr('data-id');
		if ($(this).attr("data-tipo")=='s')
		{
			cargarSeguros(mat);	
		}
		else if ($(this).attr("data-tipo")=='r')
		{
			cargarRevisiones(mat);	
		}
		else if ($(this).attr("data-tipo")=='i')
		{
			cargarInspecciones(mat);	
		}
	});

	/**************************************************************************/
	/* EVENTO CLIC EN CANCELAR SEGUROS, REVISIONES E INSPECCIONES DE VEHICULO */
	/**************************************************************************/  
	$("#contenedorAccionesVehiculo").on("click","#btnCancelarElem",function(e){
	    $("#mitablav a").removeClass("desactivado").prop({'disabled':false});
	    $("#subSeccionVehiculos").removeClass("transparente");
	    $("#mitablav_paginate").removeClass("oculto");
	    $("#subSeccionElemVehiculo").html("");
	});


	/***************************************************************************/
	/* EVENTO CLIC EN RADIO BUTTON ELIMINAR SEGUROS, REVISIONES E INSPECCIONES */
	/***************************************************************************/  
	$('#contenedorAccionesVehiculo').on("click", "input[id^='delete_']", function(e){
		//console.log("borrando " + $(this).data("id") + " y está " + $(this).prop("checked"));
		var miData=$(this).data("id");
		if ($(this).prop("checked"))
		{
		  $("#btnEliminarElem").removeClass("disabled");
		  $("#btnEliminarElem").attr("data-eli",miData);
		  $("input[name='delete']").prop("checked",false);
		  $(this).prop("checked",true);
		}
		else
		{
		  $("#btnEliminarElem").addClass("disabled").removeAttr("data-eli");
		}

	});

	/**************************************************************/
	/* EVENTO CLIC EN ELIMINAR SEGUROS, REVISIONES E INSPECCIONES */
	/**************************************************************/  
	$("#contenedorAccionesVehiculo").on("click","#btnEliminarElem",function(e){
		var ident= $(this).attr("data-eli");
		if ($(this).attr("data-tipo")=='s')
		{
			console.log("Eliminar seguro..." + ident);
			eliminarSeguro(ident);		
		}
		else if ($(this).attr("data-tipo")=='r')
		{
			console.log("Eliminar seguro..." + ident);
			eliminarRevision(ident);		
		}
		else if ($(this).attr("data-tipo")=='i')
		{
			console.log("Eliminar seguro..." + ident);
			eliminarInspeccion(ident);		
		}

	});

	//VEHICULOS INSPECCIONES 
	/*************************************/
	/* EVENTO CLIC EN AGREGAR INSPECCION */
	/*************************************/  
	$("#contenedorAccionesVehiculo").on("click","#btnAgregarInspeccion",function(e){
		console.log("mostrando ventana emergente...");
		var matricula= $(this).attr("data-id");
		seccionFormulario("nuevaInspeccion",matricula);
	});

	/**************************************/
	/* EVENTO CLIC EN GUARDAR INSPECCION */
	/**************************************/  
	$("#mensajeModal").on("click","#btnGuardarInspeccion",function(e){
		console.log("agregando inspeccion al vehículo...");
		var formvalid=true;
		var formularioOK=true;
		$("#inpFechaInspeccion,#inpObserva").each(function(i){
		  formvalid=validateFields($(this));
		  if (!formvalid){
		    formularioOK=false;
		    e.preventDefault();
		  }
		});//each
		if (formularioOK){
			insertarInspeccion($("#form_register_inspeccion").serializeArray());
		}
		else
		{
		  console.log("Datos incompletos o erróneos.");
		  $("#barraDeEstado").html("Datos incompletos o erróneos.");      
		}
	});

	//VEHICULOS REVISIONES

	/***********************************/
	/* EVENTO CLIC EN AGREGAR REVISION */
	/***********************************/  
	$("#contenedorAccionesVehiculo").on("click","#btnAgregarRevision",function(e){
		console.log("mostrando ventana emergente...");
		var matricula= $(this).attr("data-id");
		seccionFormulario("nuevaRevision",matricula);
	});

	/***********************************/
	/* EVENTO CLIC EN GUARDAR REVISION */
	/***********************************/  
	$("#mensajeModal").on("click","#btnGuardarRevision",function(e){
		console.log("agregando revision al vehículo...");
		var formvalid=true;
		var formularioOK=true;
		$("#inpFechaRevision,#inpObserva").each(function(i){
		  formvalid=validateFields($(this));
		  if (!formvalid){
		    formularioOK=false;
		    e.preventDefault();
		  }
		});//each
		if (formularioOK){
			insertarRevision($("#form_register_revision").serializeArray());
		}
		else
		{
		  console.log("Datos incompletos o erróneos.");
		  $("#barraDeEstado").html("Datos incompletos o erróneos.");      
		}
	});

	//VEHICULOS SEGUROS

	/*********************************/
	/* EVENTO CLIC EN AGREGAR SEGURO */
	/*********************************/  
	$("#contenedorAccionesVehiculo").on("click","#btnAgregarSeguro",function(e){
		console.log("mostrando ventana emergente...");
		var matricula= $(this).attr("data-id");
		seccionFormulario("nuevoSeguro",matricula);
	});

	/*********************************/
	/* EVENTO CLIC EN GUARDAR SEGURO */
	/*********************************/  
	$("#mensajeModal").on("click","#btnGuardarSeguro",function(e){
		console.log("agregando seguro al vehículo...");
		var formvalid=true;
		var formularioOK=true;
		$("#inpFechaInicioSeguro,#inpFechaFinSeguro,#inpCompany,#inpNumPoliza").each(function(i){
		  formvalid=validateFields($(this));
		  if (!formvalid){
		    formularioOK=false;
		    e.preventDefault();
		  }
		});//each
		if (formularioOK){
			var fi=($("#inpFechaInicioSeguro").val()!="")?$("#inpFechaInicioSeguro").val().split("-"):0;
      		var ff=($("#inpFechaFinSeguro").val()!="")?$("#inpFechaFinSeguro").val().split("-"):1;
      		var fecIni=new Date(fi[2],fi[1]-1,fi[0]);
      		var fecFin=new Date(ff[2],ff[1]-1,ff[0]);

			if (fecIni<fecFin)
			{
				insertarSeguro($("#form_register_assure").serializeArray());
				$("#inpFechaInicioSeguro,#inpFechaFinSeguro").attr('style','');
			}
			else
			{
				$("#inpFechaInicioSeguro,#inpFechaFinSeguro").css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
			}
		}
		else
		{
		  console.log("Datos incompletos o erróneos.");
		  $("#barraDeEstado").html("Datos incompletos o erróneos.");      
		}
	});

	/*********************************/
	/* EVENTO FOCUS OUT FECHA FIN SEGURO */
	/*********************************/  
	$("#mensajeModal").on("focusin","#inpCompany",function(e){
		console.log("comprobando fechas...");
		var fis, ffs, fecInSe, fecFiSe;
      	fis=($("#inpFechaInicioSeguro").val()!="")?$("#inpFechaInicioSeguro").val().split("-"):0;
      	ffs=($("#inpFechaFinSeguro").val()!="")?$("#inpFechaFinSeguro").val().split("-"):1;

      	if (fis!=0)
		{
			fecInSe=new Date(fis[2],fis[1]-1,fis[0]);        
		}
		else
		{
			fecInSe=fis;
		}

		if (ffs!=1)
		{
			fecFiSe=new Date(ffs[2],ffs[1]-1,ffs[0]);
		}
		else
		{
			fecFiSe=ffs;
		}

		console.log(fis + "  "+ ffs );

      	if (fecInSe!=0 && fecFiSe!=1)
      	{
      		console.log("entró 1");
      		if (fecInSe>=fecFiSe)
      		{
      			console.log("entró 2");
        		$("#inpFechaInicioSeguro,#inpFechaFinSeguro").css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
      		}
      		else
      		{
      			$("#inpFechaInicioSeguro,#inpFechaFinSeguro").attr('style','');
      			console.log("entró 3");

      		}
      	}
	});

	// /**********************************/
	// /* EVENTO CLIC EN ELIMINAR SEGURO */
	// /**********************************/  
	// $('#contenedorAccionesVehiculo').on("click", "input[id^='delete_']", function(e){
	// 	//console.log("borrando " + $(this).data("id") + " y está " + $(this).prop("checked"));
	// 	var miData=$(this).data("id");
	// 	if ($(this).prop("checked"))
	// 	{
	// 	  $("#btnEliminarSeguro").removeClass("disabled");
	// 	  $("#btnEliminarSeguro").attr("data-eli",miData);
	// 	  $("input[name='delete']").prop("checked",false);
	// 	  $(this).prop("checked",true);
	// 	}
	// 	else
	// 	{
	// 	  $("#btnEliminarSeguro").addClass("disabled").removeAttr("data-eli");
	// 	}

	// });


});//ready