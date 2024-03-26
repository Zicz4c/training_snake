const SEGMENT_SIZE = 10;

//globals
let currentDirection;
let canvas;
let gameContext;
let xVelocity = 0;
let yVelocity = 0;

let runGameInterval;

let snake = {
  xVelocity: 0,
  yVelocity: 0,
  elements: [{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 },{ x: 10, y: 10 }],
}

let apple = {
  x: 0,
  y: 0,
}

let drawSnakePart = (snakePart) => {
  gameContext.fillStyle = 'green';
  gameContext.fillRect(snakePart.x, snakePart.y, SEGMENT_SIZE, SEGMENT_SIZE);
}

let drawSnake = () => {
  snake.elements.forEach(drawSnakePart);
}

let drawApple = () => {
  gameContext.fillStyle = 'red';
  gameContext.fillRect(apple.x, apple.y, SEGMENT_SIZE, SEGMENT_SIZE);
}

let clearCanvas = () => {
  gameContext.fillStyle = 'black';
  gameContext.fillRect(0, 0, canvas.clientHeight, canvas.clientWidth)
}

let newApplePosition = async () => {
  do {
    // move apple
    apple.x = Math.floor(getRandomNumberInRange(0, canvas.clientHeight / SEGMENT_SIZE)) * SEGMENT_SIZE;
    apple.y = Math.floor(getRandomNumberInRange(0, canvas.clientWidth / SEGMENT_SIZE)) * SEGMENT_SIZE;
  }
  while (snake.elements.find(elem => elem == apple));
}

let handleOutOfBounds = (nextHead) => {
  // horizontal
  if (nextHead.x < 0) {
    nextHead.x = canvas.clientWidth - SEGMENT_SIZE;
  }
  else if (nextHead.x >= canvas.clientWidth) {
    nextHead.x = 0;
  }

  // vertical
  if (nextHead.y < 0) {
    nextHead.y = canvas.clientHeight - SEGMENT_SIZE;
  }
  else if (nextHead.y >= canvas.clientHeight) {
    nextHead.y = 0;
  }
}

let handleEatingOneselv = (nextHead) => {
  let indexOfSelf = snake.elements.findIndex(elem => elem.x === nextHead.x && elem.y === nextHead.y);
  if(indexOfSelf > 0 ){
    snake.elements.splice(indexOfSelf, snake.elements.length-indexOfSelf);
  }
}

let moveSnake = () => {
  let currentHead = snake.elements[0];
  let nextHead = { x: currentHead.x + snake.xVelocity, y: currentHead.y + snake.yVelocity };
  
  handleOutOfBounds(nextHead);

  handleEatingOneselv(nextHead);
  

  snake.elements.unshift(nextHead);

  // apple
  if (nextHead.x === apple.x && nextHead.y === apple.y) {
    newApplePosition();
  }
  else {
    snake.elements.pop();
  }
}

let initGame = (canvasId) => {
  canvas = document.getElementById(canvasId);
  gameContext = canvas.getContext("2d");
  
  clearCanvas();

  newApplePosition();

  drawSnake();
  drawApple();
  document.addEventListener("keydown", handleInput);
};


let runGame = () => {

  runGameInterval = setInterval(() => {
    clearCanvas();

    moveSnake();

    drawSnake();
    drawApple();

  }, 500);
}

let handleInput = (event) => {

  const pressedKey = event.code; //event.which & event.keyCode are deprecated

  if(pressedKey === "Escape"){
    clearInterval(runGameInterval);
    window.location.reload();
    return;
  }
  
  const direction = getDirectionFromKeyCode(pressedKey);

  console.log(direction);

  if (direction === currentDirection) {
    return;
  }

  switch (direction) {
    case Direction.Left:
      if (currentDirection === Direction.Right) {
        break;
      }

      snake.xVelocity = -1 * SEGMENT_SIZE;
      snake.yVelocity = 0;
      break;
    case Direction.Right:
      if (currentDirection === Direction.Left) {
        break;
      }

      snake.xVelocity = 1 * SEGMENT_SIZE;
      snake.yVelocity = 0;
      break;
    case Direction.Down:
      if (currentDirection === Direction.Up) {
        break;
      }

      snake.yVelocity = 1 * SEGMENT_SIZE;
      snake.xVelocity = 0;
      break;
    case Direction.Up:
      if (currentDirection === Direction.Down) {
        break;
      }

      snake.yVelocity = -1 * SEGMENT_SIZE;
      snake.xVelocity = 0;
      break;
    default:
      break;
  }

  currentDirection = direction;
}


