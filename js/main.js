$(document).ready(function () {


    //마우스 변환 효과
    var cursor = $(".cursor"),
        mouseX = 0,
        mouseY = 0;
    $(document).mousemove(function (e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    TweenMax.to({}, 0.016, {
        repeat: -1,
        onRepeat: function () {
            TweenMax.set(cursor, {
                css: {
                    left: mouseX - 10,
                    top: mouseY - 10
                }
            })
        }
    });

    $(".cursorover").on('mouseenter', function () {
        cursor.addClass("active");
    });
    $(".cursorover").on('mouseleave', function () {
        cursor.removeClass("active");
    });
    var particles = document.getElementById("particles");

    function main() {
        var np = document.documentElement.clientWidth / 100;
        particles.innerHTML = "";
        for (var i = 0; i < np; i++) {
            var w = document.documentElement.clientWidth;
            var h = document.documentElement.clientHeight;
            var rndw = Math.floor(Math.random() * w) + 1;
            var rndh = Math.floor(Math.random() * h) + 1;
            var widthpt = Math.floor(Math.random() * 8) + 3;
            var opty = Math.floor(Math.random() * 5) + 2;
            var anima = Math.floor(Math.random() * 12) + 8;

            var div = document.createElement("div");
            div.classList.add("particle");
            div.style.marginLeft = rndw + "px";
            div.style.marginTop = rndh + "px";
            div.style.width = widthpt + "px";
            div.style.height = widthpt + "px";
            div.style.background = "white";
            div.style.opacity = opty;
            div.style.animation = "move " + anima + "s ease-in infinite ";
            particles.appendChild(div);
        }
    }
    window.addEventListener("resize", main);
    window.addEventListener("load", main);
    
    
    
});
