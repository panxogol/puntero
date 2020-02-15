//funcion para refrescar el dibujo
function refreshCanvas() {
    var canvas = document.getElementById("area-de-dibujo");
    canvas.width = canvas.width;
}

//Se inserta el código para la solucion en dispostivos touch

var ongoingTouches = new Array;

function colorForTouch(touch) {
    var id = touch.identifier;
    console.log(id);
    idR = (id*10).toString(16); // make it a hex digit
    idG = (id*5).toString(16);
    idB = (id*15).toString(16);
    return "#" + idR + idG + idB; //cuando hy más de un punto de contacto, se dibuja con otro color
}

function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
        var id = ongoingTouches[i].identifier;

        if (id == idToFind) {
            return i;
        }
    }
    return -1;    // not found
}

function handleStart(evt) { //inicia un toque
    evt.preventDefault(); //funcion para evitar bugs con dispositivos touch
    var el = document.getElementById("area-de-dibujo");
    var ctx = el.getContext("2d");
    var cnvs = ctx.canvas;
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        ongoingTouches.push(touches[i]);
        var color = colorForTouch(touches[i]);
        ctx.fillStyle = color;
        ctx.fillRect(touches[i].pageX - cnvs.offsetTop, touches[i].pageY - cnvs.offsetLeft, 3, 3);
    }
}

function handleMove(evt) {
    evt.preventDefault();
    var cuadro = document.getElementById("area-de-dibujo");
    var ctx = cuadro.getContext("2d");
    var cnvs = ctx.canvas;
    var touches = evt.changedTouches;

    ctx.lineWidth = 3;

    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(ongoingTouches[idx].pageX - cnvs.offsetLeft, ongoingTouches[idx].pageY - cnvs.offsetTop);
        ctx.lineTo(touches[i].pageX - cnvs.offsetLeft, touches[i].pageY - cnvs.offsetTop);
        ctx.closePath();
        ctx.stroke();
        ongoingTouches.splice(idx, 1, touches[i]);  // swap in the new touch record
    }
}

function handleEnd(evt) {
    evt.preventDefault();
    var cuadro = document.getElementById("area-de-dibujo");
    var ctx = cuadro.getContext("2d");
    var touches = evt.changedTouches;

    ctx.lineWidth = 3;

    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(ongoingTouches[i].pageX, ongoingTouches[i].pageY);
        ctx.lineTo(touches[i].pageX, touches[i].pageY);
        ongoingTouches.splice(i, 1);  // remove it; we're done
    }
}

function handleCancel(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        ongoingTouches.splice(i, 1);  // remove it; we're done
    }
}

//finalizan las funciones para dispositivos touch

//funciones para bloquear y desbloquear scroll bar
/* function disableScroll() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () {
        window.scrollTo(x, y);
    };
}

function enableScroll() {
    window.onscroll = null;
} */

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
    //console.log(evento);
    if (seMantiene == true) {
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
//btnBloqScroll.addEventListener("click", disableScroll);
//btnDesbScroll.addEventListener("click", enableScroll);

//cuadro.addEventListener("mouseover", disableScroll); //deshabilita el scroll mientras el mouse esté dentro del canvas
cuadro.addEventListener("mousedown", clickAbajo);
cuadro.addEventListener("mousemove", moverLinea);
cuadro.addEventListener("mouseup", clickArriba);
//cuadro.addEventListener("mouseleave", enableScroll); //habilita el scroll una ves el mouse sale del canvas

//cuadro.addEventListener("touchstart", disableScroll);
//cuadro.addEventListener("touchstart", clickAbajo);
//cuadro.addEventListener("touchmove", moverLinea);
//cuadro.addEventListener("touchend", clickArriba);
//cuadro.addEventListener("touchend", enableScroll);

//listeners para dispositivos touch
cuadro.addEventListener("touchstart", handleStart, false);
cuadro.addEventListener("touchend", handleEnd, false);
cuadro.addEventListener("touchcancel", handleCancel, false);
cuadro.addEventListener("touchleave", handleEnd, false);
cuadro.addEventListener("touchmove", handleMove, false);