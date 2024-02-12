
// Shery.mouseFollower();


var allH1 = document.querySelectorAll("#description h1")

allH1.forEach(function(elem) {
  var clutter = ""
  var h1Text = elem.textContent
  var splittedText = h1Text.split("")
  splittedText.forEach(function(e){
    clutter += `<span>${e}</span>`
  })
  elem.innerHTML = clutter
  // console.log(elem)
})




function init(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".container"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".container" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".container", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".container").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

init()


// cursor
var cursor = document.getElementById("cursor");
var resumebtn = document.querySelector("#resume");
var progress = document.querySelector(".progressbar");

var setwidth = 0;
setInterval(function() {
  if(setwidth < 100) {
    setwidth++;
     progress.style.width = `${setwidth}%`;
  } 
  else {
    progress.style.width = `${setwidth}%`;
  }
}, 30)


document.addEventListener("mouseenter", (e) => {
  gsap.to(cursor, {
    scale: 1,
  })
})


document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    top: e.clientY + "px",
    left: e.clientX + "px",
  })
})

document.addEventListener("mouseleave", (e) => {
  gsap.to(cursor, {
    scale: 0,
  })
})



resumebtn.addEventListener("mousemove", (e) => {
  cursor.innerHTML = "<h4>Open</h4>"
  gsap.to(cursor, {
    height: "90px",
    width: "90px",
    backgroundColor: "black",
    mixBlendMode: "normal",
    
  })
})

resumebtn.addEventListener("mouseleave", (e) => {
  cursor.innerHTML = ""
  gsap.to(cursor, {
    height: "15px",
    width: "15px",
    backgroundColor: "white",
    mixBlendMode: "difference",
  })
})



gsap.to("#home .home-content .name", {
  x:-300,
  scrollTrigger: {
    trigger:"#home .name",
    scroller:".container",
    start:"top 50%",
    end:"top 0%",
    scrub:2
  }
})

gsap.to("#home .home-content .developer", {
  x:300,
  scrollTrigger: {
    trigger:"#home .developer",
    scroller:".container",
    start:"top 60%",
    end:"top 10%",
    scrub:2
  }
})

gsap.to(".scroll .arrow", {
  y:-15,
  repeat:-1,
  yoyo:1,
})

gsap.from(".container #home #nav", {
  y:-100,
  duration:1,
  opacity:0,
  delay: 4,

})


gsap.from("#home .home-content .name, #home .home-content .developer, #home .home-content .greeting", {
  y:100,
  opacity:0,
  delay: 4,
  ease: "power4.inOut"
})

gsap.from(".loading h1", {
    opacity:0,
    duration: 2,
    ease: "power4.inOut"
})

gsap.to(".loading", {
    top: "-100%",
    delay:3.3,
    duration: 1,
    ease: "power4.inOut"
})

gsap.to("#about h5", {
  transform: 'translateY(0%)',
  stagger: 0.2,
  scrollTrigger: {
    // markers: true,
    trigger: "#about h5",
    scroller: ".container",
    start: "top 70%",


  }
})

gsap.to("#description h1 span", {
  color: "white",
  stagger: 0.1,
  scrollTrigger: {
    trigger: "#description h1",
    scroller: ".container",
    // markers: true,
    start: "top 50%",
    end: "top 15%",
    scrub: 3,
  }
})

var links = document.querySelectorAll("#footer a")

links.forEach((link) => {
  link.addEventListener("mousemove", (e) => {
    cursor.innerHTML = "<h4>Open</h4>"
    gsap.to(cursor, {
      height: "150px",
      width: "150px",
      color: "white",
      backgroundColor: "black",
      fontSize: "20px",
      // backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "normal",
      
    })
  })
  
  link.addEventListener("mouseleave", (e) => {
    cursor.innerHTML = ""
    gsap.to(cursor, {
      height: "15px",
      width: "15px",
      // color: "black",
      fontSize: "14px",
      backgroundColor: "white",
      mixBlendMode: "difference",
    })
  })
  
})

gsap.to(".projects-slider h1", {
  transform: "translateX(-65%)",
  scrollTrigger: {
    // markers: true,
    trigger: ".projects-slider",
    scroller: ".container",
    scrub: 4,
    start: "top 0%",
    end: "top -100%",
    pin: true,

  }
})

var tl = gsap.timeline({
  scrollTrigger: {
    // markers: true,
    trigger: "#description",
    scroller: ".container",
    start: "top 30%",
    end: "top 70%",
    scrub: 2,
    duration: 1,
  }
})

tl.to(".container", {
  backgroundColor: "black",
})


var tl2 = gsap.timeline({
  scrollTrigger: {
    // markers: true,
    trigger: "#about",
    scroller: ".container",
    start: "top 30%",
    end: "top 70%",
    scrub: 2,
    duration: 1,
  }
})

tl2.to(".container", {
  backgroundColor: "white",
})

