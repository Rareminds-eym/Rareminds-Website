interface ConnectingSvg3Props {
  className?: string;
}

export const ConnectingSvg3 = ({ className = "absolute top-0 left-0 w-full h-full" }: ConnectingSvg3Props) => (
  <svg
    viewBox="0 0 766 520"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
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
      d="M25 10.2507C50.3504 -1.0443 88.0268 -5.3909 127.771 45.3601C193.142 128.833 205.744 304.778 266.905 362.936C316.631 410.198 362.58 385.22 392.986 357.886C500.804 91.7033 627.611 79.8267 693.68 279.647C700.519 300.339 708.047 325.929 715.29 358.957C723.323 395.627 728.562 430.247 732 457" 
      stroke="black" 
      strokeWidth="5" 
      strokeMiterlimit="10" 
      strokeDasharray="12 12" 
    />
    <path 
      d="M732.444 511.714C749.81 511.714 763.888 498.347 763.888 481.857C763.888 465.368 749.81 452 732.444 452C715.078 452 701 465.368 701 481.857C701 498.347 715.078 511.714 732.444 511.714Z" 
      fill="black" 
    />
    <path 
      d="M725.904 490.649V487.742L733.19 476.262H735.696V480.285H734.213L729.619 487.555V487.691H739.975V490.649H725.904ZM734.281 493.717V489.762L734.35 488.475V476.262H737.81V493.717H734.281Z" 
      fill="white" 
    />
  </svg>
);