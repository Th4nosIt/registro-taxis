<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	
	if (isset($_POST['mat']))
	{
		$mat=$_POST['mat'];
		$datos=array();

		$sql = "SELECT * FROM `vehiculo` WHERE `matveh`='$mat';";    

		if ($sql!=""){
		
			$consulta = $conexion->query($sql);
			$numerot= $consulta->num_rows;

			if ($numerot>0)
			{
				$tupla=$consulta->fetch_assoc();
				$datos['vehi']=$tupla;
				$idveh=$tupla['matveh'];
				$idmod=$tupla['idmodve'];
				$baja=$tupla['baja'];
				$fbaja=$tupla['fechabaja'];

				/********************************/
				/* SI ESE VEHICULO ESTA DE ALTA */
				/********************************/
				if (!$baja)
				{
					/*****************************************************************/
					/* COMPROBAR SI EXISTE ALGUNA LICENCIA A ASOCIADA A ESE VEHICULO */
					/*****************************************************************/
					$sql = "SELECT * FROM `licencia` WHERE `idveh`='$idveh';";
					$consulta = $conexion->query($sql);
					$numerol = $consulta->num_rows;
					
					if ($numerol>0)
						$datos['licen']=1;
					else
					{
						/****************/
						/* BUSCAR MARCA */
						/****************/
						$sql = "SELECT `idmar`,`modelo`  FROM `modelovehiculo` WHERE `id`=$idmod;";
						$consulta = $conexion->query($sql);
						$numero2 = $consulta->num_rows;
						$tupla2=$consulta->fetch_assoc();
						if ($numero2>0)
						{
							$datos['marca']=$tupla2['idmar'];
							$datos['modelo']=$tupla2['modelo'];
						}
					}					
				}
				else
				{
					$datos[]="baja";
					$datos[]=$fbaja;
				}
				
			}
			else
				$datos="Sindatos";
		}		
	}
	else if (isset($_POST['lic']))
	{
		//BUSCAR LA LICENCIA PARA OBTENER EL VEHICULO
		$lic=$_POST['lic'];
		$sql = "SELECT `idveh` FROM `licencia` WHERE `id`=$lic;";
		//echo $sql;
		$consulta = $conexion->query($sql);
		
		$numerol= $consulta->num_rows;

		if ($numerol>0)
		{
			$tupla=$consulta->fetch_assoc();
			$mat=$tupla['idveh'];

			$sql = "SELECT v.*,mo.`modelo`, mo.`idmar`, ma.`marca` FROM `vehiculo` v ";
			$sql .= "INNER JOIN `modelovehiculo` mo ON v.`idmodve`=mo.`id` ";
			$sql .= "INNER JOIN `marca` ma ON mo.`idmar`=ma.`id` ";
			$sql .= "WHERE v.`matveh`='$mat';";   
			//echo $sql; 
			if ($sql!="")
			{
			
				$consulta = $conexion->query($sql);
				$numerot= $consulta->num_rows;

				if ($numerot>0)
				{
					$tupla=$consulta->fetch_assoc();
					$datos['vehiculo']=$tupla;
					// $taxim=$tupla['idtax'];
					// if ($taxim!=null)
					// {
					// 	$sql = "SELECT ta.*, mo.`modelo`, mo.`idmar`, ma.`marca` FROM `taximetro` ta ";
					// 	$sql .= "INNER JOIN `modelotaximetro` mo ON ta.`idmodta`=mo.`id` ";
					// 	$sql .= "INNER JOIN `marca` ma ON mo.`idmar`=ma.`id` ";
					// 	$sql .= "WHERE ta.`id`='$taxim';";
					// 	//echo $sql;
					// 	$consulta = $conexion->query($sql);
					// 	$numerot = $consulta->num_rows;

					// 	if ($numerot>0)
					// 	{
					// 		//while ($tuplat=$consulta->fetch_assoc())
					// 		$tuplat=$consulta->fetch_assoc();
					// 		$datos['taximetro']=$tuplat;
					// 		/*$idmodta=$tuplat['idmodta'];
					// 		$sql = "SELECT mo.`modelo`, ma.`marca` FROM `modelotaximetro` mo ";
					// 		$sql .= "INNER JOIN `marca` ma ON mo.`idmar`=ma.`id` ";
					// 		$sql .= "WHERE mo.`id`=$idmodta;";
					// 		//echo $sql;

					// 		$consulta = $conexion->query($sql);
					// 		$numerom= $consulta->num_rows;
					// 		if ($numerom>0)
					// 		{
					// 			$tuplam=$consulta->fetch_assoc();
					// 			$datos['vehiculo'][]=$tuplam;							
					// 		}*/
					// 	}						
					// }
				}
				else
					$datos="Sindatos";
			}
		}
		else
		{
			$datos[]="Error. No existe licencia. (Código de error:200x0)";
		}

	}

	$conexion->close();
	echo json_encode($datos);	
?>