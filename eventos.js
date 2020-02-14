function disableScroll(){  
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function(){ window.scrollTo(x, y) };
}

function enableScroll(){  
    window.onscroll = null;
}

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

function clickAbajo(evento) {
    //console.log(evento);
    seMantiene = true;
    xi = evento.layerX;
    yi = evento.layerY;
    //console.log(xi);
    //console.log(yi);
}
function moverLinea(evento) {
    xf = evento.layerX;
    yf = evento.layerY;
    if (seMantiene == true) {
        //desabilitarScroll();
        dibujarLinea(colorcito, xi, yi, xf, yf, pintura);
        xi = evento.layerX;
        yi = evento.layerY;
    }
}

function clickArriba(evento) {
    //console.log(evento);
    seMantiene = false;
}

var cuadro = document.getElementById("area-de-dibujo");
var pintura = cuadro.getContext("2d");
var btnBloqScroll = document.getElementById("btn-bloq-scroll");
var btnDesbScroll = document.getElementById("btn-desb-scroll");

var colorcito = "black";
var seMantiene = false; // esta variable estará en true mientras se mantenga presionado el click
var xi = 150;
var yi = 150;
var xf = 150;
var yf = 150;

//habilitar y deshabilitar scroll bar con los botones
//btnBloqScroll.addEventListener("touchstart", disableScroll);
//btnDesbScroll.addEventListener("touchstart", enableScroll);

cuadro.addEventListener("mouseover", disableScroll); //deshabilita el scroll mientras el mouse esté dentro del canvas
cuadro.addEventListener("mousedown", clickAbajo);
cuadro.addEventListener("mousemove", moverLinea);
cuadro.addEventListener("mouseup", clickArriba);
cuadro.addEventListener("mouseleave", enableScroll); //habilita el scroll una ves el mouse sale del canvas

//cuadro.addEventListener("touchstart", disableScroll);
cuadro.addEventListener("touchstart", clickAbajo);
cuadro.addEventListener("touchmove", moverLinea);
cuadro.addEventListener("touchend", clickArriba);
//cuadro.addEventListener("touchend", enableScroll);