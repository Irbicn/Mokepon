const hipodoge = document.getElementById("hipodoge");
const capipepo = document.getElementById("capipepo");
const ratigueya = document.getElementById("ratigueya");
const mensajes = document.getElementById("mensajes");
const mensajeFinal = document.getElementById("mensaje-final");
const vidasJugadorEl = document.getElementById("vidas-jugador");
const vidasEnemigoEl = document.getElementById("vidas-enemigo");
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionSeleccionarMascota = document.getElementById(
  "seleccionar-mascota"
);
const sectionVidas = document.getElementById("vidas");
const sectionMostrarMokepon = document.getElementById("mostrar-mokepon");
const sectionReiniciar = document.getElementById("reiniciar");
const botonSeleccionar = document.getElementById("boton-seleccionar");
const botonReiniciar = document.getElementById("boton-reiniciar");
const imagenJugador = document.getElementById("imagen-jugador");
const imagenEnemigo = document.getElementById("imagen-enemigo");
const botonFuego = document.getElementById("boton-fuego");
const botonTierra = document.getElementById("boton-tierra");
const botonAgua = document.getElementById("boton-agua");

const mokepones = [];
let mascotaJugador = "";
let mascotaEnemigo = "";
let ataqueEnemigo = "";
let ataqueJugador = "";
let resultado = "";
let vidasJugador = 3;
let vidasEnemigo = 3;
let finalizado = false;

class Mokepon {
  constructor(nombre, imagen, vida) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.vida = vida;
    this.ataques = [];
  }
}

let Hipodoge = new Mokepon("Hipodoge", "assets/mokepones/hipodoge.png", 5);
let Capipepo = new Mokepon("Capipepo", "assets/mokepones/capipepo.png", 5);
let Ratigueya = new Mokepon("Ratigueya", "assets/mokepones/ratigueya.png", 5);

Hipodoge.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
);
Capipepo.ataques.push(
  { nombre: "🌱", id: "boton-agua" },
  { nombre: "🌱", id: "boton-agua" },
  { nombre: "🌱", id: "boton-agua" },
  { nombre: "💧", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-tierra" }
);
Ratigueya.ataques.push(
  { nombre: "🔥", id: "boton-agua" },
  { nombre: "🔥", id: "boton-agua" },
  { nombre: "🔥", id: "boton-agua" },
  { nombre: "💧", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
);

function seleccionarMascota() {
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
  const elemento = document.createElement("p");
  const mensaje = `tu mascota ${mascotaJugador} ataco con ${ataqueJugador.toUpperCase()}, 
  la mascota ${mascotaEnemigo} de tu enemigo ataco con ${ataqueEnemigo.toUpperCase()}, ${resultado}`;
  elemento.innerText = mensaje;
  mensajes.appendChild(elemento);
}
function crearMensajeFinal(mensaje) {
  mensajeFinal.innerText = mensaje;
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
  sectionReiniciar.style.display = "flex";
}
function ataque() {
  if (finalizado) {
    return;
  }
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
  sectionSeleccionarAtaque.style.display = "block";
  sectionSeleccionarMascota.style.display = "none";
  sectionVidas.style.display = "flex";
  sectionMostrarMokepon.style.display = "grid";
}
function ocultarSections() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionReiniciar.style.display = "none";
  sectionVidas.style.display = "none";
  sectionMostrarMokepon.style.display = "none";
}
function configBotones() {
  botonSeleccionar.addEventListener("click", seleccionarMascota);
  botonReiniciar.addEventListener("click", reiniciar);
}
function configImagenes() {
  imagenJugador.src = `./assets/${mascotaJugador}.png`;
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
