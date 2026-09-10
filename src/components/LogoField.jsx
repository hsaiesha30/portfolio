import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import useIsInView from '../hooks/useIsInView.js';
import { logos } from '../constants/logos.js';
import LazyImage from './LazyImage.jsx';

const LogoField = () => {
  const [targets, setTargets] = useState([]);
  const [converged, setConverged] = useState(false);

  // Watch if Skills section is in view
    const [skillsEl, setSkillsEl] = useState(null);
  useEffect(() => {
    setSkillsEl(document.getElementById('Skills'));
  }, []);
  const inSkillsView = useIsInView(skillsEl, { threshold: 0.4 });

  // Store random scatter positions and floating physics only once
  const scatter = useRef(
    logos.map(() => {
      // Scatter across a much larger area than viewport for realistic space feel
      const baseRadius = Math.max(window.innerWidth, window.innerHeight) * 1.5;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * baseRadius + 200;
      
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotate: Math.random() * 360,
        // Physics for floating movement
        vx: (Math.random() - 0.5) * 100, // velocity x
        vy: (Math.random() - 0.5) * 100, // velocity y
        rotateSpeed: (Math.random() - 0.5) * 60, // rotation speed
        scale: 0.6 + Math.random() * 0.8, // 0.6 to 1.4
        opacity: 0.3 + Math.random() * 0.4, // 0.3 to 0.7
        // Orbital motion parameters
        orbitRadius: 300 + Math.random() * 400,
        orbitSpeed: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      };
    })
  );

  // Listen for target coordinates from Skills section
  useEffect(() => {
    const handler = (e) => {
      setTargets(e.detail);
    };
    window.addEventListener('logo-targets', handler);
    return () => window.removeEventListener('logo-targets', handler);
  }, []);

  // When Skills comes into view, trigger convergence
  useEffect(() => {
    if (inSkillsView) {
      setConverged(true);
    }
  }, [inSkillsView]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {logos.map((logo, i) => {
        const logoData = scatter.current[i];
        const target = targets[i] || { x: 0, y: 0 };
        
        return (
          <motion.div
            key={logo.name}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{
              x: logoData.x,
              y: logoData.y,
              rotate: logoData.rotate,
              scale: logoData.scale,
              opacity: logoData.opacity,
            }}
            animate={
              converged
                ? {
                    x: target.x,
                    y: target.y,
                    rotate: 0,
                    scale: 0,
                    opacity: 0,
                    transition: { 
                      duration: 1.5 + Math.random() * 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: i * 0.02, // Staggered convergence
                    },
                  }
                : {
                    // Complex floating motion combining orbital and drift
                    x: [
                      logoData.x,
                      logoData.x + logoData.vx + Math.cos(logoData.phase) * logoData.orbitRadius * 0.3,
                      logoData.x + logoData.vx * 0.5 + Math.cos(logoData.phase + Math.PI) * logoData.orbitRadius * 0.2,
                      logoData.x - logoData.vx * 0.3 + Math.cos(logoData.phase + Math.PI * 1.5) * logoData.orbitRadius * 0.4,
                      logoData.x,
                    ],
                    y: [
                      logoData.y,
                      logoData.y + logoData.vy + Math.sin(logoData.phase) * logoData.orbitRadius * 0.3,
                      logoData.y + logoData.vy * 0.5 + Math.sin(logoData.phase + Math.PI) * logoData.orbitRadius * 0.2,
                      logoData.y - logoData.vy * 0.3 + Math.sin(logoData.phase + Math.PI * 1.5) * logoData.orbitRadius * 0.4,
                      logoData.y,
                    ],
                    rotate: [
                      logoData.rotate,
                      logoData.rotate + logoData.rotateSpeed,
                      logoData.rotate + logoData.rotateSpeed * 2,
                      logoData.rotate + logoData.rotateSpeed * 3,
                      logoData.rotate + logoData.rotateSpeed * 4,
                    ],
                    scale: [
                      logoData.scale,
                      logoData.scale * 1.1,
                      logoData.scale * 0.9,
                      logoData.scale * 1.05,
                      logoData.scale,
                    ],
                    opacity: [
                      logoData.opacity,
                      logoData.opacity * 1.2,
                      logoData.opacity * 0.8,
                      logoData.opacity * 1.1,
                      logoData.opacity,
                    ],
                    transition: {
                      duration: 12 + Math.random() * 8, // 12-20 seconds per cycle
                      repeat: Infinity,
                      ease: 'easeInOut',
                      times: [0, 0.25, 0.5, 0.75, 1], // Control timing of keyframes
                    },
                  }
            }
          >
            <motion.div
              whileHover={!converged ? {
                scale: 1.3,
                transition: { duration: 0.3 }
              } : {}}
            >
              <LazyImage
                src={`/assets/Logos/${logo.file}`}
                alt={logo.display || logo.name}
                className="w-10 h-10 object-contain"
              onError={(e) => {
                // Fallback for missing logos
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div class="w-10 h-10 bg-blue-500/20 border border-blue-400/30 rounded-lg flex items-center justify-center text-xs font-bold text-blue-300">
                    ${logo.display?.charAt(0) || logo.name.charAt(0).toUpperCase()}
                  </div>
                `;
              }}
            />
            </motion.div>
            
            {/* Subtle glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              animate={!converged ? {
                background: [
                  'radial-gradient(circle, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0) 100%)',
                  'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)',
                  'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0) 70%)',
                  'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0) 70%)',
                  'radial-gradient(circle, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0) 100%)',
                ]
              } : {}}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default LogoField;
