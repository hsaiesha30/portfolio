import { useLayoutEffect, useRef } from 'react';
import Button from '../components/Button.jsx';
import SocialMedia from '../components/SocialMedia.jsx';
import LazyImage from '../components/LazyImage.jsx';
import { gsap, ScrollTrigger } from '../utils/gsapSetup.js';

const Hero = () => {
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const roleRef = useRef(null);
  const displayedTitle = 'Software Engineer';

  // Animate role title with character-by-character animation
  const animateTitle = (titleElement) => {
    if (!titleElement) return null;
    
    const chars = titleElement.querySelectorAll('[data-role-char="true"]');
    if (!chars.length) return null;

    // Kill any existing animations first
    gsap.killTweensOf(chars);
    
    // Reset and set initial state
    gsap.set(titleElement, { perspective: 600 });
    gsap.set(chars, { 
      display: 'inline-block', 
      transformOrigin: '50% 50%'
    });

    const offsets = ['left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
    const fromX = (i) => {
      const dir = offsets[i % offsets.length];
      if (dir === 'left' || dir === 'topLeft' || dir === 'bottomLeft') return gsap.utils.random(-120, -60);
      if (dir === 'right' || dir === 'topRight' || dir === 'bottomRight') return gsap.utils.random(60, 120);
      return gsap.utils.random(-20, 20);
    };
    const fromY = (i) => {
      const dir = offsets[i % offsets.length];
      if (dir === 'top' || dir === 'topLeft' || dir === 'topRight') return gsap.utils.random(-80, -40);
      if (dir === 'bottom' || dir === 'bottomLeft' || dir === 'bottomRight') return gsap.utils.random(40, 100);
      return gsap.utils.random(-15, 15);
    };

    const tl = gsap.timeline();

    // Stage 1: Entry with depth, blur, and rotation
    tl.fromTo(
      chars,
      {
        x: (i) => fromX(i),
        y: (i) => fromY(i),
        z: () => gsap.utils.random(-60, 60),
        opacity: 0,
        rotateX: () => gsap.utils.random(-35, 35),
        rotateY: () => gsap.utils.random(-25, 25),
        rotateZ: () => gsap.utils.random(-25, 25),
        scale: () => gsap.utils.random(0.85, 1.05),
        skewX: () => gsap.utils.random(-8, 8),
        skewY: () => gsap.utils.random(-6, 6),
        filter: 'blur(6px)'
      },
      {
        x: 0,
        y: 0,
        z: 0,
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        skewX: 0,
        skewY: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2.0,
        ease: 'power4.out',
        stagger: { each: 0.09, from: 0 },
      }
    );

    // Stage 2: Gentle wave ripple across letters
    tl.to(
      chars,
      {
        y: (i) => (i % 2 === 0 ? -8 : -5),
        rotateZ: (i) => (i % 3 - 1) * 2,
        duration: 0.7,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: 1,
        stagger: { each: 0.035, from: 'start' },
      },
      '-=1.2'
    );

    // Stage 3: Subtle elastic settle
    tl.to(
      chars,
      {
        y: 0,
        rotateZ: 0,
        duration: 0.9,
        ease: 'elastic.out(1, 0.7)',
        stagger: { each: 0.02, from: 'center' },
      },
      '-=0.4'
    );

    return tl;
  };

  useLayoutEffect(() => {
    if (!rootRef.current) return undefined;

    const ctx = gsap.context(() => {
      // Stagger in lines and social row
      gsap.from(rootRef.current.querySelectorAll('[data-hero-line]'), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
      });

      if (imageRef.current) {
        // Entrance for image
        gsap.fromTo(
          imageRef.current,
          { y: 60, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
        );

        // Subtle parallax on scroll
        gsap.to(imageRef.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Initial animation - wait a bit for DOM to be ready
      if (roleRef.current) {
        setTimeout(() => {
          const chars = roleRef.current.querySelectorAll('[data-role-char="true"]');
          if (chars.length) {
            // Set initial state for animation (opacity 0, positioned off-screen)
            gsap.set(chars, {
              display: 'inline-block',
              transformOrigin: '50% 50%',
              opacity: 0
            });
            
            // Then animate in
            animateTitle(roleRef.current);
          }
        }, 100);
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);


  return (
    <section ref={rootRef} className="min-h-screen w-full flex flex-col relative pt-20" id="home">
      <div className="w-full mx-auto flex flex-col sm:mt-12 mt-20 c-space gap-3">
        <p data-hero-line className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
          Hi, I am 
        </p>
        <p data-hero-line className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
          HYDERBONI SAI ESHA
        </p>
        <p 
          data-hero-line 
          ref={roleRef} 
          className="hero_tag text-gray_gradient text-2xl relative" 
          style={{ 
            willChange: 'transform',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            textAlign: 'center',
            lineHeight: '1.1',
          }}
        >
          {displayedTitle.split('').map((ch, i) => (
            <span
              key={i}
              data-role-char="true"
              style={{
                willChange: 'transform',
                background: 'inherit',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </p>
        
        {/* Social Media Links */}
        <div data-hero-line className="flex justify-center mt-6 relative z-20">
          <SocialMedia />
        </div>
      </div>

      <div className="col-span-1 my-4 xl:row-span-3 h-full relative">  {/* Added relative here */}
        <div className="card flex flex-col justify-end h-full">
          <LazyImage 
            ref={imageRef} 
            src="/assets/final-ai-brush-removebg-4yhtxlg.png" 
            alt="Hero image" 
            className="object-bottom" 
            loading="eager"
          />
        </div>
      </div>

      <div className="w-full h-full absolute inset-0 pointer-events-none"></div>

      {/* Button only visible on screens smaller than laptop resolution */}
      <div className="absolute bottom-20 left-0 right-0 w-full z-10 c-space flex justify-center"> 
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            const element = document.getElementById('about');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              const element = document.getElementById('about');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          }}
          className="w-fit block lg:hidden"
        >
          <Button name="Know about me" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
