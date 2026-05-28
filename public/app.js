const state = {
  ageRange: "10-12",
  activity: "normal",
  profiles: [],
  dishes: [],
  chosen: {},
  customDishes: JSON.parse(localStorage.getItem("menuAbpCustomDishes") || "[]"),
  waterByAge: JSON.parse(localStorage.getItem("menuAbpWater") || "{}"),
  darkMode: localStorage.getItem("menuAbpTheme") === "dark",
  language: localStorage.getItem("menuAbpLanguage") || "es"
};

const labels = {
  calories: ["Calorías", "kcal"],
  protein: ["Proteínas", "g"],
  carbs: ["Carbohidratos", "g"],
  fat: ["Grasas", "g"],
  calcium: ["Calcio", "mg"],
  iron: ["Hierro", "mg"]
};

const translations = {
  es: {
    appSubtitle: "Menús Saludables para Adolescentes",
    settings: "Configuración",
    hydration: "Hidratación diaria",
    close: "Cerrar",
    darkMode: "Modo oscuro",
    darkHelp: "Mejor contraste para usar la app con poca luz.",
    language: "Idioma",
    languageHelp: "Cambia los textos principales de la aplicación.",
    idealAge: "Ideal para tu edad.",
    waterGoal: (age, goal) => `Lo ideal para ${age} años es aproximadamente ${goal} ml de agua al día.`,
    reset: "Reiniciar",
    step1: "Paso 1",
    selectAge: "Selecciona tu edad",
    years: "años",
    step2: "Paso 2",
    activityLevel: "Nivel de actividad",
    normal: "Estilo de vida promedio",
    athlete: "Deportista",
    needsTitle: "Necesidades Básicas Diarias",
    myDay: "Mi día",
    addedDishes: "Platos agregados",
    clear: "Limpiar",
    dayMenu: "Menú del día completo",
    suggestedDishes: "Platos sugeridos para el perfil elegido",
    emptyDishes: "Aún no hay platos para este bloque.",
    addToDay: "Agregar a mi día",
    added: "Agregado ✓",
    emptyPlan: "Agrega platos para ver tu avance.",
    coachEmpty: "Agrega platos del día para comparar energía, macronutrientes y minerales con tu perfil.",
    coachClose: "Tu selección está muy cerca de cubrir las necesidades del perfil. Revisa porciones e hidratación.",
    coachLow: (items) => `Todavía falta reforzar ${items}. Prueba sumar una preparación con lácteos, legumbres, huevo o pescado.`,
    coachGood: "Vas avanzando bien. Completa los cuatro momentos del día para lograr un menú más equilibrado.",
    customDishLabel: "Plato propio",
    customDishTitle: "Agregar a mis platos",
    myDishesLabel: "Mis platos",
    myDishesTitle: "Platos creados por mí",
    emptyCustomDishes: "Tus platos propios aparecerán aquí cuando los guardes.",
    customName: "Nombre del plato",
    customMeal: "Momento del día",
    saveDish: "Guardar plato",
    savedDish: (name) => `Plato guardado: ${name}`,
    deleteDish: "Eliminar",
    customExplanation: "Plato propio agregado desde configuración.",
    customIngredient: "plato propio",
    calories: "Calorías",
    protein: "Proteínas",
    carbs: "Carbohidratos",
    fat: "Grasas",
    calcium: "Calcio",
    iron: "Hierro"
  },
  en: {
    appSubtitle: "Healthy Menus for Teens",
    settings: "Settings",
    hydration: "Daily hydration",
    close: "Close",
    darkMode: "Dark mode",
    darkHelp: "Better contrast for using the app in low light.",
    language: "Language",
    languageHelp: "Changes the main interface text.",
    idealAge: "Ideal for your age.",
    waterGoal: (age, goal) => `The ideal amount for ages ${age} is about ${goal} ml of water per day.`,
    reset: "Reset",
    step1: "Step 1",
    selectAge: "Select your age",
    years: "years",
    step2: "Step 2",
    activityLevel: "Activity level",
    normal: "Average lifestyle",
    athlete: "Athlete",
    needsTitle: "Basic Daily Needs",
    myDay: "My day",
    addedDishes: "Added dishes",
    clear: "Clear",
    dayMenu: "Full day menu",
    suggestedDishes: "Suggested dishes for the selected profile",
    emptyDishes: "There are no dishes for this block yet.",
    addToDay: "Add to my day",
    added: "Added ✓",
    emptyPlan: "Add dishes to see your progress.",
    coachEmpty: "Add dishes from the day to compare energy, macronutrients, and minerals with your profile.",
    coachClose: "Your selection is very close to covering this profile's needs. Review portions and hydration.",
    coachLow: (items) => `You still need more ${items}. Try adding a dish with dairy, legumes, eggs, or fish.`,
    coachGood: "You are making good progress. Complete the four meal moments for a more balanced menu.",
    customDishLabel: "Custom dish",
    customDishTitle: "Add to my dishes",
    myDishesLabel: "My dishes",
    myDishesTitle: "Dishes created by me",
    emptyCustomDishes: "Your custom dishes will appear here after you save them.",
    customName: "Dish name",
    customMeal: "Meal moment",
    saveDish: "Save dish",
    savedDish: (name) => `Saved dish: ${name}`,
    deleteDish: "Delete",
    customExplanation: "Custom dish added from settings.",
    customIngredient: "custom dish",
    calories: "Calories",
    protein: "Protein",
    carbs: "Carbohydrates",
    fat: "Fat",
    calcium: "Calcium",
    iron: "Iron"
  },
  fr: {
    appSubtitle: "Menus sains pour adolescents",
    settings: "Configuration",
    hydration: "Hydratation quotidienne",
    close: "Fermer",
    darkMode: "Mode sombre",
    darkHelp: "Meilleur contraste pour utiliser l'application avec peu de lumière.",
    language: "Langue",
    languageHelp: "Change les principaux textes de l'interface.",
    idealAge: "Idéal pour ton âge.",
    waterGoal: (age, goal) => `L'idéal pour ${age} ans est d'environ ${goal} ml d'eau par jour.`,
    reset: "Réinitialiser",
    step1: "Étape 1",
    selectAge: "Choisis ton âge",
    years: "ans",
    step2: "Étape 2",
    activityLevel: "Niveau d'activité",
    normal: "Mode de vie moyen",
    athlete: "Sportif",
    needsTitle: "Besoins quotidiens de base",
    myDay: "Ma journée",
    addedDishes: "Plats ajoutés",
    clear: "Effacer",
    dayMenu: "Menu complet de la journée",
    suggestedDishes: "Plats suggérés pour le profil choisi",
    emptyDishes: "Il n'y a pas encore de plats pour ce moment.",
    addToDay: "Ajouter à ma journée",
    added: "Ajouté ✓",
    emptyPlan: "Ajoute des plats pour voir ta progression.",
    coachEmpty: "Ajoute des plats de la journée pour comparer énergie, macronutriments et minéraux avec ton profil.",
    coachClose: "Ta sélection est très proche des besoins du profil. Vérifie les portions et l'hydratation.",
    coachLow: (items) => `Il faut encore renforcer ${items}. Essaie d'ajouter une préparation avec produits laitiers, légumineuses, œuf ou poisson.`,
    coachGood: "Tu avances bien. Complète les quatre moments de la journée pour un menu plus équilibré.",
    customDishLabel: "Plat personnel",
    customDishTitle: "Ajouter à mes plats",
    myDishesLabel: "Mes plats",
    myDishesTitle: "Plats créés par moi",
    emptyCustomDishes: "Tes plats personnels apparaîtront ici après les avoir enregistrés.",
    customName: "Nom du plat",
    customMeal: "Moment du repas",
    saveDish: "Enregistrer le plat",
    savedDish: (name) => `Plat enregistré : ${name}`,
    deleteDish: "Supprimer",
    customExplanation: "Plat personnel ajouté depuis la configuration.",
    customIngredient: "plat personnel",
    calories: "Calories",
    protein: "Protéines",
    carbs: "Glucides",
    fat: "Lipides",
    calcium: "Calcium",
    iron: "Fer"
  },
  pt: {
    appSubtitle: "Menus saudáveis para adolescentes",
    settings: "Configuração",
    hydration: "Hidratação diária",
    close: "Fechar",
    darkMode: "Modo escuro",
    darkHelp: "Melhor contraste para usar o app com pouca luz.",
    language: "Idioma",
    languageHelp: "Altera os principais textos da interface.",
    idealAge: "Ideal para sua idade.",
    waterGoal: (age, goal) => `O ideal para ${age} anos é aproximadamente ${goal} ml de água por dia.`,
    reset: "Reiniciar",
    step1: "Passo 1",
    selectAge: "Selecione sua idade",
    years: "anos",
    step2: "Passo 2",
    activityLevel: "Nível de atividade",
    normal: "Estilo de vida médio",
    athlete: "Atleta",
    needsTitle: "Necessidades diárias básicas",
    myDay: "Meu dia",
    addedDishes: "Pratos adicionados",
    clear: "Limpar",
    dayMenu: "Menu completo do dia",
    suggestedDishes: "Pratos sugeridos para o perfil escolhido",
    emptyDishes: "Ainda não há pratos para este bloco.",
    addToDay: "Adicionar ao meu dia",
    added: "Adicionado ✓",
    emptyPlan: "Adicione pratos para ver seu progresso.",
    coachEmpty: "Adicione pratos do dia para comparar energia, macronutrientes e minerais com seu perfil.",
    coachClose: "Sua seleção está muito perto de cobrir as necessidades do perfil. Revise porções e hidratação.",
    coachLow: (items) => `Ainda falta reforçar ${items}. Tente adicionar uma preparação com lácteos, leguminosas, ovo ou peixe.`,
    coachGood: "Você está avançando bem. Complete os quatro momentos do dia para um menu mais equilibrado.",
    customDishLabel: "Prato próprio",
    customDishTitle: "Adicionar aos meus pratos",
    myDishesLabel: "Meus pratos",
    myDishesTitle: "Pratos criados por mim",
    emptyCustomDishes: "Seus pratos próprios aparecerão aqui depois de salvar.",
    customName: "Nome do prato",
    customMeal: "Momento do dia",
    saveDish: "Salvar prato",
    savedDish: (name) => `Prato salvo: ${name}`,
    deleteDish: "Excluir",
    customExplanation: "Prato próprio adicionado nas configurações.",
    customIngredient: "prato próprio",
    calories: "Calorias",
    protein: "Proteínas",
    carbs: "Carboidratos",
    fat: "Gorduras",
    calcium: "Cálcio",
    iron: "Ferro"
  }
};

