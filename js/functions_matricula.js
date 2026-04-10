function seccionAltaMatricula(){
	var contenido="<div class='large-12 columns'>	<article class='negrita centrado tituloCursoMatricula'>ALUMNO A MATRICULAR</article></div><div class='row' id='contenedorAltaExpediente'>			<table id='tablaCabeceraAlumno'><tbody>			<tr>				<td width='25%'>				<label for='inp_id'><i class='fi-magnifying-glass'></i>	Código Alumno (ID):										<input type='text' id='inp_id' name='inp_id' maxlength='50'  tabindex='1' class='cajaBusquedaAlumnoMatricula'/>	<a class='button alert' id='btnBuscar'>Buscar</a>							</label>								</td><td id='resumen' class='centrado'></td></tr></tbody></table><form method='post' action='' id='form_register_matricula' data-abide><table id='tablaNuevoExpediente'></table></form></div>";

	$("#contenedorNuevaMatricula").html(contenido).removeClass("oculto");
	$("#inp_id").ForceNumericOnlySinDecimal();
	$("#inp_id").focus();
	/*$("#sltAnioEscolar").load('./inc/cargaranioescolar.php');//rellenar sltanioEscolar
	$("#sltFMC").load('./inc/cargarfmc.php');//rellenar sltFMC
	$("#sltInstrumento").load('./inc/cargarinstrumento.php');//rellenar sltInstrumento
	$("#sltActividad").load('./inc/cargaractividad.php');//rellenar sltActividad*/
	
} // seccion Alta Matricula
function seccionConsultarPagos(){
	var contenido="<div class='large-12 columns'>	<article class='negrita centrado'><h4>Consultar Pagos</h4></article></div><div class='row' id='contenedorInformes'>			<table id='tablaRecogidaDatos'><tbody>			<tr>				<td width='100%'>				<label for='sltAnios'><i class='fi-calendar'></i>	Curso Escolar:<select id='sltAnios'></select></label><label for='sltCuotas'><i class='fi-bitcoin'></i>	Cuota:<select id='sltCuotas'></select></label> <a class='button alert' id='btnBuscar'>Efectuar Consulta</a>								</td></tr></tbody></table><div class='row oculto' id='resultadoConsultaPagos'></div></div>";

	$("#contenedorInformes").html(contenido).removeClass("oculto");
	//$("#inp_id").ForceNumericOnlySinDecimal();
	//$("#inp_id").focus();
	$("#sltAnios").load('./inc/cargaranioescolar.php');//rellenar sltanioEscolar
	$("#sltCuotas").load('./inc/cargarselectcuotas.php');//rellenar sltanioEscolar
	/*$("#sltFMC").load('./inc/cargarfmc.php');//rellenar sltFMC
	$("#sltInstrumento").load('./inc/cargarinstrumento.php');//rellenar sltInstrumento
	$("#sltActividad").load('./inc/cargaractividad.php');//rellenar sltActividad*/
	
} // seccion Alta Matricula

function seccionListarMatricula(){
	var contenido="<hr/><article class='centrado'><h4>Listado de Matrículas</h4></article><br /><article class='centrado'>Curso:<select id='sltAnios'></select></article><div class='row'><div class='large-12 columns' id='contenedorTabla'></div></div>";

//+ $("#anioActual").val() + "-" + (parseInt($("#anioActual").val()) + 1) +
	$("#info").addClass("oculto");
	$("#contenedorVerMatriculas").html(contenido).removeClass("oculto");
	$("#sltAnios").load("./inc/cargaranioescolar.php");
	cargarElementos($("#anioActual").val());

	//EVENTO CAMBIO DE AÑO
	$("#sltAnios").on("change",function(e){
		if ($(this).val()!= 0)
			cargarElementos( $(this).val() );
	});

	
} // seccion Buscar Alumno

