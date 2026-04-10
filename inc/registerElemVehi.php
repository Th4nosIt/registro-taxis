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

	if ( isset($_POST['info']) && isset($_POST['elem']) && $_POST['elem']=='seguro' ) 
	{
		$_SESSION['seguro']['elem']='seguro';
		$_SESSION['seguro']['mat']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value'])));
		$_SESSION['seguro']['fecini']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value']))));
		$_SESSION['seguro']['fecfin']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][2]['value']))));
		$_SESSION['seguro']['com']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][3]['value'])));
		$_SESSION['seguro']['numpol']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][4]['value'])));
		header("Location: ./registerElemVehi.php");
	}
	else if ( isset($_POST['info']) && isset($_POST['elem']) && $_POST['elem']=='revisa' ) 
	{
		$_SESSION['revisa']['elem']='revisa';
		$_SESSION['revisa']['mat']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value'])));
		$_SESSION['revisa']['fecrev']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value']))));
		$_SESSION['revisa']['obsrev']=mysqli_real_escape_string($conexion,htmlentities(trim($_POST['info'][2]['value'])));
		header("Location: ./registerElemVehi.php");
	}
	else if ( isset($_POST['info']) && isset($_POST['elem']) && $_POST['elem']=='inspec' ) 
	{
		$_SESSION['inspec']['elem']='inspec';
		$_SESSION['inspec']['mat']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value'])));
		$_SESSION['inspec']['fecins']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value']))));
		$_SESSION['inspec']['obsins']=mysqli_real_escape_string($conexion,htmlentities(trim($_POST['info'][2]['value'])));
		header("Location: ./registerElemVehi.php");
	}
	else if ( isset ($_SESSION['seguro']['mat']) && isset($_SESSION['seguro']['elem']) && $_SESSION['seguro']['elem']=='seguro')
	{
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];
		//COMPROBACIONES PREVIAS
		$mat=$_SESSION['seguro']['mat'];
		$fecini=$_SESSION['seguro']['fecini'];
		$fecfin=$_SESSION['seguro']['fecfin'];
		$com=($_SESSION['seguro']['com']!="")?$_SESSION['seguro']['com']:null;
		$numpol=($_SESSION['seguro']['numpol']!="")?$_SESSION['seguro']['numpol']:null;
		

		$datos = array();
		$sql="INSERT INTO `seguro` (`fecini`,`fecfin`,`company`,`numpol`,`idveh`,`usercreated`,`userupdated`,`updated`) VALUES ('$fecini','$fecfin','$com','$numpol','$mat','$user','$user','$fechaactual');";
			//echo $sql;
		$consulta = $conexion->query($sql);
		if (!$consulta)
		{
			$ca="Error añadiendo seguro. (Código de error:110x0)";
			$datos[]=$ca;
			registrarActividad($ca);
		}
		else
		{
			registrarActividad($sql);
			$datos[]=1;
			$datos[]=$fecini;
			$datos[]=$fecfin;
			$datos[]=$com;
			$datos[]=$numpol;
			$datos[]=$conexion->insert_id;
		}
		
		unset ($_SESSION['seguro']);
	}
	else if ( isset ($_SESSION['revisa']['mat']) && isset($_SESSION['revisa']['elem']) && $_SESSION['revisa']['elem']=='revisa')
	{
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];
		//COMPROBACIONES PREVIAS
		$mat=$_SESSION['revisa']['mat'];
		$fecrev=$_SESSION['revisa']['fecrev'];
		$obs=($_SESSION['revisa']['obsrev']!="")?$_SESSION['revisa']['obsrev']:null;

		$datos = array();
		$sql="INSERT INTO `revisionvehiculo` (`fecrev`,`obsrev`,`idveh`,`usercreated`,`userupdated`,`updated`) VALUES ('$fecrev','$obs','$mat','$user','$user','$fechaactual');";
			//echo $sql;
		$consulta = $conexion->query($sql);
		if (!$consulta)
		{
			$ca="Error añadiendo revisión. (Código de error:120x0)";
			$datos[]=$ca;
			registrarActividad($ca);
		}
		else
		{
			$identity=$conexion->insert_id;
			$sql="SELECT `obsrev` FROM `revisionvehiculo` where `id`=$identity";
			$consulta = $conexion->query($sql);
			$tupla=$consulta->fetch_assoc();
			$observa=$tupla['obsrev'];
			//$observa=preg_replace('/[\n|\r|\r\n|\n\r|\t|\0|\x0B]/', ' ',$obs);
			registrarActividad($sql);
			$datos[]=1;
			$datos[]=$fecrev;
			$datos[]=$observa;
			$datos[]=$conexion->insert_id;
		}
		
		unset ($_SESSION['revisa']);
	}
	else if ( isset ($_SESSION['inspec']['mat']) && isset($_SESSION['inspec']['elem']) && $_SESSION['inspec']['elem']=='inspec')
	{
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];
		//COMPROBACIONES PREVIAS
		$mat=$_SESSION['inspec']['mat'];
		$fecins=$_SESSION['inspec']['fecins'];
		$obs=($_SESSION['inspec']['obsins']!="")?$_SESSION['inspec']['obsins']:null;
		

		$datos = array();
		$sql="INSERT INTO `inspeccionmunicipalvehiculo` (`fecins`,`obsins`,`idveh`,`usercreated`,`userupdated`,`updated`) VALUES ('$fecins','$obs','$mat','$user','$user','$fechaactual');";
			//echo $sql;
		$consulta = $conexion->query($sql);
		if (!$consulta)
		{
			$ca="Error añadiendo inspección. (Código de error:130x0)";
			$datos[]=$ca;
			registrarActividad($ca);
		}
		else
		{
			$identity=$conexion->insert_id;
			$sql="SELECT `obsins` FROM `inspeccionmunicipalvehiculo` where `id`=$identity";
			$consulta = $conexion->query($sql);
			$tupla=$consulta->fetch_assoc();
			$observa=$tupla['obsins'];

			//$observa=preg_replace('/[\n|\r|\r\n|\n\r|\t|\0|\x0B]/', ' ',$obs);
			registrarActividad($sql);
			$datos[]=1;
			$datos[]=$fecins;
			$datos[]=$observa;
			$datos[]=$identity;
		}
		
		unset ($_SESSION['inspec']);
	}
	echo json_encode($datos);
	// cerramos la conexion	   
	$conexion->close();
?>