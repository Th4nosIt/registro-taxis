//Validacion del lado del cliente 
function estaVacio(obj){
	if (obj.val().length==0)
		return true;
}


function validateFields(obj){

	var valor = obj.val();
	var nombre = obj.attr('name');
	var isvalid = false;

	switch (nombre){
	
		case 'inpNIFNIET':
		case 'inpNIFNIER':
		case 'inpNIFNIEC':
			var pattern= /(([X-Z|x-z]{1})([-]?)(\d{7})([-]?)([A-Z|a-z]{1}))|((\d{8})([-]?)([A-Z|a-z]{1}))|(^[ABEH][0-9]{8}$)|(^[KPQS][0-9]{7}[A-J]$|^[CDFGJLMNRUVW][0-9]{7}[0-9A-J]$)/i;
			if (!pattern.test(valor))
				obj.css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
			else{
				if ( (dniNIE(valor) ) ){
					obj.attr('style','');
					isvalid=true;
				}
				else
					obj.css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
			}
			break;

		case 'inpMatricula':
		case 'inpMatriculaCambio':
			var pattern= /(\d{4}[A-Z|a-z]{3}$)|([A-Z|a-z]{1,2}\d{4}[A-Z|a-z]{1,2}$)|([A-Z|a-z]{1,2}\d{6}$)/i;//|([A-Z|a-z]{1,2}\d{4}[A-Z|a-z]{1,2}$)([A-Z|a-z]{1,2}\d{5}$)/i;
			if (!pattern.test(valor))
				obj.css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
			else{
					obj.attr('style','');
					isvalid=true;
			}
			break;

		case 'inpNomTit':
		case 'inpMarca':
		case 'inpApeTit':
		case 'inpNomRep':
		case 'inpApeRep':
		case 'inpNomCon':
		case 'inpApeCon':		
		case 'inpNomEmi':
		case 'inpNomEmiCambio':
		case 'inpApeNom':
		case 'inpTipoContrato':
		case 'inpEmisora':
			//console.log("verificando campo " + nombre);
			var pattern=/^[A-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžßÇŒÆČŠŽ∂ðÀÁÂÄÃÅĄČĆĘÈÉÊËĖĮÌÍÎÏŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑÇČŠŽßÇŒÆČŠŽ∂Ð ]{3,50}$/;
			if ( !pattern.test(valor) )
				obj.css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
			else{
				obj.attr('style','');
				isvalid=true;
			}
			break;

		case 'inpDomTit':
		case 'inpDomRep':
		case 'inpDomCon':
		case 'inpObjeto':
        case 'inpDescripcion':
		case 'inpDomCon':
			//console.log("verificando campo " + nombre);
			if (valor=="" )
				obj.css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
			else{
				obj.attr('style','');
				isvalid=true;
			}
			break;

        case 'inpTelTit':
        case 'inpTelRep':
        case 'inpTelCon':
        case 'inpTel1':
        case 'inpTel2':
        case 'inpFax':
			//console.log("verificando campo " + nombre);
			if ( valor.length!=0 ){
            	var pattern = /^[6|7|8|9]{1}[\d]{8}$/;
            	if ( !pattern.test(valor) )
	                obj.css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
	            else{
	            	obj.attr('style','');
	            	isvalid=true;
	            }
	        }
	        else{
            	obj.attr('style','');
            	isvalid=true;
            }
            break;

        case 'sltMarcaV':
        case 'sltModeloV':
        case 'sltMarcaT':
        case 'sltMarca':
        case 'sltTipo':
        case 'sltModeloT':
        case 'sltTipoCombustible':
        case 'sltTipoAutorizacion':
        case 'sltTipoExpediente':

        	if (valor != 0)
        	{
				obj.attr('style','');
            	isvalid=true;
        	}
        	else
        	{
        		obj.css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
        	}

        	break;


        case 'inpNumBastidor':
        case 'inpModelo':
        case 'inpNumIdentifica':
        case 'inpNumIdentificaCambio':
        case 'inpNumIdentificaAct':
        // case 'inpFechaMatricula':
        // case 'inpFechaITV':
        // case 'inpRevisionTaximetro':
        // case 'inpFechaValidezTaximetro':
        case 'inpFechaAltaContrato':
        case 'inpFechaInicioSeguro':
        case 'inpFechaFinSeguro':
        case 'inpFechaRevision':
        case 'inpFechaTraspaso':
        case 'inpFechaInspeccion':
        case 'inpFechaAutorizacion':
        case 'inpFechaSubvencion':
        case 'inpFechaExpediente':
        case 'inpFechaTransmision':
        case 'inpFecAlt':
        case 'inpObserva':

			if (valor.length != 0)
        	{
				obj.attr('style','');
            	isvalid=true;
        	}
        	else
        	{
        		obj.css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
        	}

        	break;

        case 'inpImporte':
			
			if ( valor.length!=0 )
			{
            	//var pattern = /^[\d]+$/;
            	var pattern =/^[0-9]+([.][0-9]+)?$/;
            	if ( !pattern.test(valor) )
	                obj.css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
	            else{
	            	obj.attr('style','');
	            	isvalid=true;
	            }
	        }
	        else
	        {
	                obj.css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
	        }

            break;

        case 'inpPlazas':
			
			if ( valor.length!=0 )
			{
            	var pattern = /^[\d]+$/;
            	if ( !pattern.test(valor) )
            	{
	                obj.css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
            	}
	            else
	            {
	            	if (valor>9 || valor<3)
	            	{
	                	obj.css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
	            	}
	            	else
	            	{
		            	obj.attr('style','');
		            	isvalid=true;	            		
	            	}
	            }
	        }
	        else
	        {
	                obj.css({'background-color':'rgba(255,157,157,0.3)','border':'2px solid #ff9090'});
	        }

            break;
		
		case 'inpOtros':	
		case 'inpTaller':	
		case 'inpHorario':	
		case 'inpCompany':	
		case 'inpNumPoliza':
		//case 'sltModeloV':
		//case 'sltModeloT':
        case 'inpFechaMatricula':
        case 'inpFechaITV':
        case 'inpRevisionTaximetro':
        case 'inpFechaValidezTaximetro':
        case 'inpTel1':
        case 'inpTel2':
        case 'inpTel1Cambio':
        case 'inpTel2Cambio':
        case 'inpFax':        
        case 'inpFaxCambio':        
			isvalid=true;
			break;

	}

	return isvalid;
}

function dniNIE(doc){
	var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
	var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
	var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
	var str = doc.toString().toUpperCase();

	if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

	var nie = str
		.replace(/^[X]/, '0')
		.replace(/^[Y]/, '1')
		.replace(/^[Z]/, '2');

	var letter = str.substr(-1);
	var charIndex = parseInt(nie.substr(0, 8)) % 23;

	if (validChars.charAt(charIndex) === letter) return true;

	return false;
}