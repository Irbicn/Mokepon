import config from "./config.js";

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

let mokeponesEnemigos = [];
const mokepones = [];
const ataquesJugador = [];
let ataquesEnemigo = [];
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
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 350;
let jugadorId = null;
let enemigoId = null;

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = (anchoDelMapa * 600) / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon {
  constructor(nombre, imagen, vida, imagenMapa, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.velocidadX = 0;
    this.velocidadY = 0;
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

const ATAQUES = {
  hipodoge: [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" },
  ],
  capipepo: [
    { nombre: "🌱", id: "boton-agua" },
    { nombre: "🌱", id: "boton-agua" },
    { nombre: "🌱", id: "boton-agua" },
    { nombre: "💧", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-tierra" },
  ],
  ratigueya: [
    { nombre: "🔥", id: "boton-agua" },
    { nombre: "🔥", id: "boton-agua" },
    { nombre: "🔥", id: "boton-agua" },
    { nombre: "💧", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" },
  ],
  langostelvis: [
    { nombre: "🔥", id: "boton-agua" },
    { nombre: "🔥", id: "boton-agua" },
    { nombre: "🌱", id: "boton-agua" },
    { nombre: "💧", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" },
  ],
  pydos: [
    { nombre: "🌱", id: "boton-agua" },
    { nombre: "🌱", id: "boton-agua" },
    { nombre: "🔥", id: "boton-agua" },
    { nombre: "💧", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" },
  ],
  tucapalma: [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-agua" },
    { nombre: "🌱", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" },
  ],
};
Hipodoge.ataques.push(...ATAQUES.hipodoge);
Capipepo.ataques.push(...ATAQUES.capipepo);
Ratigueya.ataques.push(...ATAQUES.ratigueya);
langostelvis.ataques.push(...ATAQUES.langostelvis);
pydos.ataques.push(...ATAQUES.pydos);
tucapalma.ataques.push(...ATAQUES.tucapalma);

mokepones.push(Hipodoge, Capipepo, Ratigueya, tucapalma, pydos, langostelvis);

function seleccionarMascota() {
  const inputsMascotas = document.getElementsByName("mascota");
  inputsMascotas.forEach((input) => {
    if (input.checked) {
      mascotaJugador = mokepones.find((moke) => moke.nombre === input.id);
      pintarCanvas();
      //mostrarCombate();
      sectionSeleccionarMascota.style.display = "none";
      configMapa();
      configAtaques();
      seleccionarMokepon(mascotaJugador);
    }
  });
}
function configMapa() {
  sectionVerMapa.style.display = "flex";
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener("keydown", sePresionoUnaTecla);
  window.addEventListener("keyup", detenerMovimiento);
}
function mostrarNombres() {
  nombreJugadorEl.innerText = mascotaJugador.nombre;
  nombreEnemigoEl.innerText = mascotaEnemigo.nombre;
}
function seleccionarMascotaEnemigo(enemigo) {
  mascotaEnemigo = mokepones.find((moke) => moke.nombre === enemigo.nombre);
}

function iniciarPelea() {
  combate();
  mostrarNombres();
  crearMensajes();
  mensajes.style.display = "grid";
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
      e.target.disabled = true;
      if (ataquesJugador.length === 5) {
        enviarAtaques();
      }
    });
    botonesAtaque.appendChild(boton);
  });
}
function reiniciar() {
  location.reload();
}
function configImagenes() {
  imagenJugador.src = mascotaJugador.imagen;
  imagenEnemigo.src = mascotaEnemigo.imagen;
}
function mostrarCombate() {
  sectionVerMapa.style.display = "none";
  configImagenes();
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

  enviarPosicion(mascotaJugador.x, mascotaJugador.y);
  mokeponesEnemigos.forEach((mokepon) => {
    revisarColision(mokepon);
    mokepon.pintar();
  });
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
function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const izquierdaEnemigo = enemigo.x;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const arribaMascota = mascotaJugador.y;
  const abajoMascota = mascotaJugador.y + mascotaJugador.alto;
  const izquierdaMascota = mascotaJugador.x;
  const derechaMascota = mascotaJugador.x + mascotaJugador.ancho;
  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }
  enemigoId = enemigo.id;
  clearInterval(intervalo);
  detenerMovimiento();
  seleccionarMascotaEnemigo(enemigo);
  mostrarCombate();
}
function unirseAlJuego() {
  fetch(`http://${config.hostname}:${config.port}/unirse`).then((res) => {
    if (res.ok) {
      res.text().then((respuesta) => {
        jugadorId = respuesta;
      });
    }
  });
}
function seleccionarMokepon() {
  fetch(`http://${config.hostname}:${config.port}/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mokepon: mascotaJugador.nombre,
    }),
  });
}
function enviarPosicion(x, y) {
  fetch(
    `http://${config.hostname}:${config.port}/mokepon/${jugadorId}/posicion`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        x,
        y,
      }),
    }
  ).then((res) => {
    if (res.ok) {
      res.json().then(({ enemigos }) => {
        mokeponesEnemigos = enemigos.map((enemigo) => {
          const mokeponNombre = enemigo.mokepon?.nombre;
          const mokeponEnemigo = new Mokepon(
            mokeponNombre,
            `assets/mokepones/${mokeponNombre.toLowerCase()}_atack.png`,
            5,
            `assets/mokepones/${mokeponNombre.toLowerCase()}_atack.png`,
            enemigo.id
          );
          mokeponEnemigo.x = enemigo.x;
          mokeponEnemigo.y = enemigo.y;
          return mokeponEnemigo;
        });
      });
    }
  });
}
function enviarAtaques() {
  fetch(
    `http://${config.hostname}:${config.port}/mokepon/${jugadorId}/ataques`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ataques: ataquesJugador,
      }),
    }
  );

  intervalo = setInterval(obtenerAtaques, 50);
}
function obtenerAtaques() {
  fetch(
    `http://${config.hostname}:${config.port}/mokepon/${enemigoId}/ataques`
  ).then((res) => {
    if (res.ok) {
      res.json().then(({ ataques }) => {
        console.log(ataques);
        if (ataques.length === 5) {
          ataquesEnemigo = ataques;
          iniciarPelea();
          clearInterval(intervalo);
        }
      });
    }
  });
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
  unirseAlJuego();
}

window.addEventListener("load", main);

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
