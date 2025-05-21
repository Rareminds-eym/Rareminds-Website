import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Award, CheckCheck } from "lucide-react";
import { Icon } from "@iconify/react";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

const caseStudies = [
	{
		title: "Ace Engineering, Bangalore",
		subtitle: "Skilled Blue-Collar to Mid-Level: Talent that Fits",
		client: "Ace Engineering – a growing industrial and manufacturing company in Bangalore.",
		challenge:
			"Hiring requirements spanned across completely different skill levels: A Skilled Painter for immediate factory deployment, A Purchase Engineer with cost optimization and vendor management experience.",
		solution: [
			"Ran dual-track sourcing: one for blue-collar recruitment via local skill networks, another for mid-level technical sourcing.",
			"Matched candidates not just on skill, but attitude and reliability.",
			"Fast-tracked selection with skill validation and real-time coordination.",
		],
		outcomes: [
			"Rajesh Mahato onboarded as Skilled Painter on 29th Aug 2024",
			"Mohan Kumar was placed as Purchase Engineer on 15th Oct 2024",
			"Both roles were filled within tight deadlines",
			"Reinforced client operations with minimal downtime",
		],
		testimonial:
			"It’s rare to find one partner who gets both factory-floor and white-collar hiring right. Rareminds did.",
		author: "Hiring Manager, Ace Engineering",
	},
	{
		title: "GoldenSource",
		subtitle: "Strategic FinTech Hires in a High-Growth Phase",
		client: "Golden Source– A global leader in data management software for financial services, with headquarters in New York and global offices including Mumbai.",
		challenge:
			"GoldenSource needed skilled Implementation Specialists in Mumbai to support rapid growth post-acquisition and meet global client delivery timelines.",
		solution: [
			"Sourced candidates with deep experience in data management, fintech workflows, and client-facing tech roles.",
			"Conducted skill and culture-fit screening tailored to the collaborative and international environment.",
			"Accelerated hiring timelines to match project pipeline and internal onboarding cycles.",
		],
		outcomes: [
			"Nitesh Parmar joined as Implementation Specialist on 3rd June 2024 – Mumbai",
			"Jeffin Phillip joined as Implementation Specialist on 18th July 2024 – Mumbai",
			"Enabled seamless onboarding during a critical delivery window",
			"Matched talent with both domain: skill and cultural alignment",
		],
		testimonial:
			"Rareminds understood our niche requirements and delivered with precision. The hires have already made an impact on client delivery.",
		author: "Talent Acquisition Partner, GoldenSource",
	},
	{
		title: "Park Controls and Communication (PCC)",
		subtitle: "Three Critical Hires, One Seamless Strategy",
		client:
			"Park Controls and Communication (PCC) – a precision engineering company requiring fast-track recruitment.",
		challenge:
			"PCC urgently needed to close three vital positions: Jr. Secretarial Assistant, Sr. Secretarial, and Technical Assistant with project-critical deadlines.",
		solution: [
			"Mobilized our trained candidate network within 24 hours.",
			"Conducted focused assessments and aligned panel interviews swiftly.",
			"Ensured offers were rolled out to all three candidates by 10th Feb 2025.",
		],
		outcomes: [
			"All 3 positions joined within 40 days",
			"100% offer-to-join ratio",
			"Positions filled without compromising quality or timelines",
		],
		testimonial:
			"The Rareminds team was exceptionally agile. They understood our requirement and delivered not just fast, but right.",
		author: "HR Lead, PCC",
	},
	{
		title: "Plastic for Change (PFC)",
		subtitle: "Niche Hire for a Mission-Driven Role in Under 30 Days",
		client:
			"Plastic for Change (PFC) – a sustainability-focused organization with unique talent needs.",
		challenge:
			"Find and onboard a Manager – BD (Merchandise) who aligned with sustainability, had ethical sales experience, and could grow mission-driven merchandise.",
		solution: [
			"Activated outreach to candidates from social impact networks and green startups.",
			"Screened for cultural fit, sales experience, and mission-alignment.",
			"Concluded all interviews and offer processes by 10th July 2024.",
		],
		outcomes: [
			"27 days from JD to Joining",
			"Boosted BD outreach by 20% within the first month",
			"Elevated brand trust with the right face representing their cause",
		],
		testimonial:
			"For a role that needed both heart and hustle, Rareminds delivered someone perfect.",
		author: "CEO, PFC",
	},
	{
		title: "Bharat Serums – Global Leadership Hires, Across 3 Continents",
		subtitle: "Global Success, Seamlessly Delivered",
		client:
			"Bharat Serums and Vaccines Ltd. (BSV) – a biopharmaceutical leader accelerating global expansion across the US, Russia, Southeast Asia, and Africa.",
		challenge:
			"BSV needed to urgently place multiple Country Managers across high-potential yet challenging international markets. Each location demanded not just domain expertise, but deep cultural and regulatory adaptability and competence.",
		solution: [
			"Deployed global search strategies customized to each region.",
			"Activated international talent pipelines across Africa, South America, and Central Asia.",
			"Assessed candidates for pharma leadership, market penetration skills, and local alignment.",
			"Orchestrated cross-time-zone panel interviews with precision coordination.",
		],
		outcomes: [
			"Prince Singh – Country Manager, Angola – Joined 5th Aug 2024",
			"Mohsin Qureshi – Country Manager, Senegal – Joined 7th May 2024",
			"Jay Bhattacharya – Country Manager, Kazakhstan – Joined 11th Nov 2024",
			"Simone Xella de Oliva – Country Lead, Brazil – Joining 23rd May 2025",
			"Prakash Om Jaiswal – Country Manager, Cameroon – Joining 16th June 2025",
			"Expansion enabled across 5 strategic international markets",
			"Strengthened BSV’s leadership footprint across Africa, Central Asia, and South America",
			"Maintained time-to-join benchmarks despite cross-border complexities",
		],
		testimonial:
			"These were mission-critical roles in unfamiliar markets, but Rareminds made it feel effortless.",
		author: "Global HR Head, Bharat Serums",
	},
];

