import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

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

const FooterBar = () => {
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

	const submitSubscription = () => {
		if (subscriberEmail) {
			if (!/(.+)@(.+){2,}\.(.+){2,}/.test(subscriberEmail)) {
				setSuccessMessage("Enter a valid email address");
			} else {
				setSuccessMessage("Thank you for subscribing");
				// if (subscribeInput.current) subscribeInput.current.value = "";
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

	// Determine if current page is corporate
	const isCorporate = window.location.pathname.startsWith("/corporate");

	return (
		<div
			className="relative bg-[url('https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/general/footer.webp')] text-white font-medium"
			id="footer"
		>
			<div className="absolute w-full h-full bg-black/90"></div>
			<div
				className="relative lg:px-14 grid lg:grid-cols-5 grid-cols-1 gap-4 container mx-auto py-12"
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
								to="/institutions"
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
								to="/academia"
								className="hover:text-red-400 transition-colors"
							>
								Academia
							</Link>
						</li>
					</ul>
				</div>

				{/* Our Services Section */}
				<div>
					<h2 className="font-bold mb-4 uppercase tracking-wider text-lg">
						Our Services
					</h2>
					<ul className="space-y-3">
						{isCorporate ? (
							<>
								<li>
									<Link
										to="/corporate/recruitment/services/interview-as-a-service"
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
									<a
										href="/corporate#services"
										onClick={handleViewAll}
										className="hover:text-red-400 transition-colors font-semibold cursor-pointer"
									>
										View All
									</a>
								</li>
							</>
						) : (
							serviceData?.serviceData?.map((ele: any) => (
								<li key={ele.ContentSlug}>
									<Link
										to={`/${ele.ContentSlug}`}
										className="hover:text-red-400 transition-colors"
									>
										{ele.Heading1}
									</Link>
								</li>
							))
						)}
					</ul>
				</div>

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
								href="mailto:info@rareminds.com"
								className="ml-2 text-sm hover:text-red-400 transition-colors inline-block"
							>
								info@rareminds.com
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
