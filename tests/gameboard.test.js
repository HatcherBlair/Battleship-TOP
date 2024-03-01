import Gameboard from "../src/index";

// Tests placeShip
test("placeShip", () => {
  const board = new Gameboard();
  expect(board.placeShip([0, 0], "N", 5)).toBeFalsy();
  expect(board.placeShip([0, 0], "W", 5)).toBeFalsy();
  expect(board.placeShip([0, 9], "S", 5)).toBeFalsy();
  expect(board.placeShip([9, 0], "E", 5)).toBeFalsy();
  expect(board.placeShip([4, 4], "N", 2)).toBeTruthy();
});

// Tests receiveAttack, true if hit, false if miss
test("receiveAttack", () => {
  const board = new Gameboard();
  board.placeShip([0, 0], "E", 5);
  expect(board.receiveAttack(1, 0)).toBeTruthy();
  expect(board.receiveAttack(0, 1)).toBeFalsy();
});

// Tests missed shots are being tracked
test("Missed shots being tracked", () => {
  const board = new Gameboard();
  board.placeShip([0, 0], "E", 5);
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);
  expect(board.shotsMissed()).toBe(0);
  board.receiveAttack(0, 1);
  expect(board.shotsMissed()).toBe(1);
  board.receiveAttack(0, 2);
  expect(board.shotsMissed()).toBe(2);
});

// Tests hit shots are being tracked
test("Hit Shots are being tracked", () => {
  const board = new Gameboard();
  board.placeShip([0, 0], "E", 5);
  board.receiveAttack(0, 0);
  expect(board.shotsHit()).toBe(1);
  board.receiveAttack(1, 0);
  expect(board.shotsHit()).toBe(2);
  board.receiveAttack(2, 0);
  expect(board.shotsHit()).toBe(3);
});

// Tests accuracy is being reported correctly
test("Accuracy is correct", () => {
  const board = new Gameboard();
  board.placeShip([0, 0], "E", 5);
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);
  expect(board.shotAccuracy()).toBe(1);
  board.receiveAttack(0, 1);
  expect(board.shotAccuracy()).toBeCloseTo(0.6666);
});

// Tests game over
test("Is Game Over", () => {
  const board = new Gameboard();
  board.placeShip([0, 0], "E", 2);
  board.placeShip([4, 4], "S", 2);
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);
  expect(board.allSunk()).toBeFalsy();
  board.receiveAttack(4, 4);
  board.receiveAttack(4, 5);
  expect(board.allSunk()).toBeTruthy();
});
