export function renderCharacterCard(container, profile) {
  container.innerHTML = `
    <article class="characterCard">
      <img class="characterCard__image"
           src="${profile.image}"
           alt="${profile.name}" />
      <div class="characterCard__body">
        <h2 class="characterCard__name">${profile.name}</h2>
        <p class="characterCard__detail">${profile.presentation}</p>
      </div>
    </article>
  `;
}