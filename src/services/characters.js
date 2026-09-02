import { CC_SYSTEM_PROMPT, LELOUCH_SYSTEM_PROMPT, SUZAKU_SYSTEM_PROMPT} from "./prompts.js";

// Este modulo se encarga de guardar los datos de los personajes.

export const CHARACTERS = {
    lelouch: {
        id: "lelouch",
        name: "Lelouch Lamperouge",
        image: "../img/characters/Lelouch.jpg",
        presentation: "Soy Lelouch vi Britannia. Y quien se interponga en mi camino, va a descubrir exactamente de qué soy capaz.",
        systemPrompt: LELOUCH_SYSTEM_PROMPT,
    },
    suzaku: {
        id: "suzaku",
        name: "Suzaku Kururugi",
        image: "../img/characters/Suzaku.jpg",
        presentation: "Soy Suzaku Kururugi, y voy a demostrar que se puede cambiar el mundo sin tener que destruirlo.",
        systemPrompt: SUZAKU_SYSTEM_PROMPT,
    },
    cc: {
        id: "cc",
        name: "C.C.",
        image: "../img/characters/CC.jpg",
        presentation: "He tenido muchos nombres a lo largo de los siglos. Ninguno de ellos te va a servir de nada.",
        systemPrompt: CC_SYSTEM_PROMPT,
    },
};

export const DEFAULT_CHARACTER_ID = "lelouch";