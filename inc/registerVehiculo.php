<?php
	require( './../../inc/conexion.php' );
	require( './../../inc/functions.php');

	if(!isset($_SESSION['logusuario']) || !comprobarGrupo($_SESSION['grupos']) || (!(in_array("GURBANISMO",$_SESSION['grupos'])||in_array("GDURBANISTICA",$_SESSION['grupos'])) && $_SESSION['misGrupos']!=['GURBANCONSULTA']) )
    	header('Location: ./../index.php');	
	// $tip=$_GET['info'][1]['value'];

	// echo "<pre>";
	// print_r($_POST);
	// echo "</pre>";

	if ( isset($_POST['tipo']) && $_POST['tipo']=='v' )
	{
	// 	echo "<pre>";
	// print_r($_POST);
	// echo "</pre>";
		$_SESSION['miVehiculo']['procedi']=$_POST['procedi'];
		$_SESSION['miVehiculo']['tipo']=$_POST['tipo'];
		$_SESSION['miVehiculo']['mat']=strtoupper(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value'])));
		for ( $i=1 ; $i < sizeOf($_POST['info']) ; $i++ )
		{
			if (strpos($_POST['info'][$i]['name'], 'sltMarcaV')=== 0)
				$_SESSION['miVehiculo']['marveh']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'sltModeloV')=== 0)
				$_SESSION['miVehiculo']['modveh']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpNumBastidor')=== 0)
				$_SESSION['miVehiculo']['numbas']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpFechaMatricula')=== 0)
				{
				if ( $_POST['info'][$i]['value']!="" )
				{
					$_SESSION['miVehiculo']['fecmat']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
				}
				else
				{
					$_SESSION['miVehiculo']['fecmat']="";
				}
			}
			else if (strpos($_POST['info'][$i]['name'], 'inpFechaITV')=== 0)
				{
				if ( $_POST['info'][$i]['value']!="" )
				{
					$_SESSION['miVehiculo']['fecitv']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
				}
				else
				{
					$_SESSION['miVehiculo']['fecitv']="";
				}
			}
			else if (strpos($_POST['info'][$i]['name'], 'sltTipoCombustible')=== 0)
				$_SESSION['miVehiculo']['combus']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpPlazas')=== 0)
				$_SESSION['miVehiculo']['pla']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpDiscapacita')=== 0)
				$_SESSION['miVehiculo']['discap']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpImpresora')=== 0)
				$_SESSION['miVehiculo']['imp']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpGPS')=== 0)
				$_SESSION['miVehiculo']['gps']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));			
			else if (strpos($_POST['info'][$i]['name'], 'inpPagoTarjeta')=== 0)
				$_SESSION['miVehiculo']['tar']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpMampara')=== 0)
				$_SESSION['miVehiculo']['mampar']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpOtros')=== 0)
				$_SESSION['miVehiculo']['otros']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'sltMarcaT')=== 0)
				$_SESSION['miVehiculo']['martax']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'sltModeloT')=== 0)
				$_SESSION['miVehiculo']['modtax']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpNumIdentifica')=== 0)
				$_SESSION['miVehiculo']['numide']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpTaller')=== 0)
				$_SESSION['miVehiculo']['tal']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpRevisionTaximetro')=== 0)
				{
				if ( $_POST['info'][$i]['value']!="" )
				{
					$_SESSION['miVehiculo']['fecrev']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
				}
				else
				{
					$_SESSION['miVehiculo']['fecrev']="";
				}
			}
			else if (strpos($_POST['info'][$i]['name'], 'inpFechaValidezTaximetro')=== 0)
				{
				if ( $_POST['info'][$i]['value']!="" )
				{
					$_SESSION['miVehiculo']['fecval']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
				}
				else
				{
					$_SESSION['miVehiculo']['fecval']="";
				}
			}
		}
		header("Location: ./registerVehiculo.php");
	}
	else if (isset($_POST['tipo']) && $_POST['tipo']=='t')
	{
		$_SESSION['miTaximetro']['tipo']=$_POST['tipo'];
		for ( $i=0 ; $i < sizeOf($_POST['info']) ; $i++ )
		{
			if (strpos($_POST['info'][$i]['name'], 'inpNumIdentificaAct')=== 0)
				$_SESSION['miTaximetro']['numide']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'sltMarcaT')=== 0)
				$_SESSION['miTaximetro']['martax']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'sltModeloT')=== 0)
				$_SESSION['miTaximetro']['modtax']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpTaller')=== 0)
				$_SESSION['miTaximetro']['taller']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpNumBastidor')=== 0)
				$_SESSION['miTaximetro']['taller']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpRevisionTaximetro')=== 0)
			{
				if ( $_POST['info'][$i]['value']!="" )
				{
					$_SESSION['miTaximetro']['fecrev']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
				}
				else
				{
					$_SESSION['miTaximetro']['fecrev']="";
				}
			}
			else if (strpos($_POST['info'][$i]['name'], 'inpFechaValidezTaximetro')=== 0)
			{
				if ( $_POST['info'][$i]['value']!="" )
				{
					$_SESSION['miTaximetro']['fecval']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
				}
				else
				{
					$_SESSION['miTaximetro']['fecval']="";
				}
			}
		}
		header("Location: ./registerVehiculo.php");

	}
	else if ( isset($_POST['tipo']) && $_POST['tipo']=='cv' )
	{
		// $_SESSION['miVehiculo']['procedi']=$_POST['procedi'];
		$_SESSION['miVehiculo']['tipo']=$_POST['tipo'];
		$_SESSION['miVehiculo']['matact']=strtoupper(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][1]['value'])));
		$_SESSION['miVehiculo']['lic']=mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value']));
		for ( $i=2 ; $i < sizeOf($_POST['info']) ; $i++ )
		{
			if (strpos($_POST['info'][$i]['name'], 'sltMarcaV')=== 0)
				$_SESSION['miVehiculo']['marveh']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'sltModeloV')=== 0)
				$_SESSION['miVehiculo']['modveh']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpNumBastidor')=== 0)
				$_SESSION['miVehiculo']['numbas']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpFechaMatricula')=== 0)
			{
				if ( $_POST['info'][$i]['value']!="" )
				{
					$_SESSION['miVehiculo']['fecmat']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));					
				}
				else
				{
					$_SESSION['miVehiculo']['fecmat']="";
				}		
			}
			else if (strpos($_POST['info'][$i]['name'], 'inpFechaITV')=== 0)
			{
				if ( $_POST['info'][$i]['value']!="" )
				{
					$_SESSION['miVehiculo']['fecitv']=date("Y-m-d", strtotime(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));			
				}
				else
				{
					$_SESSION['miVehiculo']['fecitv']="";
				}		
			}
				
			else if (strpos($_POST['info'][$i]['name'], 'sltTipoCombustible')=== 0)
				$_SESSION['miVehiculo']['combus']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpPlazas')=== 0)
				$_SESSION['miVehiculo']['pla']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpDiscapacita')=== 0)
				$_SESSION['miVehiculo']['discap']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpImpresora')=== 0)
				$_SESSION['miVehiculo']['imp']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpGPS')=== 0)
				$_SESSION['miVehiculo']['gps']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));			
			else if (strpos($_POST['info'][$i]['name'], 'inpPagoTarjeta')=== 0)
				$_SESSION['miVehiculo']['tar']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpMampara')=== 0)
				$_SESSION['miVehiculo']['mampar']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpOtros')=== 0)
				$_SESSION['miVehiculo']['otros']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpTaximetroActual')=== 0)
				$_SESSION['miVehiculo']['taxact']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpMatriculaCambio')=== 0)
				$_SESSION['miVehiculo']['matnue']=strtoupper(trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));	
		}
		header("Location: ./registerVehiculo.php");
	}
	else if ( isset($_SESSION['miVehiculo']) && $_SESSION['miVehiculo']['tipo']=='v' )
	{
		// echo "<pre>";
		// print_r($_SESSION);
		// echo "</pre>";
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];

		//COMPROBACIONES PREVIAS
		//(verificar que el taxímetro no está asociado a ningún vehículo)
		$datos=array();
		$mat=$_SESSION['miVehiculo']['mat'];
		//$numero3=0;
		if (isset($_SESSION['miVehiculo']['numide']))
		{
			$numide=$_SESSION['miVehiculo']['numide'];
			$sql="SELECT v.`idtax`, t.`id`, t.`numide` FROM `vehiculo` v ";
			$sql.="LEFT JOIN `taximetro` t ON v.`idtax`=t.`id`";
			$sql.="WHERE t.`numide`='$numide';";
			$consulta = $conexion->query($sql);
			$numero3= $consulta->num_rows;

			if ( isset($numero3) && ($numero3 == 0) )
			{
				// (verificar que el taxímetro no existe)
				$sql="SELECT * FROM `taximetro` WHERE `numide`='$numide';";
				$consulta = $conexion->query($sql);
				$numero4= $consulta->num_rows;

				if ( $numero4 == 0 )
				{
					//INSERTAMOS TAXIMETRO EN LA BASE DE DATOS
					if ( isset($_SESSION['miVehiculo']['fecval']) && isset($_SESSION['miVehiculo']['fecrev']) )
					{
						$modT=$_SESSION['miVehiculo']['modtax'];
						$tal=$_SESSION['miVehiculo']['tal'];
						$fecrev=$_SESSION['miVehiculo']['fecrev'];
						$fecval=$_SESSION['miVehiculo']['fecval'];
						
						$sqlTaximetro="INSERT INTO `taximetro` (`idmodta`, `taller`, `numide`,`fecrev`,`fecval`,`usercreated`,`userupdated`,`updated`) VALUES (";
						$sqlTaximetro.="$modT,'$tal','$numide',";
						
						if ($fecrev!="" && $fecrev !=null )
						{
							$sqlTaximetro.="'$fecrev',";
						}
						else
						{
							$sqlTaximetro.="null,";							
						}


						if ($fecval!="" && $fecval !=null )
						{
							$sqlTaximetro.="'$fecval',";
						}
						else
						{
							$sqlTaximetro.="null,";							
						}

						$sqlTaximetro.="'$user','$user','$fechaactual');";
						//echo $sqlTaximetro;
						$consulta = $conexion->query($sqlTaximetro);

						//echo $sqlTaximetro;

						if (!$consulta)
						{
							$ca="Error añadiendo Taxímetro. (Código de error:007x0)";
							$datos[]=$ca;
							registrarActividad($ca);
						}
						else
						{
							registrarActividad($sqlTaximetro);
							$continua=true;
							//OBTENER ULTIMO ID ULTIMO REGISTRO INSERTADO
							$idTax = $conexion->insert_id;
						}
					}
				}
				else
				{
					//ACTUALIZAMOS TAXIMETRO
					$tupla2=$consulta->fetch_assoc();
					$idTax=$tupla2['id'];
					$numTax=$tupla2['numide'];
					if ( isset($_SESSION['miVehiculo']['fecval']) && isset($_SESSION['miVehiculo']['fecrev']) )
					{
						$tal=$_SESSION['miVehiculo']['tal'];
						$fecrev=$_SESSION['miVehiculo']['fecrev'];
						$fecval=$_SESSION['miVehiculo']['fecval'];
						$sqlTaximetro="UPDATE `taximetro` SET `taller`='$tal', `baja`=null";
						
						if ($fecrev!="" && $fecrev != null )
						{
							$sqlTaximetro.=",`fecrev`='$fecrev'";
						}
						else
						{
							$sqlTaximetro.=",`fecrev`=null";							
						}

						if ($fecval!="" && $fecval != null )
						{
							$sqlTaximetro.=",`fecval`='$fecval'";
						}
						else
						{
							$sqlTaximetro.=",`fecval` = null";							
						}

						$sqlTaximetro.=" ,`userupdated`='$user',`updated`='$fechaactual' WHERE `numide`='$numTax';";
						$consulta = $conexion->query($sqlTaximetro);
						//echo $sqlTaximetro;

						if (!$consulta)
						{
							$ca="Error actualizando Taxímetro. (Código de error:007x1)";
							$datos[]=$ca;
							registrarActividad($ca);
						}
						else
						{
							registrarActividad($sqlTaximetro);
							$continua=true;
						}
					}
				}		
			}
			else
			{
				$ca="Error actualizando Taxímetro. El taxímetro ya está asignado a un vehículo. (Código de error:007x2)";
				$datos[]=$ca;
				registrarActividad($ca);
				/*
				if ($_SESSION['miVehiculo']['procedi']==1)
				{
					$tal=$_SESSION['miVehiculo']['tal'];
					$fecrev=$_SESSION['miVehiculo']['fecrev'];
					$fecval=$_SESSION['miVehiculo']['fecval'];
					$numTax=$_SESSION['miVehiculo']['numide'];
					$sqlTaximetro="UPDATE `taximetro` SET `taller`='$tal'";

					if ($fecrev!="" && $fecrev !=null )
					{
						$sqlTaximetro.=",`fecrev`='$fecrev'";
					}

					if ($fecval!="" && $fecval !=null )
					{
						$sqlTaximetro.=",`fecval`='$fecval'";
					}

					$sqlTaximetro.=" WHERE `numide`='$numTax';";
					$consulta = $conexion->query($sqlTaximetro);

					if (!$consulta)
					{
						$ca="Error actualizando Taxímetro. (Código de error:007x1)";
						$datos[]=$ca;
						registrarActividad($ca);
					}
					else
					{
						$continua=true;
						registrarActividad($sqlTaximetro);
					}
				}
				else
				{
					$ca= "El taxímetro está asociado a un vehículo. Inténtelo de nuevo o diríjase a <strong>Gestión > Taxímetros</strong> para liberarlo de su estado actual. (Código de error:007x4)";
					$datos[]=$ca;
					registrarActividad($ca);
				}
				*/
			}
		}


		// (verificar que el vehiculo no existe)
		$sql="SELECT * FROM `vehiculo` WHERE `matveh`='$mat';";
		$consulta = $conexion->query($sql);
		$numero4= $consulta->num_rows;

		if ( $numero4 == 0 )
		{
			//INSERTAMOS VEHICULO EN LA BASE DE DATOS
			if ( isset($_SESSION['miVehiculo']['numbas']) && isset($_SESSION['miVehiculo']['modveh']) )
			{
				$modveh=$_SESSION['miVehiculo']['modveh'];
				$otros=$_SESSION['miVehiculo']['otros'];
				$numbas=$_SESSION['miVehiculo']['numbas'];
				if ($_SESSION['miVehiculo']['fecmat']!="")
				{
					$fecmat=$_SESSION['miVehiculo']['fecmat'];								
				}

				if ($_SESSION['miVehiculo']['fecitv']!="")
				{
					$fecitv=$_SESSION['miVehiculo']['fecitv'];
				}
				$pla=$_SESSION['miVehiculo']['pla'];
				if ( isset($_SESSION['miVehiculo']['discap']) )
				{
					$discap=1;
				}
				
				if ( isset($_SESSION['miVehiculo']['gps']) )
				{
					$gps=1;
				}
				
				if ( isset($_SESSION['miVehiculo']['imp']) )
				{
					$imp=1;
				}
				
				if ( isset($_SESSION['miVehiculo']['tar']) )
				{
					$tar=1;
				}

				if ( isset($_SESSION['miVehiculo']['mampar']) )
				{
					$mampar=1;
				}

				$combus=$_SESSION['miVehiculo']['combus'];
				$sqlVehiculo="INSERT INTO `vehiculo` (`matveh`,`idmodve`,`numbas`,";
				if (isset($fecmat))
				{
					$sqlVehiculo.="`fecmat`,";								
				}
				if (isset($fecitv))
				{
					$sqlVehiculo.="`fecitv`,";								
				}

				$sqlVehiculo.="`numpla`,";
				if ( isset($_SESSION['miVehiculo']['discap']) )
				{
					$sqlVehiculo .= "`adadis`,";
				}
				
				if ( isset($_SESSION['miVehiculo']['gps']) )
				{
					$sqlVehiculo .= "`gps`,";
				}
				
				if ( isset($_SESSION['miVehiculo']['imp']) )
				{
					$sqlVehiculo .= "`imprec`,";
				}
				
				if ( isset($_SESSION['miVehiculo']['tar']) )
				{
					$sqlVehiculo .= "`pagtar`,";
				}

				if ( isset($_SESSION['miVehiculo']['mampar']) )
				{
					$sqlVehiculo .= "`mampar`,";
				}

				$sqlVehiculo .= "`otros`,`idcom`,";
				if (isset($_SESSION['miVehiculo']['numide']))
				{
					$sqlVehiculo.= "`idtax`,";				
				}

				$sqlVehiculo .= "`usercreated`,`userupdated`,`updated`) ";
				$sqlVehiculo .= "VALUES ('$mat',$modveh,'$numbas',";
				if (isset($fecmat))
				{
					$sqlVehiculo.="'$fecmat',";
				}
				if (isset($fecitv))
				{
					$sqlVehiculo.="'$fecitv',";
				}
				$sqlVehiculo.="$pla,";
				if ( isset($_SESSION['miVehiculo']['discap']) )
				{
					$sqlVehiculo .= "$discap,";
				}
				
				if ( isset($_SESSION['miVehiculo']['gps']) )
				{
					$sqlVehiculo .= "$gps,";
				}
				
				if ( isset($_SESSION['miVehiculo']['imp']) )
				{
					$sqlVehiculo .= "$imp,";
				}
				
				if ( isset($_SESSION['miVehiculo']['tar']) )
				{
					$sqlVehiculo .= "$tar,";
				}

				if ( isset($_SESSION['miVehiculo']['mampar']) )
				{
					$sqlVehiculo .= "$mampar,";
				}

				$sqlVehiculo.="'$otros',$combus,";
				if (isset($_SESSION['miVehiculo']['numide']))
				{
					$sqlVehiculo .= "$idTax,";
				}
				$sqlVehiculo.= "'$user','$user','$fechaactual');";
				$consulta=$conexion->query($sqlVehiculo);

				if (!$consulta)
				{
					$ca="Error insertando vehículo en la base de datos. (Código de error:007x2)";
					$datos[]=$ca;
					registrarActividad($ca);
				}
				else
				{
					registrarActividad($sqlVehiculo);
					$continua=1;
				}
			}
		}
		else
		{
			if ($_SESSION['miVehiculo']['procedi']==1)
			{
				$modveh=$_SESSION['miVehiculo']['modveh'];
				$otros = $_SESSION['miVehiculo']['otros'];
				$numbas=$_SESSION['miVehiculo']['numbas'];
				if ($_SESSION['miVehiculo']['fecmat']!="")
				{
					$fecmat=$_SESSION['miVehiculo']['fecmat'];								
				}

				if ($_SESSION['miVehiculo']['fecitv']!="")
				{
					$fecitv=$_SESSION['miVehiculo']['fecitv'];
				}
				$pla   =   $_SESSION['miVehiculo']['pla'];
				if ( isset($_SESSION['miVehiculo']['discap']) )
				{
					$discap=1;
				}
				
				if ( isset($_SESSION['miVehiculo']['gps']) )
				{
					$gps=1;
				}
				
				if ( isset($_SESSION['miVehiculo']['imp']) )
				{
					$imp=1;
				}
				
				if ( isset($_SESSION['miVehiculo']['tar']) )
				{
					$tar=1;
				}

				if ( isset($_SESSION['miVehiculo']['mampar']) )
				{
					$mampar=1;
				}

				$combus=$_SESSION['miVehiculo']['combus'];
				$sqlVehiculo="UPDATE `vehiculo` SET `idmodve`=$modveh, `numbas`='$numbas',`idcom`=$combus,`otros`='$otros',";
				if (isset($fecmat))
				{
					$sqlVehiculo.=" `fecmat`='$fecmat',";
				}
				if (isset($fecitv))
				{
					$sqlVehiculo.=" `fecitv`='$fecitv',";
				}
				$sqlVehiculo.="`numpla`= $pla ";

				if ( isset($_SESSION['miVehiculo']['discap']) )
				{
					$sqlVehiculo.=",`adadis`=$discap ";
				}
				
				if ( isset($_SESSION['miVehiculo']['gps']) )
				{
					$sqlVehiculo.=",`gps`=$gps ";
				}
				
				if ( isset($_SESSION['miVehiculo']['imp']) )
				{
					$sqlVehiculo.=",`imprec`=$imp ";
				}
				
				if ( isset($_SESSION['miVehiculo']['tar']) )
				{
					$sqlVehiculo.=",`pagtar`=$tar ";
				}

				if ( isset($_SESSION['miVehiculo']['mampar']) )
				{
					$sqlVehiculo.=",`mampar`=$mampar ";
				}

				$sqlVehiculo.= ",`userupdated`='$user',`updated`='$fechaactual' WHERE `matveh`='$mat';";
				//echo $sqlVehiculo;
				$consulta = $conexion->query($sqlVehiculo);

				if (!$consulta)
				{
					$ca="Error actualizando Vehículo. (Código de error:007x7)";
					$datos[]=$ca;
					registrarActividad($ca);
				}
				else
					registrarActividad($sqlVehiculo);
			}
			else
			{
				$ca="El vehículo ya existe en la base de datos. (Código de error:007x3)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
		}
				
		//FIN COMPROBACIONES PREVIAS

		//ACTUALIZACION DE VEHICULOS FINAL

		if (isset($continua) && $continua == 1)
		{
			//ACTUALIZAR VEHICULO CON LOS DATOS DEL TAXIMETRO
			//date_default_timezone_set('Europe/London');
			//$fechaactual=date("Y-m-d");
			$sqlFinales="UPDATE `vehiculo` SET `idtax`=$idTax, `userupdated`='$user', `updated`='$fechaactual' WHERE `matveh`='$mat';";
			//echo $sqlFinales;
			$consulta=$conexion->query($sqlFinales);
			if (!$consulta)
			{
				$ca="Error actualizando el vehículo con el taxímetro. (Código de error:007x6)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
			else
				registrarActividad($sqlFinales);
		}
		//FIN ACTUALIZACION
		// echo "<pre>";
		// print_r($_SESSION);
		// echo "</pre>";


		// OBTENER CAMPOS PARA MOSTRAR EN LA WEB		
		if (sizeOf($datos)==0)
		{
			$datos[]=1;
			$mat=$_SESSION['miVehiculo']['mat'];
			$modveh=$_SESSION['miVehiculo']['modveh'];
			$fecmat=($_SESSION['miVehiculo']['fecmat']!=null && $_SESSION['miVehiculo']['fecmat']!="")?$_SESSION['miVehiculo']['fecmat']:"--";
			$fecitv=($_SESSION['miVehiculo']['fecitv']!=null && $_SESSION['miVehiculo']['fecitv']!="")?$_SESSION['miVehiculo']['fecitv']:"--";

			$sql = "SELECT mo.`modelo`, ma.`marca`,v.`baja`,v.`fechabaja`,l.`numlic` FROM `vehiculo` v ";
			$sql .= "LEFT JOIN `modelovehiculo` mo ON v.`idmodve`=mo.`id` ";
			$sql .= "LEFT JOIN `licencia` l ON v.`matveh`=l.`idveh` ";
			$sql .= "INNER JOIN `marca` ma ON mo.`idmar`=ma.`id` ";
			$sql .= "WHERE v.`matveh`='$mat';";

			$consulta = $conexion->query($sql);
			$tupla=$consulta->fetch_assoc();
			$datos[]=$mat;
			$datos[]=$tupla['marca'];
			$datos[]=$tupla['modelo'];
			$datos[]=$numbas;
			$datos[]=($fecmat!="--")?date("d-m-Y", strtotime($fecmat)):" -- ";
			$datos[]=($fecitv!="--")?date("d-m-Y", strtotime($fecitv)):" -- ";
			$datos[]=$tupla['numlic'];
			$datos[]=$tupla['baja'];
			$datos[]=date("d-m-Y", strtotime($tupla['fechabaja']));

		}
		else
			$datos[]=0;
		
		unset ($_SESSION['miVehiculo']);
	}
	else if ( isset($_SESSION['miTaximetro']) && $_SESSION['miTaximetro']['tipo']=='t' )
	{
		//COMPROBACIONES PREVIAS
		//(verificar que el taxímetro existe)
		$datos=array();
		$numide=$_SESSION['miTaximetro']['numide'];
		$mar=$_SESSION['miTaximetro']['martax'];
		$mod=$_SESSION['miTaximetro']['modtax'];
		$rev=$_SESSION['miTaximetro']['fecrev'];
		$val=$_SESSION['miTaximetro']['fecval'];
		$tal=$_SESSION['miTaximetro']['taller'];

		$sql="SELECT * FROM `taximetro` v WHERE `numide`='$numide';";
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;

		if ($numero==1)
		{
			$sql="UPDATE `taximetro` SET `idmodta`=$mod, `taller`='$tal', ";
			if ($rev!=null && $rev!="")
			{
				$sql.="`fecrev`='$rev' ";
			}

			if ($val!=null && $val!="")
			{
				if ( $rev!=null && $rev!="" )
				{
					$sql.= ",";
				}
				$sql.="`fecval`='$val' ";
			}
			$sql.= " WHERE `numide`='$numide';";
			$consulta = $conexion->query($sql);

			if (!$consulta)
			{
				$ca="Error actualizando Taxímetro. (Código de error:008x0)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sql);
				$datos[]=1;
			}
		}
	}
	else if ( isset($_SESSION['miVehiculo']) && $_SESSION['miVehiculo']['tipo']=='cv' )
	{
		//COMPROBACIONES PREVIAS CAMBIO VEHICULO
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];

		$datos=array();
		$lic=$_SESSION['miVehiculo']['lic'];
		$taxact=($_SESSION['miVehiculo']['taxact']!="" && $_SESSION['miVehiculo']['taxact']!=null)?$_SESSION['miVehiculo']['taxact']:0;
		$matact=$_SESSION['miVehiculo']['matact'];
		$matnue=$_SESSION['miVehiculo']['matnue'];		
		$idmodve=$_SESSION['miVehiculo']['modveh'];
		$numbas=$_SESSION['miVehiculo']['numbas'];
		$fecmat=$_SESSION['miVehiculo']['fecmat'];
		$fecitv=$_SESSION['miVehiculo']['fecitv'];
		$idcom=$_SESSION['miVehiculo']['combus'];
		$numpla=$_SESSION['miVehiculo']['pla'];

		if (isset($_SESSION['miVehiculo']['discap']))
		{
			$adadis=1;			
		}
		if (isset($_SESSION['miVehiculo']['imp']))
		{
			$imprec=1;			
		}
		if (isset($_SESSION['miVehiculo']['gps']))
		{
			$gps=1;			
		}
		if (isset($_SESSION['miVehiculo']['tar']))
		{
			$pagtar=1;			
		}
		if (isset($_SESSION['miVehiculo']['mampar']))
		{
			$mampar=1;			
		}
		$otros=$_SESSION['miVehiculo']['otros'];

		if ( $taxact != null )
		{
			$sql="SELECT * FROM `taximetro` WHERE `id`='$taxact';";
			$consulta = $conexion->query($sql);
			$numero= $consulta->num_rows;
			
			$tax=($numero==1)?1:0;		
		}
		//VERIFICAR SI EXISTE VEHICULO
		$sql="SELECT * FROM `vehiculo` WHERE `matveh`='$matnue'";
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;
		if ($numero==1)
		{
			//actualizar datos de taximetro en vehiculo
			if (isset($tax) && $tax==1)
			{
				$sql="UPDATE `vehiculo` SET `idtax`=$taxact, `userupdated`='$user', `updated`='$fechaactual' WHERE `matveh`='$matnue';";
				$consulta = $conexion->query($sql);

				if (!$consulta)
				{
					$ca="Error traspasando Taxímetro. (Código de error:008x0)";
					$datos[]=$ca;
					registrarActividad($ca);
				}
				else
				{
					registrarActividad($sql);
					//$datos['taxim'][]=1;
					$vehi=1;
				}
			}
		}
		else
		{
			$sql="INSERT INTO `vehiculo` (`matveh`, `idmodve`,`numbas`, `numpla`,";
			if (isset($fecmat)&&$fecmat!="")
			{
				$sql.="`fecmat`,";
			}
			if (isset($fecitv)&&$fecitv!="")
			{
				$sql.="`fecitv`,";
			}
			if (isset($adadis))
			{
				$sql.="`adadis`,";
			}
			if (isset($gps))
			{
				$sql.="`gps`,";
			}
			if (isset($imprec))
			{
				$sql.="`imprec`,";
			}
			if (isset($pagtar))
			{
				$sql.="`pagtar`,";
			}
			if (isset($mampar))
			{
				$sql.="`mampar`,";
			}
			$sql.="`otros`, `idcom`, `idtax`,`usercreated`, `userupdated`, `updated`) VALUES ('$matnue' , $idmodve, '$numbas' ,  $numpla,";
			if (isset($fecmat)&&$fecmat!="")
			{
				$sql.="'$fecmat',";
			}
			if (isset($fecitv)&&$fecitv!="")
			{
				$sql.="'$fecitv',";
			}
			if (isset($adadis))
			{
				$sql.="$adadis,";
			}
			if (isset($gps))
			{
				$sql.="$gps,";
			}
			if (isset($imprec))
			{
				$sql.="$imprec,";
			}
			if (isset($pagtar))
			{
				$sql.="$pagtar,";
			}
			if (isset($mampar))
			{
				$sql.="$mampar,";
			}
			$sql.="'$otros', $idcom,";
			if ($taxact!=0)
			{
				$sql.="$taxact";
			}
			else
			{
				$sql.="null";
			}

			$sql.=",'$user','$user','$fechaactual');";
			$consulta = $conexion->query($sql);
			//echo $sql;
			//echo "el taximetro es ". $taxact;

			if (!$consulta)
			{
				$ca="Error insertando Vehículo. (Código de error:700x0)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sql);
				$vehi=1;
			}

		}

		//ACTUALIZAR LICENCIA CON EL VEHICULO CORRECTO
		if ( isset($vehi) && $vehi==1 )
		{
			$sql="UPDATE `licencia` SET `idveh`='$matnue' WHERE `id`=$lic;";
			//echo $sql;
			$consulta = $conexion->query($sql);

			if (!$consulta)
			{
				$ca="Error actualizando Licencia. (Código de error:800x0)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
			else
			{
				registrarActividad($sql);
				$sql="UPDATE `vehiculo` SET `idtax`=null,`baja`=1, `fechabaja`='$fechaactual' ,`userupdated`='$user', `updated`='$fechaactual'WHERE `matveh`='$matact';";
				$consulta = $conexion->query($sql);
				if (!$consulta)
				{
					$ca="Error actualizando Licencia. (Código de error:800x0)";
					$datos[]=$ca;
					registrarActividad($ca);
				}
				else
				{
					registrarActividad($sql);
				}
			}
		}
		else
		{
			$ca="No se puede efectuar el cambio de vehículo. Contacte con el administrador (Código de error:810x0)";
			$datos[]=$ca;
			registrarActividad($ca);
		}

		if (sizeOf($datos)==0)
		{
			$datos[]=1;
			$datos[]="La licencia ha cambiado de vehículo correctamente.";
		}	

		unset ($_SESSION['miVehiculo']);

	}

	// cerramos la conexion	   
	$conexion->close();
	echo json_encode($datos);
?>