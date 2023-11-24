"use strict";

import {
	graph24,
	graphTemperaturas,
	graphOtros,
	graphLastDays,
} from "./graph.js";

const url = "./api.php";

const txtTemperatura = document.getElementById("temperatura");
const txtHumedad = document.getElementById("humedad");
const txtPresion = document.getElementById("presion");

const btnMenu = document.getElementById("menu");
const menu = document.getElementById("menuOculto");

const li24h = document.getElementById("li24h");
const liTemperaturas = document.getElementById("liTemperaturas");
const liOtros = document.getElementById("liOtros");
const li14dias = document.getElementById("li14dias");

const fecha = document.getElementById("fecha");

const txtDatos = document.getElementById("txtDatos");
const txtEstado = document.getElementById("estadoActual");
const txtSensacion = document.getElementById("sensacionTermica");

const divHumedad = document.getElementById("divHumedad");
const divSensacion = document.getElementById("divSensacion");
const divPresion = document.getElementById("divPresion");

const ctx = document.getElementById("grafico");

function toggleMenu() {
	menu.classList.contains("showMenu")
		? ((menu.style.cssText = "display: hidden;"),
		  menu.classList.remove("showMenu"))
		: ((menu.style.cssText = "display: block;"),
		  menu.classList.add("showMenu"));
}

/**
 * Función para recuperar los datos meteorológicos del servidor y dibujar el gráfico
 * @param {*} url URL a la que nos conectamos
 * @param {*} modo Tipo de datos que recuperamos *
 */
async function drawGraph(modo, fecha = null) {
	document.getElementById("grafico").remove();
	let canvas = document.createElement("canvas");
	canvas.setAttribute("id", "grafico");
	document.getElementById("inferior").appendChild(canvas);

	let hora = [new Date().getHours(), new Date().getMinutes()];

	const options = {
		method: "POST",
		body: `modo=${modo}&fecha=${fecha}`,
		cors: "no-cors",
		headers: {
			"Content-type": "application/x-www-form-urlencoded",
			cache: "no-cache",
		},
	};

	const response = await fetch(url, options);
	const datos = await response.json();

	localStorage.setItem(`datos_${modo}`, JSON.stringify(datos));

	switch (modo) {
		case "24h":
		case "fecha":
			// Dibuja la gráfica
			//graph24(datos[0], datos[1], datos[2], datos[3], datos[4], datos[5]);
			graph24(...datos);

			// Muestra los datos actuales
			let temperatura = `${datos[1][datos[1].length - 1]} ºC`;
			let humedad = `${datos[3][datos[3].length - 1]}`;
			let presion = `${datos[4][datos[4].length - 1]} hPa`;
			let sensacionTermica = `${datos[5][datos[5].length - 1]} ºC`;

			txtTemperatura.textContent = temperatura;
			txtHumedad.textContent = humedad + "  %";
			txtPresion.textContent = presion;
			txtSensacion.textContent = `${sensacionTermica}ºC`;

			// Muestra el estado meteorológico actual en texto
			if (humedad < 20) {
				txtEstado.textContent = "Seco";
			}

			if (humedad > 65 && humedad < 70) {
				txtEstado.textContent = "Nuboso";
			} else if (humedad >= 70 && presion <= 1000) {
				txtEstado.textContent = "Lluvia";
				superior.style.backgroundImage = "url('img/lluvia.gif')";
				document.body.style.background = "linear-gradient(0deg, #9c9c9c, #555)";
			}

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
			let valorT = ((datos[5][datos[5].length - 1] - -10) / (55 - -10)) * 100;
			let valorP = ((datos[4][datos[4].length - 1] - 990) / (1030 - 990)) * 100;

			divHumedad.style.setProperty(
				"background",
				`linear-gradient(0deg, var(--clr) 0%, var(--clr) ${humedad}%, transparent ${humedad}%, transparent 100%)`
			);

			divPresion.style.setProperty(
				"background",
				`linear-gradient(0deg, var(--clr) 0%, var(--clr) ${valorP}%, transparent ${valorP}%, transparent 100%)`
			);

			divSensacion.style.setProperty(
				"background",
				`linear-gradient(0deg, var(--clr) 0%, var(--clr) ${valorT}%, transparent ${valorT}%, transparent 100%)`
			);

			break;

		case "temperaturas":
			//graphTemperaturas(datos[0], datos[1], datos[2], datos[3], datos[4], datos[5], datos[6]);
			graphTemperaturas(...datos);
			break;

		case "otros":
			//graphOtros(datos[0], datos[1], datos[2], datos[3], datos[4], datos[5], datos[6]);
			graphOtros(...datos);
			break;

		case "last14days":
			//graphLastDays(datos[0].reverse(), datos[1].reverse(), datos[2].reverse(), datos[3].reverse(), datos[4].reverse());
			graphLastDays(...datos);
			break;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const fechaActual = new Date().toLocaleDateString().split("/");

	fecha.value = `${fechaActual[2]}-${fechaActual[1].length == 1 ? "0" : ""}${
		fechaActual[1]
	}-${fechaActual[0].length == 1 ? "0" : ""}${fechaActual[0]}`;

	let hora = new Date().getHours();

	const superior = document.getElementById("superior");

	if (hora >= 6 && hora <= 8) {
		superior.style.backgroundImage = "url('img/amanecer.webp')";
		document.body.style.background = "linear-gradient(0deg, #9c9feb, #595ef5)";
	} else if (hora >= 8 && hora <= 18) {
		superior.style.backgroundImage = "url('img/dia.webp')";
		document.body.style.background = "linear-gradient(0deg, #9c9feb, #595ef5)";
	} else if (hora >= 19 && hora <= 21) {
		superior.style.backgroundImage = "url('img/atardecer.webp')";
		document.body.style.background = "linear-gradient(0deg, #f0a274, #f37126)";
	} else {
		superior.style.backgroundImage = "url('img/noche.webp')";
		document.body.style.background = "linear-gradient(0deg, #463d63, #140644)";
	}

	btnMenu.addEventListener("click", () => {
		toggleMenu();
	});

	li24h.addEventListener("click", () => {
		toggleMenu();
		drawGraph("24h");
	});

	li14dias.addEventListener("click", () => {
		toggleMenu();
		drawGraph("last14days");
	});

	liOtros.addEventListener("click", () => {
		toggleMenu();
		drawGraph("otros");
	});

	liTemperaturas.addEventListener("click", () => {
		toggleMenu();
		drawGraph("temperaturas");
	});

	fecha.addEventListener("change", () => {
		const hoy = new Date();
		const fechaSeleccionada = new Date(fecha.value);

		if (fechaSeleccionada <= hoy) {
			drawGraph("fecha", fecha.value);
		} else {
			alert("La fecha seleccionada no puede ser mayor que la fecha actual");
			drawGraph("24h");
		}
	});
});

drawGraph("24h"); // Dibuja el gráfico por defecto al cargar la página
