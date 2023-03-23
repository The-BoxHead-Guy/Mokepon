// Selecting the pet
const buttonPetPlayer = document.getElementById("Select-Mascota");

// Selecting the attack
const buttonFuego = document.getElementById("btn-Fuego");
const buttonAgua = document.getElementById("btn-Agua");
const buttonTierra = document.getElementById("btn-Tierra");

// Resetting game
const buttonReset = document.getElementById("boton-reinicio");

// Hidden Section
const hiddenSection = document.getElementById("Seleccionar-Ataque");
const hiddenSectionReset = document.getElementById("Reiniciar");
const hiddenSectionPetMessages = document.getElementById("pet-messages");

// Changing the DOM
const selectMascotaJugador = document.getElementById("select-mascota");
const selectMascotaEnemigo = document.getElementById("select-mascota-enemigo");
const attackPlayerMessage = document.getElementById("attack-player");
const attackEnemyMessage = document.getElementById("attack-enemy");

// Player & enemy lifes
const petPLayerLife = document.getElementById("vidas-jugador");
const petEnemyLife = document.getElementById("vidas-enemigo");

// Attack section
const spanPlayerAttack = document.getElementById("player-attack");
const spanEnemyAttack = document.getElementById("enemy-attack");
const hidePetSection = document.getElementById("Seleccionar-Mascota");
const showAttackSection = document.getElementById("Seleccionar-Ataque");
const showSectionPetMessages = document.getElementById("pet-messages");
const showMessage = document.getElementById("Result");

// Container Cards & attacks
const containerCards = document.getElementById("containerCards");
const containerAttacks = document.getElementById("containerAttacks");

// Canvas
const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");
let myMokepon;
let mapBackground = new Image();
mapBackground.src = "./assets/mokemap.png";
let lienzo = mapa.getContext("2d");
let interval;
let heightMap;
let widthMap = window.innerWidth - 20;
const maxWidthMap = 350;

if (widthMap > maxWidthMap) {
  widthMap = maxWidthMap;
}

heightMap = (widthMap * 600) / 800;

mapa.width = widthMap;
mapa.height = heightMap;

// Attacks
const fireAttack = "Fuego 🔥";
const waterAttack = "Agua 🌊";
const earthAttack = "Tierra 🌍";

// Saving player pets variables
let inputPikachu;
let inputCharmander;
let inputPickle;

// Attacks arrays
let ataqueJugador = [];
let ataqueEnemigo = [];
let attackMessagePlayer;
let attackMessageEnemy;

// Players lifes
let vidasJugador = 3;
let vidasEnemigo = 3;
let victoriesPlayer = 0;
let victoriesEnemy = 0;

// Variable to save HTML changes of the pet
let mokeponOption = 0;

// Pet information
let playerId = null
let mascotaJugador;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let indexAtaqueJugador = [];
let indexAtaqueEnemigo = [];
let attackResults;

// Buttoms
let fireAttackButtom;
let waterAttackButtom;
let earthAttackButtom;
let botones = [];

// Arrays
let Mokepones = [];

// Enemy's chose
let randomSelect;
let typeAttack;

