
// // import React from 'react';

// // interface MainLayoutProps {
// //   children: React.ReactNode;
// // }

// // const MainLayout = ({ children }: MainLayoutProps) => {
// //   return (
// //     <div className="flex min-h-screen w-full">
// //       {/* Left sticky sidebar (5%) */}
// //       {/* <div className="w-[10%] fixed left-0 top-0 h-screen bg-gray-100">
// //         <div className="p-4">
// //           <p className="writing-vertical-lr transform rotate-180 text-gray-600">Left Sidebar</p>
// //         </div>
// //       </div> */}
// //       <div className="w-[10%] fixed left-0 top-0 h-screen bg-gray-100">
// //   <div className="p-4 flex flex-col items-center justify-center h-full">
// //     {/* Add PNG image */}
// //     <img src="/images/academy/Artboard 1-8.png" alt="Sidebar Icon" className="mb-4 w-full max-h-screen " />

// //     {/* Optional text below image */}
// //     {/* <p className="writing-vertical-lr transform rotate-180 text-gray-600">Left Sidebar</p> */}
// //   </div>
// // </div>


// //       {/* Main content area (90%) */}
// //       <div className="w-[80%] mx-auto">
// //         <div className="min-h-screen">
// //           {children}
// //         </div>
// //       </div>

// //       {/* Right sticky sidebar (5%) */}
// //       {/* <div className="w-[10%] fixed right-0 top-0 h-screen bg-gray-100">
// //         <div className="p-4">
// //         <img src="/images/academy/right.png" alt="Sidebar Icon" className="mb-4 w-full max-h-screen " />

// //           <p className="writing-vertical-lr text-gray-600">Right Sidebar</p>
// //         </div>
// //       </div> */}
// //       <div className="w-[10%] fixed right-0 top-0 h-screen bg-gray-100">
// //   <div className="p-4 flex flex-col items-center justify-center h-full">
// //     <img src="/images/academy/Artboard 2-8.png" alt="Right Sidebar Icon" className="mb-4 w-full max-h-screen" />
// //     {/* <p className="writing-vertical-lr text-gray-600">Right Sidebar</p> */}
// //   </div>
// // </div>

// //     </div>
// //   );
// // };

//   // export default MainLayout;
//   import React from 'react';

//   interface MainLayoutProps {
//     children: React.ReactNode;
//   }

//   const MainLayout = ({ children }: MainLayoutProps) => {
//     return (
//       <div className="w-full min-h-screen flex flex-col">


//         {/* Content Area: Sidebars + Main */}
//         <div className="flex flex-1 w-full">
//           {/* Left Sticky Sidebar */}
//           <div className="w-[10%] sticky top-20 h-[calc(100vh-5rem)]  self-start">
//             <div className=" flex flex-col items-center justify-center h-full">
//               <img 
//                 src="/images/academy/Artboard 1-8.png" 
//                 alt="Left Sidebar Icon" 
//                 className="w-full h-full object-cover" 
//               />
//             </div>
//           </div>

//           {/* Main Content */}

//           <div className="w-[80%] px-0 md:px-6 pl-0 pr-0 md:pr-3 py-0 md:py-3 flex flex-col ">
//             <main className="flex-1">
//               {children}
//             </main>

//           </div>


//           {/* Right Sticky Sidebar */}
//           <div className="w-[10%] sticky top-20 h-[calc(100vh-5rem)]  self-start">
//             <div className=" flex flex-col items-center justify-center h-full">
//               <img 
//                 src="/images/academy/Artboard 2-8.png" 
//                 alt="Right Sidebar Icon" 
//                 className="w-full h-full object-cover" 
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   export default MainLayout;


import { motion } from 'framer-motion';
import { FileText, Phone } from 'lucide-react';
import React from 'react';
import { useNavigate } from "react-router-dom";


interface MainLayoutProps {
  children: React.ReactNode;
}


