import Ship from "./ship";

export default class Gameboard {
  constructor(size = 10) {
    // Size of gameboard
    this.size = size;

    // Array of ship objects on board
    this.ships = [];

    // Map containing location of ships
    this.oceanMap = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => null)
    );

    // Map containing location of shots
    // null = not shot, 0 = miss, 1 = hit
    this.shotMap = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => null)
    );
  }

  // Places ship on board and adds ship object to ships array
  placeShip(coords, dir, length) {
    // Ship is out of bounds
    if (coords[0] > this.size || coords[1] > this.size) return false;

    let shipDir;

    // Set the direction of the ship
    switch (dir) {
      case "N":
        // Ship is out of bounds
        if (coords[1] - length < 0) return false;
        // Set the direction
        shipDir = [0, -1];
        break;

      case "E":
        // Ship is out of bounds
        if (coords[0] + length > this.size) return false;
        // Set the direction
        shipDir = [1, 0];
        break;

      case "S":
        // Ship is out of bounds
        if (coords[1] + length > this.size) return false;
        // Set the direction
        shipDir = [0, 1];
        break;

      case "W":
        // Ship is out of bounds
        if (coords[0] - length < 0) return false;
        // Set the direction
        shipDir = [-1, 0];
        break;

      default:
        return "How did we get here";
    }

    // Add ship to list and map
    const shipNum = this.ships.length + 1;
    const ship = new Ship(length);
    this.ships.push(ship);
    for (let i = 0; i < length; i += 1)
      this.oceanMap[coords[0] + shipDir[0] * i][coords[1] + shipDir[1] * i] =
        shipNum;

    return true;
  }

  // Receives an attack, true if hit, false if miss
  receiveAttack(x, y) {
    // Shot missed
    if (!this.oceanMap[x][y]) {
      this.shotMap[x][y] = 0;
      return false;
    }

    // Shot hit
    const shipNum = this.oceanMap[x][y] - 1;
    this.ships[shipNum].hit();
    this.shotMap[x][y] = 1;

    return true;
  }

  // Tests if all ships are sunk
  allSunk() {
    return (
      this.ships.length ===
      this.ships.reduce((acc, curr) => acc + curr.isSunk(), 0)
    );
  }

  // Returns the number of shots hit
  shotsHit() {
    return this.shotMap.reduce(
      (numHit, row) => numHit + row.reduce((sum, curr) => sum + curr, 0),
      0
    );
  }

  // Returns the number of shots missed
  shotsMissed() {
    return this.shotMap.reduce(
      (numMissed, row) =>
        numMissed + row.reduce((sum, curr) => sum + (curr === 0 ? 1 : 0), 0),
      0
    );
  }

  // Returns accuracy
  shotAccuracy() {
    return this.shotsHit() / (this.shotsHit() + this.shotsMissed());
  }
}
