<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	//$_POST['numide'];
	$numide=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['numide'])));
	$datos=array();

	$sql = "SELECT * FROM `taximetro` WHERE `numide`='$numide';";    

	if ($sql!=""){
	
		$consulta = $conexion->query($sql);
		$numerot= $consulta->num_rows;

		if ($numerot>0)
		{
			$tupla=$consulta->fetch_assoc();
			$idtax=$tupla['id'];

			/***********************************************/
			/* COMPROBAR SI ESTA ASIGNADO A ALGUN VEHICULO */
			/***********************************************/
			$sql = "SELECT `idtax` FROM `vehiculo` WHERE `idtax`=$idtax;";
			$consulta = $conexion->query($sql);
			$numerov= $consulta->num_rows;

			if ($numerov==0)
			{
				$datos['taxim']=$tupla;
				$idmod=$tupla['idmodta'];

				
				/****************/
				/* BUSCAR MARCA */
				/****************/
				$sql = "SELECT `idmar`,`modelo`  FROM `modelotaximetro` WHERE `id`=$idmod;";
				$consulta = $conexion->query($sql);
				$numero2 = $consulta->num_rows;
				$tupla2=$consulta->fetch_assoc();
				if ($numero2>0)
				{
					$datos['marca']=$tupla2['idmar'];
					$datos['modelo']=$tupla2['modelo'];
				}
				/*******************/
				/* BUSCAR VEHICULO */
				/*******************/
				$sql = "SELECT `idmar`,`modelo`  FROM `modelotaximetro` WHERE `id`=$idmod;";
				$consulta = $conexion->query($sql);
				$numero2 = $consulta->num_rows;
				$tupla2=$consulta->fetch_assoc();
				if ($numero2>0)
				{
					$datos['marca']=$tupla2['idmar'];
					$datos['modelo']=$tupla2['modelo'];
				}
			}
			else
			{
				$datos="Enuso";
			}

	
		}
		else
			$datos="Sindatos";
	}		

	$conexion->close();
	echo json_encode($datos);	
?>