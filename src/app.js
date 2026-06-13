const CONFIG = {
  dataMode: "local",
  timezone: "America/Mexico_City",
  language: "es-MX"
};

const STATUS_LABELS = {
  activa: "Activa",
  eliminada: "Eliminada",
  campeona: "Campeona"
};

const STATUS_ORDER = {
  campeona: 0,
  activa: 1,
  eliminada: 2
};

const ROUND_ORDER = [
  "Ronda de 32",
  "Octavos de final",
  "Cuartos de final",
  "Semifinales",
  "Tercer lugar",
  "Final"
];

const FOOTBALL_DATA_STAGE_LABELS = {
  GROUP_STAGE: "Fase de grupos",
  LAST_32: "Ronda de 32",
  LAST_16: "Octavos de final",
  QUARTER_FINALS: "Cuartos de final",
  SEMI_FINALS: "Semifinales",
  THIRD_PLACE: "Tercer lugar",
  FINAL: "Final"
};

const FOOTBALL_DATA_STATUS_LABELS = {
  FINISHED: "finalizado",
  AWARDED: "finalizado",
  SCHEDULED: "pendiente",
  TIMED: "pendiente",
  IN_PLAY: "en vivo",
  PAUSED: "en vivo",
  EXTRA_TIME: "en vivo",
  PENALTY_SHOOTOUT: "en vivo",
  SUSPENDED: "pendiente",
  POSTPONED: "pendiente",
  CANCELLED: "cancelado"
};

const FOOTBALL_DATA_TEAM_NAMES = {
  Algeria: "Argelia",
  Argentina: "Argentina",
  Australia: "Australia",
  Austria: "Austria",
  Bosnia: "Bosnia-Herzegovina",
  "Bosnia and Herzegovina": "Bosnia-Herzegovina",
  Brazil: "Brasil",
  Canada: "Canadá",
  "Cape Verde": "Cabo Verde",
  "Cape Verde Islands": "Cabo Verde",
  Colombia: "Colombia",
  Congo: "Congo",
  Croatia: "Croacia",
  Curacao: "Curazao",
  Curaçao: "Curazao",
  Czechia: "Chequia",
  Ecuador: "Ecuador",
  Egypt: "Egipto",
  England: "Inglaterra",
  France: "Francia",
  Germany: "Alemania",
  Ghana: "Ghana",
  Iran: "Irán",
  "IR Iran": "Irán",
  Japan: "Japón",
  Jordan: "Jordania",
  Mexico: "México",
  Morocco: "Marruecos",
  Netherlands: "Países Bajos",
  "New Zealand": "Nueva Zelanda",
  Norway: "Noruega",
  Panama: "Panamá",
  Paraguay: "Paraguay",
  Portugal: "Portugal",
  Qatar: "Qatar",
  "Saudi Arabia": "Arabia Saudita",
  Scotland: "Escocia",
  Senegal: "Senegal",
  "South Africa": "Sudáfrica",
  "Korea Republic": "Corea del Sur",
  "South Korea": "Corea del Sur",
  Spain: "España",
  Sweden: "Suecia",
  Switzerland: "Suiza",
  Turkey: "Turquía",
  Türkiye: "Turquía",
  Turkiye: "Turquía",
  Uruguay: "Uruguay",
  USA: "USA",
  "United States": "USA",
  Uzbekistan: "Uzbekistán"
};

const DEFAULT_NEWS_IMAGE =
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80";

