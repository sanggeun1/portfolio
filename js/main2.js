$(document).ready(function () {
    //skrollr
    var s = skrollr.init();






    //skill graph
    $('.data-skill').each(function () {
        var item = $(this),
            skill = item.data('skill'),
            size = item.data('skill-size'),
            border = 5,
            radius = (size / 2) - border,
            circumference = 2 * Math.PI * radius,
            progress = circumference - ((circumference / 100) * skill),
            speed = 2000;


        aaa = progress;
        bbb = speed;

        item.append('<h4>0</h4><svg><defs><linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(90)"><stop offset="0%"  stop-color="#62C4DE"/><stop offset="100%" stop-color="#544A9C"/>   </linearGradient></defs><circle class="back" /> <circle class="front" stroke="url(#linear)" /></svg>');

        $({
            Counter: 0
        }).animate({
            Counter: skill
        }, {
            duration: speed,
            easing: 'swing',
            step: function () {
                item.find('h4').text(Math.ceil(this.Counter) + '%');
            }
        });

        item.find('svg').width(size).height(size);

        item.find('circle').attr({
            'r': radius,
            'cy': radius + border,
            'cx': radius + border
        });



        item.find('.front').css({
            'stroke-dasharray': circumference,
            'stroke-dashoffset': circumference
        });

        $(window).scroll(function () {
            var offset = $(window).scrollTop() + $(window).height() / 1.5;

            if (item.offset().top < offset) {
                item.find('.front').animate({
                    'stroke-dashoffset': progress
                }, speed);
            }
        });
    });
    var offset1 = $(".animation").offset().top;
    console.log(offset1);


    //slider


    var wheel = Draggable.create("#wheel", {
        type: "rotation",
        throwProps: true,
        snap: function (endValue) {
            return Math.round(endValue / 90) * 90;
        },
        onDrag: function () {},
        onThrowComplete: function () {
            dragActive()
        }
    });

    TweenMax.set('#wheel li:not(.active) .details > *', {
        opacity: 0,
        y: -10
    })

    // Calculate which product is active
    function dragActive() {
        var rot = wheel[0].rotation / 360
        var decimal = rot % 1
        var sliderLength = $('#wheel li').length
        var tempIndex = Math.round(sliderLength * decimal)
        var index

        if (rot < 0) {
            index = Math.abs(tempIndex)
        } else {
            index = sliderLength - tempIndex
        }

        if (decimal === 0) {
            index = 0
        }

        TweenMax.staggerTo('#wheel li.active .details > *', 0.6, {
            opacity: 0,
            y: -10
        }, 0.1)

        $('#wheel li.active').removeClass('active')
        $($('#wheel li')[index]).addClass('active')

        TweenMax.staggerTo('#wheel li.active .details > *', 0.6, {
            opacity: 1,
            y: 0
        }, 0.1)

    }

    // Tween rotation
    function rotateDraggable(deg, callback) {
        var rot = wheel[0].rotation
        var tl = new TimelineMax()

        tl
            .to('#wheel', .5, {
                rotation: rot + deg,
                onComplete: function () {
                    callback()
                }
            });

        wheel[0].rotation = rot + deg
    }

    // Handlers
    function nextHandler() {
        var current = $('#wheel li.active')
        var item = current + 1
        if (item > $('#wheel li').length) {
            item = 1
        }
        rotateDraggable(360 / $('#wheel li').length, dragActive);
    }

    function prevHandler() {
        var current = $('#wheel li.active')
        var item = current - 1
        if (item > 1) {
            item = $('#wheel li').length
        }
        rotateDraggable(-360 / $('#wheel li').length, dragActive);
    }

    $('.next').on('click', nextHandler);
    $('.prev').on('click', prevHandler);

    var square = '<svg x="0px" y="0px" width="1200px" height="600px" viewBox="0 0 1200 600"><rect x="0.002" y="0.499" width="1200" height="600"/></svg>'




    var offtop = $(".animation").offset().top;

    $(".animation>*").css({
        display: "none"
    });
    $(window).scroll(function (event) {
        var offset = $(window).scrollTop() + $(window).height() / 1.5;
        if (offtop < offset) {
            $(".animation>*").css({
                display: "block"
            });
        } else {
            $(".animation>*").css({
                display: "none"
            });
        }
    });

    startani = setInterval(function () {
        $("#Logo").toggle();
    }, 5000);
    startani2 = setInterval(function () {
        $("#Logo").show();
    }, 2000);



    var particles = document.getElementById("particles");

    function main() {
        var np = document.documentElement.clientWidth / 27;
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

    //clock


    (function () {

        //generate clock animations
        var now = new Date(),
            hourDeg = now.getHours() / 12 * 360 + now.getMinutes() / 60 * 30,
            minuteDeg = now.getMinutes() / 60 * 360 + now.getSeconds() / 60 * 6,
            secondDeg = now.getSeconds() / 60 * 360,
            stylesDeg = [
                    "@-webkit-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
                    "@-webkit-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
                    "@-webkit-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}",
                    "@-moz-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
                    "@-moz-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
                    "@-moz-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}"
                ].join("");

        document.getElementById("clock-animations").innerHTML = stylesDeg;

    })();

    $(".icon").click(function(){
       $(".nav_box").toggleClass("active");
       $(this).toggleClass("open");
       $(".box_effect").toggleClass("active");
    });
    
    
     // Add smooth scrolling to all links
     $("a").on('click', function (event) {

         // Make sure this.hash has a value before overriding default behavior
         if (this.hash !== "") {
             // Prevent default anchor click behavior
             

             // Store hash
             var hash = this.hash;

             // Using jQuery's animate() method to add smooth page scroll
             // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
             $('html, body').stop().animate({
                 scrollTop: $(hash).offset().top
             }, 800, function () {
                 
                 // Add hash (#) to URL when done scrolling (default click behavior)
                 window.location.hash = hash;
             });
         } // End if
     });




});
