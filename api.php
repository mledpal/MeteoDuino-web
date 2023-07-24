<?php

    switch($_SERVER['REQUEST_METHOD']) {
    case 'POST':

        if(isset($_POST['modo'])) {
            devolverDatos($_POST['modo']);
        } else {
            echo json_encode(['error'=>'ERROR POST']);
        }
        
        break;
    
    case 'GET':
        echo json_encode(['error'=>'Use POST']);
        break;

    default:
        echo json_encode(['error'=>'ERROR default']);   
        header("HTTP/1.1 200 OK");
    }


/**
 * Función que devuelve los datos de la base de datos
 * dependiendo del modo, devuelve unos valores u otros
 * Uso un enum para facilitar la lectura/modificación y escalabilidad del código 
 *  
 */
function devolverDatos($modo) {
    
    include_once 'funcs/conexion.php';
    include_once 'funcs/sqlfuncs.php';
    include_once 'funcs/consultas.php';

    $datos = array();    
    $modo = $_POST['modo'];
    
    switch($modo) {
        case '24h':
        case 'fecha':
            
            $horas = array();
            $temperaturas1 = array();
            $temperaturas2 = array();
            $humedad = array();
            $presion = array();
            $sensacion = array();

            $query = "";


            /**
             * Si el modo es fecha, compruebo que se haya enviado la fecha y que sea válida
             * Si es válida, creo la query con la fecha, si no, devuelvo los datos de las últimas 24h
             * Se sustituye una marca '#####' en la query por la fecha
             */
            if($modo == "fecha" && isset($_POST['fecha']) && checkFecha($_POST['fecha'])) {                
                $query_fecha = " WHERE fecha = '" . $_POST['fecha'] . "'";
                $query = str_replace('#####', $query_fecha, Consultas::fecha->value);
            } else {
                $query = Consultas::ultimas24h->value;
            }

            $sql = $conn->prepare($query);
            $sql->execute(); 
    
            while($row = $sql->fetch()) {
                array_push($horas , (string) $row['hora']);
                array_push($temperaturas1 , (float) $row['T1']);
                array_push($temperaturas2 , (float) $row['T2']);
                array_push($humedad , $row['humedad']);
                array_push($presion , $row['presion']);
                array_push($sensacion , $row['sensacion']);
            }     
    
            array_push($datos, $horas, $temperaturas1, $temperaturas2, $humedad, $presion, $sensacion);
            break;

        case 'temperaturas':

            $fecha = array();
            $max1 = array();
            $min1 = array();
            $med1 = array();
            $max2 = array();
            $min2 = array();
            $med2 = array();

            $query = Consultas::temperaturas->value;

            $sql = $conn->prepare($query);
            $sql->execute(); 

            while($row = $sql->fetch()) {
                array_push($fecha , (string) $row['fecha']);
                array_push($max1 , (float) $row['MaxT1']);
                array_push($min1 , (float) $row['MinT1']);
                array_push($med1 , (float) $row['MedT1']);
                array_push($max2 , (float) $row['MaxT2']);
                array_push($min2 , (float) $row['MinT2']);
                array_push($med2 , (float) $row['MedT2']);               
            } 

            array_push($datos, $fecha, $max1, $min1, $med1, $max2, $min2, $med2, $maxP, $minP, $medP, $maxH, $minH, $medH);

            break;


        case 'otros':
            $fecha = array();
            
            $maxP = array();
            $minP = array();
            $medP = array();
            $maxH = array();
            $minH = array();
            $medH = array();

            $query = Consultas::otros->value;

            $sql = $conn->prepare($query);
            $sql->execute(); 

            while($row = $sql->fetch()) {
                array_push($fecha , (string) $row['fecha']);
                
                array_push($maxP , (float) $row['MaxP']);
                array_push($minP , (float) $row['MinP']);
                array_push($medP , (float) $row['MedP']);
                array_push($maxH , (float) $row['MaxH']);
                array_push($minH , (float) $row['MinH']);
                array_push($medH , (float) $row['MedH']);                
            } 

            array_push($datos, $fecha, $maxP, $minP, $medP, $maxH, $minH, $medH);

            break;


        case 'last14days':
            $fecha = array();
            $sensor1 = array();
            $sensor2 = array();
            $presion = array();
            $humedad = array();

            $query = Consultas::last14days->value;

            $sql = $conn->prepare($query);
            $sql->execute();

            while($row = $sql->fetch()) {
                array_push($fecha , (string) $row['fecha']);
                array_push($sensor1 , (float) $row['sensor1']);
                array_push($sensor2 , (float) $row['sensor2']);
                array_push($presion , (float) $row['p_mar']);
                array_push($humedad , (float) $row['humedad']);          
            } 

            array_push($datos, array_reverse($fecha), array_reverse($sensor1), array_reverse($sensor2), array_reverse($presion), array_reverse($humedad));
            
            break;

        default:
            echo json_encode(['error'=>'MODE ERROR']);
            break;
    }




    // Cabeceras de respuesta
    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Methods: POST'); 
    header('Access-Control-Allow-Headers: Content-Type, Authorization'); 
    header('Permissions-Policy: browsing-context="self"');

    echo json_encode($datos);
}


header("HTTP/1.1 200 OK");


?>