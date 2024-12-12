import React, { useState } from 'react';

type ProjectType = {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  instrumentation?: string[];
  imageUrl: string;
  category: 'music' | 'games' | 'other';
  tags: string[];
  videoUrl?: string;
  codeSnippets?: string[];
};

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
      title: "Mushroom Forest",
      description: "Collab where I got to compose some music for an environment art",
      longDescription: "Got to compose to some environment art created by the amazing Leo Brynielsson (check out his work here). This piece originally started out with a marimba sound, but during the process, I switched to a piano with some delay and moved the marimba back to a rhythm section. Particularly happy with the tempo alterations.",
      instrumentation: ["Piano with Delay", "Violin x2", "Viola", "Cello", "Bass",  "Woodwinds", "Horn", "Marimba"],
      imageUrl: "/projects/youtube.jpg",
      category: "music",
      tags: ["Cubase", "Orchestra samples", "Marimba", "Dreamy"],
      videoUrl: "dixpQ3kq6gI"
    },
    {
      id: 2,
      title: "Space Landing",
      description: "Music composition for a sci-fi themed environment",
      longDescription: "An original composition created for a sci-fi themed environment, specifically focusing on a space landing sequence. The music combines electronic and orchestral elements to capture the wonder and tension of space exploration. The piece features evolving synthesizer textures, cinematic percussion, and orchestral elements that build to create a sense of arrival and discovery.",
      instrumentation: ["Synthesizers", "Electronic Elements", "Orchestral Elements", "Cinematic Percussion"],
      imageUrl: "/projects/youtube.jpg",
      category: "music",
      tags: ["Music Production", "Studio One", "Sci-Fi", "Ambient"],
      videoUrl: "-V-H7jbXY3o"
    },
    {
      id: 3,
      title: "Turrets & Tanks",
      description: "2D tank battle game with physics-based combat",
      longDescription: "A physics-driven tank combat game developed in Unreal Engine 5. The game features realistic projectile physics, dynamic damage systems, and interactive environments. Players can engage in intense battles with various tank types, each offering unique abilities and playstyles. The project showcases advanced physics implementation, AI behavior programming, and complex game mechanics all working together to create an engaging combat experience.",
      category: "games",
      tags: ["Unreal Engine 5", "C++", "Blueprints", "Game Physics"],
      videoUrl: "MIJztwSg2-s",
      imageUrl: "/projects/game1.jpg"
    },
    {
      id: 4,
      title: "UE - Gameplay Ability System",
      description: "Implementation of gameplay mechanics using Unreal Engine's GAS",
      longDescription: "A deep dive into Unreal Engine's Gameplay Ability System (GAS). This project showcases the implementation of various gameplay mechanics including: custom abilities with different activation methods, gameplay effects for managing buffs and debuffs, attribute sets for handling character stats, and ability tasks for complex gameplay sequences. The system demonstrates both C++ and Blueprint integration for maximum flexibility.",
      category: "games",
      tags: ["Unreal Engine 5", "C++", "GAS", "Blueprints"],
      videoUrl: "uP7LmYKwXc0",
      imageUrl: "/projects/game1.jpg"
    },
    {
      id: 5,
      title: "This Website",
      description: "My personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.",
      longDescription: "A modern, responsive portfolio website built using Next.js, TypeScript, and Tailwind CSS. The site features a clean, intuitive design with smooth animations and transitions. It showcases various projects through an interactive gallery system with modal views for detailed information. The development focused on performance optimization, accessibility, and maintainable code structure.",
      imageUrl: "/images/portfolio.png",
      category: "other",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
      id: 6,
      title: "Ascii-Art",
      description: "Convert images to ASCII art using Python",
      longDescription: "A Python-based tool that transforms regular images into ASCII art. The program analyzes image brightness values and maps them to appropriate ASCII characters to create detailed text-based representations. Features include customizable character sets, adjustable output size, and support for various image formats. The project demonstrates image processing techniques and creative algorithmic thinking.",
      imageUrl: "/projects/code2.jpg",
      category: "other",
      tags: ["Python", "Image Processing", "ASCII"],
      videoUrl: "vaMY0zMFZAM"
    },
    {
      id: 7,
      title: "Dungeon - Level Design",
      description: "A showcase of dungeon level design and development",
      longDescription: "An extensive dungeon level designed and developed in Unreal Engine 5. This project focuses on creating an immersive environment with dynamic lighting, atmospheric effects, and interactive elements. The level features carefully crafted spaces that balance aesthetics with gameplay functionality, incorporating principles of player guidance, pacing, and environmental storytelling. Special attention was given to lighting design, material systems, and performance optimization.",
      category: "games",
      tags: ["Level Design", "UE5", "Tags", "Blueprints"],
      videoUrl: "knZdPb-aBOg",
      imageUrl: "/projects/dungeon/0_dungeon.png"
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
      <section id="projects" className="py-20">
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
                          ? 'bg-white text-black border-t border-l border-r border-gray-200 shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_4px_8px_rgba(0,0,0,0.1)] relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-white after:z-20' 
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
                                  src={project.imageUrl}
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
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedProject.videoUrl}?autoplay=1`}
                    title={selectedProject.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={selectedProject.additionalScreenshots?.[currentMediaIndex - 1]}
                    alt={`${selectedProject.title} screenshot ${currentMediaIndex}`}
                    className="absolute top-0 left-0 w-full h-full object-contain"
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
              <h2 className="text-3xl font-bold mb-6">{selectedProject.title}</h2>

              {/* Description */}
              <div className="mb-4">
                <p className="text-gray-600 mb-4">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              {/* Instrumentation Section for Music Projects */}
              {selectedProject.category === 'music' && selectedProject.instrumentation && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Instrumentation</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedProject.instrumentation.map((instrument, index) => (
                      <li key={index}>{instrument}</li>
                    ))}
                  </ul>
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

              {/* Tags at the bottom */}
              <div className="flex flex-wrap gap-2 mt-8">
                {selectedProject.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects; 