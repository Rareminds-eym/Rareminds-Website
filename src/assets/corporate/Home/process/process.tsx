import { useState } from "react";

interface ProcessSVGProps extends React.SVGProps<SVGSVGElement> {
  onHoverPart?: (id: string) => void;
  onLeavePart?: () => void;
}

const ProcessSVG = ({
  onHoverPart,
  onLeavePart,
  ...props
}: ProcessSVGProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cloudX, setCloudX] = useState(0);
  const [cloudY, setCloudY] = useState(0);
  const cloudContent = [
    "We start by listening. Our team collaborates with your hiring managers to understand your business goals, role expectations, team dynamics, and success metrics.",
    "We conduct real-time talent market analysis to benchmark roles, identify top talent pools, and refine the ideal candidate profile.",
    "Leveraging AI tools, niche networks, and our deep recruiter expertise, we source the best candidates and rigorously screen them for technical, cultural, and behavioral fit.",
    "We streamline the interview process — from scheduling to prep support — ensuring a smooth experience for both candidates and your internal teams.",
    "We guide you through the offer stage with market-aligned salary insights, candidate expectation alignment, and closing strategies that reduce drop-offs.",
    "Our process doesn’t end at hiring. We stay engaged with clients and candidates during onboarding to ensure satisfaction, retention, and long-term success.",
  ];
  return (
    <svg
      {...props}
      width="1134"
      height="461"
      viewBox="0 0 1134 461"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect
        x="349.824"
        y="157.155"
        width="186.356"
        height="33.7839"
        fill="url(#pattern0_2088_1007)"
      />
      <rect
        x="665.047"
        y="158.341"
        width="132.234"
        height="61.7813"
        fill="url(#pattern1_2088_1007)"
      />
      <rect
        x="605.512"
        y="238.739"
        width="181.953"
        height="174.807"
        fill="url(#pattern2_2088_1007)"
      />
      <rect
        x="443.5"
        y="407.988"
        width="173.981"
        height="46.0697"
        fill="url(#pattern3_2088_1007)"
      />
      <rect
        x="99.6797"
        y="80.7834"
        width="165.339"
        height="69.1613"
        fill="url(#pattern4_2088_1007)"
      />
      <rect
        width="241"
        height="141"
        fill="url(#pattern5_2088_1007)"
        className={`transition-all ${[
          hoveredIndex == 0 && "scale-110 cursor-pointer",
        ]}`}
        onMouseEnter={() => {setHoveredIndex(0); setCloudX(0); setCloudY(120)}}
        onMouseLeave={() => setHoveredIndex(null)}
      />
      <rect
        x="797"
        y="155"
        width="337"
        height="114"
        fill="url(#pattern6_2088_1007)"
        className={`transition-all ${[
          hoveredIndex == 3 && "scale-105 -translate-x-[55px] cursor-pointer",
        ]}`}
        onMouseEnter={() => {setHoveredIndex(3); setCloudX(270); setCloudY(100)}}
        onMouseLeave={() => setHoveredIndex(null)}
      />
      <rect
        x="533"
        y="79"
        width="324"
        height="134"
        fill="url(#pattern7_2088_1007)"
        className={`transition-all ${[
          hoveredIndex == 2 &&
            "scale-110 -translate-x-14 -translate-y-5 cursor-pointer",
        ]}`}
        onMouseEnter={() => {setHoveredIndex(2); setCloudX(400); setCloudY(220)}}
        onMouseLeave={() => setHoveredIndex(null)}
      />
      <rect
        x="270"
        y="54"
        width="220"
        height="119"
        fill="url(#pattern8_2088_1007)"
        className={`transition-all ${[
          hoveredIndex == 1 &&
            "scale-110 -translate-x-8 -translate-y-4 cursor-pointer",
        ]}`}
        onMouseEnter={() => {setHoveredIndex(1); setCloudX(200); setCloudY(170)}}
        onMouseLeave={() => setHoveredIndex(null)}
      />
      <rect
        x="648"
        y="317"
        width="391"
        height="144"
        fill="url(#pattern9_2088_1007)"
        className={`transition-all ${[
          hoveredIndex == 4 &&
            "scale-110 -translate-x-[70px] -translate-y-12 cursor-pointer",
        ]}`}
        onMouseEnter={() => {setHoveredIndex(4); setCloudX(500); setCloudY(30)}}
        onMouseLeave={() => setHoveredIndex(null)}
      />
      <rect
        x="102"
        y="295"
        width="333"
        height="147"
        fill="url(#pattern10_2088_1007)"
        className={`transition-all ${[
          hoveredIndex == 5 &&
            "scale-110 -translate-x-[40px] -translate-y-[40px] cursor-pointer",
        ]}`}
        onMouseEnter={() => {setHoveredIndex(5); setCloudX(50); setCloudY(15)}}
        onMouseLeave={() => setHoveredIndex(null)}
      />
      <rect
        x="637.926"
        y="194.102"
        width="109.351"
        height="49.1068"
        fill="url(#pattern11_2088_1007)"
      />
      <rect
        x="464.455"
        y="368.775"
        width="108.007"
        height="58.3484"
        fill="url(#pattern12_2088_1007)"
      />
      <rect
        x="83.8477"
        y="118.499"
        width="136.945"
        height="56.7145"
        fill="url(#pattern13_2088_1007)"
      />
      <rect
        x="403.494"
        y="119.786"
        width="103.826"
        height="42.9986"
        fill="url(#pattern14_2088_1007)"
      />
      {hoveredIndex !== null && (
        <g filter="url(#filter0_d_1445_292)" className="relative">
          <rect
            x={cloudX}
            y={cloudY}
            width="500"
            height="270"
            fill="url(#pattern0_1445_292)"
            shapeRendering="crispEdges"
          />
          <foreignObject
            x={cloudX}
            y={cloudY + 85}
            width={500}
            height={100}
          >
            <div
              style={{
                maxWidth: "400px",
                margin: "0 auto",
                textAlign: "center",
                fontSize: "16px",
                color: "#222",
                fontWeight: "normal",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                overflow: "hidden",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {cloudContent[hoveredIndex ?? 0]}
            </div>
          </foreignObject>
        </g>
      )}
      <defs>
        <filter
          id="filter0_d_1445_292"
          x={cloudX}
          y={cloudY}
          width="500"
          height="270"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1445_292"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1445_292"
            result="shape"
          />
        </filter>
        <pattern
          id="pattern0_1445_292"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_1445_292"
            transform="scale(0.002 0.0037037)"
          />
        </pattern>
        <image
          id="image0_1445_292"
          width="500"
          height="270"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_0.webp" href="/Corporate/Images/Recruitment/process/process_0.webp"
        />
        <pattern
          id="pattern0_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_2088_1007"
            transform="scale(0.00292398 0.016129)"
          />
        </pattern>
        <pattern
          id="pattern1_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image1_2088_1007"
            transform="scale(0.00409836 0.00877193)"
          />
        </pattern>
        <pattern
          id="pattern2_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image2_2088_1007"
            transform="scale(0.00302115 0.00314465)"
          />
        </pattern>
        <pattern
          id="pattern3_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image3_2088_1007"
            transform="scale(0.00311526 0.0117647)"
          />
        </pattern>
        <pattern
          id="pattern4_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image4_2088_1007"
            transform="scale(0.00326797 0.0078125)"
          />
        </pattern>
        <pattern
          id="pattern5_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image5_2088_1007"
            transform="scale(0.00274725 0.00469566)"
          />
        </pattern>
        <pattern
          id="pattern6_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image6_2088_1007"
            transform="matrix(0.00200803 0 0 0.00593602 0 -0.0015941)"
          />
        </pattern>
        <pattern
          id="pattern7_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image7_2088_1007"
            transform="matrix(0.00209205 0 0 0.00505839 0 -0.000780616)"
          />
        </pattern>
        <pattern
          id="pattern8_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image8_2088_1007"
            transform="matrix(0.00306748 0 0 0.00567098 0 -0.00188173)"
          />
        </pattern>
        <pattern
          id="pattern9_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image9_2088_1007"
            transform="matrix(0.00172712 0 0 0.0046896 0 -0.00178709)"
          />
        </pattern>
        <pattern
          id="pattern10_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image10_2088_1007"
            transform="matrix(0.00203429 0 0 0.00460829 -0.00145307 0)"
          />
        </pattern>
        <pattern
          id="pattern11_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image11_2088_1007"
            transform="scale(0.00462963 0.0103093)"
          />
        </pattern>
        <pattern
          id="pattern12_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image12_2088_1007"
            transform="scale(0.00574713 0.0106383)"
          />
        </pattern>
        <pattern
          id="pattern13_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image13_2088_1007"
            transform="scale(0.00505051 0.0121951)"
          />
        </pattern>
        <pattern
          id="pattern14_2088_1007"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image13_2088_1007"
            transform="scale(0.00505051 0.0121951)"
          />
        </pattern>
        <image
          id="image0_2088_1007"
          width="342"
          height="62"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_1.webp" href="/Corporate/Images/Recruitment/process/process_1.webp"
        />
        <image
          id="image1_2088_1007"
          width="244"
          height="114"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_2.webp" href="/Corporate/Images/Recruitment/process/process_2.webp"
        />
        <image
          id="image2_2088_1007"
          width="331"
          height="318"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_3.webp" href="/Corporate/Images/Recruitment/process/process_3.webp"
        />
        <image
          id="image3_2088_1007"
          width="321"
          height="85"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_4.webp" href="/Corporate/Images/Recruitment/process/process_4.webp"
        />
        <image
          id="image4_2088_1007"
          width="306"
          height="128"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_5.webp" href="/Corporate/Images/Recruitment/process/process_5.webp"
        />
        <image
          id="image5_2088_1007"
          width="364"
          height="213"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_6.webp" href="/Corporate/Images/Recruitment/process/process_6.webp"
        />
        <image
          id="image6_2088_1007"
          width="498"
          height="169"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_7.webp" href="/Corporate/Images/Recruitment/process/process_7.webp"
        />
        <image
          id="image7_2088_1007"
          width="478"
          height="198"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_8.webp" href="/Corporate/Images/Recruitment/process/process_8.webp"
        />
        <image
          id="image8_2088_1007"
          width="326"
          height="177"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_9.webp" href="/Corporate/Images/Recruitment/process/process_9.webp"
        />
        <image
          id="image9_2088_1007"
          width="579"
          height="214"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_10.webp" href="/Corporate/Images/Recruitment/process/process_10.webp"
        />
        <image
          id="image10_2088_1007"
          width="493"
          height="217"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_11.webp" href="/Corporate/Images/Recruitment/process/process_11.webp"
        />
        <image
          id="image11_2088_1007"
          width="216"
          height="97"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_12.webp" href="/Corporate/Images/Recruitment/process/process_12.webp"
        />
        <image
          id="image12_2088_1007"
          width="174"
          height="94"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_13.webp" href="/Corporate/Images/Recruitment/process/process_13.webp"
        />
        <image
          id="image13_2088_1007"
          width="198"
          height="82"
          preserveAspectRatio="none"
          xlinkHref="/Corporate/Images/Recruitment/process/process_14.webp" href="/Corporate/Images/Recruitment/process/process_14.webp"
        />
      </defs>
    </svg>
  );
};

export default ProcessSVG;