function localizarAlumno(ident) {
	//alert("llega");
	var fecha = new Date();
	var anio = fecha.getFullYear();

	$.getJSON("./inc/localizaralumno.php",{'ident':ident,'anio_escolar':anio},function(data){
		if (data[0]=="Sindatos"){
			//El alumno no existe
			result="<span class='negrita'>El alumno no existe</span>";
			$("#tablaNuevoExpediente").html("");
		}
		else{
			// $("#resumen").html("<span class='rojo'>El alumno no existe</span>");
			result="<div class='row'><div class='large-12 colums'><span class='negrita'>" + data['alumno'][0].apellidos + ", " + data['alumno'][0].nombre + "</span>";
			if (data['alumno'][0].dni!=null)
				result+=" - ("+ data['alumno'][0].dni +")";
			
			if (typeof data['padres'] != 'undefined')
			{
				result +="<hr width='50%' />";
				$.each(data['padres'],function(clave,valor){
				 	//console.log("Mostrando " + clave + ": " + data['padres'][clave].nombre);
				 	if (data['padres'][clave].genero==0)
				 		result+="Padre: " + data['padres'][clave].nombre + " " + data['padres'][clave].apellidos + " (" + data['padres'][clave].dni +")<br />";
				 	else
				 		result+="Madre: " + data['padres'][clave].nombre + " " + data['padres'][clave].apellidos + " (" + data['padres'][clave].dni +")";
				});
			}
			result+="</div></div>";
			if (typeof data['matricula'] != 'undefined')
				$("#tablaNuevoExpediente").html("<tbody><tr><td class='centrado destacado'><span class='size-21'><i class='fi-alert'></i>&nbsp;" + data['matricula'][0] + "</span></td></tr></tbody>");
				//alert("llega");
			else{
				$("#tablaNuevoExpediente").html("<tbody><tr><td><a id='btn-ComenzarMatriculacion' class='customButton'>INICIAR PROCESO DE MATRICULA: CURSO " + anio + " - " + (anio+1)+ "</a></td></tr></tbody>");
			}
		}	
		$("#resumen").html(result);

			//BOTON COMENZAR MATRICULA
		$("#btn-ComenzarMatriculacion").on("click", function(e){
			$("#inp_id").prop("disabled",true);
			
			//console.log("Click en matriculacion");
			$("#btnBuscar").addClass("oculto");
			$(this).closest("tbody").remove();
			var formulario="<tbody>";
			formulario+="<tr><td colspan='5' class='centrado'><span class='subtituloMatricula'>Matrícula Nueva : Curso "+ anio + " - " + (anio+1)+"<span class='oculto' id='anioEsc'></span></span></td></tr>";
			formulario+="<tr><td colspan='5' class='centrado'><span class='negrita'>Información sobre Formación</span></td></tr>";
			formulario+="<tr id='filaFormacion'><td width='25%'><select id='sltTipoFormacion' ><option value='0'>... Seleccione</option><option value='1'>Formación Musical</option><option value='2'>Instrumento</option><option value='3'>Actividad</option></select></td><td width='25%'><select id='sltFormacion' ></select></td><td width='25%'><select id='sltCurso'></select></td><td class='centrado' width='25%'><a id='btn-agregarFormacion' class='button disabled'>Añadir Materia</a></td></tr>";
			formulario+="</tbody>";
			$("#tablaNuevoExpediente").html(formulario);
			$("#tablaNuevoExpediente tr:first td").append("<input type='hidden' name='inp_alumno' value='" + $("#inp_id").val() + "' />");
			$("#anioEsc").load("./inc/cargaranioescolaractual.php",{'anyo': anio});


			//CARGA DE DATOS EN SELECT BASADO EN TIPO DE FORMACION
			$("#sltTipoFormacion").on("change",function(e){
				//alert("llega");
				if ( $(this).val()==1 ){
					$("#sltFormacion").load("./inc/cargarselectformacion.php",{combo: 1});
				}else if ( $(this).val()==2 ){
					$("#sltFormacion").load("./inc/cargarselectformacion.php",{combo: 2});
				}else if ( $(this).val()==3 ){
					$("#sltFormacion").load("./inc/cargarselectformacion.php",{combo: 3});
				}
			});
			//CARGA DE DATOS EN SELECT BASADO EN TIPO DE FORMACION

			//CARGA DE DATOS EN SELECT BASADO EN FORMACION
			$("#sltFormacion").on("change",function(e){
				if ( $("option:selected",this).text().indexOf("INFANTIL") != -1 )
					$("#sltCurso").load("./inc/cargarselectcurso.php",{infantil: 1});
				else
					$("#sltCurso").load("./inc/cargarselectcurso.php",{infantil: 0});
			});
			//CARGA DE DATOS EN SELECT BASADO EN FORMACION
			//SELECT DE CURSOS
			$("#sltCurso").on("change",function(e){
				if ( $("option:selected",this).val() >0 )
					$("#btn-agregarFormacion").removeClass("disabled");
				else
					$("#btn-agregarFormacion").addClass("disabled");
				
			});
			//SELECT DE CURSOS

			//BOTON AÑADIR MATRICULA
			$("#btn-agregarFormacion").on("click",function(e){
				var matriculas;
				var texto=$("#sltFormacion option:selected").text();
				texto += " (" + $("#sltCurso option:selected").text() + ")";
				var ident= $("#sltTipoFormacion option:selected").val() + "-" + $("#sltFormacion option:selected").val() + "-" + $("#sltCurso option:selected").val() ;
				if (contadorMaterias==0){
					matriculas="<tr><td colspan='5'><table id='tablaListaMatriculas'><thead><tr><th>Formación en la que se matricula</th><th>Acción</th></thead><tbody><tr><td>" + texto + "</td><td><a id='btn-QuitarFormacion"+ident+"' class='customButton' data-id='" + ident + "'>Quitar formación</a><input type='hidden' id='formacion"+ident+"' name='formacion"+ident+"' value='" + ident + "' /></td></tr></tbody><tfoot><tr><td colspan='2'><a class='customButton' id='btnContinua'>Finalizar la selección de formación y continuar</a></td></tr></tfoot></table></td></tr>";
					$("#tablaNuevoExpediente tbody").append(matriculas);
					materias.push(ident);
				}else{
					if (materias.indexOf(ident)== -1){
						$("#tablaListaMatriculas tbody").append("<tr><td>" + texto + "</td><td><a id='btn-QuitarFormacion"+ident+"' class='customButton' data-id='" + ident + "'>Quitar formación</a><input type='hidden' id='formacion"+ident+"' name='formacion"+ident+"' value='" + ident + "' /></td></tr>");
						materias.push(ident);
					}
				}
				contadorMaterias++;
				$(this).addClass("disabled");
				console.log("despues de añadir " + materias);
			});
			//BOTON AÑADIR MATRICULA

			//BOTONES QUITAR FORMACION
			$("#tablaNuevoExpediente").on("click","a[id^='btn-QuitarFormacion']",function(e){
				//console.log(e.target.data("id"));
				elementoAEliminar=materias.indexOf($(this).data("id"));
				materias.splice(elementoAEliminar,1);
				contadorMaterias--;
				$(this).closest("tr").remove();
				if (contadorMaterias==0){
					$("#btn-agregarFormacion").removeClass("disabled");
					$("#tablaListaMatriculas").closest("tr").remove();
				}
				console.log("Despues de eliminar" + materias);
			});
			//FIN BOTONES QUITAR FORMACION

			//BOTON CONTINUAR DESPUES DE FORMACION
			$("#tablaNuevoExpediente").on("click","#btnContinua",function(e){
				//alert("llega");
				$("a[id^='btn-QuitarFormacion']").remove();
				$("#tablaListaMatriculas tbody tr").find("td:last").append("<span class='rojo'>Aceptada</span>");
				$("#tablaListaMatriculas tfoot").remove();
				$("#filaFormacion").remove();
				var cadena="<tr><td colspan='5'>Información sobre Pagos</td></tr>";
				cadena+="<tr id='filaPago'><td width='20%'><label for='inp_importeTotal'>Importe Total del Curso:<input type='text' id='inp_importeTotal' name='inp_importeTotal' tabindex='1' /></label></td><td width='20%'><label for='inp_matricula'>Importe Matrícula:<input type='text' id='inp_matricula' name='inp_matricula' tabindex='2' /></label></td><td class='centrado' width='20%'><label for='sltBonifica'>Bonificación:<select id='sltBonifica' name='sltBonifica' tabindex='3'></select></label></td><td width='20%'><label for='inp_abonoCursoCompleto'>Abona Curso Completo:<input type='checkbox' id='inp_abonoCursoCompleto' name='inp_abonoCursoCompleto' tabindex='4' /></label></td><td class='centrado' width='20%'><label for='inp_abonoEnCaja'>Abona En Caja:<input type='checkbox' id='inp_abonoEnCaja' name='inp_abonoEnCaja' tabindex='5' /></label></td></tr>";
				cadena +="<tr><td colspan='5' class='centrado'><a class='small button botonMatricula' id='btn-registrar-matricula'>Registrar Matrícula</a></td></tr>";
				$("#tablaNuevoExpediente").append(cadena);
				$("#sltBonifica").load("./inc/cargarselectbonifica.php");
				// $("#inp_importeTotal,#inp_matricula").on("keyup",function(ev){
				// 	console.log(ev.keyCode);
				// });
				$("#inp_importeTotal,#inp_matricula").ForceNumericOnly();
				$("#inp_importeTotal").focus();

				$("#contenedorNuevaMatricula").on("click","#btn-registrar-matricula",function(e){
					// $("#form_register_matricula").submit();
					var formvalid=true;
					var formularioOK=true;
					$("#form_register_matricula input[type=text]").each(function(i){
						formvalid=validateFields($(this));
						if (!formvalid){
							formularioOK=false;
						 	e.preventDefault();
						 }
					});//each
					if (formularioOK){
						agregarMatricula( $("#form_register_matricula").serializeArray() );
					}
				});

			});
			//FIN BOTON CONTINUAR DESPUES DE FORMACION

		});
		//FIN BOTON COMENZAR MATRICULA
	});
}// localizar Alumno

