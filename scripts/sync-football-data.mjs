import { readFile, writeFile } from "node:fs/promises";

const TOKEN = process.env.FOOTBALL_DATA_TOKEN;
const API_BASE = process.env.FOOTBALL_DATA_BASE_URL || "https://api.football-data.org/v4";
const COMPETITION = process.env.FOOTBALL_DATA_COMPETITION || "WC";
const SEASON = process.env.FOOTBALL_DATA_SEASON || "2026";
const OUTPUT_FILE = new URL("../data/partidos.json", import.meta.url);
const SELECCIONES_FILE = new URL("../data/selecciones.json", import.meta.url);

const STAGE_LABELS = {
  GROUP_STAGE: "Fase de grupos",
  LAST_32: "Ronda de 32",
  LAST_16: "Octavos de final",
  QUARTER_FINALS: "Cuartos de final",
  SEMI_FINALS: "Semifinales",
  THIRD_PLACE: "Tercer lugar",
  FINAL: "Final"
};

const STATUS_LABELS = {
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

const TEAM_NAME_MAP = {
  Algeria: "Argelia",
  Argentina: "Argentina",
  Australia: "Australia",
  Austria: "Austria",
  Bosnia: "Bosnia-Herzegovina",
  "Bosnia and Herzegovina": "Bosnia-Herzegovina",
  Brazil: "Brasil",
  Canada: "Canadá",
  "Cape Verde Islands": "Cabo Verde",
  "Cape Verde": "Cabo Verde",
  Colombia: "Colombia",
  Congo: "Congo",
  "Congo DR": "Congo",
  "DR Congo": "Congo",
  Croatia: "Croacia",
  Curaçao: "Curazao",
  Curacao: "Curazao",
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

const TEAM_ISO_MAP = {
  Alemania: "DE",
  Arabia: "SA",
  "Arabia Saudita": "SA",
  Argelia: "DZ",
  Argentina: "AR",
  Australia: "AU",
  Austria: "AT",
  Belgica: "BE",
  Bélgica: "BE",
  Bosnia: "BA",
  "Bosnia-Herzegovina": "BA",
  Brasil: "BR",
  "Cabo Verde": "CV",
  Canada: "CA",
  Canadá: "CA",
  Chequia: "CZ",
  Chile: "CL",
  Colombia: "CO",
  Congo: "CD",
  "Corea del Sur": "KR",
  Croacia: "HR",
  Curazao: "CW",
  Ecuador: "EC",
  Egipto: "EG",
  Escocia: "GB-SCT",
  España: "ES",
  Francia: "FR",
  Ghana: "GH",
  Inglaterra: "GB-ENG",
  Iran: "IR",
  Irán: "IR",
  Italia: "IT",
  Japon: "JP",
  Japón: "JP",
  Jordania: "JO",
  Marruecos: "MA",
  Mexico: "MX",
  México: "MX",
  Noruega: "NO",
  "Nueva Zelanda": "NZ",
  "Países Bajos": "NL",
  Panamá: "PA",
  Paraguay: "PY",
  Portugal: "PT",
  Qatar: "QA",
  Senegal: "SN",
  Sudafrica: "ZA",
  Sudáfrica: "ZA",
  Suecia: "SE",
  Suiza: "CH",
  Turquia: "TR",
  Turquía: "TR",
  Uruguay: "UY",
  USA: "US",
  Uzbekistan: "UZ",
  Uzbekistán: "UZ"
};

if (!TOKEN) {
  console.error("Falta FOOTBALL_DATA_TOKEN. Configura la variable de entorno o el secret de GitHub Actions.");
  process.exit(1);
}

const authHeaders = {
  "X-Auth-Token": TOKEN,
  "X-Unfold-Goals": "true"
};
const url = `${API_BASE}/competitions/${COMPETITION}/matches?season=${SEASON}`;
const response = await fetch(url, { headers: authHeaders });

if (!response.ok) {
  const body = await response.text();
  throw new Error(`football-data.org respondió ${response.status}: ${body}`);
}

const payload = await response.json();
const matches = Array.isArray(payload.matches) ? payload.matches : [];

if (!matches.length) {
  console.warn("football-data.org no devolvió partidos. Se conserva data/partidos.json sin cambios.");
  process.exit(0);
}

const currentMatches = await readExistingMatches();
const currentById = new Map(currentMatches.map((match) => [String(match.id), match]));
const normalized = matches.map((match) => {
  const id = `fd-${match.id}`;
  const existing = currentById.get(id) || {};
  return {
    id,
    fase: stageLabel(match.stage),
    grupo: groupLabel(match.group),
    fechaUTC: match.utcDate || existing.fechaUTC || "",
    fechaCDMX: existing.fechaCDMX || "",
    local: teamName(match.homeTeam?.name || existing.local || "Por definirse"),
    visitante: teamName(match.awayTeam?.name || existing.visitante || "Por definirse"),
    golesLocal: scoreValue(match.score?.fullTime?.home),
    golesVisitante: scoreValue(match.score?.fullTime?.away),
    estatus: STATUS_LABELS[match.status] || existing.estatus || "pendiente",
    estadio: existing.estadio || match.venue || "",
    ciudad: existing.ciudad || "",
    pais: existing.pais || "",
    goleadores: normalizeGoals(match.goals, existing.goleadores)
  };
});

normalized.sort((a, b) => new Date(a.fechaUTC) - new Date(b.fechaUTC));
await writeFile(OUTPUT_FILE, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
await updateTeamStatuses(normalized, await fetchStandings(authHeaders));

console.log(`Sincronizados ${normalized.length} partidos desde football-data.org.`);

async function readExistingMatches() {
  try {
    return JSON.parse(await readFile(OUTPUT_FILE, "utf8"));
  } catch {
    return [];
  }
}

function teamName(name) {
  return TEAM_NAME_MAP[name] || name || "Por definirse";
}

function stageLabel(stage) {
  return STAGE_LABELS[stage] || stage || "Fase por definir";
}

function groupLabel(group) {
  return group ? group.replace("GROUP_", "") : "";
}

function scoreValue(value) {
  return Number.isFinite(value) ? value : null;
}

function normalizeGoals(goals, fallback = []) {
  if (!Array.isArray(goals) || !goals.length) return Array.isArray(fallback) ? fallback : [];

  return goals
    .map((goal) => {
      const jugador = goal.scorer?.name || goal.player?.name || goal.player || goal.scorer || "";
      const seleccion = teamName(goal.team?.name || goal.team || goal.side || "");
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

async function fetchStandings(headers) {
  const standingsUrl = `${API_BASE}/competitions/${COMPETITION}/standings?season=${SEASON}`;
  try {
    const standingsResponse = await fetch(standingsUrl, { headers });
    if (!standingsResponse.ok) return [];
    const payload = await standingsResponse.json();
    return Array.isArray(payload.standings) ? payload.standings : [];
  } catch {
    return [];
  }
}

async function updateTeamStatuses(partidos, standings) {
  let selecciones;
  try {
    selecciones = JSON.parse(await readFile(SELECCIONES_FILE, "utf8"));
  } catch {
    return;
  }

  const statusByTeam = buildStatusMap(partidos, standings);
  const existingNames = new Set(selecciones.map((seleccion) => seleccion.nombre));
  const updated = selecciones.map((seleccion) => {
    const nextStatus = statusByTeam.get(seleccion.nombre);
    return nextStatus ? { ...seleccion, estatus: nextStatus } : seleccion;
  });

  statusByTeam.forEach((estatus, nombre) => {
    if (existingNames.has(nombre)) return;
    const codigoISO = TEAM_ISO_MAP[nombre] || "";
    updated.push({
      nombre,
      codigoISO,
      bandera: flagEmoji(codigoISO),
      estatus
    });
  });

  await writeFile(SELECCIONES_FILE, `${JSON.stringify(updated, null, 2)}\n`, "utf8");
}

function buildStatusMap(partidos, standings) {
  const statusByTeam = new Map();
  partidos.forEach((match) => {
    [match.local, match.visitante].forEach((team) => {
      if (!isPlaceholderTeam(team)) statusByTeam.set(team, "activa");
    });
  });

  standings.forEach((standing) => {
    (standing.table || []).forEach((row) => {
      const name = teamName(row.team?.name);
      if (!name || isPlaceholderTeam(name)) return;
      if (row.status === "ELIMINATED" || row.status === "eliminated") statusByTeam.set(name, "eliminada");
      if (row.status === "QUALIFIED" || row.status === "qualified") statusByTeam.set(name, "activa");
    });
  });

  partidos.filter(isPlayed).forEach((match) => {
    const winner = winnerOf(match);
    const loser = loserOf(match);
    if (match.fase === "Final" && winner && !isPlaceholderTeam(winner)) {
      statusByTeam.set(winner, "campeona");
    }
    if (isKnockout(match.fase) && loser && !isPlaceholderTeam(loser)) {
      statusByTeam.set(loser, "eliminada");
    }
  });

  return statusByTeam;
}

function isPlayed(match) {
  return match.golesLocal !== null && match.golesVisitante !== null;
}

function winnerOf(match) {
  if (!isPlayed(match) || match.golesLocal === match.golesVisitante) return null;
  return match.golesLocal > match.golesVisitante ? match.local : match.visitante;
}

function loserOf(match) {
  if (!isPlayed(match) || match.golesLocal === match.golesVisitante) return null;
  return match.golesLocal < match.golesVisitante ? match.local : match.visitante;
}

function isKnockout(fase) {
  return ["Ronda de 32", "Octavos de final", "Cuartos de final", "Semifinales", "Tercer lugar", "Final"].includes(fase);
}

function isPlaceholderTeam(name) {
  return /por definirse|ganador|perdedor|segundo/i.test(name || "");
}

function flagEmoji(code) {
  if (code === "GB-ENG") return "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}";
  if (code === "GB-SCT") return "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}";
  if (!/^[A-Z]{2}$/.test(code || "")) return "🏳️";
  return [...code].map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0))).join("");
}
