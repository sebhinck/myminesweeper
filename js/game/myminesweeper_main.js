

class myMinesweeper {

  constructor (dx, Nx, Ny, Nm, canvas) {
    this.canvas=canvas;
    this.headerheight = 80;
    this.left=20;
    this.right=20;
    this.bottom=20;
    this.linewidth=2;

    this.timer=new Timer(document.getElementById("myTimer"), 500);

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

  showMenu() {
    let restartoverlay = document.getElementById("restartoverlay");
    restartoverlay.style.display='block';
    let rscontent = document.getElementById("rscontainer");
    rscontent.style.display='block';
  }

  hideMenu() {
    let restartoverlay = document.getElementById("restartoverlay");
    restartoverlay.style.display='none';
    let rscontent = document.getElementById("rscontainer");
    rscontent.style.display='none';
  }

  start() {
    this.hideMenu();
    this.timer.startTimer();
  }

  unbind() {
    this.canvas.removeEventListener('click', this.boundClickFunction);
    this.canvas.removeEventListener('contextmenu', this.boundClickFunction);
  }

  game_over() {
    console.log("Game Over!");
    this.timer.stopTimer();
    let restartoverlay = document.getElementById("restartoverlay");
    restartoverlay.style.display='block';
    let rscontent = document.getElementById("rscontainer");
    rscontent.style.display='none';
    this.grid.drawMines();
  }

  game_won() {
    console.log("Game won!");
    this.timer.stopTimer();
    let restartoverlay = document.getElementById("restartoverlay");
    restartoverlay.style.display='block';
    let rscontent = document.getElementById("rscontainer");
    rscontent.style.display='none';
    this.grid.drawMines();

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


    let container = document.getElementById("container");
    container.style.width= this.lx;
    let headerdiv = document.getElementById("headerContainer");
    headerdiv.style.width = this.grid.dx*this.grid.Nx + this.linewidth;
    headerdiv.style.height = this.headerheight - 2* this.bottom;
    headerdiv.style.marginLeft = this.left;
    headerdiv.style.marginRight = this.right;
    headerdiv.style.marginTop = this.bottom;
    //let timerdiv = document.getElementById("myTimer");
    //timerdiv.style.right = this.right;
    //timerdiv.style.top = this.bottom;

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
          console.log("first")
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
    ctx.fillStyle = "darkgoldenrod"; //"lightgrey";
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
