<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Author: Miguel Ledesma Palacios | Estación meteorológica privada de Linares (Jaén) España">
    <link rel=icon href='img/thermostat.svg' sizes="32x32" type="image/svg">
    <link rel="stylesheet" href="css/index.css">
    <title>MeteoDuino Linares</title>
</head>
<body>
    <header>
        <img id="menu" src="img/menu.svg" alt="Icono para el menu">
        <ul id="menuOculto">
            <li id="li24h">24 horas</li>
            <li id="liTemperaturas">Temperaturas</li>
            <li id="liOtros">Humedad / Presión</li>
            <li id="li14dias">14 días atrás</li>
        </ul>        
        <p id="fecha"></p>
    </header>

    <main>
        <div id="superior">
            <div id="datos">                
                <div id="temperatura">
                    <p id="temperaturaActual"></p>                      
                </div>
                
                <div id="estado">
                    <p id="estadoActual"></p>
                    <p id="sensacionTermica"></p>                    
                </div>

                <div id="masDatos">
                    <div id="divHumedad">
                        <h3>Humedad</h3>
                        <p id="humedad"></p>                        
                    </div>
                    
                    <div id="divPresion">
                        <h3>Presión</h3>
                        <p id="presion"></p>                        
                    </div>
                </div>
            </div>

            <div id="localizacion">
                <p>Linares</p>
            </div>
        </div>

        <div id="central">
            <span id="txtDatos"></>
        </div>

        <div id="inferior">
            <canvas id="grafico"></canvas>
        </div>
    </main>
        

    <script src="./js/chart.js"></script>
    <script src="./js/graph.min.js" type="module"></script>  
    <script src="./js/index.js" type="module"></script>
</body>
</html>