<?php
  session_start();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel=icon href='img/thermostat.svg' sizes="32x32" type="image/svg">
    <link rel="stylesheet" href="css/index.css">
    <title>Monitor de Temperatura</title>
</head>
<body>
  <aside>

    <form id="form">
      <label for="modo">Gráfica</label>
      <select name="modo" id="modo">
        <option value="24h">24 Horas</option>
        <option value="temperaturas">Temperaturas</option>        
        <option value="otros">Presion / Humedad </option>        
        <option value="last14days">14 días anteriores</option>
        <option value="otros">Presion / Humedad </option>           
      </select>        
    </form> 
    
    <section id="sDatos">      
      
        <div class="datosActuales">
          <p><span class="titulo actual">Hora</span><span class="dato actual" id="tiempo"></span></p>  
          <p><span class="titulo actual">Temperatura</span><span class="dato actual" id="tactual"></span></p>
          <p><span class="titulo actual">Humedad</span><span class="dato actual" id="hactual"></span></p>
          <p><span class="titulo actual">Presion</span><span class="dato actual" id="pactual"></span></p>
        </div>

        <div class="temperatura">
          <p>
            <span class="titulo">T.Máxima</span>
            <span id="tmaxtime" class="time"></span>
            <span class="dato" id="tmaxima"></span>
          </p>
          <p>
            <span class="titulo">T.Media</span>
            <span class="dato" id="tmedia"></span>
          </p>
          <p>
            <span class="titulo">T.Mínima</span>
            <span id="tmintime" class="time"></span>
            <span class="dato" id="tminima"></span>
          </p>
        </div>

        <div class="humedad">
          <p>
            <span class="titulo">H.Máxima</span>
            <span id="hmaxtime" class="time"></span>
            <span class="dato" id="hmaxima"></span>
          </p>
          
          <p>
            <span class="titulo">H.Media</span>
            <span class="dato" id="hmedia"></span>
          </p>
          <p>
            <span class="titulo">H.Mínima</span>
            <span id="hmintime" class="time"></span>
            <span class="dato" id="hminima"></span>
          </p>
        </div>

        <div class="presion">
          <p><span class="titulo">P.Máxima</span><span id="pmaxtime" class="time"></span><span class="dato" id="pmaxima"></span></p>
          <p><span class="titulo">P.Media</span><span class="dato" id="pmedia"></span></p>
          <p><span class="titulo">P.Mínima</span><span id="pmintime" class="time"></span><span class="dato" id="pminima"></span></p>   
        </div>
      
    </section>
  </aside>
    
  <div id="graph">
      <canvas id="grafico"></canvas>
  </div>


  <script src="./js/chart.js"></script>
  <script src="./js/graph.js" type="module"></script>  
  <script src="./js/index.js" type="module"></script>
    
</body>
</html>