function tr(key, ...args) {
  const value = (translations[state.language] || translations.es)[key] || translations.es[key] || key;
  return typeof value === "function" ? value(...args) : value;
}

const labelKeys = {
  calories: "calories",
  protein: "protein",
  carbs: "carbs",
  fat: "fat",
  calcium: "calcium",
  iron: "iron"
};

const meals = ["Desayuno", "Almuerzo", "Merienda", "Cena"];

const waterGoals = {
  "6-8": 1600,
  "8-9": 1700,
  "10-12": 1900,
  "13-15": 2200
};

const $ = (selector) => document.querySelector(selector);
const API_BASE_URL = (window.MENU_ABP_API_BASE_URL || "").replace(/\/$/, "");

async function fetchJson(url, options) {
  const requestUrl = url.startsWith("/api/") ? `${API_BASE_URL}${url}` : url;
  const response = await fetch(requestUrl, options);
  if (!response.ok) throw new Error((await response.json()).error || "Error de red");
  return response.json();
}

function selectedProfile() {
  return state.profiles.find((profile) => profile.ageRange === state.ageRange && profile.activity === state.activity);
}

function currentWater() {
  return Number(state.waterByAge[state.ageRange] || 0);
}

function saveWater() {
  localStorage.setItem("menuAbpWater", JSON.stringify(state.waterByAge));
}

