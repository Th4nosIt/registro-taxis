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
	if ( isset($_POST['tipo']) && $_POST['tipo']=='ce' )
	{
		$_SESSION['emisorac']['lic']=htmlentities($_POST['info'][0]['value']);
		$_SESSION['emisorac']['emi']=htmlentities($_POST['info'][1]['value']);
		header("Location: ./registerEmisora.php");
	}
	else if ( isset($_POST['info']) && isset($_POST['tipo']) && ($_POST['tipo']=='i' || $_POST['tipo']=='g' ))
	{
		if (isset($_POST['emi']))
		{
			$_SESSION['emisora']['id']=$_POST['emi'];
		}
		$_SESSION['emisora']['nomemi']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value'])));
		$_SESSION['emisora']['telef1']=$_POST['info'][1]['value'];
		$_SESSION['emisora']['telef2']=$_POST['info'][2]['value'];
		$_SESSION['emisora']['fax']=$_POST['info'][3]['value'];
		header("Location: ./registerEmisora.php");
	}
	else if ( isset($_SESSION['emisorac']['emi']) )
	{
		$datos=array();
		$emi=$_SESSION['emisorac']['emi'];
		$lic=$_SESSION['emisorac']['lic'];
		$sql="UPDATE `licencia` SET `idemi`=$emi WHERE `id`=$lic;";
		$consulta = $conexion->query($sql);
		if (!$consulta)
			{
				$ca="Error actualizando licencia con la emisora. (Código de error:051x2)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sql);
				$datos[]=1;
			}

		unset ($_SESSION['emisorac']);;
	}
	else if ( isset ($_SESSION['emisora']['nomemi']) )
	{
		//COMPROBACIONES PREVIAS
		$datos=array();
		if (isset($_SESSION['emisora']['id']))
		{
			$id=$_SESSION['emisora']['id'];
		}
		$emi=$_SESSION['emisora']['nomemi'];
		$t1=($_SESSION['emisora']['telef1']!="")?$_SESSION['emisora']['telef1']:null;
		$t2=($_SESSION['emisora']['telef2']!="")?$_SESSION['emisora']['telef2']:null;
		$fa=($_SESSION['emisora']['fax']!="")?$_SESSION['emisora']['fax']:null;

		if (isset($id))
		{
			$sql="UPDATE `emisora` set `nomemi`='$emi' ";

			$sql.=", `telef1`='$t1', `telef2`='$t2', `fax`='$fa'  WHERE `id`=$id;";
			//echo $sql;
			$consulta = $conexion->query($sql);
			if (!$consulta)
			{
				$ca="Error actualizando emisora. (Código de error:050x2)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sql);
				$datos[]=1;
				$datos[]=$emi;
				$datos[]=($t1!="")?$t1:" -- ";
				$datos[]=($t2!="")?$t2:" -- ";
				$datos[]=($fa!="")?$fa:" -- ";
			}
		}
		else
		{
			$sql="SELECT * FROM `emisora` WHERE `nomemi`='$emi'";
			$consulta = $conexion->query($sql);
			$numero= $consulta->num_rows;
			if ($numero==0)
			{
				//INSERTAR EMISORA SI NO EXISTE Y SE RECIBEN LOS DATOS
				if ( isset($_SESSION['emisora']['nomemi']) )
				{
					$sql="INSERT INTO `emisora` (`nomemi`";
					if ($t1!="")
					{
						$sql.=",`telef1`";
					}
					if ($t2!="")
					{
						$sql.=",`telef2`";
					}
					if ($fa!="")
					{
						$sql.=",`fax`";
					}
					$sql .=") VALUES ('$emi'";
					if ($t1!="")
					{
						$sql.=",'$t1'";
					}
					if ($t2!="")
					{
						$sql.=",'$t2'";
					}
					if ($fa!="")
					{
						$sql.=",'$fa'";
					}
					$sql.=");";
					$consulta = $conexion->query($sql);

					if (!$consulta)
					{
						$ca="Error añadiendo emisora. (Código de error:050x0)";
						$datos[]=$ca;
						registrarActividad($ca);
					}
					else
					{
						registrarActividad($sql);
						//OBTENER ULTIMO ID ULTIMO REGISTRO INSERTADO
						$idEmi = $conexion->insert_id;
						$datos[]=1;
						$datos[]=$emi;
						$datos[]=($t1!=null)?$t1:" -- ";
						$datos[]=($t2!=null)?$t2:" -- ";
						$datos[]=($fa!=null)?$fa:" -- ";
						$datos[]=$idEmi;
					}
				}
			}
			else
			{
				$ca="Error. La emisora ya existe en la base de datos. (Código de error:050x1)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
		}
		
		unset ($_SESSION['emisora']);
	}
	echo json_encode($datos);
	// cerramos la conexion	   
	$conexion->close();
?>