const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = Number(process.env.PORT || 3000);
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || "menu_abp";

const publicDir = path.join(__dirname, "public");

const profiles = [
  {
    key: "E",
    ageRange: "6-8",
    activity: "normal",
    title: "Perfil E",
    subtitle: "6 a 8 años - estilo de vida promedio",
    message: "En esta edad conviene priorizar comidas simples, calcio, hierro y energía pareja para aprender y jugar.",
    needs: {
      calories: 1600,
      protein: 28,
      carbs: 220,
      fat: 53,
      calcium: 1000,
      iron: 10
    }
  },
  {
    key: "F",
    ageRange: "6-8",
    activity: "athlete",
    title: "Perfil F",
    subtitle: "6 a 8 años - deportista",
    message: "Si practica deporte con frecuencia, necesita más energía, buena hidratación y colaciones nutritivas.",
    needs: {
      calories: 1900,
      protein: 36,
      carbs: 270,
      fat: 62,
      calcium: 1000,
      iron: 10
    }
  },
  {
    key: "G",
    ageRange: "8-9",
    activity: "normal",
    title: "Perfil G",
    subtitle: "8 a 9 años - estilo de vida promedio",
    message: "Necesita energía estable, alimentos variados y minerales que apoyen el crecimiento.",
    needs: {
      calories: 1750,
      protein: 34,
      carbs: 240,
      fat: 58,
      calcium: 1000,
      iron: 10
    }
  },
  {
    key: "H",
    ageRange: "8-9",
    activity: "athlete",
    title: "Perfil H",
    subtitle: "8 a 9 años - deportista",
    message: "El deporte aumenta sus necesidades de carbohidratos complejos, proteína y agua durante el día.",
    needs: {
      calories: 2100,
      protein: 42,
      carbs: 300,
      fat: 68,
      calcium: 1000,
      iron: 10
    }
  },
  {
    key: "A",
    ageRange: "10-12",
    activity: "normal",
    title: "Perfil A",
    subtitle: "10 a 12 años - estilo de vida promedio",
    message: "Necesitas calcio, hierro y energía estable para crecer, estudiar y jugar durante el día.",
    needs: {
      calories: 1900,
      protein: 42,
      carbs: 260,
      fat: 63,
      calcium: 1300,
      iron: 8
    }
  },
  {
    key: "B",
    ageRange: "10-12",
    activity: "athlete",
    title: "Perfil B",
    subtitle: "10 a 12 años - deportista",
    message: "Por ser deportista, requieres más carbohidratos complejos, proteínas de calidad y buena hidratación.",
    needs: {
      calories: 2400,
      protein: 58,
      carbs: 340,
      fat: 76,
      calcium: 1300,
      iron: 10
    }
  },
  {
    key: "C",
    ageRange: "13-15",
    activity: "normal",
    title: "Perfil C",
    subtitle: "13 a 15 años - estilo de vida promedio",
    message: "Tu cuerpo está en una etapa de crecimiento intenso: prioriza hierro, calcio, fibra y comidas regulares.",
    needs: {
      calories: 2200,
      protein: 52,
      carbs: 300,
      fat: 73,
      calcium: 1300,
      iron: 11
    }
  },
  {
    key: "D",
    ageRange: "13-15",
    activity: "athlete",
    title: "Perfil D",
    subtitle: "13 a 15 años - deportista",
    message: "Tus entrenamientos piden energía sostenida: suma carbohidratos complejos, proteína magra, calcio y recuperación.",
    needs: {
      calories: 2850,
      protein: 72,
      carbs: 420,
      fat: 88,
      calcium: 1300,
      iron: 13
    }
  }
];

