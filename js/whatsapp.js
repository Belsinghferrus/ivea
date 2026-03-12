

// ─── WhatsApp Float ───────────────────────────────────────
window.addEventListener('load', () => {
    const waFloat   = document.querySelector('.wa-float');
    const waTooltip = document.querySelector('.wa-tooltip');
    const waBtn     = document.querySelector('.wa-btn');
    const ring1     = document.querySelector('.wa-ring-1');
    const ring2     = document.querySelector('.wa-ring-2');
  
    if (!waFloat) return;
  
    // 1. Entrance – slides up after 1.5s
    gsap.to(waFloat, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: 1.5
    });
  
    // 2. Tooltip auto-shows 2.5s after entrance, then hides after 4s
    const tooltipTl = gsap.timeline({ delay: 2.2 });
    tooltipTl
      .to(waTooltip, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.45,
        ease: 'back.out(1.5)'
      })
      .to(waTooltip, {
        opacity: 0,
        x: 12,
        scale: 0.95,
        duration: 0.35,
        ease: 'power2.in',
        delay: 3
      });
  
    // 3. Pulse rings – infinite expand + fade
    gsap.to(ring1, {
      scale: 1.9,
      opacity: 0,
      duration: 1.4,
      ease: 'power1.out',
      repeat: -1,
      delay: 2
    });
    gsap.to(ring2, {
      scale: 2.5,
      opacity: 0,
      duration: 1.8,
      ease: 'power1.out',
      repeat: -1,
      delay: 2.35
    });
  
    // 4. Hover – tooltip re-shows
    waBtn.addEventListener('mouseenter', () => {
      gsap.to(waTooltip, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.35,
        ease: 'back.out(1.5)'
      });
    });
    waBtn.addEventListener('mouseleave', () => {
      gsap.to(waTooltip, {
        opacity: 0,
        x: 12,
        scale: 0.95,
        duration: 0.25,
        ease: 'power2.in'
      });
    });
  
    // 5. Click wiggle
    waBtn.addEventListener('click', () => {
      gsap.fromTo(waBtn,
        { rotation: -12 },
        { rotation: 0, duration: 0.5, ease: 'elastic.out(1.2, 0.4)' }
      );
    });
  });
  