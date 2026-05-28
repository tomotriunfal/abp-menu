const form = document.querySelector("#dishForm");
const statusEl = document.querySelector("#formStatus");
const API_BASE_URL = (window.MENU_ABP_API_BASE_URL || "").replace(/\/$/, "");

function checkedValues(name) {
  return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const payload = {
    name: data.get("name"),
    meal: data.get("meal"),
    image: data.get("image"),
    ingredients: data.get("ingredients"),
    explanation: data.get("explanation"),
    ageRanges: checkedValues("ageRanges"),
    activities: checkedValues("activities"),
    nutrition: {
      calories: data.get("calories"),
      protein: data.get("protein"),
      carbs: data.get("carbs"),
      fat: data.get("fat"),
      calcium: data.get("calcium"),
      iron: data.get("iron")
    }
  };

  statusEl.textContent = "Guardando...";
  let result;
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/dishes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    result = await response.json();
  } catch (error) {
    statusEl.textContent = "No se pudo conectar con el servidor.";
    return;
  }

  if (!response.ok) {
    statusEl.textContent = result.error || "No se pudo guardar.";
    return;
  }

  form.reset();
  statusEl.textContent = `Plato agregado: ${result.name}`;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
