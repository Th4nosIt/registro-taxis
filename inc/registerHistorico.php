<?php
	require( './../../inc/conexion.php' );
	require( './../../inc/functions.php');

	if(!isset($_SESSION['logusuario']) || !comprobarGrupo($_SESSION['grupos']) || (!(in_array("GURBANISMO",$_SESSION['grupos'])||in_array("GDURBANISTICA",$_SESSION['grupos'])) && $_SESSION['misGrupos']!=['GURBANCONSULTA']) )
    	header('Location: ./../index.php');	
	// $tip=$_GET['info'][1]['value'];

	// echo "<pre>";
	// print_r($_POST);
	// echo "</pre>";



	if ( isset($_POST['info']) && $_POST['tipo']=='auth')
	{
		$_SESSION['autoriza']['fecaut']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][2]['value']))));
		$_SESSION['autoriza']['lic']=$_POST['info'][0]['value'];
		$_SESSION['autoriza']['tipo']=$_POST['info'][1]['value'];
		header("Location: ./registerHistorico.php");
	}
	else if ( isset($_POST['info']) && $_POST['tipo']=='subv')
	{
		$_SESSION['subven']['fecoto']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][2]['value']))));
		$_SESSION['subven']['lic']=$_POST['info'][0]['value'];
		$_SESSION['subven']['objeto']=$_POST['info'][1]['value'];
		header("Location: ./registerHistorico.php");
	}
	else if ( isset($_POST['info']) && $_POST['tipo']=='expe')
	{
		$_SESSION['expedi']['fecexp']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][2]['value']))));
		$_SESSION['expedi']['lic']=$_POST['info'][0]['value'];
		$_SESSION['expedi']['tipo']=$_POST['info'][1]['value'];
		$_SESSION['expedi']['descri']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][3]['value'])));
		header("Location: ./registerHistorico.php");
	}
	else if ( isset($_POST['info']) && $_POST['tipo']=='hist')
	{
		$_SESSION['histor']['fectra']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value']))));
		$_SESSION['histor']['lic']=$_POST['info'][0]['value'];
		$_SESSION['histor']['import']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][2]['value'])));
		$_SESSION['histor']['dni']=strtoupper(trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][3]['value']))));
		$_SESSION['histor']['nomape']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][4]['value'])));
		header("Location: ./registerHistorico.php");
	}
	else if ( isset ($_SESSION['autoriza']['fecaut']) )
	{
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];
		//COMPROBACIONES PREVIAS
		// echo "<pre>";
		// print_r($_SESSION);
		// echo "</pre>";

		$fec=$_SESSION['autoriza']['fecaut'];
		$lic=$_SESSION['autoriza']['lic'];
		$tip=$_SESSION['autoriza']['tipo'];

		$sql="SELECT * FROM `autorizacion` WHERE `auxtipaut`=$tip AND `idlic`=$lic AND `active`=1;";
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;
		$datos=array();
		if ($numero==0)
		{
			//INSERTAR AUTORIZACIONES SI NO EXISTE Y SE RECIBEN LOS DATOS
			if ( isset($_SESSION['autoriza']['fecaut']) )
			{
				$sql="INSERT INTO `autorizacion` (`auxtipaut`,`fecaut`,`active`,`idlic`,`usercreated`,`userupdated`,`updated`) VALUES ($tip,'$fec',1,$lic,'$user','$user','$fechaactual');";
				
				$consulta = $conexion->query($sql);

				if (!$consulta)
				{
					$ca="Error añadiendo autorización. (Código de error:150x0)";
					$datos[]=$ca;
					registrarActividad($ca);
				}
				else
				{
					registrarActividad($sql);
					$sql="SELECT `tipoautorizacion` FROM `auxtipoautorizacion` WHERE `id`=$tip;";
					$consulta = $conexion->query($sql);
					$tupla=$consulta->fetch_array();

					//OBTENER ULTIMO ID ULTIMO REGISTRO INSERTADO
					$idAut = $conexion->insert_id;
					$datos[]=1;
					$datos[]=$tupla['tipoautorizacion'];
					$datos[]=$fec;
					$datos[]=1;
					$datos[]=$idAut;
				}
			}
		}
		else
		{
			$ca="Error. Ya existe la autorización y está activa. (Código de error:150x1)";
			$datos[]=$ca;
			registrarActividad($ca);
		}		
		unset ($_SESSION['autoriza']);
	}
	else if ( isset ($_SESSION['subven']['fecoto']) )
	{
		//COMPROBACIONES PREVIAS
		// echo "<pre>";
		// print_r($_SESSION);
		// echo "</pre>";
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];

		$fec=$_SESSION['subven']['fecoto'];
		$lic=$_SESSION['subven']['lic'];
		$obj=$_SESSION['subven']['objeto'];

		//INSERTAR SUBVENCION SI SE RECIBEN LOS DATOS
		if ( isset($_SESSION['subven']['fecoto']) )
		{
			$sql="INSERT INTO `historicosubvenciones` (`fecoto`,`objeto`,`idlic`,`usercreated`,`userupdated`,`updated`) VALUES ('$fec','$obj',$lic,'$user','$user','$fechaactual');";
			
			$consulta = $conexion->query($sql);

			if (!$consulta)
			{
				$ca="Error añadiendo subvención. (Código de error:160x0)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sql);
				//OBTENER ULTIMO ID ULTIMO REGISTRO INSERTADO
				$idSub = $conexion->insert_id;
				$datos[]=1;
				$datos[]=$obj;
				$datos[]=$fec;
				$datos[]=$idSub;
			}
		}
			
		unset ($_SESSION['subven']);
	}
	else if ( isset ($_SESSION['expedi']['fecexp']) )
	{
		//COMPROBACIONES PREVIAS
		// echo "<pre>";
		// print_r($_SESSION);
		// echo "</pre>";
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];
		
		$fec=$_SESSION['expedi']['fecexp'];
		$lic=$_SESSION['expedi']['lic'];
		$tip=$_SESSION['expedi']['tipo'];
		$des=$_SESSION['expedi']['descri'];

		//INSERTAR EXPEDIENTE SI NO EXISTE Y SE RECIBEN LOS DATOS
		if ( isset($_SESSION['expedi']['fecexp']) )
		{
			$sql="INSERT INTO `expediente` (`auxtipexp`,`fecexp`,`descripcion`,`idlic`,`usercreated`,`userupdated`,`updated`) VALUES ($tip,'$fec','$des',$lic,'$user','$user','$fechaactual');";
			
			//echo $sql;
			$consulta = $conexion->query($sql);
			//OBTENER ULTIMO ID ULTIMO REGISTRO INSERTADO
			$idAut = $conexion->insert_id;
			//echo $idAut;
			if (!$consulta)
			{
				$ca="Error añadiendo expediente. (Código de error:170x0)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sql);
				$sql="SELECT `tipoexpediente` FROM `auxtipoexpediente` WHERE `id`=$tip;";
				
				$consulta = $conexion->query($sql);
				$tupla=$consulta->fetch_array();

				// //OBTENER ULTIMO ID ULTIMO REGISTRO INSERTADO
				// $idAut = $conexion->insert_id;
				$datos[]=1;
				$datos[]=$tupla['tipoexpediente'];
				$datos[]=$fec;
				$datos[]=$des;
				$datos[]=$idAut;
			}
		}	
		unset ($_SESSION['expedi']);
	}
	else if ( isset ($_SESSION['histor']['fectra']) )
	{
		//COMPROBACIONES PREVIAS
		// echo "<pre>";
		// print_r($_SESSION);
		// echo "</pre>";
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];
		
		$fec=$_SESSION['histor']['fectra'];
		$lic=$_SESSION['histor']['lic'];
		$imp=$_SESSION['histor']['import'];
		$dni=$_SESSION['histor']['dni'];
		$nom=$_SESSION['histor']['nomape'];


		//INSERTAR HISTORICO SI SE RECIBEN LOS DATOS
		if ( isset($_SESSION['histor']['fectra']) )
		{
			$sql="INSERT INTO `historicotransmisiones` (`idlic`,`fectra`,`import`,`dniTitOld`,`nomapeOldTit`,`usercreated`,`userupdated`,`updated`) VALUES ($lic,'$fec',$imp,'$dni','$nom','$user','$user','$fechaactual');";
			
			$consulta = $conexion->query($sql);

			if (!$consulta)
			{
				$ca="Error añadiendo entrada en el histórico. (Código de error:180x0)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sql);
				//OBTENER ULTIMO ID ULTIMO REGISTRO INSERTADO
				$idHis = $conexion->insert_id;
				$datos[]=1;
				$datos[]=$fec;
				$datos[]=$nom;
				$datos[]=$dni;
				$datos[]=$idHis;
			}
		}	
		unset ($_SESSION['histor']);
	}
	echo json_encode($datos);
	// cerramos la conexion	   
	$conexion->close();
?>