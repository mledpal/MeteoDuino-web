"use strict";

import { graph24, graphTemperaturas, graphOtros, graphLastDays } from './graph.js';

const url = 'http://ledemar.ddns.net/chart/api.php';

const opcion = document.getElementById('modo');
const tiempo = document.getElementById('tiempo');
const TMaxima = document.getElementById('tmaxima');
const TMinima = document.getElementById('tminima');
const TMedia = document.getElementById('tmedia');
const TActual = document.getElementById('tactual');

const HMaxima = document.getElementById('hmaxima');
const HMinima = document.getElementById('hminima');
const HMedia = document.getElementById('hmedia');
const HActual = document.getElementById('hactual');

const PMaxima = document.getElementById('pmaxima');
const PMinima = document.getElementById('pminima');
const PMedia = document.getElementById('pmedia');
const PActual = document.getElementById('pactual');


document.addEventListener('DOMContentLoaded', () => {

  opcion.addEventListener('change', (e) => {
    e.preventDefault();  
    destroyGraph();  
    let modo = opcion.value;
    drawGraph(modo);  
    
  });

});


// Borramos el gráfico anterior
function destroyGraph() {
  document.getElementById('grafico').remove();    
  let canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'grafico');
  document.getElementById('graph').appendChild(canvas);    
}


// Borramos los datos de la tabla
function cleanData() {
  TMaxima.textContent = ``;
  TMinima.textContent = ``;
  TMedia.textContent = ``;
  TActual.textContent = ``;
  tiempo.textContent = '';
  HMaxima.textContent = ``;
  HMinima.textContent = ``;
  HMedia.textContent = ``;
  HActual.textContent = ``;
  PMaxima.textContent = ``;
  PMinima.textContent = ``;
  PMedia.textContent = ``;
  PActual.textContent = ``;  
}




/**
 * Función para recuperar los datos meteorológicos del servidor y dibujar el gráfico
 * @param {*} url URL a la que nos conectamos
 * @param {*} modo Tipo de datos que recuperamos * 
 */
async function drawGraph(modo) {

  const options = {
    method: "POST",
    body: `modo=${modo}`,    
    cors: 'no-cors',
    headers: {      
      'Access-Control-Allow-Origin': '*',
      'cors': 'no-cors',
      'Content-type': 'application/x-www-form-urlencoded',        
      cache: 'no-cache'        
    }
  }

  const response = await fetch(url, options);  
  const datos = await response.json();
  
  switch(modo) {

    case '24h':
      document.getElementById('sDatos').style.display = 'block';
      graph24(datos[0], datos[1], datos[2], datos[3], datos[4]);     
      TActual.textContent = `${datos[1][datos[1].length-1]} ºC`;  
      TMaxima.textContent = `${Math.max(...datos[1])} ºC`;
      TMinima.textContent = `${Math.min(...datos[1])} ºC`;
      TMedia.textContent = `${Math.round(datos[1].reduce((a, b) => a + b, 0) / datos[1].length, 2)} ºC`;
      tiempo.textContent = datos[0][datos[0].length-1];
      
      HActual.textContent = `${datos[3][datos[3].length-1]} %`;
      HMaxima.textContent = `${Math.max(...datos[3])} %`;
      HMinima.textContent = `${Math.min(...datos[3])} %`;
      HMedia.textContent = `${Math.round(datos[3].reduce((a, b) => a + b, 0) / datos[3].length, 2)} %`;

      PActual.textContent = `${datos[4][datos[4].length-1]} hPa`;
      PMaxima.textContent = `${Math.max(...datos[4])} hPa`;
      PMinima.textContent = `${Math.min(...datos[4])} hPa`;
      PMedia.textContent = `${Math.round(datos[4].reduce((a, b) => a + b, 0) / datos[4].length, 2)} hPa`;      
      break;

    case 'temperaturas':  
      document.getElementById('sDatos').style.display = 'none';
      cleanData();          
      graphTemperaturas(datos[0], datos[1], datos[2], datos[3], datos[4], datos[5], datos[6]);
      break;

    case 'otros':       
      document.getElementById('sDatos').style.display = 'none';
      cleanData();   
      graphOtros(datos[0], datos[1], datos[2], datos[3], datos[4], datos[5], datos[6]);
      break;

    case 'last14days':      
      document.getElementById('sDatos').style.display = 'none';    
      graphLastDays(datos[0].reverse(), datos[1].reverse(), datos[2].reverse(), datos[3].reverse(), datos[4].reverse());
      TMaxima.textContent = `${Math.max(...datos[1])} ºC`;
      TMinima.textContent = `${Math.min(...datos[1])} ºC`;
      TMedia.textContent = `${Math.round(datos[1].reduce((a, b) => a + b, 0) / datos[1].length, 2)} ºC`;

      tiempo.textContent = 'Hora';

      break;
  }; 
  
};




drawGraph('24h');  // Dibuja el gráfico por defecto al cargar la página
