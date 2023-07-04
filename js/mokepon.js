let mascotaJugador = "";
let mascotaEnemigo = "";
let ataqueEnemigo = "";
let ataqueJugador = "";
let resultado = "";
let vidasJugador = 3;
let vidasEnemigo = 3;
let finalizado = false;

function seleccionarMascota() {
  const hipodoge = document.getElementById("hipodoge");
  const capipepo = document.getElementById("capipepo");
  const ratigueya = document.getElementById("ratigueya");

  mascotaJugador = "";

  if (hipodoge.checked) {
    mascotaJugador = "Hipodoge";
  } else if (capipepo.checked) {
    mascotaJugador = "Capipepo";
  } else if (ratigueya.checked) {
    mascotaJugador = "Ratigueya";
  } else {
    return;
  }

  seleccionarMascotaEnemigo();
  configImagenes();
  mostrarCombate();
}

function seleccionarMascotaEnemigo() {
  const mascotas = ["Hipodoge", "Capipepo", "Ratigueya"];
  const seleccion = aleatorio(0, mascotas.length - 1);
  mascotaEnemigo = mascotas[seleccion];
}

function ataqueAleatorioEnemigo() {
  const ataques = ["fuego", "tierra", "agua"];
  ataqueEnemigo = ataques[aleatorio(0, ataques.length - 1)];
}
function crearMensaje() {
  const mensaje = `tu mascota ${mascotaJugador} ataco con ${ataqueJugador.toUpperCase()}, 
  la mascota ${mascotaEnemigo} de tu enemigo ataco con ${ataqueEnemigo.toUpperCase()}, ${resultado}`;
  const elemento = document.createElement("p");
  elemento.innerText = mensaje;
  const mensajes = document.getElementById("mensajes");
  mensajes.appendChild(elemento);
}
function crearMensajeFinal(mensaje) {
  const elemento = document.getElementById("mensaje-final");
  elemento.innerText = mensaje;
}
function revisarVidas() {
  if (vidasEnemigo > 0 && vidasJugador > 0) {
    return;
  }
  if (vidasEnemigo <= 0) {
    crearMensajeFinal("Felicitaciones Ganaste 🎉🎉🎉");
    finalizado = true;
    desabilitarBotones();
  } else if (vidasJugador <= 0) {
    crearMensajeFinal("Perdiste 😂🤣😂");
    finalizado = true;
    desabilitarBotones();
  }
  const sectionReiniciar = document.getElementById("reiniciar");
  sectionReiniciar.style.display = "flex";
}
function ataque() {
  if (finalizado) {
    return;
  }
  const vidasJugadorEl = document.getElementById("vidas-jugador");
  const vidasEnemigoEl = document.getElementById("vidas-enemigo");
  ataqueAleatorioEnemigo();
  const jugador = ataqueJugador;
  const enemigo = ataqueEnemigo;

  if (jugador === enemigo) {
    resultado = "empate 🤷‍♀️";
  } else if (
    (jugador === "fuego" && enemigo === "tierra") ||
    (jugador === "tierra" && enemigo === "agua") ||
    (jugador === "agua" && enemigo === "fuego")
  ) {
    resultado = "Ganaste 🎉";
    vidasEnemigo--;
    vidasEnemigoEl.firstChild.remove();
  } else {
    resultado = "Perdiste 🤣";
    vidasJugador--;
    vidasJugadorEl.firstChild.remove();
  }
  crearMensaje();
  revisarVidas();
}
function desabilitarBotones() {
  const botonFuego = document.getElementById("boton-fuego");
  const botonTierra = document.getElementById("boton-tierra");
  const botonAgua = document.getElementById("boton-agua");
  botonFuego.disabled = true;
  botonTierra.disabled = true;
  botonAgua.disabled = true;
}
function configAtaques() {
  const botonFuego = document.getElementById("boton-fuego");
  const botonTierra = document.getElementById("boton-tierra");
  const botonAgua = document.getElementById("boton-agua");
  botonAgua.addEventListener("click", () => {
    ataqueJugador = "agua";
    ataque();
  });
  botonTierra.addEventListener("click", () => {
    ataqueJugador = "tierra";
    ataque();
  });
  botonFuego.addEventListener("click", () => {
    ataqueJugador = "fuego";
    ataque();
  });
}
function reiniciar() {
  location.reload();
}
function mostrarCombate() {
  const sectionSeleccionarAtaque =
    document.getElementById("seleccionar-ataque");
  sectionSeleccionarAtaque.style.display = "block";
  const sectionSeleccionarMascota = document.getElementById(
    "seleccionar-mascota"
  );
  sectionSeleccionarMascota.style.display = "none";
  const sectionVidas = document.getElementById("vidas");
  sectionVidas.style.display = "flex";
  const sectionMostrarMokepon = document.getElementById("mostrar-mokepon");
  sectionMostrarMokepon.style.display = "grid";
}
function ocultarSections() {
  const sectionSeleccionarAtaque =
    document.getElementById("seleccionar-ataque");
  sectionSeleccionarAtaque.style.display = "none";
  const sectionReiniciar = document.getElementById("reiniciar");
  sectionReiniciar.style.display = "none";
  const sectionVidas = document.getElementById("vidas");
  sectionVidas.style.display = "none";
  const sectionMostrarMokepon = document.getElementById("mostrar-mokepon");
  sectionMostrarMokepon.style.display = "none";
}
function configBotones() {
  const botonSeleccionar = document.getElementById("boton-seleccionar");
  botonSeleccionar.addEventListener("click", seleccionarMascota);
  const botonReiniciar = document.getElementById("boton-reiniciar");
  botonReiniciar.addEventListener("click", reiniciar);
}
function configImagenes() {
  const imagenJugador = document.getElementById("imagen-jugador");
  imagenJugador.src = `./assets/${mascotaJugador}.png`;
  const imagenEnemigo = document.getElementById("imagen-enemigo");
  imagenEnemigo.src = `./assets/${mascotaEnemigo}.png`;
}
function main() {
  ocultarSections();
  configBotones();
  configAtaques();
}

window.addEventListener("load", main);

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
