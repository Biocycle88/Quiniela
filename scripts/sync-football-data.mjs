import { readFile, writeFile } from "node:fs/promises";

const TOKEN = process.env.FOOTBALL_DATA_TOKEN;
const API_BASE = process.env.FOOTBALL_DATA_BASE_URL || "https://api.football-data.org/v4";
const COMPETITION = process.env.FOOTBALL_DATA_COMPETITION || "WC";
const SEASON = process.env.FOOTBALL_DATA_SEASON || "2026";
const OUTPUT_FILE = new URL("../data/partidos.json", import.meta.url);

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
  "Bosnia and Herzegovina": "Bosnia",
  Brazil: "Brasil",
  Canada: "Canadá",
  "Cape Verde Islands": "Cabo Verde",
  "Cape Verde": "Cabo Verde",
  Colombia: "Colombia",
  Congo: "Congo",
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

if (!TOKEN) {
  console.error("Falta FOOTBALL_DATA_TOKEN. Configura la variable de entorno o el secret de GitHub Actions.");
  process.exit(1);
}

const url = `${API_BASE}/competitions/${COMPETITION}/matches?season=${SEASON}`;
const response = await fetch(url, {
  headers: {
    "X-Auth-Token": TOKEN
  }
});

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
    pais: existing.pais || ""
  };
});

normalized.sort((a, b) => new Date(a.fechaUTC) - new Date(b.fechaUTC));
await writeFile(OUTPUT_FILE, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");

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
