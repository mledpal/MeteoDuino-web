<?php 

// Consultas para lanzar a la base de datos
// Uso enum para facilitar el mantenimiento del código
// Y para mejorar su escalabilidad

enum Consultas: string
    {

        case ultimas24h = "SELECT subquery.* FROM (
                            SELECT 
                            id, DATE_FORMAT(hora, '%k:%i') as hora, fecha, sensor1 as T1, sensor2 AS T2, p_mar as presion, humedad, t_sens as sensacion 
                            FROM `datos` ORDER BY id DESC 
                            LIMIT 288
                            ) as subquery 
                            ORDER BY subquery.id ASC";

        case temperaturas = "SELECT subquery.* from (
                            SELECT 
                                id, fecha, max(sensor1) as MaxT1, min(sensor1) as MinT1, ROUND(AVG(sensor1),2) as MedT1, 
                                MAX(sensor2) as MaxT2, MIN(sensor2) as MinT2, ROUND(AVG(sensor2), 2) as MedT2                    
                                FROM `datos`  
                                GROUP BY fecha
                                ORDER BY fecha DESC
                                LIMIT 60) as subquery
                                ORDER BY subquery.id ASC";

        case last14days = "SELECT fecha, sensor1, sensor2, p_mar, humedad FROM datos 
                            where DATE_FORMAT(hora, '%k:%i') = ( select DATE_FORMAT(hora, '%k:%i') as hora from datos ORDER BY id DESC limit 1) 
                            ORDER BY id DESC
                            LIMIT 14";

        case otros = "SELECT subquery.* from (
                        SELECT 
                            id, fecha, 
                            MAX(p_mar) as MaxP, MIN(p_mar) as MinP, ROUND(AVG(p_mar), 2) AS MedP,
                            MAX(humedad) as MaxH, MIN(humedad) as MinH, ROUND(AVG(humedad), 2) as MedH
                            FROM `datos`  
                            GROUP BY fecha
                            ORDER BY fecha DESC
                            LIMIT 60) as subquery
                            ORDER BY subquery.id ASC";  
                            
        case fecha = "SELECT subquery.* FROM (
                    SELECT 
                    id, DATE_FORMAT(hora, '%k:%i') as hora, fecha, sensor1 as T1, sensor2 AS T2, p_mar as presion, humedad, t_sens as sensacion 
                    FROM `datos` 
                    WHERE fecha = '#####' 
                    ORDER BY id DESC                     
                    LIMIT 288                    
                    ) as subquery 
                    ORDER BY subquery.id ASC";
    }