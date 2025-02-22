"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function About() {
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);

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

  // Function to scroll achievements
  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-black text-cyan-400 font-sans relative overflow-hidden">
      {/* Home Button */}
      <button
        onClick={() => (window.location.href = '/')}
        className="fixed top-4 left-4 z-50 text-cyan-400 hover:text-white p-2 rounded-full bg-gray-800 hover:bg-cyan-500 transition-all duration-300 shadow-lg"
      >
        🏠 Home
      </button>

      {/* Background Animation */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Purple Interactive Animation */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none animate-pulse bg-gradient-to-r from-purple-700 via-transparent to-purple-700 opacity-20"></div>

      {/* Main Content */}
      <section className="flex flex-col justify-center items-center text-center px-6 relative z-20 h-screen">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-semibold tracking-wide bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
        >
          About Me
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg max-w-2xl"
        >
          Machine Learning Developer | AI Enthusiast | Innovator
          Passionate about crafting intelligent solutions to solve real-world problems.
          Experienced in developing predictive models, working with large datasets, and deploying scalable AI applications.
        </motion.p>
      </section>

      {/* Achievements Section with Arrow Navigation */}
      <section className="py-20 px-8 bg-black bg-opacity-80 backdrop-blur-lg shadow-lg relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-cyan-400 mb-10">Key Achievements</h2>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center relative">
            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 z-30 text-cyan-400 hover:text-white p-2 rounded-full bg-gray-800 hover:bg-cyan-500 transition-all duration-300 shadow-lg"
            >
              ⬅️
            </button>

            {/* Achievements Tiles */}
            <div
              ref={scrollRef}
              className="flex space-x-6 overflow-hidden overflow-y-hidden py-6 snap-x"
            >
              {[
                `🔬 Research Internship at DRDO
- Developed a cognitive workload detection model.
- Utilized eye-tracking data for mental workload assessment.
- Real-time monitoring system integration.`,
                `📈 Stock Price Prediction Model
- Applied time-series analysis for trend forecasting.
- Used NLP for recent news sentiment analysis.`,
                `🏅 Andrew Ng's Machine Learning Course
- Covered supervised & unsupervised learning.
- Specialized in deep learning and optimization.`,
                `☁️ AWS Certified Cloud Practitioner
- Expertise in cloud infrastructure.
- Built scalable cloud solutions.`,
                `📊 Power BI Certification
- Developed interactive dashboards.
- Specialized in data visualization.`
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="w-[300px] h-[300px] p-6 bg-gray-900 rounded-2xl shadow-lg hover:shadow-cyan-400 transition duration-300 flex-shrink-0 flex items-center justify-center text-center"
                >
                  <p className="text-cyan-400 text-lg leading-relaxed whitespace-pre-line">
                    {achievement}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 z-30 text-cyan-400 hover:text-white p-2 rounded-full bg-gray-800 hover:bg-cyan-500 transition-all duration-300 shadow-lg"
            >
              ➡️
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
