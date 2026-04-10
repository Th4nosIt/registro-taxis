<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	$datos=array();
	$sql = "SELECT * FROM `emisora`;";
	if ($sql!=""){
	
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;

		if ($numero>0)
			while ($tupla=$consulta->fetch_assoc())
				$datos['emi'][]=$tupla;
		else
			$datos="Sindatos";
	}
	echo json_encode($datos);
	// cerramos la conexion	   
	$conexion->close();
?>