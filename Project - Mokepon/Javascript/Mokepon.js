// After the webpage charges, the JS document will take the next event as a result of its verification of the "Window.addEventListener('Load", beginGame);

// Preparing variables to be re-used later

// Section - GetElementById
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

// Player & enemy lifes
const petPLayerLife = document.getElementById("vidas-jugador");
const petEnemyLife = document.getElementById("vidas-enemigo");

// Buttoms
const fireAttackButtom = document.getElementById("btn-Fuego");
const waterAttackButtom = document.getElementById("btn-Agua");
const earthAttackButtom = document.getElementById("btn-Tierra");

// Attack section
const spanPlayerAttack = document.getElementById("player-attack");
const spanEnemyAttack = document.getElementById("enemy-attack");
const hidePetSection = document.getElementById("Seleccionar-Mascota");
const showAttackSection = document.getElementById("Seleccionar-Ataque");
const sectionPetMessage = document.getElementById("none-case");
const showSectionPetMessages = document.getElementById("pet-messages");
const showMessage = document.getElementById("Result");

// Attack messages
const attackPlayerMessage = document.getElementById("attack-player");
const attackEnemyMessage = document.getElementById("attack-enemy");

// Global Variables
const containerCards = document.getElementById("containerCards");

// Saving player pets variables
let inputPikachu;
let inputCharmander;
let inputPickle;

let ataqueJugador;
let ataqueEnemigo;

const fireAttack = "FUEGO 🔥";
const waterAttack = "AGUA 🌊";
const earthAttack = "TIERRA 🌍";

let vidasJugador = 3;
let vidasEnemigo = 3;

let mokeponOption = 0;

// Arrays

let Mokepones = [];

/* Creating a class as well as an object named "Mokepon" */

class Mokepon {
  constructor(name, photo, vidas, pet) {
    this.name = name;
    this.photo = photo;
    this.vidas = vidas;
    this.pet = pet;
    this.ataques = [];
  }
}

/* Creating the objects (Mokepons) */

let pikachu = new Mokepon(
  "Pikachu",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  3,
  'pet1'
);
let charmander = new Mokepon(
  "Charmander",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  3,
  'pet2'
);
let pickle = new Mokepon(
  "Pickle",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  3,
  'pet3'
);

/* Then, we need to push the information into an array */

Mokepones.push(pikachu, charmander, pickle);
/* console.log(Mokepones.length); */

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
  { name: "Agua 🌊", id: "btn-Fuego" }
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
  // --------------------------------------------------------------------
  // Event listeners

  // Pet Actions
  buttonPetPlayer.addEventListener("click", seleccionarMascotaJugador);

  // Attack actions
  buttonFuego.addEventListener("click", attackFuego);
  buttonAgua.addEventListener("click", attackAgua);
  buttonTierra.addEventListener("click", attackTierra);

  // Reset actions
  buttonReset.disabled = true;
  buttonReset.addEventListener("click", gameReset);

  // Hiding actions
  hiddenSection.style.display = "none";
  hiddenSectionReset.style.display = "none";
  hiddenSectionPetMessages.style.display = "none";

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

//--------------------------------------------------------

// After triggering fire, water and earth buttom

function attackFuego() {
  ataqueJugador = fireAttack;
  getEnemyAttack();
  createMessage();
}

function attackAgua() {
  ataqueJugador = waterAttack;
  getEnemyAttack();
  createMessage();
}

function attackTierra() {
  ataqueJugador = earthAttack;
  getEnemyAttack();
  createMessage();
}

//--------------------------------------------------------
// Here will be the function to create the newMessage that will be shown in the section "Messages"

function createMessage() {
  // let newP = document.createElement("p");
  let attackPlayer = document.createElement("p");
  let attackEnemy = document.createElement("p");
  /* let newP2 = document.createElement("p"); */
  let newP2 = document.getElementById("Result");

  // Method 1 --------------------------------------

  /* newP.innerHTML =
    "Tu mascota usó un ataque de " +
    ataqueJugador +
    ", el enemigo usó un ataque de " +
    ataqueEnemigo; */

  attackPlayer.innerHTML = ataqueJugador;
  attackEnemy.innerHTML = ataqueEnemigo;

  newP2.innerHTML = combatResult(ataqueJugador, ataqueEnemigo);

  // Method 2 --------------------------------------

  /* let newContent = document.createTextNode('Tu mascota usó un ataque de ' + ataqueJugador + ', el enemigo usó un ataque de ' + ataqueEnemigo);

    newP.appendChild(newContent) */

  // ----------------------------------------------

  // Showing the text as well as the element

  attackPlayerMessage.appendChild(attackPlayer);

  attackEnemyMessage.appendChild(attackEnemy);

  endBattle();
}

