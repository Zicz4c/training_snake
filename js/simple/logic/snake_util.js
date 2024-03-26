// https://stackoverflow.com/a/1527820
function getRandomNumberInRange(min, max) {
  const random = (Math.random() * (max - min)) + min;
  return random;
}
const Direction = {
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right'
};

let getDirectionFromKeyCode = (keyCode) => {
  switch (keyCode) {
    case "KeyA":
    case "ArrowLeft":
      return Direction.Left;
    case "KeyS":
    case "ArrowDown":
      return Direction.Down;
    case "KeyD":
    case "ArrowRight":
      return Direction.Right;
    case "KeyW":
    case "ArrowUp":
      return Direction.Up;
    default:
      return currentDirection;
  }
}


