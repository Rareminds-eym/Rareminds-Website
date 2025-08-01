import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

const socialIcons = [
	{
		id: 1,
		icon: Facebook,
		link: "https://www.facebook.com/raremindsgroup",
		label: "Facebook",
	},
	{
		id: 2,
		icon: "ri:twitter-x-fill",
		link: "https://x.com/minds_rare",
		label: "X (Twitter)",
	},
	{
		id: 3,
		icon: Instagram,
		link: "https://www.instagram.com/rareminds_eym/",
		label: "Instagram",
	},
	{
		id: 4,
		icon: Youtube,
		link: "https://www.youtube.com/channel/UClkBtwJsScYxFzNoFdlifeA",
		label: "YouTube",
	},
	{
		id: 5,
		icon: Linkedin,
		link: "https://www.linkedin.com/company/rareminds/",
		label: "LinkedIn",
	},
];

interface FooterBarProps {
	hideServices?: boolean;
}

const FooterBar: React.FC<FooterBarProps> = ({ hideServices }) => {
	const [serviceData, setServiceData] = useState<any>({});
	const [subscriberEmail, setSubscriberEmail] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const userType = localStorage.getItem("currentUserType");
	const navigate = useNavigate();

	useEffect(() => {
		// Mock data instead of API call
		const mockServiceData = {
			serviceData: [
				{ ContentSlug: "recruitment", Heading1: "Recruitment" },
				{ ContentSlug: "executive-search", Heading1: "Executive Search" },
				{ ContentSlug: "contract-staffing", Heading1: "Contract Staffing" },
				{ ContentSlug: "talent-assessment", Heading1: "Talent Assessment" },
			],
		};
		setServiceData(mockServiceData);
	}, [userType]);

	const submitSubscription = async () => {
		if (subscriberEmail) {
			if (!/(.+)@(.+){2,}\.(.+){2,}/.test(subscriberEmail)) {
				setSuccessMessage("Enter a valid email address");
			} else {
				try {
					// Insert email and submitted_at into Supabase table 'footer_email'
					const { error } = await supabase
						.from("footer_email")
						.insert([
							{ email: subscriberEmail, submitted_at: new Date().toISOString() }
						]);
					if (error) {
						setSuccessMessage("Error subscribing. Please try again.");
					} else {
						setSuccessMessage("Thank you for subscribing");
					}
				} catch (err) {
					setSuccessMessage("Error subscribing. Please try again.");
				}
				setTimeout(() => setSuccessMessage(null), 2000);
			}
		} else {
			setSuccessMessage("Please enter an email address");
		}
	};
	// Handler for 'View All' click in corporate services
	const handleViewAll = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		e.preventDefault();
		navigate("/corporate/recruitment");
		// Wait for navigation to complete before scrolling
		setTimeout(() => {
			const el = document.getElementById("services");
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
			}
		}, 350);
	};

	// Determine if current page is corporate or corporate training
	const isCorporate = window.location.pathname.startsWith("/corporate/recruitment");
	const isCorporateTraining = window.location.pathname.startsWith("/corporate/training");
	const Academia  = window.location.pathname.startsWith("/school");


	return (
		<div
			className="relative bg-[url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/general/footer.webp')] text-white font-medium"
			id="footer"
		>
			<div className="absolute w-full h-full bg-black/90"></div>
			<div
				className={`relative lg:px-14 grid container mx-auto py-12 gap-4 ${hideServices ? 'lg:grid-cols-4 grid-cols-1' : 'lg:grid-cols-5 grid-cols-1'}`}
			>
				{/* Links Section */}
				<div>
					<h2 className="font-bold mb-4 uppercase tracking-wider text-lg">
						Quick Links
					</h2>
					<ul className="space-y-3">
						<li>
							<Link
								to="/"
								className="hover:text-red-400 transition-colors"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/about"
								className="hover:text-red-400 transition-colors"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								to="/contact-us"
								className="hover:text-red-400 transition-colors"
							>
								Contact
							</Link>
						</li>
					</ul>
				</div>

				{/* Verticals Section */}
				<div>
					<h2 className="font-bold mb-4 uppercase tracking-wider text-lg">
						Verticals
					</h2>
					<ul className="space-y-3">
						<li>
							<Link
								to="/corporate/recruitment"
								className="hover:text-red-400 transition-colors"
							>
								Corporate
							</Link>
						</li>
						<li>
							<Link
								to="/universities"
								className="hover:text-red-400 transition-colors"
							>
								Institutions
							</Link>
						</li>
						<li>
							<Link
								to="/government"
								className="hover:text-red-400 transition-colors"
							>
								Government
							</Link>
						</li>
						<li>
							<Link
								to="/school"
								className="hover:text-red-400 transition-colors"
							>
								Academia
							</Link>
						</li>
					</ul>
				</div>

				{/* Our Services Section */}
				{!hideServices && (
				<div>
					<h2 className="font-bold mb-4 uppercase tracking-wider text-lg">
						Our Services
					</h2>
					<ul className="flex flex-wrap gap-x-6 gap-y-2 items-center">
						{window.location.pathname.startsWith("/government") ? (
							<>
								<li>
									<Link
										to="/school/projects/"
										className="hover:text-red-400 transition-colors"
									>
										Skilling & Building Capacity
									</Link>
								</li>
							</>
						) : isCorporateTraining ? (
							<>
								<li>
									<Link
										to="/corporate/training/services/workplace-productivity"
										className="hover:text-red-400 transition-colors"
									>
										Workplace Productivity & Digital Fluency
									</Link>
								</li>
								<li>
									<Link
										to="/corporate/training/services/tech-upskilling"
										className="hover:text-red-400 transition-colors"
									>
										Tech Upskilling & Future Skills
									</Link>
								</li>
								<li>
									<Link
										to="/corporate/training/services/behavioral-culture"
										className="hover:text-red-400 transition-colors"
									>
										Behavioral & Organizational Culture Programs
									</Link>
								</li>
								<li>
									<Link
										to="/corporate/training"
										onClick={(e) => {
											e.preventDefault();
											navigate("/corporate/training");
											setTimeout(() => {
												const el = document.getElementById("services");
												if (el) {
													el.scrollIntoView({ behavior: "smooth" });
												}
											}, 350);
										}}
										className="hover:text-red-400 transition-colors font-semibold cursor-pointer"
									>
										View All
									</Link>
								</li>
							</>
						) : isCorporate ? (
							<>
								<li>
									<Link
										to="/corporate/recruitment/services/Interview-as-a-service"
										className="hover:text-red-400 transition-colors"
									>
										Interview-as-a-service
									</Link>
								</li>
								<li>
									<Link
										to="/corporate/recruitment/services/diversity-hiring"
										className="hover:text-red-400 transition-colors"
									>
										Diversity Hiring
									</Link>
								</li>
								<li>
									<Link
										to="/corporate/recruitment/services/pre-onboarding-support"
										className="hover:text-red-400 transition-colors"
									>
										Pre-Onboarding Support
									</Link>
								</li>
								<li>
									<Link
										to="/corporate/recruitment#services"
										onClick={handleViewAll}
										className="hover:text-red-400 transition-colors font-semibold cursor-pointer"
									>
										View All
									</Link>
								</li>
							</>
						) 
						: Academia ? (
							<ul className="space-y-3">
								<li>
									<Link
										to="/school/teacher"
										className="hover:text-red-400 transition-colors"
									>
										School
									</Link>
								</li>
								<li>
									<Link
										to="/school/student"
										className="hover:text-red-400 transition-colors"
									>
										Student
									</Link>
								</li>
							</ul>
						) : window.location.pathname.startsWith("/universities/fdp") ? (
							<>
								<li>
									<Link
										to="/universities/fdp/skill-development"
										className="hover:text-red-400 transition-colors"
									>
										Skill Dev Programs
									</Link>
								</li>
								<li>
									<Link
										to="/universities/fdp/faculty-development"
										className="hover:text-red-400 transition-colors"
									>
										Faculty Dev Programs (FDPs)
									</Link>
								</li>
								<li>
									<Link
										to="/universities/fdp/leadership"
										className="hover:text-red-400 transition-colors"
									>
										Leadership & Workshops
									</Link>
								</li>
							</>
						) : window.location.pathname.startsWith("/universities/services") ? (
							<>
								<li>
									<Link
										to="/universities/services/recruitment"
										className="hover:text-red-400 transition-colors"
									>
										Recruitment Placement
									</Link>
								</li>
								<li>
									<Link
										to="/universities/services/curriculum"
										className="hover:text-red-400 transition-colors"
									>
										Curriculum Integration
									</Link>
								</li>
								<li>
									<Link
										to="/universities/services/digital-labs"
										className="hover:text-red-400 transition-colors"
									>
										Digital Labs & LMS
									</Link>
								</li>
								<li>
									<Link
										to="/universities/services/accreditation"
									 className="hover:text-red-400 transition-colors"
									>
										Accreditation & Consulting
									</Link>
								</li>
								<li>
									<Link
										to="/universities/services/leadership"
										className="hover:text-red-400 transition-colors"
									>
										Leadership & Workshops
									</Link>
								</li>
							</>
						) : window.location.pathname.startsWith("/universities") ? (
							<>
								<li>
									<Link
										to="/universities/skill-development"
										className="hover:text-red-400 transition-colors"
									>
										Skill Dev Programs
									</Link>
								</li>
								<li>
									<Link
										to="/universities/campus-corporate"
										className="hover:text-red-400 transition-colors"
									>
										Campus to Corporate
									</Link>
								</li>
								<li>
									<Link
										to="/universities/counseling"
										className="hover:text-red-400 transition-colors"
									>
										Student Counseling
									</Link>
								</li>
								<li>
									<Link
										to="/universities/hackathons"
										className="hover:text-red-400 transition-colors"
									>
										Hackathons & Challenges
									</Link>
								</li>
								<li>
									<Link
										to="/universities/recruitment"
										className="hover:text-red-400 transition-colors"
									>
										Recruitment Placement
									</Link>
								</li>
							</>
						) : window.location.pathname.startsWith("/faculty") ? (
							<>
								<li>
									<Link
										to="/faculty/skill-development"
										className="hover:text-red-400 transition-colors"
									>
										Skill Development Programs
									</Link>
								</li>
								<li>
									<Link
										to="/faculty/fdp"
										className="hover:text-red-400 transition-colors"
									>
										Faculty Development Programs (FDPs)
									</Link>
								</li>
								<li>
									<Link
										to="/faculty/leadership"
										className="hover:text-red-400 transition-colors"
									>
										Leadership & Workshops
									</Link>
								</li>
							</>
						) : (
							<>
								<li>
									<Link
										to="/skill-development"
										className="hover:text-red-400 transition-colors"
									>
										Skill Development Programs
									</Link>
								</li>
								<li>
									<Link
										to="/campus-corporate"
									 className="hover:text-red-400 transition-colors"
									>
										Campus to Corporate Training
									</Link>
								</li>
								<li>
									<Link
										to="/counseling"
										className="hover:text-red-400 transition-colors"
									>
										Student Counseling & Mentorship
									</Link>
								</li>
								<li>
									<Link
										to="/hackathons"
										className="hover:text-red-400 transition-colors"
									>
										Hackathons & Challenges
									</Link>
								</li>
								<li>
									<Link
										to="/recruitment"
										className="hover:text-red-400 transition-colors"
									>
										Recruitment Placement Support
									</Link>
								</li>
							</>
						) 
						
						}
					</ul>
				</div>
				)}

				{/* Contact us Section */}
				<div>
					<h2 className="font-bold mb-4 uppercase tracking-wider text-lg">
						Contact Us
					</h2>
					<ul className="space-y-3 text-white/90">
						<li>
							<span className="font-semibold">Phone:</span>
							<a
								href="tel:+919562481100"
								className="ml-2 text-sm hover:text-red-400 transition-colors inline-block"
							>
								+91 95624 81100
							</a>
						</li>
						<li>
							<span className="font-semibold">Email:</span>
							<a
								href="mailto:info@rareminds.in"
								className="ml-2 text-sm hover:text-red-400 transition-colors inline-block"
							>
								info@rareminds.in
							</a>
						</li>
						<li>
							<span className="font-semibold">Location:</span>
							<span className="ml-2 text-sm inline-block">
								Karnataka
							</span>
						</li>
					</ul>
				</div>

				{/* Newsletter Signup Section */}
				<div>
					<h2 className="font-bold mb-4 uppercase tracking-wider text-lg">
						Sign up to our newsletter
					</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							submitSubscription();
						}}
						className="space-y-3"
					>
						<input
							type="email"
							placeholder="Email address"
							className="p-3 w-full bg-rareminds-dark/50 border border-red-400/30 text-black rounded focus:outline-none focus:ring-2 focus:ring-red-500"
							onChange={(e) => {
								setSuccessMessage(null);
								setSubscriberEmail(e.target.value);
							}}
							// ref={subscribeInput}
						/>
						<button
							type="submit"
							className="p-3 w-full bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors"
						>
							SUBSCRIBE
						</button>
					</form>
					{successMessage && (
						<p className="text-white text-center mt-4 bg-red-500/20 p-2 rounded">
							{successMessage}
						</p>
					)}
				</div>
			</div>

			{/* Social Icons */}
			<motion.div
				className="container relative mx-auto flex justify-center space-x-4 py-4"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={{
					hidden: {},
					visible: { transition: { staggerChildren: 0.12 } },
				}}
			>
				{socialIcons.map((social) => {
					if (typeof social.icon === "string") {
						return (
							<motion.a
								key={social.id}
								href={social.link}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={social.label}
								className="bg-gray-800 hover:bg-red-600 transition-colors p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
								variants={{
									hidden: { opacity: 0, y: 24 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											type: "spring",
											stiffness: 300,
											damping: 24,
										},
									},
								}}
								whileHover={{ scale: 1.18, rotate: -6 }}
							>
								<Icon
									icon={social.icon}
									width={20}
									height={20}
									className="text-white"
								/>
							</motion.a>
						);
					} else {
						const IconComponent = social.icon;
						return (
							<motion.a
								key={social.id}
								href={social.link}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={social.label}
								className="bg-gray-800 hover:bg-red-600 transition-colors p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
								variants={{
									hidden: { opacity: 0, y: 24 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											type: "spring",
											stiffness: 300,
											damping: 24,
										},
									},
								}}
								whileHover={{ scale: 1.18, rotate: -6 }}
							>
								<IconComponent size={20} className="text-white" />
							</motion.a>
						);
					}
				})}
			</motion.div>

			{/* Footer Bottom Section */}
			<div className="relative border-t border-gray-700 py-4 text-center text-gray-400">
				<div className="container lg:px-14 mx-auto flex justify-between items-center">
					<p>© {new Date().getFullYear()} Rareminds. All rights reserved.</p>
					<div className="flex space-x-4">
						<Link
							to="/privacy-policy"
							className="hover:text-red-400 transition-colors"
						>
							Privacy Policy
						</Link>
						<Link
							to="/terms"
							className="hover:text-red-400 transition-colors"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FooterBar;
