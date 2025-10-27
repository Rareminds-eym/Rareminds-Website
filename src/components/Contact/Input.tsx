// import React from "react";
// import bannerBg from "../../assets/Rectangle491.png"
// import leftCardBg from "../../assets/Rectangle493.png";

// const ContactPage: React.FC = () => {
//   return (
//     <div className="relative w-full min-h-screen bg-white">
//       {/* Banner Section */}
//       <div
//         className="relative w-full h-[420px] bg-cover bg-center flex items-center justify-center"
//         style={{ backgroundImage: `url(${bannerBg})` }}
//       >
//         <h1 className="text-white text-5xl font-semibold z-10 mb-100">Contact Us</h1>
//       </div>

//       {/* Contact Content */}
//       <div className="relative -mt-40 flex justify-center items-start gap-10 px-10">
//         {/* Left Info Card */}
//         <div
//           className="w-[474] h-[470px] bg-cover bg-center rounded-2xl text-white p-8 shadow-lg"
//           style={{ backgroundImage: `url(${leftCardBg})` }}
//         >
//           <h2 className="text-2xl font-semibold mb-4">Follow Us:</h2>
//           <p className="mb-3">info@rareminds.in</p>
//           <p className="mb-3">career@rareminds.in</p>
//           <p className="mb-3">+91 9562481110</p>
//           <p className="mb-3">
//             231, 2nd stage, 13th Cross Road,
//             <br />
//             Hoysala Nagar, Indiranagar
//             <br />
//             Bengaluru, Karnataka 560001
//           </p>
//         </div>

//         {/* Form Section */}
//         <div className="bg-white w-[445px] h-[600px] rounded-2xl shadow-xl p-8 flex flex-col justify-between">
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Name"
//               className="w-full h-[50px] border border-gray-300 rounded-md px-4 focus:outline-none"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full h-[50px] border border-gray-300 rounded-md px-4 focus:outline-none"
//             />
//             <input
//               type="tel"
//               placeholder="Phone"
//               className="w-full h-[50px] border border-gray-300 rounded-md px-4 focus:outline-none"
//             />
//             <textarea
//               placeholder="Message"
//               className="w-full h-[120px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none resize-none"
//             ></textarea>
//           </div>

//           <button className="mt-4 w-full h-[50px] bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;

// import React from "react";
// import bannerBg from "../../assets/Rectangle491.png";
// import leftCardBg from "../../assets/Rectangle493.png";

// const ContactPage: React.FC = () => {
//   return (
//     <div className="relative w-full min-h-screen bg-white">
//       {/* Banner Section */}
//       <div
//         className="relative w-full h-[420px] bg-cover bg-center flex items-start justify-center pt-16 pl-16"
//         style={{ backgroundImage: `url(${bannerBg})` }}
//       >
//         <h1 className="text-white text-5xl font-semibold z-10">Contact Us</h1>
//       </div>

//       {/* Contact Content */}
//       <div className="relative -mt-40 flex justify-center items-start gap-10 px-10 pb-16">
//         {/* Form Section (left side) */}
//         <div className="bg-white w-[445px] h-[650px] rounded-2xl shadow-xl p-8 flex flex-col justify-between">
//           <div className="space-y-5">
//             {/* Name Field */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 className="w-full h-[50px] border border-gray-300 rounded-md px-4 focus:outline-none"
//               />
//             </div>

//             {/* Email Field */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full h-[50px] border border-gray-300 rounded-md px-4 focus:outline-none"
//               />
//             </div>

//             {/* Phone Field */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Phone</label>
//               <input
//                 type="tel"
//                 placeholder="Enter your phone number"
//                 className="w-full h-[50px] border border-gray-300 rounded-md px-4 focus:outline-none"
//               />
//             </div>

//             {/* Role Dropdown */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Role</label>
//               <select
//                 className="w-full h-[50px] border border-gray-300 rounded-md px-4 focus:outline-none bg-white"
//                 defaultValue=""
//               >
//                 <option value="" disabled>
//                   Select your role
//                 </option>
//                 <option value="student">Student</option>
//                 <option value="faculty">Faculty</option>
//                 <option value="recruiter">Recruiter</option>
//               </select>
//             </div>

//             {/* Message Field */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Message</label>
//               <textarea
//                 placeholder="Enter your message"
//                 className="w-full h-[120px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none resize-none"
//               ></textarea>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button className="mt-6 w-full h-[50px] bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all">
//             Submit
//           </button>
//         </div>

//         {/* Right Info Card */}
//         <div
//   className="relative w-[474px] h-[470px] bg-cover bg-center rounded-2xl shadow-lg overflow-hidden"
//   style={{ backgroundImage: `url(${leftCardBg})` }}
// >
//   {/* Dark overlay for readability */}
//   <div className="absolute inset-0 rounded-2xl"></div>

