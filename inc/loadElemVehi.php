<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");

	if (isset($_POST))
	{
		$datos=array();
		if ($_POST['elem']=='seguro')
		{
			$mat=$_POST['matri'];

			$sql = "SELECT * FROM `seguro` WHERE `idveh`='$mat';";
		
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
				{
					$datos="Sindatos";
				}							
			}
		}
		else if ($_POST['elem']=='revisa')
		{
			$mat=$_POST['matri'];

			$sql = "SELECT * FROM `revisionvehiculo` WHERE `idveh`='$mat';";
		
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
				{
					$datos="Sindatos";
				}							
			}
		}
		else if ($_POST['elem']=='inspec')
		{
			$mat=$_POST['matri'];

			$sql = "SELECT * FROM `inspeccionmunicipalvehiculo` WHERE `idveh`='$mat';";
		
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
				{
					$datos="Sindatos";
				}							
			}
		}
		echo json_encode($datos);
	}
	// cerramos la conexion	   
	$conexion->close();
?>