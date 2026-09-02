// Este modulo se encarga de realizar la busqueda de personajes
import { CHARACTERS } from "./characters.js";

export function getCharacterById(characterId) {
  return CHARACTERS[characterId] ?? null;
}