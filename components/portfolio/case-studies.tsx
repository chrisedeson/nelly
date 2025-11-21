import svgPaths from "@/lib/imports/svg-paths";

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  project_link?: string; // Database field name
  technologies: string;
}

const tagColors = [
  { bg: "#fff6e9", text: "#ffa217", button: "#ffa217" },
  { bg: "#d0e6ff", text: "#000aff", button: "#000aff" },
  { bg: "#e0fff8", text: "#2ab090", button: "#2ab090" },
];

export default function CaseStudies({ projects }: { projects: Project[] }) {
  return (
    <div
      id="case-studies"
      className="bg-white w-full py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#080808] text-2xl md:text-3xl lg:text-[34px] mb-4">
            Case Studies
          </h2>
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm md:text-base max-w-[570px] mx-auto leading-relaxed">
            Explore my portfolio of successful projects and strategic
            implementations.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8 md:space-y-12 lg:space-y-16">
          {projects.map((project, index) => {
            const colors = tagColors[index % tagColors.length];
            const tech = project.technologies ? project.technologies.split(",")[0].trim() : "Project";

            return (
              <div
                key={project.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-6 md:gap-8 lg:gap-12 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 aspect-[3/2] rounded-lg overflow-hidden">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#3f8e00] to-[#62ba1b]" />
                  )}
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-4">
                  <div
                    className="inline-block px-3 py-1 rounded-full"
                    style={{ backgroundColor: colors.bg }}
                  >
                    <span
                      className="font-['IBM_Plex_Mono:Bold',sans-serif] text-xs"
                      style={{ color: colors.text }}
                    >
                      {tech}
                    </span>
                  </div>
                  <h3 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#080808] text-xl md:text-2xl">
                    {project.title}
                  </h3>
                  <div
                    className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                  {project.project_link && (
                    <a
                      href={project.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 rounded text-white hover:brightness-110 transition-all"
                      style={{ backgroundColor: colors.button }}
                    >
                      <span className="font-['IBM_Plex_Mono:Bold',sans-serif] text-sm">
                        View case study
                      </span>
                      <svg className="h-2.5 w-1.5" fill="none" viewBox="0 0 6 10">
                        <path d={svgPaths.p99dff00} fill="white" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
