
class myMinesweeper {

  constructor (dx, Nx, Ny, Nm, canvas) {
    this.canvas=canvas
    this.game_reset(dx, Nx, Ny, Nm);

    console.log(this.Cells);
  }

  game_reset (dx, Nx, Ny, Nm) {
    this.grid = new Grid(Nx, Ny);
    this.Nm=Nm;

    if (this.grid.N <= this.Nm) {
      throw new Error("Error! More Mines than Cells requested!");
    }

    this.lx=dx*this.grid.Nx
    this.ly=dx*this.grid.Ny

    this.canvas.width=this.lx
    this.canvas.height=this.ly

    this.Cells=[]

    let indMines = this.getMinesInd();
    console.log(indMines)

    for (let y=0; y<Ny; y++) {
      for (let x=0; x<Nx; x++) {
        let i=this.grid.idx2ind(x,y);
        let isMine=indMines.includes(i);
        let [_x, _y] = this.grid.ind2idx(i);
        this.Cells.push(new Cell(_x, _y, i, isMine));
      }
    }
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

    //return(b.sort(function(a, b) {return (a - b);}));
    return(b.sort((a, b) => (a - b)));
  }

  getMinesInd2() {
    let a = Array.from(Array(this.Nm).keys());
    let b = []
    for (let i=0; i<this.Nm; i++) {
      let rand_ind = Math.round(Math.random() * (this.Nm - i) - 0.5);
      //console.log(rand_ind)
      console.log(a.length)
      b.push(a[rand_ind]);
      delete a[rand_ind]
    }
    return(b)
  }

}
