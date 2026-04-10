function seccionBuscarAlumno(){
	var contenido="<hr/><article class='centrado'><h4>Buscar Alumno</h4></article><div class='large-2 columns'>&nbsp;</div><div class='large-8 columns'>		<div class='large-12 medium-12 columns radius callout' >		<div class='row'>			<div class='large-12 columns '>					<legend>Criterio de Búsqueda del Alumno:</legend>				<select id='sltCriterio'>					<option value='ref' selected='selected'>Código Alumno</option>					<option value='nom'>Nombre</option>						<option value='ape'>Apellidos</option>					<option value='dni' >DNI</option><option value='nomP'>Nombre Padre/Madre</option>			<option value='apeP'>Apellidos Padre/Madre</option>					<option value='dniP'>DNI Padre/Madre</option>				</select>				</div>		</div>		<div class='row'>			<div class='large-10 medium-9 columns '>				<input type='text' maxlength='75' id='txtBuscar' name='txtBuscar' />					</div>					<div class='large-2 medium-3 columns'>					<a class='button disabled' id='btn-buscarAlumno'>Buscar</a>					</div>		</div>					</div></div><div class='large-2 columns'>&nbsp;</div><hr />";
	// var contenido="<hr/><article class='centrado'><h4>Buscar Alumno</h4></article><div class='large-2 columns'>&nbsp;</div><div class='large-8 columns'>	<div class='large-12 medium-12 columns radius callout' >		<div class='large-12 columns '>			<legend>Criterio de Búsqueda del Alumno:</legend>			<select id='sltCriterio'>				<option value='ref' selected='selected'>Código Alumno</option>				<option value='nom'>Nombre</option>				<option value='ape'>Apellidos</option>				<option value='dni' >DNI</option><option value='nomP'>Nombre Padre/Madre</option><option value='apeP'>Apellidos Padre/Madre</option><option value='dniP'>DNI Padre/Madre</option>			</select>		</div>		<div class='large-10 medium-9 columns '>			<input type='text' maxlength='75' id='txtBuscar' name='txtBuscar'/>		</div>		<div class='large-2 medium-3 columns'>			<a class='button disabled' id='btn-buscarAlumno'>Buscar</a>		</div>		<div class='large-12 columns'>			<p class='oculto' id='errores'>				<small id='msgerror' class='error'></small>			</p>		</div>	</div></div><div class='large-2 columns'>&nbsp;</div><hr />";


	$("#info").addClass("oculto");
	$("#contenedorFormularioBuscar").html(contenido).removeClass("oculto");
	$("#txtBuscar").focus();

	
} // seccion Buscar Alumno

