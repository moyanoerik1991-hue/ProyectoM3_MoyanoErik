// Este modulo se encarga de realizar la busqueda de personajes
import { CHARACTERS } from "./characters.js";

export function getCharacterById(characterId) {
  return CHARACTERS[characterId] ?? null;
}

export function toCharacterProfile(rawCharacter) {
    const { id, name, image, presentation, description } = rawCharacter;

    return {
        id,
        name: name ?? "Desconocido",
        image: image ?? "",
        presentation: presentation ?? "",
        description: description ?? "",
    };
}