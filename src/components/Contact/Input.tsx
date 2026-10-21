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




// import React from "react";
// import bannerBg from "../../assets/bannergif.gif";
// import leftCardBg from "../../assets/Banner10.png";
// import mobileCardBg from "../../assets/Mobileversion.png";
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
//         <svg
//           className="absolute bottom-[-1px] left-0 w-full h-[185px] md:h-[260px] lg:h-[330px] z-0"
//           viewBox="0 0 1144 349"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M0 100L120 230C180 285 270 310 360 280L700 170L1144 0V349H0V100Z"
//             fill="white"
//           />
//         </svg>

//         {/* Heading */}
//         <h1 className="absolute top-8 left-1/2 transform -translate-x-1/2 text-black text-lg sm:text-7xl md:text-5xl font-semibold z-10 text-center drop-shadow-md">
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
//           {/* Mobile version image */}
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

//       {/* Responsive Styling */}
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

//           .contact-page .banner-container svg {
//             height: 100px !important;
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

//           .contact-page .left-card-wrapper {
//             position: relative !important;
//             right: auto !important;
//             margin-top: -1rem !important;
//             padding: 0 1rem !important;
//             display: flex !important;
//             justify-content: center !important;
//             align-items: center !important;
//           }

//           .contact-page .left-card-inner {
//             width: calc(100% - 32px) !important;
//             height: 280px !important;
//             border-radius: 10px !important;
//             overflow: hidden !important;
//           }

//           .contact-page .left-card-inner img {
//             width: 100% !important;
//             height: 100% !important;
//             object-fit: cover !important;
//           }

//           .contact-page .left-card-inner > .absolute {
//             padding: 1rem !important;
//             space-y: 0.5rem !important;
//           }

//           .contact-page .left-card-inner p {
//             font-size: 0.8rem !important;
//             line-height: 1.3 !important;
//             gap: 0.5rem !important;
//             padding-left: 0.5rem !important;
//           }

//           .contact-page .left-card-inner svg {
//             width: 14px !important;
//             height: 14px !important;
//             min-width: 14px !important;
//             margin-top: 2px !important;
//           }
//         }

//         /* TABLET (769px - 1024px) */
//         @media (min-width: 769px) and (max-width: 1024px) {
//           .contact-page .banner-container {
//             height: 340px !important;
//             padding: 1rem !important;
//           }

//           .contact-page .banner-container svg {
//             height: 180px !important;
//           }

//           .contact-page .banner-container h1 {
//             font-size: 3rem !important;
//             top: 2rem !important;
//           }

//           /* Stack form and card vertically on tablet */
//           .contact-page .contact-form {
//             position: relative !important;
//             top: auto !important;
//             left: auto !important;
//             width: 80% !important;
//             max-width: 500px !important;
//             margin: -100px auto 2rem auto !important;
//             padding: 1.5rem !important;
//           }

//           .contact-page .left-card-wrapper {
//             position: relative !important;
//             right: auto !important;
//             margin-top: -2rem !important;
//             padding: 0 2rem 2rem 2rem !important;
//             display: flex !important;
//             justify-content: center !important;
//             align-items: center !important;
//           }

//           .contact-page .left-card-inner {
//             width: 80% !important;
//             max-width: 500px !important;
//             height: 400px !important;
//           }
//         }

//         /* SMALL DESKTOP (1025px - 1279px) */
//         @media (min-width: 1025px) and (max-width: 1279px) {
//           .contact-page .banner-container {
//             height: 400px !important;
//           }

//           .contact-page .banner-container svg {
//             height: 220px !important;
//           }

//           .contact-page .banner-container h1 {
//             font-size: 3.5rem !important;
//           }

//           .contact-page .contact-form {
//             left: 10% !important;
//             width: 420px !important;
//           }

//           .contact-page .left-card-wrapper {
//             right: -5% !important;
//             margin-top: -200px !important;
//           }

//           .contact-page .left-card-inner {
//             width: 380px !important;
//           }
//         }

//         /* MEDIUM DESKTOP (1280px - 1439px) */
//         @media (min-width: 1280px) and (max-width: 1439px) {
//           .contact-page .banner-container {
//             height: 440px !important;
//           }

//           .contact-page .banner-container svg {
//             height: 240px !important;
//           }

//           .contact-page .contact-form {
//             left: 15% !important;
//           }

