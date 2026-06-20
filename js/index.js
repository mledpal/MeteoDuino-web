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
    graphCompararMeses,
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
const liCompararMeses = document.getElementById('liCompararMeses');
const liExterna = document.getElementById('liExterna');
const liPrecipitacion = document.getElementById('liprecipitacion');
const liPrecipitacionAnio = document.getElementById('liprecipitacion_anio');

const fecha = document.getElementById('fecha');
const fecha2 = document.getElementById('fecha2');
const mes1 = document.getElementById('mes1');
const mes2 = document.getElementById('mes2');

const txtUltima = document.getElementById('txtUltima');
const txtTMax = document.getElementById('txtTMax');
const txtTMin = document.getElementById('txtTMin');
const txtTMed = document.getElementById('txtTMed');
const txtHMax = document.getElementById('txtHMax');
const txtHMin = document.getElementById('txtHMin');
const txtHMed = document.getElementById('txtHMed');
const txtPMax = document.getElementById('txtPMax');
const txtPMin = document.getElementById('txtPMin');
const txtPMed = document.getElementById('txtPMed');
const txtSensacion = document.getElementById('sensacionTermica');
const txtbateria = document.getElementById('bateria');

const divHumedad = document.getElementById('divHumedad');
const divSensacion = document.getElementById('divSensacion');
const divPresion = document.getElementById('divPresion');
const divVelocidad = document.getElementById('divVelocidad');
const divPrecipitacion = document.getElementById('divPrecipitacion');

const ctx = document.getElementById('grafico');

function toggleMenu() {
    menu.classList.toggle('showMenu');
}

/**
 * Función para recuperar los datos meteorológicos del servidor y dibujar el gráfico
 * @param {*} url URL a la que nos conectamos
 * @param {*} modo Tipo de datos que recuperamos *
 */
async function drawGraph(
    modo,
    fecha = null,
    fecha2 = null,
    mes1 = null,
    mes2 = null
) {
    divPrecipitacion.style.display = 'none';
    let hora = [new Date().getHours(), new Date().getMinutes()];

    const params = new URLSearchParams({ modo });
    if (fecha) params.append('fecha', fecha);
    if (fecha2) params.append('fecha2', fecha2);
    if (mes1) params.append('mes1', mes1);
    if (mes2) params.append('mes2', mes2);

    const options = {
        method: 'POST',
        body: params.toString(),
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
    };

    const response = await fetch(url, options);
    const datos = await response.json();

    localStorage.setItem(`datos_${modo}`, JSON.stringify(datos));

    switch (modo) {
        case '24h':
        case 'fecha':
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

            txtUltima.textContent = tiempo;
            txtTMax.textContent = `↑ ${tMaxima} (${tMaxT})`;
            txtTMin.textContent = `↓ ${tMinima} (${tMinT})`;
            txtTMed.textContent = `~ ${tMedia}`;
            txtHMax.textContent = `↑ ${hMaxima} (${hMaxT})`;
            txtHMin.textContent = `↓ ${hMinima} (${hMinT})`;
            txtHMed.textContent = `~ ${hMedia}`;
            txtPMax.textContent = `↑ ${pMaxima} (${pMaxT})`;
            txtPMin.textContent = `↓ ${pMinima} (${pMinT})`;
            txtPMed.textContent = `~ ${pMedia}`;

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
            graphTemperaturas(...datos);
            break;

        case 'otros':
            graphOtros(...datos);
            break;

        case 'last14days':
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

        case 'comparar_meses':
            graphCompararMeses(datos);
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

    fecha.value = new Date().toISOString().slice(0, 10);
    fecha2.value = fecha.value;

    mes1.value = new Date().toISOString().slice(0, 7);
    mes2.value = mes1.value;

    mes1.style.display = 'none';
    mes2.style.display = 'none';

    let hora = new Date().getHours();

    btnMenu.addEventListener('click', () => {
        toggleMenu();
    });

    li24h.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.display = 'none';
        fecha.style.display = 'inline-block';
        mes1.style.display = 'none';
        mes2.style.display = 'none';
        drawGraph('24h');
    });

    li14dias.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.display = 'none';
        fecha.style.display = 'inline-block';
        mes1.style.display = 'none';
        mes2.style.display = 'none';
        drawGraph('last14days');
    });

    liOtros.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.display = 'none';
        fecha.style.display = 'inline-block';
        mes1.style.display = 'none';
        mes2.style.display = 'none';
        drawGraph('otros');
    });

    liTemperaturas.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.display = 'none';
        fecha.style.display = 'inline-block';
        mes1.style.display = 'none';
        mes2.style.display = 'none';
        drawGraph('temperaturas');
    });

    liComparar.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.display = 'inline-block';
        fecha.style.display = 'inline-block';
        mes1.style.display = 'none';
        mes2.style.display = 'none';
        drawGraph('comparar', fecha.value, fecha2.value);
    });

    liCompararMeses.addEventListener('click', () => {
        toggleMenu();
        fecha.style.display = 'none';
        fecha2.style.display = 'none';
        mes1.style.display = 'inline-block';
        mes2.style.display = 'inline-block';
        drawGraph('comparar_meses', null, null, mes1.value, mes2.value);
    });

    liExterna.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.display = 'none';
        fecha.style.display = 'inline-block';
        mes1.style.display = 'none';
        mes2.style.display = 'none';
        drawGraph('externa');
    });

    liPrecipitacion.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.display = 'none';
        fecha.style.display = 'inline-block';
        mes1.style.display = 'none';
        mes2.style.display = 'none';
        drawGraph('precipitacion');
    });

    liPrecipitacionAnio.addEventListener('click', () => {
        toggleMenu();
        fecha2.style.display = 'none';
        fecha.style.display = 'inline-block';
        mes1.style.display = 'none';
        mes2.style.display = 'none';
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

    mes1.addEventListener('change', () => {
        drawGraph('comparar_meses', null, null, mes1.value, mes2.value);
    });

    mes2.addEventListener('change', () => {
        drawGraph('comparar_meses', null, null, mes1.value, mes2.value);
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !btnMenu.contains(e.target)) {
            menu.classList.remove('showMenu');
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

        const sunriseLocal = new Date(sunrise.getTime() - timezoneOffset);
        const sunsetLocal = new Date(sunset.getTime() - timezoneOffset);
        const currentTime = new Date(now.getTime() - timezoneOffset);

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

        // Asigna el fondo según el estado meteorológico
        if (estado.llueve) {
            estado.fondo = "url('img/lluvia.gif')";
            estado.background = 'linear-gradient(0deg, #9c9c9c, #555)';
        } else {
            if (estado.es_dia) {
                if (estado.radiacion > 100 && estado.humedad <= 75) {
                    estado.fondo = "url('img/dia.webp')";
                    estado.background =
                        'linear-gradient(0deg, #9c9feb, #595ef5)';
                } else if (
                    estado.radiacion > 0 &&
                    estado.radiacion <= 100 &&
                    estado.humedad <= 75
                ) {
                    estado.fondo = "url('img/atardecer.webp')";
                    estado.background =
                        'linear-gradient(0deg, #f0a274, #f37126)';
                } else if (estado.radiacion <= 100 && estado.humedad > 75) {
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
