<?php
	require( './../../inc/conexion.php' );
	require( './../../inc/functions.php');

	if(!isset($_SESSION['logusuario']) || !comprobarGrupo($_SESSION['grupos']) || (!(in_array("GURBANISMO",$_SESSION['grupos'])||in_array("GDURBANISTICA",$_SESSION['grupos'])) && $_SESSION['misGrupos']!=['GURBANCONSULTA']) )
    	header('Location: ./../index.php');	
	// $tip=$_GET['info'][1]['value'];

	// echo "<pre>";
	// print_r($_POST);
	// echo "</pre>";

	if ( isset($_POST['tipo']) && $_POST['tipo']=='t' )
	{
		$_SESSION['milicencia']['tipo']=$_POST['tipo'];
		$_SESSION['milicencia']['numlicencia']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value']));
		$_SESSION['milicencia']['dniTitAct']=strtoupper(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value'])));
		for ( $i=2 ; $i < sizeOf($_POST['info']) ; $i++ )
		{
			if (strpos($_POST['info'][$i]['name'], 'inpNIFNIET')=== 0)
				$_SESSION['milicencia']['dniTitNue']=strtoupper(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			if (strpos($_POST['info'][$i]['name'], 'inpNomTit')=== 0)
				$_SESSION['milicencia']['nomTit']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpApeTit')=== 0)
				$_SESSION['milicencia']['apeTit']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpDomTit')=== 0)
				$_SESSION['milicencia']['domTit']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpTelTit')=== 0)
				$_SESSION['milicencia']['telTit']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'tieneRepresentante')=== 0)
				$_SESSION['milicencia']['repre']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpNIFNIER')=== 0)
				$_SESSION['milicencia']['dniRep']=strtoupper(trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
			else if (strpos($_POST['info'][$i]['name'], 'inpNomRep')=== 0)
				$_SESSION['milicencia']['nomRep']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpApeRep')=== 0)
				$_SESSION['milicencia']['apeRep']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpDomRep')=== 0)
				$_SESSION['milicencia']['domRep']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpTelRep')=== 0)
				$_SESSION['milicencia']['telRep']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'esConductor')=== 0)
				$_SESSION['milicencia']['condu']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
		}
		header("Location: ./updateLicencia.php");
		//unset($_SESSION['milicencia']);
	}
