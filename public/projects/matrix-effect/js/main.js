$(document).ready(function () {
    var canvas = document.getElementById("mainCanvas");
    canvas.width = document.body.clientWidth;
    canvas.height = $(window).height();
    var s = window.screen;
    var yPositions = Array(300).join(0).split('');
    var ctx = canvas.getContext('2d');

    var draw = function () {
        ctx.fillStyle = 'rgba(0,0,0,.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        // ctx.fillStyle='#f54700';
        ctx.font = '10pt Georgia';
        yPositions.map(function (y, index) {
            text = String.fromCharCode(1e2 + Math.random() * 33);
            x = (index * 10) + 10;
            canvas.getContext('2d').fillText(text, x, y);
            if (y > 100 + Math.random() * 1e4) {
                yPositions[index] = 0;
            }
            else {
                yPositions[index] = y + 10;
            }
        });
    };
    RunMatrix();
    function RunMatrix() {
        if (typeof Game_Interval != "undefined") clearInterval(Game_Interval);
        Game_Interval = setInterval(draw, 10);
    }
    function StopMatrix() {
        clearInterval(Game_Interval);
    }
    $("button#pause").click(function () {
        StopMatrix();
    });
    $("button#play").click(function () {
        RunMatrix();
    });
})