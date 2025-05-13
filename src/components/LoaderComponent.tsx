import { Icon } from "@iconify/react";

const LoaderComponent = () => {
  return (
    <>
      <div className="grid w-full min-h-screen place-items-center">
        <div className="grid gap-6 text-white place-items-center">
          <Icon icon="svg-spinners:bars-rotate-fade" className="text-4xl" />
          <img src='/RareMinds.png' width={300} height={300} alt="Rareminds" />
        </div>
      </div>
    </>
  );
};

export default LoaderComponent;
