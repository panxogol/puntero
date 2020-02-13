function dibujarLinea(color, x_inicial, y_inicial, x_final, y_final, lienzo) {
    //Aqui empieza el dibujo
    lienzo.beginPath(); //funcion para poner el lapiz
    lienzo.strokeStyle = color; //le da color a la linea, strokeStyle es una variable de lienzo
    lienzo.lineWidth = 3; //se establece que el ancho de la linea es de 3 pixeles
    lienzo.moveTo(x_inicial, y_inicial); //donde empezar a dibujar
    lienzo.lineTo(x_final, y_final); //el tipo de dibujo es una linea hasta el pto 200,200
    lienzo.stroke(); //Realizar el dibujo
    lienzo.closePath(); //funcion para terminar el dibujo o trazo
    //Si se desea crear un nuevo trazo, se debe realizar nuevamente un beginPath, en caso de que no se haga un cierre, se puede seguir dibujando pero a partir del punt en que se quedo la linea anterior.
}

//añadiremos una varieble que contiene constantes para asignar lo numeros 
//representativos de las teclas del teclado a una palabra, constante (ESCRITAS EN MAYÚSCULAS, buenas practicas)
//esta es la notación de json: javascript object notation
/* var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
}; */ //se pone punto y coma porque js lo interpreta como una sola linea de código

var cuadro = document.getElementById("area-de-dibujo");
var pintura = cuadro.getContext("2d");

cuadro.addEventListener("mousedown", dibujarPuntero);

/* var x = 150;
var y = 150;
var movimiento = 10; */
var colorcito = "black";

//dibujarLinea("black", 149, 149, 151, 151, pintura);

function dibujarPuntero(evento){
    console.log(evento);
    dibujarLinea(colorcito, event.layerX, event.layerY, event.layerX, event.layerY, pintura);
}

/* function dibujarTeclado(evento) {
    if (x >= 0 && x <= 300 && y >= 0 && y <= 300) {
        switch (evento.keyCode) { //keyCode es la variable que contiene el código numérico de la tecla segun el navegador
            case teclas.UP:
                if (y > 0) {
                    dibujarLinea("blue", x, y, x, y - movimiento, pintura);
                    y = y - movimiento;
                    break;
                } else {
                    break;
                }
            case teclas.DOWN:
                if (y < 300) {
                    dibujarLinea("red", x, y, x, y + movimiento, pintura);
                    y = y + movimiento;
                    break;
                } else {
                    break;
                }
            case teclas.LEFT:
                if (x > 0) {
                    dibujarLinea("green", x, y, x - movimiento, y, pintura);
                    x = x - movimiento;
                    break;
                } else {
                    break;
                }
            case teclas.RIGHT:
                if (x < 300) {
                    dibujarLinea("yellow", x, y, x + movimiento, y, pintura);
                    x = x + movimiento;
                    break;
                } else {
                    break;
                }
            default:
                console.log("otra tecla");
                break; //no es estrictamente necesario este break
        }
    }
} */