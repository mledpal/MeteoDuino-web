<?php

// Devuelve true si la fecha tiene formato estricto YYYY-MM-DD
// para evitar posibles ataques
// Si es false, se ejecuta la consulta por defecto (24h)
function checkFecha($fecha)
{
    $d = DateTime::createFromFormat('Y-m-d', $fecha);
    return $d && $d->format('Y-m-d') === $fecha;
}

/**
 * Devuelve los datos de las últimas 24h o de una fecha concreta
 * 
 */
function datos24h($conn, $modo)
{

    $datos = array();

    $horas = array();
    $temperaturas1 = array();
    $temperaturas2 = array();
    $humedad = array();
    $presion = array();
    $sensacion = array();
    $bateria = array();
    $precipitacion = array();

    $query = "";

    /**
     * Si el modo es fecha, compruebo que se haya enviado la fecha y que sea válida
     * Si es válida, creo la query con la fecha, si no, devuelvo los datos de las últimas 24h
     * Se sustituye una marca '#####' en la query por la fecha
     */
    if ($modo == "fecha" && isset($_POST['fecha']) && checkFecha($_POST['fecha'])) {
        $query_fecha = $_POST['fecha'];
        $query = str_replace('#####', $query_fecha, Consultas::fecha->value);
    } else {
        $query = Consultas::ultimas24h->value;
    }

    $sql = $conn->prepare($query);
    $sql->execute();

    while ($row = $sql->fetch()) {
        array_push($horas, (string) $row['hora']);
        array_push($temperaturas1, (float) $row['T1']);
        array_push($temperaturas2, (float) $row['T2']);
        array_push($humedad, $row['humedad']);
        array_push($presion, $row['presion']);
        array_push($sensacion, $row['sensacion']);
        array_push($bateria, $row['bateria']);
        array_push($precipitacion, (float) $row['precipitacion']);
    }

    array_push($datos, $horas, $temperaturas1, $temperaturas2, $humedad, $presion, $sensacion, $bateria, $precipitacion);

    return $datos;
}


/**
 * Devuelve los datos de temperatura 
 */
function temperaturas($conn)
{
    $datos = array();

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

    while ($row = $sql->fetch()) {
        array_push($fecha, (string) $row['fecha']);
        array_push($max1, (float) $row['MaxT1']);
        array_push($min1, (float) $row['MinT1']);
        array_push($med1, (float) $row['MedT1']);
        array_push($max2, (float) $row['MaxT2']);
        array_push($min2, (float) $row['MinT2']);
        array_push($med2, (float) $row['MedT2']);
    }

    array_push($datos, $fecha, $max1, $min1, $med1, $max2, $min2, $med2);

    return $datos;
}

/**
 * Devuelve los datos de humedad y presión
 */
function humedadYPresion($conn)
{
    $datos = array();

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

    while ($row = $sql->fetch()) {
        array_push($fecha, (string) $row['fecha']);

        array_push($maxP, (float) $row['MaxP']);
        array_push($minP, (float) $row['MinP']);
        array_push($medP, (float) $row['MedP']);
        array_push($maxH, (float) $row['MaxH']);
        array_push($minH, (float) $row['MinH']);
        array_push($medH, (float) $row['MedH']);
    }

    array_push($datos, $fecha, $maxP, $minP, $medP, $maxH, $minH, $medH);

    return $datos;
}


/**
 * Devuelve los datos de los últimos 14 días a hora actual
 */
function last14days($conn)
{
    $datos = array();

    $fecha = array();
    $sensor1 = array();
    $sensor2 = array();
    $presion = array();
    $humedad = array();

    $query = Consultas::last14days->value;

    $sql = $conn->prepare($query);
    $sql->execute();

    while ($row = $sql->fetch()) {
        array_push($fecha, (string) $row['fecha']);
        array_push($sensor1, (float) $row['sensor1']);
        array_push($sensor2, (float) $row['sensor2']);
        array_push($presion, (float) $row['p_mar']);
        array_push($humedad, (float) $row['humedad']);
    }

    array_push($datos, array_reverse($fecha), array_reverse($sensor1), array_reverse($sensor2), array_reverse($presion), array_reverse($humedad));

    return $datos;
}


