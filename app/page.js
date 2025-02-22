// Updated portfolio code with glow effects, smooth scrolling, and animations
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef(null);
  const interactiveCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const scale = window.devicePixelRatio;
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    ctx.scale(scale, scale);

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#00ffcc";
        ctx.shadowColor = "#00ffcc";
        ctx.shadowBlur = 10;
        ctx.fill();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connect() {
      let opacity = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            opacity = 1 - distance / 100;
            ctx.strokeStyle = `rgba(0, 255, 204, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      connect();
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      ctx.scale(scale, scale);
    });
  }, []);

  useEffect(() => {
    const canvas = interactiveCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const scale = window.devicePixelRatio;
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    ctx.scale(scale, scale);

    let mouse = { x: null, y: null };
    const interactiveParticles = [];

    class InteractiveParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ff00ff";
        ctx.shadowColor = "#ff00ff";
        ctx.shadowBlur = 10;
        ctx.fill();
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          this.x -= dx * 0.02;
          this.y -= dy * 0.02;
        }
      }
    }

    for (let i = 0; i < 50; i++) {
      interactiveParticles.push(new InteractiveParticle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      interactiveParticles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("mousemove", (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });
  }, []);

  return (
    <main className="min-h-screen bg-black text-cyan-400 font-sans relative">
      {/* Subtle Background Neural Network Canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Interactive Neural Network Overlay */}
      <canvas ref={interactiveCanvasRef} className="absolute top-0 left-0 w-full h-full z-10" />

      {/* Top Toolbar */}
      <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-60 backdrop-blur-lg shadow-lg z-50 py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-light text-cyan-400 tracking-widest">GV</div>
        <nav className="flex space-x-6">
          <a href="/about" className="hover:text-cyan-400 glow transition">About</a>
          <a href="#projects" className="hover:text-cyan-400 glow transition">Projects</a>
          <a href="#contact" className="hover:text-cyan-400 glow transition">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 relative z-20">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-light tracking-widest bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 transition duration-500"
        >
          Gitansh Vats
        </motion.h1>
      {/* </section>
      <section> */}
          {/* Links Section */}
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-4 flex space-x-6 text-lg"
        >
        <a href="https://www.linkedin.com/in/gitanshvats12" target="_blank" className="hover:text-cyan-400 text-cyan-400 transition">LinkedIn</a>
        <a href="https://github.com/your-github-username" target="_blank" className="hover:text-cyan-400 text-cyan-400 transition">GitHub</a>
        <a href="mailto:youremail@gmail.com" className="hover:text-cyan-400 text-cyan-400 transition">Gmail</a>
        </motion.div>
      </section>
    </main>
  );
}