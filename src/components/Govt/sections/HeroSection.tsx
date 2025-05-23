import { useState, useEffect } from "react";
import { Calendar, ArrowDown, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GooeyText } from "../../ui/GooeyText";
import { ParticleButton } from "@/components/ui/particle-button";

const heroSlides = [
	{
		bg: "url('/Govt-Images/Hero.png')",
		title: "Over ₹10 Crore in Skill Projects Delivered.\nOne Trusted Partner.Seamless Execution.\nGuaranteed Impact.",
		description: "Pan-India deployment. Tier 2 & 3 coverage.\nLMS, dashboards, assessments, and 13+ language trainers — all under one roof."
	},
	
	{
		bg: "url('/Govt-Images/banner1.JPG')",
		title: (
			<div className="w-full  text-center flex items-center justify-center min-h-[20px] ">
				<GooeyText
					texts={[
						"Collaborate • Innovate • Transform",
						"सहयोग करें नवाचार करें परिवर्तन करें।",
						"ஒன்றிணை உருவாக்கு மேம்படு.",
						"కలిసి పనిచేయండి ఆవిష్కరించండి మార్పు తేడి రండి."
					]}
					morphTime={1}
					cooldownTime={3}
					className="font-bold text-4xl md:text-5xl lg:text-6xl text-center text-white relative z-10 whitespace-wrap inline-block mx-auto w-full"
				/>
			</div>
		),
		description: "Rareminds invites State Skill Development Missions (SSDMs), education departments,universities, \n& public sector initiatives to explore high-impact collaborations tailored for local needs."
	},
	{
		bg: "url('/Govt-Images/banner1.JPG')",
		title: (
			<div className="w-full flex items-center justify-center min-h-[20px]">
				<GooeyText
					texts={[
						"ಸಹಕಾರ ನೀಡಿ. ಹೊಸದಾಗಿ ಯೋಚಿಸಿ. ಪರಿವರ್ತನೆ ತಂದುಕೊಳ್ಳಿ",
						"सहकार्य गरौं। नवप्रवर्तन गरौं। रूपान्तरण गरौं।",
						"সহযোগ কৰক। নতুনত্ব আনক। পৰিবৰ্তন আনক।",
						"सहकार्य करा. नवे निर्माण करा. परिवर्तन घडवा."
					]}
					morphTime={1}
					cooldownTime={3}
					className="font-bold text-4xl md:text-5xl lg:text-6xl text-center text-white relative z-10 whitespace-wrap inline-block mx-auto w-full"
				/>
			</div>
		),
		description: "Rareminds invites State Skill Development Missions (SSDMs), education departments,universities, \n& public sector initiatives to explore high-impact collaborations tailored for local needs."
	},
	{
		bg: "url('/Govt-Images/banner1.JPG')",
		title: (
			<div className="w-full flex items-center justify-center min-h-[20px]">
				<GooeyText
					texts={[
						"সহযোগ করুন. নতুন চিন্তা করুন. রূপান্তর করুন.",
						"સહયોગ કરો. નવીનતા લાવો. રૂપાંતર લાવો.",
						"ਸਹਿਯੋਗ ਕਰੋ. ਨਵੀਨਤਾ ਲਿਆਓ. ਬਦਲਾਅ ਲਿਆਓ.",
						"Collaborate. Innovate. Transform."
					]}
					morphTime={1}
					cooldownTime={3}
					className="font-bold text-4xl md:text-5xl lg:text-6xl text-center text-white relative z-10 whitespace-wrap inline-block mx-auto w-full"
				/>
			</div>
		),
		description: "Rareminds invites State Skill Development Missions (SSDMs), education departments,universities, \n& public sector initiatives to explore high-impact collaborations tailored for local needs."
	},
	
];

const variants = {
	enter: (direction: number) => ({
		x: direction > 0 ? window.innerWidth : -window.innerWidth,
		opacity: 0,
		zIndex: 0,
		scale: 0.95,
		transition: {
			x: { type: "spring", stiffness: 200, damping: 25 },
			opacity: { duration: 0.3 },
			scale: { duration: 0.3 },
		},
	}),
	center: {
		x: 0,
		opacity: 1,
		zIndex: 1,
		scale: 1, // Ensure scale returns to normal
		transition: {
			x: { type: "spring", stiffness: 300, damping: 30 },
			opacity: { duration: 0.4 },
			scale: { duration: 0.4 },
		},
	},
	exit: (direction: number) => ({
		x: direction < 0 ? 1000 : -1000,
		opacity: 0,
		zIndex: 0,
		scale: 0.9, // Add scale effect for smoother exit
		transition: {
			x: { type: "spring", stiffness: 300, damping: 30 },
			opacity: { duration: 0.4 },
			scale: { duration: 0.4 },
		},
	}),
};