/**
 * Devuelve los datos de las dos fechas seleccionadas
 */
function comparar($conn, $fecha1, $fecha2)
{

    if (!isset($fecha1) || !isset($fecha2) || !checkFecha($fecha1) || !checkFecha($fecha2)) {
        $query1 = Consultas::ultimas24h->value;
        $query2 = Consultas::ultimas24h->value;
    } else {
        $query1 = str_replace('#####', $fecha1, Consultas::fecha->value);
        $query2 = str_replace('#####', $fecha2, Consultas::fecha->value);
    }

    $datos1 = array();
    $datos2 = array();

    $fecha1Arr = array();
    $hora1 = array();
    $sensor1_1 = array();
    $sensor2_1 = array();
    $presion1 = array();
    $humedad1 = array();

    $fecha2Arr = array();
    $hora2 = array();
    $sensor1_2 = array();
    $sensor2_2 = array();
    $presion2 = array();
    $humedad2 = array();


    $sql = $conn->prepare($query1);
    $sql->execute();

    while ($row = $sql->fetch()) {
        array_push($fecha1Arr, (string) $row['fecha']);
        array_push($hora1, (string) $row['hora']);
        array_push($sensor1_1, (float) $row['T1']);
        array_push($sensor2_1, (float) $row['T2']);
        array_push($presion1, (float) $row['presion']);
        array_push($humedad1, (float) $row['humedad']);
    }
    array_push($datos1, $fecha1Arr, $hora1, $sensor1_1, $sensor2_1, $presion1, $humedad1);


    $sql = $conn->prepare($query2);
    $sql->execute();

    while ($row = $sql->fetch()) {
        array_push($fecha2Arr, (string) $row['fecha']);
        array_push($hora2, (string) $row['hora']);
        array_push($sensor1_2, (float) $row['T1']);
        array_push($sensor2_2, (float) $row['T2']);
        array_push($presion2, (float) $row['presion']);
        array_push($humedad2, (float) $row['humedad']);
    }

    array_push($datos2, $fecha2Arr, $hora2, $sensor1_2, $sensor2_2, $presion2, $humedad2);

    return ['comparar' => true, 'datos1' => $datos1, 'datos2' => $datos2];
}

function externa($conn)
{
    $datos = array();

    $horas = array();
    $temperatura = array();
    $humedad = array();
    $presion = array();
    $velocidad_viento = array();
    $direccion_viento = array();
    $radiacion_solar = array();
    $precipitacion = array();
    $precipitacion_puntual = array();

    $query = "";

    $query = Consultas::externa->value;

    $sql = $conn->prepare($query);
    $sql->execute();

    while ($row = $sql->fetch()) {
        array_push($horas, (string) $row['hora']);
        array_push($temperatura, (float) $row['temperatura']);
        array_push($humedad, (int) $row['humedad']);
        array_push($presion, (int) $row['presion']);
        array_push($precipitacion, (float) $row['precipitacion']);
        array_push($precipitacion_puntual, (float) $row['precipitacion_puntual']);
        array_push($radiacion_solar, (int) $row['radiacion_solar']);
        array_push($velocidad_viento, (int) $row['velocidad_viento']);
        array_push($direccion_viento, (string) $row['orientacion_viento']);
    }

    array_push($datos, $horas, $temperatura, $humedad, $presion, $precipitacion, $precipitacion_puntual, $radiacion_solar, $velocidad_viento, $direccion_viento);

    return $datos;
}

function precipitacion($conn)
{
    $datos = array();

    $fecha = array();
    $lluvia = array();

    $query = Consultas::lluvia->value;

    $sql = $conn->prepare($query);
    $sql->execute();

    while ($row = $sql->fetch()) {
        array_push($fecha, (string) $row['fecha']);
        array_push($lluvia, (float) $row['precipitacion']);
    }

    array_push($datos, $fecha, $lluvia);

    // Invertir los resultados de $datos
    $datos[0] = array_reverse($datos[0]);
    $datos[1] = array_reverse($datos[1]);

    return $datos;
}

