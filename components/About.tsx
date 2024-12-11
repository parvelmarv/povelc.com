import React from 'react';

const About: React.FC = () => {
  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js",
    "Node.js", "Python", "SQL", "MongoDB",
    "AWS", "Docker", "Git", "Agile"
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
            <p className="text-gray-600 mb-6">
              I'm a full-stack developer specializing in JavaScript technologies.
              I have experience working with React and Node.js.
            </p>
            <p className="text-gray-600">
              When I'm not coding, you can find me contributing to open source projects
              or exploring new technologies.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-white text-gray-800 px-3 py-1 rounded-full shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 mb-8">
          <h2 className="text-2xl font-bold mb-8">This is Povel Croona</h2>
        </div>

        <div className="relative w-48 h-48 mx-auto mb-8">
          {/* Peachy gradient background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400"></div>
          {/* Profile image */}
          <img
            src="/images/povel.png"
            alt="Povel Croona"
            className="absolute inset-0 w-full h-full object-cover rounded-full p-1"
          />
        </div>
      </div>
    </section>
  );
};

export default About; 