export const HeroSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [autoPlay] = useState(true);
	const [direction, setDirection] = useState(0);
	const slideIndex = wrap(0, heroSlides.length, currentSlide);  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide(currentSlide + newDirection);
  };

	// Function to handle circular array indexing
	function wrap(min: number, max: number, v: number) {
		const rangeSize = max - min;
		return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
	}

	useEffect(() => {
		// Optimize animations for mobile
		const isMobile = window.innerWidth < 768;
		const interval = autoPlay ? setInterval(() => {
			paginate(1);
		}, isMobile ? 8000 : 12000) : null; // Shorter interval on mobile
		
		return () => {
			if (interval) clearInterval(interval);
		};
	}, [autoPlay, currentSlide]);

	const scrollToGovOutcome = () => {
		const el = document.getElementById("feature-section");
		if (el) {
			// Smoother scroll on mobile
			const isMobile = window.innerWidth < 768;
			el.scrollIntoView({ 
				behavior: "smooth",
				block: isMobile ? "start" : "center" 
			});
		}
	};

	return (
		<section className="fixed inset-0 h-[85%] md:h-[93%] flex items-center overflow-hidden flex-col sm:flex-row">
			<AnimatePresence initial={false} custom={direction} mode="popLayout">
				<motion.div
					key={slideIndex}
					custom={direction}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					className="absolute inset-0 will-change-transform translate-z-0"
					style={{
						backfaceVisibility: 'hidden',
						WebkitBackfaceVisibility: 'hidden',
						transform: 'translateZ(0)'
					}}
				>
					<motion.div
						className="min-h-screen w-full bg-cover bg-center flex items-center justify-center sm:justify-start"
						style={{
							backgroundImage: heroSlides[slideIndex].bg,
						}}
						initial={{ scale: 1.1 }}
						animate={{ scale: 1 }}
						exit={{ scale: 1.1 }}
						transition={{ duration: 1.2, ease: "easeOut" }}
					>
						{/* Overlay with fade effect */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.6 }}
							className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
						/>

						{/* Content */}
						<div className="relative w-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 text-white max-w-7xl mx-auto z-10">
							<motion.h1
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -30 }}
								transition={{ duration: 0.6, ease: "easeOut" }}
								className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-4 text-center w-full"
							>
								{typeof heroSlides[slideIndex].title === 'string' ? (
									heroSlides[slideIndex].title
								) : (
									heroSlides[slideIndex].title
								)}
								<br />
							</motion.h1>

							<motion.p
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -30 }}
								transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
								className="text-sm sm:text-base md:text-lg text-gray-100 mb-6 sm:mb-8 text-center whitespace-pre-line max-w-4xl"
							>
								{heroSlides[slideIndex].description}
							</motion.p>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -30 }}
								transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
								className="flex text-xs md:text-base flex-wrap gap-2 sm:gap-4 justify-center"
							>
								<ParticleButton 
									className="flex  items-center p-2 md:px-4  md:py-2  bg-red-500/80 backdrop-blur rounded-full text-white shadow-sm shadow-red-400 border-2 border-red-300 hover:bg-red-600 transition-colors"
									successDuration={1200}
									size={"lg"}
									particleColor="#ffffff"
									particleSize={7}
								>
									<Eye className="h-5 sm:h-6 w-5 sm:w-6 mr-2" />
									View Our Government Training Portfolio
								</ParticleButton>
								<button className="flex items-center bg-white/80 hover:bg-white transition-colors px-4 sm:px-6 py-2 sm:py-3 backdrop-blur rounded-full shadow-sm shadow-white border-2 border-black/70 text-black">
									<Calendar className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
									Schedule a Strategy Call
								</button>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			</AnimatePresence>

			{/* Navigation Controls with fade effect */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 md:flex flex-col items-center gap-2 sm:gap-4 z-50 bg-black/20 px-2 py-3 sm:py-4 rounded-full hidden"
			>
				{heroSlides.map((_, index) => (
					<button
						key={index}
						onClick={() => {
							setDirection(index > slideIndex ? 1 : -1);
							setCurrentSlide(index);
						}}
						className={`w-2 sm:w-3 transition-all duration-300 rounded-full ${
							slideIndex === index
								? "bg-white h-4 sm:h-6 shadow-lg shadow-white/30"
								: "bg-white/50 hover:bg-white/70 h-2 sm:h-3"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
					
				))}
			</motion.div>

			{/* Scroll Down Icon */}
			<div className="absolute bottom-2 md:bottom-6 left-10 sm:left-20 md:left-32 flex flex-col items-center z-50 animate-pulse bg-white/90 p-1 sm:p-2 backdrop-blur-sm shadow-md shadow-red-600 ring-2 sm:ring-4 ring-white/50 rounded-full"
			onClick={scrollToGovOutcome}
			>
				<img
					src="https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Hero/scroll.png"
					width="40" style={{ width: '60px' }}
					alt="Scroll down"
					className="animate-spin-slow"
				/>
				<ArrowDown
					size={30}
					className=" absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 cursor-pointer"
					onClick={scrollToGovOutcome}
				/>
			</div>
			
		</section>
	);
};