const dishes = [
  {
    name: "Avena cremosa con plátano y leche",
    meal: "Desayuno",
    ageRanges: ["6-8", "8-9", "10-12", "13-15"],
    activities: ["normal", "athlete"],
    ingredients: ["avena", "plátano", "leche", "canela"],
    explanation: "Entrega energía lenta y calcio para huesos en crecimiento.",
    nutrition: { calories: 430, protein: 16, carbs: 72, fat: 10, calcium: 330, iron: 3 },
    image: "/images/dishes/avena-cremosa-platano-leche.png"
  },
  {
    name: "Tostadas integrales con huevo y palta",
    meal: "Desayuno",
    ageRanges: ["6-8", "8-9", "10-12", "13-15"],
    activities: ["athlete", "normal"],
    ingredients: ["pan integral", "huevo", "palta", "tomate"],
    explanation: "Combina proteína, grasas saludables y carbohidratos para empezar con foco.",
    nutrition: { calories: 520, protein: 22, carbs: 54, fat: 24, calcium: 120, iron: 4 },
    image: "/images/dishes/tostadas-integrales-huevo-palta.png"
  },
  {
    name: "Bowl de pollo, arroz integral y verduras",
    meal: "Almuerzo",
    ageRanges: ["6-8", "8-9", "10-12", "13-15"],
    activities: ["normal", "athlete"],
    ingredients: ["pollo", "arroz integral", "brócoli", "zanahoria"],
    explanation: "Aporta proteína para tejidos y carbohidratos complejos para una tarde con energía.",
    nutrition: { calories: 690, protein: 42, carbs: 82, fat: 20, calcium: 160, iron: 4 },
    image: "/images/dishes/bowl-pollo-arroz-verduras.png"
  },
  {
    name: "Pasta integral con atún y salsa de tomate",
    meal: "Almuerzo",
    ageRanges: ["6-8", "8-9", "10-12", "13-15"],
    activities: ["athlete"],
    ingredients: ["pasta integral", "atún", "tomate", "aceite de oliva"],
    explanation: "Ideal antes o después de entrenar por su energía sostenida y proteína práctica.",
    nutrition: { calories: 780, protein: 45, carbs: 108, fat: 18, calcium: 110, iron: 5 },
    image: "/images/dishes/pasta-integral-atun-tomate.svg"
  },
  {
    name: "Yogur natural con frutos rojos y nueces",
    meal: "Merienda",
    ageRanges: ["6-8", "8-9", "10-12", "13-15"],
    activities: ["normal", "athlete"],
    ingredients: ["yogur", "frutos rojos", "nueces", "miel"],
    explanation: "Suma calcio, antioxidantes y grasas buenas en una colación fácil.",
    nutrition: { calories: 310, protein: 15, carbs: 35, fat: 13, calcium: 360, iron: 2 },
    image: "/images/dishes/yogur-frutos-rojos-nueces.png"
  },
  {
    name: "Batido recuperador de cacao, leche y avena",
    meal: "Merienda",
    ageRanges: ["6-8", "8-9", "10-12", "13-15"],
    activities: ["athlete"],
    ingredients: ["leche", "avena", "cacao", "plátano"],
    explanation: "Repone energía y ayuda a recuperarse después de la actividad física.",
    nutrition: { calories: 460, protein: 20, carbs: 72, fat: 11, calcium: 410, iron: 4 },
    image: "/images/dishes/batido-cacao-leche-avena.svg"
  },
  {
    name: "Tortilla de verduras con ensalada y quinoa",
    meal: "Cena",
    ageRanges: ["6-8", "8-9", "10-12", "13-15"],
    activities: ["normal"],
    ingredients: ["huevo", "espinaca", "quinoa", "ensalada"],
    explanation: "Cierra el día con proteína, hierro vegetal y una cena liviana pero completa.",
    nutrition: { calories: 540, protein: 28, carbs: 58, fat: 22, calcium: 210, iron: 5 },
    image: "/images/dishes/tortilla-verduras-ensalada-quinoa.png"
  },
  {
    name: "Salmón con papas doradas y ensalada verde",
    meal: "Cena",
    ageRanges: ["8-9", "10-12", "13-15"],
    activities: ["athlete", "normal"],
    ingredients: ["salmón", "papas", "lechuga", "limón"],
    explanation: "Entrega proteína de alta calidad y grasas omega para recuperación y concentración.",
    nutrition: { calories: 720, protein: 46, carbs: 62, fat: 32, calcium: 150, iron: 3 },
    image: "/images/dishes/salmon-papas-ensalada.png"
  }
];

let db;
let memoryDishes = dishes.map((dish, index) => ({ ...dish, id: `seed-${index + 1}` }));

