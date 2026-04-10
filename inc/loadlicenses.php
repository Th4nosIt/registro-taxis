<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	//$opc=$_POST['elem'];

	//$start = isset($_GET['start']) ? $_GET['start']: 0;
	//$per_page=$_GET['per_page'];
	$sql = "SELECT l.`id` , l.`idtit`, l.`numlic`, t.`nomtit`, t.`apetit` FROM `licencia` l ";    
	$sql .= " LEFT JOIN `titular` t ON l.`idtit`=t.`dni` ORDER BY l.`id` ";//LIMIT $start, $per_page;";

	//echo $sql;

	$datos = array();

	if ($sql!=""){
	
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;
		//echo $numero;

		if ($numero>0)
			while ($tupla=$consulta->fetch_assoc())
				$datos[]=$tupla;
		
		$conexion->close();
	}
	echo json_encode($datos);	
?>