import svgPaths from "@/lib/imports/svg-paths";

interface RecentWorkItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  work_url?: string;
  category: string;
}

export default function RecentWork({
  recentWork,
}: {
  recentWork: RecentWorkItem[];
}) {
  return (
    <div
      id="recent-work"
      className="bg-white w-full py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#080808] text-2xl md:text-3xl lg:text-[34px] mb-4">
            Recent Work
          </h2>
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm md:text-base max-w-[570px] mx-auto leading-relaxed">
            My latest projects and achievements.
          </p>
        </div>

        {/* Work Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {recentWork.map((work) => (
            <div key={work.id} className="space-y-4">
              <div className="w-full aspect-[3/2] rounded-lg overflow-hidden">
                {work.image_url ? (
                  <img
                    src={work.image_url}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#3f8e00] to-[#62ba1b]" />
                )}
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#e0fff8]">
                <span className="font-['IBM_Plex_Mono:Bold',sans-serif] text-xs text-[#2ab090]">
                  {work.category}
                </span>
              </div>
              <h3 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#080808] text-xl md:text-2xl">
                {work.title}
              </h3>
              <div
                className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: work.description }}
              />
              {work.work_url && (
                <a
                  href={work.work_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded bg-[#3f8e00] text-white border border-[#62ba1b] shadow-[0px_8px_30px_0px_rgba(63,142,0,0.3)] hover:bg-[#4ca500] transition-colors"
                >
                  <span className="font-['IBM_Plex_Mono:Bold',sans-serif] text-sm">
                    Know more
                  </span>
                  <svg className="h-2.5 w-1.5" fill="none" viewBox="0 0 6 10">
                    <path d={svgPaths.p99dff00} fill="white" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
