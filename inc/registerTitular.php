<?php
	require( './../../inc/conexion.php' );
	require( './../../inc/functions.php');

	if(!isset($_SESSION['logusuario']) || !comprobarGrupo($_SESSION['grupos']) || (!(in_array("GURBANISMO",$_SESSION['grupos'])||in_array("GDURBANISTICA",$_SESSION['grupos'])) && $_SESSION['misGrupos']!=['GURBANCONSULTA']) )
    	header('Location: ./../index.php');	
	// $tip=$_GET['info'][1]['value'];

	// echo "<pre>";
	// print_r($_POST);
	// echo "</pre>";

	if ( isset($_POST['info']) )
	{
		/*$_SESSION['milicencia']['tipo']=$_POST['tipo'];*/
		$_SESSION['titular']['dniTit']=strtoupper(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][0]['value'])));
		for ( $i=1 ; $i < sizeOf($_POST['info']) ; $i++ )
		{
			if (strpos($_POST['info'][$i]['name'], 'inpNomTit')=== 0)
				$_SESSION['titular']['nomTit']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpApeTit')=== 0)
				$_SESSION['titular']['apeTit']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpDomTit')=== 0)
				$_SESSION['titular']['domTit']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpTelTit')=== 0)
				$_SESSION['titular']['telTit']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'tieneRepresentante')=== 0)
				$_SESSION['titular']['repre']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpNIFNIER')=== 0)
				$_SESSION['titular']['dniRep']=strtoupper(trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value']))));
			else if (strpos($_POST['info'][$i]['name'], 'inpNomRep')=== 0)
				$_SESSION['titular']['nomRep']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpApeRep')=== 0)
				$_SESSION['titular']['apeRep']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpDomRep')=== 0)
				$_SESSION['titular']['domRep']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
			else if (strpos($_POST['info'][$i]['name'], 'inpTelRep')=== 0)
				$_SESSION['titular']['telRep']=trim(mysqli_real_escape_string($conexion,htmlentities($_POST['info'][$i]['value'])));
		}
		header("Location: ./registerTitular.php");
	}
	else if ( isset($_SESSION['titular']) )
	{
	// 		echo "<pre>";
	// print_r($_SESSION);
	// echo "</pre>";
		date_default_timezone_set('Europe/London');
		$fechaactual=date("Y-m-d H:i:s");
		$user=$_SESSION['logusuario'];
		//COMPROBACIONES PREVIAS
		//(si tiene representante)
		if (isset($_SESSION['titular']['repre']) && $_SESSION['titular']['repre']==1)
		{
			$rep=$_SESSION['titular']['dniRep'];
			$tieneR=$_SESSION['titular']['repre'];
			$sql="SELECT * FROM `representante` WHERE `dni`='$rep';";
			$consulta = $conexion->query($sql);
			$numero= $consulta->num_rows;
			// En caso de no existir en la base de datos
			if ($numero==0)
			{
				//INSERTAR REPRESENTANTE SI NO EXISTE Y SE RECIBEN LOS DATOS
				if ( isset($_SESSION['titular']['dniRep']) && isset($_SESSION['titular']['nomRep']) &&  isset($_SESSION['titular']['apeRep']) && isset($_SESSION['titular']['domRep']) )
				{
					if ( $_SESSION['titular']['nomRep']!="" &&  $_SESSION['titular']['apeRep']!="" && $_SESSION['titular']['domRep']!="" )
					{

						$nom=$_SESSION['titular']['nomRep'];
						$ape=$_SESSION['titular']['apeRep'];
						$dom=$_SESSION['titular']['domRep'];
						$sql="INSERT INTO `representante` (`dni`,`nomrep`,`aperep`,`domrep`";
						if ($_SESSION['titular']['telRep']!="")
						{
							$sql.=",`telrep`";
						}
						$sql.=",`usercreated`,`userupdated`,`updated`) VALUES ('$rep','$nom','$ape','$dom'";
						if ($_SESSION['titular']['telRep']!="")
						{
							$tel=$_SESSION['titular']['telRep'];
							$sql.=",'$tel'";
						}
						$sql.=",'$user','$user','$fechaactual');";
						$consulta = $conexion->query($sql);

						if (!$consulta)
						{
							$ca="Error añadiendo representante. (Código de error:060x0)";
							$datos[]=$ca;
							registrarActividad($ca);
						}
						else
							registrarActividad($sql);
					}
					else
					{
						$ca= "Error. Algunos campos obligatorios están vacíos o tienen información incorrecta (representante). (Código de error:006x1)";
						$datos[]=$ca;
						registrarActividad($ca);
					}
				}
				else
				{
					$ca= "Error. Algunos campos obligatorios están vacíos o tienen información incorrecta (representante). (Código de error:006x2)";
					$datos[]=$ca;
					registrarActividad($ca);
				}
			}
			else
			{
				//ACTUALIZAR REPRESENTANTE SI EXISTE Y SE RECIBEN LOS DATOS
				if ( isset($_SESSION['titular']['dniRep']) && isset($_SESSION['titular']['nomRep']) &&  isset($_SESSION['titular']['apeRep']) && isset($_SESSION['titular']['domRep']) )
				{
					if ( $_SESSION['titular']['nomRep']!="" &&  $_SESSION['titular']['apeRep']!="" && $_SESSION['titular']['domRep']!="" )
					{

						$nom=$_SESSION['titular']['nomRep'];
						$ape=$_SESSION['titular']['apeRep'];
						$dom=$_SESSION['titular']['domRep'];
						$sql="UPDATE `representante` SET `nomrep`='$nom',`aperep`='$ape',`domrep`='$dom'";
						if ($_SESSION['titular']['telRep']!="")
						{
							$tel=$_SESSION['titular']['telRep'];
							$sql.=",`telrep`='$tel'";
						}
						
						$sql.=",`userupdated`='$user',`updated`='$fechaactual' WHERE `dni`='$rep';";
						$consulta = $conexion->query($sql);

						if (!$consulta)
						{
							$ca="Error actualizando representante. (Código de error:060x0)";
							$datos[]=$ca;
							registrarActividad($ca);
						}
						else
							registrarActividad($sql);
					}
					else
					{
						$ca= "Error. Algunos campos obligatorios están vacíos o tienen información incorrecta (representante). (Código de error:006x1)";
						$datos[]=$ca;
						registrarActividad($ca);
					}
				}
				else
				{
					$ca= "Error. Algunos campos obligatorios están vacíos o tienen información incorrecta (representante). (Código de error:006x2)";
					$datos[]=$ca;
					registrarActividad($ca);
				}
			}
		}
		else
		{
			$tieneR=0;
			$rep=null;
		}


		$tit=$_SESSION['titular']['dniTit'];
		$sql="SELECT * FROM `titular` WHERE `dni`='$tit';";
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;

		$datos=array();
		if ($numero==0)
		{
			//INSERTAR TITULAR SI NO EXISTE Y SE RECIBEN LOS DATOS
			if ( isset($_SESSION['titular']['dniTit']) && isset($_SESSION['titular']['nomTit']) &&  isset($_SESSION['titular']['apeTit']) && isset($_SESSION['titular']['domTit']) )
			{
				if ( $_SESSION['titular']['nomTit']!="" &&  $_SESSION['titular']['apeTit']!="" && $_SESSION['titular']['domTit']!="" )
				{
					$nom=$_SESSION['titular']['nomTit'];
					$ape=$_SESSION['titular']['apeTit'];
					$dom=$_SESSION['titular']['domTit'];
					$sql="INSERT INTO `titular` (`dni`,`nomtit`, `apetit`, `domtit`";			
					if ($_SESSION['titular']['telTit']!="")
					{
						$sql.=",`teltit`";
					}
					$sql.=",`idrep`";
					$sql.=",`usercreated`,`userupdated`,`updated`) VALUES ('$tit','$nom','$ape','$dom'";
					if ($_SESSION['titular']['telTit']!="")
					{
						$tel=$_SESSION['titular']['telTit'];
						$sql.=",'$tel'";
					}
					if ($_SESSION['titular']['repre']==1)
					{
						$sql.=",'$rep'";
					}
					else
					{
						$sql.=",null";
					}
					$sql.="'$user','$user','$fechaactual');";
					$consulta = $conexion->query($sql);

					if (!$consulta)
					{
						$ca="Error añadiendo titular. (Código de error:060x3)";
						$datos[]=$ca;
						registrarActividad($ca);
					}
					else
						registrarActividad($sql);
				}
				else
				{
					$ca= "Error. Algunos campos obligatorios están vacíos o tienen información incorrecta. (Código de error:006x4)";
					$datos[]=$ca;
					registrarActividad($ca);
				}
					
			}
			else
			{
				$ca= "Error. Algunos campos obligatorios no contienen información válida. (Código de error:006x5)";
				$datos[]=$ca;
				registrarActividad($ca);
			}
			
		}
		else
		{
			if ( isset($_SESSION['titular']['dniTit']) && isset($_SESSION['titular']['nomTit']) &&  isset($_SESSION['titular']['apeTit']) && isset($_SESSION['titular']['domTit']) )
			{
				if ( $_SESSION['titular']['nomTit']!="" &&  $_SESSION['titular']['apeTit']!="" && $_SESSION['titular']['domTit']!="" )
				{
					$nom=$_SESSION['titular']['nomTit'];
					$ape=$_SESSION['titular']['apeTit'];
					$dom=$_SESSION['titular']['domTit'];
					$sql="UPDATE `titular` SET `nomtit`='$nom', `apetit`='$ape', `domtit`='$dom'";
					if ($_SESSION['titular']['telTit']!="")
					{
						$tel=$_SESSION['titular']['telTit'];
						$sql.=",`teltit`='$tel'";
					}
					if ($_SESSION['titular']['repre']==1)
					{
						$sql.=",`idrep`='$rep'";
					}
					else
					{
						$sql.=",`idrep`=null";
					}
					$sql.=",`userupdated`='$user',`updated`='$fechaactual' WHERE `dni`='$tit';";
					$consulta = $conexion->query($sql);
					if (!$consulta)
					{
						$ca="Error actualizando titular. (Código de error:060x6)";
						$datos[]=$ca;
						registrarActividad($ca);
					}
					else
						registrarActividad($sql);
				}
			}
		}		

		//FIN COMPROBACIONES PREVIAS
		
		if (sizeOf($datos)==0)
		{
			$nom=$_SESSION['titular']['nomTit'];
			$ape=$_SESSION['titular']['apeTit'];
			$dom=$_SESSION['titular']['domTit'];
			$datos[]=1;
			$datos[]=$tit;
			$datos[]=$nom;
			$datos[]=$ape;
			$datos[]=$dom;
			$datos[]=$tieneR;
			$datos[]=$rep;
			if (isset($tel))
				$datos[]=$tel;
		}
		else
			$datos[]=0;
		
		unset ($_SESSION['titular']);
	}
	// cerramos la conexion	   
	$conexion->close();
	echo json_encode($datos);
?>