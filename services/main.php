<?
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include("conexion.php");
    include("generales.php");

    //-----------------------------------Recibir funcion a ejecutar y datos
    $arrData = php_fix_raw_query();
    $function = $arrData['f'];

    //Ejecutar funcion que ingresa por url
    call_user_func($function, $arrData);


    //----------------------------------------------funciones



    function getRecibidos($arrData){
        $sql="SELECT   ped.estado, sec.secretaria, ped.id, ped.idsecretaria, tali.talimento, ped.fchentrega, ped.hora, 
            ali.nombre as alimento, ped.cantidad, ped.valorpedido, ped.idppto, ped.direccion, ped.comentario, ped.personarecibe, 
            ppto.nombre as nomppto
            
            FROM pedido as ped, usuario as us, tipoalimento as tali, alimento as ali, presupuesto as ppto, secretaria as sec

            WHERE  ped.bitactivo=1

            and ped.idsecretaria=sec.id

            and (ped.estado=2 or ped.estado=7)

            and ped.idtalimento=tali.id

            and ped.idalimento=ali.id

            and ped.idppto=ppto.id

            and ped.idusuario=us.id";
        
        return queryTojson($sql);
    }
       
     function login($arrData){
        $id = $arrData["user"];
        $pass = $arrData["pass"];
        $sql = "SELECT * FROM  `usuario` where id = '".$id."' and password = '".$pass."'";
        return queryTojson($sql);
    };

    function getTypesOrders(){
        $sql = "SELECT id, talimento FROM `tipoalimento` where bitactivo=1";
        return queryTojson($sql);
    };

    function getItemsToNewOrder($arrData){
        $type = $arrData["type"];
        $sql = "SELECT * FROM  `alimento` where bitactivo=1 and idtalimento = ".$type." ORDER BY  `alimento`.`nombre` ASC ";
        return queryTojson($sql);
    };

    function getPptoUserToNewOrder($arrData){
        $type = $arrData["type"];
        $user = $arrData["user"];
        $sql = "SELECT  ppto.id, ppto.nombre, ppto.valorini, ppto.valorpedido 
                FROM `persona-ppto` as rel,presupuesto as ppto, tipoalimento as tipo
                WHERE

                `idusuario`=$user 
                and ppto.id=rel.idppto and 
                tipo.idproveedor=ppto.idproveedor
                and tipo.id=$type and
                ppto.bitactivo=1 and
                rel.bitactivo=1 and
                ppto.idtalimento=$type ";

        return queryTojson($sql);
    };


    function saveOrder($arrData){
        $jsonData = $arrData["jsonData"];
        //$json = json_decode($string,true);

        foreach ($jsonData as $value) {
            foreach ($value as $val) {
                error_log("-----------------------------".$val, 0);
            }
        }

        $name = $jsonData["valorCaja1"];
        //$name = $_POST['valorCaja1'];


        //var_dump(json_decode($data));
        echo '[{"response", "name:'.$name.'"}]';

        $sql="
       INSERT INTO `pedido` (
      `id` ,
      `idsecretaria` ,
      `idusuario` ,
      `idppto` ,
      `fchreg` ,
      `fchentrega` ,
      `hora` ,
      `idtalimento` ,
      `idalimento` ,
      `comentario` ,
      `personarecibe` ,
      `telfjorecibe` ,
      `movilrecibe` ,
      `direccion` ,
      `evento` ,
      `cantidad` ,
      `valorpedido` ,
      `valoradic` ,
      `iplog` ,
      `bitactivo`,
      `estado` 
      )
      VALUES (
      NULL , '$secppto', '$iduser', '$ppto','$log',STR_TO_DATE('$fecha', '%d/%m/%Y'), '$horainicial', $tipoalimento,$alimento, '$comentario', '$personarecibe', '$telfjorecibe', '$movilrecibe',
      '$direccion','$evento', $cantidad, $valorpedido, $vadic,'$ip','1',2);";

    };
















    function logVisitas(){
        $conexion = new Conexion();

        $conexion->open();

        $ip=$_SERVER['REMOTE_ADDR'];

        if($ip=="181.48.149.134")
            $ip="My office";

        $sql = "INSERT INTO `log-visitas` (`id`, `ip`, `date`) VALUES (NULL, '".$ip."', CURRENT_TIMESTAMP);";


        $result = mysql_query($sql) or die('Error query');

        echo "Registro Alamacenado";

        $conexion->close($result);
    };

    function savePedido($arrData){
        $conexion = new Conexion();

        $conexion->open();
                
       $sql = "INSERT INTO  `tiamima_pedidos`.`h-pedido` (
        `id` ,
        `id-proveedor` ,
        `id-dependencia` ,
        `id-usuario` ,
        `fecha-entrega` ,
        `hora` ,
        `comentario` ,
        `evento` ,
        `direccion` ,
        `persona-recibe` ,
        `telfjo-recibe` ,
        `movil-recibe` ,
        `id-estado` ,
        `iplog` ,
        `date` ,
        `activo`
        )
        VALUES (
                NULL 
                ,  '2'
                ,  '".$arrData["id-dependencia"]."'
                ,  '".$arrData["id-user"]."'
                ,  '".$arrData["fecha"]."'
                ,  '".urldecode ($arrData["hora"])."'
                ,  '".$arrData["comentario"]."'
                ,  '".$arrData["evento"]."'
                ,  '".$arrData["direccion"]."'
                ,  '".$arrData["personarecibe"]."'
                ,  '".$arrData["telfjorecibe"]."'
                ,  '".$arrData["movilrecibe"]."'
                ,  '1'
                ,  ''
                ,  CURDATE()
                ,  '1'
                );";

        mysql_query($sql) or die('Error query');
        
        $sql="SELECT max(id) pedido FROM  `h-pedido` where `id-usuario`=".$arrData["id-user"];
        $pedido = queryTojson($sql, true);
        $pedido = json_decode($pedido,true);
        
        echo $pedido=$pedido[0]{"pedido"};

        return;
        

        $sql = "INSERT INTO `dt-pedido` (
                  `id`
                , `id-pedido`
                , `id-usuario`
                , `id-alimento`
                , `cantidad`
                , `valor`
                , `id-presupuesto`
                , `comentario`
                , `iplog`
                , `date`
                , `activo`) 
            VALUES (NULL
                , '.$pedido.'
                , '".$arrData["id-user"]."'
                , '1'
                , '2'
                , '233'
                , '1'
                , 'rgrg'
                , ''
                , NULL
                , '1');";


        $result = mysql_query($sql) or die('Error query');

        $row = @mysql_num_rows($result);

	    echo $row ;

        $conexion->close($result);
    };

    function loadPptoUser($arrData){
        $sql="SELECT * FROM  `m-presupuesto` ,  `r-presupuesto-usuario`  ,  `m-proyecto` 
        WHERE  `m-presupuesto`.id =  `r-presupuesto-usuario`.`id-presupuesto` 
        AND  `r-presupuesto-usuario`.`id-usuario` =".$arrData["user"].
        " AND  `m-presupuesto`.`id-tipo-producto` =".$arrData["tipoProduct"].
        " AND  `m-proyecto`.id =  `m-presupuesto`.`id-proyecto`";
        
        return queryTojson($sql);
    } 

    function loadCatalogo($arrData){
        $sql="SELECT * FROM  `m-producto` ";
        
        return queryTojson($sql);
    }
    


    

?>