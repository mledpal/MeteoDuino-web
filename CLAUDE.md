# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MeteoDuino Web is a weather station dashboard for an ESP8266-based sensor array. It serves real-time and historical meteorological data from a MySQL database via a PHP API, rendered with Chart.js on a vanilla JS frontend.

Live site: https://meteo.ledemar.es

## Development

**No build step.** Files are served directly — HTML, CSS, and JS are all vanilla and require no compilation. Chart.js (v4.3.0) is bundled as `js/chart.js`.

**Code formatting:** Prettier is configured via `.prettierrc`. Run with:
```
npx prettier --write .
```

**Deployment:** Upload files to the web server. Cache-bust JS/CSS by incrementing the `?v=YYYYMMDD` query string on `<script>` and `<link>` tags in `index.html`.

**Database connection:** `funcs/conexion.php` is gitignored and must be created manually on each environment with the PDO MySQL credentials.

## Architecture

### Data flow

```
Frontend (POST to api.php with `modo` param)
  → api.php routes by `modo` value
  → funcs/sqlfuncs.php executes the relevant query
  → funcs/consultas.php (PHP Enum) supplies the SQL
  → JSON response to frontend
  → graph.js renders Chart.js visualization
```

### Backend (`api.php` + `funcs/`)

- **`api.php`** — Entry point. Includes the three function files and dispatches to the right function based on `$_POST['modo']`.
- **`funcs/consultas.php`** — PHP Enum (`Consulta`) holding all SQL query strings. To add a new query, add an enum case here.
- **`funcs/sqlfuncs.php`** — One function per `modo`. Each function calls `conectar()`, runs a query from `Consulta`, and returns a structured PHP array that becomes JSON.
- **`funcs/conexion.php`** — PDO connection helper (gitignored). Returns a PDO object connected to the `meteo` MySQL database.

**API modes** (`modo` values): `24h`, `fecha`, `temperaturas`, `otros`, `last14days`, `comparar`, `externa`, `precipitacion`, `precipitacion_anio`, `status`.

**Database tables:**
- `datos` — Internal sensor readings (BMP280 + GY-11): temperature (2 sensors), humidity, pressure, wind speed/direction, solar radiation, rainfall.
- `datosEXT` — External weather station data.

### Frontend (`js/`)

- **`index.js`** — Main controller. Handles menu navigation, date pickers, graph selection, weather status bar (temperature, sunrise/sunset via external API, wind needle), and real-time refresh.
- **`graph.js`** — All Chart.js graph definitions. Contains 7 rendering functions, one per `modo`. Each function fetches the API, processes the response, and calls `Chart()`.
- **`degree.js`** — Converts 16-point compass strings (e.g., `"NNE"`) to degrees for the wind needle SVG rotation.
- **`icons.js`** — SVG icon factory functions (currently unused in HTML, kept for reference).

### Styling (`css/index.css`)

Dark glassmorphism theme. Background image swaps dynamically (day/night/rain/sunset) based on current weather and time. CSS custom properties (variables) control the palette. Responsive breakpoints handle mobile and tablet layouts.

## Language note

All UI text, variable names, SQL column names, and code comments are in Spanish.
