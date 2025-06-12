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

const School: React.FC<ChildProps> = ({
  onAction,
  overlayActive,
  partHover,
  setActivePart,
  activePart,
  content,
}) => {
  const schoolRef = useRef<HTMLDivElement | null>(null);
  const part: UserType = "school";
  return (
    <>
      <div
        // className={`brain-part  absolute hover:scale-[1.1] transition-all duration-300 translate-x-[328%] translate-y-[28%] hover:cursor-pointer hover:z-[1] ${partHover ? " grayscale blur-sm" : ""} hover:grayscale-0 hover:blur-none`}
        className={clsx(
          "brain-part clipped-school translate-x-[328%] translate-y-[28%] absolute transition-all duration-300",
          activePart === part &&
            "grayscale-0 blur-none scale-[1.1] cursor-pointer z-[1]",
          activePart !== part && partHover && "grayscale blur-sm"
        )}
        onClick={() => onAction(part)}
        onMouseEnter={() => {
          overlayActive(true);
          setActivePart(part);
        }}
        onMouseLeave={(event: React.MouseEvent<HTMLDivElement>) => {
          if (schoolRef.current?.contains(event.relatedTarget as Node)) {
            return;
          }
          overlayActive(false);
          setActivePart("none");
        }}
      >
        <img
          src='/LandingPage/Brain/5-crop.png'
          alt="School"
          className="clipped-image"
          style={{ objectPosition: "left" }}
        />
        <div
          className={`absolute w-full h-full -translate-y-[100%] transition-all duration-300 ${partHover ? "" : ""} hover:!bg-transparent`}
        ></div>
        <svg width="0" height="0">
          <clipPath id="school" clipPathUnits="userSpaceOnUse">
            <path d="M122.027 1.492c-.257 1.082-.515 3.16-.515 4.516 0 4.605-2.668 16.351-5.246 23.215-11.012 28.816-35.614 47.879-73.032 56.457C17.86 91.555.227 100.766.227 108.266c0 1.171 1.03 3.34 2.238 4.879 2.406 2.98 12.129 8.308 18.406 10.027 2.067.629 7.399 2.89 11.871 4.965 35.867 17.707 62.363 49.054 74.922 88.8 3.18 10.118 6.106 24.66 6.106 30.622.085 5.87 2.668 11.746 5.59 12.558 1.206.27 5.335.09 9.206-.543 19.094-3.16 49.114 2.711 75.09 14.633 10.067 4.61 14.453 7.316 20.043 12.285 13.504 11.926 18.32 10.117 24.086-8.851 23.309-76.786 15.223-143.09-24.086-198.555C220.344 74.3 211.484 64 204.172 56.234c-19.781-20.777-38.621-34.87-63.91-48.148-6.88-3.613-13.762-7.047-15.137-7.59-2.324-.812-2.668-.723-3.098.996m0 0" />
          </clipPath>
        </svg>
      </div>
      <DescCard
        ref={schoolRef}
        activePart={activePart}
        x={500}
        y={160}
        rotate={false}
        owner={part}
        setActivePart={setActivePart}
        overlayActive={overlayActive}
        content={content}
      />
    </>
  );
};

export default School;
