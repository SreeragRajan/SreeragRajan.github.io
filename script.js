var cursor = document.getElementById("cursor");
var resumebtn = document.querySelector("#resume");
var progress = document.querySelector(".progressbar");
var allH1 = document.querySelectorAll("#description h1");
var links = document.querySelectorAll("#footer a");

function textEffect() {
  allH1.forEach(function (elem) {
    var clutter = "";
    var h1Text = elem.textContent;
    var splittedText = h1Text.split("");
    splittedText.forEach(function (e) {
      clutter += `<span>${e}</span>`;
    });
    elem.innerHTML = clutter;
  });
}

function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".container"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".container" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".container", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".container").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function progressAnimation() {
  var setwidth = 0;
  setInterval(function () {
    if (setwidth < 100) {
      setwidth++;
      progress.style.width = `${setwidth}%`;
    } else {
      progress.style.width = `${setwidth}%`;
    }
  }, 30);
}

function customCursor() {
  document.addEventListener("mouseenter", (e) => {
    gsap.to(cursor, {
      scale: 1,
    });
  });

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      top: e.clientY + "px",
      left: e.clientX + "px",
    });
  });

  document.addEventListener("mouseleave", (e) => {
    gsap.to(cursor, {
      scale: 0,
    });
  });
}

function resumebtnEffect() {
  resumebtn.addEventListener("mousemove", (e) => {
    cursor.innerHTML = "<h4>Open</h4>";
    gsap.to(cursor, {
      height: "90px",
      width: "90px",
      backgroundColor: "black",
      mixBlendMode: "normal",
    });
  });

  resumebtn.addEventListener("mouseleave", (e) => {
    cursor.innerHTML = "";
    gsap.to(cursor, {
      height: "15px",
      width: "15px",
      backgroundColor: "white",
      mixBlendMode: "difference",
    });
  });
}

function homeAnimation() {
  gsap.to("#home .home-content .name", {
    x: -300,
    scrollTrigger: {
      trigger: "#home .name",
      scroller: ".container",
      start: "top 50%",
      end: "top 0%",
      scrub: 2,
    },
  });

  gsap.to("#home .home-content .developer", {
    x: 300,
    scrollTrigger: {
      trigger: "#home .developer",
      scroller: ".container",
      start: "top 60%",
      end: "top 10%",
      scrub: 2,
    },
  });

  gsap.from(
    "#home .home-content .name, #home .home-content .developer, #home .home-content .greeting",
    {
      y: 100,
      opacity: 0,
      delay: 4,
      ease: "power4.inOut",
    }
  );

  gsap.to(".scroll .arrow", {
    y: -15,
    repeat: -1,
    yoyo: 1,
  });
}

function loadingAnimation() {
  gsap.from(".loading h1", {
    opacity: 0,
    duration: 2,
    ease: "power4.inOut",
  });

  gsap.to(".loading", {
    top: "-120%",
    delay: 3.3,
    duration: 1,
    ease: "power4.inOut",
  });
}

function navAnimation() {
  gsap.from(".container #home #nav", {
    y: -100,
    duration: 1,
    opacity: 0,
    delay: 4,
  });
}

function descAnimation() {

  gsap.matchMedia().add("(max-width: 500px)", () => {
    gsap.to("#description h1 span", {
      color: "black",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#description h1",
        scroller: ".container",
        start: "top 50%",
        end: "top 15%",
        scrub: 3,
      },
    });
  })

  gsap.matchMedia().add("(min-width: 500px)", () => {
    gsap.to("#description h1 span", {
      color: "white",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#description h1",
        scroller: ".container",
        start: "top 50%",
        end: "top 15%",
        scrub: 3,
      },
    });
  });
}

function imgAnimation() {
  let mm = gsap.matchMedia();

  mm.add("(min-width: 480px)", () => {
    gsap.to("#about img", {
      transform: "translateY(-20%)",
      scrollTrigger: {
        trigger: "#about",
        scroller: ".container",
        scrub: 2,
        start: "25% 10%",
        end: "20% -80%",
        pin: true,
      },
    });
  });
}

function footerAnimation() {
  links.forEach((link) => {
    link.addEventListener("mousemove", (e) => {
      cursor.innerHTML = "<h4>Open</h4>";
      gsap.to(cursor, {
        height: "10vw",
        width: "10vw",
        color: "black",
        backgroundColor: "white",
        fontSize: "1.5vw",
        mixBlendMode: "normal",
      });
    });

    link.addEventListener("mouseleave", (e) => {
      cursor.innerHTML = "";
      gsap.to(cursor, {
        height: "15px",
        width: "15px",
        fontSize: "14px",
        color: "white",
        backgroundColor: "white",
        mixBlendMode: "difference",
      });
    });
  });
}

function skillAnimation() {
  gsap.from("#skills #skill-set #skill-card", {
    x: -100,
    opacity: 0,
    stagger: 0.2,
    duration: 1.5,
    ease: "Power4InOut",
    scrollTrigger: {
      trigger: "#skill-card",
      scroller: ".container",
      // markers: true,
      scrub: 2,
      start: "-110% 50%",
      end: "top 60%",
    },
  });
}

function sheryAnimation() {
  gsap.matchMedia().add("(min-width: 600px)", () => {
    Shery.imageEffect(".img-box", {
      style: 5,
      gooey: true,
       config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7241195453907675},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.23,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.5,"range":[0,10]},"metaball":{"value":0.33,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.01,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
    });
  });
}

function backgroundColorAnimation() {

  gsap.matchMedia().add("(min-width: 500px)", () => {
    var tl = gsap.timeline({
      scrollTrigger: {
        // markers: true,
        trigger: "#description",
        scroller: ".container",
        start: "top 30%",
        end: "top 70%",
        scrub: 2,
        duration: 1,
      },
    });

    tl.to(".container", {
      backgroundColor: "black",
    });

    var tl2 = gsap.timeline({
      scrollTrigger: {
        // markers: true,
        trigger: "#about",
        scroller: ".container",
        start: "top 30%",
        end: "top 70%",
        scrub: 2,
        duration: 1,
      },
    });

    tl2.to(".container", {
      backgroundColor: "white",
    });
  });
}

function resumeAnimation() {
  let tl5 = gsap.timeline({
    scrollTrigger: {
      scroller: ".container",
      trigger: "#resume-page",
      start: "0% 0%",
      end: "120% 100%",
      scrub: true,
    },
  });

  tl5.to(".img2", {
    rotateX: "0deg",
  })
  .to(".img3", {
      rotateX: "0deg",
  })
  .to(".img4", {
      rotateX: "0deg",
  });
}


init();
customCursor();
loadingAnimation();
progressAnimation();
navAnimation();
homeAnimation();
backgroundColorAnimation();
textEffect();
descAnimation();
imgAnimation();
skillAnimation();
sheryAnimation();
resumeAnimation();
footerAnimation();

// gsap.to(".projects-slider h1", {
//   transform: "translateX(-47%)",
//   scrollTrigger: {
//     // markers: true,
//     trigger: ".projects-slider",
//     scroller: ".container",
//     scrub: 4,
//     start: "top 0%",
//     end: "top -100%",
//     pin: true,
//   },
// });
