gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// HERO PANELS (only <section class="panel">, not the intro description)
const heroPanels = gsap.utils.toArray("section.panel");

// Layered pinning for hero panels (no snap, no infinite loop)
heroPanels.forEach((panel) => {
  ScrollTrigger.create({
    trigger: panel,
    start: "top top",
    pin: true,
    pinSpacing: false
  });
});

// Text animations per panel
heroPanels.forEach((panel) => {
  gsap.fromTo(
    panel.querySelectorAll("h2, p, .cta"),
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: panel,
        start: "top center",
        end: "bottom center",
      },
    }
  );
});

// DOTS: smooth scroll to corresponding hero panel (no snap)
const dots = document.querySelectorAll(".nav-dot");
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const targetPanel = heroPanels[index];
    if (!targetPanel) return;

    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: targetPanel, offsetY: 0, autoKill: true },
      ease: "power2.inOut",
    });

    dots.forEach((d) => d.classList.remove("bg-white", "scale-125"));
    dots.forEach((d) => d.classList.add("bg-white/40"));
    dot.classList.remove("bg-white/40");
    dot.classList.add("bg-white", "scale-125");
  });
});

// Update active dot based on scroll position
ScrollTrigger.create({
  trigger: heroPanels[0],
  start: "top top",
  endTrigger: heroPanels[heroPanels.length - 1],
  end: "bottom bottom",
  onUpdate: (self) => {
    const progress = self.progress * (heroPanels.length - 1);
    const activeIndex = Math.round(progress);
    dots.forEach((d, i) => {
      const isActive = i === activeIndex;
      d.classList.toggle("bg-white", isActive);
      d.classList.toggle("scale-125", isActive);
      d.classList.toggle("bg-white/40", !isActive);
    });
  }
});

// NAVBAR LINKS: smooth scroll using ScrollToPlugin
document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const selector = btn.getAttribute("data-scroll-to");
    const target = document.querySelector(selector);
    if (!target) return;

    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: target, offsetY: 72, autoKill: true },
      ease: "power2.inOut",
    });
  });
});




// ABOUT SECTION ANIMATIONS
const aboutSection = document.querySelector("#about");

if (aboutSection) {
  const tlAbout = gsap.timeline({
    scrollTrigger: {
      trigger: aboutSection,
      start: "top 70%",
      end: "bottom 40%",
      toggleActions: "play none none reverse"
    }
  });

  // Intro text + line
  const introElements = aboutSection.querySelectorAll(
    ".about-kicker, .about-heading, .about-line, .about-body"
  );

  if (introElements.length) {
    tlAbout.from(introElements, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.12
    }, 0);
  }

  // Feature pills
  const pills = aboutSection.querySelectorAll(".about-pill");
  if (pills.length) {
    tlAbout.from(pills, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1
    }, "-=0.4");
  }

  // Image entrance + subtle parallax
  const aboutImage = aboutSection.querySelector(".about-image");
  if (aboutImage) {
    tlAbout.from(aboutImage, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power2.out"
    }, 0);

    gsap.to(aboutImage, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: aboutSection,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // Ambient glow breathing subtly with scroll
  const ambient = aboutSection.querySelector(".about-ambient");
  if (ambient) {
    gsap.to(ambient, {
      opacity: 0.35,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: aboutSection,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true
      }
    });
  }
}

// // Register plugin once
// gsap.registerPlugin(ScrollTrigger);

// const whySection = document.querySelector("#why");

// if (whySection) {
//   const header = whySection.querySelector(".why-header");
//   const cards = whySection.querySelectorAll(".why-card");
//   const container = whySection.querySelector(".why-grid"); // visible viewport
//   const track = container; // in your markup, the grid itself is what moves

//   // Header fade-in
//   if (header) {
//     gsap.from(header, {
//       opacity: 0,
//       y: 24,
//       duration: 0.9,
//       ease: "power2.out",
//       scrollTrigger: {
//         trigger: whySection,
//         start: "top 80%",
//         toggleActions: "play none none reverse"
//       }
//     });
//   }

//   // Cards stagger fade-in
//   if (cards.length) {
//     gsap.from(cards, {
//       opacity: 0,
//       y: 30,
//       duration: 0.8,
//       ease: "power2.out",
//       stagger: 0.12,
//       scrollTrigger: {
//         trigger: whySection,
//         start: "top 75%",
//         end: "bottom 40%",
//         toggleActions: "play none none reverse"
//       }
//     });
//   }


  
//   // HORIZONTAL SCROLL ON MOBILE
//   let mobileScrollTrigger = null;

//   const mm = gsap.matchMedia();

//   mm.add("(max-width: 768px)", () => {
//     // Kill any existing mobile trigger for safety
//     if (mobileScrollTrigger) {
//       mobileScrollTrigger.kill();
//       mobileScrollTrigger = null;
//       gsap.set(track, { x: 0 });
//     }

//     // Measure every time we enter this media query
//     const containerWidth = container.offsetWidth;
//     const trackWidth = track.scrollWidth;
//     const maxScroll = trackWidth - containerWidth;

//     // If all cards fit already, no need for horizontal scroll
//     if (maxScroll <= 0) {
//       gsap.set(track, { x: 0 });
//       return () => {}; // cleanup fn required by matchMedia
//     }

//     // Reset initial x
//     gsap.set(track, { x: 0 });

//     const horizTween = gsap.to(track, {
//       // function-based so it recalculates correctly if ScrollTrigger invalidates
//       x: () => -maxScroll,
//       ease: "none"
//     });

//     mobileScrollTrigger = ScrollTrigger.create({
//       trigger: whySection,        // pin the whole section, not just inner div
//       animation: horizTween,
//       pin: true,
//       pinSpacing: true,
//       scrub: 1,
//       start: "top top",
//       end: () => "+=" + maxScroll, 
//       invalidateOnRefresh: true
//     });

//     // Cleanup when this media query no longer matches
//     return () => {
//       if (mobileScrollTrigger) {
//         mobileScrollTrigger.kill();
//         mobileScrollTrigger = null;
//       }
//       horizTween.kill();
//       gsap.set(track, { x: 0 });
//     };
//   });

//   // OPTIONAL: ensure desktop has no leftover transforms
//   mm.add("(min-width: 769px)", () => {
//     if (mobileScrollTrigger) {
//       mobileScrollTrigger.kill();
//       mobileScrollTrigger = null;
//     }
//     gsap.set(track, { x: 0 });
//   });
// }
