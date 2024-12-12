import React from 'react';

const Connect: React.FC = () => {
  return (
    <section id="connect" className="py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Let's Connect!</h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
          If you want to talk about composing, games, or just share a digital coffee, 
          feel free to reach out to me on LinkedIn.
        </p>
        <a 
          href="https://www.linkedin.com/in/povel-croona-893b6013b/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0077b5] text-white px-6 py-3 rounded-lg hover:bg-[#006396] transition-colors duration-300 font-semibold"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          Connect on LinkedIn
        </a>
      </div>
    </section>
  );
};

export default Connect; 