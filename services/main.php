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

        //usuario
    if($idRol == 1){
        $estados = "and (ped.estado=2  or ped.estado=4)";
        $userFilter = "and ped.idusuario = $idUser";
    }

        //proveedor
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
        $userFilter
        order By 1, 4 asc";

    return queryTojson($sql);
}

function getHistoryOrder($arrData){
    $idOrder = $arrData["idOrder"];

    $sql = "SELECT his.`comentario` , his.`log` , est.estado
    FROM historico_estados_ped AS his, estados AS est
    WHERE est.id = his.newestado
    AND his.pedido ='$idOrder' order by his.id desc";

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


    $conexion->close($result);
 
    for ($i=0; $i < sizeof($array); $i++) { 
        saveHistoricStatus ($array[$i], $newStatus, $msg, $log);
    }

    response(true, "Pedido Actualizado");

};

function saveHistoricStatus ($idOrder, $newStatus, $msg, $log){

    $sql = "INSERT INTO `historico_estados_ped` (`id`, `pedido`, `newestado`, `comentario`, `log`)
            VALUES ( NULL , $idOrder, '$newStatus', '$msg', '$log' );";

    $conexion = new Conexion();
    $conexion->open();

    $result = mysql_query($sql) or die("Query Error".$sql);

    $conexion->close($result);

    //solo enviar mail si se aprueba o rechaza
    if($newStatus == 3 || $newStatus == 4 || $newStatus == 6){
        buildEmail($idOrder);
    }

};

/*----------------------------------------------------------Generic*/       
function login($arrData){
    $id = $arrData["user"];
    $pass = $arrData["pass"];
    $sql = "SELECT * FROM  `usuario` where id = '".$id."' and password = '".$pass."'";
    return queryTojson($sql);
};


/*----------------------------------------------------------New Order*/
function getTypesOrders($arrData){
    $filter = "";
    if($arrData["idTypeOrder"] != ''){
        $filter = " and id=".$arrData['idTypeOrder'];
    }
    $sql = "SELECT id, talimento FROM `tipoalimento` where bitactivo=1 $filter ORDER BY 2";
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
    $idppto = $arrData["idppto"];
    $typeFilter = "";
    $idpptoFilter = "";
    $userFilter = "";

    if($type != "false"){
        $typeFilter = "AND ppto.idtalimento = $type";
    }

    if($idppto){
        $idpptoFilter = "AND ppto.id = '$idppto'";
    }else{
       $userFilter = "AND rel.idusuario = $user";
    }
        
    $sql = "

        SELECT ppto.id, ppto.nombre, ppto.valorini, ppto.valorpedido
        FROM  `persona-ppto` AS rel, presupuesto AS ppto, tipoalimento AS tipo
        WHERE 
        ppto.id = rel.idppto 
        AND tipo.idproveedor = ppto.idproveedor
        AND tipo.id = ppto.idtalimento
        AND ppto.bitactivo =1
        AND rel.bitactivo =1
        $userFilter
        $typeFilter
        $idpptoFilter ";

        error_log($sql);

    return queryTojson($sql);
}; 

function updateOrder($arrData){
    foreach( $arrData as $key => $val){
        $key = urldecode($key);
        $val = urldecode($val);
        $arrKeys = explode("[", $key);
        $nameKey = str_replace("]", "", $arrKeys[2]);
        $$nameKey = $val;
    }

    $log = date("d/m/Y - G:i")." User:  ".$idUser;

    $sql = "UPDATE `pedido` SET 
                `fchentrega` =  '$deliveryDate',
                `hora` = '$deliveryTime',
                `direccion`='$address',
                `evento`='$nameEvent',
                `personarecibe`='$nameReceive',
                `movilrecibe`='$celphone',
                `telfjorecibe`='$telephone',
                `valorpedido` =  (((SELECT valor FROM  `alimento` where id = $idItem )* $quantity) * (((SELECT iva FROM  `alimento` where id = $idItem)+100)/100))+$aditionalValue,
                `valoradic` =  $aditionalValue,
                `idalimento` = '$idItem',
                `comentario` = '$comment',
                `estado` = 2,
                `cantidad` = '$quantity',
                `bitactivo` =1
            WHERE `id`= $idOrder";
    
    $sql2 = "UPDATE  `presupuesto` 
            SET  `valorpedido` =  (valorpedido - $vlrtotalanterior) + ( (((SELECT valor FROM  `alimento` where id = $idItem )* $quantity) * (((SELECT iva FROM  `alimento` where id = $idItem)+100)/100))+$aditionalValue)
            WHERE CONVERT(  `presupuesto`.`id` USING utf8 ) =  '$ppto' ";

    $conexion = new Conexion();
    $conexion->open();
    $result = mysql_query($sql) or die("Query Error");
    $result = mysql_query($sql2) or die("Query Error");
    $conexion->close($result);

    saveHistoricStatus ($idOrder, 2, "Modificacion", $log);

    response(true, "Pedido Actualizado");

}

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
    $conexion->close($result);

    response(true, "Pedido Guardado");
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
};

