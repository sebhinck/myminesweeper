//import "./game/myminesweeper_masin.js"
let _dx=50
let _Nx=16
let _Ny=16
let _Nm=30

const _canvas = document.getElementById("mygamecanvas");
const _restartbutton = document.getElementById("restart");
console.log(_restartbutton)

let debug = false;
//debug = true;
game = new myMinesweeper(_dx, _Nx, _Ny, _Nm, _canvas)
game.showMenu();

_restartbutton.addEventListener('click', e => {
  game.unbind();
  [Nx, Ny, Nm] = readRestartForm();
  game = new myMinesweeper(_dx, Nx, Ny, Nm, _canvas) ; // instantiate a new game object to reset values
  game.hideMenu();
});

const form = document.getElementById("restartForm");
form.addEventListener('input', e => {
  [Nx, Ny, Nm] = readRestartForm();
  let N  = Nx * Ny;
  document.getElementById("restartOut").innerHTML="("+Nx+"x"+Ny+") => "+ N+ " cells => "+ Nm + " mines.."
});

var event = new Event('input');
form.dispatchEvent(event);


function readRestartForm() {
  //const _form = document.getElementById("restartForm");
  const __Nx = document.getElementById("Nx").value;
  const __Ny = document.getElementById("Ny").value;
  const __fMines = document.getElementById("fracMines").value;
  //console.log(__Nx)
  let __N  = __Nx * __Ny,
      __Nm = Math.floor(__N * __fMines);
  return [__Nx, __Ny, __Nm]
}
