class Timer{

constructor(div, delay) {
  this.div = div;
  this.t = 0;
  this.delay=delay;

  this.resetTimer();
}

startTimer() {
  if (!this.interval) {
    let t=this;
    this.interval = setInterval(function(){t.update();}, this.delay);
    console.log("start")
  }
}

stopTimer() {
  clearInterval(this.interval);
  this.interval=null;
}

resetTimer() {
  this.stopTimer();
  this.t = 0;
  this.div.innerHTML= this.format_time(this.t);
}

update() {
  this.t+= this.delay;
  this.div.innerHTML= this.format_time(this.t);
}

format_time(t) {
  let t_secs = Math.floor(t/1000) + 3595;
  let h = Math.floor(t_secs / 3600);
  t_secs -= h * 3600;
  let m = Math.floor(t_secs / 60);
  t_secs -= m * 60;
  let s = t_secs;

  let out = "";
  if (h > 0) {
    out += h.toString().padStart(2, '0') + ":";
  }

  //if ((m > 9) || (h > 0)) {
  out += m.toString().padStart(2, '0');
  //} else {
    //out += m.toString();
  //}

  out += ":" + s.toString().padStart(2, '0');

  let whitespace = "&nbsp;",
      _n = 8 - out.length;
  if (_n > 0) {
    out = whitespace.repeat(8 - out.length) + out;
  }

  return( out )
}

}