function cargarElementos(anio){
	$("#contenedorTabla").addClass("boton-loading centrado").html("<img src='./../img/ajax-loader.gif' alt='Cargando ...'/>&nbsp;");
	$.getJSON("./inc/cargarexpedientes.php",{"anio":anio},function(data){
		$("#contenedorTabla").removeClass("boton-loading centrado")
		var items;
		items="<table id='mitabla'><thead><th rel='0'>Exp.</th><th rel='1' class='datatable-nosort'>Alumno</th><th rel='2'>Bonificado</th><th rel='3'>Estado</th></thead><tbody>";

		if (data.indexOf("Sindatos") == -1)
			$.each(data,function(clave,valor){
				var alu = valor.apellidos + ", " + valor.nombre;
				if (valor.dni != null)
					alu+=" (" + valor.dni + ")";

				items += "<tr><td class='centrado'><span class='link' id='verExpediente_" + valor.ref + "' title ='Ver Expediente' data-id=" + valor.ref + " data-name='" + valor.ref + "' >" + valor.ref +  "</span></td><td>"+ alu + "</td><td>" + valor.bonificacion + "</td><td>";

				
				if (valor.baja==1)
					items += "Baja";
				else
					items += "Alta";
				items += "</td></tr>";
			});//each
		else
			items+="<tr><td></td><td></td><td>No existen datos que mostrar</td><td></td><td></td></tr>";

		items+="</tbody></table>";
		$("#contenedorTabla").html(items);

		if (data.indexOf("Sindatos")==-1)
			tablaEspecialConDatosExpedientes($("#mitabla"));
		else
			tablaEspecialSinDatos($("#mitabla"));


		//console.log(usuarios);
	});//getJSON
}

function agregarMatricula(datos){
	console.log("llega");
	$("#inp_importeTotal,#inp_matricula,#sltBonifica,#inp_abonoCursoCompleto,#inp_abonoEnCaja").prop({disabled:true});

	
	$.ajax({
	    url:"./inc/registrarmatricula.php",
	    type: 'POST',
	    async: true,
	    dataType: 'text',
    	beforeSend: function (){
	    	$("#btn-registrar-matricula").html("<img src='./../img/ajax-loader.gif' alt='Cargando ...'/> REGISTRANDO");
		},
	    data:{'info':datos},
	    success: function(res){
	    	$("#btn-registrar-matricula").closest("td").css({"background-color":"coral","color":"white"}).html("<span class='centrado size-21'>Matrícula Registrada con el número <strong>" + res + "</strong></span>");
	    	$("#info").addClass("oculto");
			/* CONTROL DE BOTONES DE MENU */
			$("#btn-agregarMatricula").removeClass("desactivado").prop("disabled",false);
			$("#btn-alumnoBuscar").removeClass("desactivado").prop("disabled",false);
			$("#btn-agregarAlumno").removeClass("desactivado").prop("disabled",false);
			$("#btn-matriculaListar").removeClass("desactivado").prop("disabled",false);
			/******************************/
			botonActiva=0;
			contadorMaterias=materias.length=0;

	    	/*if (res!=0){
	    		msg= "<div data-alert class='callout alert-box success radius'>Se ha creado el alumno <strong>" + res + "</strong><a href='#' class='close'>&times;</a></div>";
	    		$("#contenedorAltaAlumno").prepend(msg);
	    		$(document).foundation('alert', 'reflow');
				$("#btn-agregar-nuevo-alumno").off("click");
				$("#btn-agregar-nuevo-alumno").closest(".row").closest(".row").remove();
				$("#inp_nombre,#inp_apellidos,#inp_direccion,#inp_dni_alumno,#sltGenero, #inp_municipio, #sltMunicipio,#inp_telefono,#inp_observaciones,#inp_fechaNac").val("");
				$("#tablaPadres,#tablaTelefonos,#tablaObservaciones").html("").addClass("oculto");
	    	}
	    	else{
	    		msg="<div data-alert class='callout alert-box alert radius'>Error<a href='#' class='close'>&times;</a></div>";
	    		$("#contenedoAltaAlumno").prepend(msg);
		    	$(document).foundation('alert', 'reflow');
	    	}
*/

	    },
	    error: function (x,y){
	    	alert("error");
	    }
	});//ajax
}//agregar matricula

