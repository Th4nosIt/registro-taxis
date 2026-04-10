<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	
	if (isset($_POST['lic']))
	{
		//BUSCAR LA LICENCIA PARA OBTENER EL VEHICULO
		$lic=$_POST['lic'];
		$sql = "SELECT `idemi` FROM `licencia` WHERE `id`=$lic;";
		//echo $sql;
		$consulta = $conexion->query($sql);
		
		$numerol= $consulta->num_rows;

		if ($numerol>0)
		{
			$tupla=$consulta->fetch_assoc();
			$emi=($tupla['idemi']!=null)?$tupla['idemi']:0;

			if ($emi!=0)
			{
				$datos=array();
				$sql = "SELECT e.*  FROM `emisora` e ";
				// $sql .= "INNER JOIN `modelovehiculo` mo ON v.`idmodve`=mo.`id` ";
				// $sql .= "INNER JOIN `marca` ma ON mo.`idmar`=ma.`id` ";
				$sql .= "WHERE e.`id`=$emi;";   
				//echo $sql; 
				if ($sql!="")
				{
				
					$consulta = $conexion->query($sql);
					$numeroe= $consulta->num_rows;

					if ($numeroe>0)
					{
						$tupla=$consulta->fetch_assoc();
						$datos['emisora']=$tupla;
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
				$datos=0;
			}
		}
	}
	else
	{
		$datos[]="Error. No existe licencia. (Código de error:200x0)";
	}

	

	$conexion->close();
	echo json_encode($datos);	
?>