function saveCustomDishes() {
  localStorage.setItem("menuAbpCustomDishes", JSON.stringify(state.customDishes));
}

function customDishesForProfile() {
  return state.customDishes.filter(
    (dish) => dish.ageRange === state.ageRange && dish.activity === state.activity
  );
}

function applyTheme() {
  document.body.classList.toggle("dark-mode", state.darkMode);
  const themeToggle = $("[data-theme-toggle]");
  if (themeToggle) themeToggle.checked = state.darkMode;
  document.querySelector('meta[name="theme-color"]').setAttribute("content", state.darkMode ? "#071817" : "#18734b");
}

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = value;
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  setText(".brand-lockup small", tr("appSubtitle"));
  setText(".settings-head .eyebrow", tr("settings"));
  setText(".settings-head h2", tr("hydration"));
  setText("[data-settings-close]", tr("close"));
  setText(".theme-switch strong", tr("darkMode"));
  setText(".theme-switch small", tr("darkHelp"));
  setText(".language-select strong", tr("language"));
  setText(".language-select small", tr("languageHelp"));
  setText("[data-water-reset]", tr("reset"));
  setText("[data-custom-dish-label]", tr("customDishLabel"));
  setText("[data-custom-dish-title]", tr("customDishTitle"));
  setText("[data-custom-name-label]", tr("customName"));
  setText("[data-custom-meal-label]", tr("customMeal"));
  setText("[data-custom-calories-label]", tr("calories"));
  setText("[data-custom-protein-label]", `${tr("protein")} g`);
  setText("[data-custom-carbs-label]", `${tr("carbs")} g`);
  setText("[data-custom-fat-label]", `${tr("fat")} g`);
  setText("[data-custom-calcium-label]", `${tr("calcium")} mg`);
  setText("[data-custom-iron-label]", `${tr("iron")} mg`);
  setText("[data-custom-submit]", tr("saveDish"));
  setText("[data-my-dishes-label]", tr("myDishesLabel"));
  setText("[data-my-dishes-title]", tr("myDishesTitle"));
  setText(".chooser > div:nth-child(1) .step-label", tr("step1"));
  setText(".chooser > div:nth-child(1) h2", tr("selectAge"));
  setText(".chooser > div:nth-child(2) .step-label", tr("step2"));
  setText(".chooser > div:nth-child(2) h2", tr("activityLevel"));
  setText('[data-activity="normal"]', `🍎 ${tr("normal")}`);
  setText('[data-activity="athlete"]', `〽 ${tr("athlete")}`);
  setText(".planner .eyebrow", tr("myDay"));
  setText(".planner h2", tr("addedDishes"));
  setText("[data-reset]", tr("clear"));
  setText(".section-head .eyebrow", tr("dayMenu"));
  setText(".section-head h2", tr("suggestedDishes"));

  document.querySelectorAll("[data-age]").forEach((button) => {
    button.innerHTML = `<span>👶</span>${button.dataset.age} ${tr("years")}`;
  });

  const languageSelect = $("[data-language-select]");
  if (languageSelect) languageSelect.value = state.language;
}

