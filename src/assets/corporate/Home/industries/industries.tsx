import { useState, useEffect, useId, useRef } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { recruitmentIndustries } from "@/data/recruitmentIndustries";
import IndustryRoads from "./IndustryRoads";

type ProcessSVGProps = React.SVGProps<SVGSVGElement>;

const IndutriesSVG = ({ ...props }: ProcessSVGProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(2);
  const [isHovered, setIsHovered] = useState(false);

  const [hasFocus, setHasFocus] = useState(false);
  const [isPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { amount: 0.2 });
  const titleId = useId();
  const descriptionId = useId();
  const gridId = useId();
  const gridFadeId = useId();

  const markerProps = (id: number) => ({
    role: "button",
    tabIndex: 0,
    "aria-label": recruitmentIndustries.find((industry) => industry.id === id)?.name,
    "aria-pressed": hoveredIndex === id,
    onFocus: () => setHoveredIndex(id),
    onClick: () => setHoveredIndex(id),
    onKeyDown: (event: React.KeyboardEvent<SVGRectElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setHoveredIndex(id);
      }
    },
  });

  useEffect(() => {
    if (isHovered || hasFocus || isPaused || prefersReducedMotion || !isInView) return;
    const interval = setInterval(() => {
      setHoveredIndex((current) => ((current ?? 0) % 12) + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, hasFocus, isPaused, prefersReducedMotion, isInView]);

  return (
    <>
    <svg
      {...props}
      ref={svgRef}
      role="group"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onFocus={() => setHasFocus(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHasFocus(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      width="1439"
      height="926"
      viewBox="0 0 1439 926"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title id={titleId}>Industries we serve</title>
      <desc id={descriptionId}>Focus, hover over, or select an illustration to highlight its industry name.</desc>
      <defs>
        <pattern id={gridId} width="200" height="116" patternUnits="userSpaceOnUse">
          <path d="M0 0L200 116M200 0L0 116" stroke="#e9ecef" strokeWidth="2" />
        </pattern>
        <radialGradient id={gridFadeId}>
          <stop offset="35%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" />
        </radialGradient>
      </defs>
      <g aria-hidden="true" pointerEvents="none">
        <rect width="1439" height="926" fill={`url(#${gridId})`} />
        <rect width="1439" height="926" fill={`url(#${gridFadeId})`} />
      </g>
      <IndustryRoads />
      <g clipPath="url(#clip0_2125_1011)">
        <path
          d="M1235.45 132.842L1284.29 103.158"
          stroke="#484848"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </g>
      <g clipPath="url(#clip1_2125_1011)">
        <path
          d="M798.195 164.601L845.396 196.878"
          stroke="#484848"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </g>
      <g clipPath="url(#clip2_2125_1011)">
        <path
          d="M1227.12 420.532L1275.52 450.947"
          stroke="#484848"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </g>
      <g clipPath="url(#clip3_2125_1011)">
        <path
          d="M1131.2 603.407L1179.44 634.072"
          stroke="#484848"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </g>
      <g clipPath="url(#clip4_2125_1011)">
        <path
          d="M826.532 422.159L874.463 453.32"
          stroke="#484848"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </g>
      <g clipPath="url(#clip5_2125_1011)">
        <path
          d="M389.444 166.619L436.67 198.86"
          stroke="#484848"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </g>
      <g clipPath="url(#clip6_2125_1011)">
        <path
          d="M917.148 715.864L965.948 745.615"
          stroke="#484848"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </g>
      <g clipPath="url(#clip7_2125_1011)">
        <path
          d="M620.052 541.69L667.354 573.817"
          stroke="#484848"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </g>
      <g clipPath="url(#clip8_2125_1011)">
        <path
          d="M181.925 287.677L230.501 317.801"
          stroke="#484848"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </g>
      <g clipPath="url(#clip9_2125_1011)">
        <path
          d="M612.15 781.956L661.896 810.063"
          stroke="#484848"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </g>
      <g clipPath="url(#clip10_2125_1011)">
        <path
          d="M190.94 532.499L239.297 562.98"
          stroke="#484848"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </g>
      <g clipPath="url(#clip11_2125_1011)">
        <path
          d="M80.6734 709.601L127.875 741.878"
          stroke="#484848"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </g>
      <g filter="url(#filter0_d_2125_1011)">
        <path
          d="M1293 71.1708C1294.85 70.0959 1297.13 70.1014 1298.99 71.1852L1325.07 86.4454C1328.96 88.7179 1329.09 94.3238 1325.31 96.7427L1301.58 111.937C1299.67 113.16 1297.24 113.185 1295.29 111.865L1292.61 110.293L1294.87 98.2426L1296.72 95.97L1296.63 95.0328L1291.38 91.6468L1287.14 90.0675L1292.17 87.1174L1290.75 85.3927L1292.5 84.3758L1291.17 80.9427L1289.03 79.7088L1293 71.1708Z"
          fill="white"
        />
      </g>
      <path
        d="M1272.73 90.4999L1288.54 81.2847L1299.04 87.3672L1283.23 96.5824L1279.73 94.5544L1283.95 92.0972L1280.45 90.0692L1276.23 92.5264L1272.73 90.4999ZM1293.32 85.2772L1291.21 86.5073L1294.7 88.6053L1296.84 87.3745L1293.32 85.2772ZM1285.99 97.105L1282.49 95.0168L1281.17 94.3189L1285.56 91.6468L1288.18 92.7584L1285.99 97.105ZM1297.48 99.7662L1299.12 98.8906L1301.82 100.665L1300.17 101.54L1297.48 99.7662Z"
        fill="black"
      />
      <g filter="url(#filter1_d_2125_1011)">
        <path
          d="M779.357 132.171C781.206 131.096 783.488 131.101 785.34 132.185L811.427 147.445C815.312 149.718 815.441 155.324 811.664 157.743L787.938 172.937C786.028 174.16 783.591 174.185 781.647 172.968L776.256 168.376L787.491 160.342L780.52 154.246L786.837 149.444L779.357 132.171Z"
          fill="white"
        />
      </g>
      <g clipPath="url(#clip12_2125_1011)">
        <path
          d="M796.372 156.877L794.622 155.873L784.141 161.931L786.172 163.098C786.295 163.168 786.297 163.285 786.172 163.357L784.715 164.199C784.592 164.27 784.391 164.27 784.266 164.199L762.15 152.79L764.508 150.278L796.372 156.877Z"
          fill="black"
        />
      </g>
      <g filter="url(#filter2_d_2125_1011)">
        <path
          d="M1286.07 441.171C1287.92 440.096 1290.2 440.101 1292.06 441.185L1318.14 456.445C1322.03 458.718 1322.16 464.324 1318.38 466.743L1294.66 481.937C1292.74 483.16 1290.31 483.185 1288.36 481.968L1284.14 478.75L1288.52 470.987L1288.7 469.293L1287.32 468.485L1289.65 462.08L1287.29 457.755L1286.07 441.171Z"
          fill="white"
        />
      </g>
      <g clipPath="url(#clip13_2125_1011)">
        <path
          d="M1300.07 467.963L1300.09 469.954L1297.55 471.443L1296.06 470.573L1297.97 469.451V467.963C1297.56 467.883 1297.13 467.73 1296.75 467.506C1296.41 467.307 1296.17 467.084 1296.02 466.83C1295.87 466.576 1295.8 466.246 1295.81 465.842C1295.81 465.197 1296.11 464.623 1296.71 464.119C1297.31 463.615 1298.02 463.383 1298.84 463.423C1299.42 463.45 1299.94 463.614 1300.39 463.918C1300.86 464.234 1301.16 464.611 1301.31 465.052C1301.46 465.493 1301.48 465.958 1301.37 466.447L1301.2 467.196L1300.07 467.963Z"
          fill="black"
        />
      </g>
      <rect
        x="1126.86"
        y="55.3878"
        width="149.224"
        height="149.224"
        fill="url(#pattern2_2125_1011)"
        className={`${hoveredIndex === 2 ? "grayscale-0":"grayscale"} transition-all duration-500 cursor-pointer focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-blue-600 motion-reduce:transition-none`}
        {...markerProps(2)}
        onMouseEnter={() => setHoveredIndex(2)}
      />
      <g data-industry-label="2" aria-hidden="true" pointerEvents="none" className="transition-opacity duration-300 motion-reduce:transition-none" opacity={hoveredIndex === 2 ? 1 : 0}>
        <path
          d="M1341 3.75582V41.8079C1341 43.8835 1339.31 45.5653 1337.22 45.5653H1202.87L1176.14 63.6583C1174.84 64.5397 1173.07 63.6138 1173.07 62.048V45.5653H1158.78C1156.69 45.5653 1155 43.8835 1155 41.8079V3.75582C1155 1.68018 1156.69 0 1158.78 0H1337.22C1339.31 0 1341 1.68018 1341 3.75582Z"
          fill="black"
        />
      </g>
      <g data-industry-label="1" aria-hidden="true" pointerEvents="none" className="transition-opacity duration-300 motion-reduce:transition-none" opacity={hoveredIndex === 1 ? 1 : 0}>
        <path
          d="M1027 89.7558V127.808C1027 129.883 1025.31 131.565 1023.22 131.565H888.871L862.138 149.658C860.836 150.54 859.072 149.614 859.072 148.048V131.565H844.782C842.694 131.565 841 129.883 841 127.808V89.7558C841 87.6802 842.694 86 844.782 86H1023.22C1025.31 86 1027 87.6802 1027 89.7558Z"
          fill="black"
        />
      </g>
      <rect
        x="808.186"
        y="134.388"
        width="149.224"
        height="149.224"
        fill="url(#pattern3_2125_1011)"
        className={`${hoveredIndex === 1 ? "grayscale-0":"grayscale"} transition-all duration-500 cursor-pointer focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-blue-600 motion-reduce:transition-none`}
        {...markerProps(1)}
        onMouseEnter={() => setHoveredIndex(1)}
      />
      <g data-industry-label="5" aria-hidden="true" pointerEvents="none" className="transition-opacity duration-300 motion-reduce:transition-none" opacity={hoveredIndex === 5 ? 1 : 0}>
        <path
          d="M1353 273.756V311.808C1353 313.883 1351.31 315.565 1349.22 315.565H1214.87L1188.14 333.658C1186.84 334.54 1185.07 333.614 1185.07 332.048V315.565H1170.78C1168.69 315.565 1167 313.883 1167 311.808V273.756C1167 271.68 1168.69 270 1170.78 270H1349.22C1351.31 270 1353 271.68 1353 273.756Z"
          fill="black"
        />
      </g>
      <rect
        x="1117.96"
        y="318.388"
        width="149.224"
        height="149.224"
        fill="url(#pattern4_2125_1011)"
        className={`${hoveredIndex === 5 ? "grayscale-0":"grayscale"} transition-all duration-500 cursor-pointer focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-blue-600 motion-reduce:transition-none`}
        {...markerProps(5)}
        onMouseEnter={() => setHoveredIndex(5)}
      />
    </svg>
    </>
  );
};

export default IndutriesSVG;
