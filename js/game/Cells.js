
class Cell {
  constructor (x, y, i, isMine, ctx, x0, y0, dx) {
    this.x=x;
    this.y=y;
    this.i=i;
    this.isMine=isMine;
    this.ctx=ctx;
    this.x0=x0;
    this.y0=y0;
    this.dx=dx;
    this.nMines=0;
    this.clicked=false;
  }

  click() {
    let clickresult = 0;

    if (! this.clicked) {
      if (this.isMine) {
        clickresult = -1;
      } else {
        clickresult = 1;
      }
      this.clicked = true;
      this.draw();
    }
    return (clickresult)
  }

  draw () {
    let unclickedCol = "green",
        mineCol = "darkgreen",
        //mineCol = "green",
        mineExplodedCol = "red",
        clickedCol = "white";
    //this.CellsnMines=0;
    //let text=this.i+" ("+this.x+","+this.y+") -N:"+this.nMines+"- ";
    let text="";
    let debugtext="";
    //text=text+this.i//+" ("+this.x+","+this.y+") -N:"+this.nMines+"- ";
    debugtext=debugtext+" ("+this.x+","+this.y+")"//+ -N:"+this.nMines+"- ";

    let bg = "";

    if (this.clicked) {
      bg = clickedCol;
    } else {
      bg = unclickedCol;
    }

    if (this.isMine) {
      //text = text + " (X)"
      if (this.clicked) {
        bg = mineExplodedCol;
      } else {
        bg = mineCol;
      }
      debugtext=debugtext+" -M- ";
    } else {
      debugtext=debugtext+" -N:"+this.nMines+"- ";
      //text = text + " (-)"
    }

    this.drawbackground(bg);

    if (((this.x + this.y) % 2) == 0) {
      this.ctx.globalAlpha = 0.1;
      this.drawbackground('black');
      this.ctx.globalAlpha = 1.0;
    }

    let textcol = "black";
    if (this.clicked) {
      //textcol="red";
      if ((this.nMines > 0) && (! this.isMine)) {
        switch (this.nMines) {
          case 1:
            textcol='blue';
            break;
          case 2:
            textcol='green';
            break;
          case 3:
            textcol='gold';
            break;
          case 4:
            textcol='purple';
            break;
          case 5:
            textcol='red';
            break;
          case 6:
            textcol='darkred';
            break;
          case 7:
            textcol='pink';
            break;
          case 8:
            textcol='black';
            break;
          default:
            textcol='black';
        }
        text = text + this.nMines;
      }
    }

    let fontsize=Math.round(this.dx * 0.9)

    this.drawtext(text, textcol, fontsize+"px bolder arial");
    if (debug) {
      this.drawdebugtext(debugtext, textcol, "20px serif");
    }

  }

  drawbackground(col="white") {
    this.ctx.fillStyle = col;
    this.ctx.fillRect(this.x0, this.y0, this.dx, this.dx);
  }

  drawtext(text, col="black", font="10px serif") {
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = font;
    this.ctx.fillStyle = col;
    this.ctx.fillText(text, this.x0 + this.dx/2, this.y0 + this.dx/2, 0.9*this.dx);
  }

  drawdebugtext(text, col="black", font="10px serif") {
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
    this.ctx.font = font;
    this.ctx.fillStyle = col;
    this.ctx.fillText(text, this.x0, this.y0, 0.9*this.dx);
  }

  drawcircle(col='black') {
    this.ctx.beginPath();
    this.ctx.arc(this.x0+this.dx/2, this.y0 + this.dx/2, this.dx * 0.35, 0, 2*Math.PI);
    this.ctx.strokeStyle = col;
    this.ctx.stroke();
  }

  drawMine() {
    if (this.isMine) {
      let col = 'red';
      if (this.clicked) {
        col = 'black';
      }
      this.drawcircle(col);
    }
  }

}
