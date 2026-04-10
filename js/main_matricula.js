$(document).ready(function(){
    //BOTON LOCALIZAR ALUMNO EN MATRICULA
    $("#contenedorNuevaMatricula").on("click","#btnBuscar",function(e){
        if($("#inp_id").val().length!=0)
            localizarAlumno($("#inp_id").val());
    });
    //FIN BOTON LOCALIZAR ALUMNO EN MATRICULA
    //AL CLICK ENTER EN EL CUADRO DE TEXTO
    $("#contenedorNuevaMatricula").on("keyup","#inp_id",function(e){
    	if ( e.keyCode == '13' && $("#inp_id").val().length!=0 ){
            localizarAlumno($("#inp_id").val());
    	}
        
    });
    //FIN AL CLICK ENTER EN EL CUADRO DE TEXTO

    //VER MATRICULA
    $("#contenedorVerMatriculas").on("click","span[id^='verExpediente_']",function(e){
       // console.log( $(this).data("id") );
        var identificador = $(this).data("id");
        $("#contenedorVerMatriculas").addClass("oculto");
        $("#contenedorEditarMatricula").html("<img src='./../img/ajax-loader.gif' alt='Cargando ...'/>").removeClass("oculto");
        $("#btn-matriculaListar").removeClass("disabled").prop("disabled",false);

        cargarMatricula(identificador);
    });
    //FIN VER MATRICULA

    $("#contenedorNuevaMatricula").on("keyup","#inp_importeTotal,#inp_matricula,#sltBonifica",function(e){

        var key = e.charCode || e.keyCode || 0;
        if ( key==13 )
        {
            // Obtenemos el número del tabindex del campo actual
            var currentTabIndex = $(this).attr('tabindex');
            // Le sumamos 1 :P
            var nextTabIndex    = parseInt(currentTabIndex) + 1;
            // Obtenemos (si existe) el siguiente elemento usando la variable nextTabIndex
            var nextField       = $('[tabindex='+nextTabIndex+']');
            // Si se encontró un elemento:
            if(nextField.length > 0)
            {
                    // Hacerle focus / seleccionarlo
                    nextField.focus();
                    // Ignorar el funcionamiento predeterminado (enviar el formulario)
                    e.preventDefault();
            }
            // Si no se encontro ningún elemento, no hacemos nada (se envia el formulario)
        }
        
    });


}); //document ready