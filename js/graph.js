let currentChart = null;

// Listener global único para redimensionar el gráfico actual
window.addEventListener('resize', () => {
    if (currentChart) {
        currentChart.resize();
        currentChart.update();
    }
});

export function graph24(
    horas,
    temperaturas1,
    temperaturas2,
    humedad,
    presion,
    sensacion,
    bateria
) {
    const ctx = document.getElementById('grafico');

    if (currentChart) {
        currentChart.destroy();
    }

    const graph = new Chart(ctx, {
        data: {
            labels: horas,
            datasets: [
                {
                    label: 'Temperatura BMP280',
                    type: 'line',
                    data: temperaturas1,
                    borderWidth: 1,
                    yAxisID: 'y-temperatura',
                },
                {
                    label: 'Temperatura GY-21',
                    type: 'line',
                    data: temperaturas2,
                    borderWidth: 1,
                    yAxisID: 'y-temperatura',
                    hidden: true,
                },
                {
                    type: 'line',
                    label: 'Sensación Térmica',
                    data: sensacion,
                    borderWidth: 1,
                    yAxisID: 'y-temperatura',
                    hidden: true,
                },
                {
                    type: 'line',
                    label: 'Humedad',
                    data: humedad,
                    borderWidth: 1,
                    yAxisID: 'y-humedad',
                    hidden: true,
                },
                {
                    type: 'line',
                    label: 'Presion',
                    data: presion,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-presion',
                },
            ],
        },
        options: {
            pointStyle: false,
            scales: {
                'y-temperatura': {
                    type: 'linear',
                    position: 'left',
                },
                'y-humedad': {
                    label: 'Humedad',
                    min: 0,
                    max: 100,
                    type: 'linear',
                    position: 'right',
                    step: 10,
                },
                'y-presion': {
                    label: 'Presión',
                    min: 980,
                    max: 1040,
                    position: 'right',
                },
            },
        },
    });

    currentChart = graph;
}

export function graphTemperaturas(fecha, max1, min1, med1, max2, min2, med2) {
    const ctx = document.getElementById('grafico');

    if (currentChart) {
        currentChart.destroy();
    }

    const graph = new Chart(ctx, {
        data: {
            labels: fecha,
            datasets: [
                {
                    label: 'BMP MAX',
                    type: 'line',
                    data: max1,
                    borderWidth: 1,
                    hidden: false,
                    yAxisID: 'y-temperatura',
                },
                {
                    label: 'BMP MIN',
                    type: 'line',
                    data: min1,
                    borderWidth: 1,
                    yAxisID: 'y-temperatura',
                    hidden: false,
                },
                {
                    type: 'line',
                    label: 'BMP MED',
                    data: med1,
                    borderWidth: 1,
                    yAxisID: 'y-temperatura',
                    hidden: false,
                },
                {
                    label: 'DHT MAX',
                    type: 'line',
                    data: max2,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-temperatura',
                },
                {
                    label: 'DHT MIN',
                    type: 'line',
                    data: min2,
                    borderWidth: 1,
                    yAxisID: 'y-temperatura',
                    hidden: true,
                },
                {
                    type: 'line',
                    label: 'DHT MED',
                    data: med2,
                    borderWidth: 1,
                    yAxisID: 'y-temperatura',
                    hidden: true,
                },
            ],
        },
        options: {
            pointStyle: false,
            scales: {
                'y-temperatura': {
                    type: 'linear',
                    position: 'left',
                },
                'y-humedad': {
                    label: 'Humedad',
                    min: 0,
                    max: 100,
                    type: 'linear',
                    position: 'right',
                    step: 20,
                },
                'y-presion': {
                    label: 'Presión',
                    min: 960,
                    max: 1050,
                    position: 'right',
                },
            },
        },
    });

    currentChart = graph;
}

export function graphOtros(fecha, maxp, minp, medp, maxh, minh, medh) {
    const ctx = document.getElementById('grafico');

    if (currentChart) {
        currentChart.destroy();
    }

    const graph = new Chart(ctx, {
        data: {
            labels: fecha,
            datasets: [
                {
                    label: 'Humedad MAX',
                    type: 'line',
                    data: maxh,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-humedad',
                },
                {
                    label: 'Humedad MIN',
                    type: 'line',
                    data: minh,
                    borderWidth: 1,
                    yAxisID: 'y-humedad',
                    hidden: true,
                },
                {
                    type: 'line',
                    label: 'Humedad MED',
                    data: medh,
                    borderWidth: 1,
                    yAxisID: 'y-humedad',
                    hidden: false,
                },
                {
                    label: 'Presion MAX',
                    type: 'line',
                    data: maxp,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-presion',
                },
                {
                    label: 'Presion MIN',
                    type: 'line',
                    data: minp,
                    borderWidth: 1,
                    yAxisID: 'y-presion',
                    hidden: true,
                },
                {
                    type: 'line',
                    label: 'Presion MED',
                    data: medp,
                    borderWidth: 1,
                    yAxisID: 'y-presion',
                    hidden: false,
                },
            ],
        },
        options: {
            pointStyle: false,
            scales: {
                'y-humedad': {
                    label: 'Humedad',
                    type: 'linear',
                    position: 'left',
                    step: 20,
                },
                'y-presion': {
                    label: 'Presión',

                    position: 'right',
                },
            },
        },
    });

    currentChart = graph;
}