const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex flex-col">


      {/* Content Area: Sidebars + Main */}
      {/* <div className="flex flex-1 w-full"> */}
      {/* Left Sticky Sidebar */}
      {/* <div className="w-[10%] sticky top-20 h-[calc(100vh-5rem)]  self-start">
            <div className=" flex flex-col items-center justify-center h-full">
              <img 
                src="/images/academy/Artboard 1-8.png" 
                alt="Left Sidebar Icon" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div> */}

      {/* Main Content */}
      {/*       
          <div className="w-[80%] px-0 md:px-6 pl-0 pr-0 md:pr-3 py-0 md:py-3 flex flex-col ">
            <main className="flex-1">
              {children}
            </main>

          </div> */}


      {/* Right Sticky Sidebar */}
      {/* <div className="w-[10%] sticky top-20 h-[calc(100vh-5rem)]  self-start">
            <div className=" flex flex-col items-center justify-center h-full">
              <img 
                src="/images/academy/Artboard 2-8.png" 
                alt="Right Sidebar Icon" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div> */}
      {/* </div> */}



      <div className="min-h-screen w-full bg-white mt-16">
        {/* Main container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">

          {/* Top section with image */}
          <div className='w-full h-auto md:h-[400px] bg-black rounded-md flex justify-center items-center' >
            <div className="w-[99%] h-[98%] flex flex-col md:flex-row  overflow-hidden rounded-md shadow-xl bg-white ">

              <div className='w-full md:w-1/2 h-full  flex items-center justify-center'>
                <img
                  src="/academy/herobanner/Rectangle 1.png" // replace with your PNG path
                  alt="Descriptive Alt"
                  className="h-full w-full object-contain" // or object-cover depending on fit style
                />
              </div>


              <div className='w-full md:w-1/2 h-full  flex items-center justify-center'>
                <img
                  src="/academy/herobanner/Rectangle 2.png" // replace with actual path
                  alt="Right Content"
                  className="w-full h-full object-contain"
                />
              </div>


            </div>
          </div>

          {/* Bottom section - two columns */}
          <div className=" relative w-full h-[400px] md:h-[500px] grid grid-cols-2 gap-1  bg-center object-contain  ">
            <div className="absolute inset-0 bg-[url('/academy/component-1.svg')] bg-cover bg-center opacity-70 z-0"></div>
            {/* Left column */}
            {/* Left column with centered image */}
            <div
            // className={cn(
            //   "relative rounded-2xl bg-white p-8 shadow-md transition-all duration-300",
            //   "hover:shadow-lg hover:-translate-y-1"
            // )}
            >
              <div className="flex flex-col items-center justify-center  h-full absolute -top-[10%] right-[55%]">

                <div className="w-48 h-48 md:w-96 md:h-96 rounded-full flex cursor-pointer items-center justify-center overflow-hidden group" onClick={() => navigate("/academia/school")}>
                  <img
                    src="/academy/school.png"
                    alt="Technology"
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>


              </div>
            </div>

            {/* Right column with centered icon */}
            <div
            // className={cn(
            //   "relative rounded-2xl bg-white p-8 shadow-md transition-all duration-300",
            //   "hover:shadow-lg hover:-translate-y-1"
            // )}
            >
              <div className="flex flex-col items-center justify-center  h-full absolute  -top-[10%] left-[55%]">

                <div className="w-48 h-48 md:w-96 md:h-96 rounded-full cursor-pointer flex items-center justify-center overflow-hidden group" onClick={() => navigate("/academia/student")}>
                  <img
                    src="/academy/student.png"
                    alt="Technology"
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 py-3 px-4 sm:px-8 z-50 shadow-lg"
      >
        <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-[#222B33] text-white px-4 py-2 rounded-full text-base sm:text-sm w-full sm:w-auto"
            href="tel:+919902326951"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone size={16} />
            Book a Demo
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-base sm:text-sm w-full sm:w-auto"
            // href={CourseList}
          >
            <FileText size={20} />
            Download Course List
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default MainLayout;
