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
    game = new myMinesweeper(_dx, 10, 10,5, _canvas) ; // instantiate a new game object to reset values
    game.hideMenu();
    //e.target.style.display = 'none';
});

//console.log(game)

