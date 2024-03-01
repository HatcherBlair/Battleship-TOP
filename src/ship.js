export default class Ship {
  // Option to initialize ship with hits in place
  constructor(length, numHits = 0) {
    this.length = length;
    this.numHits = numHits;
  }

  // Checks if the ship is sunk or not
  isSunk() {
    return this.numHits >= this.length;
  }

  // Adds a hit to the ship
  hit() {
    this.numHits += 1;
  }
}
