import { useState, useEffect } from "react";
import { Calendar, ArrowDown, Eye, ChevronLeft, ChevronRight } from "lucide-react";
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
					className="font-bold text-4xl md:text-5xl lg:text-6xl text-center text-white relative z-10 whitespace-nowrap inline-block mx-auto w-full"
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
					className="font-bold text-4xl md:text-5xl lg:text-6xl text-center text-white relative z-10 whitespace-nowrap inline-block mx-auto w-full"
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
					className="font-bold text-4xl md:text-5xl lg:text-6xl text-center text-white relative z-10 whitespace-nowrap inline-block mx-auto w-full"
				/>
			</div>
		),
		description: "Rareminds invites State Skill Development Missions (SSDMs), education departments,universities, \n& public sector initiatives to explore high-impact collaborations tailored for local needs."
	},
	
];

const variants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 1000 : -1000,
		opacity: 0,
		zIndex: 0,
	}),
	center: {
		x: 0,
		opacity: 1,
		zIndex: 1,
		transition: {
			x: { type: "spring", stiffness: 300, damping: 30 },
			opacity: { duration: 0.4 }
		}
	},
	exit: (direction: number) => ({
		x: direction < 0 ? 1000 : -1000,
		opacity: 0,
		zIndex: 0,
		transition: {
			x: { type: "spring", stiffness: 300, damping: 30 },
			opacity: { duration: 0.4 }
		}
	})
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
		let interval: NodeJS.Timeout;
		if (autoPlay) {
			interval = setInterval(() => {
				paginate(1);
			}, 12000);
		}
		return () => clearInterval(interval);
	}, [autoPlay, currentSlide]);

	const scrollToGovOutcome = () => {
		const el = document.getElementById("feature-section");
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section className="fixed inset-0 h-[93%] flex items-center overflow-hidden">
			<AnimatePresence initial={false} custom={direction} mode="popLayout">
				<motion.div
					key={slideIndex}
					custom={direction}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					className="absolute inset-0 will-change-transform"
				>
					<motion.div
						className="min-h-screen w-full bg-cover bg-center flex items-center"
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
						<div className="relative w-full flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 text-white max-w-7xl mx-auto z-10">
							<motion.h1
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -30 }}
								transition={{ duration: 0.6, ease: "easeOut" }}
								className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-4 text-center w-full"
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
								className="text-sm md:text-lg text-gray-100 mb-8 text-center whitespace-pre-line max-w-4xl"
							>
								{heroSlides[slideIndex].description}
							</motion.p>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -30 }}
								transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
								className="flex flex-wrap gap-4 justify-center"
							>
								<ParticleButton 
									className="flex items-center px-6 py-3 bg-red-500/80 backdrop-blur rounded-full text-white shadow-sm shadow-red-400 border-2 border-red-300 hover:bg-red-600  transition-colors "
									successDuration={1200}
									size={"lg"}
									particleColor="#ffffff"
									particleSize={7}
								>
									<Eye className="h-6 w-6 mr-2" />
									View Our Government Training Portfolio
								</ParticleButton>
								<button className="flex items-center  bg-white/80 hover:bg-white  transition-colors px-6 py-3  backdrop-blur rounded-full  shadow-sm shadow-white border-2 border-black/70 text-black ">
									<Calendar className="h-5 w-5 mr-2" />
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
				className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-50 bg-black/20 px-2 py-4 rounded-full"
			>
				{heroSlides.map((_, index) => (
					<button
						key={index}
						onClick={() => {
							setDirection(index > slideIndex ? 1 : -1);
							setCurrentSlide(index);
						}}
						className={`w-2 transition-all duration-300 rounded-full ${
							slideIndex === index
								? "bg-white h-6 shadow-lg shadow-white/30"
								: "bg-white/50 hover:bg-white/70 h-2"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
					
				))}
			</motion.div>

			{/* Scroll Down Icon */}
			
			<button
				onClick={scrollToGovOutcome}
				className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce cursor-pointer outline-none z-50 bg-black/20 px-4 py-2 rounded-full hover:bg-black/40 transition-colors"
				aria-label="Scroll down"
			>
				<ArrowDown size={32} className="text-white drop-shadow-lg" />
				<span className="text-white text-xs mt-1 font-medium drop-shadow-lg">Scroll</span>
			</button>
		</section>
	);
};