/* Creating a class as well as an object named "Mokepon" */
class Mokepon {
  constructor(name, photo, victories, pet, mapPhoto) {
    this.name = name;
    this.photo = photo;
    this.victories = victories;
    this.pet = pet;
    this.ataques = [];

    // Canva
    this.width = 50;
    this.height = 50;
    this.x = random(0, mapa.width - this.width);
    this.y = random(0, mapa.height - this.height);
    this.mapPhoto = new Image();
    this.mapPhoto.src = mapPhoto;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepon() {
    lienzo.drawImage(this.mapPhoto, this.x, this.y, this.width, this.height);
  }
}

/* Creating the objects (Mokepons) */
let pikachu = new Mokepon(
  "Pikachu",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  0,
  "pet1",
  "./assets/Pikachu.png"
);
let charmander = new Mokepon(
  "Charmander",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  0,
  "pet2",
  "./assets/Charmander.png"
);
let pickle = new Mokepon(
  "Pickle",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  0,
  "pet3",
  "./assets/Pickle.png"
);
let pikachuEnemigo = new Mokepon(
  "Pikachu",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  0,
  "pet1",
  "./assets/Pikachu.png"
);
let charmanderEnemigo = new Mokepon(
  "Charmander",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  0,
  "pet2",
  "./assets/Charmander.png"
);
let pickleEnemigo = new Mokepon(
  "Pickle",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  0,
  "pet3",
  "./assets/Pickle.png"
);

/* Then, we need to push the information into an array */
Mokepones.push(pikachu, charmander, pickle);

// Using "push" to generate the attacks
pikachu.ataques.push(
  { name: "Agua 🌊", id: "btn-Agua" },
  { name: "Agua 🌊", id: "btn-Agua" },
  { name: "Agua 🌊", id: "btn-Agua" },
  { name: "Tierra 🌍", id: "btn-Tierra" },
  { name: "Fuego 🔥", id: "btn-Fuego" }
);
charmander.ataques.push(
  { name: "Fuego 🔥", id: "btn-Fuego" },
  { name: "Fuego 🔥", id: "btn-Fuego" },
  { name: "Fuego 🔥", id: "btn-Fuego" },
  { name: "Tierra 🌍", id: "btn-Tierra" },
  { name: "Agua 🌊", id: "btn-Agua" }
);
pickle.ataques.push(
  { name: "Tierra 🌍", id: "btn-Tierra" },
  { name: "Tierra 🌍", id: "btn-Tierra" },
  { name: "Tierra 🌍", id: "btn-Tierra" },
  { name: "Agua 🌊", id: "btn-Agua" },
  { name: "Fuego 🔥", id: "btn-Fuego" }
);

//--------------------------------------------------------

// Beginning the GAME

function beginGame() {
  // Pet Actions
  buttonPetPlayer.addEventListener("click", seleccionarMascotaJugador);

  // Reset actions
  buttonReset.disabled = true;
  buttonReset.addEventListener("click", gameReset);

  joinGame();

  // Hiding actions
  hiddenSection.style.display = "none";
  hiddenSectionReset.style.display = "none";
  hiddenSectionPetMessages.style.display = "none";

  // canva
  sectionVerMapa.style.display = "none";

  // Iterating the process
  Mokepones.forEach((Mokepon) => {
    mokeponOption = `
    <input type="radio" name="Mascota" id=${Mokepon.name} />
        <label for=${Mokepon.name} id=${Mokepon.pet}>
          <p>${Mokepon.name}</p>
          <img
            src=${Mokepon.photo}
            alt=${Mokepon.name}
          />
        </label>
    `;
    containerCards.innerHTML += mokeponOption;

    // Taking the ID generated by JS
    inputPikachu = document.getElementById("Pikachu");
    inputCharmander = document.getElementById("Charmander");
    inputPickle = document.getElementById("Pickle");
  });
}

function joinGame() {
  fetch("http://localhost:8080/join").then(function (res) {
    // console.log(res)
    if (res.ok) {
      res.text().then(function (answer) {
        console.log(answer);
        playerId = answer
      });
    }
  }); // Making the call
}

function seleccionarMascotaJugador() {
  // Saving Enemy's pet variable as well as choosing it.
  randomSelect = random(0, Mokepones.length - 1);
  /* selectMascotaEnemigo.innerHTML = Mokepones[randomSelect].name; */

  // The next line of code defines the array of the Mokepons attacks
  ataquesMokeponEnemigo = Mokepones[randomSelect].ataques;

  // Player selection
  if (inputPikachu.checked) {
    selectMascotaJugador.innerHTML = inputPikachu.id;
    mascotaJugador = inputPikachu.id;

    // petEnemySelect();
    displaySectionPetMessages();
  } else if (inputCharmander.checked) {
    selectMascotaJugador.innerHTML = inputCharmander.id;
    mascotaJugador = inputCharmander.id;

    // petEnemySelect();
    displaySectionPetMessages();
  } else if (inputPickle.checked) {
    selectMascotaJugador.innerHTML = inputPickle.id;
    mascotaJugador = inputPickle.id;

    // petEnemySelect();
    displaySectionPetMessages();
  } else {
    alert("Elige una mascota para poder jugar");
    return 0;
  }

  beginMap();

  // local functions
  extraerAtaques(mascotaJugador);

  // Messages section activation and hiding.
  function displaySectionPetMessages() {
    showSectionPetMessages.style.display = "grid";
    hidePetSection.style.display = "none";
    // showAttackSection.style.display = "flex";
    sectionVerMapa.style.display = "flex";
  }

  // Back-end
  selectMokepon(mascotaJugador);
}

function selectMokepon(mascotaJugador) {
  const request = fetch(`http://localhost:8080/mokepon/${playerId}`, {
    method: "post",
    Headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mokepon: mascotaJugador }),
  });

  
}

