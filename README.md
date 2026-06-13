# Quiniela Mundial 2026

Aplicación web ligera, moderna y responsiva para llevar una quiniela mundialista entre amigos. Funciona como proyecto frontend estático, con datos editables desde archivos JSON y lista para publicarse en GitHub Pages.

> Los datos incluidos son demo/manuales para arrancar rápido. Actualiza `data/partidos.json` con el calendario y resultados reales que quieras usar.

## Tecnologías usadas

- HTML, CSS y JavaScript vanilla.
- Chart.js por CDN para gráficos.
- Datos locales en JSON.
- Sin backend obligatorio.

## Cómo correr localmente

Opción rápida:

1. Abre `index.html` en tu navegador.
2. Si el navegador bloquea la lectura de JSON local, la app usa datos internos de respaldo.

Opción recomendada:

```bash
python -m http.server 8080
```

Luego abre:

```txt
http://localhost:8080
```

## Cómo editar participantes

Edita `data/participantes.json`.

Cada participante tiene este formato:

```json
{
  "id": "daniel-galvez",
  "nombre": "Daniel Gálvez",
  "selecciones": ["Países Bajos", "México", "Egipto"]
}
```

Si agregas una selección nueva, también agrégala en `data/selecciones.json` para mostrar bandera y estatus.

## Cómo editar resultados manualmente

Edita `data/partidos.json`.

Para un partido pendiente:

```json
{
  "golesLocal": null,
  "golesVisitante": null,
  "estatus": "pendiente"
}
```

Para un partido jugado:

```json
{
  "golesLocal": 2,
  "golesVisitante": 1,
  "estatus": "finalizado",
  "goleadores": [
    {
      "jugador": "Christian Pulisic",
      "seleccion": "USA",
      "minuto": 12,
      "tipo": "regular"
    }
  ]
}
```

La tabla calcula automáticamente puntos, ganados, empatados, perdidos, goles a favor, goles en contra y diferencia de goles.

La tabla de goleo por jugador se alimenta del arreglo opcional `goleadores`. Valores recomendados para `tipo`:

- `regular`
- `penal`
- `autogol`

## Estatus de selecciones

Edita `data/selecciones.json`:

```json
{
  "nombre": "México",
  "codigoISO": "MX",
  "bandera": "🇲🇽",
  "estatus": "activa"
}
```

Valores válidos:

- `activa`
- `eliminada`
- `campeona`

La app también marca como eliminada a una selección que pierde un partido de eliminación directa registrado como finalizado.

Cuando se ejecuta `npm run sync:football-data` o el workflow de GitHub Actions, el script también intenta actualizar `data/selecciones.json` con estatus derivados de los datos reales:

- Final ganada: `campeona`.
- Derrota en eliminación directa: `eliminada`.
- Selecciones presentes en partidos reales: `activa`.
- Si football-data.org entrega standings con estatus explícito, se usa ese dato.

## Cómo conectar football-data.org

La integración recomendada usa football-data.org para actualizar `data/partidos.json`, pero mantiene la app en `dataMode: "local"`. Esto evita exponer la API key en GitHub Pages.

### Configurar en GitHub

1. Entra al repositorio en GitHub.
2. Ve a `Settings` > `Secrets and variables` > `Actions`.
3. Crea un secret llamado `FOOTBALL_DATA_TOKEN`.
4. Pega como valor tu API key de football-data.org.
5. Ve a `Actions` > `Sync football-data.org`.
6. Ejecuta `Run workflow`.

El workflow también corre automáticamente cada 30 minutos y, si football-data.org devuelve partidos, actualiza `data/partidos.json` con un commit.

### Ejecutar localmente

En PowerShell:

```powershell
$env:FOOTBALL_DATA_TOKEN="TU_API_KEY"
npm run sync:football-data
```

En macOS/Linux:

```bash
FOOTBALL_DATA_TOKEN="TU_API_KEY" npm run sync:football-data
```

Variables opcionales:

```txt
FOOTBALL_DATA_COMPETITION=WC
FOOTBALL_DATA_SEASON=2026
FOOTBALL_DATA_BASE_URL=https://api.football-data.org/v4
```

### Modo API directo

La app conserva soporte para `dataMode: "api"` si más adelante usas un proxy propio:

```json
{
  "dataMode": "api",
  "api": {
    "provider": "football-data",
    "baseUrl": "https://tu-proxy.com/worldcup/matches",
    "usesProxy": true
  }
}
```

No pongas API keys sensibles en `src/app.js`, `data/configuracion.json` ni ningún archivo público.

## Despliegue en GitHub Pages

1. Sube estos archivos a un repositorio público.
2. En GitHub, entra a `Settings` > `Pages`.
3. En `Build and deployment`, elige `Deploy from a branch`.
4. Selecciona la rama principal y la carpeta raíz.
5. Guarda y espera a que GitHub publique el sitio.

No hay proceso de build.

## Estructura de carpetas

```txt
.
├── index.html
├── README.md
├── package.json
├── scripts
│   └── sync-football-data.mjs
├── .github
│   └── workflows
│       └── sync-football-data.yml
├── data
│   ├── configuracion.json
│   ├── noticias.json
│   ├── participantes.json
│   ├── partidos.json
│   └── selecciones.json
└── src
    ├── app.js
    └── styles.css
```

## Funciones principales

La app expone estas funciones en `window` para pruebas o futuras integraciones:

- `obtenerParticipantePorSeleccion(seleccion)`
- `calcularEstadisticasSeleccion(seleccion, partidos)`
- `calcularTablaGeneral(participantes, partidos)`
- `ordenarTablaGeneral(criterio)`
- `filtrarEncuentros(filtros)`
- `convertirHoraACDMX(fechaUTC)`
- `detectarSeleccionEliminada(seleccion, partidos, standings)`
- `generarNoticiasAutomaticas(partidos, participantes)`
- `calcularRankingParticipantes()`

## Gráficos interactivos

Los gráficos filtran la tabla y los encuentros al hacer clic:

- Puntos por participante: filtra por participante.
- Estado de selecciones: filtra activas o eliminadas.
- Goles a favor: filtra por selección.
- Selecciones vivas: filtra por participante.

Usa `Quitar filtro` para volver a ver todo.

## Tabla de goleo

La vista `Goleo` muestra:

- Jugador.
- Selección.
- Dueño de la selección.
- Goles.
- Penales.
- Partidos en los que anotó.
- Fecha del último gol.

Si football-data.org entrega desglose de goles, el sincronizador intenta guardarlo en `data/partidos.json` como `goleadores`.

## Limitaciones conocidas

- Los fixtures incluidos son datos demo/manuales, no calendario oficial garantizado.
- Chart.js y las imágenes remotas necesitan conexión a internet.
- Algunas APIs deportivas requieren llave y no deben consumirse directo desde frontend público.
- football-data.org puede no devolver partidos de 2026 hasta que su cobertura del Mundial esté activa en tu plan.
- La detección de eliminación por fase de grupos depende de estatus manual o datos de standings externos.

## Próximas mejoras

- Sincronizar resultados con una API mediante GitHub Actions.
- Agregar tabla de grupos.
- Agregar historial por jornada.
- Exportar tabla a CSV.
- Añadir modo oscuro.
