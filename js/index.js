'use strict';

import {
    graph24,
    graphTemperaturas,
    graphOtros,
    graphLastDays,
    graphComparar,
    graphExterna,
    graphPrecipitacion,
    graphPrecipitacionYear,
} from './graph.js';
import { degree } from './degree.js';

const url = './api.php';

const txtTemperatura = document.getElementById('temperatura');
const txtHumedad = document.getElementById('humedad');
const txtPresion = document.getElementById('presion');
const txtVelocidad = document.getElementById('velocidad');
const txtDireccion = document.getElementById('direccion');
const txtPrecipitacion = document.getElementById('precipitacion');

const btnMenu = document.getElementById('menu');
const menu = document.getElementById('menuOculto');

const li24h = document.getElementById('li24h');
const liTemperaturas = document.getElementById('liTemperaturas');
const liOtros = document.getElementById('liOtros');
const li14dias = document.getElementById('li14dias');
const liComparar = document.getElementById('liComparar');
const liExterna = document.getElementById('liExterna');
const liPrecipitacion = document.getElementById('liprecipitacion');
const liPrecipitacionAnio = document.getElementById('liprecipitacion_anio');

const fecha = document.getElementById('fecha');
const fecha2 = document.getElementById('fecha2');

const txtDatos = document.getElementById('txtDatos');
const txtSensacion = document.getElementById('sensacionTermica');
const txtbateria = document.getElementById('bateria');

const divHumedad = document.getElementById('divHumedad');
const divSensacion = document.getElementById('divSensacion');
const divPresion = document.getElementById('divPresion');
const divVelocidad = document.getElementById('divVelocidad');
const divPrecipitacion = document.getElementById('divPrecipitacion');

const ctx = document.getElementById('grafico');

function toggleMenu() {
    menu.classList.contains('showMenu')
        ? ((menu.style.cssText = 'display: hidden;'),
          menu.classList.remove('showMenu'))
        : ((menu.style.cssText = 'display: block;'),
          menu.classList.add('showMenu'));
}

/**
 * Función para recuperar los datos meteorológicos del servidor y dibujar el gráfico
 * @param {*} url URL a la que nos conectamos
 * @param {*} modo Tipo de datos que recuperamos *
 */
