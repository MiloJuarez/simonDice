const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const rojo = document.getElementById("rojo");
const negro = document.getElementById("negro");
const btnEmpezar = document.getElementById("btnEmpezar");
let numNiveles = 1;
const POINTS = 10;
let score = 0;
let maxScore = 0;
let maxLevel = 0;

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 500);
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this);
    this.siguienteNivel = this.siguienteNivel.bind(this);
    btnEmpezar.classList.toggle("hide");
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
      rojo,
      negro,
    };
  }

  generarSecuencia() {
    this.secuencia = new Array(numNiveles)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 6));
  }

  siguienteNivel() {
    this.subnivel = 0;
    this.iluminarSecuencia();
    this.agregarClickEvent();
  }

  transformarNumToColor(numero) {
    switch (numero) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
      case 4:
        return "rojo";
      case 5:
        return "negro";
    }
  }

  transformarColorToNum(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "violeta":
        return 1;
      case "naranja":
        return 2;
      case "verde":
        return 3;
      case "rojo":
        return 4;
      case "negro":
        return 5;
    }
  }

  iluminarSecuencia() {
    for (let idx = 0; idx < this.nivel; idx++) {
      let color = this.transformarNumToColor(this.secuencia[idx]);
      setTimeout(() => this.iluminarColor(color), 1000 * idx);
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }

  agregarClickEvent() {
    // Con el metodo bind, especificamos que el this va a ser igual al objeto Juego y no al boton que se le dio click
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
    this.colores.rojo.addEventListener("click", this.elegirColor);
    this.colores.negro.addEventListener("click", this.elegirColor);
  }

  eliminarClickEvent() {
    this.colores.celeste.removeEventListener("click", this.elegirColor);
    this.colores.violeta.removeEventListener("click", this.elegirColor);
    this.colores.naranja.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
    this.colores.rojo.removeEventListener("click", this.elegirColor);
    this.colores.negro.removeEventListener("click", this.elegirColor);
  }

  elegirColor(event) {
    const nombreColor = event.target.dataset.color;
    const numeroColor = this.transformarColorToNum(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;
      score += this.subnivel * POINTS;
      document.getElementById("scoreValue").innerHTML = score;
      document.getElementById("levelValue").innerHTML = this.nivel;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminarClickEvent();
        if (this.nivel === numNiveles + 1) {
          maxScore = score;
          this.displayMaxs();
          this.gano();
        } else {
          this.saveScoreReached();
          setTimeout(() => {
            this.siguienteNivel();
            //this.generarSecuencia();
          }, 1500);
        }
      }
    } else {
      document.getElementById("levelValue").innerHTML = "1";
      this.perdio();
    }
  }

  gano() {
    swal("Simon dice", "Ganaste el juego", "success").then(this.inicializar);
  }

  perdio() {
    swal("Simon dice", "Perdiste el juego mi mai :(", "error").then(() => {
      this.eliminarClickEvent();
      this.inicializar();
    });
  }

  displayMaxs() {
    document.getElementById("maxScoreValue").innerHTML = maxScore;
    document.getElementById("maxLevelValue").innerHTML = this.nivel - 1;
    document.getElementById("scoreValue").innerHTML = 0;
    document.getElementById("levelValue").innerHTML = 0;
  }

  saveScoreReached() {
    if (score > maxScore) {
      maxScore = score;
      document.getElementById("maxScoreValue").innerHTML = maxScore;
    }
    if (this.nivel > maxLevel) {
      maxLevel = this.nivel - 1;
      document.getElementById("levelValue").innerHTML = maxLevel;
    }
  }
}

function clearInput() {
  document.getElementById("niveles").value = "";
  document.getElementById("niveles").focus();
}

function validateLevel(nivelChose) {
  let levelOK = false;
  if (nivelChose) {
    if (isNaN(Number(nivelChose))) {
      swal('Simon dice', 'Escriba un nivel valido', 'error')
      .then(() => clearInput());
    } if (Number(nivelChose) === 0) {
      swal('Simon dice', 'Escriba un nivel valido', 'error')
      .then(() => clearInput());
    }else {
      levelOK = true;
    }
  } else {
    swal('Simon dice', 'Escriba un nivel valido', 'error')
    .then(() => clearInput());
  }
  return levelOK;
}

function empezarJuego() {
  let nivelChose = document.getElementById('niveles').value;
  if (validateLevel(nivelChose)) {
    numNiveles = Number(nivelChose);
    window.juego = new Juego();
  }
  
}


