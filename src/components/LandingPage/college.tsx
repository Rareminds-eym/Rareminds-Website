import clsx from "clsx";
import DescCard from "./desc-card";
import { useRef } from "react";

interface ChildProps {
  onAction: (msg: string) => void;
  setActivePart: (part: UserType) => void;
  overlayActive: (overlay: boolean) => void;
  partHover: boolean;
  activePart: UserType;
  content: CardDesc;
}

const College: React.FC<ChildProps> = ({
  onAction,
  overlayActive,
  partHover,
  activePart,
  setActivePart,
  content,
}) => {
  const collegeRef = useRef<HTMLDivElement | null>(null);
  const part: UserType = "college";
  return (
    <>
      <div
        className={clsx(
          "clipped-college absolute transition-all duration-300 translate-x-[40%] translate-y-[43%]",
          activePart === part &&
            "grayscale-0 blur-none scale-[1.1] cursor-pointer z-[1]",
          activePart !== part && partHover && "grayscale blur-sm"
        )}
        onClick={() => onAction("institutions")}
        onMouseEnter={() => {
          overlayActive(true);
          setActivePart(part);
        }}
        onMouseLeave={(event: React.MouseEvent<HTMLDivElement>) => {
          if (collegeRef.current?.contains(event.relatedTarget as Node)) {
            return;
          }
          overlayActive(false);
          setActivePart("none");
        }}
      >
        <img src='/LandingPage/Brain/4-crop.png' alt="College" className="clipped-image" />
        <div
          className={`absolute w-full h-full -translate-y-[100%] transition-all duration-300 ${partHover ? "" : ""} hover:!bg-transparent`}
        ></div>
        <svg width="0" height="0">
          <clipPath id="college" clipPathUnits="userSpaceOnUse">
            <path d="M445.621.55c-9.46.993-25.719 3.243-33.117 4.595-16.606 3.156-26.238 12.347-26.238 25.238 0 15.86-24.95 46.863-51.618 63.898-23.312 14.871-52.218 24.785-87.402 29.922-12.476 1.8-17.55 1.984-56.262 2.164-51.875.18-66.414 1.531-93.77 8.742C39.489 150.43 6.54 184.227.778 233.887c-.945 8.203-.859 9.281.774 15.05 1.031 3.426 3.527 10.004 5.68 14.512 29.593 63.719 104.953 93.008 205.343 79.942 9.723-1.262 10.41-1.442 15.574-5.227 10.922-7.934 21.59-11.898 30.282-11.176 6.449.54 9.89 2.344 15.656 7.93 3.871 3.875 5.074 4.508 12.043 6.129 13.422 3.336 20.215 4.144 34.754 4.144 18.41 0 30.539-2.343 45.078-8.652 9.98-4.324 14.625-1.98 15.914 7.934 2.324 16.941 20.39 53.265 37.164 74.894 27.102 34.7 63.918 58.672 105.04 68.227 19.097 4.414 28.734 5.406 52.304 5.406 27.012 0 43.36-1.8 45.855-4.957 3.696-4.777.344-9.645-8.691-12.977-11.785-4.328-21.332-10.277-29.852-18.566-16.945-16.586-20.472-36.594-10.234-57.863 4.73-9.735 12.816-15.59 23.312-16.852 6.364-.812 21.59-6.039 41.38-14.332 59.702-24.965 102.37-54.433 126.113-87.242 10.668-14.781 18.582-42.899 17.464-61.914-1.718-28.39-16.515-44.977-50.582-56.692-41.554-14.328-79.664-10.726-108.91 10.364-9.293 6.672-21.851 20.097-24.949 26.59-2.238 4.867-2.41 5.945-2.41 16.492.086 9.012.43 12.797 2.066 18.746 2.235 8.203 2.063 12.437-.687 18.113-2.84 5.77-8.348 6.942-16.692 3.695-6.71-2.613-10.582-6.578-12.73-12.976-5.422-16.492-3.613-39.113 5.332-64.89 3.184-9.282 8.602-16.583 18.496-24.966 12.387-10.546 20.215-14.242 32.262-15.14 6.62-.543 8.773-1.082 11.011-2.793 3.356-2.434 6.02-8.113 6.106-12.621 0-8.29-6.277-23.52-16.344-39.653-28.047-44.613-70.457-72.191-123.879-80.664C488.98.188 457.238-.62 445.621.551m0 0" />
          </clipPath>
        </svg>
      </div>
      <DescCard
        ref={collegeRef}
        activePart={activePart}
        x={900}
        y={250}
        rotate={true}
        owner={part}
        setActivePart={setActivePart}
        overlayActive={overlayActive}
        content={content}
      />
    </>
  );
};

export default College;
