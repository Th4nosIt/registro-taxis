<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	/*********************************/
	/* SELECT MARCA VEHICULOS / TAXIMETRO*/
	/*********************************/
	if (isset($_POST))
	{
		$que=$_POST['tipo'];
		if ( $que=='v' )
		{
			$sql = "SELECT * FROM `marca` WHERE `tipo`=0;";
			//echo $sql;
		}
		else if ( $que=='t' )
		{
			$sql = "SELECT * FROM `marca` WHERE `tipo`=1;";
		}	
		
		if ($sql!=""){
		
			$consulta = $conexion->query($sql);
			$numero= $consulta->num_rows;

			if ($numero>0)
			{
				echo "<option value='0'>-- Seleccione</option>";
				while ($tupla=$consulta->fetch_assoc())
					echo "<option value='" . $tupla['id'] . "'>" . $tupla['marca'] . "</option>";
			}
			else
				echo 0;
		}
	}
	// cerramos la conexion	   
	$conexion->close();
?>