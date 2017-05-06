<?php
$today = date("Y/m/d");

$ipClient = "";

function queryTojson($sql, $swReturn=false){

    $rows = executeQuery($sql);
    $options = "JSON_FORCE_OBJECT";

    if($swReturn)
        return json_encode($rows);
    else
        echo json_encode($rows);
};

function executeQuery($sql)
{

    $conexion = new Conexion();

    $dataReturn = array();

    $resultado = $conexion->mysqli->query($sql);

    while ($rows = $resultado->fetch_assoc()) {
        $dataReturn[] = $rows;
    }
    $conexion->close($resultado);
    return $dataReturn;
}


//formateos
function  fch_mysql_php($dato)
{
   $dia=substr($dato,8,10);
   $mes=substr($dato,5,2);
   $ano=substr($dato,0,4);
   $diab=($dia."/".$mes."/".$ano);
   return $diab;
}

function  fch_php_mysql($consulta){
    $dia=substr($consulta,0,2);
    $mes=substr($consulta,3,2);
    $ano=substr($consulta,6,10);
    $diab=($ano."-".$mes."-".$dia);
    return $diab;
}

//devuelve array con todos los parametros recibidos por get
function php_fix_raw_query() {
    $post = '';
    
    // Try globals array
    if (!$post && isset($_GLOBALS) && isset($_GLOBALS["HTTP_RAW_POST_DATA"]))
        $post = $_GLOBALS["HTTP_RAW_POST_DATA"];
    
    // Try globals variable
    if (!$post && isset($HTTP_RAW_POST_DATA))
        $post = $HTTP_RAW_POST_DATA;
    
    // Try stream
    if (!$post) {
        if (!function_exists('file_get_contents')) {
            $fp = fopen("php://input", "r");
            if ($fp) {
                $post = '';
                
                while (!feof($fp))
                    $post = fread($fp, 1024);
                
                fclose($fp);
            }
        } else {
            $post = "" . file_get_contents("php://input");
        }
    }
    
    $raw = !empty($_SERVER['QUERY_STRING']) ? sprintf('%s&%s', $_SERVER['QUERY_STRING'], $post) : $post;
    
    $arr = array();
    $pairs = explode('&', $raw);
    
    foreach ($pairs as $i) {
        if (!empty($i)) {
            list($name, $value) = explode('=', $i, 2);
            
            if (isset($arr[$name]) ) {
                if (is_array($arr[$name]) ) {
                    $arr[$name][] = $value;
                } else {
                    $arr[$name] = array($arr[$name], $value);
                }
            } else {
                $arr[$name] = $value;
            }
        }
    }
    
    foreach ( $_POST as $key => $value ) {
        if (is_array($arr[$key]) ) {
            $_POST[$key] = $arr[$name];
            $_REQUEST[$key] = $arr[$name];
        }
    }

    foreach ( $_GET as $key => $value ) {
        if(isset($arr[$key])){
            if (is_array($arr[$key]) ) {
                $_GET[$key] = $arr[$name];
                $_REQUEST[$key] = $arr[$name];
            }
        }
    }

# optionally return result array
    return $arr;
}

function sendMail($para, $mensaje){
    $cabeceras = "Content-type: text/html ". "\r\n" .
    "From: Admin Sipa<admin@dg4apps.com>" . "\r\n" .
    "Reply-To:  admin@dg4apps.com";

    $asunto    = "Notificación Sipa: ";
    
    mail($para, $asunto, $mensaje, $cabeceras);
};

?>