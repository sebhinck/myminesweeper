
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
    if (! this.clicked) {
      this.clicked = true;
    }
  }

  draw () {

    this.CellsnMines=0;
    //let text=this.i+" ("+this.x+","+this.y+") -N:"+this.nMines+"- ";
    let text="";
    //text=text+this.i//+" ("+this.x+","+this.y+") -N:"+this.nMines+"- ";
    text=text+" ("+this.x+","+this.y+")"//+ -N:"+this.nMines+"- ";
    text=text+" -N:"+this.nMines+"- ";
    let bg = "white";
    if (this.isMine) {
      //text = text + " (X)"
      bg="pink"
    } else {
      //text = text + " (-)"
    }
    this.drawbackground(bg);

    let textcol = "black";
    if (this.clicked) {
      textcol="red";
    }

    this.drawtext(text, textcol, "20px serif")

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
    this.ctx.fillText(text, this.x0 + dx/2, this.y0 + dx/2, 0.9*dx);
  }
}