const FALLBACK_DATA = {
  participantes: [
    {
      id: "daniel-galvez",
      nombre: "Daniel Gálvez",
      selecciones: ["Países Bajos", "México", "Egipto", "Turquía", "Panamá", "Senegal"]
    },
    {
      id: "gabriel",
      nombre: "Gabriel",
      selecciones: ["España", "Marruecos", "Colombia", "Japón", "Jordania", "Sudáfrica"]
    },
    {
      id: "alfredo",
      nombre: "Alfredo",
      selecciones: ["Portugal", "Noruega", "Suiza", "Austria", "Corea del Sur", "Arabia Saudita"]
    },
    {
      id: "alex",
      nombre: "Alex",
      selecciones: ["Argentina", "Uruguay", "Escocia", "Uzbekistán", "Bosnia-Herzegovina", "Qatar"]
    },
    {
      id: "jesus",
      nombre: "Jesús",
      selecciones: ["Alemania", "Ecuador", "Curazao", "Canadá", "Cabo Verde", "Paraguay"]
    },
    {
      id: "tony",
      nombre: "Tony",
      selecciones: ["Brasil", "Ghana", "Congo", "Irán", "Croacia", "Argelia"]
    },
    {
      id: "daniel-marquez",
      nombre: "Daniel Márquez",
      selecciones: ["Inglaterra", "USA", "Nueva Zelanda", "Suecia", "Chequia", "Australia"]
    }
  ],
  selecciones: [
    ["Países Bajos", "🇳🇱"], ["México", "🇲🇽"], ["Egipto", "🇪🇬"], ["Turquía", "🇹🇷"],
    ["Panamá", "🇵🇦"], ["Senegal", "🇸🇳"], ["España", "🇪🇸"], ["Marruecos", "🇲🇦"],
    ["Colombia", "🇨🇴"], ["Japón", "🇯🇵"], ["Jordania", "🇯🇴"], ["Sudáfrica", "🇿🇦"],
    ["Portugal", "🇵🇹"], ["Noruega", "🇳🇴"], ["Suiza", "🇨🇭"], ["Austria", "🇦🇹"],
    ["Corea del Sur", "🇰🇷"], ["Arabia Saudita", "🇸🇦"], ["Argentina", "🇦🇷"], ["Uruguay", "🇺🇾"],
    ["Escocia", "🏴"], ["Uzbekistán", "🇺🇿"], ["Bosnia-Herzegovina", "🇧🇦"], ["Qatar", "🇶🇦"],
    ["Alemania", "🇩🇪"], ["Ecuador", "🇪🇨"], ["Curazao", "🇨🇼"], ["Canadá", "🇨🇦"],
    ["Cabo Verde", "🇨🇻"], ["Paraguay", "🇵🇾"], ["Brasil", "🇧🇷"], ["Ghana", "🇬🇭"],
    ["Congo", "🇨🇬"], ["Irán", "🇮🇷"], ["Croacia", "🇭🇷"], ["Argelia", "🇩🇿"],
    ["Inglaterra", "🏴"], ["USA", "🇺🇸"], ["Nueva Zelanda", "🇳🇿"], ["Suecia", "🇸🇪"],
    ["Chequia", "🇨🇿"], ["Australia", "🇦🇺"], ["Francia", "🇫🇷"], ["Italia", "🇮🇹"]
  ].map(([nombre, bandera]) => ({
    nombre,
    codigoISO: "",
    bandera,
    estatus: nombre === "Congo" ? "eliminada" : "activa"
  })),
  partidos: [
    {
      id: "match-001",
      fase: "Fase de grupos",
      grupo: "A",
      fechaUTC: "2026-06-11T19:00:00Z",
      fechaCDMX: "2026-06-11 13:00",
      local: "México",
      visitante: "Sudáfrica",
      golesLocal: 2,
      golesVisitante: 1,
      estatus: "finalizado",
      estadio: "Estadio Azteca",
      ciudad: "Ciudad de México",
      pais: "México"
    },
    {
      id: "match-002",
      fase: "Fase de grupos",
      grupo: "B",
      fechaUTC: "2026-06-12T22:00:00Z",
      fechaCDMX: "2026-06-12 16:00",
      local: "Canadá",
      visitante: "Japón",
      golesLocal: 1,
      golesVisitante: 1,
      estatus: "finalizado",
      estadio: "BMO Field",
      ciudad: "Toronto",
      pais: "Canadá"
    },
    {
      id: "match-003",
      fase: "Fase de grupos",
      grupo: "C",
      fechaUTC: "2026-06-13T02:00:00Z",
      fechaCDMX: "2026-06-12 20:00",
      local: "USA",
      visitante: "Ghana",
      golesLocal: 3,
      golesVisitante: 2,
      estatus: "finalizado",
      estadio: "SoFi Stadium",
      ciudad: "Los Ángeles",
      pais: "USA"
    },
    {
      id: "ko-001",
      fase: "Ronda de 32",
      grupo: "",
      fechaUTC: "2026-06-28T19:00:00Z",
      fechaCDMX: "2026-06-28 13:00",
      local: "Ganador Grupo A",
      visitante: "Segundo Grupo B",
      golesLocal: null,
      golesVisitante: null,
      estatus: "pendiente",
      estadio: "",
      ciudad: "",
      pais: ""
    },
    {
      id: "ko-003",
      fase: "Octavos de final",
      grupo: "",
      fechaUTC: "2026-07-04T19:00:00Z",
      fechaCDMX: "2026-07-04 13:00",
      local: "Brasil",
      visitante: "Croacia",
      golesLocal: 1,
      golesVisitante: 2,
      estatus: "finalizado",
      estadio: "",
      ciudad: "",
      pais: ""
    },
    {
      id: "ko-007",
      fase: "Final",
      grupo: "",
      fechaUTC: "2026-07-19T22:00:00Z",
      fechaCDMX: "2026-07-19 16:00",
      local: "Ganador Semifinal 1",
      visitante: "Ganador Semifinal 2",
      golesLocal: null,
      golesVisitante: null,
      estatus: "pendiente",
      estadio: "MetLife Stadium",
      ciudad: "Nueva York / Nueva Jersey",
      pais: "USA"
    }
  ],
  noticias: [],
  configuracion: CONFIG
};

const state = {
  participantes: [],
  selecciones: [],
  partidos: [],
  noticias: [],
  configuracion: CONFIG,
  tabla: [],
  sortBy: "default",
  tableSearch: "",
  scorerSearch: "",
  chartFilter: null,
  filters: {
    search: "",
    team: "",
    owner: "",
    date: "",
    status: "",
    played: "",
    phase: ""
  },
  charts: {}
};

document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
  await cargarDatos();
  poblarFiltros();
  bindEvents();
  renderAll();
}

async function cargarDatos() {
  const configuracion = await fetchJson("./data/configuracion.json", FALLBACK_DATA.configuracion);
  state.configuracion = { ...CONFIG, ...configuracion };
  Object.assign(CONFIG, state.configuracion);

  const localData = await cargarDatosLocales();
  if (state.configuracion.dataMode === "api") {
    const apiData = await cargarDatosApi(state.configuracion).catch(() => null);
    aplicarDatos(apiData || localData);
  } else {
    aplicarDatos(localData);
  }
}

async function cargarDatosLocales() {
  const [participantes, selecciones, partidos, noticias] = await Promise.all([
    fetchJson("./data/participantes.json", FALLBACK_DATA.participantes),
    fetchJson("./data/selecciones.json", FALLBACK_DATA.selecciones),
    fetchJson("./data/partidos.json", FALLBACK_DATA.partidos),
    fetchJson("./data/noticias.json", FALLBACK_DATA.noticias)
  ]);

  return { participantes, selecciones, partidos, noticias };
}

async function fetchJson(url, fallback) {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`No se pudo cargar ${url}`);
    return await response.json();
  } catch (error) {
    console.warn(`Usando datos de respaldo para ${url}.`, error);
    return clone(fallback);
  }
}

function aplicarDatos(data) {
  state.participantes = data.participantes || [];
  state.selecciones = data.selecciones || [];
  state.partidos = (data.partidos || []).sort((a, b) => new Date(a.fechaUTC) - new Date(b.fechaUTC));
  state.noticias = data.noticias || [];
  state.tabla = calcularTablaGeneral(state.participantes, state.partidos);
}

async function cargarDatosApi(config) {
  if (!config.api || !config.api.baseUrl) {
    throw new Error("No hay API configurada.");
  }

  const response = await fetch(config.api.baseUrl);
  if (!response.ok) throw new Error("La API no respondió correctamente.");
  const raw = await response.json();

  return {
    participantes: state.participantes.length ? state.participantes : FALLBACK_DATA.participantes,
    selecciones: state.selecciones.length ? state.selecciones : FALLBACK_DATA.selecciones,
    partidos: normalizarPartidosApi(raw, config.api.provider),
    noticias: state.noticias
  };
}