//   {/* Overlayed content */}
//   <div className="absolute inset-0 flex flex-col justify-end text-white p-8 pb-14 z-10">
//     <p className="mb-3">info@rareminds.in</p>
//     <p className="mb-3">career@rareminds.in</p>
//     <p className="mb-3">+91 9562481110</p>
//     <p className="mb-3">
//       231, 2nd stage, 13th Cross Road,
//       <br />
//       Hoysala Nagar, Indiranagar
//       <br />
//       Bengaluru, Karnataka 560001
//     </p>
//   </div>
// </div>

//       </div>
//     </div>
//   );
// };

// export default ContactPage;

// import React from "react";
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
// import bannerBg from "../../assets/banner.gif";
// import leftCardBg from "../../assets/Rectangle493.png";

// const ContactPage: React.FC = () => {
//   return (
//     <div className="relative w-full min-h-screen bg-white">
//       {/* Banner Section */}
//       <div
//   className="relative bg-cover h-[500px] w-[1550px] bg-center flex items-start justify-center pt-16 pl-16 pr-"
//   style={{ backgroundImage: `url(${bannerBg})`, aspectRatio: "16/5" }}
// >
//   <h1 className="text-black text-5xl font-semibold z-10">Contact Us</h1>

//   {/* Form overlayed on banner */}
//   <div className="absolute top-[40%] left-[20%] w-[440px] bg-white rounded-2xl shadow-xl p-7 flex flex-col justify-between">
//     <div className="space-y-5">
//       <div>
//         <label className="block text-gray-700 font-medium mb-1">Name</label>
//         <input
//           type="text"
//           placeholder="Enter your name"
//           className="w-full h-[50px] border border-gray-300 rounded-md px-4 focus:outline-none"
//         />
//       </div>

//       <div>
//         <label className="block text-gray-700 font-medium mb-1">Email</label>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="w-full h-[50px] border border-gray-300 rounded-md px-4 focus:outline-none"
//         />
//       </div>

//       <div>
//         <label className="block text-gray-700 font-medium mb-1">Phone</label>
//         <input
//           type="tel"
//           placeholder="Enter your phone number"
//           className="w-full h-[50px] border border-gray-300 rounded-md px-4 focus:outline-none"
//         />
//       </div>

//       <div>
//         <label className="block text-gray-700 font-medium mb-1">Role</label>
//         <select
//           className="w-full h-[50px] border border-gray-300 rounded-md px-4 focus:outline-none bg-white"
//           defaultValue=""
//         >
//           <option value="" disabled>
//             Select your role
//           </option>
//           <option value="student">Student</option>
//           <option value="faculty">Faculty</option>
//           <option value="recruiter">Recruiter</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-gray-700 font-medium mb-1">Message</label>
//         <textarea
//           placeholder="Enter your message"
//           className="w-full h-[120px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none resize-none"
//         ></textarea>
//       </div>
//     </div>

//     <button className="mt-6 w-full h-[50px] bg-red-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all">
//       Send
//     </button>
//   </div>
// </div>

//       {/* Contact Content */}
//       <div className="relative right-[10%] -mt-20 flex justify-end items-start px-10 pb-16">
//   {/* Image as background only */}
//   <div className="relative w-[474px] h-[470px]">
//     <img
//       src={leftCardBg}
//       alt="Contact Background"
//       className="w-full h-full object-cover rounded-2xl"
//     />

//     {/* Overlayed content aligned to end */}
//     <div className="absolute inset-0 flex flex-col justify-end items-start text-white p-8 space-y-4 pb-6 mt-15">
//       <p className="flex items-start gap-2">
//   <FaEnvelope className="mt-3" />
//   <span>
//     info@rareminds.in
//     <br />
//     career@rareminds.in
//   </span>
// </p>

//       <p className="flex items-center gap-2">
//         <FaPhone /> +91 9562481110
//       </p>
//       <p className="flex items-start gap-2 text-left">
//         <FaMapMarkerAlt />
//         <span>
//           231, 2nd stage, 13th Cross Road,
//           <br />
//           Hoysala Nagar, Indiranagar
//           <br />
//           Bengaluru, Karnataka 560001
//         </span>
//       </p>
//       <p className="flex items-start gap-2 text-left">
//         <FaClock />
//         <span>
//           Working Hours: 8 hours
//           <br />
//           Mon-Fri (9:00 AM to 5:00 PM)
//           <br />
//           Sat (9:00 AM to 2:00 PM)
//         </span>
//       </p>
//     </div>
//   </div>
// </div>
//     </div>
//   );
// };

// export default ContactPage;

// import React from "react";
// import bannerBg from "../../assets/banner.gif";
// import overlaySvg from "../../assets/banner7.svg";

