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
		$_SESSION['milicencia']['dniTit']=strtoupper(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value'])));
		for ( $i=2 ; $i < sizeOf($_POST['info']) ; $i++ )
		{
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
				$_SESSION['milicencia']['dniRep']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpNomRep')=== 0)
				$_SESSION['milicencia']['nomRep']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpApeRep')=== 0)
				$_SESSION['milicencia']['apeRep']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpDomRep')=== 0)
				$_SESSION['milicencia']['domRep']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpTelRep')=== 0)
				$_SESSION['milicencia']['telRep']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
		}
		header("Location: ./registerLicencia.php");
	}
	else if ( isset($_POST['tipo']) && $_POST['tipo']=='c' )
	{
		$_SESSION['milicencia']['tipo']=$_POST['tipo'];
		$_SESSION['milicencia']['numlicencia']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value']));
		//$_SESSION['milicencia']['dniTit']=strtoupper(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value'])));
		for ( $i=1 ; $i < sizeOf($_POST['info']) ; $i++ )
		{
			if (strpos($_POST['info'][$i]['name'], 'esConductor')=== 0)
				$_SESSION['milicencia']['condu']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpNIFNIEC')=== 0)
				$_SESSION['milicencia']['dniCon']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpNomCon')=== 0)
				$_SESSION['milicencia']['nomCon']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpApeCon')=== 0)
				$_SESSION['milicencia']['apeCon']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpTelCon')=== 0)
				$_SESSION['milicencia']['telCon']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpDomCon')=== 0)
				$_SESSION['milicencia']['domCon']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpFecAlt')=== 0)
				$_SESSION['milicencia']['fecalt']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
		}
		// echo "<pre>";
		// print_r($_SESSION);
		// echo "</pre>";
		// unset($_SESSION['milicencia']);
		header("Location: ./registerLicencia.php");
	}
	else if ( isset($_POST['tipo']) && $_POST['tipo']=='v' )
	{
		$_SESSION['milicencia']['tipo']=$_POST['tipo'];
		$_SESSION['milicencia']['numlicencia']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value']));
		$_SESSION['milicencia']['mat']=strtoupper(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value'])));
		for ( $i=2 ; $i < sizeOf($_POST['info']) ; $i++ )
		{
			if (strpos($_POST['info'][$i]['name'], 'sltMarcaV')=== 0)
				$_SESSION['milicencia']['marveh']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'sltModeloV')=== 0)
				$_SESSION['milicencia']['modveh']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpNumBastidor')=== 0)
				$_SESSION['milicencia']['numbas']=strtoupper(trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
			else if (strpos($_POST['info'][$i]['name'], 'inpFechaMatricula')=== 0)
			{
				if ( $_POST['info'][$i]['value']!="" )
				{
					$_SESSION['milicencia']['fecmat']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));					
				}
				else
				{
					$_SESSION['milicencia']['fecmat']="";
				}			
			}
			else if (strpos($_POST['info'][$i]['name'], 'inpFechaITV')=== 0)
			{
				if ( $_POST['info'][$i]['value']!="" )
				{
					$_SESSION['milicencia']['fecitv']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
				}
				else
				{
					$_SESSION['milicencia']['fecitv']="";
				}
			}				
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
		}
		header("Location: ./registerLicencia.php");
	}
	else if ( isset($_POST['tipo']) && $_POST['tipo']=='e' )
	{
		$_SESSION['milicencia']['tipo']=$_POST['tipo'];
		$_SESSION['milicencia']['emi']=$_POST['emi'];
		$_SESSION['milicencia']['numlicencia']=$_POST['lic'];
		header("Location: ./registerLicencia.php");
	}
	else if ( isset($_SESSION['milicencia']) && $_SESSION['milicencia']['tipo']=='t' )
	{
		$datos=array();
		$datos[]=1;
		$datos[]=$_SESSION['milicencia']['dniTit'];
		$datos[]=$_SESSION['milicencia']['nomTit'];
		$datos[]=$_SESSION['milicencia']['apeTit'];
	}
	else if ( isset($_SESSION['milicencia']) && $_SESSION['milicencia']['tipo']=='c' )
	{
		$datos=array();
		$datos[]=1;
		$datos[]=(isset($_SESSION['milicencia']['dniCon']))?$_SESSION['milicencia']['dniCon']:$_SESSION['milicencia']['dniTit'];
		$datos[]=(isset($_SESSION['milicencia']['nomCon']))?$_SESSION['milicencia']['nomCon']:$_SESSION['milicencia']['nomTit'];
		$datos[]=(isset($_SESSION['milicencia']['apeCon']))?$_SESSION['milicencia']['apeCon']:$_SESSION['milicencia']['apeTit'];
	}
	else if ( isset($_SESSION['milicencia']) && $_SESSION['milicencia']['tipo']=='v' )
	{
		$datos=array();
		$datos[]=1;
		$datos[]=$_SESSION['milicencia']['mat'];
		$marca=$_SESSION['milicencia']['marveh'];
		$sql="SELECT `marca` FROM `marca` WHERE `id`=$marca;";
		$consulta=$conexion->query($sql);
		$tupla=$consulta->fetch_assoc();
		$datos[]=$tupla['marca'];

		$modelo=$_SESSION['milicencia']['modveh'];		
		$sql="SELECT `modelo` FROM `modelovehiculo` WHERE `id`=$modelo;";
		$consulta=$conexion->query($sql);
		$tupla=$consulta->fetch_assoc();
		$datos[]=$tupla['modelo'];
	}
	else if ( isset($_SESSION['milicencia']) && $_SESSION['milicencia']['tipo']=='e' )
	{
		//INSERTANDO DATOS TITULAR, REPRESENTANTE Y CONDUCTOR

		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];
		//COMPROBACIONES PREVIAS
		$lic=$_SESSION['milicencia']['numlicencia'];
		$sql="SELECT * FROM `licencia` WHERE `id`=$lic;";
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;

		$datos=array();
		if ($numero>0)
		{
			$tupla=$consulta->fetch_assoc();
			if ( $tupla['idtit']==null )
			{
			//INSERTAR CONDUCTOR SI NO EXISTE Y SE RECIBEN LOS DATOS
				if ( isset($_SESSION['milicencia']['nomCon']) && isset($_SESSION['milicencia']['apeCon']) && isset($_SESSION['milicencia']['telCon']) )
				{
					$nom=$_SESSION['milicencia']['nomCon'];
					$ape=$_SESSION['milicencia']['apeCon'];
					$dni=$_SESSION['milicencia']['dniCon'];
					$tel=$_SESSION['milicencia']['telCon'];
					$dom=$_SESSION['milicencia']['domCon'];
					$sqlConductor="INSERT INTO `conductor` (`dni`, `nomcon`, `apecon`, `telcon`, `domcon`,`usercreated`,`userupdated`,`updated` ) VALUES (";
					$sqlConductor.="'$dni','$nom','$ape', '$tel','$dom','$user','$user','$fechaactual');";
					$consulta = $conexion->query($sqlConductor);

					if (!$consulta)
					{
						$ca="Error añadiendo Conductor. (Código de error:000x1)";
						$datos[]=$ca;
						registrarActividad($ca);
					}
					else
						registrarActividad($sqlConductor);
				}

				//INSERTAR REPRESENTANTE SI NO EXISTE Y SE RECIBEN LOS DATOS
				if ( isset($_SESSION['milicencia']['nomRep']) && isset($_SESSION['milicencia']['apeRep']) && isset($_SESSION['milicencia']['telRep']) )
				{
					$nom=$_SESSION['milicencia']['nomRep'];
					$ape=$_SESSION['milicencia']['apeRep'];
					$dni=$_SESSION['milicencia']['dniRep'];
					$tel=$_SESSION['milicencia']['telRep'];
					$dom=$_SESSION['milicencia']['domRep'];
					$sqlConductor="INSERT INTO `representante` (`dni`, `nomrep`, `aperep`, `telrep`, `domrep`,`usercreated`,`userupdated`,`updated`) VALUES (";
					$sqlConductor.="'$dni','$nom','$ape', '$tel','$dom','$user','$user','$fechaactual');";
					$consulta = $conexion->query($sqlConductor);

					if (!$consulta)
					{
						$ca="Error añadiendo Representante.  (Código de error:000x2)";
						$datos[]=$ca;
						registrarActividad($ca);
					}
					else
						registrarActividad($sqlConductor);
				}

				//INSERTAR TITULAR SI NO EXISTE Y SE RECIBEN LOS DATOS
				if ( isset($_SESSION['milicencia']['nomTit']) && isset($_SESSION['milicencia']['apeTit']) && isset($_SESSION['milicencia']['telTit']) )
				{
					$nom=$_SESSION['milicencia']['nomTit'];
					$ape=$_SESSION['milicencia']['apeTit'];
					$dni=$_SESSION['milicencia']['dniTit'];
					$tel=$_SESSION['milicencia']['telTit'];
					$dom=$_SESSION['milicencia']['domTit'];
					$condu=$_SESSION['milicencia']['condu'];

					$sqlTitular="INSERT INTO `titular` (`dni`, `nomtit`, `apetit`, `teltit`, `domtit`, `esconductor`";
					if ( isset($_SESSION['milicencia']['dniRep']) )
					{
						$dnirep=$_SESSION['milicencia']['dniRep'];
						$sqlTitular.=", `idrep`";
					}

					$sqlTitular.=",`usercreated`,`userupdated`,`updated`) VALUES ('$dni', '$nom', '$ape', '$tel', '$dom', $condu";

					if ( isset($_SESSION['milicencia']['dniRep']) )
					{
						$sqlTitular.=", '$dnirep' ";
					}	

					$sqlTitular.=",'$user','$user','$fechaactual');";
					//echo $sqlTitular;

					$consulta = $conexion->query($sqlTitular);


					if (!$consulta)
					{
						$ca= "Error añadiendo nuevo Titular. (Código de error:000x3)";
						$datos[]=$ca;
						registrarActividad($ca);
					}
					else
						registrarActividad($sqlTitular);
					
				}
				//ACTUALIZA TITULAR
				else
				{
					$dni=$_SESSION['milicencia']['dniTit'];
					$sqlActualizaTitular = "UPDATE `titular` SET ";
					
					if (isset($_SESSION['milicencia']['dniRep']))
					{
						$dniRep=$_SESSION['milicencia']['dniRep'];
						$sqlActualizaTitular .= "`idrep`='$dniRep'";
						$pasa=1;
					}

					if ( isset($pasa) )
						$sqlActualizaTitular .= ",";

					if (isset($_SESSION['milicencia']['dniCon']))
					{
						$sqlActualizaTitular .= "`esconductor`=0";
					}
					else
					{
						$sqlActualizaTitular .= "`esconductor`=1";				
					}

					$sqlActualizaTitular .= ",`userupdated`='$user' ,`updated`='$fechaactual' WHERE `dni`='$dni';";
					$consulta = $conexion->query($sqlActualizaTitular);


					if (!$consulta)
					{
						$ca= "Error actualizando datos del Titular. (Código de error:000x4)";
						$datos[]=$ca;
						registrarActividad($ca);
					}
					else
						registrarActividad($sqlActualizaTitular);
					
				}

				//INSERTAR EN AUX-CONTRATO (SI PROCEDE)
				if ( isset($_SESSION['milicencia']['dniCon']) && isset($_SESSION['milicencia']['numlicencia'])) 
				{
					$dniCon=$_SESSION['milicencia']['dniCon'];
					$fecAlt=$_SESSION['milicencia']['fecalt'];
					$sqlLicenciaConductor="INSERT INTO `aux-contrato` (`idcon`, `idlic`, `fecalt`, `usercreated`, `userupdated`, `updated`) VALUES (";
					$sqlLicenciaConductor.="'$dniCon',$lic,'$fecAlt', '$user','$user','$fechaactual' );";
					$consulta = $conexion->query($sqlLicenciaConductor);
					
					if (!$consulta)
					{
						$ca= "Error añadiendo relación Licencia - Conductor en contrato.  (Código de error:000x5)";
						$datos[]=$ca;
						registrarActividad($ca);
					}
					else
						registrarActividad($sqlLicenciaConductor);

					$sqlActualizaConductor="UPDATE  `conductor` SET `active`=1,`userupdated`='$user',`updated`='$fechaactual' WHERE `dni`='$dniCon';";
					$consulta = $conexion->query($sqlActualizaConductor);

					if (!$consulta)
					{
						$ca= "Error actualizando datos del Conductor. (Código de error:000x6)";
						$datos[]=$ca;
						registrarActividad($ca);
					}
					else
						registrarActividad($sqlActualizaConductor);

				}


			}
			else
			{
				$ca= "La licencia ya ha sido previamente modificada. (Código de error:000x9)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
		}
		else
		{
			$ca= "No se encuentra o no está disponible la licencia solicitada. (Código de error:001x0)";
			$datos[]=$ca;
			registrarActividad($ca);
		}

		
		//FIN INSERTANDO DATOS TITULAR, REPRESENTANTE Y CONDUCTOR
		

		//INSERTANDO DATOS VEHICULO
		// date_default_timezone_set('Europe/London');
		// $fechaactual=date("Y-m-d H:i:s");
		// $user=$_SESSION['logusuario'];
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
					// (verificar que el vehiculo no existe)
					$sql="SELECT * FROM `vehiculo` WHERE `matveh`='$mat';";
					$consulta = $conexion->query($sql);
					$numero4= $consulta->num_rows;

					if ( $numero4 == 0 )
					{
						//INSERTAMOS VEHICULO EN LA BASE DE DATOS
						if ( isset($_SESSION['milicencia']['numbas']) && isset($_SESSION['milicencia']['modveh']) )
						{
							if ($_SESSION['milicencia']['modveh']!=0)
							{
								$modveh=$_SESSION['milicencia']['modveh'];								
							}

							$otros=$_SESSION['milicencia']['otros'];
							$numbas=$_SESSION['milicencia']['numbas'];

							if ($_SESSION['milicencia']['fecmat']!="")
							{
								$fecmat=$_SESSION['milicencia']['fecmat'];								
							}

							if ($_SESSION['milicencia']['fecitv']!="")
							{
								$fecitv=$_SESSION['milicencia']['fecitv'];
							}

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
							$sqlVehiculo="INSERT INTO `vehiculo` (`matveh`,";
							if (isset($modveh))
							{
								$sqlVehiculo .="`idmodve`,";								
							}
							$sqlVehiculo.= "`numbas`,";
							if (isset($fecmat))
							{
								$sqlVehiculo.="`fecmat`,";								
							}
							if (isset($fecitv))
							{
								$sqlVehiculo.="`fecitv`,";								
							}

							$sqlVehiculo.="`numpla`,";
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

							$sqlVehiculo .= "`otros`,`idcom`,`usercreated`,`userupdated`,`updated`) ";
							$sqlVehiculo .= "VALUES ('$mat',";
							if (isset($modveh))
							{
								$sqlVehiculo.="$modveh,";
							}
							$sqlVehiculo.="'$numbas',";
							if (isset($fecmat))
							{
								$sqlVehiculo.="'$fecmat',";
							}
							if (isset($fecitv))
							{
								$sqlVehiculo.="'$fecitv',";
							}
							
							$sqlVehiculo.="$pla,";

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

							$sqlVehiculo.="'$otros',$combus,'$user','$user','$fechaactual');";
							//echo $sqlVehiculo;
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
					$ca= "La licencia ya tiene un vehículo asociado. Diríjase a <strong>Gestión > Vehículos</strong> para darlo de baja previamente. (Código de error:001x8)";
					$datos[]=$ca;
					registrarActividad($ca);
				}
			}
			else
			{
				$ca= "No existe la licencia $lic. Consulte con el administrador (Código de error:001x9)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
		}
		else
		{
			$ca= "El vehículo ya se encuentra asociado a una licencia. Diríjase a <strong>Gestión > Vehículos</strong> para darlo de baja o seleccione una matrícula diferente. (Código de error:002x0)";
			$datos[]=$ca;
			registrarActividad($ca);
		}
		
		//FIN COMPROBACIONES PREVIAS

		if (sizeOf($datos)==0)
		{
			
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
					//date_default_timezone_set('Europe/London');
					//$fechaactual=date("Y-m-d");
					$sqlFinales="UPDATE `vehiculo` SET `feclic`='$fechaactual', `userupdated`='$user',`updated`='$fechaactual' WHERE `matveh`='$mat';";
					//echo $sqlFinales;
					$consulta=$conexion->query($sqlFinales);
					if (!$consulta)
					{
						$ca="Error actualizando el vehículo con la fecha actual. (Código de error:001x5)";
						$datos[]=$ca;
						registrarActividad($ca);
					}
				}
			}
			//FIN INSERTANDO DATOS VEHICULO

			// INSERTANDO DATOS EMISORA
			//COMPROBACIONES PREVIAS
			// // (verificar que la emisora existe)
			// date_default_timezone_set('Europe/London');
			// $fechaactual=date("Y-m-d H:i:s");
			// $user=$_SESSION['logusuario'];

			$lic=$_SESSION['milicencia']['numlicencia'];
			$emi=$_SESSION['milicencia']['emi'];
			if ($emi!=0)
			{
				$sql="SELECT * FROM `emisora` WHERE `id`=$emi;";
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;
				if ($numero==1)
				{
					//ACTUALIZAR LICENCIA CON EL IDENTIFICADOR DE EMISORA
					$sql="UPDATE `licencia` SET `idemi`=$emi , `userupdated`='$user',`updated`='$fechaactual' WHERE `id`=$lic;";
					//echo $sql;
					$consulta = $conexion->query($sql);

					if ($consulta)
					{
						registrarActividad($sql);
						$datos[]=1;
					}			
					else
					{
						$ca='Error actualizando la emisora de la licencia. Consulte con el administrador (Código de error:010x0)';
						$datos[]=$ca;
						registrarActividad($ca);
					}	

				}
			}
			/* ACTUALIZAR LICENCIA CON DATOS DEL TITULAR */
			if ( isset($_SESSION['milicencia']['dniTit']) && isset($_SESSION['milicencia']['numlicencia'])) 
			{
				$dni=$_SESSION['milicencia']['dniTit'];
				$numlic=$_SESSION['milicencia']['numlicencia'];
				$sqlLicencia="UPDATE `licencia` SET `idtit`='$dni',`userupdated`='$user',`updated`= '$fechaactual' ";
				$sqlLicencia.="WHERE `id`='$numlic';";
				//echo $sqlLicencia;
				$consulta = $conexion->query($sqlLicencia);
				
				if (!$consulta)
				{
					$ca= "Error actualizando Licencia. (Código de error:000x7)";
					$datos[]=$ca;
					registrarActividad($ca);
				}
				else
				{
					registrarActividad($sqlLicencia);
					$datos[]=1;
					
				}
			}
			else
			{
				$ca= "Error con la Licencia.  (Código de error:000x8)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
			
		}
		unset ($_SESSION['milicencia']);
		// FIN INSERTANDO DATOS EMISORA

	}

	// cerramos la conexion	   
	$conexion->close();
	echo json_encode($datos);
?>