import { CC_SYSTEM_PROMPT, LELOUCH_SYSTEM_PROMPT, SUZAKU_SYSTEM_PROMPT} from "./prompts.js";

// Este modulo se encarga de guardar los datos de los personajes.

export const CHARACTERS = {
    lelouch: {
        id: "lelouch",
        name: "Lelouch Lamperouge",
        image: "./src/img/characters/Lelouch.jpg",
        presentation: "Quien se interponga en mi camino, va a descubrir exactamente de qué soy capaz.",
        description: "El protagonista principal, un príncipe exiliado del Imperio de Britannia que obtiene el poder del Geass (la habilidad de ordenar absoluta obediencia) y se convierte en el líder enmascarado conocido como Zero, liderando una rebelión contra el imperio que gobierna Japón.",
        systemPrompt: LELOUCH_SYSTEM_PROMPT,
    },
    suzaku: {
        id: "suzaku",
        name: "Suzaku Kururugi",
        image: "./src/img/characters/Suzaku.jpg",
        presentation: "Voy a demostrar que se puede cambiar el mundo sin tener que destruirlo.",
        description: "El mejor amigo de la infancia de Lelouch, un joven japonés que, a pesar de la ocupación de su país, decide unirse al ejército de Britannia con la creencia de que puede cambiar el sistema desde dentro. Su amistad con Lelouch se vuelve cada vez más conflictiva a medida que ambos terminan en bandos opuestos.",
        systemPrompt: SUZAKU_SYSTEM_PROMPT,
    },
    cc: {
        id: "cc",
        name: "C.C.",
        image: "./src/img/characters/CC.jpg",
        presentation: "He tenido muchos nombres a lo largo de los siglos. Ninguno de ellos te va a servir de nada.",
        description: "Una misteriosa joven de aspecto inmortal que le otorga a Lelouch su poder de Geass al inicio de la serie. Se convierte en su compañera constante y guarda muchos secretos sobre el origen y la naturaleza del Geass.",
        systemPrompt: CC_SYSTEM_PROMPT,
    },
};

export const DEFAULT_CHARACTER_ID = "lelouch";