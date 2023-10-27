Shery.mouseFollower();

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

gsap.to("#home .name", {
  x:-300,
  scrollTrigger: {
    trigger:"#home .name",
    scroller:".container",
    start:"top 40%",
    end:"top 5%",
    scrub:2
  }
})

gsap.to("#home .developer", {
  x:300,
  scrollTrigger: {
    trigger:"#home .developer",
    scroller:".container",
    start:"top 50%",
    end:"top 10%",
    scrub:2
  }
})

gsap.to(".scroll .arrow", {
  y:-15,
  repeat:-1,
  yoyo:1,
})


gsap.from("#about img", {
  transition:"all ease 0.5s",
  scale:0,
  duration:1,
  scrollTrigger: {
    trigger:"#about img",
    scroller:".container",
    start: "top 120%",
    end: "top 50%"
  }
})

gsap.from("#about p", {
  y:50,
  opacity:0,
  scrollTrigger: {
    scrub: 2,
    trigger:"#about p",
    scroller:".container",
    start: "top 80%",
    end: "top 50%"
  }
})

var tl = gsap.timeline()
tl.from("#myskills .skill",{
  y:60,
  stagger:1,
  opacity:0,
  scrollTrigger:{
    scrub:true,
    trigger:"#myskills .skill",
    scroller:".container",
    end:"top 25%"
  } 
})

gsap.from(".container #nav", {
  y:-100,
  duration:1,
  opacity:0
})

gsap.to("#home .name, #home .developer", {
  transform: "translateY(0%)",
  delay: 0.5,
})
