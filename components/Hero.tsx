import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative mb-4">

        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 text-left">
            <h1 className="text-4xl font-bold mb-6">
              This is me
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              I'm Povel — a program and project manager by trade, with experience leading initiatives at companies like Spotify. 
              Over the past year, I've embraced the opportunity to explore creative passions, diving into composing, game development, 
              and other side projects. Below you can find a few of the things I've been working on lately. 
            </p>
            <div className="flex gap-4">
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

          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="w-72 h-72 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300">
                <Image
                  src="/profile/povel.png"
                  alt="Povel Croona"
                  width={288}
                  height={288}
                  className="object-cover scale-75 -translate-y-10 grayscale"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="absolute -bottom-[2px] left-0 w-full h-[4px] bg-gradient-to-b from-gray-100 to-white"></div>
    </section>
  );
};

export default Hero; 