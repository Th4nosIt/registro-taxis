<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	$datos=array();
	$sql = "SELECT v.`matveh`, v.`numbas`, v.`fecmat`, v.`fecitv`, mo.`modelo`, ma.`marca`,v.`baja`,v.`fechabaja`,l.`numlic` FROM `vehiculo` v ";
	$sql .= "LEFT JOIN `modelovehiculo` mo ON v.`idmodve`=mo.`id` ";
	$sql .= "LEFT JOIN `licencia` l ON v.`matveh`=l.`idveh` ";
	$sql .= "INNER JOIN `marca` ma ON mo.`idmar`=ma.`id`;";
	//echo $sql;
	if ($sql!=""){
	
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;

		if ($numero>0)
			while ($tupla=$consulta->fetch_assoc())
				$datos['veh'][]=$tupla;
		else
			$datos="Sindatos";
	}
	echo json_encode($datos);
	// cerramos la conexion	   
	$conexion->close();
?>