function renderWater() {
  const goal = waterGoals[state.ageRange] || 1900;
  const amount = currentWater();
  const pct = Math.min((amount / goal) * 100, 100);

  $("#waterFill").style.height = `${pct}%`;
  $("#waterStatus").textContent = `${amount} / ${goal} ml`;
  $("#waterGoalText").textContent = amount ? tr("waterGoal", state.ageRange, goal) : tr("idealAge");
}

function setSettingsOpen(isOpen) {
  $("#settingsPanel").classList.toggle("open", isOpen);
  $("#settingsPanel").setAttribute("aria-hidden", String(!isOpen));
  $("[data-settings-toggle]").setAttribute("aria-expanded", String(isOpen));
}

function setActiveButtons() {
  document.querySelectorAll("[data-age]").forEach((button) => {
    button.classList.toggle("active", button.dataset.age === state.ageRange);
  });
  document.querySelectorAll("[data-activity]").forEach((button) => {
    button.classList.toggle("active", button.dataset.activity === state.activity);
  });
}

function renderNeeds(profile) {
  $("#profileKey").textContent = tr("needsTitle");
  $("#profileTitle").textContent = profile.subtitle;
  $("#profileMessage").textContent = profile.message;
  $("#needsGrid").innerHTML = Object.entries(profile.needs)
    .map(
      ([key, value]) => `
        <div>
          <span>${tr(labelKeys[key])}</span>
          <strong>${value} <small>${labels[key][1]}</small></strong>
        </div>
      `
    )
    .join("");
}

