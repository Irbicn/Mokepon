let mascotaJugador = "";
let mascotaEnemigo = "";
let ataqueEnemigo = "";
let ataqueJugador = "";
let resultado = "";

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
  }

  const elementoMascota = document.getElementById("mascota-jugador");
  elementoMascota.innerText = mascotaJugador;
  seleccionarMascotaEnemigo();
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
function ataque(jugador) {
  const enemigo = ataqueAleatorioEnemigo();

  if (jugador === enemigo) {
    resultado = "empate 🤷‍♀️";
  } else if (
    (jugador === "fuego" && enemigo === "tierra") ||
    (jugador === "tierra" && enemigo === "agua") ||
    (jugador === "agua" && enemigo === "fuego")
  ) {
    resultado = "Ganaste 🎉";
  } else {
    resultado = "Perdiste 🤣";
  }

  crearMensaje();
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

function main() {
  const botonSeleccionar = document.getElementById("boton-seleccionar");
  botonSeleccionar.addEventListener("click", seleccionarMascota);
  configAtaques();
}

window.addEventListener("load", main);

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