// const ContactPage: React.FC = () => {
//   return (
//     <div className="relative w-full h-screen overflow-hidden bg-white">
//       {/* Banner Section */}
//       <div
//         className="relative h-[450px] w-[1550px] bg-cover bg-center flex items-start justify-center pt-17 pl-16 overflow-hidden"
//         style={{
//           backgroundImage: `url(${bannerBg})`,
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//         }}
//       >
//         {/* SVG Overlay - Full Width and Properly Centered */}
//         <img
//           src={overlaySvg}
//           alt="Decorative Overlay"
//           className="absolute top-1/2 left-1/2 w-[119%] max-w-none h-auto -translate-x-1/2 -translate-y-1/2 opacity-95 z-0 rounded-3xl"
//         />

//         {/* Centered Heading */}
//         <h1 className="text-black text-5xl sm:text-7xl font-semibold z-10 text-center drop-shadow-md">
//           Contact Us
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;


// import React from "react";
// import bannerBg from "../../assets/banner.gif";
// import overlaySvg from "../../assets/banner7.svg";
// import leftCardBg from "../../assets/Rectangle493.png";

// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
// const ContactPage: React.FC = () => {
//   return (
//     <div className="relative w-full h-screen overflow-hidden bg-white py-10">
//       {/* Banner Section */}
//       <div
//         className="relative h-[470px] w-[1550px] bg-cover bg-center flex items-start justify-center pt-17 pl-16 overflow-hidden"
//         style={{
//           backgroundImage: `url(${bannerBg})`,
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//         }}
//       >
//         {/* SVG Overlay - Full Width and Properly Centered */}
//         <img
//           src={overlaySvg}
//           alt="Decorative Overlay"
//           className="absolute top-1/2 left-1/2 w-[120%] max-w-none h-auto -translate-x-1/2 -translate-y-1/2 opacity-95 z-0 rounded-3xl"
//         />

//         {/* Centered Heading */}
//         <h1 className="text-black text-5xl sm:text-7xl font-semibold z-10 text-center drop-shadow-md">
//           Contact Us
//         </h1>
//       </div>

//       {/* Contact Form (Overlayed on Banner) */}
//       <div className="absolute top-[17%] left-[17%] w-[440px] bg-white rounded-2xl shadow-xl p-4 flex flex-col justify-between z-20">
//         <div className="space-y-3">
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Name</label>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               className="w-full h-[45px] border border-gray-300 rounded-md px-4 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full h-[45px] border border-gray-300 rounded-md px-4 focus:outline-none"
//             />
//           </div>
//            <div>
//             <label className="block text-gray-700 font-medium mb-1">Role</label>
//             <select
//               className="w-full h-[45px] border border-gray-300 rounded-md px-4 focus:outline-none bg-white"
//               defaultValue=""
//             >
//               <option value="" disabled>
//                 Select your role
//               </option>
//               <option value="student">Student</option>
//               <option value="faculty">Faculty</option>
//               <option value="recruiter">Recruiter</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Phone</label>
//             <input
//               type="tel"
//               placeholder="Enter your phone number"
//               className="w-full h-[45px] border border-gray-300 rounded-md px-4 focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Message</label>
//             <textarea
//               placeholder="Enter your message"
//               className="w-full h-[115px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none resize-none"
//             ></textarea>
//           </div>
//         </div>

//         <button className="mt-6 mx-auto w-[250px] h-[45px] bg-red-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all block text-center">
//           Send
//         </button>
//       </div>
//       <div className="relative right-[15%] -mt-[215px] flex justify-end items-start px-10 pb-16">
//   {/* Image as background only */}
//   <div className="relative w-[420px] h-[415px]">
//     <img
//       src={leftCardBg}
//       alt="Contact Background"
//       className="w-full h-full object-cover rounded-2xl"
//     />
//     {/* Overlayed content aligned to end */}
//     <div className="absolute inset-0 flex flex-col justify-end items-start text-white p-8 space-y-4 pb-6 mt-15">
//       <p className="flex items-start gap-3 pl-3">
//         <FaEnvelope className="mt-3" />
//         <span>
//           info@rareminds.in
//           <br />
//           career@rareminds.in
//         </span>
//       </p>

//       <p className="flex items-center gap-3 pl-3">
//         <FaPhone className="mt-1"/> +91 9562481110
//       </p>
//       <p className="flex items-start gap-3 text-left pl-3">
//         <FaMapMarkerAlt className="mt-1"/>
//         <span>
//           231, 2nd stage, 13th Cross Road,
//           <br />
//           Hoysala Nagar, Indiranagar
//           <br />
//           Bengaluru, Karnataka 560001
//         </span>
//       </p>
//       <p className="flex items-start gap-3 text-left pl-3">
//         <FaClock className="mt-1"/>
//         <span>
//           Working Hours: 8 hours
//           <br />
//           Mon-Fri (9:00 AM to 5:00 PM)
//           <br />
//           Sat (9:00 AM to 2:00 PM)
//         </span>
//       </p>
//     </div>
//   </div>
// </div>