function verAlumno(ident){
	$.ajax({
		url:'./inc/cargaralumno.php',
		type:'GET',
		data: {'id':ident},
	    dataType: "json",
	    beforeSend: function(){
	    	$("i[data-name^='ver_" + ident + "']").parent().find("i").addClass("oculto").parents("td").append("<img src='./../img/ajax-loader.gif' alt='Cargando ...'/>");
	    },
	    success: function(resp){
	    	console.log("Mi estado es: " + estado);
	    	$("i[data-name^='ver_" + ident + "']").parent().find("i").removeClass("oculto").parents("td").find("img").remove();
	    	
	    	$("#contenedorFormularioBuscar").addClass("oculto");
	    	$("#contenedorResultadosBusqueda").addClass("oculto");
	    	var alu = resp['alumno'][0].genero == '0'?"<i class='fi-torso'></i>Alumno":"<i class='fi-torso-female'></i>Alumna";
	    	var contenido = "<div class='row' id='contenedorVerAlumno'><div class='row'><article class='centrado'><span class='subrayado size-36'>" + alu + " nº: <strong class='size-36'>" + resp['alumno'][0].id + "<input type='hidden' value='" + resp['alumno'][0].id + "' id='numeroAlumno' /></strong></span></article></div></div>";

	    	if (estado==31 || estado ==11)
	    		contenido +="<div class='row'><div class='large-2 columns'>&nbsp;</div><div class='large-4 columns'><button class='button' id='btn-actualizarAlumno' data-identity='" + ident + "'><i class='fi-pencil'></i> Editar Datos Personales</button></div><div class='large-4 columns'><button class='button' id='btn-actualizarPadres' data-identity='" + ident + "'><i class='fi-pencil'></i> Editar Datos de Padres</button></div><div class='large-2 columns'>&nbsp;</div></div>";

	    	contenido += "<div class='row'><div class='large-12 columns'><table id='tablaAlumno'><tr><td width='60%'>";
	    	if (resp['alumno'][0].direccion!="")
	    		direc=resp['alumno'][0].direccion;
	    	else
	    		direc="--";
	    	contenido +="<span class='negrita size-18'>Apellidos y Nombre:&nbsp;</span><div class='callout small' ><span class='size-19'>" + resp['alumno'][0].apellidos + ", " + resp['alumno'][0].nombre + "</span></div><span class='negrita size-18'>Dirección:&nbsp;</span><div class='callout small' ><span class='size-19'>" + direc + "</span></div>";
	    	
	    	if (resp['alumno'][0].dni != null)
	    		contenido +="<span class='negrita size-18'>DNI:&nbsp;</span><div class='callout small' ><span class='size-19'>" + resp['alumno'][0].dni + "</span></div>";

	    	if (resp['alumno'][0].fecha_nacimiento != null){
	    		var d=new Date(resp['alumno'][0].fecha_nacimiento);
	    		fechaconFormato=(d.getDate()) + "/" + (d.getMonth()+1) + "/" + (d.getFullYear());
	    		contenido +="<span class='negrita size-18'>Fecha de Nacimiento:&nbsp;</span><div class='callout small' ><span class='size-19'>" + fechaconFormato + "</span></div>";
	    	}
	    	if (resp['alumno'][0].codigoMun != null){
	    		contenido +="<span class='negrita size-18'>Municipio:&nbsp;</span><div class='callout small' ><span class='size-19'>" + resp['alumno'][0].codigoMun + " - " + resp['alumno'][0].descripcionMun + "</span></div>";
	    	}

	    	contenido += "</td><td>";
	    	// contenido += editable + "</td><td>";
	    	var segundaColumna=false;
	    	if (typeof resp['observa'] != 'undefined'){
	    		segundaColumna=true;
	    		contenido += "<span class='negrita size-18'>Observaciones</span><div class='callout small' >";
	    		$.each(resp['observa'],function(clave,valor){
	    			contenido += "<span class='size-16'><i class='fi-play'></i>&nbsp;" + resp['observa'][clave].descripcionObs + "</span>";
	    		});//each
	    		contenido += "</span></div>";
	    		// contenido += editableObser + "</span></div>";
	    	}//if

			if (typeof resp['telefono'] != 'undefined'){
	    		segundaColumna=true;
	    		contenido += "<span class='negrita size-18'>Teléfono/s de Contacto</span><div class='callout small' >";
	    		$.each(resp['telefono'],function(clave,valor){
	    			var tfno = resp['telefono'][clave].telefono;
	    			var splitTel=tfno.slice(0,3).toString() +"."+ tfno.slice(3,6).toString() +"."+ tfno.slice(6,9).toString();
	    			contenido +="<span class='size-16' data-tipo='tel' data-elem='" + tfno + "'>";
	    			/*if (resp['telefono'][clave].tipo=='Fijo')
	    				contenido += "<i class='fi-telephone'></i>&nbsp;";
	    			else
	    				contenido += "<i class='fi-mobile-signal'></i>&nbsp;";*/
	    			contenido += "<i class='fi-play'></i>&nbsp;";

	    			contenido += splitTel + "</span>";
	    		});//each
	    		contenido += "</span></div>";
	    		// contenido += editableTel + "</span></div>";
	    	}//if

	    	if (!segundaColumna){
	    		contenido+="<span class=''>Sin datos secundarios.</span>";
	    	}

	    	contenido += "</td></tr>";
	    	
	    	if (typeof resp['padres'] != 'undefined')
	    	{
	    		segundaColumna=true;
	    		contenido += "<tr><td colspan='2' class='centrado'><div class='row'><span class='negrita size-18'>Datos de los Padres</span><hr />";
	    		$.each(resp['padres'],function(clave,valor){
	    			contenido +="<span class='size-16'>";
	    			if (resp['padres'][clave].generoPa=="0")
	    				contenido += "<i class='fi-arrow-right'></i>&nbsp;Padre:&nbsp;";
	    			else
	    				contenido += "<i class='fi-arrow-right'></i>&nbsp;Madre:&nbsp;";
	    			contenido += "( " + resp['padres'][clave].dniPa + " ) - " + resp['padres'][clave].apellidosPa + ", " + resp['padres'][clave].nombrePa + "</span><br />";
	    		});//each
	    		contenido += "</span></div></td></tr>";
	    		// contenido += editablePad + "</span></div></td></tr>";
	    	}//if
	    	

	    	if (typeof resp['matricula'] != 'undefined')
	    	{
	    		contenido += "<tr><td colspan='2' class='destacado centrado'><span class='negrita size-18'>Matrículas</span>";
	    		contenido +="<table class='tablaMatriculas'><tr><th class='size-14' width='15%'>Curso Escolar</th><th class='size-14' width='15%'>Cód. Matrícula</th><th class='size-14'>Asignatura/s (curso)</th></tr>";
	    		$.each(resp['matricula'],function(clave,valor){
	    			var miId = resp['matricula'][clave].id;
	    			var cadena="";
	    			
	    			if (typeof resp['fmc'] != 'undefined'){
	    				if (typeof resp['fmc'][miId] != 'undefined')
			    			$.each(resp['fmc'][miId],function(clave2,valor2){
			    				console.log(clave2 + " -> " + valor2.fmc);
			    				cadena += "<span class='negrita size-12'>" + valor2.fmc + "</span><span class='size-12'>(" + valor2.curso + ")</span>; " ;
			    			}); // each
		    		}
	    			if (typeof resp['instrumento'] != 'undefined'){
		    			if (typeof resp['instrumento'][miId] != 'undefined')
			    			$.each(resp['instrumento'][miId],function(clave2,valor2){
			    				cadena += "<span class='negrita size-12'>" + valor2.instrumento + "</span><span class='size-12'>(" + valor2.curso + ")</span>; " ;
			    			}); // each
		    		}
	    			if (typeof resp['actividad'] != 'undefined'){
		    			if (typeof resp['actividad'][miId] != 'undefined')
			    			$.each(resp['actividad'][miId],function(clave2,valor2){
			    				cadena += "<span class='negrita size-12'>" + valor2.actividad + "</span><span class='size-12'>(" + valor2.curso + ")</span>; " ;
			    			}); // each
		    		}

	    			var anioEscolar = resp['matricula'][clave].anio_escolar;
	    			contenido +="<tr><td><span class='size-12'>" + anioEscolar + "</size></td>";
	    			contenido += "<td><span class='size-12'>" + miId + "</size></td>";
	    			contenido += "<td>" + cadena + "</td>" ;

	    			contenido += "</tr>";
	    		});//each
	    		contenido += "</table></div>";
	    		contenido += "</td></tr>";

	    	}//if
	    	
	    	contenido += "</table></div></div><div class='row'><div class='large-12 columns centrado'><a id='btn-volverAlumno' class='button' title='Atrás'> <i class='fi-arrow-left'></i> Atrás </a></div></div>";

	    	$("#contenedorEditarAlumno").html(contenido);
	

	    }
	});//ajax

} //function ver Alumno

