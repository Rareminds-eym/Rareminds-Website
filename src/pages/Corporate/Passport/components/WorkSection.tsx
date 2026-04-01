import { Workflow } from "lucide-react";


const step1 = "/passport/StepProcess/Step1.webp";
const step2 = "/passport/StepProcess/Step2.webp";
const step3 = "/passport/StepProcess/Step3.webp";
const step4 = "/passport/StepProcess/Step4.webp";

const StepBlock = ({
  title,
  desc,
  img,
  reverse = false,
}: {
  title: string;
  desc: string;
  img: string;
  reverse?: boolean;
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Image */}
      {reverse ? (
        <div className="flex justify-center md:order-1">
          <img
            src={img}
            alt={title}
            className="w-full max-w-md object-contain drop-shadow-md"
          />
        </div>
      ) : (
        <div className="flex justify-center md:order-2">
          <img
            src={img}
            alt={title}
            className="w-full max-w-md object-contain drop-shadow-md"
          />
        </div>
      )}

      {/* Text */}
      <div
        className={`flex flex-col items-center text-center px-4 ${reverse ? "md:order-2" : "md:order-1"
          }`}
      >
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#011938] mb-6">
          {title}
        </h3>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-xl">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default function WorkSection() {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
            <Workflow className="text-white w-5 h-5" />
          </div>
        </div>
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-[#011938] mb-4">
          How Skill Passport <span className="text-[#E32A18]">Works.</span>
        </h2>
        <p className="text-center text-gray-500 text-sm md:text-base max-w-7xl mb-16">
          The Rareminds Skill Passport transforms training outcomes into
          measurable skill intelligence through a simple yet powerful process —
          from learning to verification to employability.
        </p>

        {/* SVG above Step 1 (only visible on md+) */}
        <div className="hidden md:grid grid-cols-2 items-start md:-ml-8 lg:mr-[20px] lg:-mb-20 xl:-mb-28 md:pt-8 lg:pt-16">
          <div className="flex justify-center">
            <img
              src="/svgs/passport/step-number.svg"
              alt="Step 1 of 4 process indicator"
              className="w-10 h-10 lg:w-12 lg:h-12"
            />
          </div>
          <div />
        </div>

        {/* Step 1 */}
        <StepBlock
          title="Train & Assess"
          desc="Learners undergo structured training programs delivered by Rareminds or partner institutions. Each module includes industry-aligned assessments and project-based evaluations mapped to defined skill standards."
          img={step1}
        />


        {/* SVG 1: Between Step 1 & 2 */}
        <div className="hidden md:flex justify-center md:-mt-5 lg:-mt-24">
          <div className="relative mx-auto md:w-[450px] lg:w-[550px] xl:w-[650px]">
            {/* Aspect ratio box */}
            <div style={{ paddingTop: `71%` }} />
            <img
              src="/svgs/passport/connecting-1.svg"
              alt="Connection line between Train & Assess and Capture & Validate steps"
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>


        <div className="mt-20 md:mt-2 lg:-mt-12">
          {/* Step 2 */}
          <StepBlock
            title="Capture & Validate"
            desc="Every demonstrated skill is captured and validated through performance data, mentor reviews, and digital assessments. Rareminds' verification engine ensures each skill badge is authentic, traceable, and backed by evidence — no manual intervention or paper certificates needed."
            img={step2}
            reverse
          />
        </div>

        {/* SVG 2: Between Step 2 & 3 */}
        <div className="hidden md:flex justify-center md:-mt-0 lg:-mt-20">
          <div className="relative mx-auto md:w-[450px] lg:w-[550px] xl:w-[650px]">
            {/* Aspect ratio box */}
            <div style={{ paddingTop: `71%` }} />
            <img
              src="/svgs/passport/connecting-2.svg"
              alt="Connection line between Capture & Validate and Issue The Skill Passport steps"
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>

        <div className="mt-20 md:mt-0 lg:-mt-16 mb-8">
          {/* Step 3 */}
          <StepBlock
            title="Issue The Skill Passport"
            desc="Once validated, each learner receives a digital Skill Passport — a dynamic portfolio of verified skills, competencies, and projects. This Passport becomes proof of capability, accessible anytime, anywhere — for hiring, internship, or advancement."
            img={step3}
          />
        </div>

        {/* SVG 3: Between Step 3 & 4 */}
        <div className="hidden md:flex justify-center md:-mt-4 lg:-mt-24 xl:-mt-28">
          <div className="relative mx-auto md:w-[450px] lg:w-[550px] xl:w-[650px]">
            {/* Aspect ratio box */}
            <div style={{ paddingTop: `70%` }} />
            <img
              src="/svgs/passport/connecting-3.svg"
              alt="Connection line between Issue The Skill Passport and Analyze & Apply steps"
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>

        <div className="mt-20 md:mt-0 lg:-mt-20">
          {/* Step 4 */}
          <StepBlock
            title="Analyze & Apply"
            desc="Organizations get access to real-time dashboards showing skill gaps, strengths, and team readiness. Use this intelligence to measure training ROI, optimize workforce planning, and align learning outcomes with business goals."
            img={step4}
            reverse
          />
        </div>

        {/* Footer Note */}
        <p className="text-center text-black/80 italic tracking-tight mt-16 text-sm md:text-base">
          From training to transformation — Skill Passport makes every skill count.
        </p>
      </div>
    </section>
  );
}