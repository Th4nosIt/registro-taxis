<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	$lic=$_POST['lic'];
	$sql = "SELECT l.* FROM `licencia` l WHERE l.`id`=$lic;";    
	if ($sql!=""){
	
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;
		//echo $numero;

		if ($numero>0)
			while ($tupla=$consulta->fetch_assoc())
				if ($tupla['idtit']!=null)
					echo true;
				else
					echo false;
		
		$conexion->close();
	}
?>