function verResumenAlumno(ident){
	var contenido;
	$.ajax({
		url:'./inc/cargaralumno.php',
		type:'GET',
		data: {'id':ident,'resumen':1},
		async:false,
	    dataType: "json",
	    success: function(resp){
	    	// $("i[data-name^='ver_" + ident + "']").parent().find("i").removeClass("oculto").parents("td").find("img").remove();
	    	var alu = resp['alumno'][0].genero == '0'?"Resumen Alumno ":"Resumen Alumna ";
	    	
	    	// $("#contenedorFormularioBuscar").addClass("oculto");
	    	// $("#contenedorResultadosBusqueda").addClass("oculto");
	    	contenido = "<div class='row' id='contenedorVerAlumno'><div class='row'><article class='centrado'><span class='subrayado size-36'>" + alu + " nº: <strong class='size-36'>" + resp['alumno'][0].id + "<input type='hidden' value='" + resp['alumno'][0].id + "' id='numeroAlumno' /></strong></span></article></div></div>";
	  
	      	contenido += "<div class='row'><div class='large-12 columns'><table id='tablaAlumno'><tr><td width='60%'>";

	    	if (resp['alumno'][0].direccion!="")
	    		direc=resp['alumno'][0].direccion;
	    	else
	    		direc="--";
	    	contenido +="<span class='negrita size-18'>Apellidos y Nombre:&nbsp;</span><div class='callout small' ><span class='size-19'>" + resp['alumno'][0].apellidos + ", " + resp['alumno'][0].nombre + "</span></div><span class='negrita size-18'>Dirección:&nbsp;</span><div class='callout small' ><span class='size-19'>" + direc + "</span></div>";
	    	
	    	if (resp['alumno'][0].dni != null)
	    		contenido +="<span class='negrita size-18'>DNI:&nbsp;</span><div class='callout small' ><span class='size-19'>" + resp['alumno'][0].dni + "</span></div>";

	    	if (resp['alumno'][0].fecha_nacimiento != null){
	    		var d=new Date(resp['alumno'][0].fecha_nacimiento);
	    		fechaconFormato=(d.getDate()) + "/" + (d.getMonth()+1) + "/" + (d.getFullYear());
	    		contenido +="<span class='negrita size-18'>Fecha de Nacimiento:&nbsp;</span><div class='callout small' ><span class='size-19'>" + fechaconFormato + "</span></div>";
	    	}
	    	if (resp['alumno'][0].codigoMun != null){
	    		contenido +="<span class='negrita size-18'>Municipio:&nbsp;</span><div class='callout small' ><span class='size-19'>" + resp['alumno'][0].codigoMun + " - " + resp['alumno'][0].descripcionMun + "</span></div>";
	    	}

	    	contenido += "</td><td>";
	    	// contenido += editable + "</td><td>";
	    	var segundaColumna=false;
	    	if (typeof resp['observa'] != 'undefined'){
	    		segundaColumna=true;
	    		contenido += "<span class='negrita size-18'>Observaciones</span><div class='callout small' >";
	    		$.each(resp['observa'],function(clave,valor){
	    			contenido += "<span class='size-16'><i class='fi-play'></i>&nbsp;" + resp['observa'][clave].descripcionObs + "</span>";
	    		});//each
	    		contenido += "</span></div>";
	    		// contenido += editableObser + "</span></div>";
	    	}//if

			if (typeof resp['telefono'] != 'undefined'){
	    		segundaColumna=true;
	    		contenido += "<span class='negrita size-18'>Teléfono/s de Contacto</span><div class='callout small' >";
	    		$.each(resp['telefono'],function(clave,valor){
	    			var tfno = resp['telefono'][clave].telefono;
	    			var splitTel=tfno.slice(0,3).toString() +"."+ tfno.slice(3,6).toString() +"."+ tfno.slice(6,9).toString();
	    			contenido +="<span class='size-16' data-tipo='tel' data-elem='" + tfno + "'>";
	    			/*if (resp['telefono'][clave].tipo=='Fijo')
	    				contenido += "<i class='fi-telephone'></i>&nbsp;";
	    			else
	    				contenido += "<i class='fi-mobile-signal'></i>&nbsp;";*/
	    			contenido += "<i class='fi-play'></i>&nbsp;";

	    			contenido += splitTel + "</span>";
	    		});//each
	    		contenido += "</span></div>";
	    		// contenido += editableTel + "</span></div>";
	    	}//if

	    	if (!segundaColumna){
	    		contenido+="<span class=''>Sin datos secundarios.</span>";
	    	}

	    	contenido += "</td></tr>";
	    	
	    	if (typeof resp['padres'] != 'undefined')
	    	{
	    		segundaColumna=true;
	    		contenido += "<tr><td colspan='2' class='centrado'><div class='row'><span class='negrita size-18'>Datos de los Padres</span>";
	    		$.each(resp['padres'],function(clave,valor){
	    			contenido +="<span class='size-16'>";
	    			if (resp['padres'][clave].generoPa=="0")
	    				contenido += "<i class='fi-male-symbol'></i>&nbsp;";
	    			else
	    				contenido += "<i class='fi-female-symbol'></i>&nbsp;";
	    			contenido += "( " + resp['padres'][clave].dniPa + ") " + resp['padres'][clave].nombrePa + " " + resp['padres'][clave].apellidosPa + "</span>";
	    		});//each
	    		contenido += "</span></div></td></tr>";
	    		// contenido += editablePad + "</span></div></td></tr>";
	    	}//if
    	
	    	contenido += "</table></div></div><div class='row'><div class='large-12 columns centrado'><a id='btn-ir-menu-principal' class='button' title='Atrás'> <i class='fi-arrow-left'></i> Menú Principal </a></div></div>";

	    	//$("#contenedorNuevoAlumno").html(contenido);

	    }
	});//ajax
	//console.log("AAA" + contenido);
	return contenido;

} //function ver Resumen alumno creado

