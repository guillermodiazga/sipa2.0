<?php
	include("conexion.php");

	$conexion = new Conexion();

	$conexion->open();

	$ip=$_SERVER['REMOTE_ADDR'];

	if($ip=="181.48.149.134")
		$ip="office";

 	$sql = "INSERT INTO `log-visitas` (`id`, `ip`, `date`) VALUES (NULL, '".$ip."', CURRENT_TIMESTAMP);";


	$result = mysql_query($sql) or die('Error query');

	echo "Registro Alamacenado";

	$conexion->close($result);

?>