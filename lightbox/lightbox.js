var modal = document.getElementById("modal");
var img = document.getElementsByTagName("img");
var mode = document.getElementById("mode");
var base = document.getElementById("base");
var indicator = document.getElementsByClassName("indicators");

var source = [];

$('.main').each(function () {
    source.push(this.src);
}).get();

var indicatorSource = [];

$('.indicators').each(function () {
    indicatorSource.push(this.src);
}).get();


var a;
var b;

$('.main').click(function () {
    modal.style.display = "block";
    base.style.position = "fixed";
    base.style.opacity = "0.3";
    mode.src = this.src;

    a = document.getElementById("mode").src;
    b = indicatorSource.indexOf(a);
    indicator[b].className += " active";
})

$('.indicators').click(function () {
    mode.src = this.src;

    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");

    a = document.getElementById("mode").src;
    b = indicatorSource.indexOf(a);
    indicator[b].className += " active";
})

var span = document.getElementById("close");
span.onclick = function () {
    modal.style.display = "none";
    base.style.position = "inherit";
    base.style.opacity = "1";

    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
}


function changeFocus(x) {
    for (i = 0; i < indicator.length; i++) {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        indicator[x].className += " active";
    }
}

function left() {
    var y = mode.src;
    var x = source.indexOf(y);
    if (x <= 0) { x = source.length; }
    x--;
    mode.src = source[x];
    changeFocus(x);
}

function right() {
    var y = mode.src;
    var x = source.indexOf(y);
    if (x >= source.length - 1) { x = -1; }
    x++;
    mode.src = source[x];
    changeFocus(x);
}

document.getElementById('big').addEventListener("swiped-left", right);

document.getElementById('big').addEventListener("swiped-right", left);