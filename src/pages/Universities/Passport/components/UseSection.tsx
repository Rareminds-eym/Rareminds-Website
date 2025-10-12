import { TrendingUp, Users, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <header className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          {/* responsive clamp for heading so it scales smoothly */}
          <h1
            className="font-extrabold text-black leading-tight mb-3"
            style={{ fontSize: "clamp(1.375rem, 3.6vw, 2.75rem)" }}
          >
            A Success Story in{" "}
            <span className="text-orange-500">Educational Innovation</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 font-light">
            How Rareminds Skill Passport transformed student employability
          </p>
        </header>

        {/* Case Study Info */}
        <section
          aria-labelledby="case-study-title"
          className="max-w-4xl mx-auto mb-10 sm:mb-14"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 border border-gray-200 transition-shadow duration-300 hover:shadow-2xl text-center">
            <h2
              id="case-study-title"
              className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4"
            >
              Case Study:{" "}
              <span className="text-orange-500">Naan Mudhalvan Program</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed mb-4">
              One of Tamil Nadu's leading universities partnered with{" "}
              <span className="font-semibold text-orange-500">Rareminds</span> to
              implement the Skill Passport for over{" "}
              <span className="font-semibold text-orange-500">10,000 students</span>{" "}
              under the prestigious Naan Mudhalvan Program.
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
              Within just{" "}
              <span className="font-semibold text-orange-500">one semester</span>, the results
              exceeded expectations, transforming how the institution approaches student skill
              development and career readiness.
            </p>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="max-w-6xl mx-auto">
          <h3 className="text-base sm:text-lg md:text-2xl font-bold text-center text-black mb-8">
            Key <span className="text-orange-500">Results</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {/* Stat 1 */}
            <article
              className="bg-white rounded-2xl shadow-md p-5 sm:p-8 border border-gray-200 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              aria-label="86 percent improvement"
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-100 mb-4">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>

                <div className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-orange-500 mb-3 leading-tight">
                  86%
                </div>

                <p className="text-sm sm:text-base text-gray-800 text-center font-medium leading-relaxed">
                  Of students showed measurable improvement in employability skills
                </p>
              </div>
            </article>

            {/* Stat 2 */}
            <article
              className="bg-white rounded-2xl shadow-md p-5 sm:p-8 border border-gray-200 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              aria-label="Clear visibility for departments"
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-100 mb-4">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>

                <div className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-orange-500 mb-3 leading-tight">
                  Clear
                </div>

                <p className="text-sm sm:text-base text-gray-800 text-center font-medium leading-relaxed">
                  Visibility for departments to identify and address skill gaps effectively
                </p>
              </div>
            </article>

            {/* Stat 3 */}
            <article
              className="bg-white rounded-2xl shadow-md p-5 sm:p-8 border border-gray-200 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              aria-label="40 percent faster readiness evaluation"
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-100 mb-4">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>

                <div className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-orange-500 mb-3 leading-tight">
                  40%
                </div>

                <p className="text-sm sm:text-base text-gray-800 text-center font-medium leading-relaxed">
                  Faster readiness evaluation process for placement teams
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Impact Summary placeholder - kept structure unchanged */}
      </div>
    </div>
  );
};

export default Index;