async function connectDb() {
  if (!MONGODB_URI) return;
  try {
    const { MongoClient } = require("mongodb");
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    await seedDb();
    console.log(`MongoDB conectado: ${DB_NAME}`);
  } catch (error) {
    console.warn("No se pudo conectar a MongoDB. Usando datos en memoria.", error.message);
  }
}

async function seedDb() {
  const profileCollection = db.collection("profiles");
  const dishCollection = db.collection("dishes");
  if ((await profileCollection.countDocuments()) === 0) {
    await profileCollection.insertMany(profiles);
  }
  if ((await dishCollection.countDocuments()) === 0) {
    await dishCollection.insertMany(dishes);
  }
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Payload demasiado grande"));
      }
    });
    req.on("end", () => resolve(body ? JSON.parse(body) : {}));
    req.on("error", reject);
  });
}

function toClientDish(dish) {
  return { ...dish, id: dish.id || String(dish._id) };
}

async function getProfiles() {
  if (!db) return profiles;
  return db.collection("profiles").find({}, { projection: { _id: 0 } }).toArray();
}

async function getDishes(ageRange, activity) {
  if (!db) {
    return memoryDishes.filter((dish) => dish.ageRanges.includes(ageRange) && dish.activities.includes(activity));
  }
  const rows = await db.collection("dishes").find({ ageRanges: ageRange, activities: activity }).toArray();
  return rows.map(toClientDish);
}

async function addDish(payload) {
  const dish = {
    name: String(payload.name || "").trim(),
    meal: String(payload.meal || "").trim(),
    ageRanges: Array.isArray(payload.ageRanges) ? payload.ageRanges : [],
    activities: Array.isArray(payload.activities) ? payload.activities : [],
    ingredients: Array.isArray(payload.ingredients)
      ? payload.ingredients.map((item) => String(item).trim()).filter(Boolean)
      : String(payload.ingredients || "").split(",").map((item) => item.trim()).filter(Boolean),
    explanation: String(payload.explanation || "").trim(),
    nutrition: {
      calories: Number(payload.nutrition?.calories || 0),
      protein: Number(payload.nutrition?.protein || 0),
      carbs: Number(payload.nutrition?.carbs || 0),
      fat: Number(payload.nutrition?.fat || 0),
      calcium: Number(payload.nutrition?.calcium || 0),
      iron: Number(payload.nutrition?.iron || 0)
    },
    image: String(payload.image || "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80").trim()
  };

  if (!dish.name || !dish.meal || !dish.ageRanges.length || !dish.activities.length) {
    const error = new Error("Faltan campos obligatorios");
    error.statusCode = 400;
    throw error;
  }

  if (!db) {
    const saved = { ...dish, id: `local-${Date.now()}` };
    memoryDishes.push(saved);
    return saved;
  }

  const result = await db.collection("dishes").insertOne(dish);
  return { ...dish, id: String(result.insertedId) };
}

function serveStatic(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const routeFiles = {
    "/": "/index.html",
    "/admin": "/admin.html"
  };
  const pathname = routeFiles[requestUrl.pathname] || requestUrl.pathname;
  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(publicDir, safePath);

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      fs.readFile(path.join(publicDir, "index.html"), (fallbackError, fallback) => {
        if (fallbackError) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(fallback);
      });
      return;
    }

    const ext = path.extname(filePath);
    const contentTypes = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webmanifest": "application/manifest+json; charset=utf-8"
    };
    res.writeHead(200, { "Content-Type": contentTypes[ext] || "application/octet-stream" });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "GET" && requestUrl.pathname === "/api/profiles") {
      sendJson(res, 200, await getProfiles());
      return;
    }

    if (req.method === "GET" && requestUrl.pathname === "/api/dishes") {
      sendJson(res, 200, await getDishes(requestUrl.searchParams.get("ageRange"), requestUrl.searchParams.get("activity")));
      return;
    }

    if (req.method === "POST" && requestUrl.pathname === "/api/dishes") {
      sendJson(res, 201, await addDish(await readBody(req)));
      return;
    }

    serveStatic(req, res);
  } catch (error) {
    sendJson(res, error.statusCode || 500, { error: error.message || "Error interno" });
  }
});

connectDb().finally(() => {
  server.listen(PORT, () => {
    console.log(`Menu ABP listo en http://localhost:${PORT}`);
  });
});
