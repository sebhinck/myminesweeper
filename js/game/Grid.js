
class Grid {

  constructor (Nx, Ny, canvas, dx, header) {
    this.Nx = Nx;
    this.Ny = Ny;
    this.N  = Nx * Ny;
    this.nMines=0;
    this.Cells = [];
    this.dx = dx;
    this.canvas=canvas;
    this.header=header;
    console.log(header)
    this.left=0;
  }

  ind2idx (i) {
    let x = i % Ny
    let y = Math.round(i/Ny - 0.5)
    return [ x, y ]
  }

  idx2ind (x, y) {
    return (y * this.Ny + x)
  }

  leftclick(x, y) {
    console.log("leftclick", x, y, this.xFromCanvas(x), this.yFromCanvas(y))

  }

  initCells(indMines) {

    let ctx = this.canvas.getContext("2d");
    for (let y=0; y<Ny; y++) {
      for (let x=0; x<Nx; x++) {
        let i=this.idx2ind(x,y);
        let isMine=indMines.includes(i);
        this.Cells.push(new Cell(x, y, i, isMine, ctx, this.canvasX(x), this.canvasY(y), this.dx));
      }
    }

    this.countNeighborMines();
    console.log(this.Cells)
  }

  countNeighborMines() {
    for (let y=0; y<Ny; y++) {
      for (let x=0; x<Nx; x++) {
        let i = this.idx2ind(x,y);
        this.Cells[i].nMines=0;
        for (let dy=-1; dy<=1; dy++) {
          for (let dx=-1; dx<=1; dx++) {
            if (!((dx == 0) && (dy == 0))) {
              let nx=x+dx;
              let ny=y+dy;
              if ((nx >= 0) && (nx < Nx) && (ny >= 0) && (ny < Ny)) {
                if (this.Cells[this.idx2ind(nx, ny)].isMine) {
                  this.Cells[i].nMines++;
                }
              }
            }
          }
        }
      }
    }
  }

  canvasX(x) {
    return (x*this.dx + this.left);
  }

  canvasY(y) {
    return (y*this.dx + this.header);
  }

  xFromCanvas(X) {
    return (Math.round((X - this.left) / this.dx - 0.5))
  }
  yFromCanvas(Y) {
    return (Math.round((Y - this.header) / this.dx - 0.5))
  }

  draw() {

    let ctx = this.canvas.getContext("2d");

    // Draw cells
    for (let i=0; i<this.N; i++) {
      //console.log(this.Cells[i])
      this.Cells[i].draw();
    }

    // Draw grid
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 1;

    for (let x=0; x<=Nx; x++) {
      let xcoord = this.canvasX(x);
      ctx.moveTo(xcoord, this.header);
      ctx.lineTo(xcoord, this.canvasY(Ny));
      ctx.stroke();
    }

    for (let y=0; y<=Ny; y++) {
      let ycoord= this.canvasY(y);
      ctx.moveTo(this.left, ycoord);
      ctx.lineTo(this.canvasX(Nx), ycoord);
      ctx.stroke();
    }
  }

}
