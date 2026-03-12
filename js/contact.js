  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // VIDEO FADE IN
  const contactVideoOverlay = document.querySelector(".contact-video-overlay");
  if (contactVideoOverlay) {
    gsap.to(contactVideoOverlay, {
      opacity: 0.3,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.3
    });
  }

  // HERO CONTENT REVEAL
  const contactHero = document.querySelector(".contact-hero");
  if (contactHero) {
    gsap.from(contactHero.children, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.12,
      ease: "power2.out",
      delay: 0.5
    });
  }

// MARQUEE – HORIZONTAL INFINITE SCROLL
// Works for every .marquee-band on the page automatically
document.querySelectorAll(".marquee-band").forEach((band) => {
    const track = band.querySelector(".marquee-track");
    const contents = band.querySelectorAll(".marquee-content");
  
    if (!track || !contents.length) return;
  
    // Get width of one content block
    const singleWidth = contents[0].offsetWidth;
  
    // Set the track width to fit both copies
    gsap.set(track, { width: singleWidth * 2 });
  
    // Infinite scroll: move left by one full content block, then reset
    gsap.to(track, {
      x: -singleWidth,
      duration: 22,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % singleWidth)
      }
    });
  
    // Pause on hover – feels premium
    band.addEventListener("mouseenter", () => {
      gsap.to(track, { timeScale: 0, duration: 0.4, ease: "power2.out",
        overwrite: false });
    });
    band.addEventListener("mouseleave", () => {
      gsap.to(track, { timeScale: 1, duration: 0.4, ease: "power2.out",
        overwrite: false });
    });
  });

  


  // FORCE AUTOPLAY – fixes browser autoplay policy issues
document.querySelectorAll("video[autoplay]").forEach((video) => {
    video.muted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
  
    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay still blocked, play on first user interaction
          document.addEventListener("click", () => video.play(), { once: true });
          document.addEventListener("touchstart", () => video.play(), { once: true });
        });
      }
    };
  
    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("loadeddata", tryPlay);
    }
  });
  