function localizarPagos(curso,cuota){
		//alert("llega");
	var fecha = new Date();
	var anio = fecha.getFullYear();

	$.getJSON("./inc/localizarpagos.php",{'curso':curso,'cuota':cuota},function(data){
		var contenidoTabla="<div class='row'><div class='large-12 columns'><h5>Resultado de la Búsqueda</h5></div></div><div class='row'><div class='large-12 columns'>";


		contenidoTabla+="<table id='tablaListaPagos'><thead><th rel='0'>Ref.</th><th rel='1' class='datatable-nosort'>Alumno</th><th rel='2'>Importe</th><th rel='3'>Devuelta</th><th rel='4'>Acciones</th></thead><tbody>";
		// console.log(data);
		if (data.indexOf("Sindatos") == -1)
			$.each(data,function(clave,valor){
				var alu = valor.apellidos + ", " + valor.nombre;
				contenidoTabla += "<tr><td class='centrado'>" + valor.idAlumno +  "</td><td>"+ alu + "</td><td>" + valor.importe_pago + "</td><td>";
//<span class='link' id='verExpediente_" + valor.ref + "' title ='Ver Expediente' data-id=" + valor.ref + " data-name='" + valor.ref + "' >
				if (valor.devuelta==0)
					contenidoTabla += "No";
				else
					contenidoTabla += "Sí";

				contenidoTabla += "</td><td>";
				
				if (estado==31 || estado ==11)
					if (valor.devuelta==0)
						contenidoTabla += "<a class='customButton' id='dev_" + valor.idPago+ "' title='Devolver Recibo' >Devolver</a>";
				
				contenidoTabla += "<a class='customButton' href='./em/" + valor.ruta   + "' target='_blank' title='Ver Documento de Pago' >Ver Documento</a></td></tr>";
			});//each
		else
			contenidoTabla+="<tr><td></td><td></td><td>No existen datos que mostrar</td><td></td><td></td></tr>";

		contenidoTabla +="</tbody></table></div></div>";
	//	console.log(contenidoTabla);
		$("#resultadoConsultaPagos").html(contenidoTabla);

		if (data.indexOf("Sindatos")==-1)
			tablaEspecialConDatosExpedientes($("#tablaListaPagos"));
		else
			tablaEspecialSinDatos($("#tablaListaPagos"));
		
	}); //getJSON

} //funcion para cargar tabla con los pagos

function seccionAltaAlumno(){
	//alert("gg");

	var contenido="<div class='large-12 columns'>	<article class='centrado tituloCursoMatricula'>ALTA DE ALUMNO NUEVO</article></div><div class='row' id='contenedorAltaAlumno'>	<form method='post' id='form_register_alumno' data-abide>		<table id='tablaNuevoAlumno'>			<tr>				<td>					<div class='row'>						<div class='large-12 columns'>							<fieldset>								<div class='row'>									<div class='large-6 columns'>										<label for='inp_nombre'>Nombre (<span id='contadorNom' class='size-12 negrita'>50</span>)											<input type='text' id='inp_nombre' name='inp_nombre' maxlength='50' placeholder='nombre de pila del alumno' tabindex='1' />											</label>									</div>									<div class='large-6 columns'>										<label for='inp_apellidos'>Apellidos (<span id='contadorApe' class='size-12 negrita'>50</span>) 																			<input type='text' id='inp_apellidos' name='inp_apellidos' maxlength='50' placeholder='apellidos del alumno' tabindex='2' />										</label>									</div>							</div>								<div class='row'>									<div class='large-8 columns'>										<label for='inp_direccion'>Dirección (<span id='contadorDir' class='size-12 negrita'>80</span>)											<input type='text' id='inp_direccion' name='inp_direccion' maxlength='80' placeholder='ej: C/Falsa, 123' tabindex='3' />										</label>									</div>									<div class='large-4 columns'>									<label for='inp_dni_alumno'>DNI											<input type='text' id='inp_dni_alumno' name='inp_dni_alumno' maxlength='9' placeholder='Ej. 12345678X' tabindex='4' />										</label>									</div>							</div>								<div class='row'>									<div class='large-6 columns'>										<label for='sltGenero'>Género											<select id='sltGenero' name='sltGenero' tabindex='5' >												<option value='0'>Varón</option>												<option value='1'>Mujer</option>											</select>										</label>									</div>									<div class='large-6 columns'>										<label for='inp_fechaNac'>Fecha Nacimiento											<input type='text' id='inp_fechaNac' name='inp_fechaNac' maxlength='10' placeholder='dd/mm/aaaa' readonly='readonly' tabindex='6' />										</label>									</div>								</div>								<div class='row'>									<div class='large-4 columns'>										<label for='inp_municipio'>Municipio											<input type='text' id='inp_municipio' name='inp_municipio' placeholder='teclee municipio o codigo postal' tabindex='7' />										</label>									</div>									<div class='large-8 columns'>										<label >&nbsp;											<select id='sltMunicipio' name='sltMunicipio' tabindex='8' >											</select>										</label>									</div>								</div>							</fieldset>						</div>					</div>				</td>			</tr>			<tr>				<td>					<div class='large-12 columns'>						<fieldset>							<div class='row'>								<div class='large-6 columns'>									<label for='inp_telefono'>Teléfono (<span class='size-12 negrita'>máx. 4 números</span>)										<input type='text' id='inp_telefono' name='inp_telefono' maxlength='9' placeholder='9/8XXXXXXXX ó 6/7XXXXXXXX y pulse Intro' tabindex='9' />									</label><br/>									<table id='tablaTelefonos' class='oculto'>										<tr>											<td>											</td>										</tr>									</table>								</div>								<div class='large-6 columns'>									<label for='inp_observaciones'>Observaciones 								(<span id='contadorObs' class='size-12 negrita'>100</span>)										<input type='text' id='inp_observaciones' name='inp_observaciones' maxlength='50' placeholder='Añada información secundaria del alumno y pulse Intro' tabindex='10' />									</label><br/>									<table id='tablaObservaciones' class='oculto'>										<tr>											<td>											</td>										</tr>									</table>								</div>							</div>						</fieldset>					</div>				</td>			</tr>		<!--<tr>				<td>					<div class='row'>				<div class='large-12 columns'>					<label >Fotografía <input type='file' id='inp_foto' name='inp_foto'/>					</label>				</div>			</div>					</td>			</tr>			<tr>				<td>					<div class='row'>						<fieldset>							<div class='large-12 columns'>								<div class='centrado'>									<a id='btn-padres' class='button info tiny'>Padres</a>								</div>							</div>						</fieldset>					</div>				</td>			</tr>--></table>					<div class='row'>						<div class='large-12 columns'>							<div class='row'>							<div class='centrado large-12 columns'>									<div class='centrado' id='row_btn_save'>								<a id='btn-agregar-nuevo-alumno' class='button disabled'>Guardar y continuar</a>									</div>								</div>							</div>						</div>					</div>			</form></div>";

	$("#contenedorNuevoAlumno").html(contenido).removeClass("oculto");
	$('#inp_fechaNac').datepicker();
	
	$("#inp_nombre").focus();
	
	


	$("#inp_telefono").ForceNumericOnlySinDecimal();
} // seccion Alta Alumno