export function graphLastDays(fecha, t1, t2, p, h) {
    const ctx = document.getElementById('grafico');

    if (currentChart) {
        currentChart.destroy();
    }

    const graph = new Chart(ctx, {
        data: {
            labels: fecha,
            datasets: [
                {
                    label: 'T1',
                    type: 'line',
                    data: t1,
                    borderWidth: 1,
                    hidden: false,
                    yAxisID: 'y-temperatura',
                },
                {
                    label: 'T2',
                    type: 'line',
                    data: t2,
                    borderWidth: 1,
                    yAxisID: 'y-temperatura',
                    hidden: true,
                },
                {
                    type: 'line',
                    label: 'Presión',
                    data: p,
                    borderWidth: 1,
                    yAxisID: 'y-presion',
                    hidden: true,
                },
                {
                    label: 'Humedad',
                    type: 'line',
                    data: h,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-humedad',
                },
            ],
        },
        options: {
            pointStyle: false,
            scales: {
                'y-temperatura': {
                    type: 'linear',
                    position: 'left',
                },
                'y-humedad': {
                    label: 'Humedad',
                    min: 0,
                    max: 100,
                    type: 'linear',
                    position: 'right',
                    step: 20,
                },
                'y-presion': {
                    label: 'Presión',
                    min: 960,
                    max: 1050,
                    position: 'right',
                },
            },
        },
    });

    currentChart = graph;
}

export function graphComparar(datos) {
    const { datos1, datos2 } = datos;

    const fecha1 = datos1[0][0];
    const hora1 = datos1[1];
    const t1a = datos1[2];
    const t2a = datos1[3];
    const p = datos1[4];
    const h = datos1[5];

    const fecha2 = datos2[0][0];
    const t1b = datos2[2];
    const t2b = datos2[3];
    const pb = datos2[4];
    const hb = datos2[5];

    const ctx = document.getElementById('grafico');

    if (currentChart) {
        currentChart.destroy();
    }

    const graph = new Chart(ctx, {
        data: {
            labels: hora1,
            datasets: [
                {
                    label: `T1 (${fecha1})`,
                    type: 'line',
                    data: t1a,
                    borderWidth: 1,
                    hidden: false,
                    yAxisID: 'y-temperatura',
                },
                {
                    label: `T2 (${fecha1})`,
                    type: 'line',
                    data: t2a,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-temperatura',
                },
                {
                    type: 'line',
                    label: `Presión (${fecha1})`,
                    data: p,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-presion',
                },
                {
                    label: `Humedad (${fecha1})`,
                    type: 'line',
                    data: h,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-humedad',
                },
                {
                    label: `T1 (${fecha2})`,
                    type: 'line',
                    data: t1b,
                    borderWidth: 1,
                    hidden: false,
                    yAxisID: 'y-temperatura',
                    borderDash: [5, 5],
                },
                {
                    label: `T2 (${fecha2})`,
                    type: 'line',
                    data: t2b,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-temperatura',
                    borderDash: [5, 5],
                },
                {
                    type: 'line',
                    label: `Presión (${fecha2})`,
                    data: pb,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-presion',
                    borderDash: [5, 5],
                },
                {
                    label: `Humedad (${fecha2})`,
                    type: 'line',
                    data: hb,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-humedad',
                    borderDash: [5, 5],
                },
            ],
        },
        options: {
            pointStyle: false,
            scales: {
                'y-temperatura': {
                    type: 'linear',
                    position: 'left',
                },
                'y-humedad': {
                    label: 'Humedad',
                    min: 0,
                    max: 100,
                    type: 'linear',
                    position: 'right',
                    step: 20,
                },
                'y-presion': {
                    label: 'Presión',
                    min: 960,
                    max: 1050,
                    position: 'right',
                },
            },
        },
    });

    currentChart = graph;
}

