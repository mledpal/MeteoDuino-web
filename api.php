<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Permissions-Policy: browsing-context="self"');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        if (isset($_POST['modo'])) {
            devolverDatos($_POST['modo']);
        } else {
            echo json_encode(['error' => 'ERROR POST']);
        }
        break;

    case 'GET':
        echo json_encode(['error' => 'Use POST']);
        break;

    default:
        echo json_encode(['error' => 'ERROR default']);
}

/**
 * Devuelve los datos según el modo especificado.
 *
 * @param string $modo El modo de operación para determinar qué datos devolver.
 */

function devolverDatos(string $modo)
{
    header("HTTP/1.1 200 OK");

    include_once 'funcs/conexion.php';
    include_once 'funcs/consultas.php';
    include_once 'funcs/sqlfuncs.php';

    $datos = array();

    switch ($modo) {
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
            $fecha1 = $_POST['fecha'] ?? null;
            $fecha2 = $_POST['fecha2'] ?? null;
            $datos = comparar($conn, $fecha1, $fecha2);
            break;

        case 'comparar_meses':
            $mes1 = $_POST['mes1'] ?? null;
            $mes2 = $_POST['mes2'] ?? null;
            $datos = compararMeses($conn, $mes1, $mes2);
            break;

        case 'externa':
            $datos = externa($conn);
            break;

        case 'precipitacion':
            $datos = precipitacion($conn);
            break;

        case 'precipitacion_anio':
            $datos = precipitacion_anio($conn);
            break;

        case 'status':
            $datos = status($conn);
            break;

        default:
            echo json_encode(['error' => 'MODE ERROR']);
            return;
    }

    echo json_encode($datos);
}
