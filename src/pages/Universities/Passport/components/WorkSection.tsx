// import { Workflow } from "lucide-react";

// const step1 = "/passport/StepProcess/Step1.webp";
// const step2 = "/passport/StepProcess/Step2.webp";
// const step3 = "/passport/StepProcess/Step3.webp";
// const step4 = "/passport/StepProcess/Step4.webp";

// const StepBlock = ({
//   title,
//   desc,
//   img,
//   reverse = false,
// }: {
//   title: string;
//   desc: string;
//   img: string;
//   reverse?: boolean;
// }) => {
//   return (
//     <div className="grid md:grid-cols-2 gap-12 items-center">
//       {/* Image */}
//       {reverse ? (
//         <div className="flex justify-center md:order-1">
//           <img
//             src={img}
//             alt={title}
//             className="w-full max-w-md object-contain drop-shadow-md"
//           />
//         </div>
//       ) : (
//         <div className="flex justify-center md:order-2">
//           <img
//             src={img}
//             alt={title}
//             className="w-full max-w-md object-contain drop-shadow-md"
//           />
//         </div>
//       )}

//       {/* Text */}
//       <div
//         className={`flex flex-col items-center text-center px-4 ${
//           reverse ? "md:order-2" : "md:order-1"
//         }`}
//       >
//         <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#011938] mb-6">
//           {title}
//         </h3>
//         <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-xl">
//           {desc}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default function WorkSection() {
//   return (
//     <section className="relative py-20 md:py-28">
//       <div className="max-w-7xl mx-auto px-6 lg:px-12">
//          {/* Top Icon */}
//         <div className="flex justify-center mb-6">
//           <div className="bg-[#000000] rounded-2xl w-12 h-12 flex items-center justify-center shadow-md">
//             <Workflow  className="text-white w-5 h-5" />
//           </div>
//         </div>
//         {/* Heading */}
//         <h2 className="text-center text-3xl md:text-4xl font-extrabold text-[#011938] mb-4">
//           How Skill Passport <span className="text-[#000000]">Works.</span>
//         </h2>
        // <p className="text-center text-gray-500 text-sm md:text-base mb-16">
        //    The Skill Passport integrates seamlessly with your academic systems, LMS, and training programs, ensuring effortless adoption.
        // </p>

//         {/* Step 1 */}
        // <StepBlock
        //   title="Capture Skills"
        //   desc="Records student academic performance, outcomes, and participation."
        //   img={step1 as unknown as string}
        // />

//         {/* SVG 1: Between Step 1 & 2 */}
//         <div className="hidden md:flex justify-center md:-mt-10 lg:-mt-24">
//           <div className="relative w-full md:max-w-sm lg:max-w-xl">
//             <div style={{ paddingTop: `${(495 / 758) * 100}%` }} />
//             <svg
//               viewBox="0 0 758 495"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               preserveAspectRatio="xMidYMid meet"
//               className="absolute top-0 left-0 w-full h-full"
//             >
//               <path
//                 d="M31.4439 59.7144C48.8099 59.7144 62.8879 46.3469 62.8879 29.8572C62.8879 13.3675 48.8099 0 31.4439 0C14.0779 0 0 13.3675 0 29.8572C0 46.3469 14.0779 59.7144 31.4439 59.7144Z"
//                 fill="black"
//               />
//               <path
//                 d="M34.1951 24.5455V42H30.5047V28.0483H30.4025L26.4053 30.554V27.2812L30.7263 24.5455H34.1951Z"
//                 fill="white"
//               />
//               <path
//                 d="M63 22.2507C87.203 10.9557 123.174 6.6091 161.12 57.3601C223.532 140.833 235.563 316.778 293.956 374.936C341.432 422.198 385.301 397.22 414.33 369.886C517.268 103.703 638.336 91.8267 701.415 291.647C707.944 312.339 715.131 337.929 722.046 370.957C729.716 407.627 734.718 442.247 738 469"
//                 stroke="black"
//                 strokeWidth="5"
//                 strokeMiterlimit="10"
//                 strokeDasharray="12 12"
//                 vectorEffect="non-scaling-stroke"
//               />
//               <path
//                 d="M744.742 492.637C751.227 492.637 756.483 487.346 756.483 480.819C756.483 474.291 751.227 469 744.742 469C738.257 469 733 474.291 733 480.819C733 487.346 738.257 492.637 744.742 492.637Z"
//                 fill="white"
//                 stroke="black"
//                 strokeWidth="2.89"
//                 strokeMiterlimit="10"
//                 strokeDasharray="6.93 6.93"
//                 vectorEffect="non-scaling-stroke"
//               />
//             </svg>
//           </div>
//         </div>

