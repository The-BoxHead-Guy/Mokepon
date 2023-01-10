// After the webpage charges, the JS document will take the next event as a result of its verification of the "Window.addEventListener('Load", beginGame);

// Global Variables
let ataqueJugador;
let ataqueEnemigo;

const fireAttack = "FUEGO 🔥";
const waterAttack = "AGUA 🌊";
const earthAttack = "TIERRA 🌍";

let vidasJugador = 3;
let vidasEnemigo = 3;

//--------------------------------------------------------

// Beginning the GAME

function beginGame() {
  let buttonPetPlayer = document.getElementById("Select-Mascota");
  buttonPetPlayer.addEventListener("click", seleccionarMascotaJugador);

  let buttonFuego = document.getElementById("btn-Fuego");
  buttonFuego.addEventListener("click", attackFuego);

  let buttonAgua = document.getElementById("btn-Agua");
  buttonAgua.addEventListener("click", attackAgua);

  let buttonTierra = document.getElementById("btn-Tierra");
  buttonTierra.addEventListener("click", attackTierra);

  let buttonReset = document.getElementById("boton-reinicio");
  buttonReset.disabled = true;
  buttonReset.addEventListener("click", gameReset);

  let hiddenSection = document.getElementById("Seleccionar-Ataque");
  hiddenSection.style.display = "none";

  let hiddenSectionReset = document.getElementById("Reiniciar");
  hiddenSectionReset.style.display = "none";

  let hiddenSectionPetMessages = document.getElementById("pet-messages");
  hiddenSectionPetMessages.style.display = "none";
}

//--------------------------------------------------------

// After triggering fire, water and earth buttom

function attackFuego() {
  ataqueJugador = fireAttack;
  getEnemyAttack();
  createMessage();
  // getPlayerEnemyAttackText()
}

function attackAgua() {
  ataqueJugador = waterAttack;
  getEnemyAttack();
  createMessage();
  // getPlayerEnemyAttackText()
}

function attackTierra() {
  ataqueJugador = earthAttack;
  getEnemyAttack();
  createMessage();
  // getPlayerEnemyAttackText()
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
  let attackPlayerMessage = document.getElementById("attack-player");
  attackPlayerMessage.appendChild(attackPlayer);
  let attackEnemyMessage = document.getElementById("attack-enemy");
  attackEnemyMessage.appendChild(attackEnemy);

  endBattle();
}

// Function which is going to minus the life of the pets

function lifePetPlayer() {
  let petPLayerLife = document.getElementById("vidas-jugador");

  petPLayerLife.innerHTML = vidasJugador;
}

function lifePetEnemy() {
  let petEnemyLife = document.getElementById("vidas-enemigo");

  petEnemyLife.innerHTML = vidasEnemigo;
}

// Reset Buttom

function battleEnded() {
  let buttonReset = document.getElementById("boton-reinicio");
  buttonReset.disabled = false;
  buttonReset.addEventListener("click", gameReset);

  let hiddenSectionReset = document.getElementById("Reiniciar");
  hiddenSectionReset.style.display = "flex";
}

// Dishabilitating Fire, Water and Earth Buttoms

function attackButtomDisabled() {
  let fireAttackButtom = document.getElementById("btn-Fuego");
  fireAttackButtom.style.display = "none";

  let waterAttackButtom = document.getElementById("btn-Agua");
  waterAttackButtom.style.display = "none";

  let earthAttackButtom = document.getElementById("btn-Tierra");
  earthAttackButtom.style.display = "none";
}

// Deciding the winner

function endBattle() {
  // If enemy wins
  if (vidasJugador == 0) {
    // alert("Has perdido, mejor suerte para la próxima 😒");

    let showMessage = document.getElementById("Result");
    showMessage.innerHTML = "Has perdido, mejor suerte para la próxima";

    battleEnded();
    attackButtomDisabled();
    // If player wins
  } else if (vidasEnemigo == 0) {
    // alert("El jugador ha ganado, ¡Enhorabuena! 😉");

    let showMessage = document.getElementById("Result");
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

// This next function will get the randomAttack from enemyright after clicking the "Fire, water or earth" buttom

function getEnemyAttack() {
  let typeAttack = random(1, 3);

  if (typeAttack == 1) {
    ataqueEnemigo = fireAttack;
    // alert(ataqueEnemigo)
  } else if (typeAttack == 2) {
    ataqueEnemigo = waterAttack;
    // alert(ataqueEnemigo)
  } else {
    ataqueEnemigo = earthAttack;
    // alert(ataqueEnemigo)
  }
}

// This function will get the attack and changing the HTML's DOM to the corresponding attack

function getPlayerEnemyAttackText() {
  {
    let spanPlayerAttack = document.getElementById("player-attack");
    let spanEnemyAttack = document.getElementById("enemy-attack");

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
  let hidePetSection = document.getElementById("Seleccionar-Mascota");
  hidePetSection.style.display = "none";
}

function sectionAttackSelect() {
  let showAttackSection = document.getElementById("Seleccionar-Ataque");
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

  // Saving player pets variables
  let inputPikachu = document.getElementById("Pikachu");
  let inputCharmander = document.getElementById("Charmander");
  let inputPickle = document.getElementById("Pickle");

  // Changing the DOM
  let selectMascotaJugador = document.getElementById("select-mascota");
  let selectMascotaEnemigo = document.getElementById("select-mascota-enemigo");

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

    let sectionPetMessage = document.getElementById("none-case");
    sectionPetMessage.appendChild(noneMessage);
  }

  // local functions

  function displaySectionPetMessages() {
    let showSectionPetMessages = document.getElementById("pet-messages");
    showSectionPetMessages.style.display = "grid";
  }
}

function gameReset() {
  location.reload();
}

window.addEventListener("load", beginGame);
