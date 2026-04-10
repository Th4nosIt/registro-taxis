<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	if (isset($_POST['dni']))
		$dni=$_POST['dni'];
	if (isset($_POST['lic']))
		$lic=$_POST['lic'];

	$tipo=$_POST['tipo'];
	$datos=array();
	if (isset($dni))
	{
		if ($tipo=='t')
		{
			$sql = "SELECT * FROM `titular` WHERE `dni`='$dni';";    

			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numerot= $consulta->num_rows;

				if ($numerot>0){
					$tupla=$consulta->fetch_assoc();
					$datos['titular']=$tupla;
					$dnir=$tupla['idrep'];

					//echo $tupla['idrep'];
					/************************************************************/
					/* COMPROBAR SI EXISTE ALGUNA LICENCIA A NOMBRE DEL TITULAR */
					/************************************************************/
					$sql = "SELECT * FROM `licencia` WHERE `idtit`='$dni';";
					$consulta = $conexion->query($sql);
					$numerol = $consulta->num_rows;
					
					if ($numerol>0)
						$datos['licen']=1;
					else{
						if ($dnir!=null)
						{
							$sql = "SELECT * FROM `representante` WHERE `dni`='$dnir';";
							$consulta = $conexion->query($sql);
							$numeror = $consulta->num_rows;

							if ($numeror>0)
								while ($tuplar=$consulta->fetch_assoc())
									$datos['repre']=$tuplar;
							
						}
					}	
					
					

				}
				else
					$datos="Sindatos";
			}		
		}
		else if ($tipo=='r')
		{
			$sql = "SELECT * FROM `representante` WHERE `dni`='$dni';";    

			if ($sql!=""){
			
				$consulta = $conexion->query($sql);
				$numeror= $consulta->num_rows;

				if ($numeror>0){
					$tupla=$consulta->fetch_assoc();
					$datos['repre']=$tupla;
				}
				else
					$datos="Sindatos";
			}
		}
		else if ($tipo=='c')
		{
			$sql = "SELECT * FROM `conductor` c WHERE `dni`='$dni';";
			// $sql = "SELECT co.*, ac.`idlic`,ac.`fecalt` FROM `conductor` co ";
			// $sql .="INNER JOIN `aux-contrato` ac ON co.`dni`=ac.`idcon` ";
			// $sql .="WHERE `dni`='$dni' and ac.`fecbaj` is null limit 1;";    

			if ($sql!="")
			{
				$consulta = $conexion->query($sql);
				$numeroc= $consulta->num_rows;

				if ($numeroc>0)
				{
					$tupla=$consulta->fetch_assoc();
					//$datos['condu']='Enuso';
				
					if (isset($_POST['accion']) && $_POST['accion']=='a')
					{
						$datos['condu']=$tupla;
					}
					else
					{
						if ($tupla['active']==0)
							$datos['condu']=$tupla;
						else
							$datos['condu']='Enuso';
					}
				}
				else
				{
					$datos="Sindatos";					
				}

			}
		}		
	}
	elseif (isset($lic))
	{
		if ($tipo=='t')
		{
			//BUSCAR LA LICENCIA PARA OBTENER EL TITULAR
			$sql = "SELECT `idtit` FROM `licencia` WHERE `id`=$lic;";    
			$consulta = $conexion->query($sql);
			
			$numerol= $consulta->num_rows;

			if ($numerol>0)
			{
				$tupla=$consulta->fetch_assoc();
				$dni=$tupla['idtit'];

				$sql = "SELECT * FROM `titular` WHERE `dni`='$dni';";    
				if ($sql!="")
				{
				
					$consulta = $conexion->query($sql);
					$numerot= $consulta->num_rows;

					if ($numerot>0)
					{
						$tupla=$consulta->fetch_assoc();
						$datos['titular']=$tupla;
						$dnir=$tupla['idrep'];
						if ($dnir!=null)
						{
							$sql = "SELECT * FROM `representante` WHERE `dni`='$dnir';";
							$consulta = $conexion->query($sql);
							$numeror = $consulta->num_rows;

							if ($numeror>0)
								while ($tuplar=$consulta->fetch_assoc())
									$datos['repre']=$tuplar;
							
						}
					}
					else
						$datos="Sindatos";
				}
			}
			else
			{
				$datos[]="Error. No existe licencia. (Código de error:200x0)";
			}
		}
		else if ($tipo=='c')
		{
			//BUSCAR LA LICENCIA PARA OBTENER EL CONDUCTOR
			$sql = "SELECT ac.`idcon`,l.`idtit` FROM `licencia` l ";
			$sql .= "INNER JOIN `aux-contrato` ac ON l.`id`=ac.`idlic` ";
			$sql .= "WHERE l.`id`=$lic and ac.`fecbaj` is null;";    
			
			//echo $sql;
			$consulta = $conexion->query($sql);

			
			$numerol= $consulta->num_rows;

			if ($numerol>0)
			{
				$tupla=$consulta->fetch_assoc();
				$dnic=$tupla['idcon'];
				$datos['titular']=$tupla['idtit'];


				$sql = "SELECT * FROM `conductor` WHERE `dni`='$dnic';";    
				if ($sql!="")
				{
				
					$consulta = $conexion->query($sql);
					$numerot= $consulta->num_rows;

					if ($numerot>0)
					{
						$tupla=$consulta->fetch_assoc();
						$datos['condu']=$tupla;
					}
					else
						$datos="Sindatos";
				}
			}
			else
			{
				$sql = "SELECT l.`idtit` FROM `licencia` l ";
				$sql .= "WHERE l.`id`=$lic;";    
				$consulta = $conexion->query($sql);
				$numerot= $consulta->num_rows;
				$tupla=$consulta->fetch_assoc();
				$dni=$tupla['idtit'];

				if ($numerot>0)
				{
					$sql = "SELECT `esConductor` FROM `titular`";
					$sql .= "WHERE `dni`='$dni';";    
					$consulta = $conexion->query($sql);
					$tupla=$consulta->fetch_assoc();
					$escon=$tupla['esConductor'];
					if ($escon)
					{
						$datos['titular']=$dni;
						$datos="Esconductor";
					}
					else
					{
						$datos="Sinconductor";
					}
				}
				else
				{
					$datos="Sinconductor";					
				}

			}
		}		


	}
	$conexion->close();
	echo json_encode($datos);	
?>