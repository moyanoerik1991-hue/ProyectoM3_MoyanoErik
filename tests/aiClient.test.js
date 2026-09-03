import { describe, it, expect, beforeEach, vi } from "vitest";
import { getCharacterReply } from "../src/services/aiClient";

describe("aiClient.getCharacterReply", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    it("deberia llamar a /api/gemini con POST y devolver el texto normalizado", async () => {
        const fakeGeminiResponse = {
            candidates: [
                {
                    content: { parts: [{ text: "Desearia tener algo de Pizza" }] },
                    finishReason: "STOP",
                },
            ],
            usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 5 },
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => fakeGeminiResponse,
        });

        const uiMessages = [{ role: "user", text: "hola" }];
        
        // nota: el characterID no se importa solo, debo seleccionar uno manualmente.
        const text = await getCharacterReply("cc", uiMessages);

        expect(text).toBe("Desearia tener algo de Pizza");

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            "/api/gemini",
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }),
        );
    });

    it("deberia adjuntar retryAfterSeconds al error cuando la API responde 429", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 429,
            statusText: "Too Many Requests",
            json: async () => ({
                error: "Rate Limit Exceeded",
                retryAfterSecond: 30
            }),
        })        
    });
});