//         <div className="mt-20 md:mt-0 lg:-mt-16">
//           {/* Step 2 */}
          // <StepBlock
          //    title="Track Progress"
          //   desc="Maps technical, employability, and soft skills against institutional or industry frameworks."
          //   img={step2 as unknown as string}
          //   reverse
          // />
//         </div>

//         {/* SVG 2: Between Step 2 & 3 */}
//         <div className="hidden md:flex justify-center md:-mt-0 lg:-mt-20">
//           <div className="relative w-full md:max-w-sm lg:max-w-xl">
//             <div style={{ paddingTop: `${(491 / 756) * 100}%` }} />
//             <svg
//               viewBox="0 0 756 491"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               preserveAspectRatio="xMidYMid meet"
//               className="absolute top-0 left-0 w-full h-full"
//             >
//               <path
//                 d="M13.7417 488.637C20.2265 488.637 25.4835 483.346 25.4835 476.819C25.4835 470.291 20.2265 465 13.7417 465C7.25696 465 2 470.291 2 476.819C2 483.346 7.25696 488.637 13.7417 488.637Z"
//                 fill="white"
//                 stroke="black"
//                 strokeWidth="2.89"
//                 strokeMiterlimit="10"
//                 strokeDasharray="6.93 6.93"
//                 vectorEffect="non-scaling-stroke"
//               />
//               <path
//                 d="M693 18.2507C668.797 6.9557 632.826 2.6091 594.88 53.3601C532.468 136.833 520.437 312.778 462.044 370.936C414.568 418.198 370.699 393.22 341.67 365.886C238.732 99.7033 117.664 87.8267 54.5854 287.647C48.0564 308.339 40.8692 333.929 33.954 366.957C26.2841 403.627 21.2821 438.247 18 465"
//                 stroke="black"
//                 strokeWidth="5"
//                 strokeMiterlimit="10"
//                 strokeDasharray="12 12"
//                 vectorEffect="non-scaling-stroke"
//               />
//               <path
//                 d="M724.444 59.7144C741.81 59.7144 755.888 46.3469 755.888 29.8572C755.888 13.3675 741.81 0 724.444 0C707.078 0 693 13.3675 693 29.8572C693 46.3469 707.078 59.7144 724.444 59.7144Z"
//                 fill="black"
//               />
//               <path
//                 d="M718.742 41.7168V39.0577L724.955 33.3049C725.483 32.7935 725.927 32.3333 726.285 31.9242C726.648 31.5151 726.924 31.1145 727.111 30.7225C727.299 30.3248 727.393 29.8958 727.393 29.4355C727.393 28.9242 727.276 28.4838 727.043 28.1145C726.81 27.7395 726.492 27.4526 726.089 27.2537C725.685 27.0492 725.228 26.9469 724.716 26.9469C724.182 26.9469 723.716 27.0549 723.319 27.2708C722.921 27.4867 722.614 27.7963 722.398 28.1998C722.182 28.6032 722.074 29.0833 722.074 29.6401H718.572C718.572 28.498 718.83 27.5066 719.347 26.6657C719.864 25.8248 720.589 25.1742 721.52 24.714C722.452 24.2537 723.526 24.0236 724.742 24.0236C725.992 24.0236 727.08 24.2452 728.006 24.6884C728.938 25.1259 729.662 25.7338 730.179 26.5123C730.697 27.2907 730.955 28.1827 730.955 29.1884C730.955 29.8475 730.824 30.498 730.563 31.1401C730.307 31.7821 729.85 32.4952 729.191 33.2793C728.532 34.0577 727.603 34.9924 726.404 36.0833L723.856 38.5804V38.6998H731.185V41.7168H718.742Z"
//                 fill="white"
//               />
//             </svg>
//           </div>
//         </div>

