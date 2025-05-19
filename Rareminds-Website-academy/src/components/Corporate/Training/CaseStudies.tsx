import { motion } from "framer-motion";
import { Building2, Factory, Building } from "lucide-react";

const caseStudies = [
	{
		icon: Building2,
		title: "Toyota Kirloskar Motors",
		details: "5,000+ ITI graduates trained across 3E Model",
		stats: [
			{ label: "Placement Success", value: "+42%" },
			{ label: "Training Completion", value: "98%" },
		],
		color: "from-blue-500 to-indigo-600",
	},
	{
		icon: Factory,
		title: "Tier-2 Auto Component Manufacturer",
		details: "21-day Retention Bootcamp Implementation",
		stats: [
			{ label: "Attrition Reduction", value: "-36%" },
			{ label: "Productivity Increase", value: "+28%" },
		],
		color: "from-purple-500 to-pink-600",
	},
	{
		icon: Building,
		title: "Mid-Sized IT Firm",
		details: "4-level Leadership Development Program",
		stats: [
			{ label: "Team Leads Promoted", value: "18" },
			{ label: "Program Duration", value: "6 mo" },
		],
		color: "from-emerald-500 to-teal-600",
	},
];

export default function CaseStudies() {
	return (
		<section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center mb-12 sm:mb-16 lg:mb-20"
				>
					<h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
						We Don&apos;t Do Brochures. We Do Breakthroughs.
					</h1>
					<p className="text-base sm:text-lg text-gray-600 mx-auto max-w-2xl">
						Corporate to Campus to Shop Floor. We Speak Everyone&apos;s Language.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
					{caseStudies.map((study, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: index * 0.2 }}
							className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
						>
							<div
								className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
							/>

							<div className="relative p-6 sm:p-8">
								<div className="flex items-start justify-between mb-6">
									<study.icon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-700 group-hover:text-white transition-colors duration-300" />
								</div>

								<h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 group-hover:text-white transition-colors duration-300">
									{study.title}
								</h3>

								<p className="text-sm sm:text-base text-gray-600 group-hover:text-white/90 transition-colors duration-300 mb-6">
									{study.details}
								</p>

								<div className="grid grid-cols-2 gap-4 mt-auto">
									{study.stats.map((stat, idx) => (
										<div key={idx} className="space-y-1">
											<p className="text-xs text-gray-500 group-hover:text-white/70 transition-colors duration-300">
												{stat.label}
											</p>
											<p className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">
												{stat.value}
											</p>
										</div>
									))}
								</div>
							</div>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center mt-12 sm:mt-16"
				>
					<a
						href="#contact"
						className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors duration-300"
					>
						Get Full Case Studies
					</a>
				</motion.div>
			</div>
		</section>
	);
}
