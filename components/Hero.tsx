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
                href="#connect" 
                className="group inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300 font-semibold"
              >
                <span>Let's Connect</span>
                <svg 
                  className="w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
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
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="absolute -bottom-[4px] left-0 w-full h-[8px] bg-gradient-to-b from-gray-100 to-white"></div>
    </section>
  );
};

export default Hero; 