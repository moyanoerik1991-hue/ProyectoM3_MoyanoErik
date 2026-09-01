export function renderNotFound() {

    const app = document.getElementById("app");

    app.innerHTML = `
        <h1>404</h1>
        <p>La página que buscas no existe.</p>
    `;
}