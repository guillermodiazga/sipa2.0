<?	
	Class Conexion{
		private  $servidor = "localhost" ;
		//private $usuario="mamapais_user";
		//private $clave="932tlB2dMv";
		//private $db= "mamapais_pedidos2015";
		private $usuario="root";
		private $clave="admin";
		private $db= "sipa";
		private $objConexion;
		
		public function open(){

			$this->objConexion = mysql_connect($this->servidor,$this->usuario, $this->clave);
			mysql_query("SET NAMES 'utf8'");
			if(!$this->objConexion){
				echo "Fallo la Conexión a la Base de Datos";
			}
				
			mysql_select_db($this->db, $this->objConexion);
		}
			
		public function close($result){
			mysql_free_result($result);
			mysql_close();
		}

		
	
	}

?>