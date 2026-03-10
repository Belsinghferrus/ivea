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