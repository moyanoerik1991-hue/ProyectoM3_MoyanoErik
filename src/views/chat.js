export function renderChat() {

    const app = document.getElementById("app");

    app.innerHTML = `
        <section>
            <h1>Chat</h1>

            <div class="messages">
                <div class="message-character">
                    <p>Hola, ¿qué necesitas?</p>
                </div>
            </div>

            <form class="chat-form">
                <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                >

                <button type="submit">
                    Enviar
                </button>
            </form>
        </section>
    `;
}