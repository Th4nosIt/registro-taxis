<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	$datos=array();
	if (isset($_POST['lic']))
	{
		$lic=$_POST['lic'];
		if ($_POST['tipo']=='auth')
		{
			$sql = "SELECT ata.`tipoautorizacion`, a.* FROM `autorizacion` a ";
			$sql .= "INNER JOIN `auxtipoautorizacion` ata ON a.`auxtipaut`=ata.`id` ";
			$sql .= "WHERE a.`idlic`=$lic;";
			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero>0)
					while ($tupla=$consulta->fetch_assoc())
						$datos['autoriza'][]=$tupla;
				else
					$datos="Sindatos";
			}
		}
		else if ($_POST['tipo']=='subv')
		{
			$sql = "SELECT * FROM `historicosubvenciones` WHERE `idlic`=$lic;";
			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero>0)
					while ($tupla=$consulta->fetch_assoc())
						$datos['subven'][]=$tupla;
				else
					$datos="Sindatos";
			}
		}
		else if ($_POST['tipo']=='expe')
		{
			$sql = "SELECT ate.`tipoexpediente`, e.*  FROM `expediente` e ";
			$sql .= "INNER JOIN `auxtipoexpediente` ate ON e.`auxtipexp`=ate.`id` ";
			$sql .= "WHERE e.`idlic`=$lic ORDER BY e.`fecexp` desc;";
			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero>0)
					while ($tupla=$consulta->fetch_assoc())
						$datos['expedi'][]=$tupla;
				else
					$datos="Sindatos";
			}
		}
		else if ($_POST['tipo']=='hist')
		{
			$sql = "SELECT  ht.*, l.`numlic` FROM `historicotransmisiones` ht ";
			$sql .= "INNER JOIN `licencia` l ON ht.`idlic`=l.`id` ";
			$sql .= "WHERE ht.`idlic`=$lic ORDER BY ht.`fectra` desc;";
			//echo $sql;
			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numero= $consulta->num_rows;

				if ($numero>0)
					while ($tupla=$consulta->fetch_assoc())
						$datos['histor'][]=$tupla;
				else
					$datos="Sindatos";
			}
		}

	}

	echo json_encode($datos);
	// cerramos la conexion	   
	$conexion->close();
?>