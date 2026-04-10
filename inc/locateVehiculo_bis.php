<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	$mat=$_POST['mat'];
	$datos=array();

	$sql = "SELECT * FROM `vehiculo` WHERE `matveh`='$mat';";    

	if ($sql!=""){
	
		$consulta = $conexion->query($sql);
		$numerot= $consulta->num_rows;

		if ($numerot>0)
		{
			$datos="Ya existe un vehículo con esta matrícula.";
		}
		else
			$datos="Sindatos";
	}		

	$conexion->close();
	echo json_encode($datos);	
?>