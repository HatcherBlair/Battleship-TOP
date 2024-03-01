import Ship from "../src/ship";

// isSunk() returns true if ship is sunk, false if not
test("Ship.isSunk()", () => {
  // Define new ship that is not sunk
  const ship = new Ship(2, 1);
  expect(ship.isSunk()).toBeFalsy();

  // Sink the ship
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});

// hit() increases the number of hits on a ship
test("Ship.hit()", () => {
  const ship = new Ship(2);
  expect(ship.numHits).toBe(0);
  ship.hit();
  expect(ship.numHits).toBe(1);
});