// The function which it will work as the random select of our enemy
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function extraerAtaques(mascotaJugador) {
  // Local variable
  let ataques;

  // Loop to get the attacks of the respective character
  for (let i = 0; i < Mokepones.length; i++) {
    if (
      mascotaJugador === Mokepones[i].name /* Pikachu; Charmander; Pickle */
    ) {
      ataques = Mokepones[i].ataques;
    }
  }
  // After loop ends, the next function starts
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataques) => {
    ataquesMokepon = `
    <button id=${ataques.id} class="boton-de-ataque btnAtaque">${ataques.name}</button>
    `;
    containerAttacks.innerHTML += ataquesMokepon;
  });

  fireAttackButtom = document.getElementById("btn-Fuego");
  waterAttackButtom = document.getElementById("btn-Agua");
  earthAttackButtom = document.getElementById("btn-Tierra");

  // Select all the elements which have a class, this works for the same class in several functions
  botones = document.querySelectorAll(".btnAtaque");
  attackSequency(botones);
}

// Attack sequency
function attackSequency(botones) {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "Agua 🌊") {
        ataqueJugador.push("AGUA");
        boton.style.background = "#848161";
        boton.disabled = true;
      } else if (e.target.textContent === "Fuego 🔥") {
        ataqueJugador.push("FUEGO");
        boton.style.background = "#848161";
        boton.disabled = true;
      } else {
        ataqueJugador.push("TIERRA");
        boton.style.background = "#848161";
        boton.disabled = true;
      }
      // Getting enemy's attack
      getEnemyAttack(
        (typeAttack = random(0, ataquesMokeponEnemigo.length - 1))
      );
    });
  });
}

// This next function will get the randomAttack from enemy right after clicking the "Fire, water or earth" buttom
function getEnemyAttack(typeAttack) {
  if (typeAttack === 0 || typeAttack === 1) {
    ataqueEnemigo.push("FUEGO");
  } else if (typeAttack === 3) {
    ataqueEnemigo.push("TIERRA");
  } else {
    ataqueEnemigo.push("AGUA");
  }
  if (ataqueJugador.length === 5) {
    console.log(ataqueJugador.length);
    beginFight();
  }
  console.log(ataqueEnemigo, ataqueJugador);
}

// Waiting for the selection of the attacks and then display the battle
function beginFight() {
  let messageResult = "";

  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      messageResult = "¡EMPATE!";
      bothEnemyIndex(index, index);
    } else if (
      ataqueJugador[index] === "FUEGO" &&
      ataqueEnemigo[index] === "AGUA"
    ) {
      messageResult = "¡GANASTE!";
      bothEnemyIndex(index, index);
      victoriesPlayer++;
      petPLayerLife.innerHTML = victoriesPlayer;
    } else if (
      ataqueJugador[index] === "AGUA" &&
      ataqueEnemigo[index] === "TIERRA"
    ) {
      messageResult = "¡GANASTE!";
      bothEnemyIndex(index, index);
      victoriesPlayer++;
      petPLayerLife.innerHTML = victoriesPlayer;
    } else if (
      ataqueJugador[index] === "TIERRA" &&
      ataqueEnemigo[index] === "FUEGO"
    ) {
      messageResult = "GANASTE!";
      bothEnemyIndex(index, index);
      victoriesPlayer++;
      petPLayerLife.innerHTML = victoriesPlayer;
    } else {
      messageResult = "¡PERDISTE!";
      bothEnemyIndex(index, index);
      victoriesEnemy++;
      petEnemyLife.innerHTML = victoriesEnemy;
    }
    // After the five attacks have been selected
    if (ataqueJugador.length === 5) {
      createMessage(messageResult);
    }
  }
}

