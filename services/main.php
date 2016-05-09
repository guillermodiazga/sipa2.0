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

    function response ($resp, $msg){
        $jsondata = array();
        $jsondata['success'] = $resp;
        $jsondata['message'] = $msg;
        echo json_encode($jsondata);
    }


    function getRecibidos($arrData){
        $idRol = $arrData["idRol"];
        $idUser = $arrData["idUser"];

        //Interventor
        $estados = "and (ped.estado=2 or ped.estado=7)";
        $userFilter = "";

        if($idRol == 1){
            $estados = "and (ped.estado=3 or ped.estado=4)";
            $userFilter = "and ped.idusuario = $idUser";
        }

         if($idRol == 3){
            $estados = "and  ped.estado=3 ";
            $userFilter = "";
        }

        $sql="SELECT   ped.estado , est.estado as descestado, sec.secretaria, ped.id, ped.idsecretaria, tali.talimento, ped.fchentrega, ped.hora, 
            ali.nombre as alimento, ped.cantidad, ped.valorpedido, ped.idppto, ped.direccion, ped.comentario, ped.personarecibe, 
            ppto.nombre as nomppto
            FROM pedido as ped, usuario as us, tipoalimento as tali, alimento as ali, presupuesto as ppto, secretaria as sec, estados as est
            WHERE  
                ped.bitactivo=1
                and ped.idsecretaria=sec.id
                and ped.idtalimento=tali.id
                and ped.idalimento=ali.id
                and ped.idppto=ppto.id
                and ped.idusuario=us.id
                and ped.estado=est.id
                $estados
                $userFilter";
        
        return queryTojson($sql);
    }

    function updateStatusOrder($arrData){
        $id = $arrData["idOrder"];
        $newStatus = $arrData["newStatus"];
        $msg = $arrData["msg"];
        $user = $arrData["user"];
        $log = date("d/m/Y - G:i")." user: ".$user;

        $id = str_replace("-",",",$id);
        $sql = "UPDATE  pedido SET  estado =  $newStatus WHERE  pedido.id in ($id)";


        $conexion = new Conexion();
        $conexion->open();
        $result = mysql_query($sql) or die("Query Error");
        
        $array = explode(",", $id);

        for ($i=0; $i < sizeof($array); $i++) { 
            $sql2 = "INSERT INTO `historico_estados_ped` (`id`, `pedido`, `newestado`, `comentario`, `log`)
                     VALUES ( NULL , $array[$i], '$newStatus', '$msg', '$log' );";

            $result = mysql_query($sql2) or die("Query Error");
        };

        response(true, "Pedido Actualizado");

        $conexion->close($result);
    }

/*----------------------------------------------------------Generic*/       
     function login($arrData){
        $id = $arrData["user"];
        $pass = $arrData["pass"];
        $sql = "SELECT * FROM  `usuario` where id = '".$id."' and password = '".$pass."'";
        return queryTojson($sql);
    };


/*----------------------------------------------------------New Order*/
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

        foreach( $arrData as $key => $val){
            $key = urldecode($key);
            $val = urldecode($val);
            $arrKeys = explode("[", $key);
            $nameKey = str_replace("]", "", $arrKeys[2]);
            $$nameKey = $val;
        }

        $log = date("d/m/Y - G:i");
         
        $sql = "
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
            NULL , 
            (SELECT idsecretaria  FROM `presupuesto` WHERE id = '$ppto'),
            '$idUser',
            '$ppto',
            '$log',
            '$deliveryDate',
            '$deliveryTime',
            $typeOrder,
            $idItem,
            '$comment',
            '$nameReceive',
            '$telephone',
            '$celphone',
            '$address',
            '$nameEvent',
            $quantity,
            (((SELECT valor FROM  `alimento` where id = $idItem )* $quantity) * (((SELECT iva FROM  `alimento` where id = $idItem)+100)/100))+$aditionalValue,
            $aditionalValue,
            '$REMOTE_ADDR',
            '1',
            2
        );";

    $sql2 = "
            UPDATE  `presupuesto` 
            SET  `valorpedido` =  valorpedido + (((SELECT valor FROM  `alimento` where id = $idItem )* $quantity) * (((SELECT iva FROM  `alimento` where id = $idItem)+100)/100))+$aditionalValue 
            WHERE CONVERT(  `presupuesto`.`id` USING utf8 ) =  '$ppto' ";

    $conexion = new Conexion();
    $conexion->open();
    $result = mysql_query($sql) or die("Query Error");
    $result = mysql_query($sql2) or die("Query Error");

    response(true, "Pedido Guardado");

    $conexion->close($result);

    };


/*----------------------------------------------------------User*/
function getListDependences(){
    $sql = "SELECT id, secretaria FROM `secretaria` where bitactivo=1";
    return queryTojson($sql);
}


function getDataUser($arrData){
    $idUser = $arrData["idUser"];

    $sql = "SELECT 
    `id` ,
    `nombre` ,
    `idsecretaria` ,
    `mail` ,
    `oficina` ,
    `telefono` ,
    `movil` 
    FROM `usuario` where bitactivo=1 and id = $idUser";

    return queryTojson($sql);
}

