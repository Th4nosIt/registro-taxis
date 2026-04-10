<?php
	require("./../../inc/functions.php");
	if (isset($_SESSION["logrol"]))
		echo $_SESSION["logrol"];
	if (isset($_SESSION["logstate"]))
		echo $_SESSION["logstate"];
?>