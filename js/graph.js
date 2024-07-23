/**
 * Con esta función obligamos al gráfico a redimensionarse cuando cambia el tamaño de la pantalla o su orientación
 * @param {*} graph Referencia al gráfico
 */
const resize = (graph) => {
	// Evento que se dispara cuando cambia el tamaño de la pantalla
	window.addEventListener("resize", () => {
		funciones(graph);
	});

	// Evento que se dispara cuando cambia la orientación de la pantalla
	screen.orientation.addEventListener("change", function (e) {
		funciones(graph);
	});

	// Función que se encarga de redimensionar el gráfico
	const funciones = (graph) => {
		document.getElementById("grafico").style.width = "100%";
		document.getElementById("grafico").style.height = "100%";
		graph.resize();
		graph.update();
	};
};

export function graph24(
	horas,
	temperaturas1,
	temperaturas2,
	humedad,
	presion,
	sensacion
) {
	const ctx = document.getElementById("grafico");

	const graph = new Chart(ctx, {
		data: {
			labels: horas,
			datasets: [
				{
					label: "Temperatura BMP280",
					type: "line",
					data: temperaturas1,
					borderWidth: 1,
					yAxisID: "y-temperatura",
				},
				{
					label: "Temperatura GY-21",
					type: "line",
					data: temperaturas2,
					borderWidth: 1,
					yAxisID: "y-temperatura",
					hidden: true,
				},
				{
					type: "line",
					label: "Sensación Térmica",
					data: sensacion,
					borderWidth: 1,
					yAxisID: "y-temperatura",
					hidden: true,
				},
				{
					type: "line",
					label: "Humedad",
					data: humedad,
					borderWidth: 1,
					yAxisID: "y-humedad",
					hidden: true,
				},
				{
					type: "line",
					label: "Presion",
					data: presion,
					borderWidth: 1,
					hidden: true,
					yAxisID: "y-presion",
				},
			],
		},
		options: {
			pointStyle: false,
			scales: {
				"y-temperatura": {
					type: "linear",
					position: "left",
				},
				"y-humedad": {
					label: "Humedad",
					min: 0,
					max: 100,
					type: "linear",
					position: "right",
					step: 10,
				},
				"y-presion": {
					label: "Presión",
					min: 980,
					max: 1040,
					position: "right",
				},
			},
		},
	});

	resize(graph);
}

export function graphTemperaturas(fecha, max1, min1, med1, max2, min2, med2) {
	const ctx = document.getElementById("grafico");

	const graph = new Chart(ctx, {
		data: {
			labels: fecha,
			datasets: [
				{
					label: "BMP MAX",
					type: "line",
					data: max1,
					borderWidth: 1,
					hidden: false,
					yAxisID: "y-temperatura",
				},
				{
					label: "BMP MIN",
					type: "line",
					data: min1,
					borderWidth: 1,
					yAxisID: "y-temperatura",
					hidden: false,
				},
				{
					type: "line",
					label: "BMP MED",
					data: med1,
					borderWidth: 1,
					yAxisID: "y-temperatura",
					hidden: false,
				},
				{
					label: "DHT MAX",
					type: "line",
					data: max2,
					borderWidth: 1,
					hidden: true,
					yAxisID: "y-temperatura",
				},
				{
					label: "DHT MIN",
					type: "line",
					data: min2,
					borderWidth: 1,
					yAxisID: "y-temperatura",
					hidden: true,
				},
				{
					type: "line",
					label: "DHT MED",
					data: med2,
					borderWidth: 1,
					yAxisID: "y-temperatura",
					hidden: true,
				},
			],
		},
		options: {
			pointStyle: false,
			scales: {
				"y-temperatura": {
					type: "linear",
					position: "left",
				},
				"y-humedad": {
					label: "Humedad",
					min: 0,
					max: 100,
					type: "linear",
					position: "right",
					step: 20,
				},
				"y-presion": {
					label: "Presión",
					min: 960,
					max: 1050,
					position: "right",
				},
			},
		},
	});

	resize(graph);
}

