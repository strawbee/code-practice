'use strict';

class Percolation {

  /**
   * Initialize with an n * n grid of all closed sites
   * @param {Number} n
   */
  constructor(n) {
    this.grid = this.initializeGrid(n);
    this.n = n;
    this.num_open = 0;
  }

  /**
   * Create a 2D array of all false (closed) elements
   * O(N^2)
   * @param {Number} n
   */
  initializeGrid(n) {
    const grid = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row[j] = {
          open: false,
          top: i === 0,
          bottom: i === n - 1,
        };
      }
      grid[i] = row;
    }
  }


  /**
   * Opens the site if not open already
   * O(1)
   * @param {Number} row
   * @param {Number} col
   */
  open(row, col) {
    if (!this.grid[row][col]) {
      const site = this.grid[row][col];
      site.open = true;
      this.num_open++;

      // Checks the site's neighbors to see if they are connected to top or bottom
      if (row > 0) {
        if (this.grid[row - 1][col]['top']) site.top = true;
        if (this.grid[row - 1][col]['bottom']) site.bottom = true;
      }
      if (row < this.n - 1) {
        if (this.grid[row + 1][col]['top']) site.top = true;
        if (this.grid[row + 1][col]['bottom']) site.bottom = true;
      }
      if (col > 0) {
        if (this.grid[row][col - 1]['top']) site.top = true;
        if (this.grid[row][col - 1]['bottom']) site.bottom = true;
      }
      if (col < this.n - 1) {
        if (this.grid[row][col + 1]['top']) site.top = true;
        if (this.grid[row][col + 1]['bottom']) site.bottom = true;
      }
    }
  }

  /**
   * Is the site open?
   * O(1)
   * @param {Number} row
   * @param {Number} col
   * @returns {Boolean}
   */
  isOpen(row, col) {
    return this.grid[row][col]['open'];
  }

  /**
   * Is the site connected to the top?
   * O(1)
   * @param {Number} row
   * @param {Number} col
   * @returns {Boolean}
   */
  isFull(row, col) {
    return this.grid[row][col]['top'];
  }

  /**
   * Returns number of open sites
   * O(1)
   * @returns {Number}
   */
  numberOfOpenSites() {
    return this.num_open;
  }

  /**
   * Does any site at the bottom connect to a site at the top?
   * O(N) where N is this.n
   * @returns {Boolean}
   */
  percolates() {
    for (let i = 0; i < this.n; i++) {
      if (this.grid[this.n - 1][i]['top']) return true;
    }

    return false;
  }

}