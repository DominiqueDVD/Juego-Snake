//Elemento traídos desde el HTML
const tablero = document.getElementById('tablero');
const scoreTablero = document.getElementById('scoreTablero');
const start = document.getElementById('start');
const gameOver = document.getElementById('gameOver');

//configuración del juego
const tableroSize = 10;
const velocidadJuego = 100;
const tipoRecuadro = {
    cuadroVacio:0,
    cuadroSnake:1,
    cuadroComida:2,
};
const direcciones = {
    arriba:10,
    abajo: -10,
    derecha: 1, 
    izquierda: -1,
};

//variables
let snake;
let puntaje;
let direccion;
let tableroRecuadros;
let recueadrosVacios;
let intervaloMov;

const setGame = () => {
    snake = ['00', '01', '02', '03'];
   puntaje = snake.length;
   direccion = 'derecha';
   tableroRecuadros = Array.from(Array(tableroSize), 
   () => new Array(tableroSize).fill(tipoRecuadro.cuadroVacio));
console.log(tableroRecuadros);

}


const startGame = () => {
    setGame();
}




start.addEventListener('click', startGame);