//     </div>
//   );
// };

// export default ContactPage;



// import React from "react";
// import bannerBg from "../../assets/banner.gif";
// import overlaySvg from "../../assets/Banner9.svg";
// import leftCardBg from "../../assets/Banner10.png";

// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

// const ContactPage: React.FC = () => {
//   return (
//     <div className="contact-page relative w-full min-h-screen bg-white">
//       {/* Banner Section */}
//       <div
//         className="banner-container relative h-[490px] max-w-[1550px] bg-cover bg-center flex items-start justify-center pt-17 pl-16 overflow-hidden mx-auto"
//         style={{
//           backgroundImage: `url(${bannerBg})`,
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//         }}
//       >
//         {/* SVG Overlay */}
//       <svg 
//           className="absolute top-1/2 left-1/2 w-[128%] max-w-none h-auto -translate-x-1/2 -translate-y-1/2 z-0"
//           viewBox="0 0 855 355" 
//           fill="none" 
//           xmlns="http://www.w3.org/2000/svg"
//           preserveAspectRatio="xMidYMid slice"
//         >
//           <path d="M0 0V44C0 155.562 90.4385 246 202 246L852 140.5V300H445.134H0V0Z" fill="white"/>
//         </svg>
//         <img
//           src={overlaySvg}
//           alt="Decorative Overlay"
//           className="overlay absolute top-1/2 left-1/2 w-[128%] max-w-none h-auto -translate-x-1/2 -translate-y-1/2 opacity-95 z-0 rounded-3xl"
//         />

//         {/* Heading */}
//        {/* Heading (always on top) */}
// <h1
//   className="absolute top-6 left-1/2 transform -translate-x-1/2 text-black text-lg sm:text-7xl md:text-5xl font-semibold z-10 text-center drop-shadow-md"
// >
//   Contact Us
// </h1>

//       </div>

//       {/* Contact Form */}
//       <div className="contact-form absolute top-[13%] left-[17%] w-[440px] bg-white rounded-2xl shadow-xl p-4 flex flex-col justify-between z-20">
//         <div className="space-y-3">
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Name</label>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               className="w-full h-[45px] border border-gray-300 rounded-md px-4 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full h-[45px] border border-gray-300 rounded-md px-4 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Role</label>
//             <select
//               className="w-full h-[45px] border border-gray-300 rounded-md px-4 focus:outline-none bg-white"
//               defaultValue=""
//             >
//               <option value="" disabled>
//                 Select your role
//               </option>
//               <option value="student">Student</option>
//               <option value="faculty">Faculty</option>
//               <option value="recruiter">Recruiter</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Phone</label>
//             <input
//               type="tel"
//               placeholder="Enter your phone number"
//               className="w-full h-[45px] border border-gray-300 rounded-md px-4 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Message</label>
//             <textarea
//               placeholder="Enter your message"
//               className="w-full h-[115px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none resize-none"
//             ></textarea>
//           </div>
//         </div>

//         <button className="mt-6 mx-auto w-[250px] h-[45px] bg-red-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all block text-center">
//           Send
//         </button>
//       </div>

//       {/* Left Contact Card */}
      
//       <div className="left-card-wrapper relative right-[15%] -mt-[220px] flex justify-end items-start px-10 pb-16">
//   {/* Image as background */}
//   <div className="relative w-[400px] h-[420px] rounded-2xl overflow-hidden rounded-2xl">
//     {/* Background image */}
//     <img
//       src={leftCardBg}
//       alt="Contact Background"
//       className="absolute inset-0 object-cover rounded-2xl z-0"
//     />

//     {/* Overlayed content directly on image */}
//     <div className="absolute inset-0 flex flex-col justify-end items-start text-white p-8 space-y-4 backdrop-blur-[1px] rounded-2xl z-10">
//       <p className="flex items-start gap-3 pl-3">
//         <FaEnvelope className="mt-3" />
//         <span>
//           market@rareminds.in
//           <br />
//           careers@rareminds.in
//         </span>
//       </p>

//       <p className="flex items-center gap-3 pl-3">
//         <FaPhone className="mt-1" /> +91 9562481110
//       </p>

//       <p className="flex items-start gap-3 text-left pl-3">
//         <FaMapMarkerAlt className="mt-1" />
//         <span>
//           231, 2nd stage, 13th Cross Road,
//           <br />
//           Hoysala Nagar, Indiranagar
//           <br />
//           Bengaluru, Karnataka 560001
//         </span>
//       </p>

