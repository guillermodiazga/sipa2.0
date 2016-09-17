<?php
	include "conexion.php";
	$conexion = new Conexion();
	$conexion->open();

	$sql="select * from usuario";

	$result=mysql_query($sql);
	$row = mysql_num_rows($result);

	while ($row = mysql_fetch_array($result)) 
	{
		echo $row['nombre'];
	}

	$conexion->close($result);

?>