function loadCatalogo($arrData){
    $sql="SELECT * FROM  `m-producto` ";

    return queryTojson($sql);
};

function loadDataOrder($arrData){
    $idOrder = $arrData["idOrder"];
    $idUser = $arrData["idUser"];
    
    $sql = "SELECT us.nombre, ped.idusuario,ped.fchreg, ped.valoradic, est.estado as estad, est.id as idestad, ped.evento, ped.personarecibe, ped.telfjorecibe, ped.movilrecibe, ped.fchentrega, ped.hora, ped.cantidad, ped.direccion, ped.idtalimento, ped.valorpedido, ped.idppto, ped.comentario, tip.talimento, ali.id as iditem, ali.nombre as item, ped.idalimento
    FROM pedido as ped, tipoalimento  as tip , usuario as us, alimento as ali, estados as est
    WHERE 
        ped.id = $idOrder and
        us.id = $idUser and
        ped.idtalimento=tip.id and
        ped.idalimento=ali.id and
        est.id=ped.estado";

    return queryTojson($sql);
};

function deleteOrder($arrData){
    $vlrtotalanterior = $arrData["vlrtotalanterior"];
    $ppto = $arrData["ppto"];

    $log = date("d/m/Y - G:i")." user: ".$arrData['idUser'];
    $sql = "UPDATE `pedido` SET `bitactivo` =0, estado=1 WHERE `id` ='".$arrData['idOrder']."' LIMIT 1;"; 

     $sql2 = "UPDATE  `presupuesto` 
              SET  `valorpedido` = valorpedido - $vlrtotalanterior
              WHERE CONVERT(  `presupuesto`.`id` USING utf8 ) =  '$ppto' ";

    $conexion = new Conexion();
    $conexion->open();
    $result = mysql_query($sql) or die("Query Error ");
    $result = mysql_query($sql2) or die("Query Error ".$sql2);
    $conexion->close($result);

    saveHistoricStatus ($arrData['idOrder'], 1, "Anulado", $log);
    response(true, "Pedido ".$arrData['idOrder']." Anulado");

}

