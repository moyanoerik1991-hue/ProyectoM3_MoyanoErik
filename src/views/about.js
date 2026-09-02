import { CHARACTERS } from "../services/characters.js";
import { toCharacterProfile } from "../services/characterLookup.js";
import { renderCharacterCard } from "../ui/characterCard.js";

export function renderAbout() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section class="about">
      <h1 class="about__title">Sobre los personajes</h1>
      <div class="about__grid" id="aboutGrid"></div>
    </section>
  `;

  const grid = document.getElementById("aboutGrid");

  Object.values(CHARACTERS).forEach((rawCharacter) => {
    const profile = toCharacterProfile(rawCharacter);
    const cardProfile = { ...profile, presentation: profile.description };

    const cardContainer = document.createElement("div");
    renderCharacterCard(cardContainer, cardProfile);
    grid.appendChild(cardContainer);
  });
}