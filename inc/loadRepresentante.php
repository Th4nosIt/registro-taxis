<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	$datos=array();
	if (isset($_POST['dniR']))
	{
		$rep=$_POST['dniR'];
		$sql = "SELECT * FROM `representante` WHERE `dni`='$rep';";
		if ($sql!=""){
		
			$consulta = $conexion->query($sql);
			$numero= $consulta->num_rows;

			if ($numero>0)
				while ($tupla=$consulta->fetch_assoc())
					$datos[]=$tupla;
			else
				$datos="Sindatos";
		}
	}

	echo json_encode($datos);
	// cerramos la conexion	   
	$conexion->close();
?>