function normalizarPartidosApi(raw, provider = "") {
  if (provider === "football-data") return (raw.matches || []).map(normalizarPartidoFootballData);
  if (provider === "api-football") return (raw.response || []).map(normalizarPartidoApiFootball);
  return Array.isArray(raw) ? raw : [];
}

function normalizarPartidoFootballData(match) {
  return {
    id: `fd-${match.id}`,
    fase: FOOTBALL_DATA_STAGE_LABELS[match.stage] || match.stage || "Fase por definir",
    grupo: match.group ? match.group.replace("GROUP_", "") : "",
    fechaUTC: match.utcDate,
    fechaCDMX: convertirHoraACDMX(match.utcDate),
    local: normalizarNombreFootballData(match.homeTeam?.name || "Por definirse"),
    visitante: normalizarNombreFootballData(match.awayTeam?.name || "Por definirse"),
    golesLocal: match.score?.fullTime?.home ?? null,
    golesVisitante: match.score?.fullTime?.away ?? null,
    estatus: FOOTBALL_DATA_STATUS_LABELS[match.status] || "pendiente",
    estadio: match.venue || "",
    ciudad: "",
    pais: "",
    goleadores: normalizarGoleadoresFootballData(match.goals)
  };
}

function normalizarNombreFootballData(name) {
  return FOOTBALL_DATA_TEAM_NAMES[name] || name || "Por definirse";
}

function normalizarGoleadoresFootballData(goals) {
  if (!Array.isArray(goals)) return [];
  return goals
    .map((goal) => {
      const jugador = goal.scorer?.name || goal.player?.name || goal.player || goal.scorer || "";
      const seleccion = normalizarNombreFootballData(goal.team?.name || goal.team || goal.side || "");
      if (!jugador || !seleccion) return null;
      return {
        jugador,
        seleccion,
        minuto: Number.isFinite(goal.minute) ? goal.minute : null,
        tipo: goal.type === "PENALTY" || goal.penalty ? "penal" : goal.type === "OWN_GOAL" ? "autogol" : "regular"
      };
    })
    .filter(Boolean);
}

function normalizarPartidoApiFootball(item) {
  return {
    id: String(item.fixture?.id || crypto.randomUUID()),
    fase: item.league?.round || "Fase por definir",
    grupo: "",
    fechaUTC: item.fixture?.date,
    fechaCDMX: convertirHoraACDMX(item.fixture?.date),
    local: item.teams?.home?.name || "Por definirse",
    visitante: item.teams?.away?.name || "Por definirse",
    golesLocal: item.goals?.home ?? null,
    golesVisitante: item.goals?.away ?? null,
    estatus: item.fixture?.status?.short === "FT" ? "finalizado" : "pendiente",
    estadio: item.fixture?.venue?.name || "",
    ciudad: item.fixture?.venue?.city || "",
    pais: ""
  };
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  byId("sort-table").addEventListener("change", (event) => {
    state.sortBy = event.target.value;
    renderTabla();
  });

  byId("table-search").addEventListener("input", (event) => {
    state.tableSearch = event.target.value.trim().toLowerCase();
    renderTabla();
  });

  byId("scorer-search").addEventListener("input", (event) => {
    state.scorerSearch = event.target.value.trim().toLowerCase();
    renderGoleo();
  });

  const filterMap = {
    "match-search": "search",
    "filter-team": "team",
    "filter-owner": "owner",
    "filter-date": "date",
    "filter-status": "status",
    "filter-played": "played",
    "filter-phase": "phase"
  };

  Object.entries(filterMap).forEach(([id, key]) => {
    byId(id).addEventListener("input", (event) => {
      state.filters[key] = event.target.value;
      renderEncuentros();
    });
  });

  byId("clear-filters").addEventListener("click", () => {
    Object.keys(state.filters).forEach((key) => {
      state.filters[key] = "";
    });
    Object.keys(filterMap).forEach((id) => {
      byId(id).value = "";
    });
    renderEncuentros();
  });

  byId("clear-chart-filter").addEventListener("click", () => {
    state.chartFilter = null;
    renderChartFilter();
    renderTabla();
    renderEncuentros();
  });
}

