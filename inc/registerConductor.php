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
		$_SESSION['conductor']['dni']=strtoupper(trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value']))));
		$_SESSION['conductor']['nomcon']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value'])));
		$_SESSION['conductor']['apecon']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][2]['value'])));
		$_SESSION['conductor']['telcon']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][3]['value'])));
		$_SESSION['conductor']['domcon']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][4]['value'])));
		header("Location: ./registerConductor.php");
	}
	else if ( isset ($_SESSION['conductor']['dni']) )
	{
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];
		//COMPROBACIONES PREVIAS
		$dni=$_SESSION['conductor']['dni'];
		$nom=$_SESSION['conductor']['nomcon'];
		$ape=$_SESSION['conductor']['apecon'];
		$t1=($_SESSION['conductor']['telcon']!="")?$_SESSION['conductor']['telcon']:null;
		$dom=($_SESSION['conductor']['domcon']!="")?$_SESSION['conductor']['domcon']:null;

		$sql="SELECT * FROM `conductor` WHERE `dni`='$dni';";
		$consulta = $conexion->query($sql);
		$numero = $consulta->num_rows;
		$datos = array();
		if ($numero==1)
		{
			$sql="UPDATE `conductor` SET `nomcon`='$nom', `apecon`='$ape', `telcon`='$t1', `domcon`='$dom',`userupdated`='$user',`updated`='$fechaactual' WHERE `dni`='$dni';";
			//echo $sql;
			$consulta = $conexion->query($sql);
			if (!$consulta)
			{
				$ca="Error actualizando conductor. (Código de error:090x0)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sql);
				$datos[]=1;
			}
		}
		else
		{
			$ca="Error. No se encuentra el conductor. (Código de error:090x1)";
			$datos[]=$ca;
			registrarActividad($ca);
		}
		
		unset ($_SESSION['conductor']);
		echo json_encode($datos);
	}
	// cerramos la conexion	   
	$conexion->close();
?>