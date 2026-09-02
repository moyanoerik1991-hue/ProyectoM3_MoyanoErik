const CANNED_REPLIES = {
    lelouch: [
        "¿Qué te trae por aquí? Espero que no me hagas perder el tiempo.",
        "Interesante... no esperaba compañía. Bien, tenés mi atención, por ahora.",
        "Antes de que digas nada, dejame advertirte: no me gusta que me subestimen.",
    ],
    suzaku: [
        "Hola, ¿cómo estás? Espero que estés bien.",
        "Hola, ¿todo bien? te noto algo pensativo.",
        "Oh! estoy de camino al entrenamiento, pero puedo hacer una pausa para hablar un momento.",
    ],
    cc: [
        "Mmm... ¿viniste a hablar o viniste a traerme pizza?",
        "No esperaba visitas. Espero que valga la pena la interrupción.",
        "Te veo dando muchas vueltas, ¿acaso quieres hablarme?.",
    ],
};

export function pickReply(character) {
    const options = CANNED_REPLIES[character] ?? [];

    if (options.length === 0) {
        return "No tengo un diálogo disponible para ese personaje.";
    }

    return options[Math.floor(Math.random() * options.length)];
}

function buildOkResponse(replyText, inputTokens) {
  const outputTokens = Math.ceil(replyText.length / 4);

  return {
    candidates: [
      {
        content: {
          parts: [{ text: replyText }],
          role: "model",
        },
        finishReason: "STOP",
      },
    ],
    usageMetadata: {
      promptTokenCount: inputTokens,
      candidatesTokenCount: outputTokens,
      totalTokenCount: inputTokens + outputTokens,
    },
  };
}

function estimateInputTokens(payload) {
  const systemText = payload.systemInstruction?.parts?.[0]?.text ?? "";
  const messagesText = (payload.contents ?? [])
    .flatMap((c) => c.parts ?? [])
    .map((p) => p.text ?? "")
    .join(" ");
  return Math.ceil((systemText.length + messagesText.length) / 4);
}

const RATE_LIMIT_PROBABILITY = 0.3;

function buildRateLimitError() {
  const err = new Error("Rate limit exceeded");
  err.status = 429;
  err.retryAfterSeconds = 5;
  return err;
}

export function send(payload) {
  return new Promise((resolve, reject) => {
    const delay = 600 + Math.random() * 1000;
    setTimeout(() => {
      // Simulamos 429 con probabilidad controlada.
      if (Math.random() < RATE_LIMIT_PROBABILITY) {
        reject(buildRateLimitError());
        return;
      }
      const inputTokens = estimateInputTokens(payload);
      const reply = pickReply(payload.character);
      resolve(buildOkResponse(reply, inputTokens));
    }, delay);
  });
}