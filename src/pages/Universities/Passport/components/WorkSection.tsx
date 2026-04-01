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
          How Skill Passport <span className="text-[#000000]">Works.</span>
        </h2>
        <p className="text-center text-gray-500 text-sm md:text-base mb-16">
           The Skill Passport integrates seamlessly with your academic systems, LMS, and training programs, ensuring effortless adoption.
        </p>

        {/* SVG above Step 1 (only visible on md+) */}
        <div className="hidden md:grid grid-cols-2 items-start md:-ml-8 lg:mr-[20px] lg:-mb-20 xl:-mb-28 md:pt-8 lg:pt-16">
          <div className="flex justify-center">
            <img
              src="/svgs/passport/step-number.svg"
              aria-hidden="true"
              className="w-10 h-10 lg:w-12 lg:h-12"
            />
          </div>
          <div />
        </div>

        {/* Step 1 */}
        <StepBlock
          title="Capture Skills"
          desc="Records student academic performance, outcomes, and participation."
          img={step1}
        />
        {/* SVG 1: Between Step 1 & 2 */}
        <div className="hidden md:flex justify-center md:-mt-5 lg:-mt-24">
          <div className="relative mx-auto md:w-[450px] lg:w-[550px] xl:w-[650px]">
            {/* Aspect ratio box */}
            <div style={{ paddingTop: `71%` }} />
            <img
              src="/svgs/passport/connecting-1.svg"
              alt="Connection line between Capture Skills and Track Progress steps"
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>


        <div className="mt-20 md:mt-2 lg:-mt-12">
          {/* Step 2 */}
         <StepBlock
             title="Track Progress"
            desc="Maps technical, employability, and soft skills against institutional or industry frameworks."
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
              alt="Connection line between Track Progress and Showcase Achievement steps"
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>

        <div className="mt-20 md:mt-0 lg:-mt-16 mb-8">
          {/* Step 3 */}
           <StepBlock
            title="Showcase Achievement"
            desc="Generates a personalized, verifiable digital Skill Passport for each student — ready to share with recruiters or internship panels."
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
              alt="Connection line between Showcase Achievement and Result steps"
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>

        <div className="mt-20 md:mt-0 lg:-mt-20">
          {/* Step 4 */}
         <StepBlock
            title="Result"
            desc="Institutions gain data-driven visibility, and students gain digital proof of skill mastery."
            img={step4}
            reverse
          />
        </div>

        {/* Footer Note */}
        <p className="text-center text-black/80 italic tracking-tight mt-16 lg:mt-36 text-sm md:text-base">
          From capture to mastery — Skill Passport ensures every skill counts.
        </p>
      </div>
    </section>
  );
}
