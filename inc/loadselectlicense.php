<?php
	require( './../../inc/conexion.php' );
	header("Content-Type: text/html;charset=utf-8");
	
	if (isset($_POST['tipo']) && $_POST['tipo']=='libre')
	{
		$sql = "SELECT `id` , `numlic` FROM `licencia` WHERE `idveh` is null AND `idtit` is null;";
		$control=1;
	}
	else if (isset($_POST['tipo']) && $_POST['tipo']=='todos')
	{
		$sql = "SELECT `id` , `numlic` FROM `licencia`;";
	}
	else
	{
		$sql = "SELECT `id` , `numlic` FROM `licencia` WHERE `idveh` is not null AND `idtit` is not null ORDER BY `id`;";
		$control=0;
	}
	

	if ($sql!=""){
	
		$consulta = $conexion->query($sql);
		$numero= $consulta->num_rows;

		if ($numero>0)
		{
			echo "<option value='0' selected='selected'>--</option>";
			while ($tupla=$consulta->fetch_array())
				//$datos[]=$tupla;
				echo "<option value='" . $tupla[0] . "'>" . $tupla[1] ."</option>";
			
		}
		else
		{
			if ($control=0)
			{
				echo "<option>Sin licencias libres</option>";
			}
			else
			{
				echo "<option>Sin licencias disponibles</option>";
			}
		}

		$conexion->close();
	}
	
?>