function setView(view) {
  document.querySelectorAll(".view-section").forEach((section) => {
    section.classList.toggle("active", section.dataset.section === view);
  });
  document.querySelectorAll(".nav-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  window.location.hash = view;
}

function renderAll() {
  const mode = state.configuracion.dataMode === "api" ? "Modo API" : "Modo local";
  byId("data-mode-pill").textContent = `${mode} · ${state.partidos.length} partidos cargados`;
  renderDashboard();
  renderCharts();
  renderChartFilter();
  renderTabla();
  renderGoleo();
  renderEncuentros();
  renderLlaves();
  renderNoticias();

  const hashView = window.location.hash.replace("#", "");
  if (hashView && document.querySelector(`[data-section="${hashView}"]`)) {
    setView(hashView);
  }
}

function renderDashboard() {
  const ranking = calcularRankingParticipantes();
  const leader = ranking[0] || {};
  const active = state.tabla.filter((row) => row.estatus === "activa" || row.estatus === "campeona");
  const eliminated = state.tabla.filter((row) => row.estatus === "eliminada");
  const bestTeam = [...state.tabla].sort((a, b) => b.puntos - a.puntos || b.dg - a.dg)[0];
  const topScorer = [...state.tabla].sort((a, b) => b.gf - a.gf || b.puntos - a.puntos)[0];
  const possibleWinner = getPossibleWinner(ranking);

  const cards = [
    ["Participante líder", leader.nombre || "Sin datos", `${leader.puntos || 0} pts · ${leader.vivas || 0} vivas`],
    ["Selecciones activas", active.length, "Siguen con posibilidades o ya son campeonas"],
    ["Selecciones eliminadas", eliminated.length, "Marcadas manualmente o por eliminación directa"],
    ["Mejor selección", teamLabel(bestTeam), `${bestTeam?.puntos || 0} pts · DG ${signed(bestTeam?.dg || 0)}`],
    ["Más goles", teamLabel(topScorer), `${topScorer?.gf || 0} goles a favor`],
    ["Posible ganador actual", possibleWinner.nombre || "Por definirse", possibleWinner.detalle || "Depende del campeón"]
  ];

  byId("dashboard").innerHTML = cards
    .map(
      ([label, value, detail]) => `
        <article class="metric-card">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(String(value))}</strong>
          <small>${escapeHtml(detail)}</small>
        </article>
      `
    )
    .join("");
}

function renderChartFilter() {
  const bar = byId("chart-filter-bar");
  const label = byId("chart-filter-label");
  if (!state.chartFilter) {
    bar.hidden = true;
    label.textContent = "";
    return;
  }

  bar.hidden = false;
  label.textContent = `Filtro por grafico: ${state.chartFilter.label}`;
}

function applyChartFilter(filter) {
  const sameFilter =
    state.chartFilter &&
    state.chartFilter.type === filter.type &&
    state.chartFilter.value === filter.value;
  state.chartFilter = sameFilter ? null : filter;
  renderChartFilter();
  renderTabla();
  renderEncuentros();
}

function renderTabla() {
  const sorted = ordenarTablaGeneral(state.sortBy).filter((row) => {
    if (!matchesChartFilter(row)) return false;
    if (!state.tableSearch) return true;
    return `${row.seleccion} ${row.participante} ${row.estatus}`.toLowerCase().includes(state.tableSearch);
  });

  byId("tabla-body").innerHTML = sorted
    .map(
      (row) => `
        <tr>
          <td><span class="flag">${escapeHtml(row.bandera)}</span></td>
          <td><span class="team-cell"><strong>${escapeHtml(row.seleccion)}</strong></span></td>
          <td>${escapeHtml(row.participante)}</td>
          <td>${statusBadge(row.estatus)}</td>
          <td><strong>${row.puntos}</strong></td>
          <td>${row.pj}</td>
          <td>${row.pg}</td>
          <td>${row.pe}</td>
          <td>${row.pp}</td>
          <td>${row.gf}</td>
          <td>${row.gc}</td>
          <td>${signed(row.dg)}</td>
        </tr>
      `
    )
    .join("");
}

function renderGoleo() {
  const scorers = calcularTablaGoleoJugadores(state.partidos).filter((row) => {
    if (!state.scorerSearch) return true;
    return `${row.jugador} ${row.seleccion} ${row.participante}`.toLowerCase().includes(state.scorerSearch);
  });

  const body = byId("goleo-body");
  if (!scorers.length) {
    body.innerHTML = `
      <tr>
        <td colspan="8">
          <div class="empty-state">Aun no hay goleadores registrados. Se llenara cuando los partidos tengan datos de anotadores.</div>
        </td>
      </tr>
    `;
    return;
  }

  body.innerHTML = scorers
    .map(
      (row, index) => `
        <tr>
          <td><strong>${index + 1}</strong></td>
          <td><strong>${escapeHtml(row.jugador)}</strong></td>
          <td><span class="team-cell"><span class="flag">${escapeHtml(row.bandera)}</span>${escapeHtml(row.seleccion)}</span></td>
          <td>${escapeHtml(row.participante)}</td>
          <td><strong>${row.goles}</strong></td>
          <td>${row.penales}</td>
          <td>${row.partidos}</td>
          <td>${escapeHtml(row.ultimoGol)}</td>
        </tr>
      `
    )
    .join("");
}

function renderEncuentros() {
  const matches = filtrarEncuentros(state.filters).filter(matchesMatchChartFilter);
  const container = byId("matches-list");

  if (!matches.length) {
    container.innerHTML = `<div class="empty-state">No hay encuentros con esos filtros.</div>`;
    return;
  }

  container.innerHTML = matches.map(renderMatchCard).join("");
}

function renderMatchCard(match) {
  const local = getTeamContext(match.local);
  const visitante = getTeamContext(match.visitante);
  const played = isPlayed(match);
  const resultLocal = played ? resultadoPara(match, "local") : "Pendiente";
  const resultVisitante = played ? resultadoPara(match, "visitante") : "Pendiente";
  const score = played ? `${match.golesLocal} - ${match.golesVisitante}` : "vs";

  return `
    <article class="match-card">
      <div class="match-meta">
        <span class="phase-label">${escapeHtml(match.fase || "Fase por definir")}${match.grupo ? ` · Grupo ${escapeHtml(match.grupo)}` : ""}</span>
        <strong>${escapeHtml(convertirHoraACDMX(match.fechaUTC))}</strong>
        <span>${escapeHtml(match.estatus === "finalizado" ? "Finalizado" : "Pendiente")}</span>
      </div>
      <div class="scoreline">
        ${renderTeamSide(local, resultLocal, false)}
        <div class="score">${escapeHtml(score)}</div>
        ${renderTeamSide(visitante, resultVisitante, true)}
      </div>
    </article>
  `;
}

function renderTeamSide(team, result, away) {
  return `
    <div class="team-side ${away ? "away" : ""}">
      <div class="team-name"><span class="flag">${escapeHtml(team.bandera)}</span>${escapeHtml(team.nombre)}</div>
      <div class="owner-line">${escapeHtml(team.participante)}</div>
      <div>${statusBadge(team.estatus)}</div>
      <div class="result-line">${escapeHtml(result)}</div>
    </div>
  `;
}

function renderLlaves() {
  const grouped = ROUND_ORDER.map((round) => ({
    round,
    matches: state.partidos.filter((match) => match.fase === round)
  }));

  byId("bracket").innerHTML = grouped
    .map(
      ({ round, matches }) => `
        <section class="bracket-round">
          <h3>${escapeHtml(round)}</h3>
          ${matches.length ? matches.map(renderBracketMatch).join("") : renderPlaceholderMatch(round)}
        </section>
      `
    )
    .join("");
}

function renderBracketMatch(match) {
  const local = getTeamContext(match.local);
  const visitante = getTeamContext(match.visitante);
  const winner = getWinner(match);
  const loser = getLoser(match);

  return `
    <article class="bracket-match">
      <div class="bracket-date">${escapeHtml(convertirHoraACDMX(match.fechaUTC))}</div>
      ${renderBracketTeam(local, match.golesLocal, winner === match.local, loser === match.local)}
      ${renderBracketTeam(visitante, match.golesVisitante, winner === match.visitante, loser === match.visitante)}
    </article>
  `;
}

function renderPlaceholderMatch(round) {
  return `
    <article class="bracket-match">
      <div class="bracket-date">Por definirse</div>
      ${renderBracketTeam(getTeamContext(round === "Final" ? "Ganador Semifinal 1" : "Por definirse"), null, false, false)}
      ${renderBracketTeam(getTeamContext(round === "Final" ? "Ganador Semifinal 2" : "Por definirse"), null, false, false)}
    </article>
  `;
}

function renderBracketTeam(team, goals, winner, eliminated) {
  return `
    <div class="bracket-team ${winner ? "winner" : ""} ${eliminated ? "eliminated" : ""}">
      <span>
        <span class="flag">${escapeHtml(team.bandera)}</span>
        ${escapeHtml(team.nombre)} ${eliminated ? "💀" : ""}
        <span class="bracket-owner">${escapeHtml(team.participante)}</span>
      </span>
      <strong>${goals ?? "-"}</strong>
    </div>
  `;
}

function renderNoticias() {
  const noticias = [...state.noticias, ...generarNoticiasAutomaticas(state.partidos, state.participantes)]
    .sort((a, b) => new Date(b.fechaUTC) - new Date(a.fechaUTC))
    .slice(0, 12);

  byId("news-grid").innerHTML = noticias
    .map((item) => {
      const participantes = getParticipantesAfectados(item.selecciones || []);
      const contenido = item.contenido || construirContenidoNoticia(item);
      return `
        <article class="news-card">
          <img src="${escapeAttribute(item.imagen || DEFAULT_NEWS_IMAGE)}" alt="" loading="lazy" />
          <div class="news-body">
            <div class="news-meta">
              <span>${escapeHtml(convertirHoraACDMX(item.fechaUTC))}</span>
              <span>${escapeHtml(item.fuente || "Quiniela")}</span>
            </div>
            <h3>${escapeHtml(item.titulo)}</h3>
            <p>${escapeHtml(item.resumen)}</p>
            <p class="news-content">${escapeHtml(contenido)}</p>
            <div class="tags">
              ${(item.selecciones || []).map((team) => `<span class="tag">${escapeHtml(team)}</span>`).join("")}
              ${participantes.map((name) => `<span class="tag">${escapeHtml(name)}</span>`).join("")}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function construirContenidoNoticia(item) {
  const equipos = (item.selecciones || []).join(" y ") || "las selecciones involucradas";
  const participantes = getParticipantesAfectados(item.selecciones || []);
  const afectados = participantes.length ? ` Participantes afectados: ${participantes.join(", ")}.` : "";
  return `Esta noticia se genera con los datos disponibles de la quiniela para dar contexto sobre ${equipos}.${afectados} Revisa la tabla general y los encuentros para ver como cambia el ranking.`;
}

function renderCharts() {
  if (!window.Chart) {
    document.querySelectorAll(".chart-card").forEach((card) => {
      if (!card.querySelector(".empty-state")) {
        card.insertAdjacentHTML("beforeend", `<div class="empty-state">Los gráficos cargan cuando Chart.js está disponible.</div>`);
      }
    });
    return;
  }

  const ranking = calcularRankingParticipantes();
  const activeCount = state.tabla.filter((row) => row.estatus === "activa" || row.estatus === "campeona").length;
  const eliminatedCount = state.tabla.filter((row) => row.estatus === "eliminada").length;
  const topGoals = [...state.tabla].sort((a, b) => b.gf - a.gf).slice(0, 8);

  makeChart("pointsChart", {
    type: "bar",
    data: {
      labels: ranking.map((row) => row.nombre),
      datasets: [
        {
          label: "Puntos",
          data: ranking.map((row) => row.puntos),
          backgroundColor: chartGradient("pointsChart", "#0d5fff", "#00a878"),
          borderRadius: 12,
          borderSkipped: false,
          hoverBackgroundColor: "#073fba"
        }
      ]
    },
    options: barOptions((index) => {
      const item = ranking[index];
      if (item) applyChartFilter({ type: "participante", value: item.nombre, label: `participante ${item.nombre}` });
    })
  });

  makeChart("statusChart", {
    type: "doughnut",
    data: {
      labels: ["Activas", "Eliminadas"],
      datasets: [
        {
          data: [activeCount, eliminatedCount],
          backgroundColor: ["#00a878", "#d94848"],
          borderColor: "#ffffff",
          borderWidth: 5,
          hoverOffset: 12,
          spacing: 4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: modernPlugins(true),
      cutout: "62%",
      onClick: (event, elements) => {
        const index = elements[0]?.index;
        if (index === 0) applyChartFilter({ type: "estatus", value: "vivas", label: "selecciones activas" });
        if (index === 1) applyChartFilter({ type: "estatus", value: "eliminada", label: "selecciones eliminadas" });
      }
    }
  });

  makeChart("goalsChart", {
    type: "bar",
    data: {
      labels: topGoals.map((row) => row.seleccion),
      datasets: [
        {
          label: "GF",
          data: topGoals.map((row) => row.gf),
          backgroundColor: chartGradient("goalsChart", "#f59e0b", "#ef4444"),
          borderRadius: 12,
          borderSkipped: false,
          hoverBackgroundColor: "#c2410c"
        }
      ]
    },
    options: barOptions((index) => {
      const item = topGoals[index];
      if (item) applyChartFilter({ type: "seleccion", value: item.seleccion, label: `seleccion ${item.seleccion}` });
    })
  });

  makeChart("aliveChart", {
    type: "bar",
    data: {
      labels: ranking.map((row) => row.nombre),
      datasets: [
        {
          label: "Vivas",
          data: ranking.map((row) => row.vivas),
          backgroundColor: chartGradient("aliveChart", "#00a878", "#22c55e"),
          borderRadius: 12,
          borderSkipped: false,
          hoverBackgroundColor: "#08775a"
        }
      ]
    },
    options: barOptions((index) => {
      const item = ranking[index];
      if (item) applyChartFilter({ type: "participante", value: item.nombre, label: `participante ${item.nombre}` });
    })
  });
}

function makeChart(id, config) {
  if (state.charts[id]) state.charts[id].destroy();
  state.charts[id] = new Chart(byId(id), config);
}

function chartGradient(id, start, end) {
  const canvas = byId(id);
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height || 220);
  gradient.addColorStop(0, start);
  gradient.addColorStop(1, end);
  return gradient;
}

function modernPlugins(showLegend = false) {
  return {
    legend: {
      display: showLegend,
      position: "bottom",
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
        color: "#3c4659",
        font: { family: "Montserrat", weight: "700" }
      }
    },
    tooltip: {
      backgroundColor: "#172033",
      borderColor: "rgba(255,255,255,0.12)",
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false,
      padding: 12,
      titleFont: { family: "Montserrat", weight: "800" },
      bodyFont: { family: "Montserrat", weight: "600" }
    }
  };
}

function barOptions(onBarClick) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: modernPlugins(false),
    onClick: (event, elements) => {
      const index = elements[0]?.index;
      if (index !== undefined && onBarClick) onBarClick(index);
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#68738a",
          font: { family: "Montserrat", weight: "700" },
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: { color: "rgba(104, 115, 138, 0.14)" },
        ticks: {
          color: "#68738a",
          font: { family: "Montserrat", weight: "700" },
          precision: 0
        }
      }
    }
  };
}

function poblarFiltros() {
  fillSelect("filter-team", unique(state.partidos.flatMap((match) => [match.local, match.visitante])).sort());
  fillSelect("filter-owner", state.participantes.map((participante) => participante.nombre).sort());
  fillSelect("filter-phase", unique(state.partidos.map((match) => match.fase)).sort());
}

function fillSelect(id, values) {
  const select = byId(id);
  const first = select.querySelector("option");
  select.innerHTML = "";
  select.appendChild(first);
  values.forEach((value) => {
    if (!value) return;
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function obtenerParticipantePorSeleccion(seleccion) {
  const participante = state.participantes.find((item) => item.selecciones.includes(seleccion));
  return participante || null;
}

function calcularEstadisticasSeleccion(seleccion, partidos) {
  const stats = { puntos: 0, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0 };

  partidos.forEach((match) => {
    if (!isPlayed(match)) return;
    const isLocal = match.local === seleccion;
    const isAway = match.visitante === seleccion;
    if (!isLocal && !isAway) return;

    const gf = isLocal ? match.golesLocal : match.golesVisitante;
    const gc = isLocal ? match.golesVisitante : match.golesLocal;

    stats.pj += 1;
    stats.gf += Number(gf);
    stats.gc += Number(gc);

    if (gf > gc) {
      stats.pg += 1;
      stats.puntos += 3;
    } else if (gf === gc) {
      stats.pe += 1;
      stats.puntos += 1;
    } else {
      stats.pp += 1;
    }
  });

  stats.dg = stats.gf - stats.gc;
  return stats;
}

function calcularTablaGeneral(participantes, partidos) {
  return participantes
    .flatMap((participante) =>
      participante.selecciones.map((seleccion) => {
        const stats = calcularEstadisticasSeleccion(seleccion, partidos);
        const info = getSeleccionInfo(seleccion);
        return {
          seleccion,
          participante: participante.nombre,
          bandera: info.bandera,
          estatus: detectarSeleccionEliminada(seleccion, partidos, null),
          ...stats
        };
      })
    )
    .sort(defaultTableSort);
}

function ordenarTablaGeneral(criterio) {
  const rows = [...state.tabla];
  const sorters = {
    seleccion: (a, b) => a.seleccion.localeCompare(b.seleccion, "es-MX"),
    participante: (a, b) => a.participante.localeCompare(b.participante, "es-MX") || defaultTableSort(a, b),
    estatus: (a, b) => STATUS_ORDER[a.estatus] - STATUS_ORDER[b.estatus] || defaultTableSort(a, b),
    puntos: (a, b) => b.puntos - a.puntos || defaultTableSort(a, b),
    pg: (a, b) => b.pg - a.pg || defaultTableSort(a, b),
    gf: (a, b) => b.gf - a.gf || defaultTableSort(a, b),
    dg: (a, b) => b.dg - a.dg || defaultTableSort(a, b),
    default: defaultTableSort
  };

  return rows.sort(sorters[criterio] || sorters.default);
}

function filtrarEncuentros(filtros) {
  return state.partidos.filter((match) => {
    const local = getTeamContext(match.local);
    const visitante = getTeamContext(match.visitante);
    const hayEquipo = !filtros.team || match.local === filtros.team || match.visitante === filtros.team;
    const hayOwner = !filtros.owner || local.participante === filtros.owner || visitante.participante === filtros.owner;
    const hayFecha = !filtros.date || getCdmxDateInput(match.fechaUTC) === filtros.date;
    const hayEstatus = !filtros.status || local.estatus === filtros.status || visitante.estatus === filtros.status;
    const hayJugado =
      !filtros.played ||
      (filtros.played === "jugado" && isPlayed(match)) ||
      (filtros.played === "pendiente" && !isPlayed(match));
    const hayFase = !filtros.phase || match.fase === filtros.phase;
    const text = `${match.local} ${match.visitante} ${match.fase} ${match.grupo} ${local.participante} ${visitante.participante}`.toLowerCase();
    const hayTexto = !filtros.search || text.includes(filtros.search.toLowerCase());

    return hayEquipo && hayOwner && hayFecha && hayEstatus && hayJugado && hayFase && hayTexto;
  });
}

function matchesChartFilter(row) {
  if (!state.chartFilter) return true;
  if (state.chartFilter.type === "participante") return row.participante === state.chartFilter.value;
  if (state.chartFilter.type === "seleccion") return row.seleccion === state.chartFilter.value;
  if (state.chartFilter.type === "estatus") {
    if (state.chartFilter.value === "vivas") return row.estatus === "activa" || row.estatus === "campeona";
    return row.estatus === state.chartFilter.value;
  }
  return true;
}

function matchesMatchChartFilter(match) {
  if (!state.chartFilter) return true;
  const local = getTeamContext(match.local);
  const visitante = getTeamContext(match.visitante);
  if (state.chartFilter.type === "participante") {
    return local.participante === state.chartFilter.value || visitante.participante === state.chartFilter.value;
  }
  if (state.chartFilter.type === "seleccion") {
    return match.local === state.chartFilter.value || match.visitante === state.chartFilter.value;
  }
  if (state.chartFilter.type === "estatus") {
    if (state.chartFilter.value === "vivas") {
      return [local.estatus, visitante.estatus].some((status) => status === "activa" || status === "campeona");
    }
    return local.estatus === state.chartFilter.value || visitante.estatus === state.chartFilter.value;
  }
  return true;
}

function convertirHoraACDMX(fechaUTC) {
  if (!fechaUTC) return "Por definir";
  const date = new Date(fechaUTC);
  if (Number.isNaN(date.getTime())) return "Por definir";
  return new Intl.DateTimeFormat(CONFIG.language, {
    timeZone: CONFIG.timezone,
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function detectarSeleccionEliminada(seleccion, partidos, standings) {
  const info = getSeleccionInfo(seleccion);
  if (standings?.[seleccion]?.estatus) return standings[seleccion].estatus;

  const wonFinal = partidos.some((match) => match.fase === "Final" && isPlayed(match) && getWinner(match) === seleccion);
  const lostKnockout = partidos.some((match) => {
    if (!isKnockout(match.fase) || !isPlayed(match)) return false;
    return getLoser(match) === seleccion;
  });

  if (wonFinal) return "campeona";
  if (lostKnockout) return "eliminada";
  if (info.estatus === "campeona") return "campeona";
  if (info.estatus === "eliminada") return "eliminada";

  return "activa";
}

function generarNoticiasAutomaticas(partidos, participantes) {
  const noticias = [];

  partidos
    .filter(isPlayed)
    .slice(-8)
    .forEach((match) => {
      const winner = getWinner(match);
      const loser = getLoser(match);
      const involved = [match.local, match.visitante];
      if (winner) {
        const owner = obtenerParticipantePorSeleccion(winner)?.nombre || "Sin dueño";
        noticias.push({
          id: `auto-${match.id}-winner`,
          titulo: `${winner} suma 3 puntos tras vencer a ${loser}`,
          resumen: `${owner} recibe buenas noticias en la quiniela. El marcador terminó ${match.golesLocal}-${match.golesVisitante}.`,
          contenido: `El resultado mejora el puntaje de ${winner}, aumenta sus partidos ganados y puede mover a ${owner} en el ranking de participantes. ${loser} conserva su lugar en la tabla si sigue con posibilidades, pero carga con una derrota que afecta su diferencia de goles.`,
          fechaUTC: match.fechaUTC,
          fuente: "Generada por la quiniela",
          imagen: DEFAULT_NEWS_IMAGE,
          selecciones: involved
        });
      } else {
        noticias.push({
          id: `auto-${match.id}-draw`,
          titulo: `${match.local} y ${match.visitante} reparten puntos`,
          resumen: `El empate suma una unidad para cada selección asignada o deja el resultado registrado si no tienen dueño.`,
          contenido: `La igualdad mantiene abiertas las posibilidades de ambas selecciones y reparte puntos entre sus participantes. En la tabla general, el impacto principal se nota en partidos jugados, empates, goles a favor, goles en contra y diferencia de goles.`,
          fechaUTC: match.fechaUTC,
          fuente: "Generada por la quiniela",
          imagen: DEFAULT_NEWS_IMAGE,
          selecciones: involved
        });
      }

      if (isKnockout(match.fase) && loser) {
        const owner = obtenerParticipantePorSeleccion(loser)?.nombre || "Sin dueño";
        noticias.push({
          id: `auto-${match.id}-eliminated`,
          titulo: `${loser} queda eliminado ${owner !== "Sin dueño" ? `y afecta a ${owner}` : ""}`,
          resumen: `La derrota en ${match.fase} marca a ${loser} con 💀 en la quiniela.`,
          contenido: `Al tratarse de una fase de eliminación directa, ${loser} pierde sus posibilidades de campeonato y deja de contar como selección viva. Si ${owner} tenía pocas selecciones activas, este resultado puede cambiar de forma importante su panorama en la quiniela.`,
          fechaUTC: match.fechaUTC,
          fuente: "Generada por la quiniela",
          imagen: DEFAULT_NEWS_IMAGE,
          selecciones: involved
        });
      }
    });

  partidos
    .filter((match) => !isPlayed(match))
    .slice(0, 6)
    .forEach((match) => {
      noticias.push({
        id: `auto-${match.id}-next`,
        titulo: `${match.local} jugará contra ${match.visitante}`,
        resumen: `Próximo partido de ${match.fase}. Revisa qué participantes tienen selecciones involucradas.`,
        contenido: `Este encuentro puede mover puntos, goles y posiciones en cuanto se capture el marcador final o llegue la actualización desde football-data.org. Las selecciones involucradas aparecen con su dueño actual para que sea fácil ver a quién le conviene cada resultado.`,
        fechaUTC: match.fechaUTC,
        fuente: "Calendario de la quiniela",
        imagen: DEFAULT_NEWS_IMAGE,
        selecciones: [match.local, match.visitante]
      });
    });

  return noticias;
}

function calcularRankingParticipantes() {
  return state.participantes
    .map((participante) => {
      const rows = state.tabla.filter((row) => row.participante === participante.nombre);
      return {
        nombre: participante.nombre,
        puntos: rows.reduce((total, row) => total + row.puntos, 0),
        gf: rows.reduce((total, row) => total + row.gf, 0),
        dg: rows.reduce((total, row) => total + row.dg, 0),
        vivas: rows.filter((row) => row.estatus === "activa" || row.estatus === "campeona").length,
        eliminadas: rows.filter((row) => row.estatus === "eliminada").length
      };
    })
    .sort((a, b) => b.vivas - a.vivas || b.puntos - a.puntos || b.dg - a.dg || b.gf - a.gf);
}

function calcularTablaGoleoJugadores(partidos) {
  const scorers = new Map();

  partidos.forEach((match) => {
    (match.goleadores || []).forEach((goal) => {
      if (!goal.jugador || !goal.seleccion || goal.tipo === "autogol") return;
      const key = `${goal.jugador}__${goal.seleccion}`;
      const current = scorers.get(key) || {
        jugador: goal.jugador,
        seleccion: goal.seleccion,
        participante: obtenerParticipantePorSeleccion(goal.seleccion)?.nombre || "Sin dueño",
        bandera: getSeleccionInfo(goal.seleccion).bandera,
        goles: 0,
        penales: 0,
        partidosSet: new Set(),
        ultimoGolUTC: match.fechaUTC,
        ultimoGol: convertirHoraACDMX(match.fechaUTC)
      };

      current.goles += 1;
      if (goal.tipo === "penal") current.penales += 1;
      current.partidosSet.add(match.id);

      if (new Date(match.fechaUTC) >= new Date(current.ultimoGolUTC)) {
        current.ultimoGolUTC = match.fechaUTC;
        current.ultimoGol = convertirHoraACDMX(match.fechaUTC);
      }

      scorers.set(key, current);
    });
  });

  return [...scorers.values()]
    .map((row) => ({
      ...row,
      partidos: row.partidosSet.size
    }))
    .sort(
      (a, b) =>
        b.goles - a.goles ||
        b.penales - a.penales ||
        new Date(b.ultimoGolUTC) - new Date(a.ultimoGolUTC) ||
        a.jugador.localeCompare(b.jugador, "es-MX")
    );
}

function defaultTableSort(a, b) {
  return (
    STATUS_ORDER[a.estatus] - STATUS_ORDER[b.estatus] ||
    b.puntos - a.puntos ||
    b.dg - a.dg ||
    b.gf - a.gf ||
    a.seleccion.localeCompare(b.seleccion, "es-MX")
  );
}

function getSeleccionInfo(nombre) {
  const info = state.selecciones.find((seleccion) => seleccion.nombre === nombre);
  if (info) {
    return {
      ...info,
      bandera: info.bandera || flagEmojiFromCode(info.codigoISO)
    };
  }

  return {
    nombre,
    codigoISO: "",
    bandera: isPlaceholderTeam(nombre) ? "▫️" : "🏳️",
    estatus: "activa"
  };
}

function flagEmojiFromCode(code) {
  if (code === "GB-ENG") return "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}";
  if (code === "GB-SCT") return "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}";
  if (!/^[A-Z]{2}$/.test(code || "")) return "🏳️";
  return [...code].map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0))).join("");
}

function getTeamContext(nombre) {
  const info = getSeleccionInfo(nombre);
  const participante = obtenerParticipantePorSeleccion(nombre);
  return {
    nombre,
    bandera: info.bandera,
    participante: participante?.nombre || "Sin dueño",
    estatus: detectarSeleccionEliminada(nombre, state.partidos, null)
  };
}

function getWinner(match) {
  if (!isPlayed(match) || match.golesLocal === match.golesVisitante) return null;
  return match.golesLocal > match.golesVisitante ? match.local : match.visitante;
}

function getLoser(match) {
  if (!isPlayed(match) || match.golesLocal === match.golesVisitante) return null;
  return match.golesLocal < match.golesVisitante ? match.local : match.visitante;
}

function resultadoPara(match, side) {
  if (!isPlayed(match)) return "Pendiente";
  const own = side === "local" ? match.golesLocal : match.golesVisitante;
  const rival = side === "local" ? match.golesVisitante : match.golesLocal;
  if (own > rival) return "Ganó";
  if (own < rival) return "Perdió";
  return "Empató";
}

function isPlayed(match) {
  return match.golesLocal !== null && match.golesVisitante !== null;
}

function isKnockout(fase) {
  return ROUND_ORDER.includes(fase);
}

function isPlaceholderTeam(nombre) {
  return /por definirse|ganador|perdedor|segundo/i.test(nombre || "");
}

function getCdmxDateInput(fechaUTC) {
  if (!fechaUTC) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CONFIG.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date(fechaUTC));

  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

function getParticipantesAfectados(selecciones) {
  return unique(
    selecciones
      .map((seleccion) => obtenerParticipantePorSeleccion(seleccion)?.nombre)
      .filter(Boolean)
  );
}

function getPossibleWinner(ranking) {
  const champion = state.tabla.find((row) => row.estatus === "campeona");
  if (champion) {
    return { nombre: champion.participante, detalle: `${champion.seleccion} es campeona` };
  }

  const candidate = ranking.find((row) => row.vivas > 0);
  return candidate
    ? { nombre: candidate.nombre, detalle: `${candidate.vivas} selecciones vivas` }
    : { nombre: "Sin selecciones activas", detalle: "Actualiza estatus cuando avance el torneo" };
}

function teamLabel(row) {
  return row ? `${row.bandera} ${row.seleccion}` : "Sin datos";
}

function statusBadge(status) {
  const icon = status === "eliminada" ? "💀" : status === "campeona" ? "🏆" : "";
  return `<span class="badge ${escapeAttribute(status)}">${icon} ${escapeHtml(STATUS_LABELS[status] || status)}</span>`;
}

function signed(value) {
  return value > 0 ? `+${value}` : String(value);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function byId(id) {
  return document.getElementById(id);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

Object.assign(window, {
  CONFIG,
  obtenerParticipantePorSeleccion,
  calcularEstadisticasSeleccion,
  calcularTablaGeneral,
  ordenarTablaGeneral,
  filtrarEncuentros,
  convertirHoraACDMX,
  detectarSeleccionEliminada,
  generarNoticiasAutomaticas,
  calcularRankingParticipantes,
  calcularTablaGoleoJugadores
});
