<?php
	require( './../../inc/conexion.php' );
	require( './../../inc/functions.php');

	if(!isset($_SESSION['logusuario']) || !comprobarGrupo($_SESSION['grupos']) || (!(in_array("GURBANISMO",$_SESSION['grupos'])||in_array("GDURBANISTICA",$_SESSION['grupos'])) && $_SESSION['misGrupos']!=['GURBANCONSULTA']) )
    	header('Location: ./../index.php');	
	// $tip=$_GET['info'][1]['value'];

	// echo "<pre>";
	// print_r($_POST);
	// echo "</pre>";

	// 	echo "<pre>";
	// print_r($_SESSION);
	// echo "</pre>";

	if ( isset($_POST['info']) )
	{
		$_SESSION['contrato']['dni']=strtoupper(trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value']))));
		$_SESSION['contrato']['fecalt']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value']))));
		$_SESSION['contrato']['tipoco']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][2]['value'])));
		$_SESSION['contrato']['horcon']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][3]['value'])));
		header("Location: ./registerContrato.php");
	}
	else if ( isset ($_SESSION['contrato']['dni']) )
	{
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];
		//COMPROBACIONES PREVIAS
		$dni=$_SESSION['contrato']['dni'];
		$fec=$_SESSION['contrato']['fecalt'];
		$tip=$_SESSION['contrato']['tipoco'];
		$hor=($_SESSION['contrato']['horcon']!="")?$_SESSION['contrato']['horcon']:null;

		$datos = array();
		$sql="INSERT INTO `auxcontrato` (`idcon`,`idlic`,`fecalt`,`tipoco`,`horario`,`usercreated`,`userupdated`,`updated`) VALUES ('$dni',$lic,'$fec','$tip','$hor','$user','$user','$fechaactual');";
			//echo $sql;
		$consulta = $conexion->query($sql);
		if (!$consulta)
		{
			$ca="Error añadiendo contrato. (Código de error:100x0)";
			$datos[]=$ca;
			registrarActividad($ca);
		}
		else
		{
			registrarActividad($sql);
			$datos[]=1;
			$datos[]=$fec;
			$datos[]=$tip;
			$datos[]=$hor;
			$datos[]=$conexion->insert_id;
		}
		
		unset ($_SESSION['contrato']);
	}
	echo json_encode($datos);
	// cerramos la conexion	   
	$conexion->close();
?>