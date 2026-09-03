import { describe, expect, it } from "vitest";
import { normalizeAIResponse, buildPayload, getTrimmedHistory } from "../src/transform/chatPayload";

// test del funcionamiento de normalizeAIResponse
describe("normalizeAIResponse", () => {
    it("deberia devolver string vacio cuando la respuesta es invalida", () => {
        // Caso 1: respuesta es null
        expect(normalizeAIResponse(null)).toBe("");

        // Caso 2: candidates no existe
        expect(normalizeAIResponse({})).toBe("");

        // Caso 3: candidates es array vacio
        expect(normalizeAIResponse({ candidates: [] })).toBe("");

        // Caso 4: parts es array vacio
        expect(
            normalizeAIResponse({
                candidates: [{ content: { parts: [] }}],
            }),
        ).toBe("");

        // Caso 5: parts tiene objetos sin text valido
        expect(
            normalizeAIResponse({
                candidates: [{ content: { parts: [{ notText: "x"}, null, {text: 123}]  }}],
            }),
        ).toBe("");
    });
});

// test del funcionamiento de buildPayload
describe("buildPayload", () => {
    it("deberia construir el shape correcto para Gemini", () => {
        const systemPrompt = "Sos Lelouch";
        const uiMessages = [
            { role: "user", text: "hola"},
            { role: "character", text: "tienes mucho tiempo libre"},
        ];
        
        const payload = buildPayload({ systemPrompt, uiMessages});

        expect(payload).toEqual({
            model: "gemini-flash-lite-latest",
            systemInstruction: { parts: [{ text: "Sos Lelouch" }] },
            contents: [
                { role: "user", parts: [{ text: "hola"  }] },
                { role: "model", parts: [{ text: "tienes mucho tiempo libre" }] },
            ],
            generationConfig: {
                maxOutputTokens: 200,
                temperature: 0.7,
            },
        });
    });
});

// test del funcionamiento de getTrimmedHistory
describe("getTrimmedHistory", () => {
    it("deberia devolver los ultimos N mensajes cuando hay mas que el limite", () => {
        const messages = Array.from({ length: 15 }, (_, i) => ({
            role: "user",
            text: `mensaje ${i + 1}`,
        }));
        
        const trimmed = getTrimmedHistory(messages, 12);

        expect(trimmed).toHaveLength(12);
        expect(trimmed[0].text).toBe("mensaje 4");
        expect(trimmed[11].text).toBe("mensaje 15");
    });

    it("deberia devolver el historial completo si tiene menos que el limite", () => {
        const messages = [
            { role: "user", text: "a"},
            { role: "character", text: "b" },
            { role: "user", text: "c" },
        ];
        
        const trimmed = getTrimmedHistory(messages, 12);
        
        expect(trimmed).toHaveLength(3);
        expect(trimmed).toEqual(messages);
    });
});