function cargarMatricula(ident){
	$.getJSON("./inc/cargarmatricula.php",{ref:ident}, function(data, status, xhr){
		materias.length=0;
		contadorBajas=contadorAsignaturas=0;
        var cadena;
		cadena = "<article class='centrado'><h4>Resumen Matrícula <strong>" + data['matricula'].ref + "</strong></h4><input type='hidden' value='" + data['matricula'].ref + "' id='numeroMatricula' /></article>";
		var aescolar=data['matricula'].anio_escolar;
		//var alum=data['matricula'].dni != null?"<span>( " + data['matricula'].dni + " )</span> - ":"";
		//alum += data['matricula'].apellidos + ", " + data['matricula'].nombre + " (" + data['matricula'].alu+ ")<br />";

		var alum = "<input type='hidden' value='" + data['matricula'].alu + "' id='numeroAlumno' />" + data['matricula'].alu + " - " + data['matricula'].apellidos + ", " + data['matricula'].nombre;//+ " (" + data['matricula'].alu+ ")<br />";
		alum+=data['matricula'].dni != null ? " <span>( " + data['matricula'].dni + " )</span>" : "";
		var tipoAl=data['matricula'].genero == 1?"Alumna":"Alumno";
		
		/*if (typeof data['padres'] != 'undefined'){
			$.each( data['padres'],function(clave,valor){
				var genero=data['padres'][clave].generoPa==1?"Madre: ":"Padre: ";
				// alum += "-> " + data['padres'][clave].apellidosPa + ", " + data['padres'][clave].nombrePa + " (" + data['padres'][clave].dniPa +")<br/>";
				alum += genero +  " <u class='rojo'>" + data['padres'][clave].dniPa + "</u> - " + data['padres'][clave].apellidosPa + ", " + data['padres'][clave].nombrePa + "<br/>";
			});
		}*/
		var bajac=1;

		cadena += "<div class='callout'><div class='row'><div class='large-2 columns'><label>Curso Escolar</label><strong>" + aescolar + "</strong></div>";

		if (typeof data['bajac'] != 'undefined')
		{
			var stringFecha=convertirFecha(data['bajac'].fecha_decreto);
			cadena += "<div class='large-8 columns'><label>Baja Completa Aceptada (Fecha Decreto)</label><strong>" + stringFecha + "</strong></div><div class='large-2 columns imgbaja'><br/><br/></div>";
		}
		else
		{
			cadena += "<div class='large-10 columns' id='cadenaBajaCompleta'></div>";
			bajac=0;
		}
		cadena += "</div><hr /><div class='row'>";

		cadena += "<div class='large-12 columns'><label>" + tipoAl + "</label><strong>" + alum + "</strong></div>";

		cadena += "</div><hr /><div class='row'>";
		var arrayCajita=Array();

		if (typeof data['actividad'] != 'undefined'){
			var act="";
			$.each(data['actividad'],function(clave,valor){
				//materias.push(data['actividad'][clave].actividad + " (" + data['actividad'][clave].curso + ")");
				contadorAsignaturas++;
				act+= "<span data-consulta='yes' data-asignatura='" + data['actividad'][clave].actividad + " (" + data['actividad'][clave].curso + ")' class='size-14'><i class='fi-play'></i> " + data['actividad'][clave].actividad + " (" + data['actividad'][clave].curso + ")</span><br />";
				//act += data['actividad'][clave].actividad ;
			});//each
			arrayCajita.push(act);
			arrayCajita.push("Actividades");
			//cadena += "<div class='large-4 columns'><label>Actividades</label><strong>" + act + "</strong></div>";
			//cadena += "</div>";
		}

		if (typeof data['fmc'] != 'undefined'){
			var act="";
			$.each(data['fmc'],function(clave,valor){
				//materias.push(data['fmc'][clave].fmc + " (" + data['fmc'][clave].curso + ")");
				contadorAsignaturas++;
				act+= "<span data-consulta='yes' data-asignatura='" + data['fmc'][clave].fmc + " (" + data['fmc'][clave].curso + ")'class='size-14'><i class='fi-play'></i> " + data['fmc'][clave].fmc + " (" + data['fmc'][clave].curso + ")</span><br />";
				//act += data['actividad'][clave].actividad ;
			});//each
			arrayCajita.push(act);
			arrayCajita.push("Formación Continua");

			//cadena += "<div class='large-4 columns'><label>Formación Musical Continua</label><strong>" + act + "</strong></div>";
			//cadena += "</div>";
		}

		if (typeof data['instrumento'] != 'undefined'){
			var act="";
			$.each(data['instrumento'],function(clave,valor){
				//materias.push(data['instrumento'][clave].instrumento + " (" + data['instrumento'][clave].curso + ")");
				contadorAsignaturas++;
				act+= "<span data-consulta='yes' data-asignatura='" + data['instrumento'][clave].instrumento + " (" + data['instrumento'][clave].curso + ")'class='size-14'><i class='fi-play'></i> " + data['instrumento'][clave].instrumento + " (" + data['instrumento'][clave].curso + ")</span><br />";
				//act += data['actividad'][clave].actividad ;
			});//each
			arrayCajita.push(act);
			arrayCajita.push("Instrumentos");

			//cadena += "<div class='large-4 columns'><label>Instrumentos</label><strong>" + act + "</strong></div>";
			//cadena += "</div>";
		}

		for (var i=0; i<6; i+=2){
			if (typeof arrayCajita[i] != 'undefined'){
				cadena += "<div class='large-4 columns'><label>" + arrayCajita[i+1] + "</label><strong>" + arrayCajita[i] + "</strong></div>";
			}
			else{
				cadena += "<div class='large-4 columns'>&nbsp;</div>";
			}

		}
		var pco=data['matricula'].pago_curso_completo==1?"Sí":"No";
		completo=data['matricula'].pago_curso_completo==1?1:0;
		var pca=data['matricula'].pago_en_caja==1?"Sí":"No";
		
			


		cadena += "</div><hr /><div class='row'>";

		cadena += "<div class='large-2 columns'><label>Importe Total</label><strong class='centrado'>" + data['matricula'].importe_total + " €</strong></div>";
		cadena += "<div class='large-2 columns'><label>Importe Matrícula</label><strong>" + data['matricula'].importe_matricula + " €</strong></div>";

		cadena += "<div class='large-3 columns'><label>Pago Curso Completo</label><strong>" + pco + "</strong></div>";
		cadena += "<div class='large-2 columns'><label>Pago en caja</label><strong>" + pca + "</strong></div>";
		cadena += "<div class='large-3 columns'><label>Bonificación</label><strong>" + data['matricula'].bonificacion + "</strong></div>";

		cadena += "</div></div>";

		/* PAGOS */

		cadena += "<div class='row'><div class='large-12 columns'><article class='centrado'><h6>Pagos";
		if (estado==31 || estado ==11)
			if ( bajac != 1 )
				cadena +="&nbsp;<a id='btn-insertDocumento' data-insert='0'><i title='Adjuntar Documento' class='fi-plus'></i></a>";
		cadena += "</h6></div></div><form id='form_subir_documento' enctype='multipart/form-data'><div class='row'><div class='large-12 columns'><input name='txtRef' id='txtRef' type='hidden' value='" + data['matricula'].ref + "' /><input type='hidden' id='anioEscolar' name='anioEscolar' value='" + aescolar + "' /><table id='tablaPagos' data-ref=" + data['matricula'].ref + " width='100%'><thead><tr><th width='5%' class='centrado'><i class='fi-paperclip'></i></th><th width='15%' >Cuota</th><th width='15%' >Fecha</th><th width='15%'>Importe</th><th>&nbsp;</th><th width='5%'>&nbsp;</th></tr></thead><tbody>";


		if (typeof data['pago'] != 'undefined'){
			var cuotas=Array();
			$.each(data['pago'],function(clave,valor){
				var stringFecha=convertirFecha(data['pago'][clave].fecha);

				
				cadena += "<tr><td class='centrado'><i class='fi-euro' data-idcuota='" + data['pago'][clave].idcuota + "'></i></td><td>" + data['pago'][clave].cuota + "</td><td>" + stringFecha + "</td><td>" + parseFloat(data['pago'][clave].importe_pago).toFixed(2) + "</td><td><a id='link-descargar-" + data['pago'][clave].refpago + "' href='./em/" + data['pago'][clave].ruta   + "' target='_blank' data-id='" + data['pago'][clave].refpago + "'>Ver/Descargar</a></td><td></td></tr>";

				cuotas.push(data['pago'][clave].idcuota);

			});//each
			cadena+="<input type='hidden' id='cuotasSeleccionadas' value='" + cuotas + "' />";
		}
		else{
			cadena+="<tr><td class='vacia' colspan='6'>No se ha adjuntado ningún documento de pago aún.</td></tr>";
		}

		cadena += "</tbody></table></div></div></form>";

		/* FIN PAGOS */

		/* BAJAS PARCIALES */
		var subCadena="";
		if (typeof data['bajap'] != 'undefined'){
			// cadena+="<p>-------</p>";
			//if (situ==0) 
				//Si data-insert es 0, es que todavia no se ha hecho click en el enlace para añadir una fila. Cambiará a 1 en caso de comenzar con una insercion. De esta manera se evita que se inserten filas sin haber guardado el anterior.
			$.each(data['bajap'],function(clave,valor){
				contadorBajas++;
				materias.push(data['bajap'][clave].asignatura);
				var stringFecha=convertirFecha(data['bajap'][clave].fecha_baja);
				subCadena += "<tr><td class='centrado'><i class='fi-dislike'></i></td><td class='centrado'>"+ stringFecha + "</td><td><strong>" + data['bajap'][clave].asignatura + "</strong></td><td></td></tr>";
			});//each
		}
		else{
			subCadena+="<tr><td class='vacia' colspan='4'><input type='hidden' id='sinBajas' />No se han registrado bajas de asignaturas.</td></tr>";
		}
		cadena += "<div class='row'><div class='large-12 columns'><article class='centrado'><h6>Bajas Parciales";
		cadena +="&nbsp;";
		if (estado==31 || estado ==11)
			if ( (contadorBajas<contadorAsignaturas) && bajac != 1 )
				cadena+="<a id='btn-insertBajaParcial' data-insert='" + contadorBajas + "'><i title='Añadir Asignatura' class='fi-plus'></i></a>";
		cadena += "</h6></article></div></div><form id='form_registrar_bajap'><div class='row'><div class='large-12 columns'><input type='hidden' name='txtRef2' value='" + data['matricula'].ref + "' /><table id='tablaBajasParciales' data-ref=" + data['matricula'].ref + " width='100%'><thead><tr><th width='5%' class='centrado'><i class='fi-bold'></i></th><th width='15%' class='centrado'>Fecha</th><th>Asignatura</th><th width='5%'></th></tr></thead><tbody>";
		cadena += subCadena;		
		cadena += "</tbody></table></div></div></form><div class='row'><div class='large-6 columns a-la-derecha'><a class='button' id='btn-volver-lista-matriculas'>Volver</a></div>";
		
		if (estado==31 || estado ==11)
			if (bajac==0)
			{
				cadena+="<div class='row'><div class='large-6 columns'><a class='button warning' id='btn-dar-baja-completa' data-open='modalBajaCompleta'>Dar de Baja</a></div><div class='tiny reveal' id='modalBajaCompleta' data-reveal></div></div>";
				//$("#contenedorEditarMatricula").removeAttr("style");
			}

			//$("#contenedorEditarMatricula").css("background-color","#EC5840");

		cadena+="</div>";

		//cadena += "</tbody></table></div></div></form>";

		/* FIN BAJAS PARCIALES */


		$("#contenedorEditarMatricula").html(cadena);

		// DAR DE BAJA COMPLETA
		$("#btn-dar-baja-completa").on("click",function(e){
			var contenido="<h3>Aplicar Baja Completa</h3><p class='lead'>Introduzca la <strong>Fecha del Decreto</strong> por el que se aprueba la baja definitiva en el curso. Este proceso es <strong>irreversible</strong>.</p><p class='lead'><label for='txtBajaCompleta'></label><input type='text' readonly='readonly' id='inp_fechaBajaCompleta' /></p><div class='large-6 columns centrado'><a class='button' id='btn-si'>Aceptar</a></div><div class='large-6 columns centrado'><a class='button' id='btn-no' data-close>Cancelar</a></div>";
			$("#modalBajaCompleta").html(contenido);
			$("#inp_fechaBajaCompleta").datepicker();
			var popup=new Foundation.Reveal($('#modalBajaCompleta'));
			popup.open();

			//BOTON SI
			$("#btn-si").on("click",function(ev){
				//console.log("estamos ahora " + $("#numeroMatricula").val());
				if ( $("#inp_fechaBajaCompleta").val() != "")
					$.ajax({
						url:'./inc/dardebajamatricula.php',
						type:'POST',
						data: {'fecha':$("#inp_fechaBajaCompleta").val() , 'mat':$("#numeroMatricula").val()},
					    dataType:"text",
					    beforeSend: function(){
					    	$("#btn-si").html("<img src='./../img/ajax-loader-blue.gif' alt='Cargando ...'/> Aplicando la Baja");
					    },
					    success: function(resp){
					    	var n=$("#numeroMatricula").val();
					    	nexp="verExpediente_"+n;

					    	$("#contenedorVerMatriculas span[id='" + nexp + "']").closest("tr").find("td:last").html("Baja");

					    	$("#cadenaBajaCompleta").html("<div class='large-10 columns'><label>Baja Completa Aceptada (Fecha Decreto)</label><strong>" + $("#inp_fechaBajaCompleta").val() + "</strong></div>");
					    	popup.close();
					    	$("#btn-dar-baja-completa,#modalBajaCompleta").remove();


					    }

				});//ajax
				// popup.close();
			});
			//FIN BOTON SI
		});
		//FIN DAR DE BAJA COMPLETA

		//AÑADIR UN NUEVO DOCUMENTO PAGO
	    $("#btn-insertDocumento").on("click", function(e){
            
            $("#tablaPagos").append("<tr><td class='a-la-derecha'><a id='btn-descartarPago'><i title='Descartar' class='fi-x size-21'></i></a></td><td><select id='sltCuota' name='sltCuota'></select></td><td><input type='text' name='txtFechaPago' id='txtFechaPago' readonly='readonly'/></td><td><input type='text' name='txtImporte' id='txtImporte' /></td><td><input type='file' name='txtFile' id='txtFile' accept='application/pdf'/></td><td><a title='Guardar Documento' id='btn-guardarDocumento'><i class='fi-save size-21'></i></a></td></tr>");

            $("#sltCuota").load("./inc/cargarselectcuotas.php",{'selecciona':$("#cuotasSeleccionadas").val(),'cursoCompleto':completo});

            $('#txtFechaPago').datepicker();
            var f= new Date();
            $('#txtFechaPago').val(convertirFecha(f));
            $("#txtImporte").ForceNumericOnly();
            //cargarSelectCuotas($("#cuotasSeleccionadas"));
            //$("#txtNuevoTramite").focus();
            // <input type='text' maxlength='255' name='txtFileDescripcion' id='txtFileDescripcion'/>
            $(this).attr("data-insert",1);
            //$("#btn-insertDocumento").off("click");btn-insertBajaParcial
            $("#btn-insertBajaParcial").addClass("oculto");
            $("#btn-insertDocumento").addClass("oculto");

            //CANCELAR LA INTRODUCCION DE UN DOCUMENTO DE PAGO
    		$("#btn-descartarPago").on("click", function(e){
    			$("#btn-insertBajaParcial").removeClass("oculto");
            	$("#btn-insertDocumento").removeClass("oculto");
            	$(this).closest("tr").remove();
    		});
            //FIN CANCELAR LA INTRODUCCION DE UN DOCUMENTO DE PAGO

            //GUARDAR NUEVO DOCUMENTO DE PAGO
    		$("#btn-guardarDocumento").on("click", function(e){
    			//validaciones 
    			var estado=true;

    			var patronNumeros=/^[0-9]+(\.[0-9]+)?$/;
				if (!patronNumeros.test($("#txtImporte").val())){
					$("#txtImporte").css({'background-color':'rgba(255,157,157,0.3)','border':'1px solid #ff9090'});
					estado=false;
				}
				else
					$("#txtImporte").attr('style','');

				if ( ( $("#sltCuota option:selected").val() ) == 0 ){
					$("#sltCuota").css({'background-color':'rgba(255,157,157,0.3)','border':'1px solid #ff9090'});
		            estado=false;
		        }
		        else{
		            $("#sltCuota").attr('style','');
		        }

		        if ($("#txtFile").val().length == 0 || $('#txtFile')[0].files[0].size>1048576){
		        	$("#txtFile").closest("td").css({'background-color':'rgba(255,157,157,0.3)','border':'1px solid #ff9090'});
					estado=false;
		        }
		        else
		        	$("#txtFile").closest("td").attr('style','');

		        //console.log($("#txtFile").val().length);

    			//validaciones


    			if (estado){
		            $("#btn-insertBajaParcial").removeClass("oculto");
           			$("#btn-insertDocumento").removeClass("oculto");
           			$("#tablaPagos tbody tr:last").append("<input type='hidden' value='" + $("#numeroAlumno").val() + "' name='alumno' />")
		            insertarDocumento($("#sltCuota option:selected").val());
		            //if (resu)
		                //console.log($("#sltCuota option:selected").val());
           			$(this).closest("tr").remove();
		        }

    			

    			/*$("#btn-insertBajaParcial").removeClass("oculto");
            	$("#btn-insertDocumento").removeClass("oculto");
    			insertarDocumento();
            	$(this).closest("tr").remove();*/
    		});
            //FIN GUARDAR NUEVO DOCUMENTO DE PAGO

	       // }
	    });
	    //FIN AÑADIR UN NUEVO DOCUMENTO PAGO


        // AÑADIR BAJAS PARCIALES  
	    $("#btn-insertBajaParcial").on("click",function(e){
	        //if ( $(this).attr("data-insert")==0){
	            // console.log($("span[data-consulta='yes']").text());
            var subCadena="";
            // for (var i=0; i<$("span[data-consulta='yes']").length;i++)
            $.each( $("span[data-consulta='yes']") , function(clave,valor){
                //console.log("en " +clave + " hay " + $(this).text());
                console.log("Pasando asignaturas: " + $(this).data('asignatura'));
                console.log("Encontrada: " + materias.indexOf( $(this).data('asignatura')));
                if (materias.indexOf( $(this).data('asignatura')) != -1 )
	                subCadena+="<option value='" + (clave+1) + "' disabled='disabled'>" + $(this).data('asignatura')+ "</option>";
                else
	                subCadena+="<option value='" + (clave+1) + "'>" + $(this).data('asignatura')+ "</option>";

            });
               // console.log($("span[data-consulta='yes']")[i].data("asignatura"));
            //console.log(subCadena);
            $("#tablaBajasParciales").append("<tr><td class='a-la-derecha'><a title='Cancelar/Descargar' id='btn-descartarBaja'><i class='fi-x size-21'></i></a></td><td><input type='text' id='txtFechaBaja' name='txtFechaBaja' readonly='readonly' /></td><td><select id='sltAsignatura' name='sltAsignatura'><option value='0'>--Seleccione Asignatura</option>" + subCadena + "</select></td><td class='a-la-derecha'><a title='Guardar Baja Asignatura' id='btn-guardarBajaParcial'><i class='fi-save size-21'></i></a></td></tr>");
            ordenarSelect('sltAsignatura');
            $('#txtFechaBaja').datepicker();
	            //$("#txtNuevoTramite").focus();
	            //$(this).attr("data-insert",1);
	        //}
	        var f = new Date();
		        //fechaActual = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
		        //var fechaActual=convertirFecha(f);
		    var stringFecha=convertirFecha(f);
		    $('#txtFechaBaja').val(stringFecha);
	        $("#btn-insertBajaParcial").addClass("oculto");
            $("#btn-insertDocumento").addClass("oculto");

            //CANCELAR LA INTRODUCCION DE UNA BAJA PARCIAL
    		$("#btn-descartarBaja").on("click", function(e){
    			$("#btn-insertBajaParcial").removeClass("oculto");
            	$("#btn-insertDocumento").removeClass("oculto");
            	$(this).closest("tr").remove();
    		});
            //FIN CANCELAR LA INTRODUCCION DE UNA BAJA PARCIAL


	        // GUARDAR UNA BAJA PARCIAL
		    $("#btn-guardarBajaParcial").on("click", function(e){
		    	$(this).closest("tr").append("<input type='hidden' name='txtAsignatura' value='" + $("#sltAsignatura option:selected").text() + "' />");
		        //var f = new Date();
		        //fechaActual = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
		        //var fechaActual=convertirFecha(f);
		        if ( ( $("#sltAsignatura option:selected").val() )!= 0 ){
		            insertarBaja($("#form_registrar_bajap").serializeArray());
		            $("#sltAsignatura").attr('style','');
		            $("#btn-insertBajaParcial").removeClass("oculto");
           			$("#btn-insertDocumento").removeClass("oculto");
           			$(this).closest("tr").remove();
		            //console.log("bien");
		        }
		        else{
		            $("#sltAsignatura").css({'background-color':'rgba(255,157,157,0.3)','border':'1px solid #ff9090'});
		            //console.log("mal");
		        }

		    });
		    //FIN GUARDAR UNA BAJA PARCIAL

	    });

	    //FIN AÑADIR BAJAS PARCIALES
	    //VOLVER ATRAS LISTA MATRICULAS
	    $("#btn-volver-lista-matriculas").on("click",function(e){
	    	$("#contenedorEditarMatricula").html("").addClass("oculto");
	    	$("#contenedorVerMatriculas").removeClass("oculto");
	    	//console.log("esteeeeeeeeeeeeee");
	    });
	    //FIN VOLVER ATRAS LISTA MATRICULAS


    	console.log(materias);

    }); //getJSON

}//cargarMatricula

