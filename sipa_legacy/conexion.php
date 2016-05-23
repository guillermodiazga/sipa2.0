<?php
/*header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Methods: GET, POST'); 
*/
$servidor = "127.0.0.1";
$usuario="root";
$clave="admin";

$con = mysql_connect($servidor, $usuario, $clave);
mysql_set_charset('utf8');
$db= "sipa";
//$db= "u321971772_sipa";

If($con){
	echo "";
}else{
	echo "Fallo la Conexión a la Base de Datos";
}

mysql_select_db($db, $con);


?>