function saveDataUser($arrData){
    //Create vars with jsonData
    foreach( $arrData as $key => $val){
        $key = urldecode($key);
        $val = urldecode($val);
        $arrKeys = explode("[", $key);
        $nameKey = str_replace("]", "", $arrKeys[2]);
        $$nameKey = $val;
    }
         
    if($password != "password")
        $password = "`password` = '$password',";
    else
        $password = '';

    $sql=("UPDATE `usuario` 
        SET `nombre` = '$name',
        movil='$celphone',
        telefono='$telephone',
        oficina='$office',
        $password
        `idsecretaria` = '$dependence',
        `mail` = '$mail' 
        WHERE `usuario`.`id` ='$id' ");

    $conexion = new Conexion();
    $conexion->open();
    $result = mysql_query($sql) or die("Query Error");
    response(true, "Datos Actualizados");

    $conexion->close($result);
}




       
/*----------------------------------------------------------Search*/


    
    function getStatusOrders(){
        $sql = "SELECT id, estado as name FROM `estados` where bitactivo=1";
        return queryTojson($sql);
    }

    function getPptoUserSearch($arrData){
        $type = $arrData["type"];
        $user = $arrData["user"];

        if( $type == "*" ){
            $tipoalimentoPpto = " ";
        }else{
            $tipoalimentoPpto = " ppto.idtalimento = $type and";
        }

        if( $user == "*" ){
            $user = " ";
            $tipoalimentoPpto = " ";
        }else{
           $user = " `idusuario` = $user and ";
        }

        $sql = "SELECT  ppto.id, ppto.nombre, ppto.valorini, ppto.valorpedido 
                FROM `persona-ppto` as rel, presupuesto as ppto
                WHERE
                $user
                ppto.id = rel.idppto and 
                ppto.bitactivo=1 and
                $tipoalimentoPpto 
                rel.bitactivo=1 ";

        return queryTojson($sql);
    };


    function getGeneralSearch($arrData){


        foreach( $arrData as $key => $val){
            $key = urldecode($key);
            $val = urldecode($val);
            $arrKeys = explode("[", $key);
            $nameKey = str_replace("]", "", $arrKeys[2]);
            $$nameKey = $val;
        }

        $resultsPage = 10;
        $page = $page * $resultsPage;
        
        if ( $orderBy == "") {
            $orderBy = " ped.id ";
        }

        if ( $orderAsc == "true") {
            $asc = " ASC ";
        }else{
            $asc = " DESC ";
        }


        if($numberOrderFrom != '')
            $orderId = " and ped.id = $numberOrderFrom ";

        if($numberOrderFrom != '' && $numberOrderTo != '')
            $orderId = " and ped.id between $numberOrderFrom and $numberOrderTo ";

        if ( $statusOrder != '*' )
            $estadov =" and ped.estado = $statusOrder ";

        if ( $budget != '*' )
            $pptov = " and ped.idppto = '$budget' ";

        if ( $dependence != '*' )
            $secretariav=" and ppto.idsecretaria = $dependence ";

        if ( $creationDateFrom != '' )
            $creationDate = " and STR_TO_DATE( SUBSTRING( fchreg, 1, 10 ) ,  '%d/%m/%Y' ) = '$creationDateFrom' ";

        if ( $creationDateFrom != '' && $creationDateTo != '' )
            $creationDate = " and STR_TO_DATE( SUBSTRING( fchreg, 1, 10 ) ,  '%d/%m/%Y' ) Between '$creationDateFrom' and '$creationDateTo' ";
        
        if ( $deliveryDateFrom != '' )
            $deliveryDate = " and  ped.fchentrega = '$deliveryDateFrom' ";

        if ( $deliveryDateFrom != '' && $deliveryDateTo != '' )
            $deliveryDate = " and  ped.fchentrega Between '$deliveryDateFrom' and '$deliveryDateTo' ";

        $sql = "
            SELECT  
                ped.idppto,
                ped.idalimento,
                ped.estado,
                est.estado as nomestado,
                sec.secretaria,
                ped.id,
                ped.idusuario,
                us.nombre as usnam,
                ppto.idsecretaria,
                tali.talimento,
                ped.fchentrega,
                ped.hora,
                ali.nombre as alimento,
                ped.cantidad,
                ped.valorpedido,
                ped.direccion,
                ped.comentario,
                ped.fchreg,
                ppto.nombre

            FROM
                secretaria as sec,
                estados as est,
                pedido as ped,
                usuario as us,
                tipoalimento as tali,
                alimento as ali,
                presupuesto as ppto

            WHERE  

                ped.idtalimento = tali.id and
                ped.idalimento = ali.id and
                ped.idppto = ppto.id and
                ped.idusuario = us.id and
                ped.estado = est.id and
                ppto.idsecretaria = sec.id 

                $orderId

                $deliveryDate

                $creationDate

                $estadov

                $secretariav

                $pptov

                ORDER BY $orderBy $asc

                limit 0, 100
                ";

            error_log($sql);

        return queryTojson($sql);
    }



/*----------------------------------------------------------Varias*/
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