function seccionEdicionAlumno(ident){
	//var construyeTabla="<tr><td class='centrado destacado'><span class='negrita size-16 subrayado'>DATOS DE LOS PADRES</span><table id='tablaPadres' width='100%'><thead><tr><th class='centrado' width='20%'>DNI</th><th class='centrado'>Nombre</th><th class='centrado'>Apellidos</th><th class='centrado'>Parentesco</th><th width='2%'>&nbsp;</th></tr></thead><tbody>";
	$.getJSON('./inc/cargaralumno.php',{'id':ident},function(resp){
			if (resp['alumno'][0].nombre==null) refnom=0;
	    	else refnom=resp['alumno'][0].nombre.length;
	    	
	    	if (resp['alumno'][0].apellidos==null) refape=0;
	    	else refape=resp['alumno'][0].apellidos.length;
	    	
	    	if (resp['alumno'][0].direccion==null) refdir=0;
	    	else refdir=resp['alumno'][0].direccion.length;

			//console.log("mostrando " + construyeTabla);
			var dni=resp['alumno'][0].dni!=null?resp['alumno'][0].dni:"";
			var stringFecha=resp['alumno'][0].fecha_nacimiento!=null?convertirFecha(resp['alumno'][0].fecha_nacimiento):"";
				
			var contenido="<div class='large-12 columns'>	<article class='negrita centrado'>EDITANDO ALUMNO " + ident + "<input type='hidden' id='numeroAlumno' value='" + ident +"' /></article></div><div class='row' id='contenedorEdicionAlumno'>	<form method='post' id='form_updater_alumno' data-abide><input type='hidden' name='inp_ref' value='" + ident + "' />		<table id='tablaActualizaAlumno'>			<tr>				<td>					<div class='row'>						<div class='large-12 columns'>							<fieldset>								<div class='row'>									<div class='large-6 columns'>										<label for='inp_nombre'>Nombre (<span id='contadorNom' class='size-12 negrita'>" + (50 - parseInt(refnom)) + "</span>)											<input type='text' id='inp_nombre' name='inp_nombre' maxlength='50' placeholder='nombre de pila del alumno' tabindex='1' value='" + resp['alumno'][0].nombre + "' />											</label>									</div>									<div class='large-6 columns'>										<label for='inp_apellidos'>Apellidos (<span id='contadorApe' class='size-12 negrita'>" + (50 - parseInt(refape)) + "</span>) 																			<input type='text' id='inp_apellidos' name='inp_apellidos' maxlength='50' placeholder='apellidos del alumno' tabindex='2' value='" + resp['alumno'][0].apellidos + "'/>										</label>									</div>							</div>								<div class='row'>									<div class='large-8 columns'>										<label for='inp_direccion'>Dirección (<span id='contadorDir' class='size-12 negrita'>" + (80 - parseInt(refdir)) + "</span>)											<input type='text' id='inp_direccion' name='inp_direccion' maxlength='80' placeholder='ej: C/Falsa, 123' tabindex='3' value='" + resp['alumno'][0].direccion + "'/>										</label>									</div>									<div class='large-4 columns'>									<label for='inp_dni_alumno'>DNI											<input type='text' id='inp_dni_alumno' name='inp_dni_alumno' maxlength='9' placeholder='Ej. 12345678X' tabindex='4' value='" + dni + "'/>										</label>									</div>							</div>								<div class='row'>									<div class='large-6 columns'>										<label for='sltGenero'>Género											<select id='sltGenero' name='sltGenero' tabindex='5' >												<option value='0'>Varón</option>												<option value='1'>Mujer</option>											</select>										</label>									</div>									<div class='large-6 columns'>										<label for='inp_fechaNac'>Fecha Nacimiento											<input type='text' id='inp_fechaNac' name='inp_fechaNac' maxlength='10' placeholder='dd/mm/aaaa' readonly='readonly' tabindex='6' value='" + stringFecha +"' />										</label>									</div>								</div>								<div class='row'>									<div class='large-4 columns'>										<label for='inp_municipio'>Municipio											<input type='text' id='inp_municipio' name='inp_municipio' placeholder='teclee municipio o codigo postal' tabindex='7' />										</label>									</div>									<div class='large-8 columns'>										<label >&nbsp;											<select id='sltMunicipio' name='sltMunicipio' tabindex='8' ><option value='" + resp['alumno'][0].auxmunicipio_id + "'>" + resp['alumno'][0].descripcionMun+ " (" + resp['alumno'][0].codigoMun + ")</option>											</select>										</label>									</div>								</div>							</fieldset>						</div>					</div>				</td>			</tr>			<tr>				<td>					<div class='large-12 columns'>						<fieldset>							<div class='row'>								<div class='large-6 columns'>									<label for='inp_telefono'>Teléfono (<span class='size-12 negrita'>máx. 4 números</span>)										<input type='text' id='inp_telefono' name='inp_telefono' maxlength='9' placeholder='9/8XXXXXXXX ó 6/7XXXXXXXX y pulse Intro' tabindex='9' />									</label><br/>									<table id='tablaTelefonos' class='oculto'>										<tr>											<td>											</td>										</tr>									</table>								</div>								<div class='large-6 columns'>									<label for='inp_observaciones'>Observaciones 								(<span id='contadorObs' class='size-12 negrita'>100</span>)										<input type='text' id='inp_observaciones' name='inp_observaciones' maxlength='50' placeholder='Añada información secundaria del alumno y pulse Intro' tabindex='10' />									</label><br/>									<table id='tablaObservaciones' class='oculto'>										<tr>											<td>											</td>										</tr>									</table>								</div>							</div>						</fieldset>					</div>				</td>			</tr>		<!--<tr>				<td>					<div class='row'>				<div class='large-12 columns'>					<label >Fotografía <input type='file' id='inp_foto' name='inp_foto'/>					</label>				</div>			</div>					</td>			</tr>	-->		";
			/*if (resp['alumno'][0].mayordeedad == 0)
				contenido += "<tr><td class='centrado'><input type='checkbox' id='mayoriaEdad' data-alu='" + ident + "' /><span class='negrita'> Es mayor de edad o está emancipado.</span></td></tr>";
			else
				contenido += "<tr><td class='centrado'><input type='checkbox' id='mayoriaEdad' checked='checked' data-alu='" + ident + "' /><span class='negrita'> Es mayor de edad o está emancipado.</span></td></tr>";

			contenido += construyeTabla;*/

			contenido +="</div>							</div>						</fieldset>					</div>				</td>			</tr></table>					<div class='row'>						<div class='large-12 columns'>							<div class='row'>							<div class='centrado large-6 columns'>									<div class='a-la-derecha' id='row_btn_save'>								<a id='btn-actualizar-alumno' class='button disabled'>Actualizar</a>									</div>								</div>	<div class='centrado large-6 columns'>									<div class='a-la-izquierda' id='row_btn_volver'>								<a id='btn-volver-alumno' class='button'> Descartar cambios y volver</a>									</div>								</div>						</div>						</div>					</div>			</form></div>";

			$("#contenedorActualizarAlumno").html(contenido).removeClass("oculto");

			
			if (resp['alumno'][0].genero==0)
				$("#sltGenero option[value=0]").attr("selected","selected");
			else
				$("#sltGenero option[value=1]").attr("selected","selected");

			if (typeof resp['telefono'] != 'undefined'){
				//console.log("tamaño array telefono: "+ resp['telefono'].length);
				$("#tablaTelefonos").removeClass("oculto");
				$.each(resp['telefono'],function(clave,valor){
					contadorTel++;
					contador++;
					var tfno=resp['telefono'][clave].telefono;
					var tfnobd=resp['telefono'][clave].idTel;
					//console.log(tfno);
					telefonos.push(tfno);

					$("#tablaTelefonos td").append("<span class='item'><i class='fi-play'></i>&nbsp;" + tfno + "<a title='Quitar Teléfono' id='quitarTelefono" + contador + "' data-tfno='" + tfno + "' data-id=" + contador + " data-bd='" + tfnobd+ "'>&nbsp;<i class='fi-x rojo'></i></a></span>");
					if (contadorTel==4){
						$("#inp_telefono").attr("readonly","readonly").val("");
					}
				});
			}

			if (typeof resp['observa'] != 'undefined'){
				$("#tablaObservaciones").removeClass("oculto");

				$.each(resp['observa'],function(clave,valor){
					contadorObs++;
					contador2++;
					var obs=resp['observa'][clave].descripcionObs;
					var obsbd=resp['observa'][clave].idObs;
					//console.log(obs);
					observa.push(obs);

					$("#tablaObservaciones td").append("<span class='item'><i class='fi-play'></i>&nbsp;" + obs+ "<a title='Quitar Elemento' id='quitarelemento" + contador2 + "' data-obs='" + obs + "' data-id=" + contador2 + " data-bd='" + obsbd+ "'>&nbsp;<i class='fi-x rojo'></i></a>&nbsp;</span>");
				});
			}

			$("#btn-volver-alumno").on("click",function(ev){
				if ($(this).data("accion")=='actualizado')
				{
					$("#contenedorEditarAlumno").html("");
					var ident=$(ev.target).data("alu");
					verAlumno(ident);
				}
				$("#contenedorActualizarAlumno").html("").addClass("oculto");
				$("#contenedorEditarAlumno").removeClass("oculto");
				botonActiva=0;
				$("#btn-volver-alumno").off("click");
			});
			/*if (typeof resp['padres'] != 'undefined')
		    	{
		    		//segundaColumna=true;
		    		$.each(resp['padres'],function(clave,valor){
		    			console.log("indice es "+ clave);
		    			contenido +="<span class='size-16'>";
		    			if (resp['padres'][clave].generoPa=="0")
		    				$("#sltGeneroPadres" + clave + " option[value=0]").attr("selected","selected")
		    			else
		    				$("#sltGeneroPadres" + clave + " option[value=1]").attr("selected","selected")

		    			$("#inp_dni_padres" + clave ).val(resp['padres'][clave].dniPa);
		    			$("#inp_nombre_padres" + clave).val(resp['padres'][clave].nombrePa);
		    			$("#inp_apellidos_padres" + clave).val(resp['padres'][clave].apellidosPa);
		    		});//each
		    		contenido += "</span>";
		    		// contenido += editablePad + "</span></div></td></tr>";
		    	}//if
		    else
		    	{
					contenido +="<a id='btn-padres' class='button info tiny'>Padres</a>";				
		    	}
*/
			$('#inp_fechaNac').datepicker();
			
			$("#inp_telefono").ForceNumericOnlySinDecimal();
			$("#inp_nombre").focus();
		}); //getJSON
	

} // seccion Alta Alumno

