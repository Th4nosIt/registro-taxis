<?php
	require( './../../inc/conexion.php' );
	require( './../../inc/functions.php');

	if(!isset($_SESSION['logusuario']) || !comprobarGrupo($_SESSION['grupos']) || (!(in_array("GURBANISMO",$_SESSION['grupos'])||in_array("GDURBANISTICA",$_SESSION['grupos'])) && $_SESSION['misGrupos']!=['GURBANCONSULTA']) )
    	header('Location: ./../index.php');	
	// $tip=$_GET['info'][1]['value'];

	// echo "<pre>";
	// print_r($_POST);
	// echo "</pre>";

	if ( isset($_POST['tipo']) && $_POST['tipo']=='tc' )
	{
		$_SESSION['miContrato']['tipo']=$_POST['tipo'];
		$_SESSION['miContrato']['idcontrato']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value']));
		$_SESSION['miContrato']['tipocontrato']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value'])));
		header("Location: ./updateContrato.php");
	// 		echo "<pre>";
	// print_r($_SESSION);
	// echo "</pre>";
		//unset($_SESSION['miContrato']);
	}
	else if ( isset($_POST['tipo']) && $_POST['tipo']=='ho' )
	{
		$_SESSION['miContrato']['tipo']=$_POST['tipo'];
		$_SESSION['miContrato']['idcontrato']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value']));
		$_SESSION['miContrato']['horario']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value'])));
		header("Location: ./updateContrato.php");
	// 		echo "<pre>";
	// print_r($_SESSION);
	// echo "</pre>";
		//unset($_SESSION['miContrato']);
	}
	else if ( isset($_POST['tipo']) && $_POST['tipo']=='ba' )
	{
		$_SESSION['miContrato']['tipo']=$_POST['tipo'];
		$_SESSION['miContrato']['idcontrato']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value']));
		header("Location: ./updateContrato.php");
	// 		echo "<pre>";
	// print_r($_SESSION);
	// echo "</pre>";
		//unset($_SESSION['miContrato']);
	}
	else if ( isset($_SESSION['miContrato']) && $_SESSION['miContrato']['tipo']=='tc' )
	{
		//COMPROBACIONES PREVIAS
		// echo "<pre>";
		// print_r($_SESSION);
		// echo "</pre>";
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];

		
		$datos=array();
		//ACTUALIZAR CONTRATO SI SE RECIBEN LOS DATOS
		if ( isset($_SESSION['miContrato']['idcontrato']) && isset($_SESSION['miContrato']['tipocontrato']) )
		{
			$tc=$_SESSION['miContrato']['tipocontrato'];
			$con=$_SESSION['miContrato']['idcontrato'];

			$sqlActualizaTipoContrato = "UPDATE `aux-contrato` SET `tipoco`='$tc' , `userupdated`='$user', `updated`='$fechaactual' WHERE `id`=$con;";
			$consulta = $conexion->query($sqlActualizaTipoContrato);

			if (!$consulta)
			{
				$ca="Error actualizando Tipo de Contrato. (Código de error:800x0)";
				$datos[]= $ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sqlActualizaTipoContrato);
			}				
		}
		
		//FIN COMPROBACIONES PREVIAS
		
		if (sizeOf($datos)==0)
		{
			$datos[]=1;
			$datos[]=$tc;
		}
		else
		{
			$datos[]= $ca;
		}

		unset ($_SESSION['miContrato']);
	}
	else if ( isset($_SESSION['miContrato']) && $_SESSION['miContrato']['tipo']=='ho' )
	{
		//COMPROBACIONES PREVIAS
		// echo "<pre>";
		// print_r($_SESSION);
		// echo "</pre>";
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];

		
		$datos=array();
		//ACTUALIZAR CONTRATO SI SE RECIBEN LOS DATOS
		if ( isset($_SESSION['miContrato']['idcontrato']) && isset($_SESSION['miContrato']['horario']) )
		{
			$ho=$_SESSION['miContrato']['horario'];
			$con=$_SESSION['miContrato']['idcontrato'];

			$sqlActualizaHorario = "UPDATE `aux-contrato` SET `horario`='$ho' , `userupdated`='$user', `updated`='$fechaactual' WHERE `id`=$con;";
			//  echo $sqlActualizaHorario;
			$consulta = $conexion->query($sqlActualizaHorario);

			if (!$consulta)
			{
				$ca="Error actualizando Horario. (Código de error:800x1)";
				$datos[]= $ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sqlActualizaHorario);
			}				
		}
		
		//FIN COMPROBACIONES PREVIAS
		
		if (sizeOf($datos)==0)
		{
			$datos[]=1;
			$datos[]=$ho;
		}
		else
		{
			$datos[]= $ca;
		}

		unset ($_SESSION['miContrato']);
	}
	else if ( isset($_SESSION['miContrato']) && $_SESSION['miContrato']['tipo']=='ba' )
	{
		//COMPROBACIONES PREVIAS
		// echo "<pre>";
		// print_r($_SESSION);
		// echo "</pre>";
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];

		
		$datos=array();
		//ACTUALIZAR CONTRATO SI SE RECIBEN LOS DATOS
		if ( isset($_SESSION['miContrato']['idcontrato']) )
		{
			$con=$_SESSION['miContrato']['idcontrato'];

			$sqlBajaContrato = "UPDATE `aux-contrato` SET `fecbaj`='$fechaactual' , `userupdated`='$user', `updated`='$fechaactual' WHERE `id`=$con;";
			$consulta = $conexion->query($sqlBajaContrato);

			if (!$consulta)
			{
				$ca="Error aplicando la Baja del Contrato. (Código de error:800x2)";
				$datos[]= $ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sqlBajaContrato);
				$sqlConductor="SELECT `idcon`, `idlic` FROM `aux-contrato` WHERE `id`=$con;";
				$consulta = $conexion->query($sqlConductor);
				$tupla=$consulta->fetch_assoc();
				$con=$tupla['idcon'];
				$lic=$tupla['idlic'];

				$sql="UPDATE `conductor` SET `active`=0 WHERE `dni`='$con';";
				$consulta = $conexion->query($sql);
				if ($consulta)
				{
					registrarActividad($sql);					
				}
				else
				{
					$ca="Error convirtiendo en inactivo al conductor " . $con . ". (Código de error: 800x3)";
					$datos[]=$ca;
					registrarActividad($ca);
				}

				$sqlTitular="SELECT `idtit` FROM `licencia` WHERE `id`=$lic;";
				$consulta = $conexion->query($sqlTitular);
				$tupla=$consulta->fetch_assoc();
				$tit=$tupla['idtit'];

				$sql="UPDATE `titular` SET `esconductor`=1 WHERE `dni`='$tit';";
				$consulta = $conexion->query($sql);

				if ($consulta)
				{
					registrarActividad($sql);					
				}
				else
				{
					$ca="Error convirtiendo en conductor de la licencia al titular " . $tit . ". (Código de error: 800x4)";
					$datos[]=$ca;
					registrarActividad($ca);
				}


			}				
		}
		
		//FIN COMPROBACIONES PREVIAS
		
		if (sizeOf($datos)==0)
		{
			$datos[]=1;
		}
		else
		{
			$datos[]= $ca;
		}

		unset ($_SESSION['miContrato']);
	}

	// cerramos la conexion	   
	$conexion->close();
	echo json_encode($datos);
?>