//         <div className="mt-20 md:mt-0 lg:-mt-16 mb-8">
//           {/* Step 3 */}
          // <StepBlock
          //   title="Showcase Achievement"
          //   desc="Generates a personalized, verifiable digital Skill Passport for each student — ready to share with recruiters or internship panels."
          //   img={step3 as unknown as string}
          // />
//         </div>

//         {/* SVG 3: Between Step 3 & 4 */}
//         <div className="hidden md:flex justify-center md:-mt-4 lg:-mt-28">
//           <div className="relative w-full md:max-w-sm lg:max-w-xl">
//             <div style={{ paddingTop: `${(486 / 751) * 100}%` }} />
//             <svg
//               viewBox="0 0 751 486"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               preserveAspectRatio="xMidYMid meet"
//               className="absolute top-0 left-0 w-full h-full"
//             >
//               <path
//                 d="M737.742 483.637C744.227 483.637 749.483 478.346 749.483 471.819C749.483 465.291 744.227 460 737.742 460C731.257 460 726 465.291 726 471.819C726 478.346 731.257 483.637 737.742 483.637Z"
//                 fill="white"
//                 stroke="black"
//                 strokeWidth="2.89"
//                 strokeMiterlimit="10"
//                 strokeDasharray="6.93 6.93"
//                 vectorEffect="non-scaling-stroke"
//               />
//               <path
//                 d="M63 13.2507C87.203 1.9557 123.174 -2.3909 161.12 48.3601C223.532 131.833 235.563 307.778 293.956 365.936C341.432 413.198 385.301 388.22 414.33 360.886C517.268 94.7033 638.336 82.8267 701.415 282.647C707.944 303.339 715.131 328.929 722.046 361.957C729.716 398.627 734.718 433.247 738 460"
//                 stroke="black"
//                 strokeWidth="5"
//                 strokeMiterlimit="10"
//                 strokeDasharray="12 12"
//                 vectorEffect="non-scaling-stroke"
//               />
//               <path
//                 d="M31.4439 59.7144C48.8099 59.7144 62.8879 46.3469 62.8879 29.8572C62.8879 13.3675 48.8099 0 31.4439 0C14.0779 0 0 13.3675 0 29.8572C0 46.3469 14.0779 59.7144 31.4439 59.7144Z"
//                 fill="black"
//               />
//               <path
//                 d="M31.8421 41.9554C30.5694 41.9554 29.4359 41.7367 28.4415 41.2992C27.4529 40.856 26.6716 40.248 26.0978 39.4753C25.5296 38.6969 25.237 37.7992 25.2199 36.7821H28.9359C28.9586 37.2083 29.0978 37.5833 29.3535 37.9071C29.6148 38.2253 29.9614 38.4725 30.3932 38.6486C30.8251 38.8248 31.3109 38.9128 31.8506 38.9128C32.4131 38.9128 32.9103 38.8134 33.3421 38.6145C33.7739 38.4157 34.112 38.1401 34.3563 37.7878C34.6006 37.4355 34.7228 37.0293 34.7228 36.5691C34.7228 36.1032 34.5921 35.6912 34.3307 35.3333C34.0751 34.9696 33.7057 34.6855 33.2228 34.481C32.7455 34.2765 32.1773 34.1742 31.5182 34.1742H29.8904V31.464H31.5182C32.0751 31.464 32.5665 31.3674 32.9927 31.1742C33.4245 30.981 33.7597 30.714 33.9984 30.373C34.237 30.0265 34.3563 29.623 34.3563 29.1628C34.3563 28.7253 34.2512 28.3418 34.041 28.0123C33.8364 27.677 33.5466 27.4157 33.1716 27.2282C32.8023 27.0407 32.3705 26.9469 31.8762 26.9469C31.3762 26.9469 30.9188 27.0378 30.504 27.2196C30.0893 27.3958 29.7569 27.6486 29.5069 27.9782C29.2569 28.3077 29.1234 28.6941 29.1063 29.1373H25.5694C25.5864 28.1316 25.8734 27.2452 26.4302 26.4782C26.987 25.7111 27.737 25.1117 28.6802 24.6799C29.629 24.2424 30.7001 24.0236 31.8932 24.0236C33.0978 24.0236 34.1518 24.2424 35.0552 24.6799C35.9586 25.1174 36.6603 25.7083 37.1603 26.4526C37.666 27.1912 37.916 28.0208 37.9103 28.9412C37.916 29.9185 37.612 30.7338 36.9984 31.3873C36.3904 32.0407 35.5978 32.4554 34.6205 32.6316V32.7679C35.9046 32.9327 36.8819 33.3787 37.5523 34.106C38.2285 34.8276 38.5637 35.731 38.558 36.8162C38.5637 37.8105 38.2768 38.6941 37.6972 39.4668C37.1234 40.2395 36.3307 40.8475 35.3194 41.2907C34.308 41.7338 33.1489 41.9554 31.8421 41.9554Z"
//                 fill="white"
//               />
//             </svg>
//           </div>
//         </div>