async function drawGraph(modo, fecha = null, fecha2 = null) {
    document.getElementById('grafico').remove();
    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'grafico');
    document.getElementById('inferior').appendChild(canvas);

    let hora = [new Date().getHours(), new Date().getMinutes()];

    const options = {
        method: 'POST',
        body: `modo=${modo}&fecha=${fecha}&fecha2=${fecha2}`,
        cors: 'no-cors',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            cache: 'no-cache',
        },
    };

    const response = await fetch(url, options);
    const datos = await response.json();

    localStorage.setItem(`datos_${modo}`, JSON.stringify(datos));

    switch (modo) {
        case '24h':
        case 'fecha':
            // Dibuja la gráfica
            //graph24(datos[0], datos[1], datos[2], datos[3], datos[4], datos[5]);
            graph24(...datos);

            // Muestra los datos actuales
            let temperatura = `${datos[1][datos[1].length - 1]}`;
            let humedad = `${datos[3][datos[3].length - 1]}`;
            let presion = `${datos[4][datos[4].length - 1]}`;
            let sensacionTermica = `${datos[5][datos[5].length - 1]}`;
            let bateria = `${datos[6][datos[6].length - 1]}`;
            let precipitacion = `${datos[7][datos[7].length - 1]}`;

            if (precipitacion > 0) {
                divPrecipitacion.style.display = 'flex';
                txtPrecipitacion.textContent = `${precipitacion} mm`;
            }

            txtTemperatura.textContent = `${temperatura} ºC`;
            txtHumedad.textContent = `${humedad} %`;
            txtPresion.textContent = presion + ' hPa';
            txtSensacion.textContent = `${sensacionTermica} ºC`;
            txtbateria.textContent = `${bateria} V`;

            // Muestra el estado meteorológico actual en texto
            // if (humedad < 20) {
            //     // txtEstado.textContent = "Seco";
            // }
            

            // Muestra los datos de la tabla y del roll-over
            let tiempo = datos[0][datos[0].length - 1];

            let tMaxima = `${Math.max(...datos[1])} ºC`;
            let tMaxT = datos[0][datos[1].indexOf(Math.max(...datos[1]))];

            let tMinima = `${Math.min(...datos[1])} ºC`;
            let tMinT = datos[0][datos[1].indexOf(Math.min(...datos[1]))];
            let tMedia = `${Math.round(
                datos[1].reduce((a, b) => a + b, 0) / datos[1].length,
                2
            )} ºC`;

            let hMaxima = `${Math.max(...datos[3])} %`;
            let hMaxT = datos[0][datos[3].indexOf(Math.max(...datos[3]))];
            let hMinima = `${Math.min(...datos[3])} %`;
            let hMinT = datos[0][datos[3].indexOf(Math.min(...datos[3]))];
            let hMedia = `${Math.round(
                datos[3].reduce((a, b) => a + b, 0) / datos[3].length,
                2
            )} %`;

            let pMaxima = `${Math.max(...datos[4])} hPa`;
            let pMaxT = `${datos[0][datos[4].indexOf(Math.max(...datos[4]))]}`;
            let pMinima = `${Math.min(...datos[4])} hPa`;
            let pMinT = `${datos[0][datos[4].indexOf(Math.min(...datos[4]))]}`;
            let pMedia = `${Math.round(
                datos[4].reduce((a, b) => a + b, 0) / datos[4].length,
                2
            )} hPa`;

            txtDatos.textContent = `Última actualización: ${tiempo} - T: ${tMaxima} (${tMaxT}) / ${tMinima} (${tMinT}) / ${tMedia} - H: ${hMaxima} (${hMaxT}) / ${hMinima} (${hMinT}) / ${hMedia} - P: ${pMaxima} (${pMaxT}) / ${pMinima} (${pMinT}) / ${pMedia} `;

            let largo = txtDatos.textContent.length;

            // Calcula los porcentajes entre los máximos y mínimos y dibuja el fondo de color en los divs
            let valorT =
                ((datos[5][datos[5].length - 1] - -10) / (55 - -10)) * 100;
            let valorP =
                ((datos[4][datos[4].length - 1] - 990) / (1040 - 980)) * 100;

            divHumedad.style.setProperty(
                'background',
                `linear-gradient(0deg, var(--clr) 0%, var(--clr) ${humedad}%, rgba(0,0,0,.5) ${humedad}%, rgba(0,0,0,.5) 100%)`
            );

            divPresion.style.setProperty(
                'background',
                `linear-gradient(0deg, var(--clr) 0%, var(--clr) ${valorP}%, rgba(0,0,0,.5) ${valorP}%, rgba(0,0,0,.5) 100%)`
            );

            divSensacion.style.setProperty(
                'background',
                `linear-gradient(0deg, var(--clr) 0%, var(--clr) ${valorT}%, rgba(0,0,0,.5) ${valorT}%, rgba(0,0,0,.5) 100%)`
            );

            break;

        case 'temperaturas':
            //graphTemperaturas(datos[0], datos[1], datos[2], datos[3], datos[4], datos[5], datos[6]);
            graphTemperaturas(...datos);
            break;

        case 'otros':
            //graphOtros(datos[0], datos[1], datos[2], datos[3], datos[4], datos[5], datos[6]);
            graphOtros(...datos);
            break;

        case 'last14days':
            //graphLastDays(datos[0].reverse(), datos[1].reverse(), datos[2].reverse(), datos[3].reverse(), datos[4].reverse());
            graphLastDays(...datos);
            break;

        case 'precipitacion':
            graphPrecipitacion(...datos);
            break;

        case 'precipitacion_anio':
            graphPrecipitacionYear(...datos);
            break;

        case 'comparar':
            //graphTemperaturas(datos[0], datos[1], datos[2], datos[3], datos[4], datos[5], datos[6]);
            graphComparar(datos);
            break;

        case 'externa':
            let ultimoRegistro = datos[0].length - 1;
            const reg = {
                hora: datos[0][ultimoRegistro],
                temperatura: datos[1][ultimoRegistro],
                humedad: datos[2][ultimoRegistro],
                presion: datos[3][ultimoRegistro],
                precipitacion: datos[4][ultimoRegistro],
                radiacion_solar: datos[5][ultimoRegistro],
                velocidad_viento: datos[6][ultimoRegistro],
                direccion_viento: datos[7][ultimoRegistro],
            };

            if (reg.precipitacion > 0) {        
                divPrecipitacion.style.display = 'flex';
                txtPrecipitacion.textContent = `${reg.precipitacion} mm`;
            }
            txtTemperatura.textContent = `${reg.temperatura} ºC`;
            txtHumedad.textContent = `${reg.humedad} %`;
            txtPresion.textContent = reg.presion + ' hPa';

            graphExterna(...datos);
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Obtiene datos meteorológicos puntuales para mostrar si llueve o no o si hace sol
    // y asigna el fondo correspondiente a la página
    // Si hay algún tipo de error, se asignan los fondos con los datos internos

    estadoActual();

    const superior = document.getElementById('superior');
    const estado = JSON.parse(localStorage.getItem('estado'));

    if (estado) {
        superior.style.backgroundImage = estado.fondo;
        document.body.style.background = estado.background;
    }

    const fechaActual = new Date().toLocaleDateString().split('/');

    fecha.value = `${fechaActual[2]}-${fechaActual[1].length == 1 ? '0' : ''}${
        fechaActual[1]
    }-${fechaActual[0].length == 1 ? '0' : ''}${fechaActual[0]}`;

    fecha2.value = fecha.value;

    let hora = new Date().getHours();

    btnMenu.addEventListener('click', () => {
        fecha2.style.opacity = 0;
        toggleMenu();
    });

    li24h.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.opacity = 0;
        drawGraph('24h');
    });

    li14dias.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.opacity = 0;
        drawGraph('last14days');
    });

    liOtros.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.opacity = 0;
        drawGraph('otros');
    });

    liTemperaturas.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.opacity = 0;
        drawGraph('temperaturas');
    });

    liComparar.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.opacity = 1;
        drawGraph('comparar', fecha.value, fecha2.value);
    });

    liExterna.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.opacity = 0;
        drawGraph('externa');
    });

    liPrecipitacion.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.opacity = 0;
        drawGraph('precipitacion');
    });

    liPrecipitacionAnio.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.opacity = 0;
        drawGraph('precipitacion_anio');
    });

    fecha.addEventListener('change', () => {
        const hoy = new Date();
        const fechaSeleccionada = new Date(fecha.value);

        if (fechaSeleccionada <= hoy) {
            drawGraph('fecha', fecha.value);
        } else {
            alert(
                'La fecha seleccionada no puede ser mayor que la fecha actual'
            );
            drawGraph('24h');
        }
    });

    fecha2.addEventListener('change', () => {
        const hoy = new Date();
        const fechaSeleccionada = new Date(fecha2.value);

        if (fechaSeleccionada <= hoy) {
            drawGraph('comparar', fecha.value, fecha2.value);
        } else {
            alert(
                'La fecha seleccionada no puede ser mayor que la fecha actual'
            );
            drawGraph('24h');
        }
    });
});