function agregarAlumno(datos){

	//$("#inp_nombre,#inp_apellidos,#inp_direccion,#inp_dni_alumno,#sltGenero, #inp_municipio, #sltMunicipio,#inp_telefono,#inp_observaciones").prop({disabled:true});

	
	$.ajax({
	    url:"./inc/registraralumno.php",
	    type: 'POST',
	    async: true,
	    dataType: 'html',
    	beforeSend: function (){
	    	$("#btn-agregar-nuevo-alumno").prepend("<img src='./../img/ajax-loader.gif' alt='Cargando ...'/>");
		},
	    data:{'info':datos},
	    success: function(res){

	    	if (res!=0){
    		
	    		msg= "<div data-closable='slide-out-right' class='callout success radius'>El alumno <strong><input type='hidden' id='numeroAlumno' value='" + res + "' />" + res +"</strong> ha sido creado satisfactoriamente.<a class='close-button a-la-derecha' aria-label='Dismiss alert' type='button' data-close>          <span aria-hidden='true'>&times;</span>        </a></div>";
	    		$("#contenedorNuevoAlumno").html(msg);

	    		//abrir otra ventana para añadir padres si los tiene
	    		btn="<div class='row'><div class='large-6 columns centrado'><a class='button' id='btn-agregar-padres'>Quiero añadir información de los padres</a></div><div class='large-6 columns centrado'><a class='button' id='btn-fin-y-ver-resumen'>Terminar</a></div></div>";
	    		$("#contenedorNuevoAlumno").append(btn);

				$("#btn-agregar-nuevo-alumno").off("click");

			    /* CONTROL DE BOTONES DE MENU */
				$("#btn-matriculaListar").addClass("desactivado").prop("disabled",true);
				$("#btn-agregarAlumno").addClass("desactivado").prop("disabled",true);
				$("#btn-agregarMatricula").addClass("desactivado").prop("disabled",true);
				$("#btn-alumnoBuscar").addClass("desactivado").prop("disabled",true);
				/******************************/

	    	}
	    	else{
	    		msg="<div data-closable='slide-out-right' class='callout alert radius'>Error<a class='close-button a-la-derecha' aria-label='Dismiss alert' type='button' data-close>          <span aria-hidden='true'>&times;</span>        </a></div>";
	    		$("#contenedorNuevoAlumno").prepend(msg);
		    	//$(document).foundation('alert', 'reflow');
	    	}


	    },
	    error: function (x,y){
	    	alert("error");
	    }
	});//ajax
}//agregar alumno

