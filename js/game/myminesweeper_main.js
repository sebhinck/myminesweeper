
class myMinesweeper {

  constructor (dx, Nx, Ny, Nm, canvas) {
    this.canvas=canvas;
    this.headerheight = 50;
    this.left=0;
    this.game_reset(dx, Nx, Ny, Nm);
    this.canvasLeft = this.canvas.offsetLeft + this.canvas.clientLeft;
    this.canvasTop  = this.canvas.offsetTop  + this.canvas.clientTop;

    this.canvas.addEventListener("click", this.clickFunction.bind(this));
    this.canvas.addEventListener("contextmenu", this.clickFunction, false);
  }

  game_reset (dx, Nx, Ny, Nm) {
    this.grid = new Grid(Nx, Ny, canvas, dx, this.headerheight);
    console.log(this.headerheight)
    this.Nm=Nm;
    this.dx=dx;

    if (this.grid.N <= this.Nm) {
      throw new Error("Error! More Mines than Cells requested!");
    }

    this.lx=dx*this.grid.Nx + this.left;
    this.ly=dx*this.grid.Ny + this.headerheight;

    this.canvas.width=this.lx
    this.canvas.height=this.ly

    let indMines = this.getMinesInd();
    console.log(indMines)

    this.grid.initCells(indMines);

    this.grid.draw();
  }

  clickFunction(event) {
    console.log(this)
    console.log(this.grid)

    console.log(event);

    var x = event.pageX - this.canvasLeft,
        y = event.pageY - this.canvasTop; 

    if (event.type=="contextmenu") {
      event.preventDefault();
      // this.grid.rightclick(event.x, event.y);
    } else {
      this.grid.leftclick(x, y);
    }

    return(false);
  }

  getMinesInd() {
    let b = [];
    let i = 0;

    while (i < this.Nm) {
      let rand_ind = Math.round(Math.random() * this.grid.N - 0.5);
      if (! b.includes(rand_ind)) {
        b.push(rand_ind);
        i++;
      }
    }

    return(b.sort((a, b) => (a - b)));
  }

}