const CaseStudiesSection = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "center" });

	const handlePrev = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
	}, [emblaApi]);

	const handleNext = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
	}, [emblaApi]);

	return (
		<section
			id="case-studies"
			className="section py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden bg-white"
		>
			<div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00TTE2IDI0YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNCIvPjwvZz48L2c+PC9zdmc+')]"></div>

			<div className="container lg:px-14 mx-auto relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-12"
				>
					<div className="bg-corporate-black text-white w-16 h-16 rounded-[25px] mx-auto mb-4 flex items-center justify-center transform rotate-6">
						<Award size={32} />
					</div>
					<h2 className="text-3xl md:text-5xl font-bold mb-4 text-corporate-black">
						Proven Impact, Delivered
					</h2>
					<p className="text-corporate-grey max-w-3xl mx-auto text-lg">
						Real stories. Real results. See how our recruitment solutions
						transform businesses.
					</p>
				</motion.div>

				<div className="relative">
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex">
							{caseStudies.map((currentCase, idx) => (
								<div
									key={`case-${idx}`}
									className="flex-[0_0_100%] px-2 md:px-6"
								>
									<div className="bg-white rounded-3xl overflow-hidden border border-corporate-black/40 w-full max-w-6xl mx-auto">
										<div className="grid grid-cols-1 lg:grid-cols-3 min-h-[70vh]">
											{/* Left Panel - Image & Stats */}
											<div className="bg-gradient-to-br from-corporate-purple to-corporate-purple/60 text-white p-8 flex flex-col justify-between">
												<div>
													<motion.div
														key={`case-title-${idx}`}
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.5 }}
														className="mb-8"
													>
														<h3 className="text-2xl font-bold mb-2 flex items-center">
															<span className="mr-2 bg-white min-w-8 min-h-8 rounded-full flex items-center justify-center text-[#7d64ff]">
																{idx + 1}
															</span>
															{currentCase.title}
														</h3>
														<p className="">{currentCase.subtitle}</p>
													</motion.div>

													<div className="space-y-4">
														<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-h-40 overflow-y-auto modern-scrollbar">
															<TrendingUp size={24} className="mb-2" />
															<h4 className="font-semibold mb-1">Key Outcomes</h4>
															<ul className="space-y-2">
																{currentCase.outcomes.map((outcome, i) => (
																	<motion.li
																		key={`outcome-${idx}-${i}`}
																		initial={{ opacity: 0, x: -10 }}
																		animate={{ opacity: 1, x: 0 }}
																		transition={{ duration: 0.3, delay: i * 0.1 }}
																		className="flex items-start gap-2"
																	>
																		<CheckCheck
																			size={18}
																			className="mt-1 flex-shrink-0"
																		/>
																		<span className="text-sm">{outcome}</span>
																	</motion.li>
																))}
															</ul>
														</div>
													</div>
												</div>

												<div>
													<blockquote className="border-l-4 border-s-[#7d64ff] pl-4 italic mt-5">
														"{currentCase.testimonial}"
													</blockquote>
													<p className="text-right text-sm mt-2">
														— {currentCase.author}
													</p>
												</div>
											</div>

											{/* Right Panel - Case Study Details */}
											<div className="col-span-2 p-8">
												<div className="grid grid-cols-1 h-full gap-6">
													<motion.div
														key={`client-${idx}`}
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.4 }}
														className="bg-corporate-black/5 p-6 rounded-xl border border-corporate-primary-light/20 max-h-32 overflow-y-auto modern-scrollbar"
													>
														<h4 className="text-corporate-black font-bold mb-3 flex items-center gap-2">
															<span className="bg-[#7d64ff]/10 p-2 mr-1 rounded-lg">
																<Icon
																	icon="formkit:people"
																	width="20"
																	height="20"
																/>
															</span>
															Client
														</h4>
														<p className="text-gray-700">
															{currentCase.client}
														</p>
													</motion.div>

													<motion.div
														key={`challenge-${idx}`}
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.4, delay: 0.1 }}
														className="bg-corporate-black/5 p-6 rounded-xl border border-corporate-primary-light/20 max-h-32 overflow-y-auto modern-scrollbar"
													>
														<h4 className="text-corporate-black font-bold mb-3 flex items-center gap-2">
															<span className="bg-[#7d64ff]/10 p-2 mr-1 rounded-lg">
																<Icon
																	icon="ant-design:aim-outlined"
																	width="20"
																	height="20"
																/>
															</span>
															Challenge
														</h4>
														<p className="text-gray-700">
															{currentCase.challenge}
														</p>
													</motion.div>

													<motion.div
														key={`solution-${idx}`}
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.4, delay: 0.2 }}
														className="bg-corporate-black/5 p-6 rounded-xl flex flex-col justify-between border border-corporate-primary-light/20 max-h-40 overflow-y-auto modern-scrollbar"
													>
														<div>
															<h4 className="text-corporate-black font-bold mb-3 flex items-center gap-2">
																<span className="bg-[#7d64ff]/10 p-2 mr-1 rounded-lg">
																	<Icon
																		icon="hugeicons:idea-01"
																		width="20"
																		height="20"
																	/>
																</span>
																Rareminds Solution
															</h4>
															<ul className="space-y-3 mt-5">
																{currentCase.solution.map((step, i) => (
																	<li
																		key={`solution-${idx}-${i}`}
																		className="flex items-start gap-3"
																	>
																		<CheckCircle
																			className="text-corporate-black mt-1 flex-shrink-0"
																			size={18}
																		/>
																		<span className="text-gray-700">
																			{step}
																		</span>
																	</li>
																))}
															</ul>
														</div>
													</motion.div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="flex justify-center gap-4 mt-8">
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={handlePrev}
							className="bg-white text-corporate-black hover:bg-gray-50 px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 group"
						>
							<Icon
								icon="ph:arrow-left"
								width="24"
								height="24"
								className="group-hover:-translate-x-1 transition-transform duration-300"
							/>
							<span>Previous</span>
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={handleNext}
							className="bg-white text-corporate-black hover:bg-gray-50 px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 group"
						>
							<span>Next</span>
							<Icon
								icon="ph:arrow-right"
								width="24"
								height="24"
								className="group-hover:translate-x-1 transition-transform duration-300"
							/>
						</motion.button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CaseStudiesSection;
