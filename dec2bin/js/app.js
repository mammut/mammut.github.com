console.log("Welcome to the binary decimal conversion tool! enjoy it :D")

var btn     = document.getElementById('convert');
var output  = document.getElementById('output');
var decimal = document.getElementById('decimal');

decimal.addEventListener('keyup', function(e){
    var pipe   = decimal.value.split('|');
    var number = pipe[0].split('.');

    var limit   = parseInt(pipe[1]) || 12;
    var integer = parseInt(number[0]) || 0;
    var dec     = parseFloat("0." + number[1]) || 0.0;

    output.innerText = int2bin(integer) + decimal2bin(dec, limit);
}, false);

decimal.addEventListener('keypress', function(e){
    if ( (e.charCode > 57 || e.charCode < 48) && (e.charCode != 46 && e.charCode != 124)) {
        e.preventDefault();
        output.innerText = "0.0";
    }
}, false);

function decimal2bin (dec, limit) {
    var i = 0;
    var binary = ".";
    while(i < limit && dec != 0) {
        dec *= 2;
        binary += parseInt(dec);
        dec = dec % 1;
        i++;
    }
    return binary == "." ? ".0" : binary;
}

function int2bin (dec) {
    var binary = "";
    while(dec != 0) {
        binary = dec % 2 + binary;
        dec /= 2;
        dec = parseInt(dec);
    }
    return binary == "" ? "0" : binary;
}

// Animations
var panel       = document.getElementById('panel');
var panelToggle = document.getElementById('panel-toggle');
panel.style.top = "-"+panel.clientHeight + "px";

panelToggle.addEventListener('click', function(){
    if (panel.style.top == '0px') {
        var to = panel.clientHeight;
        animate({
            delta: log,
            step: function(delta) {
                panel.style.top = "-"+ to*delta + "px";
            }
        });
    }else {
        var to = panel.clientHeight;
        animate({
            delta: log,
            step: function(delta) {
                panel.style.top = "-" + to*(1 - delta) + "px";
            }
        });
    }
}, false);

function animate (opts) {
    var start = new Date;
    var duration = opts.duration || 400;

    var s = setInterval(function(){
        var timePassed = new Date - start;
        var progress = timePassed/duration;

        if (progress > 1) progress = 1;

        var delta = opts.delta(progress);

        opts.step(delta);

        if (progress == 1) clearInterval(s);
    }, opts.delay || 10);
}

function log (d) {
    return Math.pow(d, 1);
}