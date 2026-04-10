<?php
	require( './../../inc/conexion.php' );
	require( './../../inc/functions.php');

	if(!isset($_SESSION['logusuario']) || !comprobarGrupo($_SESSION['grupos']) || (!(in_array("GURBANISMO",$_SESSION['grupos'])||in_array("GDURBANISTICA",$_SESSION['grupos'])) && $_SESSION['misGrupos']!=['GURBANCONSULTA']) )
    	header('Location: ./../index.php');	
	// $tip=$_GET['info'][1]['value'];

	// echo "<pre>";
	// print_r($_POST);
	// echo "</pre>";

	if ( isset($_POST['tipo']) && $_POST['tipo']=='c' )
	{
		$_SESSION['milicencia']['tipo']=$_POST['tipo'];
		$_SESSION['milicencia']['numlicencia']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value']));
		//$_SESSION['milicencia']['dniConAct']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value']));
		for ( $i=1 ; $i < sizeOf($_POST['info']) ; $i++ )
		{
			if (strpos($_POST['info'][$i]['name'], 'inpNIFNIECActual')=== 0)
				$_SESSION['milicencia']['dniConAct']=strtoupper(trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
			else if (strpos($_POST['info'][$i]['name'], 'inpNIFNIEC')=== 0)
				$_SESSION['milicencia']['dniConNue']=strtoupper(trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
			else if (strpos($_POST['info'][$i]['name'], 'inpNomCon')=== 0)
				$_SESSION['milicencia']['nomCon']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpApeCon')=== 0)
				$_SESSION['milicencia']['apeCon']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpDomCon')=== 0)
				$_SESSION['milicencia']['domCon']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpTelCon')=== 0)
				$_SESSION['milicencia']['telCon']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpFecAlt')=== 0)
				$_SESSION['milicencia']['fecAlt']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
		}
		header("Location: ./updateConductor.php");
		//unset($_SESSION['milicencia']);
	// 		echo "<pre>";
	// print_r($_SESSION);
	// echo "</pre>";
	}
	else if ( isset($_SESSION['milicencia']) && $_SESSION['milicencia']['tipo']=='c' )
	{
		//COMPROBACIONES PREVIAS
		// echo "<pre>";
		// print_r($_SESSION);
		// echo "</pre>";
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];

		$lic=$_SESSION['milicencia']['numlicencia'];
		if (isset($_SESSION['milicencia']['dniConAct']))
		{
			$dniact=$_SESSION['milicencia']['dniConAct'];			
		}
		$dninue=$_SESSION['milicencia']['dniConNue'];
		$falt=$_SESSION['milicencia']['fecAlt'];

		
		$datos=array();
		//INSERTAR CONDUCTOR SI NO EXISTE Y SE RECIBEN LOS DATOS
		if ( isset($_SESSION['milicencia']['nomCon']) && isset($_SESSION['milicencia']['apeCon']) && isset($_SESSION['milicencia']['telCon']) )
		{
			//ACTUALIZAR DATOS CONDUCTOR ACTUAL SI EXISTE
			if (isset($dniact))
			{
				$sqlActualizaConductorActual = "UPDATE `conductor` SET `active`=0 , `userupdated`='$user', `updated`='$fechaactual' WHERE `dni`='$dniact';";
				$consulta = $conexion->query($sqlActualizaConductorActual);

				if (!$consulta)
				{
					$ca="Error actualizando Conductor Actual. (Código de error:080x0)";
					$datos[]= $ca;
					registrarActividad($ca);
				}
				else
				{
					registrarActividad($sqlActualizaConductorActual);
				}				
			}



			$sql="SELECT * FROM `conductor` WHERE `dni`='$dninue';";
			$consulta = $conexion->query($sql);
			$numero= $consulta->num_rows;
			// $tupla=$consulta->fetch_assoc();

			if ($numero>0)
			{
				$sqlActualizaConductorNuevo = "UPDATE `conductor` SET `active`=1 , `userupdated`='$user', `updated`='$fechaactual' WHERE `dni`='$dninue';";
				$consulta = $conexion->query($sqlActualizaConductorNuevo);

				if (!$consulta)
				{
					$ca="Error actualizando Conductor Nuevo. (Código de error:080x1)";
					$datos[]= $ca;
					registrarActividad($ca);
				}
				else
				{
					registrarActividad($sqlActualizaConductorNuevo);
				}
			}
			else
			{
				$nom=$_SESSION['milicencia']['nomCon'];
				$ape=$_SESSION['milicencia']['apeCon'];
				$tel=$_SESSION['milicencia']['telCon'];
				$dom=$_SESSION['milicencia']['domCon'];
				$sqlInsertarConductor = "INSERT INTO `conductor` (`dni`, `nomcon`, `apecon`, `domcon`, `telcon`, `active`, `usercreated`, `userupdated`,`updated`) VALUES ('$dninue', '$nom', '$ape', '$dom', '$tel', 1, '$user', '$user', '$fechaactual');";
				$consulta = $conexion->query($sqlInsertarConductor);

				if (!$consulta)
				{
					$ca="Error insertando Conductor Nuevo. (Código de error:080x2)";
					$datos[]= $ca;
					registrarActividad($ca);
				}
				else
				{
					registrarActividad($sqlInsertarConductor);
				}
			}

			$sql="SELECT * FROM `aux-contrato` WHERE `idlic`=$lic AND `fecbaj` is null;";
			$consulta = $conexion->query($sql);
			$numero= $consulta->num_rows;

			if ($numero>0)
			{
				$sql="UPDATE `aux-contrato` SET `fecbaj`='$fechaactual', `userupdated`='$user', `updated`='$fechaactual' WHERE `idlic`=$lic AND `fecbaj` is null;";
				//echo $sql;
				$consulta = $conexion->query($sql);

				if (!$consulta)
				{
					$ca="Error actualizando Contrato. (Código de error:080x3)";
					$datos[]= $ca;
					registrarActividad($ca);
				}
				else
				{
					registrarActividad($sql);
				}
			}

			$sqlInsertarContrato = "INSERT INTO `aux-contrato`  (`idcon`, `idlic`, `fecalt`, `usercreated`, `userupdated`,`updated`) VALUES ('$dninue',$lic,'$falt','$user','$user','$fechaactual');";
			$consulta = $conexion->query($sqlInsertarContrato);
			
			if (!$consulta)
			{
				$ca="Error insertando Contrato. (Código de error:080x4";
				$datos[]= $ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sqlInsertarContrato);
				$sql="SELECT `idtit` FROM `licencia` WHERE `id`=$lic;";
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero==1)
				{
					$tupla=$consulta->fetch_assoc();
					$tit=$tupla['idtit'];

					$sqlActualizarTitular = "UPDATE `titular` SET `esconductor`=0 WHERE `dni`='$tit';";
					$consulta = $conexion->query($sqlActualizarTitular);
					
					if (!$consulta)
					{
						$ca="Error actualizando titular. (Código de error:080x5";
						$datos[]= $ca;
						registrarActividad($ca);
					}
					else
					{
						registrarActividad($sqlActualizarTitular);
					}
				}

			}
		}
		else
		{
			// COMPROBACIONES PREVIAS
			// echo "<pre>";
			// print_r($_SESSION);
			// echo "</pre>";
			//AÑADIR CONTRATO

			//ACTUALIZAR DATOS CONDUCTOR ACTUAL SI EXISTE
			if (isset($dniact))
			{
				$sqlActualizaConductorActual = "UPDATE `conductor` SET `active`=0 , `userupdated`='$user', `updated`='$fechaactual' WHERE `dni`='$dniact';";
				$consulta = $conexion->query($sqlActualizaConductorActual);

				if (!$consulta)
				{
					$ca="Error actualizando Conductor Actual. (Código de error:080x0)";
					$datos[]= $ca;
					registrarActividad($ca);
				}
				else
				{
					registrarActividad($sqlActualizaConductorActual);
				}				
			}

			//ACTUALIZAR DATOS CONDUCTOR ACTUAL
			$sqlActualizaConductorNuevo = "UPDATE `conductor` SET `active`=1 , `userupdated`='$user', `updated`='$fechaactual' WHERE `dni`='$dninue';";
			$consulta = $conexion->query($sqlActualizaConductorNuevo);

			if (!$consulta)
			{
				$ca="Error actualizando Conductor Nuevo. (Código de error:080x1)";
				$datos[]= $ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sqlActualizaConductorNuevo);
			}
			
			//VER SI YA HAY ALGUIEN CONTRATADO
			$sql="SELECT * FROM `aux-contrato` WHERE `idlic`=$lic AND `fecbaj` is null;";
			$consulta = $conexion->query($sql);
			$numero= $consulta->num_rows;
			//EN TAL CASO SE ACTUALIZA PARA DARLO DE BAJA
			if ($numero>0)
			{
				$sql="UPDATE `aux-contrato` SET `fecbaj`='$fechaactual', `userupdated`='$user', `updated`='$fechaactual' WHERE `idlic`=$lic AND `fecbaj` is null;";
				//echo $sql;
				$consulta = $conexion->query($sql);

				if (!$consulta)
				{
					$ca="Error actualizando Contrato. (Código de error:080x3)";
					$datos[]= $ca;
					registrarActividad($ca);
				}
				else
				{
					registrarActividad($sql);
				}
			}
			//INSERTAR NUEVO CONTRATO DEL NUEVO CONDUCTOR
			$sqlInsertarContrato = "INSERT INTO `aux-contrato`  (`idcon`, `idlic`, `fecalt`, `usercreated`, `userupdated`,`updated`) VALUES ('$dninue',$lic,'$falt','$user','$user','$fechaactual');";
			$consulta = $conexion->query($sqlInsertarContrato);
			
			if (!$consulta)
			{
				$ca="Error insertando Contrato. (Código de error:080x4";
				$datos[]= $ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sqlInsertarContrato);
				$sql="SELECT `idtit` FROM `licencia` WHERE `id`=$lic;";
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero==1)
				{
					$tupla=$consulta->fetch_assoc();
					$tit=$tupla['idtit'];

					$sqlActualizarTitular = "UPDATE `titular` SET `esconductor`=0 WHERE `dni`='$tit';";
					$consulta = $conexion->query($sqlActualizarTitular);
					
					if (!$consulta)
					{
						$ca="Error actualizando titular. (Código de error:080x5";
						$datos[]= $ca;
						registrarActividad($ca);
					}
					else
					{
						registrarActividad($sqlActualizarTitular);
					}
				}

			}
		}


		
		//FIN COMPROBACIONES PREVIAS
		
		if (sizeOf($datos)==0)
		{
			$datos[]=1;
			$dni=$_SESSION['milicencia']['dniConNue'];
			$sql="SELECT * FROM `conductor` WHERE `dni`='$dni';";
			$consulta = $conexion->query($sql);
			$tupla=$consulta->fetch_assoc();
			$datos[]=$tupla['dni'];
			$datos[]=$tupla['apecon'];
			$datos[]=$tupla['nomcon'];
			$datos[]=$tupla['domcon'];
			$datos[]=$tupla['telcon'];
		}
		else
		{
			$datos[]= $ca;
		}

		unset ($_SESSION['milicencia']);
	}


	// cerramos la conexion	   
	$conexion->close();
	echo json_encode($datos);
?>