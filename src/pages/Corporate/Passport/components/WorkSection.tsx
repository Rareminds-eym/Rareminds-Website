import { Workflow } from "lucide-react";
// import step1 from "../../../../../public/passport/StepProcess/Step1.webp";
// import step2 from "../../../../../public/passport/StepProcess/Step2.webp";
// import step3 from "../../../../../public/passport/StepProcess/Step3.webp";
// import step4 from "../../../../../public/passport/StepProcess/Step4.webp";

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
            <svg
              width="63"
              height="60"
              viewBox="0 0 63 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 lg:w-12 lg:h-12"
            >
              <path d="M31.4439 59.7144C48.8099 59.7144 62.8879 46.3469 62.8879 29.8572C62.8879 13.3675 48.8099 0 31.4439 0C14.0779 0 0 13.3675 0 29.8572C0 46.3469 14.0779 59.7144 31.4439 59.7144Z" fill="black" />
              <path d="M34.1951 24.5455V42H30.5047V28.0483H30.4025L26.4053 30.554V27.2812L30.7263 24.5455H34.1951Z" fill="white" />
            </svg>
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

            <svg
              viewBox="0 0 758 495"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              className="absolute top-0 left-0 w-full h-full"
            >
              <path
                d="M13.7417 26.6373C20.2265 26.6373 25.4835 21.3459 25.4835 14.8186C25.4835 8.29139 20.2265 3 13.7417 3C7.25696 3 2 8.29139 2 14.8186C2 21.3459 7.25696 26.6373 13.7417 26.6373Z"
                fill="white"
                stroke="black"
                strokeWidth="2.89"
                strokeMiterlimit="10"
                strokeDasharray="6.93 6.93"
              />
              <path
                d="M700.444 516.714C717.81 516.714 731.888 503.347 731.888 486.857C731.888 470.368 717.81 457 700.444 457C683.078 457 669 470.368 669 486.857C669 503.347 683.078 516.714 700.444 516.714Z"
                fill="black"
              />
              <path
                d="M694.742 498.717V496.058L700.955 490.305C701.483 489.794 701.927 489.333 702.285 488.924C702.648 488.515 702.924 488.115 703.111 487.722C703.299 487.325 703.393 486.896 703.393 486.436C703.393 485.924 703.276 485.484 703.043 485.115C702.81 484.74 702.492 484.453 702.089 484.254C701.685 484.049 701.228 483.947 700.716 483.947C700.182 483.947 699.716 484.055 699.319 484.271C698.921 484.487 698.614 484.796 698.398 485.2C698.182 485.603 698.074 486.083 698.074 486.64H694.572C694.572 485.498 694.83 484.507 695.347 483.666C695.864 482.825 696.589 482.174 697.52 481.714C698.452 481.254 699.526 481.024 700.742 481.024C701.992 481.024 703.08 481.245 704.006 481.688C704.938 482.126 705.662 482.734 706.179 483.512C706.697 484.291 706.955 485.183 706.955 486.188C706.955 486.847 706.824 487.498 706.563 488.14C706.307 488.782 705.85 489.495 705.191 490.279C704.532 491.058 703.603 491.992 702.404 493.083L699.856 495.58V495.7H707.185V498.717H694.742Z"
                fill="white"
              />
              <path
                d="M25 10.2507C49.203 -1.0443 85.1741 -5.3909 123.12 45.3601C185.532 128.833 197.563 304.778 255.956 362.936C303.432 410.198 347.301 385.22 376.33 357.886C479.268 91.7033 600.336 79.8267 663.415 279.647C669.944 300.339 677.131 325.929 684.046 358.957C691.716 395.627 696.718 430.247 700 457"
                stroke="black"
                strokeWidth="5"
                strokeMiterlimit="10"
                strokeDasharray="12 12"
              />
            </svg>
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
            <svg
              viewBox="0 0 756 491"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              className="absolute top-0 left-0 w-full h-full"
            >
              <path d="M714 10.2507C689.797 -1.0443 653.826 -5.3909 615.88 45.3601C553.468 128.833 541.437 304.778 483.044 362.936C435.568 410.198 391.699 385.22 362.67 357.886C259.732 91.7033 138.664 79.8267 75.5854 279.647C69.0564 300.339 61.8692 325.929 54.954 358.957C47.2841 395.627 42.2821 430.247 39 457" stroke="black" stroke-width="5" stroke-miterlimit="10" stroke-dasharray="12 12" />
              <path d="M31.4439 505.714C48.8099 505.714 62.8879 492.347 62.8879 475.857C62.8879 459.368 48.8099 446 31.4439 446C14.0779 446 0 459.368 0 475.857C0 492.347 14.0779 505.714 31.4439 505.714Z" fill="black" />
              <path d="M31.014 488.239C29.7412 488.239 28.6077 488.02 27.6134 487.582C26.6248 487.139 25.8435 486.531 25.2697 485.759C24.7015 484.98 24.4089 484.082 24.3918 483.065H28.1077C28.1305 483.491 28.2697 483.866 28.5253 484.19C28.7867 484.509 29.1333 484.756 29.5651 484.932C29.9969 485.108 30.4827 485.196 31.0225 485.196C31.585 485.196 32.0822 485.097 32.514 484.898C32.9458 484.699 33.2839 484.423 33.5282 484.071C33.7725 483.719 33.8947 483.312 33.8947 482.852C33.8947 482.386 33.764 481.974 33.5026 481.616C33.2469 481.253 32.8776 480.969 32.3947 480.764C31.9174 480.56 31.3492 480.457 30.6901 480.457H29.0623V477.747H30.6901C31.2469 477.747 31.7384 477.651 32.1645 477.457C32.5964 477.264 32.9316 476.997 33.1702 476.656C33.4089 476.31 33.5282 475.906 33.5282 475.446C33.5282 475.009 33.4231 474.625 33.2128 474.295C33.0083 473.96 32.7185 473.699 32.3435 473.511C31.9742 473.324 31.5424 473.23 31.0481 473.23C30.5481 473.23 30.0907 473.321 29.6759 473.503C29.2611 473.679 28.9287 473.932 28.6787 474.261C28.4287 474.591 28.2952 474.977 28.2782 475.42H24.7412C24.7583 474.415 25.0452 473.528 25.602 472.761C26.1589 471.994 26.9089 471.395 27.852 470.963C28.8009 470.526 29.8719 470.307 31.0651 470.307C32.2697 470.307 33.3236 470.526 34.227 470.963C35.1305 471.401 35.8322 471.991 36.3322 472.736C36.8378 473.474 37.0878 474.304 37.0822 475.224C37.0878 476.202 36.7839 477.017 36.1702 477.67C35.5623 478.324 34.7697 478.739 33.7924 478.915V479.051C35.0765 479.216 36.0537 479.662 36.7242 480.389C37.4003 481.111 37.7356 482.014 37.7299 483.099C37.7356 484.094 37.4486 484.977 36.8691 485.75C36.2952 486.523 35.5026 487.131 34.4912 487.574C33.4799 488.017 32.3208 488.239 31.014 488.239Z" fill="white" />
              <path d="M725.742 26.6373C732.227 26.6373 737.483 21.3459 737.483 14.8186C737.483 8.29139 732.227 3 725.742 3C719.257 3 714 8.29139 714 14.8186C714 21.3459 719.257 26.6373 725.742 26.6373Z" fill="white" stroke="black" stroke-width="2.89" stroke-miterlimit="10" stroke-dasharray="6.93 6.93" />
            </svg>

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
            <svg
              viewBox="0 0 766 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              className="absolute top-0 left-0 w-full h-full"
            >
              <path d="M13.7417 26.6373C20.2265 26.6373 25.4835 21.3459 25.4835 14.8186C25.4835 8.29139 20.2265 3 13.7417 3C7.25696 3 2 8.29139 2 14.8186C2 21.3459 7.25696 26.6373 13.7417 26.6373Z" fill="white" stroke="black" stroke-width="2.89" stroke-miterlimit="10" stroke-dasharray="6.93 6.93" />
              <path d="M25 10.2507C50.3504 -1.0443 88.0268 -5.3909 127.771 45.3601C193.142 128.833 205.744 304.778 266.905 362.936C316.631 410.198 362.58 385.22 392.986 357.886C500.804 91.7033 627.611 79.8267 693.68 279.647C700.519 300.339 708.047 325.929 715.29 358.957C723.323 395.627 728.562 430.247 732 457" stroke="black" stroke-width="5" stroke-miterlimit="10" stroke-dasharray="12 12" />
              <path d="M732.444 511.714C749.81 511.714 763.888 498.347 763.888 481.857C763.888 465.368 749.81 452 732.444 452C715.078 452 701 465.368 701 481.857C701 498.347 715.078 511.714 732.444 511.714Z" fill="black" />
              <path d="M725.904 490.649V487.742L733.19 476.262H735.696V480.285H734.213L729.619 487.555V487.691H739.975V490.649H725.904ZM734.281 493.717V489.762L734.35 488.475V476.262H737.81V493.717H734.281Z" fill="white" />
            </svg>

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