function insertarDocumento(pago){
	//alert("asdfas");
	//console.log("Mostrando: ");
	$.ajax({
		url:'./inc/insertardocumento.php',
	    type: 'POST',
      	data:  new FormData( $("#form_subir_documento")[0] ) ,
      	processData: false,
      	contentType: false,
      	dataType:'json',
      	success: function(res){
      		//console.log("Pago " + pago);
      		//console.log("hola");
      		//console.log(res);
      		//var mifecha=(res['fecha']).replace(/-/g,"/");
      		if ( typeof $("#cuotasSeleccionadas").val() == 'undefined' )
      		{
      			$("#tablaPagos").append("<input type='hidden' id='cuotasSeleccionadas' value='" + pago + "' />");
      			$("#tablaPagos tbody tr:first").remove();
      			console.log("bien");

      		}
      		else
      		{
      			console.log("mal");
	      		var misPagos=$("#cuotasSeleccionadas").val();
      			misPagos+="," + pago;
      			//console.log(misPagos);
      			$("#cuotasSeleccionadas").val(misPagos);
      		}
      		var stringFecha=convertirFecha(res['fecha']);
					//console.log("new: " + mifecha);
			//var f= new Date(mifecha);
					//var f= new Date(Date.parse(res['situacion'][clave].fechaSituacion));
			//var stringFecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
      		//console.log();
      		$("#tablaPagos tbody").append("<tr><td class='centrado'><i class='fi-euro' res-idcuota='" + res['idcuota'] + "'></i></td><td>" + res['cuota'] + "</td><td>" + stringFecha + "</td><td>" + parseFloat(res['importe']).toFixed(2) + "</td><td><a id='link-descargar-" + res['ruta'] + "' href='./em/" + res['ruta'] +"' target='_blank'>Ver/descargar</a></td><td></td></tr>");


     		
/*			$("#tablaPagos tbody").append("<tr><td class='centrado'><i class='fi-page-pdf'></i></td><td><a href='./inc/download.php?ref=" + $("#tablaDocumentacion").attr("data-ref") + "&idDoc=" + res['ultimo']+ "' >" + res['nombre'] + "</a></td><td>" + res['descrip'] + "</td></tr>");

      		//console.log("hola");*/
      	/*},
      	complete: function(xhr, status){
	    	//$("#entradaRapidaModal").foundation('reveal', 'close').html("");
	    	$("#tablaDocumentacion>tbody tr:last").remove();
			$("#btn-insertDocumento").attr("data-insert",0);
			$("#btn-insertDocumento").remove();*/
	    }
	}); //ajax
} //funcion insertar Documento