function renderMenu() {
  $("#menuGrid").innerHTML = meals
    .map((meal) => {
      const items = state.dishes.filter((dish) => dish.meal === meal && !dish.id.startsWith("custom-"));
      return `
        <article class="meal-column">
          <h3>${meal}</h3>
          ${items.map(renderDish).join("") || `<p class='empty'>${tr("emptyDishes")}</p>`}
        </article>
      `;
    })
    .join("");
}

function renderCustomDishes() {
  const customItems = customDishesForProfile();
  $("#customDishGrid").innerHTML = customItems.length
    ? customItems.map(renderDish).join("")
    : `<p class="empty">${tr("emptyCustomDishes")}</p>`;
}

function renderDish(dish) {
  const qty = state.chosen[dish.id] || 0;
  const macros = [
    ["carbs", tr("carbs"), "#1f8a70"],
    ["protein", tr("protein"), "#d44d3f"],
    ["fat", tr("fat"), "#b7791f"]
  ];
  return `
    <article class="dish-card">
      <img src="${dish.image}" alt="${dish.name}" />
      <div class="dish-body">
        <div>
          <p class="meal-tag">${dish.meal}</p>
          <h4>${dish.name}</h4>
          <p>${dish.explanation}</p>
        </div>
        <p class="ingredients">${dish.ingredients.join(" · ")}</p>
        <div class="macro-strip" aria-label="Nutrientes principales de ${dish.name}">
          ${macros
            .map(
              ([key, label, color]) => `
                <div class="macro-chip" style="--macro-color:${color}">
                  <strong>${Math.round(Number(dish.nutrition[key] || 0))}<small>g</small></strong>
                  <span>${label}</span>
                </div>
              `
            )
            .join("")}
        </div>
        <div class="dish-actions">
          <button class="primary ${qty ? "added" : ""}" data-add="${dish.id}">
            ${qty ? tr("added") : tr("addToDay")}
          </button>
          ${qty ? `
            <div class="qty-control" aria-label="Cantidad de ${dish.name}">
              <button data-minus="${dish.id}">−</button>
              <strong>${qty}</strong>
              <button data-plus="${dish.id}">+</button>
            </div>
          ` : ""}
          ${dish.id.startsWith("custom-") ? `<button class="ghost delete-custom" data-delete-custom="${dish.id}">${tr("deleteDish")}</button>` : ""}
        </div>
      </div>
    </article>
  `;
}

function planTotals() {
  return Object.entries(state.chosen).reduce(
    (totals, dish) => {
      const [dishId, qty] = dish;
      const selectedDish = state.dishes.find((item) => item.id === dishId);
      if (selectedDish) {
        Object.keys(totals).forEach((key) => {
          totals[key] += Number(selectedDish.nutrition[key] || 0) * qty;
        });
      }
      return totals;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, calcium: 0, iron: 0 }
  );
}

