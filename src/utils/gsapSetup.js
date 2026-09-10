import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined' && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  
  // Optimize ScrollTrigger performance
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    ignoreMobileResize: true,
    batch: true, // Batch updates for better performance
  });
  
  // Use RAF for better performance
  gsap.ticker.lagSmoothing(0);
  
  // Debounce ScrollTrigger refresh on resize
  let resizeTimer;
  const originalRefresh = ScrollTrigger.refresh;
  ScrollTrigger.refresh = function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      originalRefresh();
    }, 100);
  };
}

export function createRevealTimeline(container, targets, opts = {}) {
  const {
    y = 40,
    opacity = 0,
    duration = 0.7,
    ease = 'power3.out',
    stagger = 0.12,
    start = 'top 85%',
    end = 'bottom 15%',
  } = opts;

  const tl = gsap.timeline({ paused: true });
  tl.fromTo(
    targets,
    { y, opacity },
    { y: 0, opacity: 1, duration, ease, stagger }
  );

  const trigger = ScrollTrigger.create({
    trigger: container,
    start,
    end,
    animation: tl,
    toggleActions: 'play reverse play reverse',
  });

  return () => {
    trigger.kill();
    tl.kill();
  };
}

export { gsap, ScrollTrigger };