//       <p className="flex items-start gap-3 text-left pl-3">
//         <FaClock className="mt-1" />
//         <span>
//           Working Hours: 8 hours
//           <br />
//           Mon-Fri (9:00 AM to 5:00 PM)
//           <br />
//           Sat (9:00 AM to 2:00 PM)
//         </span>
//       </p>
//     </div>
//   </div>
// </div>


//       {/* Professional mobile overrides only (desktop untouched) */}
//       <style>{`
//         /* MOBILE (<= 768px) */
//         @media (max-width: 768px) {
//           /* Banner: full width, shorter height so it fits well on mobile */
//           .contact-page .banner-container {
//             width: 100% !important;
//             height: 190px !important;
//             padding-left: 1rem !important;
//             padding-top: 0.5rem !important;
//             display: flex !important;
//             align-items: center !important;
//             justify-content: center !important;
//             margin: 0 auto !important;
//           }

//           /* SVG overlay: scale to fit without overflowing */
//           .contact-page .overlay {
//             width: 180% !important;
//             height: 180% !important;
//             left: 50% !important;
//             top: 50% !important;
//             transform: translate(-50%, -50%) !important;
//             border-radius: 18px !important;
//           }

//           /* Heading: smaller, centered and readable */
//           .contact-page .banner-container h1 {
//             font-size: 1.7rem !important;
//             line-height: 1.05 !important;
//             padding: 0 0.75rem !important;
//             text-align: center !important;
//           }

//           /* Make form a normal stacked element under banner (keeps slight overlap) */
//           .contact-page .contact-form {
//             position: relative !important;
//             top: auto !important;
//             left: auto !important;
//             width: calc(100% - 32px) !important;
//             margin: -60px auto 0 auto !important;  /* slight overlap with banner for the same look */
//             padding: 0.75rem !important;
//             box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important;
//             z-index: 30 !important;
//             border-radius: 14px !important;
//           }

//           /* Tighter vertical spacing inside form */
//           .contact-page .contact-form .space-y-3 { gap: 0.5rem !important; }
//           .contact-page .contact-form input,
//           .contact-page .contact-form select {
//             height: 40px !important;
//             padding-left: 0.75rem !important;
//             padding-right: 0.75rem !important;
//             font-size: 0.95rem !important;
//           }
//           .contact-page .contact-form textarea {
//             height: 90px !important;
//             padding-left: 0.75rem !important;
//             padding-right: 0.75rem !important;
//             font-size: 0.95rem !important;
//           }

//           /* Button centered and smaller */
//           .contact-page .contact-form button {
//             width: 180px !important;
//             margin: 0.75rem auto !important;
//             height: 42px !important;
//           }

//           /* Left card: stack below the form, shrink, center it */
//           .contact-page .left-card-wrapper {
//             position: relative !important;
//             right: auto !important;
//             margin-top: 1rem !important;
//             padding-left: 0 !important;
//             padding-right: 0 !important;
//             display: flex !important;
//             justify-content: center !important;
//             align-items: center !important;
//           }

//           .contact-page .left-card-inner {
//             width: calc(100% - 32px)
//             height: 280px !important;
//             margin: 0 auto !important;
//             border-radius: 16px !important;
//             overflow: hidden !important;
//           }

//           .contact-page .left-card-inner img {
//             width: 50% !important;
//             height: 50% !important;
//             object-fit: cover !important;
//           }

//           /* Make overlay text readable on small screens: subtle dark gradient */
//           .contact-page .left-card-inner > .absolute {
//             padding-left: 0.75rem !important;
//             padding-right: 0.75rem !important;
//             padding-bottom: 1rem !important;
//           }
//           .contact-page .left-card-inner > .absolute::before {
//             content: "" ;
//             position: absolute;
//             inset: 0;
//             background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%);
//             border-radius: 12px;
//             z-index: 0;
//           }
//           /* ensure text sits above the gradient */
//           .contact-page .left-card-inner > .absolute > * { position: relative; z-index: 1; }

//           /* smaller icon/text on mobile */
//           .contact-page .left-card-inner .mt-3 { margin-top: 0.25rem !important; }
//           .contact-page .left-card-inner p { font-size: 0.95rem !important; line-height: 1.15 !important; }

//           /* prevent page from vertical overflow */
//           body, html {overflow-x: hidden !important;
//           }
//         }

//         /* TABLET (769px - 1024px) - minor tweaks to keep proportions */
//         @media (min-width: 769px) and (max-width: 1024px) {
//           .contact-page .banner-container { height: 360px !important; padding-left: 1rem !important; }
//           .contact-page .overlay { width: 130% !important; }
//           .contact-page .contact-form { position: relative !important; width: 78% !important; margin: -80px auto 0 auto !important; }
//           .contact-page .left-card-inner { height: 320px !important; width: 78% !important; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ContactPage;