function plannerAdvice(totals, needs) {
  const completion = Object.entries(needs).map(([key, target]) => totals[key] / target);
  const average = completion.reduce((sum, value) => sum + Math.min(value, 1), 0) / completion.length;
  const low = Object.entries(needs)
    .filter(([key, target]) => totals[key] > 0 && totals[key] < target * 0.55)
    .map(([key]) => tr(labelKeys[key]).toLowerCase());

  if (!Object.values(totals).some(Boolean)) {
    return tr("coachEmpty");
  }
  if (average >= 0.85 && low.length === 0) {
    return tr("coachClose");
  }
  if (low.length) {
    return tr("coachLow", low.slice(0, 2).join(" y "));
  }
  return tr("coachGood");
}

function renderPlanner() {
  const profile = selectedProfile();
  const totals = planTotals();
  const chosenItems = Object.entries(state.chosen)
    .map(([dishId, qty]) => ({ dish: state.dishes.find((item) => item.id === dishId), qty }))
    .filter((item) => item.dish && item.qty > 0);

  $("#chosenList").innerHTML = chosenItems.length
    ? chosenItems
        .map(
          ({ dish, qty }) => `
            <div class="chosen-item">
              <span>${dish.meal}: ${dish.name} <small>x${qty}</small></span>
              <button aria-label="Quitar ${dish.name}" data-remove="${dish.id}">🗑</button>
            </div>
          `
        )
        .join("")
    : `<p class='empty'>${tr("emptyPlan")}</p>`;

  $("#progressBars").innerHTML = Object.entries(profile.needs)
    .map(([key, target]) => {
      const value = totals[key];
      const pct = Math.min(Math.round((value / target) * 100), 120);
      return `
        <div class="bar-row">
          <div class="bar-label">
            <span>${tr(labelKeys[key])}</span>
            <strong>${Math.round(value)} / ${target} ${labels[key][1]}</strong>
          </div>
          <div class="bar-track"><span style="width:${Math.min(pct, 100)}%"></span></div>
        </div>
      `;
    })
    .join("");

  $("#coachMessage").textContent = plannerAdvice(totals, profile.needs);
}

function addDishToPlan(dishId) {
  const dish = state.dishes.find((item) => item.id === dishId) || state.customDishes.find((item) => item.id === dishId);
  if (dish && !state.dishes.some((item) => item.id === dishId)) state.dishes.push(dish);
  if (dish && !state.chosen[dishId]) state.chosen[dishId] = 1;
  renderCustomDishes();
  renderMenu();
  renderPlanner();
}

async function refresh() {
  setActiveButtons();
  const profile = selectedProfile();
  state.chosen = {};
  const suggestedDishes = await fetchJson(`/api/dishes?ageRange=${state.ageRange}&activity=${state.activity}`);
  state.dishes = [...suggestedDishes, ...customDishesForProfile()];
  renderNeeds(profile);
  renderCustomDishes();
  renderMenu();
  renderPlanner();
  renderWater();
}

