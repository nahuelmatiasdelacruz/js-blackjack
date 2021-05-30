/**
 * 2C = Two of clubs
 * 2D = Two of diamonds
 * 2H = Two of hearts
 * 2S = Two of Spades
 */

let deck = [];
const specials = ["A","J","Q","K"];
const tipos = ["D","D","H","S"];
let puntosJugador = 0;
let puntosCpu = 0;

// Referencias de HTML
const btnPedir = document.querySelector("#btnPedir");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasCpu = document.querySelector("#cpu-cartas");
const smalls = document.querySelectorAll("small");
const btnDetener = document.querySelector("#btnDetener");
const btnNewGame = document.querySelector("#btnNuevo");

//Crear una baraja de cartas y mezclarla
const crearDeck = () => {

    for(let i = 2; i <= 10; i++){
        
        for(let tipo of tipos){

            deck.push(i+tipo);

        }

    }
    for(let tipo of tipos){

        for(let special of specials){

            deck.push(special + tipo);

        }

    }
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();

// Tomamos una carta del deck y la eliminamos para que no pueda volver a usarse
const pedirCarta = () => {
    if(deck.length === 0){
        throw "No hay mas cartas en el deck";
    }
    const card = deck.pop();
    return card;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length-1);

    return (isNaN(valor)) ?
            (valor === "A") ? 11 : 10
            : valor * 1;
}

// Turno de la CPU
const turnoCpu = (puntosMinimos) => {
    do{
        const carta = pedirCarta();

        puntosCpu = puntosCpu + valorCarta(carta);
        smalls[1].innerText = puntosCpu;

        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasCpu.append(imgCarta);

        if(puntosMinimos>21){
            break;
        }

    }while((puntosCpu<puntosMinimos) && puntosMinimos <= 21 );
    if(puntosCpu>21){
        alert("Has ganado!");
    }else if(puntosCpu === puntosMinimos){
        alert("Es un empate!");
    }else if(puntosCpu>puntosMinimos){
        alert("Gana la CPU por " + (puntosCpu-puntosMinimos) + " puntos!");
    }
}

// Events
btnPedir.addEventListener("click",() => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    smalls[0].innerText = puntosJugador;


    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);

    if(puntosJugador>21){
        btnPedir.disabled = true;
        turnoCpu(puntosJugador);
        alert("La computadora ganó!");
    }else if(puntosJugador === 21){
        console.warn("21, genial");
        turnoCpu(puntosJugador);
    }

})
btnDetener.addEventListener("click",() => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoCpu(puntosJugador);

});
btnNewGame.addEventListener("click",() => {

    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosCpu = 0;
    smalls[0].innerText = "0";
    smalls[1].innerText = "0";
    divCartasCpu.innerHTML = "";
    divCartasJugador.innerHTML = "";
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    console.clear();

});