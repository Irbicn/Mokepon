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
const botonesAtaque = document.getElementById("botones-ataque");
const contenedorMascotas = document.getElementById("contenedor-mascotas");

const mokepones = [];
let opcionDeMokepones;
let opcionDeAtaques;
let inputCapipepo;
let inputHipodoge;
let inputRatigueya;
let mascotaJugador;
let mascotaEnemigo;
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

mokepones.push(Hipodoge, Capipepo, Ratigueya);

function seleccionarMascota() {
  mascotaJugador = "";

  if (inputHipodoge.checked) {
    mascotaJugador = mokepones.find((moke) => moke.nombre === inputHipodoge.id);
  } else if (inputCapipepo.checked) {
    mascotaJugador = mokepones.find((moke) => moke.nombre === inputCapipepo.id);
  } else if (inputRatigueya.checked) {
    mascotaJugador = mokepones.find(
      (moke) => moke.nombre === inputRatigueya.id
    );
  } else {
    return;
  }

  seleccionarMascotaEnemigo();
  configImagenes();
  mostrarCombate();
  configAtaques();
}
function seleccionarMascotaEnemigo() {
  const seleccion = aleatorio(0, mokepones.length - 1);
  mascotaEnemigo = mokepones[seleccion];
}
function ataqueAleatorioEnemigo() {
  const seleccion = aleatorio(0, mascotaEnemigo.ataques.length - 1);
  return mascotaEnemigo.ataques[seleccion].nombre;
}
function crearMensaje(jugador, enemigo) {
  const elemento = document.createElement("p");
  const mensaje = `tu mascota ${mascotaJugador.nombre} ataco con ${jugador}, 
  la mascota ${mascotaEnemigo.nombre} de tu enemigo ataco con ${enemigo}, ${resultado}`;
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
function lanzarAtaque(ataque) {
  if (finalizado) {
    return;
  }

  const jugador = ataque;
  const enemigo = ataqueAleatorioEnemigo();
  if (jugador === enemigo) {
    resultado = "empate 🤷‍♀️";
  } else if (
    (jugador === "🔥" && enemigo === "🌱") ||
    (jugador === "🌱" && enemigo === "💧") ||
    (jugador === "💧" && enemigo === "🔥")
  ) {
    resultado = "Ganaste 🎉";
    vidasEnemigo--;
    vidasEnemigoEl.firstChild.remove();
  } else {
    resultado = "Perdiste 🤣";
    vidasJugador--;
    vidasJugadorEl.firstChild.remove();
  }
  crearMensaje(jugador, enemigo);
  revisarVidas();
}
function desabilitarBotones() {
  const botones = botonesAtaque.children;
  for (let i = 0; i < botones.length; i++) {
    botones[i].disabled = true;
  }
}
function configAtaques() {
  mascotaJugador.ataques.forEach((ataque) => {
    const boton = document.createElement("button");
    boton.id = ataque.id;
    boton.innerText = ataque.nombre;
    boton.addEventListener("click", () => {
      lanzarAtaque(ataque.nombre);
    });
    botonesAtaque.appendChild(boton);
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
  imagenJugador.src = mascotaJugador.imagen;
  imagenEnemigo.src = mascotaEnemigo.imagen;
}
function main() {
  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
    <label for="${mokepon.nombre}" class="tarjeta-mascota">
      <p>${mokepon.nombre}</p>
      <div style="background-image: url(${mokepon.imagen})">
        <input type="radio" name="mascota" id="${mokepon.nombre}" />
      </div>
    </label>
    `;
    contenedorMascotas.innerHTML += opcionDeMokepones;
  });
  inputCapipepo = document.getElementById("Capipepo");
  inputHipodoge = document.getElementById("Hipodoge");
  inputRatigueya = document.getElementById("Ratigueya");
  ocultarSections();
  configBotones();
}

window.addEventListener("load", main);

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
