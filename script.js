const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 1,
        stagger: .2,
        delay: -1,
    })
    .from("#landingPageFooter", {
        y: -10,
        opacity: 0,
        delay: -1,
        stagger: .2,
        duration: 1,
        ease: Expo.easeInOut,
    })
}
var timeout;

function shrinkCircle(){
    // define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove" , function(dets){
        this.clearTimeout(timeout);
        xscale = gsap.utils.clamp(.7, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.7, 1.2, dets.clientY -yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);
        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`
        }, 100)

        
    })
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        // console.log(dets);
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`

    })
}
circleMouseFollower();
firstPageAnim();
shrinkCircle(); 

document.querySelectorAll(".elem").forEach(function(elem){
    var rotater = 0;
    var differ = 0;


    elem.addEventListener("mouseleave", function(e){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            duration: 0.5,
            ease: Power3,
        })
    })
    elem.addEventListener("mousemove", function(e) {
        var diff = e.clientY - elem.getBoundingClientRect().top;
        differ = e.clientX - rotater;
        rotater = e.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: e.clientX,
            rotate: gsap.utils.clamp(-20, 20, differ)
        })
        
    })
});