document.addEventListener("click", async (event) => {
  const age = event.target.closest("[data-age]")?.dataset.age;
  const activity = event.target.closest("[data-activity]")?.dataset.activity;
  const addId = event.target.closest("[data-add]")?.dataset.add;
  const plusId = event.target.closest("[data-plus]")?.dataset.plus;
  const minusId = event.target.closest("[data-minus]")?.dataset.minus;
  const removeIndex = event.target.closest("[data-remove]")?.dataset.remove;
  const resetPlan = event.target.closest("[data-reset]");
  const deleteCustomId = event.target.closest("[data-delete-custom]")?.dataset.deleteCustom;
  const settingsToggle = event.target.closest("[data-settings-toggle]");
  const settingsClose = event.target.closest("[data-settings-close]");
  const waterAdd = event.target.closest("[data-water-add]");
  const waterReset = event.target.closest("[data-water-reset]");
  const themeToggle = event.target.closest("[data-theme-toggle]");
  const languageSelect = event.target.closest("[data-language-select]");

  if (settingsToggle) {
    setSettingsOpen(!$("#settingsPanel").classList.contains("open"));
  }
  if (settingsClose) {
    setSettingsOpen(false);
  }
  if (waterAdd) {
    const goal = waterGoals[state.ageRange] || 1900;
    state.waterByAge[state.ageRange] = Math.min(currentWater() + 200, goal);
    saveWater();
    renderWater();
  }
  if (waterReset) {
    state.waterByAge[state.ageRange] = 0;
    saveWater();
    renderWater();
  }
  if (themeToggle) {
    state.darkMode = themeToggle.checked;
    localStorage.setItem("menuAbpTheme", state.darkMode ? "dark" : "light");
    applyTheme();
  }
  if (languageSelect) {
    state.language = languageSelect.value;
    localStorage.setItem("menuAbpLanguage", state.language);
    applyLanguage();
    renderWater();
    const profile = selectedProfile();
    if (profile) renderNeeds(profile);
    renderCustomDishes();
    renderMenu();
    renderPlanner();
  }
  if (age) {
    state.ageRange = age;
    await refresh();
  }
  if (activity) {
    state.activity = activity;
    await refresh();
  }
  if (addId) {
    addDishToPlan(addId);
  }
  if (plusId) {
    state.chosen[plusId] = (state.chosen[plusId] || 0) + 1;
    renderMenu();
    renderPlanner();
  }
  if (minusId) {
    state.chosen[minusId] = Math.max((state.chosen[minusId] || 0) - 1, 0);
    if (!state.chosen[minusId]) delete state.chosen[minusId];
    renderMenu();
    renderPlanner();
  }
  if (removeIndex !== undefined) {
    delete state.chosen[removeIndex];
    renderMenu();
    renderPlanner();
  }
  if (resetPlan) {
    state.chosen = {};
    renderMenu();
    renderPlanner();
  }
  if (deleteCustomId) {
    state.customDishes = state.customDishes.filter((dish) => dish.id !== deleteCustomId);
    state.dishes = state.dishes.filter((dish) => dish.id !== deleteCustomId);
    delete state.chosen[deleteCustomId];
    saveCustomDishes();
    renderCustomDishes();
    renderMenu();
    renderPlanner();
  }
});

document.addEventListener("pointerup", (event) => {
  const addId = event.target.closest("[data-add]")?.dataset.add;
  if (!addId) return;
  addDishToPlan(addId);
});

document.addEventListener("change", (event) => {
  const languageSelect = event.target.closest("[data-language-select]");
  if (!languageSelect) return;

  state.language = languageSelect.value;
  localStorage.setItem("menuAbpLanguage", state.language);
  applyLanguage();
  renderWater();
  const profile = selectedProfile();
  if (profile) renderNeeds(profile);
  renderCustomDishes();
  renderMenu();
  renderPlanner();
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-custom-dish-form]");
  if (!form) return;
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  if (!name) return;

  const dish = {
    id: `custom-${Date.now()}`,
    name,
    meal: String(data.get("meal") || "Almuerzo"),
    ageRange: state.ageRange,
    activity: state.activity,
    ageRanges: [state.ageRange],
    activities: [state.activity],
    ingredients: [tr("customIngredient")],
    explanation: tr("customExplanation"),
    nutrition: {
      calories: Number(data.get("calories") || 0),
      protein: Number(data.get("protein") || 0),
      carbs: Number(data.get("carbs") || 0),
      fat: Number(data.get("fat") || 0),
      calcium: Number(data.get("calcium") || 0),
      iron: Number(data.get("iron") || 0)
    },
    image: "/images/dishes/bowl-pollo-arroz-verduras.png"
  };

  state.customDishes.push(dish);
  saveCustomDishes();
  state.dishes = [...state.dishes, dish];
  form.reset();
  setText("[data-custom-status]", tr("savedDish", name));
  renderCustomDishes();
  renderMenu();
  renderPlanner();
  setSettingsOpen(false);
  document.querySelector(".custom-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

async function init() {
  applyTheme();
  applyLanguage();
  state.profiles = await fetchJson("/api/profiles");
  await refresh();
}

init().catch((error) => {
  document.body.insertAdjacentHTML("afterbegin", `<p class="app-error">${error.message}</p>`);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
