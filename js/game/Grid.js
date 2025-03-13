
class Grid {

  constructor (Nx, Ny) {
    this.Nx = Nx;
    this.Ny = Ny;
    this.N  = Nx * Ny;
  }

  ind2idx (i) {
    let x = i % Ny
    let y = Math.round(i/Ny - 0.5)
    return [ x, y ]
  }

  idx2ind (x, y) {
    return (y * this.Ny + x)
  }

}