function insertarBaja(formulario){
	//console.log(asig);
	$.ajax({
	    url:"./inc/registrarbajaparcial.php",
	    type: 'POST',
	    async: true,
	    dataType: 'json',
	    data: {'info':formulario },
    	beforeSend: function (){
	    	//$("#btn-registrar-matricula").prepend("<img src='./../img/ajax-loader.gif' alt='Cargando ...'/>");
		},
	    success: function(res){
	    	contadorBajas++;
	    	console.log("Asignaturas " + contadorAsignaturas + " - Bajas " + contadorBajas);
	    	materias.push(res['asi']);
	    	console.log(materias);
	    	if (contadorBajas>=contadorAsignaturas)
	    		$("#btn-insertBajaParcial").remove();
	    	//console.log(res);
	    	if (typeof $("#sinBajas") != 'undefined'){
	    		$("#sinBajas").closest("tr").remove();
	    	}
	    	var stringFecha=convertirFecha(res['fec']);
	    	$("#tablaBajasParciales").append("<tr><td class='centrado'><i class='fi-dislike'></i></td><td class='centrado'>"+ stringFecha + "</td><td><strong>" + res['asi'] + "</strong></td><td></td></tr>")

	    	/*if (res!=0){
	    		msg= "<div data-alert class='callout alert-box success radius'>Se ha creado el alumno <strong>" + res + "</strong><a href='#' class='close'>&times;</a></div>";
	    		$("#contenedorAltaAlumno").prepend(msg);
	    		$(document).foundation('alert', 'reflow');
				$("#btn-agregar-nuevo-alumno").off("click");
				$("#btn-agregar-nuevo-alumno").closest(".row").closest(".row").remove();
				$("#inp_nombre,#inp_apellidos,#inp_direccion,#inp_dni_alumno,#sltGenero, #inp_municipio, #sltMunicipio,#inp_telefono,#inp_observaciones,#inp_fechaNac").val("");
				$("#tablaPadres,#tablaTelefonos,#tablaObservaciones").html("").addClass("oculto");
	    	}
	    	else{
	    		msg="<div data-alert class='callout alert-box alert radius'>Error<a href='#' class='close'>&times;</a></div>";
	    		$("#contenedoAltaAlumno").prepend(msg);
		    	$(document).foundation('alert', 'reflow');
	    	}
*/

	    },
	    error: function (x,y){
	    	alert("error");
	    }
	});//ajax
}

