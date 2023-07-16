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
    
    <section id="datos">      
      <div id="datos">
        <p><span class="titulo actual">Hora</span><span class="dato actual" id="tiempo"></span></p>  
        <p><span class="titulo actual">T.Actual</span><span class="dato actual" id="tactual"></span></p>
        <p><span class="titulo">T.Máxima</span><span class="dato" id="tmaxima"></span></p>
        <p><span class="titulo">T.Media</span><span class="dato" id="tmedia"></span></p>
        <p><span class="titulo">T.Mínima</span><span class="dato"  id="tminima"></span></p>       
        <p><span class="titulo">H.Actual</span><span class="dato" id="hactual"></span></p>
        <p><span class="titulo">H.Máxima</span><span class="dato" id="hmaxima"></span></p>
        <p><span class="titulo">H.Media</span><span class="dato" id="hmedia"></span></p>
        <p><span class="titulo">H.Mínima</span><span class="dato"  id="hminima"></span></p>
        <p><span class="titulo">P.Actual</span><span class="dato" id="pactual"></span></p>
        <p><span class="titulo">P.Máxima</span><span class="dato" id="pmaxima"></span></p>
        <p><span class="titulo">P.Media</span><span class="dato" id="pmedia"></span></p>
        <p><span class="titulo">P.Mínima</span><span class="dato" id="pminima"></span></p>   
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