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

  const elementoMascota = document.getElementById("mascota-jugador");
  elementoMascota.innerText = mascotaJugador;
  seleccionarMascotaEnemigo();
  const sectionSeleccionarAtaque =
    document.getElementById("seleccionar-ataque");
  sectionSeleccionarAtaque.style.display = "block";
  const sectionSeleccionarMascota = document.getElementById(
    "seleccionar-mascota"
  );
  sectionSeleccionarMascota.style.display = "none";
}

function seleccionarMascotaEnemigo() {
  const mascotas = ["Hipodoge", "Capipepo", "Ratigueya"];
  const seleccion = aleatorio(0, mascotas.length - 1);
  mascotaEnemigo = mascotas[seleccion];

  const elementoMascotaEnemigo = document.getElementById("mascota-enemigo");
  elementoMascotaEnemigo.innerText = mascotaEnemigo;
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
function actualizarVidas() {
  const vidasJugadorEl = document.getElementById("vidas-jugador");
  const vidasEnemigoEl = document.getElementById("vidas-enemigo");
  vidasEnemigoEl.innerText = vidasEnemigo;
  vidasJugadorEl.innerText = vidasJugador;
}
function crearMensajeFinal(mensaje) {
  const elemento = document.createElement("p");
  elemento.innerText = mensaje;
  const mensajes = document.getElementById("mensajes");
  mensajes.appendChild(elemento);
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
  sectionReiniciar.style.display = "block";
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
    actualizarVidas();
  } else {
    resultado = "Perdiste 🤣";
    vidasJugador--;
    actualizarVidas();
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
function ocultarSections() {
  const sectionSeleccionarAtaque =
    document.getElementById("seleccionar-ataque");
  sectionSeleccionarAtaque.style.display = "none";
  const sectionReiniciar = document.getElementById("reiniciar");
  sectionReiniciar.style.display = "none";
}
function configBotones() {
  const botonSeleccionar = document.getElementById("boton-seleccionar");
  botonSeleccionar.addEventListener("click", seleccionarMascota);
  const botonReiniciar = document.getElementById("boton-reiniciar");
  botonReiniciar.addEventListener("click", reiniciar);
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
