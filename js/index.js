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



// THERAPIES SECTION – GRID REVEAL
const therapiesSection = document.querySelector("#therapies");

if (therapiesSection) {
  const headerEls = therapiesSection.querySelectorAll(
    ".therapies-header p, .therapies-header h2, .therapies-header > p.mt-4"
  );
  const cards = therapiesSection.querySelectorAll(".therapy-card");

  // Header fade-in
  if (headerEls.length) {
    gsap.from(headerEls, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: therapiesSection,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }

  // Cards – light staggered reveal
  if (cards.length) {
    gsap.from(cards, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.06,
      scrollTrigger: {
        trigger: therapiesSection,
        start: "top 75%",
        end: "bottom 40%",
        toggleActions: "play none none reverse"
      }
    });
  }
}






// EXPERIENCE SECTION – PINNED FULL-WIDTH VIDEO
const experienceSection = document.querySelector("#experience");

if (experienceSection) {
  const media = experienceSection.querySelector(".experience-media");
  const inner = experienceSection.querySelector(".experience-inner");
  const kicker = experienceSection.querySelector(".experience-kicker");
  const heading = experienceSection.querySelector(".experience-heading");
  const body = experienceSection.querySelectorAll(".experience-body");

  // Base state
  gsap.set(media, { scale: 1.1 }); // slight zoom for cinematic feel
  gsap.set(inner, { opacity: 0, y: 40 });

  const tlExperience = gsap.timeline({
    scrollTrigger: {
      trigger: experienceSection,
      start: "top top",
      end: "+=150%",      // stay pinned for 1.5 viewport heights
      pin: true,
      scrub: 1,
      anticipatePin: 1
    }
  });

  // Zoom video slightly out as you scroll
  if (media) {
    tlExperience.to(media, {
      scale: 1,
      ease: "power2.out"
    }, 0);
  }

  // Fade and lift content in
  if (inner) {
    tlExperience.to(inner, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, 0.1);
  }

  // Extra stagger on text for a bit more polish
  const textEls = [];
  if (kicker) textEls.push(kicker);
  if (heading) textEls.push(heading);
  body.forEach(el => textEls.push(el));

  if (textEls.length) {
    tlExperience.from(textEls, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1
    }, 0.15);
  }
}





// // OUR PROCESS – LATERAL PIN INDICATOR (SIMPLIFIED, WORKING)
// const processSection = document.querySelector("#process");

// if (processSection) {
//   const steps = Array.from(processSection.querySelectorAll(".process-step"));
//   const slides = Array.from(processSection.querySelectorAll(".process-slide"));
//   const fill = processSection.querySelector(".process-fill");

//   if (!steps.length || !slides.length || !fill) {
//     console.warn("Process section: missing steps, slides or fill element");
//   } else {
//     // Helper to set active step + slide + fill height
//     const setActive = (index) => {
//       steps.forEach((step, i) => {
//         step.style.color = i === index ? "#6ee7b7" : "#9ca3af"; // emerald-300 vs zinc-400
//       });

//       slides.forEach((slide, i) => {
//         gsap.to(slide, {
//           autoAlpha: i === index ? 1 : 0,
//           duration: 0.4,
//           ease: "power2.out"
//         });
//       });

//       const ratio = (index + 1) / steps.length;
//       gsap.to(fill, {
//         scaleY: ratio,
//         transformOrigin: "top left",
//         duration: 0.4,
//         ease: "none"
//       });
//     };

//     // Initial states
//     gsap.set(fill, {
//       position: "absolute",
//       left: 0,
//       top: 0,
//       width: "3px",
//       height: "100%",
//       backgroundColor: "#6ee7b7",
//       transformOrigin: "top left",
//       scaleY: 1 / steps.length
//     });

//     // Only first slide visible initially
//     gsap.set(slides.slice(1), { autoAlpha: 0 });
//     setActive(0);

//     // ScrollTrigger: pin section, move through steps
//     ScrollTrigger.create({
//       trigger: processSection,
//       start: "top top",
//       end: "+=" + steps.length * 80 + "%", // scroll distance
//       pin: true,
//       scrub: 1,
//       anticipatePin: 1,
//       onUpdate: (self) => {
//         const index = Math.round(self.progress * (steps.length - 1));
//         setActive(index);
//       }
//     });
//   }
// }




// OUR PROCESS – LATERAL PIN INDICATOR (CLEAN VERSION)
const processSection = document.querySelector("#process");

