<?	
	Class Conexion{
		private  $servidor = "localhost" ;
		private $usuario="root";
		private $clave="admin";
		private $db= "sipa";

		/*	
		private  $servidor = "mysql.hostinger.co" ;
		private $usuario="u321971772_read";
		private $clave="sistemas123$$";
		private $db= "u321971772_sipa";
		*/
		
		private $objConexion;

		public function open(){
			
			$this->objConexion = mysql_connect($this->servidor,$this->usuario, $this->clave);
			mysql_query("SET NAMES 'utf8'");
			if(!$this->objConexion){
				$msg = "Fallo la Conexion a la Base de Datos";
				error_log("Error mySql: ($msg)".mysql_error($this->objConexion));
			}
				
			mysql_select_db($this->db, $this->objConexion);
			error_log("Error mySql: ".mysql_error($this->objConexion));

			
		}
			
		public function close($result){
			@mysql_free_result($result);
			mysql_close();
		}
	}
?>