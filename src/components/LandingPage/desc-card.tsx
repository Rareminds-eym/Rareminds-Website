import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";

interface ChildProps {
  activePart: UserType;
  owner: UserType;
  x: number;
  y: number;
  rotate: boolean;
  content: CardDesc;
  setActivePart?: (part: UserType) => void;
  overlayActive?: (overlay: boolean) => void;
}

const DescCard = forwardRef<HTMLDivElement, ChildProps>(
  (
    { activePart, x, y, rotate, owner, content, setActivePart, overlayActive },
    ref
  ) => {
    return (
      <AnimatePresence>
        {activePart == owner && (
          <motion.div
            initial={{ opacity: 0, y: y + 50, x: x }}
            animate={{ opacity: 1, y: y }}
            exit={{ opacity: 0, y: y + 50 }}
            onMouseEnter={() => {
              overlayActive?.(true);
              setActivePart?.(owner);
            }}
            onMouseLeave={() => {
              overlayActive?.(false);
              setActivePart?.("none");
            }}
            ref={ref}
            className={`description-container absolute z-10 max-w-[400px] bg-[#000000b3] text-white p-10 rounded-xl backdrop-blur-md after:flex after:absolute after:top-[15px] after:content-[' '] after:bg-[#000000b3] after:w-[15px] after:h-[30px] after:right-[-14px] ${rotate && "after:rotate-180 after:!left-[-14px]"}`}
          >
            <h2 className="text-2xl font-semibold">{content?.heading}</h2>
            <p className="mt-3">{content?.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export default DescCard;