// Function which is going to minus the life of the pets

function lifePetPlayer() {
  petPLayerLife.innerHTML = vidasJugador;
}

function lifePetEnemy() {
  petEnemyLife.innerHTML = vidasEnemigo;
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

// Deciding the winner

function endBattle() {
  // If enemy wins
  if (vidasJugador == 0) {
    // alert("Has perdido, mejor suerte para la próxima 😒");

    showMessage.innerHTML = "Has perdido, mejor suerte para la próxima";

    battleEnded();
    attackButtomDisabled();
    // If player wins
  } else if (vidasEnemigo == 0) {
    // alert("El jugador ha ganado, ¡Enhorabuena! 😉");

    showMessage.innerHTML = "¡Has ganado! Enhorabuena!";

    battleEnded();
    attackButtomDisabled();
  }
}

// Deciding the result of the match

function combatResult(string, stringTwo) {
  /* if (string == stringTwo) {
        return '¡EMPATE!'
    } else if (string == fireAttack && stringTwo == waterAttack) {
        return '¡GANASTE!'
    } else if (string == waterAttack && stringTwo == earthAttack) {
        return '¡GANASTE!'
    } else if (string == earthAttack && stringTwo == fireAttack) {
        return '¡GANASTE!'
    } else {
        return '¡PERDISTE!'
    } */

  // improving my code

  if (
    (string == fireAttack && stringTwo == waterAttack) ||
    (string == waterAttack && stringTwo == earthAttack) ||
    (string == earthAttack && stringTwo == fireAttack)
  ) {
    vidasEnemigo--;
    lifePetEnemy();
    return "¡GANASTE!";
  } else if (string == stringTwo) {
    return "¡EMPATE!";
  } else {
    vidasJugador--;
    lifePetPlayer();
    return "¡PERDISTE!";
  }
}

//--------------------------------------------------------

// This next function will get the randomAttack from enemy right after clicking the "Fire, water or earth" buttom

function getEnemyAttack() {
  let typeAttack = random(1, 3);

  if (typeAttack == 1) {
    ataqueEnemigo = fireAttack;
  } else if (typeAttack == 2) {
    ataqueEnemigo = waterAttack;
  } else {
    ataqueEnemigo = earthAttack;
  }
}

// This function will get the attack and changing the HTML's DOM to the corresponding attack

function getPlayerEnemyAttackText() {
  {
    spanPlayerAttack.innerHTML = ataqueJugador;
    spanEnemyAttack.innerHTML = ataqueEnemigo;
  }
}

//--------------------------------------------------------

// The function which it will work as the random select of our enemy

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Creating dissapearing or appearing Messages

function sectionPetSelect() {
  hidePetSection.style.display = "none";
}

function sectionAttackSelect() {
  showAttackSection.style.display = "flex";
}

// In here we're going to create the functions for the buttons

function seleccionarMascotaJugador() {
  function petNumberChange() {
    if (randomSelect == 0) {
      selectMascotaEnemigo.innerHTML = "Pikachu";
    } else if (randomSelect == 1) {
      selectMascotaEnemigo.innerHTML = "Charmander";
    } else if (randomSelect == 2) {
      selectMascotaEnemigo.innerHTML = "Pickle";
    } else {
      selectMascotaEnemigo.innerHTML = "Aún sin seleccionar";
    }
  }

  // Saving Enemy's pet variable
  let randomSelect = random(0, Mokepones.length - 1);

  selectMascotaEnemigo.innerHTML = Mokepones[randomSelect].name

  if (inputPikachu.checked) {
    selectMascotaJugador.innerHTML = inputPikachu.id;
    petNumberChange();
    displaySectionPetMessages();
    sectionPetSelect();
    sectionAttackSelect();
  } else if (inputCharmander.checked) {
    selectMascotaJugador.innerHTML = inputCharmander.id;
    petNumberChange();
    displaySectionPetMessages();
    sectionPetSelect();
    sectionAttackSelect();
  } else if (inputPickle.checked) {
    selectMascotaJugador.innerHTML = inputPickle.id;
    petNumberChange();
    displaySectionPetMessages();
    sectionPetSelect();
    sectionAttackSelect();
  } else {
    let noneMessage = document.createElement("p");
    noneMessage.innerHTML = "Selecciona una mascota para poder avanzar";

    sectionPetMessage.appendChild(noneMessage);
  }

  // local functions

  function displaySectionPetMessages() {
    showSectionPetMessages.style.display = "grid";
  }
}

function gameReset() {
  location.reload();
}

window.addEventListener("load", beginGame);