// import React from "react";
// import bannerBg from "../../assets/bannergif.gif";
// import leftCardBg from "../../assets/Banner10.png";
// import mobileCardBg from "../../assets/Mobileversion.png"; // ✅ new mobile image
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

// const ContactPage: React.FC = () => {
//   return (
//     <div className="contact-page relative w-full min-h-screen bg-white">
//       {/* Banner Section */}
//       <div
//         className="banner-container relative h-[490px] max-w-[1550px] bg-cover bg-center flex items-start justify-center pt-17 pl-16 overflow-hidden mx-auto"
//         style={{
//           backgroundImage: `url(${bannerBg})`,
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//         }}
//       >
//         {/* White shape overlay */}
//          <svg
//   className="absolute bottom-[-1px] left-0 w-full h-[185px] md:h-[260px] lg:h-[330px] z-0"
//   viewBox="0 0 1144 349"
//   fill="none"
//   xmlns="http://www.w3.org/2000/svg"
//   preserveAspectRatio="none"
// >
//   <path
//     d="M0 100L120 230C180 285 270 310 360 280L700 170L1144 0V349H0V100Z"
//     fill="white"
//   />
// </svg>


//         {/* Heading */}
//         <h1 className="absolute top-5 left-1/2 transform -translate-x-1/2 text-black text-lg sm:text-7xl md:text-5xl font-semibold z-10 text-center drop-shadow-md">
//           Contact Us
//         </h1>
//       </div>

//       {/* Contact Form */}
//       <div className="contact-form absolute top-[16%] left-[20%] w-[440px] bg-white rounded-2xl shadow-xl p-4 flex flex-col justify-between z-20">
//         <div className="space-y-3">
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Name</label>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               className="w-full h-[45px] border border-gray-300 rounded-md px-4 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full h-[45px] border border-gray-300 rounded-md px-4 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Role</label>
//             <select
//               className="w-full h-[45px] border border-gray-300 rounded-md px-4 focus:outline-none bg-white"
//               defaultValue=""
//             >
//               <option value="" disabled>
//                 Select your role
//               </option>
//               <option value="student">Student</option>
//               <option value="faculty">Faculty</option>
//               <option value="recruiter">Recruiter</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Phone</label>
//             <input
//               type="tel"
//               placeholder="Enter your phone number"
//               className="w-full h-[30px] border border-gray-300 rounded-md px-4 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Message</label>
//             <textarea
//               placeholder="Enter your message"
//               className="w-full h-[115px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none resize-none"
//             ></textarea>
//           </div>
//         </div>

//         <button className="mt-6 mx-auto w-[250px] h-[45px] bg-red-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all block text-center">
//           Send
//         </button>
//       </div>

//       {/* Left Contact Card */}
//       <div className="left-card-wrapper relative right-[13%] -mt-[220px] flex justify-end items-start px-10 pb-16">
//         <div className="left-card-inner relative w-[400px] h-[420px] rounded-2xl overflow-hidden">
//           {/* ✅ Mobile version image */}
//           <picture>
//             <source srcSet={mobileCardBg} media="(max-width: 768px)" />
//             <img
//               src={leftCardBg}
//               alt="Contact Background"
//               className="absolute inset-0 object-cover rounded-2xl z-0"
//             />
//           </picture>

//           {/* Overlay Content */}
//           <div className="absolute inset-0 flex flex-col justify-end items-start text-white p-8 space-y-4 backdrop-blur-[1px] rounded-2xl z-10">
//             <p className="flex items-start gap-3 pl-3">
//               <FaEnvelope className="mt-3" />
//               <span>
//                 market@rareminds.in
//                 <br />
//                 careers@rareminds.in
//               </span>
//             </p>

//             <p className="flex items-center gap-3 pl-3">
//               <FaPhone className="mt-1" /> +91 9562481110
//             </p>

//             <p className="flex items-start gap-3 text-left pl-3">
//               <FaMapMarkerAlt className="mt-1" />
//               <span>
//                 231, 2nd stage, 13th Cross Road,
//                 <br />
//                 Hoysala Nagar, Indiranagar
//                 <br />
//                 Bengaluru, Karnataka 560001
//               </span>
//             </p>

//             <p className="flex items-start gap-3 text-left pl-3">
//               <FaClock className="mt-1" />
//               <span>
//                 Working Hours: 8 hours
//                 <br />
//                 Mon-Fri (9:00 AM to 5:00 PM)
//                 <br />
//                 Sat (9:00 AM to 2:00 PM)
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Responsive Styling */}
//       <style>{`
//         /* MOBILE (<= 768px) */
//         @media (max-width: 768px) {
//           .contact-page .banner-container {
//             width: 100% !important;
//             height: 190px !important;
//             padding-left: 1rem !important;
//             padding-top: 0.5rem !important;
//             display: flex !important;
//             align-items: center !important;
//             justify-content: center !important;
//             margin: 0 auto !important;
//           }

