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
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1, 
    ArrowLeft: -1,
};

//variables
let snake;
let puntaje;
let direccion;
let tableroRecuadros;
let recuadrosVacios;
let intervaloMov;

const drawSnake = () => {
 snake.forEach( cuadrado => drawCuadrado(cuadrado, 'cuadroSnake'));
}

const drawCuadrado = (cuadrado, type) => {

    const [ row, column ]  = cuadrado.split('');
    tableroRecuadros[row][column] = tipoRecuadro[type];
    const elementoCuadrado = document.getElementById(cuadrado);
    elementoCuadrado.setAttribute('class', `cuadrado ${type}`);

    if(type === 'recuadrosVacios'){
        recuadrosVacios.push(cuadrado);
    }else{
        if(recuadrosVacios.indexOf(cuadrado) !== -1){
            recuadrosVacios.slice(recuadrosVacios.indexOf(cuadrado), 1);
        }
    }
}

 const moveSnake = () =>{
     const newSquare = String (Number(snake[snake.length -1]) 
     + direcciones[direccion]).padStart(2, '0');

     const [row, column] = newSquare.split('');

     if (newSquare < 0 || newSquare > tableroSize * tableroSize
        || (direccion ==='ArrowRight' && column == 0) ||
        (direccion=== 'ArrowLeft' && column == 9 ||
        tableroRecuadros[row][column]===tipoRecuadro.cuadroSnake) ){
        gameOvers();
    }else{
        snake.push(newSquare);
        if(tableroRecuadros[row][column]=== tipoRecuadro.cuadroComida){
            addComida();
        }else{
            const recuadrosVacios = snake.shift();
            drawCuadrado(recuadrosVacios, 'cuadroVacio');
        }
        drawSnake();

    }
 }

 const addComida = () => {
     puntaje++;
     updatePuntaje();
     comidaRandom();
 }
 const gameOvers = () => {
     gameOver.style.display = 'block';
     clearInterval(intervaloMov)
     start.disabled = false;

 }
const setDirection = newDirection => {
    direccion = newDirection;
}

const directionEvent = key => {
    switch (key.code){
        case 'ArrowUp':
            direccion != 'ArrowDown' && setDirection(key.code)
            break;
        case 'ArrowDown':
            direccion != 'ArrowUp' && setDirection(key.code)
            break;
        case 'ArrowLeft':
            direccion != 'ArrowRight' && setDirection(key.code)
            break;
        case 'ArrowRight':
            direccion != 'ArrowLeft' && setDirection(key.code)
            break;
    }
}

const comidaRandom = () => {
    const randomEspacio = recuadrosVacios[Math.floor(Math.random() * recuadrosVacios.length)];
    drawCuadrado( randomEspacio, 'cuadroComida')
}

const updatePuntaje = () => {
    scoreTablero.innerText = puntaje-4;
}
const crearTablero = () => {
    tableroRecuadros.forEach( (row, rowIndex) => {
        row.forEach( (column, columnIndex) => {
            const valorCuadrado = `${rowIndex}${columnIndex}`;
            const elementoCuadrado = document.createElement('div');
            elementoCuadrado.setAttribute('class', 'cuadros cuadroVacio');
            elementoCuadrado.setAttribute('id', valorCuadrado);
            tablero.appendChild(elementoCuadrado);
            recuadrosVacios.push(valorCuadrado);
    })
        
    })
}

const setGame = () => {
snake = ['00', '01', '02', '03'];
   puntaje = snake.length;
   direccion = 'ArrowRight';
   tableroRecuadros = Array.from(Array(tableroSize), 
   () => new Array(tableroSize).fill(tipoRecuadro.cuadroVacio));
    console.log(tableroRecuadros);
    tablero.innerHTML = '';
    recuadrosVacios = [];
    crearTablero();
  
}


const startGame = () => {
    setGame();
    gameOver.style.display = 'none';
    start.disabled = true; 
    drawSnake();
    updatePuntaje();
    comidaRandom(); 
    document.addEventListener('keydown', directionEvent);
    intervaloMov = setInterval ( () => moveSnake(), velocidadJuego);
}




start.addEventListener('click', startGame);
