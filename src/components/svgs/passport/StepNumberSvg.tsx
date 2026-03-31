interface StepNumberSvgProps {
  className?: string;
}

export const StepNumberSvg = ({ className = "w-10 h-10 lg:w-12 lg:h-12" }: StepNumberSvgProps) => (
  <svg
    width="63"
    height="60"
    viewBox="0 0 63 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M31.4439 59.7144C48.8099 59.7144 62.8879 46.3469 62.8879 29.8572C62.8879 13.3675 48.8099 0 31.4439 0C14.0779 0 0 13.3675 0 29.8572C0 46.3469 14.0779 59.7144 31.4439 59.7144Z" fill="black" />
    <path d="M34.1951 24.5455V42H30.5047V28.0483H30.4025L26.4053 30.554V27.2812L30.7263 24.5455H34.1951Z" fill="white" />
  </svg>
);