export function graphOtros(fecha, maxp, minp, medp, maxh, minh, medh) {
	const ctx = document.getElementById("grafico");

	const graph = new Chart(ctx, {
		data: {
			labels: fecha,
			datasets: [
				{
					label: "Humedad MAX",
					type: "line",
					data: maxh,
					borderWidth: 1,
					hidden: true,
					yAxisID: "y-humedad",
				},
				{
					label: "Humedad MIN",
					type: "line",
					data: minh,
					borderWidth: 1,
					yAxisID: "y-humedad",
					hidden: true,
				},
				{
					type: "line",
					label: "Humedad MED",
					data: medh,
					borderWidth: 1,
					yAxisID: "y-humedad",
					hidden: false,
				},
				{
					label: "Presion MAX",
					type: "line",
					data: maxp,
					borderWidth: 1,
					hidden: true,
					yAxisID: "y-presion",
				},
				{
					label: "Presion MIN",
					type: "line",
					data: minp,
					borderWidth: 1,
					yAxisID: "y-presion",
					hidden: true,
				},
				{
					type: "line",
					label: "Presion MED",
					data: medp,
					borderWidth: 1,
					yAxisID: "y-presion",
					hidden: false,
				},
			],
		},
		options: {
			pointStyle: false,
			scales: {
				"y-humedad": {
					label: "Humedad",
					type: "linear",
					position: "left",
					step: 20,
				},
				"y-presion": {
					label: "Presión",

					position: "right",
				},
			},
		},
	});

	resize(graph);
}

export function graphLastDays(fecha, t1, t2, p, h) {
	const ctx = document.getElementById("grafico");

	const graph = new Chart(ctx, {
		data: {
			labels: fecha,
			datasets: [
				{
					label: "T1",
					type: "line",
					data: t1,
					borderWidth: 1,
					hidden: false,
					yAxisID: "y-temperatura",
				},
				{
					label: "T2",
					type: "line",
					data: t2,
					borderWidth: 1,
					yAxisID: "y-temperatura",
					hidden: true,
				},
				{
					type: "line",
					label: "Presión",
					data: p,
					borderWidth: 1,
					yAxisID: "y-presion",
					hidden: true,
				},
				{
					label: "Humedad",
					type: "line",
					data: h,
					borderWidth: 1,
					hidden: true,
					yAxisID: "y-humedad",
				},
			],
		},
		options: {
			pointStyle: false,
			scales: {
				"y-temperatura": {
					type: "linear",
					position: "left",
				},
				"y-humedad": {
					label: "Humedad",
					min: 0,
					max: 100,
					type: "linear",
					position: "right",
					step: 20,
				},
				"y-presion": {
					label: "Presión",
					min: 960,
					max: 1050,
					position: "right",
				},
			},
		},
	});

	resize(graph);
}

export function graphComparar(datos) {
	const { datos1, datos2 } = datos;

  const fecha1 = datos1[0];
  const hora1 = datos1[1];
	const t1a = datos1[2];
	const t2a = datos1[3];
	const p = datos1[4];
	const h = datos1[5];

  const fecha2 = datos2[0];
  const hora2 = datos2[1];
	const t1b = datos2[2];
	const t2b = datos2[3];
	const pb = datos2[4];
	const hb = datos2[5];

	const ctx = document.getElementById("grafico");
	const graph = new Chart(ctx, {
		data: {
			labels: fecha1,
			fecha2,
			datasets: [
				{
					label: "T1",
					type: "line",
					data: t1a,
					borderWidth: 1,
					hidden: false,
					xAxisID: "x2",
					yAxisID: "y-temperatura",
				},
				{
					label: "T2",
					type: "line",
					data: t2a,
					borderWidth: 1,
					xAxisID: "x2",
					yAxisID: "y-temperatura",
					hidden: true,
				},
				{
					type: "line",
					label: "Presión",
					data: p,
					borderWidth: 1,
					xAxisID: "x2",
					yAxisID: "y-presion",
					hidden: true,
				},
				{
					label: "Humedad",
					type: "line",
					data: h,
					borderWidth: 1,
					hidden: true,
					xAxisID: "x2",
					yAxisID: "y-humedad",
				},
				{
					label: "T1B",
					type: "line",
					data: t1b,
					borderWidth: 1,
					hidden: false,
					xAxisID: "x2",
					yAxisID: "y-temperatura",
				},
				{
					label: "T2B",
					type: "line",
					data: t2b,
					borderWidth: 1,
					xAxisID: "x2",
					yAxisID: "y-temperatura",
					hidden: true,
				},
				{
					type: "line",
					label: "Presión",
					data: pb,
					borderWidth: 1,
					xAxisID: "x2",
					yAxisID: "y-presion",
					hidden: true,
				},
				{
					label: "Humedad",
					type: "line",
					data: hb,
					borderWidth: 1,
					hidden: true,
					xAxisID: "x2",
					yAxisID: "y-humedad",
				},
			],
		},
		options: {
			pointStyle: false,
			scales: {				
				x2: {					
          labels: hora2,        
				},
				"y-temperatura": {
					type: "linear",
					position: "left",
				},
				"y-humedad": {
					label: "Humedad",
					min: 0,
					max: 100,
					type: "linear",
					position: "right",
					step: 20,
				},
				"y-presion": {
					label: "Presión",
					min: 960,
					max: 1050,
					position: "right",
				},
			},
		},
	});

	resize(graph);
}