if (processSection) {
  const steps = Array.from(processSection.querySelectorAll(".process-step"));
  const slides = Array.from(processSection.querySelectorAll(".process-slide"));
  const fill = processSection.querySelector(".process-fill");

  if (!steps.length || !slides.length || !fill) {
    console.warn("Process section: missing steps, slides or fill");
  } else {
    // Show only slide 0 initially
    slides.forEach((slide, i) => {
      gsap.set(slide, { autoAlpha: i === 0 ? 1 : 0 });
    });

    // Ensure fill is correct size and anchored
    gsap.set(fill, {
      transformOrigin: "top left",
      scaleY: 1 / steps.length
    });

    // Helper to update active state
    const setActive = (index) => {
      // Clamp index to valid range
      const i = Math.max(0, Math.min(index, steps.length - 1));

      steps.forEach((step, idx) => {
        step.style.color = idx === i ? "#C5B073" : "#9ca3af"; // emerald-300 vs zinc-400
      });

      slides.forEach((slide, idx) => {
        gsap.to(slide, {
          autoAlpha: idx === i ? 1 : 0,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      const ratio = (i + 1) / steps.length;
      gsap.to(fill, {
        scaleY: ratio,
        duration: 0.4,
        ease: "none"
      });
    };

    setActive(0);

    ScrollTrigger.create({
      trigger: processSection,
      start: "top top",
      end: "+=" + steps.length * 80 + "%", // adjust if you want longer/shorter scroll
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const rawIndex = self.progress * (steps.length - 1);
        const index = Math.round(rawIndex);
        setActive(index);
      }
    });
  }
}





// WHO WE SERVE – PINNED PERSONA SLIDER
const whoSection = document.querySelector("#who");

if (whoSection) {
  const backgrounds = Array.from(whoSection.querySelectorAll(".who-bg"));
  const labelEl = whoSection.querySelector(".who-label");
  const descEl = whoSection.querySelector(".who-description");
  const tags = Array.from(whoSection.querySelectorAll(".who-tag"));

  // Data matching your bullet list
  const personas = [
    {
      label: "Busy professionals",
      description:
        "People whose days are full of decisions, calls and travel — who cannot afford to run on empty."
    },
    {
      label: "Frequent travelers",
      description:
        "Clients who cross time zones often and want faster recovery from flights, hotels and changing routines."
    },
    {
      label: "Athletes & fitness enthusiasts",
      description:
        "People who push their bodies in training and want smarter recovery than just sleep and supplements."
    },
    {
      label: "High-profile individuals",
      description:
        "Public figures and private families who expect private, discreet medical‑grade care at home or in‑suite."
    },
    {
      label: "Preventative wellness focused",
      description:
        "Individuals who choose regular hydration, immunity and longevity infusions to stay ahead of problems."
    },
    {
      label: "Seniors needing support",
      description:
        "Older adults who benefit from gentle, at‑home hydration and energy support without hospital disruption."
    }
  ];

  let currentIndex = 0;
  let textTween = null;

  // Safety check
  const count = Math.min(
    personas.length,
    backgrounds.length,
    tags.length
  );
  backgrounds.length = count;
  tags.length = count;

  // Initial state
  gsap.set(backgrounds, { autoAlpha: 0 });
  if (backgrounds[0]) {
    gsap.set(backgrounds[0], { autoAlpha: 1 });
  }

  const setActive = (index) => {
    index = Math.max(0, Math.min(index, count - 1));
    if (index === currentIndex) return;
    currentIndex = index;

    const persona = personas[index];

    // Background crossfade
    backgrounds.forEach((bg, i) => {
      gsap.to(bg, {
        autoAlpha: i === index ? 1 : 0,
        duration: 0.7,
        ease: "power2.out"
      });
    });

    // Tag highlight
    tags.forEach((tag, i) => {
      const active = i === index;
      tag.style.borderColor = active ? "rgba(110, 231, 183, 0.8)" : "rgba(229, 231, 235, 0.2)";
      tag.style.color = active ? "#d1fae5" : "#e5e7eb";
      tag.style.backgroundColor = active ? "rgba(15, 23, 42, 0.4)" : "transparent";
    });

    // Text change with small fade
    if (textTween) textTween.kill();
    textTween = gsap.timeline();

    textTween
      .to([labelEl, descEl], {
        opacity: 0,
        y: 10,
        duration: 0.25,
        ease: "power2.in"
      })
      .add(() => {
        labelEl.textContent = persona.label;
        descEl.textContent = persona.description;
      })
      .to([labelEl, descEl], {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
  };

  // Start with first persona
  setActive(0);

  // Scroll-driven change (pinned)
  ScrollTrigger.create({
    trigger: whoSection,
    start: "top top",
    end: "+=" + count * 80 + "%",
    pin: true,
    scrub: 1,
    anticipatePin: 1,
    onUpdate: (self) => {
      const rawIndex = self.progress * (count - 1);
      const index = Math.round(rawIndex);
      setActive(index);
    }
  });

  // Optional: clicking tags also jumps personas
  tags.forEach((tag, i) => {
    tag.addEventListener("click", () => {
      setActive(i);
      // Smooth scroll to keep pinned section in view
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: whoSection, offsetY: 0, autoKill: true },
        ease: "power2.inOut"
      });
    });
  });
}





// FULLSCREEN LUXURY CTA
const fullscreenCta = document.querySelector("#cta-fullscreen");

if (fullscreenCta) {
  const headline = fullscreenCta.querySelector(".cta-headline");
  const body = fullscreenCta.querySelector(".cta-body");
  const buttons = fullscreenCta.querySelectorAll(".cta-primary, .cta-secondary");

  gsap.from(headline, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: fullscreenCta,
      start: "top 90%"
    }
  });

  gsap.from(body, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: fullscreenCta,
      start: "top 85%"
    }
  });

  gsap.from(buttons, {
    opacity: 0,
    y: 40,
    scale: 0.95,
    duration: 0.8,
    stagger: 0.1,
    ease: "back.out(1.2)",
    scrollTrigger: {
      trigger: fullscreenCta,
      start: "top 80%"
    }
  });
}


// FOOTER ANIMATION
const footer = document.querySelector("#footer");

if (footer) {
  const columns = footer.querySelectorAll("div.space-y-4, div:has(h4)");
  
  gsap.from(columns, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: footer,
      start: "top 90%"
    }
  });
}
