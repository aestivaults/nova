import { sections } from "../data/data";

export default function Information() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {sections.map((section, index) => (
        <div key={section.id} className="glass-card">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div
                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0 ${
                  index % 2 === 0 ? "bg-light/15" : "bg-dark/15"
                } border border-primary-300/20`}
              >
                <section.icon
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    index % 2 === 0 ? "text-primary-400" : "text-secondary-400"
                  }`}
                />
              </div>
              <h2
                className={`text-xl sm:text-2xl font-bold flex-1 ${
                  index % 2 === 0 ? "text-primary-400" : "text-secondary-400"
                }`}
              >
                {section.title}
              </h2>
            </div>
            <div className="space-y-6 sm:space-y-8">
              {section.content.map((item, itemIndex) => (
                <div key={itemIndex} className="group">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex-shrink-0 mt-2 sm:mt-1 w-2 h-2 rounded-full bg-primary-400 opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <h3 className="text-base sm:text-lg font-semibold text-primary-300 flex-1">
                      {item.subtitle}
                    </h3>
                  </div>
                  <p className="text-secondary-300 leading-relaxed pl-6 sm:pl-8 border-l-2 border-secondary-700/50 text-sm sm:text-base">
                    {item.details}
                  </p>
                  {itemIndex < section.content.length - 1 && (
                    <div className="mt-4 sm:mt-6 h-px bg-gradient-to-r from-transparent via-secondary-700/30 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