function bothEnemyIndex(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

//--------------------------------------------------------
// Here will be the function to create the newMessage that will be shown in the section "Messages"

function createMessage(messageResult) {
  // let newP = document.createElement("p");
  let attackPlayer = document.createElement("p");
  let attackEnemy = document.createElement("p");
  // let newP2 = document.getElementById("Result");

  attackPlayer.innerHTML = indexAtaqueJugador;
  attackEnemy.innerHTML = indexAtaqueEnemigo;

  // newP2.innerHTML = messageResult;

  attackPlayerMessage.appendChild(attackPlayer);
  attackEnemyMessage.appendChild(attackEnemy);

  endBattle();
}

function endBattle() {
  const resultMessage = document.getElementById("Result");

  if (victoriesPlayer === victoriesEnemy) {
    resultMessage.innerHTML = "¡Ha habido un empate!";
  } else if (victoriesPlayer > victoriesEnemy) {
    resultMessage.innerHTML = "¡Has ganado este encuentro!";
  } else {
    resultMessage.innerHTML = "Has perdido... ¡Sigue mejorando!";
  }
}

// Function which is going to minus the life of the pets

function lifePetPlayer() {
  petPLayerLife.innerHTML = victoriesPlayer;
}

function lifePetEnemy() {
  petEnemyLife.innerHTML = victoriesEnemy;
}

// Reset Buttom

function battleEnded() {
  buttonReset.disabled = false;
  buttonReset.addEventListener("click", gameReset);

  hiddenSectionReset.style.display = "flex";
}

// Dishabilitating Fire, Water and Earth Buttoms

function attackButtomDisabled() {
  fireAttackButtom.style.display = "none";

  waterAttackButtom.style.display = "none";

  earthAttackButtom.style.display = "none";
}

function beginMap() {
  myMokepon = getPet(mascotaJugador);
  console.log(myMokepon, mascotaJugador);

  // Canva intervals
  interval = setInterval(pintarCanva, 50);
  pintarCanva();

  window.addEventListener("keydown", aPressedKey);
  window.addEventListener("keyup", stopMovement);
}

function pintarCanva() {
  myMokepon.x = myMokepon.x + myMokepon.velocidadX;
  myMokepon.y = myMokepon.y + myMokepon.velocidadY;

  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapBackground, 0, 0, mapa.width, mapa.height);
  myMokepon.pintarMokepon();
  pikachuEnemigo.pintarMokepon();
  charmanderEnemigo.pintarMokepon();
  pickleEnemigo.pintarMokepon();

  if (myMokepon.velocidadX !== 0 || myMokepon.velocidadY !== 0) {
    collisionTest(pikachuEnemigo);
    collisionTest(charmanderEnemigo);
    collisionTest(pickleEnemigo);
  }
}

function moverPikachuRight() {
  myMokepon.velocidadX = 5;
}

function moverPikachuLeft() {
  myMokepon.velocidadX = -5;
}

function moverPikachuUp() {
  myMokepon.velocidadY = -5;
}

function moverPikachuDown() {
  myMokepon.velocidadY = 5;
}

function stopMovement() {
  myMokepon.velocidadX = 0;
  myMokepon.velocidadY = 0;
}

function aPressedKey(event) {
  switch (event.key) {
    case "ArrowUp":
      moverPikachuUp();
      break;
    case "ArrowDown":
      moverPikachuDown();
      break;
    case "ArrowLeft":
      moverPikachuLeft();
      break;
    case "ArrowRight":
      moverPikachuRight();
      break;
  }
}

function getPet() {
  // This function will return the mokepo according to the player's choosing
  for (let i = 0; i < Mokepones.length; i++) {
    if (mascotaJugador === Mokepones[i].name) {
      return Mokepones[i];
    }
  }
}

function collisionTest(enemigo) {
  const upEnemy = enemigo.y;
  const downEnemy = enemigo.y + enemigo.height;
  const rightEnemy = enemigo.x + enemigo.width;
  const leftEnemy = enemigo.x;

  const upPlayer = myMokepon.y;
  const downPlayer = myMokepon.y + myMokepon.height;
  const rightPlayer = myMokepon.x + myMokepon.width;
  const leftPlayer = myMokepon.x;

  if (
    downPlayer < upEnemy ||
    upPlayer > downEnemy ||
    rightPlayer < leftEnemy ||
    leftPlayer > rightEnemy
  ) {
    return;
  }
  stopMovement();
  showAttackSection.style.display = "flex";
  sectionVerMapa.style.display = "none";
  selectMascotaEnemigo.innerHTML = enemigo.name;
}

// Deciding the winner

function gameReset() {
  location.reload();
}

/* The game starter. After the webpage charges, the JS document will take the next event as a result of its verification of the "Window.addEventListener('Load", beginGame); */
window.addEventListener("load", beginGame);
