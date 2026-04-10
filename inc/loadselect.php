<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	/**************************/
	/* SELECT MARCA VEHICULOS */
	/**************************/
	$datos=array();
	if (isset($_POST['mar']))
	{
		$tip=$_POST['tipo'];
		$mar=$_POST['mar'];
		if ( $tip =='ve')
		{
			$sql = "SELECT `id` , `modelo` FROM `modelovehiculo` WHERE `idmar`=$mar ORDER BY `modelo` asc;";
			//echo $sql;
			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero>0)
					while ($tupla=$consulta->fetch_assoc())
						$datos['move'][]=$tupla;
				else
					$datos="Sindatos";
			}
		}
		else
		{
			$sql = "SELECT `id` , `modelo` FROM `modelotaximetro` WHERE `idmar`=$mar ORDER BY `modelo` asc;";
			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero>0)
					while ($tupla=$consulta->fetch_assoc())
						$datos['mota'][]=$tupla;
				else
					$datos="Sindatos";					
			}
		}
	}
	else if (isset($_POST['step']))
	{
		if ($_POST['step']=='v')
		{
			$sql = "SELECT `id` , `marca` FROM `marca` WHERE `tipo`=0 ORDER BY `marca` asc;";
			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero>0)
					while ($tupla=$consulta->fetch_assoc())
						$datos['mave'][]=$tupla;
			}

			/**************************/
			/* SELECT MARCA TAXIMETRO */
			/**************************/
			$sql = "SELECT `id` , `marca` FROM `marca` WHERE `tipo`=1 ORDER BY `marca` asc;";
			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero>0)
					while ($tupla=$consulta->fetch_assoc())
						$datos['mata'][]=$tupla;
			}

			/***************************/
			/* SELECT TIPO COMBUSTIBLE */
			/***************************/
			$sql = "SELECT `id` , `combus` FROM `combustible`;";
			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero>0)
					while ($tupla=$consulta->fetch_assoc())
						$datos['combu'][]=$tupla;
			}
		}
		else if ($_POST['step']=='t')
		{
			/**************************/
			/* SELECT MARCA TAXIMETRO */
			/**************************/
			$sql = "SELECT `id` , `marca` FROM `marca` WHERE `tipo`=1 ORDER BY `marca` asc;";
			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero>0)
					while ($tupla=$consulta->fetch_assoc())
						$datos['mata'][]=$tupla;
			}
		}
		else if ($_POST['step']=='e' || $_POST['step']=='ec')
		{
			$sql = "SELECT `id` , `nomemi` FROM `emisora` ORDER BY `nomemi` asc;";
			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero>0)
					while ($tupla=$consulta->fetch_assoc())
						$datos['emi'][]=$tupla;
			}
		}
		else if ($_POST['step']=='au')
		{
			$sql = "SELECT `id` , `tipoautorizacion` FROM `auxtipoautorizacion` ORDER BY `tipoautorizacion` asc;";
			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero>0)
					while ($tupla=$consulta->fetch_assoc())
						$datos['autoriza'][]=$tupla;
			}
		}
		else if ($_POST['step']=='ex')
		{
			$sql = "SELECT `id` , `tipoexpediente` FROM `auxtipoexpediente` ORDER BY `tipoexpediente` asc;";
			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero>0)
					while ($tupla=$consulta->fetch_assoc())
						$datos['expedi'][]=$tupla;
			}
		}		

	}

	echo json_encode($datos);
	// cerramos la conexion	   
	$conexion->close();
?>