function tablaEspecialConDatosExpedientes(nombre){
	nombre.dataTable({
		"order": [[ 0, "desc" ]],
		"language":
			{
			    "sProcessing":     "Procesando...",
			    "sLengthMenu":     "Mostrar _MENU_",
			    "sZeroRecords":    "No se encontraron resultados",
			    "sEmptyTable":     "Ningún dato disponible en esta tabla",
			    "sInfo":           "Mostrando desde _START_ hasta _END_ de _TOTAL_",
			    "sInfoEmpty":      "No hay registros",
			    "sInfoFiltered":   "(Cantidad Total de Registros: _MAX_)",
			    "sInfoPostFix":    "",
			    "sSearch":         "Buscar:",
			    "sUrl":            "",
			    "sInfoThousands":  ",",
			    "sLoadingRecords": "Cargando...",
			    "oPaginate": {
			        "sFirst":    "Primero",
			        "sLast":     "Último",
			        "sNext":     "Siguiente",
			        "sPrevious": "Anterior"
			    },
			    "oAria": {
			        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
			    }
			},
    	"columnDefs": [{
        	targets: "datatable-nosort",
        	orderable: false
        }],
        'iDisplayLength': 10
   	});//tabla
}

function tablaEspecialSinDatos(nombre){
	nombre.dataTable({
		"language":
			{
			    "sProcessing":     "Procesando...",
			    "sLengthMenu":     "Mostrar _MENU_",
			    "sZeroRecords":    "No se encontraron resultados",
			    "sEmptyTable":     "Ningún dato disponible en esta tabla",
			    "sInfo":           "Mostrando desde _START_ hasta _END_ de _TOTAL_",
			    "sInfoEmpty":      "No hay registros",
			    "sInfoFiltered":   "(Cantidad Total de Registros: _MAX_)",
			    "sInfoPostFix":    "",
			    "sSearch":         "Buscar:",
			    "sUrl":            "",
			    "sInfoThousands":  ",",
			    "sLoadingRecords": "Cargando...",
			    "oPaginate": {
			        "sFirst":    "Primero",
			        "sLast":     "Último",
			        "sNext":     "Siguiente",
			        "sPrevious": "Anterior"
			    },
			    "oAria": {
			        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
			    }
			},
    	"columnDefs": [{
        	targets: "datatable-nosort",
        	orderable: false
        }],
        "bLengthChange": false,
        'iDisplayLength': 5,
        "bFilter": false, "bInfo": false
   	});//tabla
}

function fechaFormato(s) { return (s < 10) ? '0' + s : s; }

//convierte fecha a formato dd/mm/aaaa
function convertirFecha(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
}

function ordenarSelect(id_componente){
  var selectToSort = jQuery('#' + id_componente);
  var optionActual = selectToSort.val();
  selectToSort.html(selectToSort.children('option').sort(function (a, b) {
    return a.text === b.text ? 0 : a.text < b.text ? -1 : 1;
  })).val(optionActual);
}