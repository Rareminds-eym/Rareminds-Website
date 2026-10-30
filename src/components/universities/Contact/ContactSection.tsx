import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Contact, Mail, MapPin, Phone, PhoneCall, School } from "lucide-react";
import VerticalForm from "@/components/forms/VerticalForm";
import { institutionsForm } from "@/components/forms/verticalForms.config";
import { formatCompanyAddressLine } from "@/constants/companySettings";
import { useCompanySettings } from "@/hooks/useCompanySettings";

const ContactSection = () => {
	const {
		settings: companySettings,
		isLoading: companySettingsLoading,
		errorMessage: companySettingsError,
	} = useCompanySettings();

	return (
		<section
			id="contact-section"
			className="section py-12 relative overflow-hidden bg-gradient-to-br from-blue-50 via-pink-30 to-purple-30 text-gray-800 "
		>
			<div className="container mx-auto px-5">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16 lg:px-14 relative z-10"
				>
					<h1 className="text-xl font-bold mb-4 bg-black bg-clip-text text-transparent">
						Partner With Us
					</h1>
					<p className="text-sm text-gray-600 mx-auto">
						Results don't Wait , Neither Should You.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 ">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="lg:col-span-3"
					>
						<div className="bg-gray-50 backdrop-blur-sm border border-white/30 rounded-3xl overflow-hidden shadow-xl">
							<div className="p-16">
								<h3 className="text-lg font-semibold mb-10 flex items-center gap-3 text-gray-800">
									<School size={20} />
									Book A Free University Demo Now.
								</h3>

								<VerticalForm
									config={institutionsForm}
									showTitle={false}
									className="space-y-6"
									buttonClassName="flex items-center px-4 py-2 bg-blue-900 text-white rounded-full font-medium shadow-md text-xs disabled:opacity-60"
									actionsClassName="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
									actions={
										<a
											href="tel:+919902326951"
											className="flex items-center gap-2 px-4 py-2 bg-white text-blue-900 border border-blue-900 rounded-full font-medium shadow-md hover:bg-blue-50 text-xs"
										>
											<PhoneCall size={20} />
											Talk to a Strategist
										</a>
									}
								/>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}
						className="lg:col-span-2"
					>
						<div className="h-full flex flex-col justify-between gap-6">
							<div className="bg-gray-50 backdrop-blur-sm border border-white/30 rounded-3xl p-8 shadow-xl">
								<h3 className="text-lg font-semibold mb-9 flex items-center gap-3 text-gray-800">
									<Contact size={20} />
									Get In Touch.
								</h3>
								<div className="space-y-4">
									<div className="flex items-start gap-4">
										<div className="bg-blue-100 rounded-full p-2">
											<Phone size={20} className="text-blue-900" />
										</div>
										<div>
											<h4 className=" mb-4 text-gray-800 text-sm font-semibold">
												Phone
											</h4>
											<p className="text-gray-600 text-sm font-medium">
												+91 95624 81100
											</p>
											<p className="text-gray-600 text-sm font-medium">
												+91 82960 61534
											</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="bg-blue-100 rounded-full p-2">
											<Mail size={20} className="text-blue-900" />
										</div>
										<div>
											<h4 className="mb-4 text-gray-800 text-sm font-semibold">
												Email
											</h4>
											<p className="text-gray-600 text-sm font-medium">
												info@rareminds.in
											</p>
											<p className="text-gray-600 text-sm font-medium">
												careers@rareminds.in
											</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="bg-blue-100 rounded-full p-2">
											<MapPin size={20} className="text-blue-900" />
										</div>
										<div>
											<h4 className="font-semibold mb-4 text-gray-800 text-sm">
												Address
											</h4>
											<p className="text-gray-600 max-w-[300px] text-sm font-medium">
												{companySettingsLoading
													? "Loading company settings..."
													: companySettings
														? companySettings.office_address
														: companySettingsError ||
															"Company settings are unavailable."}
											</p>
											{companySettings && (
												<p className="text-gray-600 text-sm font-medium">
													{formatCompanyAddressLine(companySettings)}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl px-8 py-7 shadow-xl">
								<h3 className="text-lg font-semibold mb-2 text-gray-800 flex items-center gap-2">
									<Icon
										icon="mdi:share-variant"
										width={20}
										height={20}
										className="text-corporate-black"
									/>
									Follow Us.
								</h3>
								<motion.div
									className="flex items-center gap-4 mt-3"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
									variants={{
										hidden: {},
										visible: { transition: { staggerChildren: 0.12 } },
									}}
								>
									{[
										{
											href: "https://www.linkedin.com/company/rareminds/",
											icon: "mdi:linkedin",
											hoverColor: "hover:text-[#0A66C2]",
											label: "LinkedIn",
										},
										{
											href: "https://www.instagram.com/rareminds_eym/",
											icon: "mdi:instagram",
											hoverColor: "hover:text-[#E4405F]",
											label: "Instagram",
										},
										{
											href: "https://www.facebook.com/people/RaremindsHR/61576026163390/",
											icon: "mdi:facebook",
											hoverColor: "hover:text-[#1877F3]",
											label: "Facebook",
										},
										{
											href: "https://x.com/minds_rare",
											icon: "mdi:twitter",
											hoverColor: "hover:text-[#1DA1F2]",
											label: "Twitter (X)",
										},
										{
											href: "https://www.youtube.com/channel/UClkBtwJsScYxFzNoFdlifeA",
											icon: "mdi:youtube",
											hoverColor: "hover:text-[#FF0000]",
											label: "YouTube",
											size: 40,
										},
									].map((item, idx) => (
										<motion.a
											key={item.label}
											href={item.href}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={item.label}
											className={`text-gray-800 ${item.hoverColor} hover:scale-110 transition-transform`}
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											whileHover={{ scale: 1.18, rotate: -6 }}
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 20,
												delay: 0.1 * idx,
											}}
											viewport={{ once: true }}
										>
											<Icon
												icon={item.icon}
												width={item.size || 32}
												height={item.size || 32}
											/>
										</motion.a>
									))}
								</motion.div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