function actualizarPadres(papas,alumno,accion){
	
	$.ajax({
		url:'./inc/actualizarpadres.php',
		type:'POST',
		data: {'datos':papas,'alu':alumno,'accion':accion},
	    dataType:"json",
	    beforeSend: function(){
	    	$("#actualizarPadres").prepend("<img src='./../img/ajax-loader-blue.gif' alt='Cargando ...'/> ");
	    },
	    success: function(resp){
	    	$("#actualizarPadres").html("Guardado").addClass("disabled");
	    	$("#btn-fin-y-ver-resumen").html("Ver Resultado").attr("data-accion","actualizado").attr("data-alu",alumno);
	    	$("#btn-fin-y-volver-atras").html("Volver").attr("data-accion","actualizado").attr("data-alu",alumno);
	    }

	});//ajax
}

function actualizaAlumno(datos){
	//console.log(datos);
	var alumno=$("#numeroAlumno").val();
	$("#inp_nombre,#inp_apellidos,#inp_direccion,#inp_dni_alumno,#sltGenero, #inp_municipio, #sltMunicipio,#inp_telefono,#inp_observaciones").prop({disabled:true});

	
	$.ajax({
	    url:"./inc/actualizaralumno.php",
	    type: 'POST',
	    async: true,
	    dataType: 'html',
    	beforeSend: function (){
	    	$("#btn-actualizar-alumno").html("<img src='./../img/ajax-loader-blue.gif' alt='Cargando ...'/> ACTUALIZANDO (espere)");
		},
	    data:{'info':datos},
	    success: function(res){

	    	if (res!=0){
	    		$("#btn-actualizar-alumno").html("Actualizado").addClass("disabled");
	    		$("a[id^='quitarTelefono'],a[id^='quitarelemento']").remove();
	    		$("#btn-volver-alumno").html("Volver").attr("data-accion","actualizado").attr("data-alu",alumno);


	    		//t=verResumenAlumno($("#numeroAlumno").val(),1);
	    		//console.log(t);


	    		//$("#contenedorActualizarAlumno").html(t);
	    		//$("#contenedorEditarAlumno").html("").addClass("oculto");
				//$("#contenedorFormularioBuscar,#contenedorResultadosBusqueda").removeClass("oculto");
	   //  		msg= "<div data-alert class='callout alert-box success radius'>Se ha creado el alumno <strong>" + res + "</strong><a href='#' class='close'>&times;</a></div>";
	   //  		$("#contenedorAltaAlumno").prepend(msg);
	   //  		//$(document).foundation('alert', 'reflow');
				// $("#btn-agregar-nuevo-alumno").off("click");
				// $("#btn-agregar-nuevo-alumno").closest(".row").closest(".row").remove();
				// $("#inp_nombre,#inp_apellidos,#inp_direccion,#inp_dni_alumno,#sltGenero, #inp_municipio, #sltMunicipio,#inp_telefono,#inp_observaciones,#inp_fechaNac").val("");
				// $("#tablaPadres,#tablaTelefonos,#tablaObservaciones").html("").addClass("oculto");
	    	}
	    	else{
	    		msg="<div data-alert class='callout alert-box alert radius'>Error<a href='#' class='close'>&times;</a></div>";
	    		$("#contenedoAltaAlumno").prepend(msg);
		    	//$(document).foundation('alert', 'reflow');
	    	}


	    },
	    error: function (x,y){
	    	alert("error");
	    }
	});//ajax
}//agregar alumno

