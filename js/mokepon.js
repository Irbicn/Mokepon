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
const ataquesJugador = [];
const ataquesEnemigo = [];
let opcionDeMokepones;
let opcionDeAtaques;
let inputCapipepo;
let inputHipodoge;
let inputRatigueya;
let mascotaJugador;
let mascotaEnemigo;
let resultado = "";
let victoriasJugador = 0;
let victoriasEnemigo = 0;

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
  ataquesEnemigo.push(mascotaEnemigo.ataques[seleccion].nombre);
  iniciarPelea();
}
function iniciarPelea() {
  if (ataquesJugador.length === mascotaJugador.ataques.length) {
    combate();
  }
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
function validarPartida() {
  if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("Felicitaciones Ganaste 🎉🎉🎉");
  } else if (victoriasEnemigo > victoriasJugador) {
    crearMensajeFinal("Perdiste 😂🤣😂");
  } else if (victoriasEnemigo === victoriasJugador) {
    crearMensajeFinal("Empate 🤷‍♀️🤷‍♀️🤷‍♀️");
  }
  sectionReiniciar.style.display = "flex";
}
function combate() {
  for (i = 0; i < ataquesJugador.length; i++) {
    const jugador = ataquesJugador[i];
    const enemigo = ataquesEnemigo[i];
    if (jugador === enemigo) {
      resultado = "empate 🤷‍♀️";
    } else if (
      (jugador === "🔥" && enemigo === "🌱") ||
      (jugador === "🌱" && enemigo === "💧") ||
      (jugador === "💧" && enemigo === "🔥")
    ) {
      resultado = "Ganaste 🎉";
      victoriasJugador++;
    } else {
      resultado = "Perdiste 🤣";
      victoriasEnemigo++;
    }
    crearMensaje(jugador, enemigo);
  }
  validarPartida();
}
function configAtaques() {
  mascotaJugador.ataques.forEach((ataque) => {
    const boton = document.createElement("button");
    boton.innerText = ataque.nombre;
    boton.addEventListener("click", (e) => {
      ataquesJugador.push(ataque.nombre);
      ataqueAleatorioEnemigo();
      e.target.disabled = true;
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
  sectionMostrarMokepon.style.display = "grid";
}
function ocultarSections() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionReiniciar.style.display = "none";
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
