const mensajes = document.getElementById("mensajes");
const ataquesJugadorEl = document.getElementById("ataques-jugador");
const ataquesEnemigoEl = document.getElementById("ataques-enemigo");
const nombreJugadorEl = document.getElementById("nombre-jugador");
const nombreEnemigoEl = document.getElementById("nombre-enemigo");
const victoriasJugadorEl = document.getElementById("victorias-jugador");
const victoriasEnemigoEl = document.getElementById("victorias-enemigo");
const mensajeFinal = document.getElementById("mensaje-final");
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
const langostelvis = new Mokepon(
  "Langostelvis",
  "assets/mokepones/langostelvis.png",
  7
);
const tucapalma = new Mokepon("Tucapalma", "assets/mokepones/tucapalma.png", 7);
const pydos = new Mokepon("Pydos", "assets/mokepones/pydos.png", 7);
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
langostelvis.ataques.push(
  { nombre: "🔥", id: "boton-agua" },
  { nombre: "🔥", id: "boton-agua" },
  { nombre: "🌱", id: "boton-agua" },
  { nombre: "💧", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
);
pydos.ataques.push(
  { nombre: "🌱", id: "boton-agua" },
  { nombre: "🌱", id: "boton-agua" },
  { nombre: "🔥", id: "boton-agua" },
  { nombre: "💧", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
);
tucapalma.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-agua" },
  { nombre: "🌱", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
);

mokepones.push(Hipodoge, Capipepo, Ratigueya, tucapalma, pydos, langostelvis);

function seleccionarMascota() {
  const inputsMascotas = document.getElementsByName("mascota");
  inputsMascotas.forEach((input) => {
    if (input.checked) {
      mascotaJugador = mokepones.find((moke) => moke.nombre === input.id);
      seleccionarMascotaEnemigo();
      mostrarNombres();
      configImagenes();
      mostrarCombate();
      configAtaques();
    }
  });
}
function mostrarNombres() {
  nombreJugadorEl.innerText = mascotaJugador.nombre;
  nombreEnemigoEl.innerText = mascotaEnemigo.nombre;
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
    crearMensajes();
    mensajes.style.display = "grid";
  }
}
function crearMensajes(jugador, enemigo) {
  victoriasJugadorEl.innerText = victoriasJugador;
  victoriasEnemigoEl.innerText = victoriasEnemigo;
  for (let i = 0; i < ataquesJugador.length; i++) {
    ataquesJugadorEl.innerHTML += `<p>${ataquesJugador[i]}</p>`;
    ataquesEnemigoEl.innerHTML += `<p>${ataquesEnemigo[i]}</p>`;
  }
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
  }
  validarPartida();
}
function configAtaques() {
  mascotaJugador.ataques.forEach((ataque) => {
    const boton = document.createElement("button");
    boton.className = "boton-de-ataque";
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
  mensajes.style.display = "none";
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