//           .contact-page .overlay {
//             width: 180% !important;
//             height: 180% !important;
//             left: 50% !important;
//             top: 50% !important;
//             transform: translate(-50%, -50%) !important;
//             border-radius: 18px !important;
//           }

//           .contact-page .banner-container h1 {
//             font-size: 1.7rem !important;
//             line-height: 1.05 !important;
//             text-align: center !important;
//           }

//           .contact-page .contact-form {
//             position: relative !important;
//             top: auto !important;
//             left: auto !important;
//             width: calc(100% - 32px) !important;
//             margin: -60px auto 0 auto !important;
//             padding: 0.75rem !important;
//             box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important;
//             z-index: 30 !important;
//             border-radius: 14px !important;
//           }

//           /* ✅ Compact Left Card */
//           .contact-page .left-card-wrapper {
//             position: relative !important;
//             right: auto !important;
//             margin-top: 1rem !important;
//             padding: 0 !important;
//             display: flex !important;
//             justify-content: center !important;
//             align-items: center !important;
//           }

//           .contact-page .left-card-inner {
//             width: 90% !important;          /* Reduced width */
//             height: 250px !important;       /* Reduced height */
//             border-radius: 10px !important;
//             overflow: hidden !important;
//           }

//           .contact-page .left-card-inner img {
//             width: 100% !important;
//             height: 100% !important;
//             object-fit: cover !important;
//           }

//           .contact-page .left-card-inner > .absolute {
//             padding: 0.6rem !important;    /* Less padding */
//           }

//           /* ✅ Smaller text and icons */
//           .contact-page .left-card-inner p {
//             font-size: 0.75rem !important;
//             line-height: 1.1 !important;
//             padding-top:3px !important;
//           }

//           .contact-page .left-card-inner svg {
//             width: 12px !important;
//             height: 12px !important;
//             margin-top: 3px !important;
//           }
//         }

//         /* TABLET (769px - 1024px) */
//         @media (min-width: 769px) and (max-width: 1024px) {
//           .contact-page .banner-container { height: 360px !important; }
//           .contact-page .overlay { width: 130% !important; }
//           .contact-page .contact-form { position: relative !important; width: 78% !important; margin: -80px auto 0 auto !important; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ContactPage;


