<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	/*********************************/
	/* SELECT MARCA/MODELO VEHICULOS */
	/*********************************/
	$datos=array();
	if (isset($_POST))
	{
		$que=$_POST['tipo'];
		if ( $que==1 )
		{
			$sql = "SELECT * FROM `marca`;";
			//echo $sql;
		}
		else if ( $que==2 )
		{
			$sql = "SELECT mv.*, ma.`marca` FROM `modelovehiculo` mv ";
			$sql .= "INNER JOIN `marca` ma ON mv.`idmar`=ma.`id`;";

		}	
		else if ( $que==3 )
		{
			$sql = "SELECT mt.*, ma.`marca` FROM `modelotaximetro` mt ";
			$sql .= "INNER JOIN `marca` ma ON mt.`idmar`=ma.`id`;";

		}
		if ($sql!=""){
		
			$consulta = $conexion->query($sql);
			$numero= $consulta->num_rows;

			if ($numero>0)
				while ($tupla=$consulta->fetch_assoc())
					$datos['elem'][]=$tupla;
			else
				$datos['elem']="Sindatos";
		}
	}
	// cerramos la conexion	   
	$conexion->close();
	echo json_encode($datos);
?>