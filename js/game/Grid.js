
class Grid {

  constructor (Nx, Ny, canvas, dx, header, left, linewidth) {
    this.Nx = Nx;
    this.Ny = Ny;
    this.N  = Nx * Ny;
    this.nMines=0;
    this.Cells = [];
    this.dx = dx;
    this.canvas=canvas;
    this.header=header;
    this.left=left;
    this.linewidth=linewidth;
  }

  ind2idx (i) {
    let x = i % this.Ny
    let y = Math.round(i/this.Ny - 0.5)
    return [ x, y ]
  }

  idx2ind (x, y) {
    return (y * this.Ny + x)
  }

  clickCell(x, y) {
    let clickresult = 0;
    let i = this.idx2ind(x, y);

    if (!this.Cells[i].clicked) {
      clickresult = this.Cells[i].click();

      if ((this.Cells[i].nMines == 0) && (!this.Cells[i].isMine)) {

        let iNeighbors = this.getNeighborCells(i);
        for (let j=0; j<iNeighbors.length; j++) {
          let ni = iNeighbors[j];
          let [nx, ny] = this.ind2idx(ni);
          clickresult = clickresult + this.clickCell(nx, ny);
        }
      }
    }
    return(clickresult)
  }

  leftclick(x, y) {
    let X = this.xFromCanvas(x),
        Y = this.yFromCanvas(y);

    let clickresult = this.clickCell(X, Y);

    this.drawGrid();

    return(clickresult)

  }

  rightclick(x, y) {
    let X = this.xFromCanvas(x),
        Y = this.yFromCanvas(y),
        i = this.idx2ind(X, Y);

    this.Cells[i].mark();

    this.drawGrid();
  }

  checkclick(x, y) {
    let X = this.xFromCanvas(x),
        Y = this.yFromCanvas(y),
        i = this.idx2ind(X, Y);

    let clickresult = this.Cells[i].isMine;

    return(clickresult)
  }

  initCells(indMines) {

    let ctx = this.canvas.getContext("2d");
    for (let y=0; y<this.Ny; y++) {
      for (let x=0; x<this.Nx; x++) {
        let i=this.idx2ind(x,y);
        let isMine=indMines.includes(i);
        this.Cells.push(new Cell(x, y, i, isMine, ctx, this.canvasX(x), this.canvasY(y), this.dx));
      }
    }

    this.countNeighborMines();
  }

  countNeighborMines() {
    for (let i=0; i<this.N; i++) {
      this.Cells[i].nMines=0;
      let iNeighbors = this.getNeighborCells(i);
      for (let j=0; j<iNeighbors.length; j++) {
        let ni = iNeighbors[j];
        if (this.Cells[ni].isMine) {
          this.Cells[i].nMines++;
        }
      }
    }
  }

  countNeighborMines2() {
    for (let y=0; y<this.Ny; y++) {
      for (let x=0; x<this.Nx; x++) {
        let i = this.idx2ind(x,y);
        this.Cells[i].nMines=0;
        for (let dy=-1; dy<=1; dy++) {
          for (let dx=-1; dx<=1; dx++) {
            if (!((dx == 0) && (dy == 0))) {
              let nx=x+dx;
              let ny=y+dy;
              if ((nx >= 0) && (nx < this.Nx) && (ny >= 0) && (ny < this.Ny)) {
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

  getNeighborCells(i) {
    let iNeighbors=[];
    let [x, y] = this.ind2idx(i);
    for (let dy=-1; dy<=1; dy++) {
      for (let dx=-1; dx<=1; dx++) {
        if (!((dx == 0) && (dy == 0))) {
          let nx=x+dx;
          let ny=y+dy;
          if ((nx >= 0) && (nx < this.Nx) && (ny >= 0) && (ny < this.Ny)) {
            iNeighbors.push(this.idx2ind(nx, ny));
          }
        }
      }
    }
  return(iNeighbors)
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

  drawGrid() {
    let ctx = this.canvas.getContext("2d");

    // Draw grid
    ctx.strokeStyle = "orange";
    ctx.lineWidth = this.linewidth;

    for (let x=0; x<=this.Nx; x++) {
      let xcoord = this.canvasX(x) - this.linewidth/2;
      ctx.moveTo(xcoord, this.header - this.linewidth/2);
      ctx.lineTo(xcoord, this.canvasY(this.Ny) - this.linewidth/2);
      ctx.stroke();
    }

    for (let y=0; y<=this.Ny; y++) {
      let ycoord= this.canvasY(y) - this.linewidth/2;
      ctx.moveTo(this.left - this.linewidth/2, ycoord);
      ctx.lineTo(this.canvasX(this.Nx) - this.linewidth/2, ycoord);
      ctx.stroke();
    }

  }

  draw() {
    // Draw cells
    for (let i=0; i<this.N; i++) {
      this.Cells[i].draw();
    }

    this.drawGrid();

  }

  drawMines() {
    for (let i=0; i<this.N; i++) {
      this.Cells[i].drawMine();
    }
  }

}