import React from "react";
import bannerBg from "../../assets/bannergif.gif";
import leftCardBg from "../../assets/Banner10.png";
import mobileCardBg from "../../assets/Mobileversion.png";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page relative w-full min-h-screen bg-white">
      {/* Banner Section */}
      <div
        className="banner-container relative h-[490px] max-w-[1550px] bg-cover bg-center flex items-start justify-center pt-17 pl-16 overflow-hidden mx-auto"
        style={{
          backgroundImage: `url(${bannerBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* White shape overlay */}
        <svg
          className="absolute bottom-[-1px] left-0 w-full h-[185px] md:h-[260px] lg:h-[330px] z-0"
          viewBox="0 0 1144 349"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100L120 230C180 285 270 310 360 280L700 170L1144 0V349H0V100Z"
            fill="white"
          />
        </svg>

        {/* Heading */}
        <h1 className="absolute top-8 left-1/2 transform -translate-x-1/2 text-black text-lg sm:text-7xl md:text-5xl font-semibold z-10 text-center drop-shadow-md">
          Contact Us
        </h1>
      </div>

      {/* Contact Form */}
      <div className="contact-form absolute top-[16%] left-[20%] w-[440px] bg-white rounded-2xl shadow-xl p-4 flex flex-col justify-between z-20">
        <div className="space-y-3">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full h-[45px] border border-gray-300 rounded-md px-4 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-[45px] border border-gray-300 rounded-md px-4 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              className="w-full h-[45px] border border-gray-300 rounded-md px-4 focus:outline-none bg-white"
              defaultValue=""
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full h-[30px] border border-gray-300 rounded-md px-4 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              placeholder="Enter your message"
              className="w-full h-[115px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none resize-none"
            ></textarea>
          </div>
        </div>

        <button className="mt-6 mx-auto w-[250px] h-[45px] bg-red-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all block text-center">
          Send
        </button>
      </div>

      {/* Left Contact Card */}
      <div className="left-card-wrapper relative right-[13%] -mt-[220px] flex justify-end items-start px-10 pb-16">
        <div className="left-card-inner relative w-[400px] h-[420px] rounded-2xl overflow-hidden">
          {/* Mobile version image */}
          <picture>
            <source srcSet={mobileCardBg} media="(max-width: 768px)" />
            <img
              src={leftCardBg}
              alt="Contact Background"
              className="absolute inset-0 object-cover rounded-2xl z-0"
            />
          </picture>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-end items-start text-white p-8 space-y-4 backdrop-blur-[1px] rounded-2xl z-10">
            <p className="flex items-start gap-3 pl-3">
              <FaEnvelope className="mt-3" />
              <span>
                market@rareminds.in
                <br />
                careers@rareminds.in
              </span>
            </p>

            <p className="flex items-center gap-3 pl-3">
              <FaPhone className="mt-1" /> +91 9562481110
            </p>

            <p className="flex items-start gap-3 text-left pl-3">
              <FaMapMarkerAlt className="mt-1" />
              <span>
                231, 2nd stage, 13th Cross Road,
                <br />
                Hoysala Nagar, Indiranagar
                <br />
                Bengaluru, Karnataka 560001
              </span>
            </p>

            <p className="flex items-start gap-3 text-left pl-3">
              <FaClock className="mt-1" />
              <span>
                Working Hours: 8 hours
                <br />
                Mon-Fri (9:00 AM to 5:00 PM)
                <br />
                Sat (9:00 AM to 2:00 PM)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Styling */}
      <style>{`
        /* MOBILE (<= 768px) */
        @media (max-width: 768px) {
          .contact-page .banner-container {
            width: 100% !important;
            height: 190px !important;
            padding-left: 1rem !important;
            padding-top: 0.5rem !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin: 0 auto !important;
          }

          .contact-page .banner-container svg {
            height: 100px !important;
          }

          .contact-page .banner-container h1 {
            font-size: 1.7rem !important;
            line-height: 1.05 !important;
            text-align: center !important;
          }

          .contact-page .contact-form {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: calc(100% - 32px) !important;
            margin: -60px auto 0 auto !important;
            padding: 0.75rem !important;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important;
            z-index: 30 !important;
            border-radius: 14px !important;
          }

          .contact-page .left-card-wrapper {
            position: relative !important;
            right: auto !important;
            margin-top: 1rem !important;
            padding: 0 1rem !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }

          .contact-page .left-card-inner {
            width: calc(100% - 32px) !important;
            height: 280px !important;
            border-radius: 10px !important;
            overflow: hidden !important;
          }

          .contact-page .left-card-inner img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }

          .contact-page .left-card-inner > .absolute {
            padding: 1rem !important;
            space-y: 0.5rem !important;
          }

          .contact-page .left-card-inner p {
            font-size: 0.8rem !important;
            line-height: 1.3 !important;
            gap: 0.5rem !important;
            padding-left: 0.5rem !important;
          }

          .contact-page .left-card-inner svg {
            width: 14px !important;
            height: 14px !important;
            min-width: 14px !important;
            margin-top: 2px !important;
          }
        }

        /* TABLET (769px - 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          .contact-page .banner-container {
            height: 340px !important;
            padding: 1rem !important;
          }

          .contact-page .banner-container svg {
            height: 180px !important;
          }

          .contact-page .banner-container h1 {
            font-size: 3rem !important;
            top: 2rem !important;
          }

          /* Stack form and card vertically on tablet */
          .contact-page .contact-form {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 80% !important;
            max-width: 500px !important;
            margin: -100px auto 2rem auto !important;
            padding: 1.5rem !important;
          }

          .contact-page .left-card-wrapper {
            position: relative !important;
            right: auto !important;
            margin-top: 0 !important;
            padding: 0 2rem 2rem 2rem !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }

          .contact-page .left-card-inner {
            width: 80% !important;
            max-width: 500px !important;
            height: 400px !important;
          }
        }

        /* SMALL DESKTOP (1025px - 1279px) */
        @media (min-width: 1025px) and (max-width: 1279px) {
          .contact-page .banner-container {
            height: 400px !important;
          }

          .contact-page .banner-container svg {
            height: 220px !important;
          }

          .contact-page .banner-container h1 {
            font-size: 3.5rem !important;
          }

          .contact-page .contact-form {
            left: 10% !important;
            width: 420px !important;
          }

          .contact-page .left-card-wrapper {
            right: -5% !important;
            margin-top: -200px !important;
          }

          .contact-page .left-card-inner {
            width: 380px !important;
          }
        }

        /* MEDIUM DESKTOP (1280px - 1439px) */
        @media (min-width: 1280px) and (max-width: 1439px) {
          .contact-page .banner-container {
            height: 440px !important;
          }

          .contact-page .banner-container svg {
            height: 240px !important;
          }

          .contact-page .contact-form {
            left: 15% !important;
          }

          .contact-page .left-card-wrapper {
            right: -8% !important;
          }
        }

        /* LARGE DESKTOP (1440px+) - Original Design */
        @media (min-width: 1440px) {
          /* Original styles maintained */
        }
      `}</style>
    </div>
  );
};

export default ContactPage;