//         <div className="mt-20 md:mt-0 lg:-mt-16">
//           {/* Step 4 */}
          // <StepBlock
          //   title="Result"
          //   desc="Institutions gain data-driven visibility, and students gain digital proof of skill mastery."
          //   img={step4 as unknown as string}
          //   reverse
          // />
//         </div>

//         {/* SVG 4: After Step 4 */}
//         <div className="justify-end hidden md:flex sm:-mt-0 md:-mt-0 lg:-mt-24">
//           <div className="relative w-full max-w-[63px] md:max-w-[40px] lg:max-w-[50px] mr-56 md:mr-36 lg:mr-[12rem] xl:mr-56">
//             <div style={{ paddingTop: `${(60 / 63) * 100}%` }} />
//             <svg
//               viewBox="0 0 63 60"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               preserveAspectRatio="xMidYMid meet"
//               className="absolute top-0 left-0 w-full h-full"
//             >
//               <path
//                 d="M31.4439 59.7144C48.8099 59.7144 62.8879 46.3469 62.8879 29.8572C62.8879 13.3675 48.8099 0 31.4439 0C14.0779 0 0 13.3675 0 29.8572C0 46.3469 14.0779 59.7144 31.4439 59.7144Z"
//                 fill="black"
//               />
//               <path
//                 d="M24.9035 38.6486V35.7424L32.1905 24.2623H34.6961V28.285H33.2132L28.6194 35.5549V35.6912H38.9746V38.6486H24.9035ZM33.2814 41.7168V37.7623L33.3496 36.4753V24.2623H36.8098V41.7168H33.2814Z"
//                 fill="white"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Footer Note */}
        // <p className="text-center text-black/80 italic tracking-tight mt-16 lg:mt-36 text-sm md:text-base">
        //   From capture to mastery — Skill Passport ensures every skill counts.
        // </p>
//       </div>
//     </section>
//   );
// }



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
          How Skill Passport <span className="text-[#000000]">Works.</span>
        </h2>
        <p className="text-center text-gray-500 text-sm md:text-base mb-16">
           The Skill Passport integrates seamlessly with your academic systems, LMS, and training programs, ensuring effortless adoption.
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
          title="Capture Skills"
          desc="Records student academic performance, outcomes, and participation."
          img={step1 as unknown as string}
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
             title="Track Progress"
            desc="Maps technical, employability, and soft skills against institutional or industry frameworks."
            img={step2 as unknown as string}
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
            title="Showcase Achievement"
            desc="Generates a personalized, verifiable digital Skill Passport for each student — ready to share with recruiters or internship panels."
            img={step3 as unknown as string}
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
            title="Result"
            desc="Institutions gain data-driven visibility, and students gain digital proof of skill mastery."
            img={step4 as unknown as string}
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