function getOrdersToDashboard($arrData)
{
    $user = $arrData["idUser"];
    $idRol = $arrData["idRol"];
    $antes = mktime(0, 0, 0, date("m")  , date("d")-5, date("Y"));
    $mas = mktime(0, 0, 0, date("m")  , date("d")+5, date("Y"));
    $mañana = date("Y-m-d", mktime(0, 0, 0, date("m")  , date("d")+1, date("Y")));
    $fechantes = date("Y-m-d",$antes);
    $fechamas = date('Y-m-d',$mas);

    //rol 3
    $filter = "and  ped.estado in (2, 3, 6) and ped.fchentrega='$mañana'";

    if($idRol == 1){
        $filter = "and  ped.estado in (3, 6) and ped.idusuario=$user
                   and (ped.fchentrega Between '$fechantes'  and '$fechamas')";
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
                          
            $filter
        order By 1, 4 asc
    ";

    return queryTojson($sql);
}

function report1($arrData){
    $idUser = $arrData["idUser"];
    $fchdesde = $arrData["dateIni"];
    $fchhasta = $arrData["dateEnd"];
    $usBuscado = "";

    if($idUser){
        $usBuscado = "and ped.idusuario= $idUser";
    }

    $sql = "SELECT CONCAT(ped.idalimento, '-', ali.nombre) as item,
                   CONCAT(ped.idsecretaria, '-', sec.secretaria) as secretaria, 

                    sum(ped.cantidad) as cantidad,

                    sum(ped.valorpedido)  as valorpedido
                         
            FROM `pedido` as ped,  secretaria as sec, alimento as ali

            WHERE 
                ped.idalimento = ali.id and 
                ped.bitactivo = 1 and 
                ped.idsecretaria = sec.id and
                ped.fchentrega Between '$fchdesde' and '$fchhasta' 
                $usBuscado

            group by 1, 2
            order by ped.idalimento, ped.idsecretaria";

    return queryTojson($sql);

};

function report2($arrData){
    $idUser = $arrData["idUser"];
    $fchdesde = $arrData["dateIni"];
    $fchhasta = $arrData["dateEnd"];
    $usBuscado = "";

    if($idUser){
        $usBuscado="and ped.idusuario=".$idUser;
    }
   

    $sql = "SELECT  
            ped.id,
            ali.nombre as alimento,
            ali.id as ali,
            ped.cantidad,
            ped.valorpedido,
            ped.idppto,
            ped.estado,
            est.estado as nomestado,
            sec.secretaria,
            sec.id as idsec,
            ped.idusuario,
            us.nombre as usnam,
            ppto.idsecretaria,
            ped.fchentrega,
            ppto.nombre,
            ppto.valorini

        FROM secretaria as sec, estados as est, pedido as ped, usuario as us, presupuesto as ppto, alimento as ali

        WHERE  
            ped.fchentrega Between '$fchdesde' and '$fchhasta' 
            and ped.idalimento=ali.id
            and ped.idppto=ppto.id
            and ped.idusuario=us.id
            and  ped.estado=est.id
            and ppto.idsecretaria=sec.id

            $usBuscado

        ORDER BY 1, 2 ";

    return queryTojson($sql);

};

function report3($arrData){
    $idSec = $arrData["idSec"];
    $fchdesde = $arrData["dateIni"];
    $fchhasta = $arrData["dateEnd"];
    $secre = "";

    if($idSec){
        $secre="and ped.idsecretaria=".$idSec;
    }
   

    $sql = "SELECT ppto.idsecretaria, sec.secretaria, ped.idppto, ppto.nombre,
            count(ped.id) as cantidad,
            sum(DISTINCT ppto.valorini) as valorini, 
             sum( ped.valorpedido+ped.valoradic) as valorped, 
            SUM(CASE 
            WHEN ped.estado = '5' 
            THEN (ped.valorpedido+ped.valoradic)
            END) as valorpag,

            (ppto.valorini+ppto.valorNoRequerido)-ppto.valorpedido as saldo,

            count(CASE 
            WHEN ped.estado = '5' 
            THEN (ped.id)
            END) as cantidadpag
             
            FROM presupuesto as ppto, `pedido` as ped,  secretaria as sec

            WHERE 
            ped.`bitactivo`=1 and 
            ped.idsecretaria=ppto.idsecretaria and
            ped.idppto=ppto.id and
            ppto.idsecretaria=sec.id and
            ped.idsecretaria=sec.id and 
            ped.fchentrega Between '$fchdesde' and '$fchhasta' 
            $secre
             group by ped.idsecretaria, ped.idppto, ppto.nombre";

    return queryTojson($sql);

};

function report4($arrData){
    $idSec = $arrData["idSec"];
    $secre = "";

    if($idSec){
        $secre="and  ppto.idsecretaria=".$idSec;
    }
   

    $sql = "SELECT sec.secretaria,sec.id as idsecretaria, 
                ppto.pedido,ppto.proyecto, ppto.nombre, ppto.valorini+ppto.valorNoRequerido as valorini, 
                ppto.valorpedido, (SELECT sum(valorpedido) FROM `pedido` WHERE idppto=ppto.id and estado=5) valorpagado, prov.proveedor as nomprov 
            FROM `presupuesto` as ppto, secretaria as sec, proveedor as prov
            WHERE 
            ppto.`bitactivo`=1 and
            ppto.idproveedor=prov.id and
            ppto.idsecretaria=sec.id
$secre
 order by  idsecretaria, ppto.proyecto ";

    return queryTojson($sql);

};


function buildEmail($numOrder)
{
    $sql = "SELECT pedido.id, pedido.estado, estados.estado, usuario.nombre, usuario.mail
            FROM pedido, estados, usuario
            WHERE pedido.estado = estados.id
            AND usuario.id = pedido.idusuario
            AND pedido.id =$numOrder";

    $array = executeQuery($sql);     

    $id = $array[0]["id"];
    $nombre = $array[0]["nombre"];
    $mail = $array[0]["mail"];
    $estado = $array[0]["estado"];

    $mensaje   = 
                "<h1>Hola ".$nombre."!</h1>".
                "<p>El estado del pedido # ".$id." ha cambiado a <b>".$estado.".</b></p>".
                "<br>".
                "<p>Por favor ingresa al siguiente link para ver mas detalles: <a href='sipa.dg4apps.com'>sipa.dg4apps.com<a/></p>".
                "<br><br><br><br>".
                "<img width='100' src='sipa.dg4apps.com/img/logo.png'><img width='80' src='dg4apps.com/img/logo.png'>";

    sendMail($mail, $mensaje);
}

//error_log($sql);

?>

