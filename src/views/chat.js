import { getSelectedCharacterId, getChatHistory, setChatHistory, clearChatHistory } from "../services/storage.js";
import { getCharacterById, toCharacterProfile } from "../services/characterLookup.js";
import { getCharacterReply } from "../services/aiClient.js";
import { appendUserMessage, appendAssistantMessage } from "../transform/chatPayload.js";
import { pickReply } from "../services/mockGeminiApi.js";
import { debounce, wait } from "../services/debounce.js";
import { getUserMessage } from "../ui/messages.js";
import { navigateTo } from "../navigation.js";

export function renderChat() {
  const characterId = getSelectedCharacterId();

  // Punto 1: sin personaje seleccionado -> aviso + botón a home
  if (!characterId) {
    renderNoConversation();
    return;
  }

  const rawCharacter = getCharacterById(characterId);
  if (!rawCharacter) {
    renderNoConversation();
    return;
  }

  const profile = toCharacterProfile(rawCharacter);
  let messages = getChatHistory(characterId);

  // Punto 2: primera vez -> arranca con una réplica "enlatada" del personaje
  if (!messages) {
    messages = [{ role: "character", text: pickReply(characterId) }];
    setChatHistory(characterId, messages);
  }
  // Punto 3: si ya existía historial, se usa tal cual (no se toca)

  mountChatView(characterId, profile, messages);
}

function renderNoConversation() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="chat chat--empty">
      <p class="chat__emptyMessage">
        Todavía no has iniciado conversación con ninguno de los personajes.
      </p>
      <button class="chat__backHome" id="backHomeBtn">Volver al inicio</button>
    </section>
  `;

  document.getElementById("backHomeBtn").addEventListener("click", () => {
    navigateTo("/");
  });
}

function mountChatView(characterId, profile, initialMessages) {
  let messages = initialMessages;

  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="chat chat--${characterId}">
      <div class="chat__header">
        <img class="chat__avatar" src="${profile.image}" alt="${profile.name}" />
        <h1 class="chat__name">${profile.name}</h1>
        <button class="chat__clear" id="chatClear" type="button"></button>
      </div>
      <div class="chat__messages" id="chatMessages"></div>
      <form class="chat__form" id="chatForm">
        <input
          class="chat__input"
          id="chatInput"
          type="text"
          placeholder="Escribí un mensaje..."
          autocomplete="off"
        />
        <button class="chat__send" id="chatSend" type="submit">Enviar</button>
      </form>
    </section>
  `;

  const messagesEl = document.getElementById("chatMessages");
  const formEl = document.getElementById("chatForm");
  const inputEl = document.getElementById("chatInput");
  const sendBtn = document.getElementById("chatSend");
  const clearBtn = document.getElementById("chatClear");

  renderMessages(messagesEl, messages, profile.image);

  const handleSend = debounce(async () => {
    const text = inputEl.value.trim();
    if (!text) return;

    messages = appendUserMessage(messages, text);
    setChatHistory(characterId, messages);
    renderMessages(messagesEl, messages, profile.image);

    inputEl.value = "";
    inputEl.disabled = true;
    sendBtn.disabled = true;

    const typingEl = renderTypingIndicator(messagesEl, profile.image);

    try {
      const [replyText] = await Promise.all([
        getCharacterReply(characterId, messages),
        countdown(typingEl, 5),
      ]);

      messages = appendAssistantMessage(messages, replyText);
      setChatHistory(characterId, messages);
    } catch (error) {
      const friendlyMessage = getUserMessage(error);
      messages = appendAssistantMessage(messages, friendlyMessage);
    } finally {
      typingEl.remove();
      renderMessages(messagesEl, messages, profile.image);
      inputEl.disabled = false;
      sendBtn.disabled = false;
      inputEl.focus();
    }
  }, 300);

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSend();
  });

  // Punto 4: vaciar historial y reiniciar el proceso inicial (punto 2)
  clearBtn.addEventListener("click", () => {
        clearChatHistory(characterId);
        messages = [{ role: "character", text: pickReply(characterId) }];
        setChatHistory(characterId, messages);
        renderMessages(messagesEl, messages, profile.image); // ← faltaba profile.image
    });
    }

function renderMessages(container, messages, characterImage) {
  container.innerHTML = messages
    .map((msg) => `
      <div class="chat__message chat__message--${msg.role}">
        ${msg.role === "character" ? `<img class="chat__messageAvatar" src="${characterImage}" alt="" />` : ""}
        <p class="chat__bubble">${msg.text}</p>
      </div>
    `)
    .join("");

  container.scrollTop = container.scrollHeight;
}

function renderTypingIndicator(container, characterImage) {
  const el = document.createElement("div");
  el.className = "chat__message chat__message--character chat__message--typing";
  el.innerHTML = `
    <img class="chat__messageAvatar" src="${characterImage}" alt="" />
    <p class="chat__bubble">Escribiendo... <span class="chat__countdown">5</span></p>
  `;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
  return el;
}

async function countdown(typingEl, seconds) {
  const countdownEl = typingEl.querySelector(".chat__countdown");
  for (let i = seconds; i >= 1; i--) {
    if (countdownEl) countdownEl.textContent = i;
    await wait(1000);
  }
}