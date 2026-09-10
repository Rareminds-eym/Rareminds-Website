import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
	const [subscriberEmail, setSubscriberEmail] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const navigate = useNavigate();

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
					const message =
						err instanceof Error
							? err.message
							: typeof err === "string"
								? err
								: "Error subscribing. Please try again.";
					setSuccessMessage(message);
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
			className={`relative bg-[url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/general/footer.webp')] text-white font-medium ${isCorporate || isCorporateTraining ? "footer-corporate" : ""}`}
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
							<li>
								<Link
									to="/school/projects/"
									className="hover:text-red-400 transition-colors"
								>
									Skilling & Building Capacity
								</Link>
							</li>
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
										to="/universities/fdp"
										className="hover:text-red-400 transition-colors"
									>
										Faculty Development Programs
									</Link>
								</li>
								<li>
									<Link
										to="/universities/leadership-career-growth"
										className="hover:text-red-400 transition-colors"
									>
										Leadership & Career Growth
									</Link>
								</li>
								<li>
									<Link
										to="/universities/mental-health-counseling-fdp"
										className="hover:text-red-400 transition-colors"
									>
										Mental Health & Counseling
									</Link>
								</li>
								<li>
									<Link
										to="/universities/domain-specific-programs"
										className="hover:text-red-400 transition-colors"
									>
										Domain Specific Programs
									</Link>
								</li>
								<li>
									<Link
										to="/universities/communication-personality-development"
										className="hover:text-red-400 transition-colors"
									>
										Communication & Personality
									</Link>
								</li>
							</>
						) : window.location.pathname.startsWith("/universities/services") ? (
							<>
								<li>
									<Link
										to="/universities/services"
										className="hover:text-red-400 transition-colors"
									>
										Institutional Services
									</Link>
								</li>
								<li>
									<Link
										to="/universities/communication-personality-development"
										className="hover:text-red-400 transition-colors"
									>
										Communication & Personality
									</Link>
								</li>
								<li>
									<Link
										to="/universities/mental-health-counseling-fdp"
										className="hover:text-red-400 transition-colors"
									>
										Mental Health Counseling
									</Link>
								</li>
								<li>
									<Link
										to="/universities/domain-specific-programs"
										className="hover:text-red-400 transition-colors"
									>
										Domain Specific Programs
									</Link>
								</li>
								<li>
									<Link
										to="/universities/leadership-career-growth"
										className="hover:text-red-400 transition-colors"
									>
										Leadership & Career Growth
									</Link>
								</li>
								<li>
									<Link
										to="/universities/institutional-value-added-services"
										className="hover:text-red-400 transition-colors"
									>
										Value-Added Services
									</Link>
								</li>
							</>
						) : window.location.pathname.startsWith("/universities") ? (
							<>
								<li>
									<Link
										to="/universities#services-section"
										className="hover:text-red-400 transition-colors"
									>
										Student Development Programs
									</Link>
								</li>
								<li>
									<Link
										to="/universities/services"
										className="hover:text-red-400 transition-colors"
									>
										Institutional Services
									</Link>
								</li>
								<li>
									<Link
										to="/universities/fdp"
										className="hover:text-red-400 transition-colors"
									>
										Faculty Development (FDP)
									</Link>
								</li>
								<li>
									<Link
										to="/universities/skill-passport"
										className="hover:text-red-400 transition-colors"
									>
										Skill Passport
									</Link>
								</li>
								<li>
									<Link
										to="/universities/blogs"
										className="hover:text-red-400 transition-colors"
									>
										Institutional Blogs
									</Link>
								</li>
							</>
						) : (
							<>
								<li>
									<Link
										to="/corporate/recruitment"
										className="hover:text-red-400 transition-colors"
									>
										Corporate Recruitment
									</Link>
								</li>
								<li>
									<Link
										to="/corporate/training"
										className="hover:text-red-400 transition-colors"
									>
										Corporate Training
									</Link>
								</li>
								<li>
									<Link
										to="/universities"
										className="hover:text-red-400 transition-colors"
									>
										Universities & Institutions
									</Link>
								</li>
								<li>
									<Link
										to="/universities/fdp"
										className="hover:text-red-400 transition-colors"
									>
										Faculty Development (FDP)
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
							</>
						)}
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
								href="tel:+918296061534"
								className="ml-2 text-sm hover:text-red-400 transition-colors inline-block"
							>
								+91 82960 61534
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
							id="newsletter-email"
							type="email"
							placeholder="Email address"
							aria-label="Email address for newsletter"
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
					<p>© {new Date().getFullYear()} Rareminds Pvt. Ltd. All rights reserved.</p>
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
