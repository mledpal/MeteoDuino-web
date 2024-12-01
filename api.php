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
    include_once 'funcs/consultas.php';
    include_once 'funcs/sqlfuncs.php';    

    $datos = array();    
    $modo = $_POST['modo'];
    $fecha1 = $_POST['fecha1'] ?? null;
    $fecha2 = $_POST['fecha2'] ?? null;
    
    switch($modo) {
        case '24h':
        case 'fecha':            
            $datos = datos24h($conn, $modo);            
            break;

        case 'temperaturas':
            $datos = temperaturas($conn);
            break;

        case 'otros':            
            $datos = humedadYPresion($conn);
            break;

        case 'last14days':
            $datos = last14days($conn);            
            break;

        case 'comparar':
            $datos = comparar($conn, $modo, $fecha1, $fecha2);
            break;

        case 'externa':
            $datos = externa($conn, $modo);
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