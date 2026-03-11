 gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // NAVBAR SCROLLTO
    document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const selector = btn.getAttribute("data-scroll-to");
        const target = document.querySelector(selector);
        if (target) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: target, offsetY: 72 },
            ease: "power2.inOut"
          });
        }
      });
    });// VIDEO HERO FADE IN
    const servicesSection = document.querySelector("#services");
    
    if (servicesSection) {
      const videoContainer = servicesSection.querySelector(".video-container");
      const fadeOverlay = videoContainer.querySelector("div.bg-black\\/40");
      const content = servicesSection.querySelector("div.max-w-4xl");
    
      // Fade out black overlay to reveal video
      gsap.fromTo(fadeOverlay, 
        {
          opacity: 1
        },
        {
          opacity: 0.4,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: servicesSection,
            start: "top bottom",
            end: "20% top",
            scrub: true
          }
        }
      );
    
      // Content reveal
      gsap.from(content, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: servicesSection,
          start: "top 85%"
        }
      });
    }
    



// CONCIERGE SECTION ANIMATION
const conciergeSection = document.querySelector("#concierge");

if (conciergeSection) {
  const image = conciergeSection.querySelector(".concierge-image");
  const copy = conciergeSection.querySelector(".concierge-copy");
  const glow = conciergeSection.querySelector(".concierge-image > div");

  // Image slide in + glow
  gsap.from(image, {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: conciergeSection,
      start: "top 85%"
    }
  });

  if (glow) {
    gsap.to(glow, {
      opacity: 1,
      scale: 1.05,
      duration: 2,
      ease: "none",
      scrollTrigger: {
        trigger: conciergeSection,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // Copy stagger
  gsap.from(copy.children, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: conciergeSection,
      start: "top 80%"
    }
  });
}






// SIGNATURE DRIPS – ROW REVEAL + IMAGE PARALLAX
const dripsSection = document.querySelector("#signature-drips");

if (dripsSection) {
  const rows = dripsSection.querySelectorAll(".drip-row");
  const interludes = dripsSection.querySelectorAll(".drip-interlude");
  const images = dripsSection.querySelectorAll(".drip-image");

  // Rows stagger in
  if (rows.length) {
    gsap.from(rows, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: dripsSection,
        start: "top 80%",
        end: "bottom 40%",
        toggleActions: "play none none reverse"
      }
    });
  }

  // Interludes subtle fade
  if (interludes.length) {
    gsap.from(interludes, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: dripsSection,
        start: "top 75%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });
  }

  // Parallax on images
  images.forEach((img) => {
    gsap.to(img, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
}
