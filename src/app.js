const home = document.getElementById("home");
const chat = document.getElementById("chat");
const about = document.getElementById("about");

const btnHome = document.getElementById("btn-home");
const btnChat = document.getElementById("btn-chat");
const btnAbout = document.getElementById("btn-about");


function mostrarSeccion(seccion) {

    home.classList.add("hidden");
    chat.classList.add("hidden");
    about.classList.add("hidden");

    seccion.classList.remove("hidden");
}


btnHome.addEventListener("click", () => {
    mostrarSeccion(home);
});

btnChat.addEventListener("click", () => {
    mostrarSeccion(chat);
});

btnAbout.addEventListener("click", () => {
    mostrarSeccion(about);
});


/* Vista inicial */
mostrarSeccion(home);