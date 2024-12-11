import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="py-20 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6">
          This is <br /> Povel Croona
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Full Stack Developer specializing in modern web applications
        </p>
        <div className="flex justify-center gap-4">
          <a 
            href="#contact" 
            className="btn btn-primary"
          >
            Contact Me
          </a>
          <a 
            href="#projects" 
            className="btn btn-secondary"
          >
            View Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero; 