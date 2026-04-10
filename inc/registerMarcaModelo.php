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

	if ( isset($_POST['elem']) && $_POST['elem'] == 1 )
	{
		$_SESSION['marca']['marca']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value'])));
		$_SESSION['marca']['tipo']=$_POST['info'][1]['value'];
		header("Location: ./registerMarcaModelo.php");
	}
	else if ( isset($_POST['elem']) && ($_POST['elem'] == 2 || $_POST['elem'] == 3) )
	{
		$_SESSION['modelo']['modelo']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value'])));
		$_SESSION['modelo']['marca']=$_POST['info'][1]['value'];
		$_SESSION['modelo']['tipo']=$_POST['elem'];
		header("Location: ./registerMarcaModelo.php");
	}
	else if ( isset ($_SESSION['marca']['tipo']) && $_SESSION['marca']['marca'] )
	{
		//COMPROBACIONES PREVIAS
		$mar=$_SESSION['marca']['marca'];
		if ($_SESSION['marca']['tipo']==1)
		{
			$tip=0;			
		}
		else
		{
			$tip=1;
		}
		$sql="SELECT * FROM `marca` WHERE `marca`='$mar' AND `tipo`=$tip;";
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;
		$datos=array();
		if ($numero==0)
		{
			//INSERTAR MARCA SI NO EXISTE Y SE RECIBEN LOS DATOS
			if ( isset($_SESSION['marca']['marca']) )
			{
				$sql="INSERT INTO `marca` (`marca`, `tipo`) VALUES (";
				$sql.="'$mar',$tip);";
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
					$datos[]=1;
					$datos[]=$mar;
					if ($tip==0)
					{
						$datos[]="Vehículo";						
					}
					else
					{
						$datos[]="Taxímetro";						
					}

				}
			}
		}
		else
		{
			$ca="Error. La marca ya existe en la base de datos. (Código de error:030x1)";
			$datos[]=$ca;
			registrarActividad($ca);
		}
		unset ($_SESSION['marca']);
	}
	else if ( isset ($_SESSION['modelo']['marca']) && $_SESSION['modelo']['modelo'] )
	{
		//COMPROBACIONES PREVIAS
		if ($_SESSION['modelo']['tipo']==2)
		{
			$tabla='modelovehiculo';				
		}
		else
		{
			$tabla='modelotaximetro';
		}
		$mar=$_SESSION['modelo']['marca'];
		$mod=$_SESSION['modelo']['modelo'];
		$sql="SELECT * FROM `" . $tabla . "` WHERE `modelo`='$mod' AND `idmar`=$mar;";
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;
		$datos=array();
		if ($numero==0)
		{
			//INSERTAR MODELO SI NO EXISTE Y SE RECIBEN LOS DATOS

			if ( isset($_SESSION['modelo']['modelo']) )
			{
				$sql = "INSERT INTO `" . $tabla . "` (`modelo`, `idmar`) VALUES (";
				$sql .= "'$mod',$mar);";
				//echo $sql;
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
					$datos[]=1;
					$datos[]=$mod;
					$sql="SELECT * FROM `marca` WHERE `id`=$mar";
					$consulta = $conexion->query($sql);
					$numero2= $consulta->num_rows;
					if ($numero2==1)
					{
						$tupla=$consulta->fetch_assoc();
						$datos[]=$tupla['marca'];
					}
					else
					{
						$ca="Error cargando datos de marca. (Código de error:040x1)";
						$datos[]=$ca;
						registrarActividad($ca);
					}
					
				}
			}
		}
		else
		{
			$ca="Error. El modelo ya existe en la base de datos. (Código de error:040x2)";
			$datos[]=$ca;
			registrarActividad($ca);
		}
		unset ($_SESSION['modelo']);
	}

	echo json_encode($datos);
	// cerramos la conexion	   
	$conexion->close();
?>