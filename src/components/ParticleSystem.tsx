import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: 'sparkle' | 'ember' | 'magic';
}

interface ParticleSystemProps {
  intensity?: 'low' | 'medium' | 'high';
  type?: 'ambient' | 'celebration' | 'sorting';
  className?: string;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  intensity = 'medium', 
  type = 'ambient',
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  const particleCount = {
    low: 5,
    medium: 15,
    high: 25
  }[intensity];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Define colors inside effect to avoid dependency issues
    const colors = {
      ambient: ['#F4D03F', '#F7DC6F', '#FCF3CF', '#F8C471', '#E67E22'],
      celebration: ['#E74C3C', '#F39C12', '#F1C40F', '#27AE60', '#3498DB'],
      sorting: ['#DC143C', '#FFD700', '#4169E1', '#228B22']
    };

    // Performance optimization: only resize when truly needed
    const resizeCanvas = () => {
      if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };

    resizeCanvas();
    // Throttle resize events for better performance
    const debouncedResize = () => {
      if (!canvas.hasAttribute('data-resizing')) {
        canvas.setAttribute('data-resizing', 'true');
        setTimeout(() => {
          resizeCanvas();
          canvas.removeAttribute('data-resizing');
        }, 200);
      }
    };
    window.addEventListener('resize', debouncedResize);

    const createParticle = (): Particle => {
      const maxLife = 150 + Math.random() * 100; // Reduced lifetime
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, // Reduced velocity
        vy: -Math.random() * 0.2 - 0.05, // Reduced velocity
        life: maxLife,
        maxLife,
        size: Math.random() * 2 + 1, // Smaller particles
        color: colors[type][Math.floor(Math.random() * colors[type].length)],
        type: ['sparkle', 'ember', 'magic'][Math.floor(Math.random() * 3)] as Particle['type']
      };
    };

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle());
    }

    // Use RAF throttling for better performance
    let lastTime = 0;
    const fps = 30; // Lower fps for better performance
    const fpsInterval = 1000 / fps;
    
    const animate = (timestamp = 0) => {
      // Calculate if enough time has passed to render a new frame
      const elapsed = timestamp - lastTime;
      if (elapsed < fpsInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = timestamp - (elapsed % fpsInterval);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, index) => {
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        // Apply gravity and wind
        particle.vy += 0.005;
        particle.vx += (Math.random() - 0.5) * 0.01;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        const alpha = particle.life / particle.maxLife;
        const size = particle.size * alpha;
        
        ctx.save();
        ctx.globalAlpha = alpha * 0.8;
        
        // Simpler particle rendering for better performance
        if (particle.type === 'sparkle') {
          // Simplified sparkle
          ctx.fillStyle = particle.color;
          // Remove expensive shadow for most particles
          if (Math.random() > 0.7) {
            ctx.shadowBlur = 5; // Reduced blur
            ctx.shadowColor = particle.color;
          }
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
          ctx.fill();
          
          // Simpler rays - only 2 instead of 4
          if (Math.random() > 0.5) {
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            const rayLength = size * 1.5; // Shorter rays
            for (let i = 0; i < 2; i++) {
              const angle = Math.PI * i + (particle.life * 0.01);
              ctx.beginPath();
              ctx.moveTo(
                particle.x + Math.cos(angle) * rayLength,
                particle.y + Math.sin(angle) * rayLength
              );
              ctx.lineTo(
                particle.x - Math.cos(angle) * rayLength,
                particle.y - Math.sin(angle) * rayLength
              );
              ctx.stroke();
            }
          }
        } else if (particle.type === 'ember') {
          // Simplified ember
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Simplified magic particle
          ctx.fillStyle = particle.color;
          // Only add shadows to some particles
          if (Math.random() > 0.7) {
            ctx.shadowBlur = 8; // Reduced blur
            ctx.shadowColor = particle.color;
          }
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
        
        // Remove dead particles
        if (particle.life <= 0) {
          particlesRef.current[index] = createParticle();
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity, type, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
};