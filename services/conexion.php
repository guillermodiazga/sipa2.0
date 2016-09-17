<?php
Class Conexion{
	/*
	private $data = array(
		'servidor' => "localhost", 
		'usuario' => "root", 
		'clave' => "", 
		'db' => "sipa", 
		);

	
	private $data = array(
		'servidor' => "mysql.hostinger.co", 
		'usuario' => "u321971772_read", 
		'clave' => "sistemas123$$", 
		'db' => "u321971772_sipa", 
		);
	
*/
	/*
	private $data = array(
		'servidor' => "mysql.hostinger.co", 
		'usuario' => "u321971772_user", 
		'clave' => "sistemas123$$", 
		'db' => "u321971772_test", 
		);
	*/
	
	public $mysqli;

	public function __construct(){
		$this->mysqli = new mysqli($this->data['servidor'],$this->data['usuario'], $this->data['clave'], $this->data['db']);
		if ($this->mysqli -> connect_errno) {
			die( "Fallo la conexión a MySQL: (" . $this->mysqli -> mysqli_connect_errno() 
				. ") " . $this->mysqli -> mysqli_connect_error());
		}
		
		$this->mysqli->query("SET NAMES 'utf8'");

	}

	public function close($resultado){
		$resultado->free();
	}
}
?>