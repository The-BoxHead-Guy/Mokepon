// After the webpage charges, the JS document will take the next event as a result of its verification of the "Window.addEventListener('Load", beginGame);

/todo- Change all "let" variables of get ElementById segments to "const"/

// Global Variables
let ataqueJugador;
let ataqueEnemigo;

const fireAttack = "FUEGO 🔥";
const waterAttack = "AGUA 🌊";
const earthAttack = "TIERRA 🌍";

let vidasJugador = 3;
let vidasEnemigo = 3;

//--------------------------------------------------------

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

// Saving player pets variables
const inputPikachu = document.getElementById("Pikachu");
const inputCharmander = document.getElementById("Charmander");
const inputPickle = document.getElementById("Pickle");

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
    if (randomSelect == 1) {
      selectMascotaEnemigo.innerHTML = "Pikachu";
    } else if (randomSelect == 2) {
      selectMascotaEnemigo.innerHTML = "Charmander";
    } else if (randomSelect == 3) {
      selectMascotaEnemigo.innerHTML = "Pickle";
    } else {
      selectMascotaEnemigo.innerHTML = "Aún sin seleccionar";
    }
  }

  // Saving Enemy's pet variable
  let randomSelect = random(1, 3);

  if (inputPikachu.checked) {
    selectMascotaJugador.innerHTML = "Pikachu";
    petNumberChange();
    displaySectionPetMessages();
    sectionPetSelect();
    sectionAttackSelect();
  } else if (inputCharmander.checked) {
    selectMascotaJugador.innerHTML = "Charmander";
    petNumberChange();
    displaySectionPetMessages();
    sectionPetSelect();
    sectionAttackSelect();
  } else if (inputPickle.checked) {
    selectMascotaJugador.innerHTML = "Pickle";
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