export function graphExterna(...datos) {
    const hora = datos[0];
    const temperatura = datos[1];
    const humedad = datos[2];
    const presion = datos[3];
    const precipitacion = datos[4];
    const precipitacion_puntual = datos[5];
    const radiacion_solar = datos[6];
    const velocidad_viento = datos[7];
    // const direccion_viento = datos[7];

    if (currentChart) {
        currentChart.destroy();
    }

    const ctx = document.getElementById('grafico');

    const graph = new Chart(ctx, {
        data: {
            labels: hora,
            datasets: [
                {
                    label: 'Temperatura',
                    type: 'line',
                    data: temperatura,
                    borderWidth: 1,
                    hidden: false,
                    yAxisID: 'y-temperatura',
                },
                {
                    label: 'Humedad',
                    type: 'line',
                    data: humedad,
                    borderWidth: 1,
                    yAxisID: 'y-humedad',
                    hidden: true,
                },
                {
                    type: 'line',
                    label: 'Presión',
                    data: presion,
                    borderWidth: 1,
                    yAxisID: 'y-presion',
                    hidden: true,
                },
                {
                    label: 'Precipitación',
                    type: 'line',
                    data: precipitacion,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-precipitacion',
                },
                {
                    label: 'Precipitación Puntual',
                    type: 'bar',
                    data: precipitacion_puntual,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-precipitacion2',
                },
                {
                    label: 'Radiación Solar',
                    type: 'line',
                    data: radiacion_solar,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-radiacion',
                },
                {
                    label: 'Velocidad Viento',
                    type: 'line',
                    data: velocidad_viento,
                    borderWidth: 1,
                    hidden: true,
                    yAxisID: 'y-temperatura',
                },
            ],
        },
        options: {
            pointStyle: false,
            scales: {
                'y-temperatura': {
                    type: 'linear',
                    position: 'left',
                },
                'y-humedad': {
                    label: 'Humedad',
                    min: 0,
                    max: 100,
                    type: 'linear',
                    position: 'right',
                    step: 20,
                },
                'y-presion': {
                    label: 'Presión',
                    min: 960,
                    max: 1050,
                    position: 'right',
                },
                'y-precipitacion': {
                    label: 'Precipitación',
                    min: 0,
                    type: 'linear',
                    position: 'right',
                    step: 1,
                },
                'y-precipitacion2': {
                    label: 'Precipitación Puntual',
                    min: 0,
                    type: 'linear',
                    position: 'right',
                    step: 0.25,
                },
                'y-radiacion': {
                    label: 'Radiación Solar',
                    min: 0,
                    type: 'linear',
                    position: 'left',
                    step: 100,
                },
            },
        },
    });

    currentChart = graph;
}

export function graphPrecipitacion(...datos) {
    const fecha = datos[0];
    const precipitacion = datos[1];

    const ctx = document.getElementById('grafico');

    if (currentChart) {
        currentChart.destroy();
    }

    const graph = new Chart(ctx, {
        data: {
            labels: fecha,
            datasets: [
                {
                    label: 'Precipitación',
                    type: 'bar',
                    data: precipitacion,
                    borderWidth: 1,
                    hidden: false,
                    yAxisID: 'y-precipitacion',
                },
            ],
        },
        options: {
            pointStyle: false,
            scales: {
                'y-precipitacion': {
                    type: 'linear',
                    position: 'left',
                },
            },
        },
    });

    currentChart = graph;
}

export function graphPrecipitacionYear(...datos) {
    const mes = datos[0];
    const precipitacion = datos[1];

    const ctx = document.getElementById('grafico');

    if (currentChart) {
        currentChart.destroy();
    }

    const graph = new Chart(ctx, {
        data: {
            labels: mes,
            datasets: [
                {
                    label: 'Precipitación',
                    type: 'bar',
                    data: precipitacion,
                    borderWidth: 1,
                    hidden: false,
                    yAxisID: 'y-precipitacion',
                },
            ],
        },
        options: {
            pointStyle: false,
            scales: {
                'y-precipitacion': {
                    type: 'linear',
                    position: 'left',
                },
            },
        },
    });

    currentChart = graph;
}

export function graphCompararMeses(datos) {
    const { mes1, mes2, datos1, datos2 } = datos;

    const dias1 = datos1[0];
    const temps1 = datos1[1];

    const dias2 = datos2[0];
    const temps2 = datos2[1];

    const maxDias = Math.max(dias1.length, dias2.length);
    const labels = Array.from({ length: maxDias }, (_, i) => i + 1);

    const ctx = document.getElementById('grafico');

    if (currentChart) {
        currentChart.destroy();
    }

    const graph = new Chart(ctx, {
        data: {
            labels: labels,
            datasets: [
                {
                    label: `Temperatura Media (${mes1})`,
                    type: 'line',
                    data: temps1,
                    borderWidth: 1,
                    hidden: false,
                    yAxisID: 'y-temperatura',
                },
                {
                    label: `Temperatura Media (${mes2})`,
                    type: 'line',
                    data: temps2,
                    borderWidth: 1,
                    hidden: false,
                    yAxisID: 'y-temperatura',
                    borderDash: [5, 5],
                },
            ],
        },
        options: {
            pointStyle: false,
            scales: {
                'y-temperatura': {
                    type: 'linear',
                    position: 'left',
                    label: 'Temperatura (°C)',
                },
            },
        },
    });

    currentChart = graph;
}