//           .contact-page .left-card-wrapper {
//             right: -8% !important;
//           }
//         }

//         /* LARGE DESKTOP (1440px+) - Original Design */
//         @media (min-width: 1440px) {
//           /* Original styles maintained */
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ContactPage;
import type React from "react";
import bannerBg from "../../assets/contact-banner.webp";
import leftCardBg from "../../assets/Banner10.png";
import mobileCardBg from "../../assets/Mobileversion.png";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaGoogle } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { sendEmailNotification, sendEmailOtp, verifyEmailOtp } from "@/services/emailBff";
import { formatCompanyAddressLine } from "@/constants/companySettings";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import {
  validateFields,
  getEmailError,
  getNameError,
  getPhoneError,
  MESSAGE_MAX,
  type FieldErrors,
  type FieldKey,
} from "@/utils/validators";

// Email verification switch.
// false = the form saves without a code (use this until your team has enabled
//         email sending and Google in Supabase).
// true  = the visitor must verify the email (code or Google) before sending.
const REQUIRE_EMAIL_VERIFICATION = true as boolean;

// Stops the button from saying "Sending..." forever if the server never answers.
const withTimeout = <T,>(promise: PromiseLike<T>, ms = 20000): Promise<T> =>
  Promise.race([
    Promise.resolve(promise),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), ms)
    ),
  ]);

