<?php
	require( './../../inc/conexion.php' );
	require( './../../inc/functlogs.php' );
	header("Content-Type: text/html;charset=utf-8");
	$resp=$_POST['elem'];
	
	if ($resp=='tax')
	{
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];
		
		$mat=$_POST['mat'];
		$sql="SELECT `idtax` FROM `vehiculo` WHERE `matveh`='$mat';";
		$consulta = $conexion->query($sql);
		$tupla=$consulta->fetch_assoc();
		$tax=$tupla['idtax'];

		$sql="UPDATE `vehiculo` SET `idtax`=null, `userupdated`='$user',`updated`='$fechaactual' WHERE `matveh`='$mat';";
		$consulta = $conexion->query($sql);
		if ($consulta)
		{
			registrarActividad($sql);
			$sql="UPDATE `taximetro` SET `baja`=1, `userupdated`='$user',`updated`='$fechaactual' WHERE `id`=$tax;";
			$consulta = $conexion->query($sql);
			
			echo "OK";
		}
		else
		{
			$ca="No se ha podido actualizar vehículo";
			registrarActividad($ca);
			echo "KO";
		}
	}
	else if ($resp=='cont')
	{
		$ident=$_POST['ident'];
		$sql="DELETE FROM `aux-contrato` WHERE `id`=$ident;";
		//echo $sql;
		$consulta = $conexion->query($sql);
		if ($consulta)
		{
			registrarActividad($sql);
			echo "OK";
		}
		else
		{
			$ca="No se ha podido eliminar contrato";
			registrarActividad($ca);
			echo "KO";
		}
	}
	else if ($resp=='segu')
	{
		$ident=$_POST['ident'];
		$sql="DELETE FROM `seguro` WHERE `id`=$ident;";
		//echo $sql;
		$consulta = $conexion->query($sql);
		if ($consulta)
		{
			registrarActividad($sql);
			echo "OK";
		}
		else
		{
			$ca="No se ha podido eliminar seguro";
			registrarActividad($ca);
			echo "KO";
		}
	}
	else if ($resp=='revi')
	{
		$ident=$_POST['ident'];
		$sql="DELETE FROM `revisionvehiculo` WHERE `id`=$ident;";
		//echo $sql;
		$consulta = $conexion->query($sql);
		if ($consulta)
		{
			registrarActividad($sql);
			echo "OK";
		}
		else
		{
			$ca="No se ha podido eliminar revisión de vehículo";
			registrarActividad($ca);
			echo "KO";
		}
	}
	else if ($resp=='insp')
	{
		$ident=$_POST['ident'];
		$sql="DELETE FROM `inspeccionmunicipalvehiculo` WHERE `id`=$ident;";
		//echo $sql;
		$consulta = $conexion->query($sql);
		if ($consulta)
		{
			registrarActividad($sql);
			echo "OK";
		}
		else
		{
			$ca="No se ha podido eliminar inspección municipal";
			registrarActividad($ca);
			echo "KO";
		}
	}
	else if ($resp=='auth')
	{
		$ident=$_POST['ident'];
		$sql="DELETE FROM `autorizacion` WHERE `id`=$ident;";
		//echo $sql;
		$consulta = $conexion->query($sql);
		if ($consulta)
		{
			registrarActividad($sql);
			echo "OK";
		}
		else
		{
			$ca="No se ha podido eliminar autorización";
			registrarActividad($ca);
			echo "KO";
		}
	}
	else if ($resp=='subv')
	{
		$ident=$_POST['ident'];
		$sql="DELETE FROM `historicosubvenciones` WHERE `id`=$ident;";
		//echo $sql;
		$consulta = $conexion->query($sql);
		if ($consulta)
		{
			registrarActividad($sql);
			echo "OK";
		}
		else
		{
			$ca="No se ha podido eliminar subvención";
			registrarActividad($ca);
			echo "KO";
		}
	}
	else if ($resp=='expe')
	{
		$ident=$_POST['ident'];
		$sql="DELETE FROM `expediente` WHERE `id`=$ident;";
		//echo $sql;
		$consulta = $conexion->query($sql);
		if ($consulta)
		{
			registrarActividad($sql);
			echo "OK";
		}
		else
		{
			$ca="No se ha podido eliminar expediente";
			registrarActividad($ca);
			echo "KO";
		}
	}
	else if ($resp=='hist')
	{
		$ident=$_POST['ident'];
		$sql="DELETE FROM `historicotransmisiones` WHERE `id`=$ident;";
		//echo $sql;
		$consulta = $conexion->query($sql);
		if ($consulta)
		{
			registrarActividad($sql);
			echo "OK";
		}
		else
		{
			$ca="No se ha podido eliminar el registro historico";
			registrarActividad($ca);
			echo "KO";
		}
	}
	$conexion->close();
?>