/*	else if ( isset($_POST['tipo']) && $_POST['tipo']=='v' )
	{
		$_SESSION['milicencia']['tipo']=$_POST['tipo'];
		$_SESSION['milicencia']['numlicencia']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value']));
		$_SESSION['milicencia']['mat']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value']));
		for ( $i=2 ; $i < sizeOf($_POST['info']) ; $i++ )
		{
			if (strpos($_POST['info'][$i]['name'], 'sltMarcaV')=== 0)
				$_SESSION['milicencia']['marveh']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'sltModeloV')=== 0)
				$_SESSION['milicencia']['modveh']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpNumBastidor')=== 0)
				$_SESSION['milicencia']['numbas']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpFechaMatricula')=== 0)
				$_SESSION['milicencia']['fecmat']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
			else if (strpos($_POST['info'][$i]['name'], 'inpFechaITV')=== 0)
				$_SESSION['milicencia']['fecitv']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
			else if (strpos($_POST['info'][$i]['name'], 'sltTipoCombustible')=== 0)
				$_SESSION['milicencia']['combus']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpPlazas')=== 0)
				$_SESSION['milicencia']['pla']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpDiscapacita')=== 0)
				$_SESSION['milicencia']['discap']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpImpresora')=== 0)
				$_SESSION['milicencia']['imp']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpGPS')=== 0)
				$_SESSION['milicencia']['gps']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));			
			else if (strpos($_POST['info'][$i]['name'], 'inpPagoTarjeta')=== 0)
				$_SESSION['milicencia']['tar']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpMampara')=== 0)
				$_SESSION['milicencia']['mampar']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpOtros')=== 0)
				$_SESSION['milicencia']['otros']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'sltMarcaT')=== 0)
				$_SESSION['milicencia']['martax']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'sltModeloT')=== 0)
				$_SESSION['milicencia']['modtax']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpNumIdentifica')=== 0)
				$_SESSION['milicencia']['numide']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpTaller')=== 0)
				$_SESSION['milicencia']['tal']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpRevisionTaximetro')=== 0)
				$_SESSION['milicencia']['fecrev']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
			else if (strpos($_POST['info'][$i]['name'], 'inpFechaValidezTaximetro')=== 0)
				$_SESSION['milicencia']['fecval']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
		}
		header("Location: ./registerLicencia.php");
	}*/
	else if ( isset($_POST['tipo']) && $_POST['tipo']=='i' )
	{
		$datos=array();
		//$_SESSION['milicencia']['tipo']=$_POST['tipo'];
		// $_SESSION['milicencia']['numlicencia']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value']));
	// 		echo "<pre>";
	// print_r($_POST);
	// echo "</pre>";
		$_SESSION['milicencia']['import']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][2]['value']));
		$_SESSION['milicencia']['fectra']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][3]['value']))));
		$_SESSION['milicencia']['obstra']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][4]['value']));
		// echo "<pre>";
		// print_r($_SESSION);
		// echo "</pre>";
		$datos[]=1;
	}
	else if ( isset($_SESSION['milicencia']) && $_SESSION['milicencia']['tipo']=='t' )
	{
		//COMPROBACIONES PREVIAS
		// echo "<pre>";
		// print_r($_SESSION);
		// echo "</pre>";
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];

		$lic=$_SESSION['milicencia']['numlicencia'];
		$dniact=$_SESSION['milicencia']['dniTitNue'];
		$sql="SELECT l.* , t.`nomtit`, t.`apetit` FROM `licencia` l ";
		$sql.="INNER JOIN `titular` t ON l.`idtit`=t.`dni` ";
		$sql.="WHERE `id`=$lic ;";
		//echo $sql;
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;

		$datos=array();
		if ($numero>0)
		{
			$tupla=$consulta->fetch_assoc();
			$nomapeOldTit=$tupla['apetit'] . ", " .$tupla['nomtit'] ;
			$dniOldTit=$tupla['idtit'];

			//echo "Titular actualmente en BD " . $tupla['idtit'] . " y titular actual: " . $dniact;
			if ( $tupla['idtit'] != $dniact )
			{
				// //INSERTAR CONDUCTOR SI NO EXISTE Y SE RECIBEN LOS DATOS
				// if ( isset($_SESSION['milicencia']['nomCon']) && isset($_SESSION['milicencia']['apeCon']) && isset($_SESSION['milicencia']['telCon']) )
				// {
				// 	$nom=$_SESSION['milicencia']['nomCon'];
				// 	$ape=$_SESSION['milicencia']['apeCon'];
				// 	$dni=$_SESSION['milicencia']['dniCon'];
				// 	$tel=$_SESSION['milicencia']['telCon'];
				// 	$hor=$_SESSION['milicencia']['horCon'];
				// 	$sqlConductor="INSERT INTO `conductor` (`dni`, `nomcon`, `apecon`, `telcon`, `horario`, `usercreated`, `userupdated`,`updated`) VALUES (";
				// 	$sqlConductor.="'$dni','$nom','$ape', '$tel','$hor','$user','$user','$fechaactual');";
				// 	$consulta = $conexion->query($sqlConductor);

				// 	if (!$consulta)
				// 	{
				// 		$ca="Error añadiendo Conductor. (Código de error:000x1)";
				// 		$datos[]=$ca;
				// 		registrarActividad($ca);						
				// 	}
				// 	else
				// 		registrarActividad($sqlConductor);
				// }

				//INSERTAR REPRESENTANTE SI NO EXISTE Y SE RECIBEN LOS DATOS
				if ( isset($_SESSION['milicencia']['nomRep']) && isset($_SESSION['milicencia']['apeRep']) && isset($_SESSION['milicencia']['telRep']) )
				{
					$nom=$_SESSION['milicencia']['nomRep'];
					$ape=$_SESSION['milicencia']['apeRep'];
					$dni=$_SESSION['milicencia']['dniRep'];
					$tel=$_SESSION['milicencia']['telRep'];
					$dom=$_SESSION['milicencia']['domRep'];
					$sqlRepresentante="INSERT INTO `representante` (`dni`, `nomrep`, `aperep`, `telrep`, `domrep`, `usercreated`, `userupdated`,`updated`) VALUES (";
					$sqlRepresentante.="'$dni','$nom','$ape', '$tel','$dom','$user','$user','$fechaactual');";
					$consulta = $conexion->query($sqlRepresentante);

					if (!$consulta)
					{
						$ca="Error añadiendo Representante.  (Código de error:000x2)";
						$datos[]=$ca;
						registrarActividad($ca);						
					}
					else
						registrarActividad($sqlRepresentante);
				}

				//INSERTAR TITULAR SI NO EXISTE Y SE RECIBEN LOS DATOS
				if ( isset($_SESSION['milicencia']['nomTit']) && isset($_SESSION['milicencia']['apeTit']) && isset($_SESSION['milicencia']['telTit']) )
				{
					$nom=$_SESSION['milicencia']['nomTit'];
					$ape=$_SESSION['milicencia']['apeTit'];
					$dni=$_SESSION['milicencia']['dniTitNue'];
					$tel=$_SESSION['milicencia']['telTit'];
					$dom=$_SESSION['milicencia']['domTit'];
					$condu=$_SESSION['milicencia']['condu'];

					$sqlTitular="INSERT INTO `titular` (`dni`, `nomtit`, `apetit`, `teltit`, `domtit`, `esconductor`";
					if ( isset($_SESSION['milicencia']['dniRep']) )
					{
						$dnirep=$_SESSION['milicencia']['dniRep'];
						$sqlTitular.=", `idrep`";
					}

					$sqlTitular.=", `usercreated`, `userupdated`,`updated`) VALUES ('$dni', '$nom', '$ape', '$tel', '$dom', $condu";

					if ( isset($_SESSION['milicencia']['dniRep']) )
					{
						$sqlTitular.=", '$dnirep' ";
					}	

					$sqlTitular.=",'$user','$user','$fechaactual');";

					$consulta = $conexion->query($sqlTitular);


					if (!$consulta)
					{
						$ca="Error añadiendo nuevo Titular. (Código de error:000x3)";
						$datos[]= $ca;
						registrarActividad($ca);
					}
					else
					{
						$OK=true;
						registrarActividad($sqlTitular);
					}
					
				}
				//ACTUALIZA TITULAR
				else
				{
					$dni=$_SESSION['milicencia']['dniTitNue'];
					$sqlActualizaTitular = "UPDATE `titular` SET ";
					
					if (isset($_SESSION['milicencia']['dniRep']))
					{
						$dniRep=$_SESSION['milicencia']['dniRep'];
						$sqlActualizaTitular .= "`idrep`='$dniRep'";
						$pasa=1;
					}

					if ( isset($pasa) )
						$sqlActualizaTitular .= ",";

					// if (isset($_SESSION['milicencia']['dniCon']))
					// {
					// 	$sqlActualizaTitular .= "`esconductor`=0";
					// }
					// else
					// {
					$sqlActualizaTitular .= "`esconductor`=1";				
					//}

					$sqlActualizaTitular .= ",`userupdated`='$user',`updated`='$fechaactual' WHERE `dni`='$dni';";
					$consulta = $conexion->query($sqlActualizaTitular);


					if (!$consulta)
					{
						$ca="Error actualizando datos del Titular. (Código de error:000x4)";
						$datos[]= $ca;	
						registrarActividad($ca);
					}
					else
					{
						$OK=true;
						registrarActividad($sqlActualizaTitular);
					}
				}

				//ACTUALIZAR TITULAR ANTERIOR
				if ($OK)
				{
					$sqlActualizaAntiguoTitular = "UPDATE `titular` SET `idrep`=null WHERE `dni`='$dniOldTit';";
					//echo $sqlActualizaAntiguoTitular;
					$consulta = $conexion->query($sqlActualizaAntiguoTitular);
					if (!$consulta)
					{
						$ca="Error actualizando datos del Titular anterior. (Código de error:000x5)";
						$datos[]= $ca;	
						registrarActividad($ca);
					}
					else
					{
						$OK=true;
						registrarActividad($sqlActualizaAntiguoTitular);
					}

				}

				//ELIMINAR RELACION LICENCIA-CONDUCTOR ACTUAL
				$sqlTitularConductor="SELECT * FROM `aux-contrato` WHERE `idlic`='$lic' AND `fecbaj` is null;";
				//echo $sqlTitularConductor;
				$consulta = $conexion->query($sqlTitularConductor);
				$numero= $consulta->num_rows;
				//echo $numero;

				if ($numero>0)
				{
					$tupla=$consulta->fetch_assoc();
					$dniconact=$tupla['idcon'];
					//$sqlEliminarTitularConductor="DELETE FROM `auxtitcon` WHERE `idtit`='$dniact' AND `idcon`='$dniconact';";
					$sqlActualizaTitularConductor="UPDATE `aux-contrato` SET `fecbaj`='$fechaactual' WHERE `idlic`='$lic' AND `fecbaj` is null;";
					$consulta = $conexion->query($sqlActualizaTitularConductor);
					if ($consulta)
					{
						registrarActividad($sqlActualizaTitularConductor);
						$sqlActualizaConductor="UPDATE `conductor` SET `active`=0, `userupdated`='$user', `updated`='$fechaactual' WHERE `dni`='$dniconact';";
						$consulta = $conexion->query($sqlActualizaConductor);

						if (!$consulta)
						{
							$ca="Error actualizando datos del Conductor Actual. (Código de error:160x0)";
							$datos[]= $ca;
							registrarActividad($ca);
						}
						else
						{
							registrarActividad($sqlActualizaConductor);
							//INSERTAR EN AUXTITCON (SI PROCEDE)
							// if ( isset($_SESSION['milicencia']['dniCon']) && isset($_SESSION['milicencia']['dniTitNue'])) 
							// {
							// 	echo "llega alguna vez";
							// 	$dniTit=$_SESSION['milicencia']['dniTitNue'];
							// 	$dniCon=$_SESSION['milicencia']['dniCon'];
							// 	$sqlTitularConductor="INSERT INTO `auxtitcon` (`idcon`, `idtit`) VALUES (";
							// 	$sqlTitularConductor.="'$dniCon','$dniTit');";
							// 	$consulta = $conexion->query($sqlTitularConductor);
								
							// 	if (!$consulta)
							// 	{
							// 		$ca="Error añadiendo relación Titular - Conductor.  (Código de error:000x5)";
							// 		$datos[]= $ca;
							// 		registrarActividad($ca);
							// 	}
							// 	else
							// 	{
							// 		registrarActividad($sqlTitularConductor);
							// 		$sqlActualizaConductor="UPDATE  `conductor` SET `active`=1, `userupdated`='$user', `updated`='$fechaactual' WHERE `dni`='$dniCon';";
							// 		$consulta = $conexion->query($sqlActualizaConductor);

							// 		if (!$consulta)
							// 		{
							// 			$ca="Error actualizando datos del Conductor. (Código de error:000x6)";
							// 			$datos[]= $ca;	
							// 			registrarActividad($ca);
							// 		}
							// 		else
							// 			registrarActividad($sqlActualizaConductor);
							// 	}

							// }
							
						}
						
					}

				}
				// else
				// {
				// 	//	contemplar la opcion que antes no hubiese relacion conductor /titular
				// }


				/* ACTUALIZAR LICENCIA */
				if ( isset($_SESSION['milicencia']['dniTitNue']) && isset($_SESSION['milicencia']['numlicencia'])) 
				{
					$dni=$_SESSION['milicencia']['dniTitNue'];
					$numlic=$_SESSION['milicencia']['numlicencia'];
					$sqlLicencia="UPDATE `licencia` SET `idtit`='$dni', `userupdated`='$user', `updated`='$fechaactual' ";
					$sqlLicencia.="WHERE `id`='$numlic';";
					
					//echo $sqlLicencia;
					$consulta = $conexion->query($sqlLicencia);
					
					if (!$consulta)
					{
						$ca="Error actualizando Licencia. (Código de error:000x7)";
						$datos[]= $ca;
						registrarActividad($ca);
					}
					else
						registrarActividad($sqlLicencia);
				}
				else
				{
					$ca="Error con la Licencia.  (Código de error:000x8)";
					$datos[]= $ca;
					registrarActividad($ca);
				}

			}
			else
			{
				$ca="La licencia ya ha sido previamente modificada. (Código de error:000x9p)";
				$datos[]= $ca;
				registrarActividad($ca);
			}
		}
		else
		{
			$ca="No se encuentra o no está disponible la licencia solicitada. (Código de error:001x0)";
			$datos[]= $ca;
			registrarActividad($ca);
		}

		
		//FIN COMPROBACIONES PREVIAS
		
		if (sizeOf($datos)==0)
		{
			$lic=$_SESSION['milicencia']['numlicencia'];
			$import=$_SESSION['milicencia']['import'];
			$fectra=$_SESSION['milicencia']['fectra'];
			$dniTitNue=$_SESSION['milicencia']['dniTitNue'];
			$obstra=$_SESSION['milicencia']['obstra'];
			$sql="INSERT INTO `historicotransmisiones` (`idlic`, `import`, `fectra`, `obstra`, `dniTitNue`, `dniTitOld`,`nomapeOldTit`, `active`,`usercreated`,`userupdated`,`updated`) VALUES ($lic, $import, '$fectra', '$obstra', '$dniTitNue','$dniOldTit','$nomapeOldTit', 1,'$user','$user','$fechaactual');";
			//echo $sql;
			
			$consulta = $conexion->query($sql);
			if ($consulta)
			{
				registrarActividad($sql);
				$datos[]=1;
				$dni=$_SESSION['milicencia']['dniTitNue'];
				$sql="SELECT * FROM `titular` WHERE `dni`='$dni';";
				$consulta = $conexion->query($sql);
				$tupla=$consulta->fetch_assoc();
				$datos[]=$tupla['dni'];
				$datos[]=$tupla['apetit'];
				$datos[]=$tupla['nomtit'];
				$datos[]=$tupla['domtit'];
				$datos[]=$tupla['teltit'];
			}
			else
			{
				$ca="Error actualizando Histórico de transmisiones. (Código de error:001x1)";
				$datos[]= $ca;
				registrarActividad($ca);
			}

		}
		//else
		//	$datos[]=0;
		
		unset ($_SESSION['milicencia']);

	}
	else if ( isset($_SESSION['milicencia']) && $_SESSION['milicencia']['tipo']=='v' )
	{
		// echo "<pre>";
		// print_r($_SESSION);
		// echo "</pre>";
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];

		//COMPROBACIONES PREVIAS
		// (verificar que el vehículo no está asociado a una licencia)
		$lic=$_SESSION['milicencia']['numlicencia'];
		$mat=$_SESSION['milicencia']['mat'];
		$sql="SELECT * FROM `licencia` WHERE `idveh`='$mat';";
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;

		if ($numero==0)
		{
			// (verificar que la licencia no tiene ningún vehículo asociado)			
			$sql="SELECT * FROM `licencia` WHERE `id`=$lic;";
			$consulta = $conexion->query($sql);
			$numero2= $consulta->num_rows;

			$datos=array();

			if ( $numero2 > 0 )
			{
				$tupla=$consulta->fetch_assoc();
				if ( $tupla['idveh']==null )
				{
					//(verificar que el taxímetro no está asociado a ningún vehículo)
					$numide=$_SESSION['milicencia']['numide'];
					$sql="SELECT v.`idtax`, t.`id`, t.`numide` FROM `vehiculo` v ";
					$sql.="INNER JOIN `taximetro` t ON v.`idtax`=t.`id`";
					$sql.="WHERE t.`numide`='$numide';";
					$consulta = $conexion->query($sql);
					$numero3= $consulta->num_rows;

					if ( $numero3 == 0)
					{
						// (verificar que el taxímetro no existe)			
						$sql="SELECT * FROM `taximetro` WHERE `numide`='$numide';";
						$consulta = $conexion->query($sql);
						$numero4= $consulta->num_rows;

						if ( $numero4 == 0 )
						{
							//INSERTAMOS TAXIMETRO EN LA BASE DE DATOS
							if ( isset($_SESSION['milicencia']['fecval']) && isset($_SESSION['milicencia']['fecrev']) )
							{
								$modT=$_SESSION['milicencia']['modtax'];
								$tal=$_SESSION['milicencia']['tal'];
								$fecrev=$_SESSION['milicencia']['fecrev'];
								$fecval=$_SESSION['milicencia']['fecval'];
								$sqlTaximetro="INSERT INTO `taximetro` (`idmodta`, `taller`, `numide`, `fecrev`, `fecval`,`usercreated`,`userupdated`,`updated`) VALUES (";
								$sqlTaximetro.="$modT,'$tal','$numide', '$fecrev','$fecval','$user','$user','$fechaactual');";
								$consulta = $conexion->query($sqlTaximetro);

								if (!$consulta)
								{
									$ca="Error añadiendo Taxímetro. (Código de error:001x1)";
									$datos[]=$ca;
									registrarActividad($ca);
								}
								else
								{
									registrarActividad($sqlTaximetro);
									$continua=true;
									//OBTENER ULTIMO ID ULTIMO REGISTRO INSERTADO
									$idTax = $conexion->insert_id;
								}
							}
						}
						else
						{
							//ACTUALIZAMOS TAXIMETRO
							$tupla2=$consulta->fetch_assoc();
							$idTax=$tupla2['id'];
							$numTax=$tupla2['numide'];
							if ( isset($_SESSION['milicencia']['fecval']) && isset($_SESSION['milicencia']['fecrev']) )
							{
								$tal=$_SESSION['milicencia']['tal'];
								$fecrev=$_SESSION['milicencia']['fecrev'];
								$fecval=$_SESSION['milicencia']['fecval'];
								$sqlTaximetro="UPDATE `taximetro` SET `taller`='$tal', `fecrev`='$fecrev', `fecval`='$fecval' WHERE `numide`='$numTax';";
								$consulta = $conexion->query($sqlTaximetro);

								if (!$consulta)
								{
									$ca="Error actualizando Taxímetro. (Código de error:001x2)";
									$datos[]=$ca;
									registrarActividad($ca);
								}
								else
								{
									registrarActividad($sqlTaximetro);
									$continua=true;
								}
							}
						}

						// (verificar que el vehiculo no existe)
						$sql="SELECT * FROM `vehiculo` WHERE `matveh`='$mat';";
						$consulta = $conexion->query($sql);
						$numero4= $consulta->num_rows;

						if ( $numero4 == 0 )
						{
							//INSERTAMOS VEHICULO EN LA BASE DE DATOS
							if ( isset($_SESSION['milicencia']['numbas']) && isset($_SESSION['milicencia']['modveh']) )
							{
								$modveh=$_SESSION['milicencia']['modveh'];
								$otros=$_SESSION['milicencia']['otros'];
								$numbas=$_SESSION['milicencia']['numbas'];
								$fecmat=$_SESSION['milicencia']['fecmat'];
								$fecitv=$_SESSION['milicencia']['fecitv'];
								$pla=$_SESSION['milicencia']['pla'];
								if ( isset($_SESSION['milicencia']['discap']) )
								{
									$discap=1;
								}
								
								if ( isset($_SESSION['milicencia']['gps']) )
								{
									$gps=1;
								}
								
								if ( isset($_SESSION['milicencia']['imp']) )
								{
									$imp=1;
								}
								
								if ( isset($_SESSION['milicencia']['tar']) )
								{
									$tar=1;
								}

								if ( isset($_SESSION['milicencia']['mampar']) )
								{
									$mampar=1;
								}

								$combus=$_SESSION['milicencia']['combus'];
								$sqlVehiculo="INSERT INTO `vehiculo` (`matveh`,`idmodve`,`numbas`,`fecmat`,`fecitv`,`numpla`,";
								if ( isset($_SESSION['milicencia']['discap']) )
								{
									$sqlVehiculo .= "`adadis`,";
								}
								
								if ( isset($_SESSION['milicencia']['gps']) )
								{
									$sqlVehiculo .= "`gps`,";
								}
								
								if ( isset($_SESSION['milicencia']['imp']) )
								{
									$sqlVehiculo .= "`imprec`,";
								}
								
								if ( isset($_SESSION['milicencia']['tar']) )
								{
									$sqlVehiculo .= "`pagtar`,";
								}

								if ( isset($_SESSION['milicencia']['mampar']) )
								{
									$sqlVehiculo .= "`mampar`,";
								}

								$sqlVehiculo .= "`otros`,`idcom`,`idtax`,`usercreated`,`userupdated`,`updated`) ";
								$sqlVehiculo .= "VALUES ('$mat',$modveh,'$numbas','$fecmat','$fecitv',$pla,";
								if ( isset($_SESSION['milicencia']['discap']) )
								{
									$sqlVehiculo .= "$discap,";
								}
								
								if ( isset($_SESSION['milicencia']['gps']) )
								{
									$sqlVehiculo .= "$gps,";
								}
								
								if ( isset($_SESSION['milicencia']['imp']) )
								{
									$sqlVehiculo .= "$imp,";
								}
								
								if ( isset($_SESSION['milicencia']['tar']) )
								{
									$sqlVehiculo .= "$tar,";
								}

								if ( isset($_SESSION['milicencia']['mampar']) )
								{
									$sqlVehiculo .= "$mampar,";
								}

								$sqlVehiculo.="'$otros',$combus,$idTax,'$user','$user','$fechaactual');";
								$consulta=$conexion->query($sqlVehiculo);

								if (!$consulta)
								{
									$ca="Error insertando vehículo en la base de datos. (Código de error:001x3)";
									$datos[]=$ca;
									registrarActividad($ca);
								}
								else
								{
									registrarActividad($sqlVehiculo);
									$continua=1;
								}
							}
						}
						else
						{
							
							// (verificar que la licencia no tiene ningún vehículo asociado)			
							$sql="SELECT * FROM `licencia` WHERE `idveh`='$mat'";
							$consulta = $conexion->query($sql);
							$numero5= $consulta->num_rows;

							if ( $numero5==0)
							{
								$continua=1;
							}
							else
							{
								$ca="El vehículo ya está asociado a una licencia. (Código de error:001x6)";
								$datos[]=$ca;
								registrarActividad($ca);
							}

						}

					}
					else
					{
						$ca="El taxímetro está asociado a un vehículo. Inténtelo de número de identificación o diríjase a <strong>Gestión > Taxímetros</strong> para liberarlo de su estado actual. (Código de error:001x7)";
						$datos[]= $ca;
						registrarActividad($ca);
					}
				}
				else
				{
					$ca="La licencia ya tiene un vehículo asociado. Diríjase a <strong>Gestión > Vehículos</strong> para darlo de baja previamente. (Código de error:001x8)";
					$datos[]= $ca;
					registrarActividad($ca);
				}
			}
			else
			{
				$ca="No existe la licencia $lic. Consulte con el administrador (Código de error:001x9)";
				$datos[]= $ca;
				registrarActividad($ca);
			}
		}
		else
		{
			$ca="El vehículo ya se encuentra asociado a una licencia. Diríjase a <strong>Gestión > Vehículos</strong> para darlo de baja o seleccione una matrícula diferente. (Código de error:002x0)";
			$datos[]= $ca;
			registrarActividad($ca);
		}
		
		//FIN COMPROBACIONES PREVIAS

		//ACTUALIZACION DE LICENCIA Y VEHICULOS FINAL

		if (isset($continua) && $continua == 1)
		{
			//ACTUALIZAR LA LICENCIA CON LOS DATOS DEL VEHICULO
			$sqlFinales="UPDATE `licencia` SET `idveh`='$mat',`userupdated`='$user',`updated`='$fechaactual' WHERE `id`=$lic;";
			$consulta=$conexion->query($sqlFinales);
			if (!$consulta)
			{
				$ca="Error actualizando la licencia con los datos del vehículo. (Código de error:001x4)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sqlFinales);
				date_default_timezone_set('Europe/London');
				$fechaactual=date("Y-m-d");
				$sqlFinales="UPDATE `vehiculo` SET `feclic`='$fechaactual', `idtax`=$idTax, `userupdated`='$user',`updated`='$fechaactual' WHERE `matveh`='$mat';";
				//echo $sqlFinales;
				$consulta=$conexion->query($sqlFinales);
				if (!$consulta)
				{
					$ca="Error actualizando el vehículo con la fecha actual y taxímetro. (Código de error:001x5)";
					$datos[]=$ca;
					registrarActividad($ca);
				}
				else
					registrarActividad($sqlFinales);
			}
		}
		//FIN ACTUALIZACION



		// OBTENER CAMPOS PARA MOSTRAR EN LA WEB		
		if (sizeOf($datos)==0)
		{
			$datos[]=1;
			$mat=$_SESSION['milicencia']['mat'];
			$modveh=$_SESSION['milicencia']['modveh'];

			$sql="SELECT mo.`modelo`, ma.`marca` FROM `modelovehiculo` mo ";
			$sql .= "INNER JOIN `marca` ma ON mo.`idmar`=ma.`id` ";
			$sql .= "WHERE mo.`id`=$modveh;";
			//echo $sql;
			$consulta = $conexion->query($sql);
			$tupla=$consulta->fetch_assoc();
			$datos[]=$mat;
			$datos[]=$tupla['marca'];
			$datos[]=$tupla['modelo'];

		}
		// else
		// 	$datos[]=0;
		
		unset ($_SESSION['milicencia']);
	}


	// cerramos la conexion	   
	$conexion->close();
	echo json_encode($datos);
?>