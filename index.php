<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Author: Miguel Ledesma Palacios | Estación meteorológica privada de Linares (Jaén) España">

    <link rel=icon href='img/meteo.ico.webp' sizes="32x32">

    <meta property="og:title" content="Interfaz web MeteoDuino">
    <meta property="og:description" content="Estación meteorológica casera con ESP8266 (Arduino) en Linares (Jaén/Andalucía/España)">
    <meta property="og:image" content="img/meteo.ico.webp">

    <link rel="stylesheet" href="css/index.css">
    <title>MeteoDuino Linares</title>
</head>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-L37KSEKXSV"></script>
<script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-L37KSEKXSV');
</script>

<body>
    <header>
        <img id="menu" src="img/menu.svg" alt="Icono para el menu">
        <ul id="menuOculto">
            <li id="li24h">
                <img src="img/clock.svg" alt="Icono de un reloj">
                <span>24 horas</span>
            </li>
            <li id="liExterna">
                <img src="img/clock.svg" alt="Icono de un reloj">
                <span>24 horas ext*</span>
            </li>
            <li id="liTemperaturas">
                <img src="img/thermostat.svg" alt="Icono de un termómetro">
                <span>Temperaturas</span>
            </li>
            <li id="liOtros">
                <img src="img/humedad.svg" alt="Icono de humedad">
                <span>Humedad / Presión</span>
            </li>
            <li id="li14dias">
                <img src="img/history.svg" alt="Icono de un reloj">
                <span>14 días atrás</span>
            </li>
            <li id="liprecipitacion">
                <img src="img/rain.svg" alt="Icono de lluvia">
                <span>Lluvia 14 días</span>
            </li>
            <li id="liComparar">
                <img src="img/compare.svg" alt="Icono de un comparador">
                <span>Comparar</span>
            </li>
        </ul>

        <div class="fechas">
            <label for="fecha2">
                <input type="date" name="fecha2" id="fecha2" style="opacity: 0;"></input>
            </label>

            <label for="fecha">
                <input type="date" name="fecha" id="fecha"></input>
            </label>
        </div>
    </header>

    <main>
        <div id="superior">
            <div id="datos">
                <div id="temperatura">
                    <p id="temperaturaActual"></p>
                </div>

                <div id="masDatos">

                    <div id="divSensacion" style="--clr:rgba(255,0,0,.3)">
                        <h3>Sensación</h3>
                        <p id="sensacionTermica"></p>
                    </div>

                    <div id="divHumedad" style="--clr:rgba(0,0,255,.3)">
                        <h3>Humedad</h3>
                        <p id="humedad"></p>
                    </div>

                    <div id="divPresion" style="--clr:rgba(0,255,0,.3)">
                        <h3>Presión</h3>
                        <p id="presion"></p>
                    </div>
                </div>
            </div>

        </div>

        <div id="central">
            <span id="txtDatos"></>
        </div>

        <div id="inferior">
            <canvas id="grafico"></canvas>
        </div>
    </main>

    <footer>
        <ul>
            <li>Miguel Ledesma Palacios | Linares | 2024</li>
            <li>Batería <span id="bateria"></span></li>
        </ul>
        <ul>
            <li><a target="_blank" href="https://www.eltiempo.es/linares.html?q=linares">El Tiempo Linares</a></li>
            <li><a target="_blank" href="http://www.aemet.es/es/eltiempo/prediccion/municipios/linares-id23055">AEMET Linares</a></li>
            <li><a target="_blank" href="https://www.meteoclimatic.net/perfil/ESAND2300000023700C?screen_width=2560">Otra Meteorológica Linares</a></li>
        </ul>


        <ul>
            <li><a href="https://github.com/mledpal" target="_blank">Github personal</a></li>
            <li><a href="https://github.com/mledpal/MeteoDuino-web" target="_blank">Github Interfaz web</a></li>
            <li><a href="https://github.com/mledpal/meteoduino-firmware" target="_blank">Github firmware ESP8266</a></li>
        </ul>
    </footer>

    <script src="./js/chart.js?v=20250311"></script>
    <script src="./js/graph.js?v=20250311" type="module"></script>
    <script src="./js/index.js?v=20250311" type="module"></script>
</body>

</html>