function buscarAlumno(ref,txt){
	$.ajax({
		url:'./inc/buscaralumno.php',
		type:'GET',
		data: {'ref':ref, 'txt':txt},
	    dataType:"json",
	    beforeSend: function(){
	    	$("#contenedorResultadosBusqueda").html("<img src='./../img/ajax-loader.gif' alt='Cargando ...'/>").removeClass('oculto').addClass("centrado");
	    },
	    success: function(resp){
	    	var contador=0;
	    	var contenido = "<article class='negrita centrado'><h4>Resultados de la Búsqueda</h4></article><table id='tablaAlumnos' width='100%'><thead><tr><th width='%'></th><th class='centrado' width='15%'>Código Alumno</th><th>Alumno</th><th>Dirección</th><th width='12%' class='centrado'>DNI</th></tr></thead><tbody>";
	    	if (resp[0]!="Sindatos")
		    	$.each(resp,function(clave,valor){
		    		contador++;
		    		var dni;
		    		if (resp[clave].dni!=null)
		    			dni= resp[clave].dni;
		    		else
		    			dni=" -- ";
		    		contenido += "<tr><td><i title='Ver/Editar' data-id=" + resp[clave].id + " data-name='ver_" + resp[clave].id + "' class='fi-eye tipoEnlace size-21'></i></td><td class='centrado'>" + resp[clave].id + "</td><td>" + resp[clave].apellidos + ", " + resp[clave].nombre + "</td><td>" + resp[clave].direccion + "<td class='centrado'>" + dni + "</td></tr>";
		    	});//each
		   
		   	var mensaje;
		   	if (contador>1)
		   		mensaje = "Se han encontrado " + contador + " coincidencias.";
		   	else if (contador==1)
		   		mensaje = "Se ha encontrado " + contador + " coincidencia.";
		   	else
		   		mensaje = "No se ha encontrado ninguna coincidencia.";

	    	
	    	contenido +="</tbody><tfoot><tr><td colspan='5'>" + mensaje + "</td></tr></tfoot></table>";
	    	$("#contenedorResultadosBusqueda").html(contenido).removeClass("oculto centrado");
	    }
	});//ajax
}



function primerCaracter(elem){
	var correctos=['6','7','8','9'];
	if (correctos.indexOf(elem)!=-1){
		return true;
	}
	return false;
}//primer caracter


jQuery.fn.ForceNumericOnly = function()
{
    return this.each(function()
    {
        $(this).keydown(function(e)
        {
            var key = e.charCode || e.keyCode || 0;

            return (
                key == 8 || //ESC
                key == 9 || //TAB
                key == 13 || //ENTER
                key == 46 ||
                key == 190 || // PUNTO DECIMAL EN TECLADO ALFANUMERICO
                key == 110 || // PUNTO DECIMAL EN TECLADO NUMERICO
                (key >= 35 && key <= 40) || //FUNCIONES ESPECIALES SUPR,INICIO,REPAG,INSERT,FIN,AVPAG
                (key >= 48 && key <= 57) || //NUMEROS EN TECLADO ALFANUMERICO
                (key >= 96 && key <= 105)); //NUMEROS EN TECLADO NUMERICO
        });
    });
};

jQuery.fn.ForceNumericOnlySinDecimal = function()
{
    return this.each(function()
    {
        $(this).keydown(function(e)
        {
            var key = e.charCode || e.keyCode || 0;

            return (
                key == 8 || //ESC
                key == 9 || //TAB
                key == 13 || //ENTER
                key == 46 ||
                (key >= 35 && key <= 40) || //FUNCIONES ESPECIALES SUPR,INICIO,REPAG,INSERT,FIN,AVPAG
                (key >= 48 && key <= 57) || //NUMEROS EN TECLADO ALFANUMERICO
                (key >= 96 && key <= 105)); //NUMEROS EN TECLADO NUMERICO
        });
    });
};