function precipitacion_anio($conn)
{
    $datos = array();

    $mes = array();
    $lluvia_total = array();

    $query = Consultas::lluvia_year->value;

    $sql = $conn->prepare($query);
    $sql->execute();

    while ($row = $sql->fetch()) {
        array_push($mes, (string) $row['mes']);
        array_push($lluvia_total, (float) $row['precipitacion_total']);
    }

    array_push($datos, $mes, $lluvia_total);

    return $datos;
}

function status($conn)
{
    $datos = array();

    $horas = array();
    $temperatura = array();
    $humedad = array();
    $presion = array();
    $velocidad_viento = array();
    $direccion_viento = array();
    $radiacion_solar = array();
    $precipitacion = array();
    $precipitacion_puntual = array();

    $query = Consultas::status->value;

    $sql = $conn->prepare($query);
    $sql->execute();

    while ($row = $sql->fetch()) {
        array_push($horas, (string) $row['hora']);
        array_push($temperatura, (float) $row['temperatura']);
        array_push($humedad, (int) $row['humedad']);
        array_push($presion, (int) $row['presion']);
        array_push($precipitacion, (float) $row['precipitacion']);
        array_push($precipitacion_puntual, (float) $row['precipitacion_puntual']);
        array_push($radiacion_solar, (int) $row['radiacion_solar']);
        array_push($velocidad_viento, (int) $row['velocidad_viento']);
        array_push($direccion_viento, (string) $row['orientacion_viento']);
    }

    // array_push($datos, $horas, $temperatura, $humedad, $presion, $precipitacion, $precipitacion_puntual, $radiacion_solar, $velocidad_viento, $direccion_viento);

    $datos = [
        'hora' => $horas,
        'temperatura' => $temperatura,
        'humedad' => $humedad,
        'presion' => $presion,
        'precipitacion' => $precipitacion,
        'precipitacion_puntual' => $precipitacion_puntual,
        'radiacion_solar' => $radiacion_solar,
        'velocidad_viento' => $velocidad_viento,
        'direccion_viento' => $direccion_viento
    ];

    return $datos;
}

function checkMes($mes)
{
    return preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $mes);
}

function compararMeses($conn, $mes1, $mes2)
{
    if (!isset($mes1) || !isset($mes2) || !checkMes($mes1) || !checkMes($mes2)) {
        return ['error' => 'Formato de mes inválido. Use YYYY-MM'];
    }

    $datos1 = array();
    $datos2 = array();

    $dias1 = array();
    $temps1 = array();

    $dias2 = array();
    $temps2 = array();

    $anio1 = substr($mes1, 0, 4);
    $mesNum1 = substr($mes1, 5, 2);

    $anio2 = substr($mes2, 0, 4);
    $mesNum2 = substr($mes2, 5, 2);

    $query1 = str_replace(['####', '##'], [$anio1, $mesNum1], Consultas::comparar_meses->value);
    $query2 = str_replace(['####', '##'], [$anio2, $mesNum2], Consultas::comparar_meses->value);

    $sql = $conn->prepare($query1);
    $sql->execute();

    while ($row = $sql->fetch()) {
        array_push($dias1, (string) $row['fecha']);
        array_push($temps1, (float) $row['temp_media']);
    }
    array_push($datos1, $dias1, $temps1);

    $sql = $conn->prepare($query2);
    $sql->execute();

    while ($row = $sql->fetch()) {
        array_push($dias2, (string) $row['fecha']);
        array_push($temps2, (float) $row['temp_media']);
    }
    array_push($datos2, $dias2, $temps2);

    return ['comparar_meses' => true, 'mes1' => $mes1, 'mes2' => $mes2, 'datos1' => $datos1, 'datos2' => $datos2];
}
