import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { programmingLanguages, frameworks, aiMlFrameworks, dataStreaming, cloudDevOpsTools } from '../constants/logos.js';
import { gsap, ScrollTrigger } from '../utils/gsapSetup.js';
import LazyImage from '../components/LazyImage.jsx';

const Skills = () => {
  const { ref: skillsRef, inView: skillsInView } = useInView({
    threshold: 0.3, // More lenient threshold
    rootMargin: '0px 0px 0px 0px', // No margin restrictions
    triggerOnce: false // Allow re-triggering for debugging
  });

  // Create different entrance directions for logos with more dramatic effects
  const getDirectionalVariant = (direction) => {
    const directions = {
      'top': { x: 0, y: -400, rotate: -20 },
      'bottom': { x: 0, y: 400, rotate: 20 },
      'left': { x: -400, y: 0, rotate: -25 },
      'right': { x: 400, y: 0, rotate: 25 },
      'topLeft': { x: -350, y: -350, rotate: -30 },
      'topRight': { x: 350, y: -350, rotate: 30 },
      'bottomLeft': { x: -350, y: 350, rotate: -35 },
      'bottomRight': { x: 350, y: 350, rotate: 35 }
    };
    
    return {
      hidden: { 
        opacity: 0, 
        scale: 0.1, // Start much smaller
        ...directions[direction]
      },
      visible: { 
        opacity: 1, 
        x: 0, 
        y: 0, 
        scale: 1,
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 12,
          mass: 1.2,
          duration: 1.2 // Longer animation
        }
      },
      hover: {
        scale: 1.15,
        rotate: [0, -5, 5, 0],
        y: [-5, 0, -5],
        transition: {
          duration: 0.6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    };
  };



  // Define entrance directions for each category
  const directions = ['top', 'topLeft', 'left', 'bottomLeft', 'bottom', 'bottomRight', 'right', 'topRight'];

  // Capture logo target positions once after render
  useEffect(() => {
    const collectTargets = () => {
      const imgs = document.querySelectorAll('#Skills img[data-logo-index]');
      const targets = Array.from(imgs).map((img) => {
        const rect = img.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - window.innerWidth / 2,
          y: rect.top + rect.height / 2 - window.innerHeight / 2,
        };
      });
      
      window.dispatchEvent(new CustomEvent('logo-targets', { detail: targets }));
    };
    
    // delay to ensure images are loaded and positioned
    const timer = setTimeout(collectTargets, 800);
    window.addEventListener('resize', collectTargets);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', collectTargets);
    };
  }, [skillsInView]); // Re-collect when skills come into view

  const renderSkillCategory = (skills, categoryName, colorClass, delay = 0, offset = 0) => (
    <div className="flex flex-col relative sm:p-8 py-8 px-5 shadow-2xl shadow-cosmic-purple/20 bg-space_gradient backdrop-blur-sm rounded-lg border border-cosmic-purple/30 overflow-hidden">
      <motion.p 
        className="font-bold mb-8 text-white-800 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.6, delay: delay }}
      >
        {categoryName}
      </motion.p>
      <div className="grid grid-cols-4 gap-3">
        {skills.map((tech, index) => {
          const direction = directions[index % directions.length];
          const variants = getDirectionalVariant(direction);
          
          return (
            <div className="text-center" key={tech.name}>
              <div
                className="relative"
                data-skill-logo="true"
                style={{ willChange: 'transform, filter' }}
              >
                <LazyImage
                  data-logo-index={offset + index}
                  src={`/assets/Logos/${tech.file}`}
                  alt={`${tech.display} logo`}
                  className="w-14 h-14 object-contain mx-auto cursor-pointer"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback for missing images */}
                <div 
                  className={`w-14 h-14 bg-opacity-20 border border-opacity-30 rounded-lg items-center justify-center text-xs font-bold mx-auto cursor-pointer ${colorClass.includes('59, 130, 246') ? 'bg-blue-500 border-blue-400 text-blue-300' : 
                              colorClass.includes('168, 85, 247') ? 'bg-purple-500 border-purple-400 text-purple-300' :
                              colorClass.includes('34, 197, 94') ? 'bg-green-500 border-green-400 text-green-300' :
                              colorClass.includes('249, 115, 22') ? 'bg-orange-500 border-orange-400 text-orange-300' :
                              'bg-pink-500 border-pink-400 text-pink-300'}`}
                  style={{ display: 'none' }}
                >
                  {tech.display.charAt(0)}
                </div>
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={skillsInView ? {
                    background: [
                      `radial-gradient(circle at 50% 50%, ${colorClass.replace('0.5', '0')} 0%, ${colorClass.replace('0.5', '0')} 100%)`,
                      `radial-gradient(circle at 50% 50%, ${colorClass.replace('0.5', '0.1')} 0%, ${colorClass.replace('0.5', '0')} 70%)`,
                      `radial-gradient(circle at 50% 50%, ${colorClass.replace('0.5', '0')} 0%, ${colorClass.replace('0.5', '0')} 100%)`
                    ]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
              </div>
              <motion.p 
                className="mt-2 text-xs text-white"
                initial={{ opacity: 0 }}
                animate={skillsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.15 + 0.5 + delay }}
              >
                {tech.display}
              </motion.p>
            </div>
          );
        })}
      </div>
    </div>
  );

  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(rootRef.current.querySelector('[data-skills-title]'), {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // GSAP logo entrance: fly from alternating directions, glow, and settle
  useLayoutEffect(() => {
    if (!rootRef.current) return undefined;
    const imgs = rootRef.current.querySelectorAll('img[data-logo-index]');
    if (!imgs.length) return undefined;

    const ctx = gsap.context(() => {
      const directions = ['left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
      const fromX = (i) => {
        const dir = directions[i % directions.length];
        if (dir.includes('left')) return gsap.utils.random(-120, -60);
        if (dir.includes('right')) return gsap.utils.random(60, 120);
        return gsap.utils.random(-20, 20);
      };
      const fromY = (i) => {
        const dir = directions[i % directions.length];
        if (dir.includes('top')) return gsap.utils.random(-90, -50);
        if (dir.includes('bottom')) return gsap.utils.random(50, 110);
        return gsap.utils.random(-15, 15);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          refreshPriority: 0, // Lower priority for skills section
          once: true, // Only animate once
        }
      });

      tl.fromTo(imgs,
        {
          x: (i) => fromX(i),
          y: (i) => fromY(i),
          opacity: 0,
          rotate: () => gsap.utils.random(-12, 12),
          scale: 0.9,
          filter: 'blur(2px) brightness(0.9)'
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotate: 0,
          scale: 1,
          filter: 'blur(0px) brightness(1)',
          duration: 0.8,
          ease: 'power3.out',
          stagger: { each: 0.03, from: 0 }
        }
      );

      // Hover micro-interaction via GSAP
      imgs.forEach((img) => {
        const enter = () => gsap.to(img, { y: -6, scale: 1.08, duration: 0.25, ease: 'power2.out' });
        const leave = () => gsap.to(img, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
        img.addEventListener('mouseenter', enter);
        img.addEventListener('mouseleave', leave);
        // store to cleanup
        img._enter = enter; // eslint-disable-line no-underscore-dangle
        img._leave = leave; // eslint-disable-line no-underscore-dangle
      });

    }, rootRef);

    return () => {
      ctx.revert();
      imgs.forEach((img) => {
        if (img._enter) img.removeEventListener('mouseenter', img._enter);
        if (img._leave) img.removeEventListener('mouseleave', img._leave);
      });
    };
  }, []);

  return (
    <section className="w-full flex flex-col justify-center" id="Skills" ref={(node) => { skillsRef(node); rootRef.current = node; }}>
      <div className="c-space">
        <p data-skills-title className="head-text sm:text-3xl text-xl font-medium text-space_gradient text-center font-generalsans">SKILLS</p>

        <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
          {/* Programming Languages */}
          {renderSkillCategory(programmingLanguages, "Programming Languages", "rgba(59, 130, 246, 0.5)", 0.2, 0)}

          {/* Frameworks & Libraries */}
          {renderSkillCategory(frameworks, "Frameworks & Libraries", "rgba(168, 85, 247, 0.5)", 0.4, 6)}

          {/* AI/ML Frameworks */}
          {renderSkillCategory(aiMlFrameworks, "AI/ML Frameworks", "rgba(249, 115, 22, 0.5)", 0.5, 15)}

          {/* Databases & Data */}
          {renderSkillCategory(dataStreaming, "Databases & Data Systems", "rgba(34, 197, 94, 0.5)", 0.6, 21)}

          {/* DevOps & Tools */}
          {renderSkillCategory(cloudDevOpsTools, "Cloud / DevOps / Tools", "rgba(236, 72, 153, 0.5)", 0.8, 28)}


        </div>
        
        {/* Additional Skills Text */}

      </div>
    </section>
  );
};

export default Skills;