drawGraph('24h'); // Dibuja el gráfico por defecto al cargar la página

const obtenerPosicion = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitud: position.coords.latitude,
                        longitud: position.coords.longitude,
                    });
                },
                (error) => {
                    reject('Error al obtener la ubicación: ' + error.message);
                }
            );
        } else {
            reject('La geolocalización no es compatible con este navegador.');
        }
    });
};

const estadoActual = async () => {
    try {
        const posicion = await obtenerPosicion();

        // Obtener estado meteorológico

        const options = {
            method: 'POST',
            body: `modo=status`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                cache: 'no-cache',
            },
        };

        const response = await fetch(url, options);
        const datos = await response.json();

        let estado = {
            temperatura: datos.temperatura[1],
            humedad: datos.humedad[1],
            presion: datos.presion[1],
            llueve: datos.precipitacion[0] > datos.precipitacion[3],
            radiacion: datos.radiacion_solar[1],
            viento: datos.velocidad_viento[1],
            direccion: datos.direccion_viento[1],
            latitud: posicion.latitud,
            longitud: posicion.longitud,
            fondo: '',
            background: '',
        };

        // Obtener horario solar
        const urlSol = `https://api.sunrise-sunset.org/json?lat=${posicion.latitud}&lng=${posicion.longitud}&formatted=0`;
        const solResponse = await fetch(urlSol);
        const solData = await solResponse.json();

        const sunrise = new Date(solData.results.sunrise);
        const sunset = new Date(solData.results.sunset);
        const now = new Date();
        const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;

        const sunriseLocal = new Date(sunrise.getTime() + timezoneOffset);
        const sunsetLocal = new Date(sunset.getTime() + timezoneOffset);
        const currentTime = new Date(now.getTime() + timezoneOffset);
        const isDaytime =
            currentTime >= sunriseLocal && currentTime <= sunsetLocal;

        const daylightDuration = sunsetLocal - sunriseLocal;
        const daylightHours = Math.floor(daylightDuration / (1000 * 60 * 60));
        const daylightMinutes = Math.floor(
            (daylightDuration % (1000 * 60 * 60)) / (1000 * 60)
        );
        const daylightSeconds = Math.floor(
            (daylightDuration % (1000 * 60)) / 1000
        );
        const daylightString = `${daylightHours} horas, ${daylightMinutes} minutos y ${daylightSeconds} segundos`;

        // Agregar datos solares al estado
        estado.amanecer = sunriseLocal.toLocaleTimeString();
        estado.atardecer = sunsetLocal.toLocaleTimeString();
        estado.duracion_dia = daylightString;
        estado.es_dia = isDaytime;

        txtVelocidad.textContent = `${estado.viento} Km/h`;
        txtDireccion.textContent = `${estado.direccion} º`;

        // Asigna el fondo según el estado meteorológico
        if (estado.llueve) {
            estado.fondo = "url('img/lluvia.gif')";
            estado.background = 'linear-gradient(0deg, #9c9c9c, #555)';
        } else {
            if (estado.es_dia) {
                if (estado.radiacion > 500 && estado.humedad <= 75) {
                    estado.fondo = "url('img/dia.webp')";
                    estado.background =
                        'linear-gradient(0deg, #9c9feb, #595ef5)';
                } else if (
                    estado.radiacion > 0 &&
                    estado.radiacion <= 600 &&
                    estado.humedad <= 75
                ) {
                    estado.fondo = "url('img/atardecer.webp')";
                    estado.background =
                        'linear-gradient(0deg, #f0a274, #f37126)';
                } else if (estado.radiacion <= 500 && estado.humedad > 75) {
                    estado.fondo = "url('img/nublado.webp')";
                    estado.background =
                        'linear-gradient(0deg, #757575, #3e3e3e)';
                } else {
                    estado.fondo = "url('img/dia.webp')";
                    estado.background =
                        'linear-gradient(0deg, #9c9feb, #595ef5)';
                }
            } else {
                estado.fondo = "url('img/noche.webp')";
                estado.background = 'linear-gradient(0deg, #463d63, #140644)';
            }
        }

        divVelocidad.style.setProperty(
            'background',
            `linear-gradient(0deg, var(--clr) 0%, var(--clr) ${estado.viento}%, rgba(0,0,0,.5) ${estado.viento}%, rgba(0,0,0,.5) 100%)`
        );

        // Gira el png tantos grados como la dirección del viento
        txtDireccion.style.transform = `rotate(${degree(estado.direccion)}deg)`;

        localStorage.setItem('estado', JSON.stringify(estado));

        return estado;
    } catch (error) {
        console.error('Error en estado actual:', error);
        return null;
    }
};
