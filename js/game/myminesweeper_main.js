

class myMinesweeper {

  constructor (dx, Nx, Ny, Nm, canvas) {
    this.canvas=canvas;
    this.headerheight = 80;
    this.left=20;
    this.right=20;
    this.bottom=20;
    this.linewidth=2;

    this.game_reset(dx, Nx, Ny, Nm);
    let rect = this.canvas.getBoundingClientRect();
    this.canvasLeft = rect.left;
    this.canvasTop  = rect.top;

    this.boundClickFunction = this.clickFunction.bind(this);
    this.canvas.addEventListener("click", this.boundClickFunction);
    this.canvas.addEventListener("contextmenu", this.boundClickFunction, false);

    let restartoverlay = document.getElementById("restartoverlay");
    restartoverlay.addEventListener("click", e => {
      let rscontent = document.getElementById("rscontainer");
      rscontent.style.display='block';
    });
  }

  Init() {
    let restartoverlay = document.getElementById("restartoverlay");
    restartoverlay.style.display='block';
    let rscontent = document.getElementById("rscontainer");
    rscontent.style.display='block';
  }

  start() {
    let restartoverlay = document.getElementById("restartoverlay");
    restartoverlay.style.display='none';
  }

  unbind() {
    this.canvas.removeEventListener('click', this.boundClickFunction);
    this.canvas.removeEventListener('contextmenu', this.boundClickFunction);
  }

  game_over() {
    console.log("Game Over!");
    let restartoverlay = document.getElementById("restartoverlay");
    restartoverlay.style.display='block';
    let rscontent = document.getElementById("rscontainer");
    rscontent.style.display='none';
    this.grid.drawMines();
  }

  game_won() {
    console.log("Game won!");
    let restartoverlay = document.getElementById("restartoverlay");
    restartoverlay.style.display='block';
    let rscontent = document.getElementById("rscontainer");
    rscontent.style.display='none';
    this.grid.drawMines();

    //window.open(wonurl, '_blank').focus();
    //document.getElementById("myytdiv").style.display='block'
    console.log(player)
    let ytdiv = document.getElementById("myytdiv");
    ytdiv.style.display='block';
    player.startVideo()
  }

  game_reset (dx, Nx, Ny, Nm) {
    this.grid = new Grid(Nx, Ny, this.canvas, dx, this.headerheight, this.left, this.linewidth);
    this.Nm=Nm;
    this.dx=dx;
    this.notMines = this.grid.N - this.Nm;
    this.firstClick = true;

    if (this.grid.N <= this.Nm) {
      throw new Error("Error! More Mines than Cells requested!");
    }

    let indMines = this.getMinesInd();

    this.grid.initCells(indMines);

    this.lx = this.grid.dx*this.grid.Nx + this.left + this.right;
    this.ly = this.grid.dx*this.grid.Ny + this.headerheight + this.bottom;

    this.canvas.width  = this.lx;
    this.canvas.height = this.ly;

    let restartoverlay = document.getElementById("restartoverlay");
    restartoverlay.style.left=this.canvas.style.left + this.left - this.linewidth/2;
    restartoverlay.style.top=this.canvas.style.top + this.headerheight - this.linewidth/2;
    restartoverlay.style.width= this.grid.dx * this.grid.Nx + this.linewidth;
    restartoverlay.style.height= this.grid.dx * this.grid.Ny+ this.linewidth;
    restartoverlay.style.display='none';
    restartoverlay.style.display='block';

    this.drawGame();
  }

  clickFunction(event) {

    var x = event.pageX - this.canvasLeft,
        y = event.pageY - this.canvasTop;

    if ((x > this.left) &&
        (x < (this.lx - this.right) &&
        (y > this.headerheight) &&
        (y < (this.ly - this.bottom)))) {

      if (event.type=="contextmenu") {
        event.preventDefault();
        // this.grid.rightclick(event.x, event.y);
        console.log("rclick", this)
      } else {

        if (this.firstClick) {
          while (this.grid.checkclick(x, y)) {
            this.game_reset(this.grid.dx, this.grid.Nx, this.grid.Ny, this.Nm);
          }
          this.firstClick = false;
          this.start();
        }


        let clickresult = this.grid.leftclick(x, y);
        if (clickresult == -1) {
          this.game_over();
        } else if (clickresult > 0) {
          this.notMines -= clickresult;
          if (this.notMines == 0) {
            this.game_won();
          }
        }
      }
    }

    return(false);
  }

  drawGame() {
    let ctx = this.canvas.getContext("2d");
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 0, this.lx, this.ly);

    this.grid.draw();
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
