<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	$datos=array();
	if (isset($_POST['lic']))
	{
		$lic=$_POST['lic'];
		// $sql = "SELECT li.`numlic`, li.`obslic`, ti.`dni` as dnit, ti.`nomtit`, ti.`apetit`, ti.`teltit`, ti.`domtit`, ti.`esconductor`,re.`dni` as dnir, re.`nomrep`, re.`aperep`, re.`telrep`, re.`domrep` ";
		// $sql .= ",cd.`dni` as dnic, cd.`nomcon`, cd.`apecon`, cd.`telcon`, cd.`horario` , con.`tipoco`, con.`fecalt`, con.`fecbaj` "; 
		// $sql .= "FROM `licencia` li ";
		// $sql .= "INNER JOIN `titular` ti ON li.`idtit`=ti.`dni` ";
		// $sql .= "LEFT JOIN `representante` re ON ti.`idrep`=re.`dni` ";
		// $sql .= "LEFT JOIN `auxtitcon` atc ON ti.`dni`=atc.`idtit` ";
		// $sql .= "LEFT JOIN `conductor` cd ON atc.`idcon`=cd.`dni` ";

		// $sql .= "LEFT JOIN (SELECT cn.* FROM `contrato` cn order by cn.`id` desc limit 1) con ON cd.`dni`=con.`idcon` ";

		// $sql .= "WHERE li.`id`=$lic ;";

		$sql = "SELECT ti.`esconductor` ";
		$sql .= "FROM `licencia` li ";
		$sql .= "INNER JOIN `titular` ti ON li.`idtit`=ti.`dni` ";
		$sql .= "WHERE li.`id`=$lic;";

		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;
		if ($numero>0)
		{
			$tupla=$consulta->fetch_assoc();
			$esc=$tupla['esconductor'];
		}
		else
		{
			$esc=null;
		}

		if ($esc==1)
		{
			$sql = "SELECT li.`numlic`, ti.`dni` as dnit, ti.`nomtit`, ti.`apetit`, ti.`teltit`, ti.`domtit`, ti.`esconductor`";
			$sql .= ",co.`dni` as dnic, co.`nomcon`, co.`apecon`, co.`telcon`, ac.`fecalt`,ac.`horario` "; 
			$sql .= ",ve.`matveh`,ve.`fecmat`, ve.`fecitv`, ve.`fechabaja`,ve.`otros` ";
			$sql .= ",mo.`modelo`,ma.`marca` "; 
			$sql .= "FROM `licencia` li ";
			$sql .=	"left JOIN `aux-contrato` ac ON li.`id`=ac.`idlic` ";
			$sql .= "LEFT JOIN `conductor` co ON ac.`idcon`=co.`dni` ";
			$sql .= "INNER JOIN `titular` ti ON li.`idtit`=ti.`dni` ";
			$sql .= "INNER JOIN `vehiculo` ve ON li.`idveh`=ve.`matveh` ";
			$sql .= "INNER JOIN `modelovehiculo` mo ON ve.`idmodve`=mo.`id` ";
			$sql .= "INNER JOIN `marca` ma ON mo.`idmar`=ma.`id` ";
			$sql .= "WHERE li.`id`=$lic;";
		}
		else if ($esc==0)
		{
			$sql = "SELECT li.`numlic`, ti.`dni` as dnit, ti.`nomtit`, ti.`apetit`, ti.`teltit`, ti.`domtit`, ti.`esconductor`";
			$sql .= ",co.`dni` as dnic, co.`nomcon`, co.`apecon`, co.`telcon`, ac.`fecalt`,ac.`horario` "; 
			$sql .= ",ve.`matveh`,ve.`fecmat`, ve.`fecitv`, ve.`fechabaja`,ve.`otros` ";//, con.`tipoco`, con.`fecalt`, con.`fecbaj` "; 
			$sql .= ",mo.`modelo`,ma.`marca` "; 
			$sql .= "FROM `licencia` li ";
			$sql .=	"left JOIN `aux-contrato` ac ON li.`id`=ac.`idlic` ";
			$sql .= "LEFT JOIN `conductor` co ON ac.`idcon`=co.`dni` ";
			$sql .= "INNER JOIN `titular` ti ON li.`idtit`=ti.`dni` ";
			// // $sql .= "LEFT JOIN `aux-contrato` ac ON li.`id`=ac.`idlic` ";
			// // $sql .= "INNER JOIN `conductor` co ON ac.`idcon`=co.`dni` ";
			// //$sql .= "LEFT JOIN (SELECT cn.* FROM `contrato` cn where cn.`idcon`=dnic order by cn.`id` desc limit 1) con ON cd.`dni`=con.`idcon` ";		
			$sql .= "INNER JOIN `vehiculo` ve ON li.`idveh`=ve.`matveh` ";
			$sql .= "INNER JOIN `modelovehiculo` mo ON ve.`idmodve`=mo.`id` ";
			$sql .= "INNER JOIN `marca` ma ON mo.`idmar`=ma.`id` ";

			$sql .= "WHERE li.`id`=$lic and ac.`fecbaj` is null ;";
		}
		else
		{
			$sql="";
		}

		
		//echo $sql;
		if ($sql!="")
		{
		
			$consulta = $conexion->query($sql);
			$numero= $consulta->num_rows;

			if ($numero>0)
			{
				while ($tupla=$consulta->fetch_assoc())
				{
					$datos['lic'][]=$tupla;					
				}
			}
			else
				$datos="Sindatos";
		}
	}

	echo json_encode($datos);
	// cerramos la conexion	   
	$conexion->close();
?>