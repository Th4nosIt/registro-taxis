<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");

	if (isset($_POST))
	{
		$datos=array();
		$dni = $_POST['user'];
		$sql = "SELECT ac.*, li.`numlic` FROM `aux-contrato` ac ";
		$sql .= "INNER JOIN `licencia` li ON ac.`idlic`=li.`id` ";
		$sql .= "WHERE ac.`idcon`='$dni' ORDER BY ac.`fecbaj` asc;";	
		
		if ($sql!="")
		{
			$consulta = $conexion->query($sql);
			$numero= $consulta->num_rows;

			if ($numero>0)
			{
				while ($tupla=$consulta->fetch_assoc())
					$datos[]=$tupla;
			}
			else
				$datos="Sindatos";
		}
		echo json_encode($datos);
	}
	// cerramos la conexion	
	$conexion->close();
?>