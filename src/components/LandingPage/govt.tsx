import clsx from "clsx";
import "@/assets/LandingPage/css/landing.css";
import DescCard from "./desc-card";
import { useRef } from "react";

interface ChildProps {
  onAction?: (msg: string) => void;
  setActivePart?: (part: UserType) => void;
  overlayActive?: (overlay: boolean) => void;
  partHover: boolean;
  activePart: UserType;
  content: CardDesc;
}

const Govt: React.FC<ChildProps> = ({
  onAction,
  overlayActive,
  partHover,
  activePart,
  setActivePart,
  content,
}) => {
  const govtRef = useRef<HTMLDivElement | null>(null);
  const part: UserType = "school";
  return (
    <>
      <div
        className={clsx(
          "clipped-govt transition-all duration-300",
          activePart === part &&
            "grayscale-0 blur-none scale-[1.1] cursor-pointer",
          activePart !== part && partHover && "grayscale blur-sm"
        )}
        onClick={() => onAction?.(part)}
        onMouseEnter={() => {
          overlayActive?.(true);
          setActivePart?.(part);
        }}
        onMouseLeave={(event: React.MouseEvent<HTMLDivElement>) => {
          if (govtRef.current?.contains(event.relatedTarget as Node)) {
            return;
          }
          overlayActive?.(false);
          setActivePart?.("none");
        }}
      >
        <img src='/LandingPage/Brain/5-crop.webp' className="clipped-image" />
        <div className="absolute w-full h-full -translate-y-[100%] transition-all duration-300 hover:!bg-transparent"></div>
        <svg width="0" height="0">
          <clipPath id="govt" clipPathUnits="userSpaceOnUse">
            <path d="M290.438.383c-63.286 4.707-113.43 25.16-153.458 62.543-22.218 20.816-42.277 50.867-52.824 79.289l-3.199 8.777-8.648 4.528C33.668 176.066 7.73 211.184 1.074 252.094c-.691 4.707-1.21 8.691-1.039 8.87.176.18 3.29-.722 6.828-1.901 15.305-5.34 36.227-9.774 60.09-12.762 18.758-2.352 79.106-2.352 94.063 0 41.324 6.52 78.414 25.797 112.738 58.742 14.437 13.848 30.777 33.492 40.894 49.148l4.32 6.7 6.747-5.07c26.71-20.094 59.824-34.938 94.406-42.176 32.77-6.973 74.613-7.153 105.39-.543 8.13 1.718 8.216 1.718 19.02-.094 50.317-8.598 88.098-25.793 111.79-50.957 13.574-14.39 22.995-34.305 24.55-51.41 1.211-14.48-5.879-37.293-16.512-52.86-4.234-6.246-14.613-16.926-20.316-21-10.461-7.422-26.805-14.027-42.45-17.195-6.573-1.36-12.277-1.629-30.175-1.54-26.54.09-31.469.907-48.156 7.966-6.57 2.715-15.387 5.703-19.625 6.515-6.742 1.45-8.04 1.45-11.153.274-2.941-.996-3.976-2.172-6.05-6.246-4.149-8.235-18.329-30.051-25.852-40.008-9.25-12.125-25.676-29.777-36.742-39.371-26.63-22.989-55.852-37.832-88.098-44.711-8.476-1.813-33.46-2.899-45.305-2.082m0 0" />
          </clipPath>
        </svg>
      </div>
      <DescCard
        ref={govtRef}
        activePart={activePart}
        x={600}
        y={200}
        rotate={true}
        owner={part}
        setActivePart={setActivePart}
        overlayActive={overlayActive}
        content={content}
      />
    </>
  );
};
export default Govt;
