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

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

const mokeponesEnemigos = [];
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
let lienzo = mapa.getContext("2d");
let intervalo;
const mapaBackground = new Image();
mapaBackground.src = "./assets/mokemap.png";

class Mokepon {
  constructor(nombre, imagen, vida, imagenMapa, x = 10, y = 10) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.vida = vida;
    this.ataques = [];
    this.x = x;
    this.y = y;
    this.velocidadX = 0;
    this.velocidadY = 0;
    this.ancho = 40;
    this.alto = 40;
    this.mapaImagen = new Image();
    this.mapaImagen.src = imagenMapa || imagen;
  }
  pintar() {
    lienzo.drawImage(this.mapaImagen, this.x, this.y, this.ancho, this.alto);
  }
}

let Hipodoge = new Mokepon(
  "Hipodoge",
  "assets/mokepones/hipodoge_atack.png",
  5,
  "assets/mokepones/hipodoge.png"
);
let Capipepo = new Mokepon(
  "Capipepo",
  "assets/mokepones/capipepo_atack.png",
  5,
  "assets/mokepones/capipepo.png"
);
let Ratigueya = new Mokepon(
  "Ratigueya",
  "assets/mokepones/ratigueya_atack.png",
  5,
  "assets/mokepones/ratigueya.png"
);
const langostelvis = new Mokepon(
  "Langostelvis",
  "assets/mokepones/langostelvis_atack.png",
  7
);
const tucapalma = new Mokepon(
  "Tucapalma",
  "assets/mokepones/tucapalma_atack.png",
  7
);
const pydos = new Mokepon("Pydos", "assets/mokepones/pydos_atack.png", 7);
const hipodogeEnemigo = new Mokepon(
  "Hipodoge",
  "assets/mokepones/hipodoge_atack.png",
  5,
  "assets/mokepones/hipodoge.png",
  80,
  120
);
const capipepoEnemigo = new Mokepon(
  "Capipepo",
  "assets/mokepones/capipepo_atack.png",
  5,
  "assets/mokepones/capipepo.png",
  150,
  95
);
const ratigueyaEnemigo = new Mokepon(
  "Ratigueya",
  "assets/mokepones/ratigueya_atack.png",
  5,
  "assets/mokepones/ratigueya.png",
  200,
  190
);
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
      pintarCanvas();
      //mostrarCombate();
      sectionSeleccionarMascota.style.display = "none";
      configMapa();
      configAtaques();
    }
  });
}
function configMapa() {
  sectionVerMapa.style.display = "flex";
  mapa.width = 320;
  mapa.height = 240;
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener("keydown", sePresionoUnaTecla);
  window.addEventListener("keyup", detenerMovimiento);
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
  sectionMostrarMokepon.style.display = "grid";
}
function ocultarSections() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionReiniciar.style.display = "none";
  sectionMostrarMokepon.style.display = "none";
  mensajes.style.display = "none";
  sectionVerMapa.style.display = "none";
}
function configBotones() {
  botonSeleccionar.addEventListener("click", seleccionarMascota);
  botonReiniciar.addEventListener("click", reiniciar);
}
function pintarCanvas() {
  mascotaJugador.x = mascotaJugador.x + mascotaJugador.velocidadX;
  mascotaJugador.y = mascotaJugador.y + mascotaJugador.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  mascotaJugador.pintar();
  hipodogeEnemigo.pintar();
  capipepoEnemigo.pintar();
  ratigueyaEnemigo.pintar();
}

function moverDerecha() {
  mascotaJugador.velocidadX = 5;
}
function moverIzquierda() {
  mascotaJugador.velocidadX = -5;
}
function moverArriba() {
  mascotaJugador.velocidadY = -5;
}
function moverAbajo() {
  mascotaJugador.velocidadY = 5;
}
function detenerMovimiento() {
  mascotaJugador.velocidadX = 0;
  mascotaJugador.velocidadY = 0;
}
function sePresionoUnaTecla(e) {
  switch (e.key) {
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowDown":
      moverAbajo();
      break;
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "ArrowRight":
      moverDerecha();
      break;
    default:
      break;
  }
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
  ocultarSections();
  configBotones();
}

window.addEventListener("load", main);

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
