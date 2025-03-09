# Estación Meteorológica con ESP8266
## Interfaz Web 

> <a href="https://meteo.ledemar.es" target="_new">Acceder desde aquí</a>


<p>Repositorio de la interfaz web de una estación meteorológica creada con un ESP8266 ___(Arduino)___ </p>
<p>Uso un sensor BMP280 para medir la temperatura y la presión atmosférica</p>

> Y otro sensor, DHT11 para medir la humedad (y también la sensación térmica) (DEPRECATED)

<p>Ahora uso un sensor GY-11 para la medición de la humedad (y temperatura)</p>
<p>El repositorio para programar el microcontrolador <a href="https://github.com/mledpal/meteoduino-firmware">AQUI</a></p>

> Más adelante publicaré un gráfico con el conexionado

## Por hacer
- Pasar a React toda la interfaz
- Integrar un sensor de lluvia
- Cambiar la librería de gráficos


## Últimos cambios
- 09/03/2025. Añado un nuevo menu para observar las precipitaciones de lluvia de los últimos días
- 1/12/2024. Inclusión de datos de una meteorológica externa (no propia)
- 1/10/2024. Modificación del código que controla la zona horaria para el ESP8266
