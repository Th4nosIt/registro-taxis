<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	$mat=$_GET['mat'];
	$datos=array();

	$sql = "SELECT v.*, t.*, mov.`idmar` AS idmarve ,mot.`idmar` AS idmarta FROM `vehiculo` v ";
	$sql .= "INNER JOIN `modelovehiculo` mov ON v.`idmodve`=mov.`id` ";
	$sql .= "LEFT JOIN `taximetro` t ON v.`idtax`=t.`id` ";
	$sql .= "LEFT JOIN `modelotaximetro` mot ON t.`idmodta`=mot.`id` ";
	$sql .= "WHERE v.`matveh`='$mat';";

	//echo $sql;

	if ($sql!=""){
	
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;

		if ($numero>0)
		{
			$tupla=$consulta->fetch_assoc();
			$datos['vehi']=$tupla;
			$idmarve=$tupla['idmarve'];
			$idmarta=$tupla['idmarta'];
			$sql="SELECT `id` as identificador ,`modelo` FROM `modelovehiculo` WHERE `idmar`=$idmarve; ";
			$consulta = $conexion->query($sql);
			$numerov= $consulta->num_rows;
			while ($tupla=$consulta->fetch_assoc())
				$datos['vehiculos'][]=$tupla;

			if ( $idmarta!= null )
			{
				$sql="SELECT `id` as identificador ,`modelo` FROM `modelotaximetro` WHERE `idmar`=$idmarta; ";
				$consulta = $conexion->query($sql);
				$numerov= $consulta->num_rows;
				while ($tupla=$consulta->fetch_assoc())
					$datos['taximetros'][]=$tupla;				
			}
			else
			{
				$datos['taximetros']=0;
			}
		}
		else
			$datos="Sindatos";
	}		

	$conexion->close();
	echo json_encode($datos);	
?>