const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const {
    settings: companySettings,
    isLoading: companySettingsLoading,
    errorMessage: companySettingsError,
  } = useCompanySettings();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [honeypot, setHoneypot] = useState("");
  const messageCount = Array.from(formData.message.trim()).length;

  // ---- email verification (code or Google) ----
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpBusy, setOtpBusy] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const isEmailVerified =
    verifiedEmail !== "" && verifiedEmail === formData.email.trim().toLowerCase();

  // ---- live hints, shown right under the box being typed in ----
  const markTouched = (key: FieldKey) =>
    setTouched((prev) => ({ ...prev, [key]: true }));
  const showHint = (key: FieldKey, value: string) =>
    touched[key] === true || value !== "";

  const hints: FieldErrors = {};
  if (showHint("name", formData.name) && getNameError(formData.name) !== "") {
    hints.name = "ENTER VALID NAME";
  }
  if (showHint("email", formData.email)) {
    if (getEmailError(formData.email) !== "") {
      hints.email = "ENTER VALID EMAIL";
    } else if (REQUIRE_EMAIL_VERIFICATION && !isEmailVerified) {
      hints.email = "VERIFY YOUR EMAIL WITH THE CODE";
    }
  }
  if (showHint("phone", formData.phone) && getPhoneError(formData.phone) !== "") {
    hints.phone = "ENTER VALID PHONE NUMBER";
  }
  if (touched.role === true && formData.role === "") {
    hints.role = "SELECT YOUR ROLE";
  }
  const shown: FieldErrors = {
    name: hints.name ?? errors.name,
    email: hints.email ?? errors.email,
    phone: hints.phone ?? errors.phone,
    role: hints.role ?? errors.role,
    message: errors.message,
  };

  // Pick up a session (for example after returning from Google)
  useEffect(() => {
    const returningFromGoogle =
      window.location.search.includes("code=") ||
      window.location.hash.includes("access_token");

    // Normal page load: forget any leftover login from an earlier visit
    if (!returningFromGoogle) {
      supabase.auth.signOut({ scope: "local" });
      return;
    }

    const applySession = (session: Session | null) => {
      const user = session?.user;
      if (!user?.email || !user.email_confirmed_at) return;
      const email = user.email.toLowerCase();
      const meta = (user.user_metadata ?? {}) as { full_name?: string; name?: string };
      setVerifiedEmail(email);
      setFormData((prev) => ({
        ...prev,
        email: prev.email || email,
        name: prev.name || meta.full_name || meta.name || "",
      }));
    };
    supabase.auth.getSession().then(({ data }) => applySession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, session) =>
      applySession(session)
    );
    return () => data.subscription.unsubscribe();
  }, []);

  // Resend countdown
  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  // Sends the 4-digit code through the email-worker (/api/email/send-otp)
  const sendOtp = async () => {
    if (otpBusy || resendIn > 0) return;
    const email = formData.email.trim().toLowerCase();
    if (getEmailError(email) !== "") {
      markTouched("email");
      return;
    }
    setOtpBusy(true);
    setOtpMessage("");
    try {
      await sendEmailOtp(email);
      setOtpSent(true);
      setOtp("");
      setResendIn(60);
      setOtpMessage("We sent a 4-digit code to your email. Enter it below.");
    } catch (error) {
      console.error("OTP send error:", error);
      const msg = error instanceof Error ? error.message.toLowerCase() : "";
      setOtpMessage(
        msg.includes("too many") || msg.includes("rate")
          ? "Too many requests. Wait a minute, then try again."
          : "Could not send the code. Please try again in a minute."
      );
    } finally {
      setOtpBusy(false);
    }
  };

  // Checks the 4-digit code (/api/email/verify-otp)
  const confirmOtp = async () => {
    if (otpBusy) return;
    const email = formData.email.trim().toLowerCase();
    if (!/^\d{4}$/.test(otp)) {
      setOtpMessage("Enter the 4-digit code");
      return;
    }
    setOtpBusy(true);
    try {
      await verifyEmailOtp(email, otp);
      setVerifiedEmail(email);
      setOtpSent(false);
      setOtp("");
      setOtpMessage("");
    } catch {
      setOtpMessage("Wrong or expired code. Try again or resend.");
    } finally {
      setOtpBusy(false);
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/contact-us` },
    });
    if (error) {
      console.error("Google sign-in error:", error.message);
      setOtpMessage("Google sign-in is not available right now.");
    }
  };

  // handle field change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // phone: digits only, at most 10
    const next = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: next,
    }));
    // remove the old red message for this field as soon as the visitor edits it
    setErrors((prev) => ({ ...prev, [name as FieldKey]: undefined }));
    if (name === "email") {
      setOtpSent(false);
      setOtp("");
      setOtpMessage("");
    }
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // 1) Check every field. The message is optional.
    const found = validateFields(
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        message: formData.message,
      },
      ["message"]
    );
    if (REQUIRE_EMAIL_VERIFICATION && !found.email && !isEmailVerified) {
      found.email = "VERIFY YOUR EMAIL WITH THE CODE";
    }
    setErrors(found);
    setTouched({ name: true, email: true, role: true, phone: true, message: true });
    if (Object.keys(found).length > 0) return;

    // 2) A bot filled the hidden field: pretend success and save nothing
    if (honeypot.trim() !== "") {
      toast({
        title: "Message sent successfully",
        description: "Thank you for contacting Rareminds Pvt. Ltd.! We'll be in touch soon.",
      });
      setFormData({ name: "", email: "", role: "", phone: "", message: "" });
      return;
    }

    // 3) Clean the values before saving
    const clean = {
      name: formData.name.trim().replace(/\s+/g, " "),
      email: formData.email.trim().toLowerCase(),
      role: formData.role,
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    };

    setIsSubmitting(true);

    try {
      // 4) Save the enquiry first
      const { error: dbError } = await withTimeout(
        supabase.from("contact_form").insert([
          {
            name: clean.name,
            email: clean.email,
            role: clean.role || null,
            phone: clean.phone || null,
            message: clean.message || "Not provided",
          },
        ])
      );

      if (dbError) {
        console.error("Supabase insert error:", dbError);

        if (dbError.code === "42P01") {
          toast({
            title: "Setup required",
            description: "Contact form database table is not set up. Please contact support.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Submission failed",
            description: "Unable to save your message. Please try again later.",
            variant: "destructive",
          });
        }
        return;
      }

      // 5) Notification in the background. A failure is only logged.
      Promise.resolve()
        .then(() =>
          sendEmailNotification("general-contact", {
            name: clean.name,
            email: clean.email,
            role: clean.role || "Not specified",
            phone: clean.phone || "Not provided",
            message: clean.message || "Not provided",
          })
        )
        .catch((emailError) => {
          console.error("Email notification error:", emailError);
        });

      // 6) One success message, then clear the form
      toast({
        title: "Message sent successfully",
        description: "Thank you for contacting Rareminds Pvt. Ltd.! We'll be in touch soon.",
      });
      setFormData({ name: "", email: "", role: "", phone: "", message: "" });
      setErrors({});
      setTouched({});
      setVerifiedEmail("");
      await supabase.auth.signOut();
      setOtpSent(false);
      setOtp("");
      setOtpMessage("");
    } catch (err) {
      if (err instanceof Error && err.message === "timeout") {
        toast({
          title: "Taking too long",
          description:
            "The server did not answer in time. Your message may not have been sent. Please check your connection and try again.",
          variant: "destructive",
        });
      } else {
        console.error("Unexpected error:", err);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <h1 className="absolute top-9 left-1/2 transform -translate-x-1/2 text-black text-lg sm:text-7xl md:text-5xl font-semibold z-10 text-center">
          Contact Us
        </h1>
      </div>

      {/* Contact Form */}
      <form
        noValidate
        onSubmit={handleSubmit}
        className="contact-form absolute top-[16%] left-[20%] w-[440px] bg-white rounded-2xl shadow-xl p-4 flex flex-col justify-between z-20"
      >
        <div className="space-y-3">
          {!isEmailVerified && (
            <>
              <button
                type="button"
                onClick={signInWithGoogle}
                className="w-full h-[42px] border border-gray-300 rounded-md text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-50"
              >
                <FaGoogle /> Continue with Google
              </button>
              <p className="text-center text-xs text-gray-500">
                or verify your email with a code below
              </p>
            </>
          )}

          <div>
            <label htmlFor="contact-name" className="block text-gray-700 font-medium mb-1">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => markTouched("name")}
              placeholder="Enter your name"
              autoComplete="name"
              aria-invalid={!!shown.name}
              aria-describedby={shown.name ? "contact-name-error" : undefined}
              className={`w-full h-[45px] border rounded-md px-4 py-1 focus:outline-none ${shown.name ? "border-red-500" : "border-gray-300"}`}
            />
            {shown.name && (
              <p id="contact-name-error" role="alert" className="text-red-600 text-xs mt-1 font-medium">
                {shown.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-gray-700 font-medium mb-1">
              Email <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <input
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => markTouched("email")}
                type="email"
                maxLength={254}
                autoComplete="email"
                placeholder="Enter your email"
                aria-invalid={!!shown.email}
                aria-describedby={shown.email ? "contact-email-error" : undefined}
                className={`flex-1 min-w-0 h-[45px] border rounded-md px-4 py-1 focus:outline-none ${shown.email ? "border-red-500" : "border-gray-300"}`}
              />
              {!isEmailVerified && (
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={otpBusy || resendIn > 0 || formData.email.trim() === ""}
                  className="px-3 h-[45px] rounded-md bg-[#1D8AD1] text-white text-sm font-semibold whitespace-nowrap disabled:opacity-60"
                >
                  {otpBusy
                    ? "Please wait..."
                    : otpSent
                      ? resendIn > 0
                        ? `Resend in ${resendIn}s`
                        : "Resend code"
                      : "Send code"}
                </button>
              )}
            </div>
            {otpSent && !isEmailVerified && (
              <div className="flex gap-2 mt-2">
                <input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      confirmOtp();
                    }
                  }}
                  placeholder="4-digit code"
                  className="flex-1 min-w-0 h-[45px] border border-gray-300 rounded-md px-4 py-1 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={confirmOtp}
                  disabled={otpBusy}
                  className="px-3 h-[45px] rounded-md bg-[#1D8AD1] text-white text-sm font-semibold disabled:opacity-60"
                >
                  Verify
                </button>
              </div>
            )}
            {otpMessage && !isEmailVerified && (
              <p className="text-xs mt-1 text-gray-600">{otpMessage}</p>
            )}
            {isEmailVerified && <p className="text-xs mt-1 text-green-700">✓ Email verified</p>}
            {shown.email && (
              <p id="contact-email-error" role="alert" className="text-red-600 text-xs mt-1 font-medium">
                {shown.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-role" className="block text-gray-700 font-medium mb-1">
              Role <span className="text-red-600">*</span>
            </label>
            <select
              id="contact-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              onBlur={() => markTouched("role")}
              aria-invalid={!!shown.role}
              aria-describedby={shown.role ? "contact-role-error" : undefined}
              className={`w-full h-[45px] border rounded-md px-4 py-1 focus:outline-none bg-white ${shown.role ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="teacher">Teacher</option>
              <option value="recruiter">Recruiter</option>
              <option value="recruiter">Trainer</option>
              <option value="institute">Government</option>
              <option value="university">University</option>
              <option value="school">School</option>
            </select>
            {shown.role && (
              <p id="contact-role-error" role="alert" className="text-red-600 text-xs mt-1 font-medium">
                {shown.role}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-phone" className="block text-gray-700 font-medium mb-1">
              Phone <span className="text-red-600">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => markTouched("phone")}
              placeholder="Enter your phone number"
              aria-invalid={!!shown.phone}
              aria-describedby={shown.phone ? "contact-phone-error" : undefined}
              className={`w-full h-[45px] border rounded-md px-4 py-1 focus:outline-none ${shown.phone ? "border-red-500" : "border-gray-300"}`}
            />
            {shown.phone && (
              <p id="contact-phone-error" role="alert" className="text-red-600 text-xs mt-1 font-medium">
                {shown.phone}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="contact-message" className="block text-gray-700 font-medium">
                Message <span className="text-gray-500 text-sm font-normal">(optional)</span>
              </label>
              <span className={`text-xs ${messageCount > MESSAGE_MAX ? "text-red-600" : "text-gray-500"}`}>
                {messageCount}/{MESSAGE_MAX}
              </span>
            </div>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              aria-invalid={!!shown.message}
              aria-describedby={shown.message ? "contact-message-error" : undefined}
              className={`w-full h-[115px] border rounded-md px-4 py-1 focus:outline-none resize-none ${shown.message ? "border-red-500" : "border-gray-300"}`}
            ></textarea>
            {shown.message && (
              <p id="contact-message-error" role="alert" className="text-red-600 text-xs mt-1 font-medium">
                {shown.message}
              </p>
            )}
          </div>

          {/* Hidden trap field for bots. Real visitors never see or fill it. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ position: "absolute", left: "-9999px", opacity: 0 }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 mx-auto w-[250px] h-[45px] bg-[#1D8AD1] text-white font-semibold rounded-md hover:bg-red-700 transition-all block text-center"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>

      {/* Left Contact Card */}
      <div className="left-card-wrapper relative right-[15%] -mt-[200px] flex justify-end items-start px-8 pb-16 ml-18">
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
                marketing@rareminds.in
                <br />
                careers@rareminds.in
              </span>
            </p>

            <p className="flex items-center gap-3 pl-3">
              <FaPhone className="mt-1" /> +91 9902326951
            </p>

            <p className="flex items-start gap-3 text-left pl-3">
              <FaMapMarkerAlt className="mt-1" />
              <span>
                {companySettingsLoading
                  ? "Loading company settings..."
                  : companySettings
                    ? companySettings.office_address
                    : companySettingsError || "Company settings are unavailable."}
                {companySettings && (
                  <>
                    <br />
                    {formatCompanyAddressLine(companySettings)}
                  </>
                )}
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
            height: 120px !important;
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
            .contact-page .contact-form label {
           fontsize: 0.9rem !important;
          }

          .contact-page .left-card-wrapper {
            position: relative !important;
            right: auto !important;
            margin-top: 3rem !important;
            padding: 0 1rem 1rem 1rem !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }

          .contact-page .left-card-inner {
            width: calc(100% - 32px) !important;
            height: 270px !important;
            border-radius: 10px !important;
            overflow: hidden !important;
          }

          .contact-page .left-card-inner img {
            width: 100% !important;
            height: 95% !important;
            object-fit: cover !important;
          }

          .contact-page .left-card-inner > .absolute {
            padding: 0.5rem !important;
            space-y: 0.5rem !important;
          }

          .contact-page .left-card-inner p {
            font-size: 0.8rem !important;
            line-height: 1.25 !important;
            gap: 0.5rem !important;
            padding-left: 0.5rem !important;
            margin-bottom:0.8rem !important;
          }

          .contact-page .left-card-inner svg {
            width: 13px !important;
            height: 13px !important;
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
            margin-top: -1rem !important;
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
            height: 200px !important;
            width: 100% !important;
          }

          .contact-page .banner-container h1 {
            font-size: 3.5rem !important;
          }

          .contact-page .contact-form {
            left: 10% !important;
            width: 420px !important;
          }

          .contact-page .left-card-wrapper {
            right: 15% !important;
            margin-top: -110px !important;
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
            width:100% !important
          }

          .contact-page .contact-form {
            left: 19% !important;
            top: 15% !important
          }

          .contact-page .left-card-wrapper {
            right: 0% !important;
            margin-top: -180px !important;
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