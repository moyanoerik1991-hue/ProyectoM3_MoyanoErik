import { CHARACTERS } from "../services/characters.js";
import { toCharacterProfile } from "../services/characterLookup.js";
import { renderCharacterCard } from "../ui/characterCard.js";
import { setSelectedCharacterId } from "../services/storage.js";
import { navigateTo } from "../navigation.js";

export function renderHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section class="home">
      <h1 class="home__title">Selecciona El Personaje con el que desees hablar.</h1>
      <div class="home__grid" id="characterGrid"></div>
    </section>
  `;

  const grid = document.getElementById("characterGrid");

  Object.values(CHARACTERS).forEach((rawCharacter) => {
    const profile = toCharacterProfile(rawCharacter);
    const cardContainer = document.createElement("div");

    renderCharacterCard(cardContainer, profile);

    cardContainer.addEventListener("click", () => {
      setSelectedCharacterId(profile.id);
      navigateTo("/chat");
    });

    grid.appendChild(cardContainer);
  });
}