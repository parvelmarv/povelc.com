import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface ProjectType {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  cardImageUrl?: string;
  tags: string[];
  category: 'music' | 'games' | 'other';
  videoUrl?: string;
  instrumentation?: string[];
  additionalScreenshots?: string[];
  codeBreakdown?: string;
  keyFeatures?: string[];
  codeSnippets?: {
    title: string;
    language: string;
    code: string;
  }[];
  githubUrl?: string;
}

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'music' | 'games' | 'other'>('games');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const tabs = [
    { id: 'music' as const, label: 'Music' },
    { id: 'games' as const, label: 'Games' },
    { id: 'other' as const, label: 'Other' }
  ];

  const nextMedia = () => {
    if (selectedProject) {
      const totalItems = 1 + (selectedProject.additionalScreenshots?.length || 0);
      setCurrentMediaIndex((prev) => (prev + 1) % totalItems);
    }
  };

  const previousMedia = () => {
    if (selectedProject) {
      const totalItems = 1 + (selectedProject.additionalScreenshots?.length || 0);
      setCurrentMediaIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }
  };

  const projects: ProjectType[] = [
    {
      id: 1,
      title: "Take a walk",
      description: "Orchestra composition for a mystical mushroom environment",
      longDescription: "Got to compose to some environment art created by the amazing [Leo Brynielsson](https://www.artstation.com/leozy/profile). This piece originally started out with a marimba sound, but during the process, I switched to a piano with some delay and moved the marimba back to a rhythm section. Particularly happy with the tempo alterations.",
      instrumentation: ["Piano with Delay", "Violin x2", "Viola", "Cello", "Bass",  "Woodwinds", "Horn", "Marimba"],
      imageUrl: "/projects/youtube.jpg",
      category: "music",
      tags: ["Cubase", "Orchestra samples", "Marimba", "Dreamy"],
      videoUrl: "dixpQ3kq6gI"
    },
    {
      id: 2,
      title: "We're home!",
      description: "Ambient drones transition into a cinematic orchestral piece",
      longDescription: "An original composition created for a sci-fi themed environment made by [Leo Brynielsson](https://www.artstation.com/leozy/profile), specifically focusing on transition from rubato into á tempo. Also worked on melody delivery from the horns to the flutes. I'm currently working on extending this piece with a section where the strings move it to a fast-pace ostinato.",
      instrumentation: ["Drone (Gmin)", "Violins x3", "Cello", "Bass", "Flutes", "Horns", "Harp"],
      imageUrl: "/projects/youtube.jpg",
      category: "music",
      tags: ["Cubase", "Orchestra samples", "Ambient", "Epic"],
      videoUrl: "-V-H7jbXY3o"
    },
    {
      id: 3,
      title: "Dungeon - Level Design",
      description: "A showcase of dungeon level design and combination of blueprints and c++",
      longDescription: "A level design project where I used modular blocks to create a dungeon featuring a hidden door leading to a crypt. Custom C++ classes handle object grabbing and movement through the Enhanced Input System. A trigger and tag system determines whether doors and secret areas should be open/opening or closed/closing.",
      category: "games",
      tags: ["Level Design", "C++", "Tags", "Blueprints"],
      videoUrl: "knZdPb-aBOg",
      imageUrl: "/projects/dungeon/0_dungeon.png"
    },
    {
      id: 4,
      title: "Turrets & Tanks",
      description: "A small 3D tank game featuring enemy AI and independent control over steering and shooting",
      longDescription: "This demo showcases a Turrets & Tanks game, featuring a full gameplay lifecycle with win/loss conditions. The movement logic and enemy AI are implemented in C++, while Blueprint is used to seamlessly integrate systems and provide an intuitive interface for Game Designers to adjust parameters directly within Unreal Engine. The tank's chassis and turret move independently, utilizing both WASD for directional movement and mouse input for turret aiming and control.",
      category: "games",
      tags: ["Unreal Engine 5", "C++", "Blueprints", "Game Physics"],
      videoUrl: "MIJztwSg2-s",
      imageUrl: "/projects/game1.jpg"
    },
    {
      id: 5,
      title: "Unreal Engine - GAS",
      description: "Generic implementation of the unreal engines Gamplay Ability System",
      longDescription: "This project showcases the implementation of Unreal Engine's Gameplay Ability System (GAS), setting up basic player attributes (Health, Mana) and using Gameplay Effects to apply various healing and damage effects, both instant and over-time sources. Finally, the changes are mapped to UI widgets showing the effect taking place.",
      category: "games",
      tags: ["Unreal Engine 5", "C++", "GAS", "Blueprints"],
      videoUrl: "GLvuUBskYTo",
      imageUrl: "/projects/game1.jpg"
    },
    {
      id: 6,
      title: "Ascii-Webcam",
      description: "Using openCV to convert a live stream from my webcam to ASCII in real-time. ",
      longDescription: "This coding project transforms a continuous webcam stream into ASCII characters. It is hard-coded for an HD camera, so it's **best viewed in full screen** to see the characters clearly. Currently working on adding a Sobel-filter to add more rigid lines with the _\\\\/| characters. ",
      codeBreakdown: "The image is read and then scaled down to 1/8 resolution. After that, the image is resized to the original size, giving a pixel size of 8x8, which is a good size for the ASCII characters. The image is grayscaled and quantized into 8 distinct luminance values, which are mapped to characters from the string \" .:opOP#@\". Brighter values are represented by characters that take up more space, creating a shadow effect and adding depth to the final output.",
      imageUrl: "/projects/code2.jpg",
      category: "other",
      tags: ["C++", "CMake", "openCV", "Image processing"],
      videoUrl: "vaMY0zMFZAM",
      githubUrl: "https://github.com/parvelmarv/ascii_webcamstream"
    },
    {
      id: 7,
      title: "povelc.com",
      description: "My personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.",
      longDescription: "A simple, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS, and deployed on Vercel. It has a clean design with basic animations and transitions. The site includes a straightforward gallery to display projects, with modals for more details. The focus was on keeping the code maintainable and ensuring good performance and accessibility.",
      imageUrl: "/projects/Website_cardimage.png",
      cardImageUrl: "/projects/Website_cardimage.png",
      category: "other",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"]
    }
  ];

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentMediaIndex(0);
    document.body.style.overflow = 'auto';
  };

  const openModal = (project: ProjectType) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <section id="projects" className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4">
          {/* Folder System */}
          <div className="relative">
            {/* Stacked Folders */}
            <div className="relative">
              {/* Active Folder */}
              <div className="relative">
                {/* Folder Tabs */}
                <div className="flex gap-1 relative z-10">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        px-8 py-3 text-xl font-bold rounded-t-lg transition-all duration-300
                        ${activeTab === tab.id 
                          ? 'text-white bg-[#1a1e1f] border-t border-l border-r border-gray-200 shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_4px_8px_rgba(0,0,0,0.1)] relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#1a1e1f] after:z-20' 
                          : 'bg-gray-50 text-gray-400 hover:text-gray-600 transform -translate-y-1'
                        }
                      `}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Folder Content */}
                <div className="relative -mt-[1px] bg-white rounded-b-lg rounded-tr-lg border border-gray-200 p-8 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)]">
                  {/* Projects Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects
                      .filter(project => project.category === activeTab)
                      .map((project, index) => (
                        <button 
                          key={index}
                          onClick={() => openModal(project)}
                          className="text-left w-full bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                        >
                          <div className="relative">
                            {project.videoUrl ? (
                              <div className="relative aspect-video group">
                                <img
                                  src={`https://img.youtube.com/vi/${project.videoUrl}/maxresdefault.jpg`}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 
                                      `https://img.youtube.com/vi/${project.videoUrl}/mqdefault.jpg`;
                                  }}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <svg 
                                      className="w-16 h-16 text-white opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                    >
                                      <path d="M8 5v14l11-7z"/>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="aspect-video">
                                <img
                                  src={project.cardImageUrl || project.imageUrl}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag, tagIndex) => (
                                <span 
                                  key={tagIndex}
                                  className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="absolute -bottom-[4px] left-0 w-full h-[8px] bg-gradient-to-b from-gray-100 to-white"></div>
      </section>

      {/* YouTube Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Media Carousel */}
            <div className="relative">
              <div className="relative pt-[56.25%] bg-black">
                {currentMediaIndex === 0 ? (
                  selectedProject.videoUrl ? (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedProject.videoUrl}?autoplay=1`}
                      title={selectedProject.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img
                      src={selectedProject.cardImageUrl || selectedProject.imageUrl}
                      alt={selectedProject.title}
                      className="absolute top-0 left-0 w-full h-full object-contain bg-white"
                    />
                  )
                ) : (
                  <img
                    src={selectedProject.additionalScreenshots?.[currentMediaIndex - 1]}
                    alt={`${selectedProject.title} screenshot ${currentMediaIndex}`}
                    className={`absolute top-0 left-0 w-full h-full object-contain`}
                  />
                )}
              </div>

              {/* Navigation Arrows */}
              {(selectedProject.additionalScreenshots?.length || 0) > 0 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      previousMedia();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
                    aria-label="Previous media"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextMedia();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
                    aria-label="Next media"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Dots Navigation */}
              {(selectedProject.additionalScreenshots?.length || 0) > 0 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {[...Array(1 + (selectedProject.additionalScreenshots?.length || 0))].map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentMediaIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        currentMediaIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to media ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="p-8">
              {/* Title */}
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="mb-4">
                <ReactMarkdown 
                  className="text-gray-600 mb-4 prose"
                  components={{
                    a: ({node, ...props}) => (
                      <a 
                        {...props} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-bold underline hover:opacity-80"
                      />
                    )
                  }}
                >
                  {selectedProject.longDescription || selectedProject.description}
                </ReactMarkdown>
              </div>

              {/* Instrumentation Section for Music Projects */}
              {selectedProject.category === 'music' && selectedProject.instrumentation && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Instrumentation</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.instrumentation.map((instrument, index) => {
                      const totalItems = selectedProject.instrumentation?.length || 1;
                      const hue = (index / totalItems) * 180;
                      return (
                        <span 
                          key={index}
                          className="text-gray-800 text-sm px-3 py-1 rounded-full"
                          style={{ backgroundColor: `hsl(${hue}, 85%, 90%)` }}
                        >
                          {instrument}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Code Breakdown Section for Other Projects */}
              {selectedProject.category === 'other' && selectedProject.codeBreakdown && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Code Breakdown</h3>
                  <div className="text-gray-600">
                    <ReactMarkdown className="prose">
                      {selectedProject.codeBreakdown}
                    </ReactMarkdown>
                  </div>
                </div>
              )}

              {/* Key Features */}
              {selectedProject.keyFeatures && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {selectedProject.keyFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Code Snippets Section */}
              {selectedProject.codeSnippets && selectedProject.codeSnippets.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Code Snippets</h3>
                  <div className="relative">
                    <div className="overflow-x-auto">
                      <div className="flex gap-4 pb-4">
                        {selectedProject.codeSnippets.map((snippet, index) => (
                          <div 
                            key={index}
                            className="min-w-[600px] bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                          >
                            <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
                              <span className="text-white font-medium">{snippet.title}</span>
                              <span className="text-gray-400 text-sm">{snippet.language}</span>
                            </div>
                            <pre className="p-4 text-gray-300 overflow-x-auto">
                              <code>
                                {snippet.code}
                              </code>
                            </pre>
                          </div>
                        ))}
                      </div>
                    </div>
                    {selectedProject.codeSnippets.length > 1 && (
                      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const container = e.currentTarget.parentElement?.previousElementSibling;
                            if (container) {
                              container.scrollLeft -= 650;
                            }
                          }}
                          className="pointer-events-auto bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 transform -translate-x-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          aria-label="Previous code snippet"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const container = e.currentTarget.parentElement?.previousElementSibling;
                            if (container) {
                              container.scrollLeft += 650;
                            }
                          }}
                          className="pointer-events-auto bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 transform translate-x-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          aria-label="Next code snippet"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* GitHub Link - Now at the very end */}
              {selectedProject.githubUrl && (
                <div className="mt-8">
                  <a 
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects; 