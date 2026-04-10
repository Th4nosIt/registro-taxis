<?php
	require( './../../inc/conexion.php' );
	require( './../../inc/functions.php');

	if(!isset($_SESSION['logusuario']) || !comprobarGrupo($_SESSION['grupos']) || (!(in_array("GURBANISMO",$_SESSION['grupos'])||in_array("GDURBANISTICA",$_SESSION['grupos'])) && $_SESSION['misGrupos']!=['GURBANCONSULTA']) )
    	header('Location: ./../index.php');	
	// $tip=$_GET['info'][1]['value'];

	// echo "<pre>";
	// print_r($_POST);
	// echo "</pre>";

	if ( isset($_POST['info']) && $_POST['info'][0]['value']=='maT' )
	{
		$_SESSION['marca']['tipo']=$_POST['info'][0]['value'];
		$_SESSION['marca']['marca']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value']));
		header("Location: ./registerElemento.php");
	}
	else if ( isset($_POST['info']) && $_POST['info'][0]['value']=='moT' )
	{
		$_SESSION['modelo']['tipo']=$_POST['info'][0]['value'];
		$_SESSION['modelo']['marca']=$_POST['info'][1]['value'];
		$_SESSION['modelo']['modelo']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][2]['value']));
		header("Location: ./registerElemento.php");
	}
	else if ( isset($_SESSION['marca']) && $_SESSION['marca']['tipo']=='maT' )
	{
		//COMPROBACIONES PREVIAS
		$mar=$_SESSION['marca']['marca'];
		$sql="SELECT * FROM `marca` WHERE `marca`='$mar' && `tipo`=1;";
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;

		$datos=array();
		if ($numero==0)
		{
			//INSERTAR MARCA SI NO EXISTE Y SE RECIBEN LOS DATOS
			if ( isset($_SESSION['marca']['marca']) )
			{
				$sql="INSERT INTO `marca` (`marca`, `tipo`) VALUES (";
				$sql.="'$mar',1);";
				$consulta = $conexion->query($sql);

				if (!$consulta)
				{
					$ca="Error añadiendo marca. (Código de error:030x0)";
					$datos[]=$ca;
					registrarActividad($ca);
				}
				else
				{
					registrarActividad($sql);
					//OBTENER ULTIMO ID ULTIMO REGISTRO INSERTADO
					$idMar = $conexion->insert_id;
				}
			}
		}
		else
		{
			$ca="Error. La marca ya existe en la base de datos. (Código de error:030x1)";
			$datos[]=$ca;
			registrarActividad($ca);
		}

		if (sizeOf($datos)==0)
		{
			$datos['marca']['current']=$idMar;
			$sql="SELECT id as ident, marca as descripcion FROM `marca` WHERE `tipo`=1;";
			$consulta = $conexion->query($sql);
			while ($tupla=$consulta->fetch_assoc())
				$datos['marca']['todos'][]=$tupla;
		}
		else
			$datos[]=0;
		
		unset ($_SESSION['marca']);
	}
	else if ( isset($_SESSION['modelo']) && $_SESSION['modelo']['tipo']=='moT' )
	{
		//COMPROBACIONES PREVIAS
		$mod=$_SESSION['modelo']['modelo'];
		$mar=$_SESSION['modelo']['marca'];
		$sql="SELECT * FROM `modelotaximetro` WHERE `modelo`='$mod' AND `idmar`=$mar;";
		//echo $sql;
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;

		$datos=array();
		if ($numero==0)
		{
			//INSERTAR MODELO SI NO EXISTE Y SE RECIBEN LOS DATOS
			if ( isset($_SESSION['modelo']['modelo']) )
			{
				$sql="INSERT INTO `modelotaximetro` (`modelo`, `idmar`) VALUES (";
				$sql.="'$mod',$mar);";
				$consulta = $conexion->query($sql);

				if (!$consulta)
				{
					$ca="Error añadiendo modelo. (Código de error:040x0)";
					$datos[]=$ca;
					registrarActividad($ca);
				}
				else
				{
					registrarActividad($sql);
					//OBTENER ULTIMO ID ULTIMO REGISTRO INSERTADO
					$idMar = $conexion->insert_id;
				}
			}
		}
		else
		{
			$ca="Error. El modelo ya existe en la base de datos para la marca actual. (Código de error:040x1)";
			$datos[]=$ca;
			registrarActividad($ca);
		}

		if (sizeOf($datos)==0)
		{
			$datos['modelo']['current']=$idMar;
			$sql="SELECT id as ident, modelo as descripcion FROM `modelotaximetro` WHERE `idmar`=$mar; ";
			//echo $sql;
			$consulta = $conexion->query($sql);
			while ($tupla=$consulta->fetch_assoc())
				$datos['modelo']['todos'][]=$tupla;
		}
		else
			$datos[]=0;
		
		unset ($_SESSION['modelo']);
	}

	
	echo json_encode($datos);
	// cerramos la conexion	   
	$conexion->close();
?>