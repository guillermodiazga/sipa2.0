<?php
//edilson_c@yahoo.es guillermodiazga@gmail.com info@ajtanques.com.co
$cabeceras = "Content-type: text/html ". "\r\n" .
	"From: Aj Tanques<info@ajtanques.com.co>" . "\r\n" .
    "Reply-To: info@ajtanques.com.co";

$para      = "info@ajtanques.com.co";
$titulo    = "Info Aj Tanques: ".$_POST['nombre'];
$mensaje   = "<b><img width='220' src='www.ajtanques.com.co/img/logo.png'><br> Mensaje de:</b> ".$_POST['nombre'].
			 "<br>Email: ".$_POST['email'].
			 "<br>Celular: ".$_POST['celular'].
			 "<br>Mensaje: ".$_POST['mensaje'];


mail($para, $titulo, $mensaje, $cabeceras);

//Confirmacion al usuario que envio el mail:
if($_POST['email']!=''){
	$para      = $_POST['email'];
	$titulo    = "Info Aj Tanques";
	$mensaje   = "<img width='220' src='www.ajtanques.com.co/img/logo.png'><br>".
				" <b>Hola</b> ".$_POST['nombre'].":  Hemos recibido tu mensaje, ".
				 " pronto te responderemos.".
				 "<br><br> Mensaje: ".$_POST['mensaje'];
	mail($para, $titulo, $mensaje, $cabeceras);
}
echo "...Enviando";

?>