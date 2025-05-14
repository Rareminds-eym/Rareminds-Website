import { useRef } from "react";
import DescCard from "./desc-card";
import clsx from "clsx";

interface ChildProps {
  onAction: (msg: string) => void;
  setActivePart: (part: UserType) => void;
  overlayActive: (overlay: boolean) => void;
  partHover: boolean;
  activePart: UserType;
  content: CardDesc;
}

const Corporate: React.FC<ChildProps> = ({
  onAction,
  overlayActive,
  partHover,
  setActivePart,
  activePart,
  content,
}) => {
  const corporateRef = useRef<HTMLDivElement | null>(null);
  const part: UserType = "corporate";
  return (
    <>
      <div
        className={clsx(
          "brain-part clipped-corporate translate-x-[56%] -translate-y-[28%] absolute transition-all duration-300",
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
          if (corporateRef.current?.contains(event.relatedTarget as Node)) {
            return;
          }
          overlayActive(false);
          setActivePart("none");
        }}
      >
        <img src='/LandingPage/Brain/1-crop.jpg' alt="Corporate" className="clipped-image" />
        <div
          className={`absolute w-full h-full -translate-y-[100%] transition-all duration-300 ${partHover ? "" : ""} hover:!bg-transparent`}
        ></div>
        <svg width="0" height="0">
          <clipPath id="corporate" clipPathUnits="userSpaceOnUse">
            <path d="M139.426.27c-23.82 2.44-33.024 3.886-46.953 7.59-22.36 5.874-49.106 17.98-67.422 30.718C15.676 45.082.543 57.281.543 58.453c0 .274 2.836 1.445 6.277 2.621 11.094 3.797 25.711 10.028 39.989 17.348 44.8 22.676 79.89 51.95 106.89 89.082 7.227 9.848 12.04 10.934 28.293 6.324 18.832-5.242 50.223-6.957 71.723-3.793 50.394 7.317 87.973 34.781 111.535 81.403 4.3 8.492 6.105 10.75 10.578 13.187 2.578 1.355 4.215 1.629 7.309 1.176 5.418-.723 19.351-1.266 53.406-2.078 27.687-.723 28.98-.813 32.934-2.801 3.957-1.988 6.625-5.512 6.625-8.672 0-5.422 10.746-18.07 19.347-22.77 11.953-6.593 21.07-8.312 45.149-8.761 14.703-.18 18.746-.633 24.507-2.168 21.93-6.235 36.805-21.051 41.364-41.38 1.636-7.32 1.203-23.94-.946-34.241-5.418-26.653-19.175-50.235-39.558-68.121-27.176-23.672-64.84-39.301-114.805-47.434-39.3-6.504-100.87-7.41-144.129-2.168l-16.426 1.988-9.718-3.886c-24.594-9.575-57.188-17.707-86.426-21.32C183.887.632 146.906-.544 139.426.268m0 0" />
          </clipPath>
        </svg>
      </div>
      <DescCard
        ref={corporateRef}
        activePart={activePart}
        x={800}
        y={0}
        rotate={true}
        owner={part}
        setActivePart={setActivePart}
        overlayActive={overlayActive}
        content={content}
      />
    </>
  );
};

export default Corporate;
