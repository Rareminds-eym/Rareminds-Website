import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useLocation } from "react-router-dom";
import VerticalForm, {
	type SubmitPayload,
	type SubmitResult,
} from "@/components/forms/VerticalForm";
import { academiaForm } from "@/components/forms/verticalForms.config";
import { formatCompanyAddressLine } from "@/constants/companySettings";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import { sendEmailNotification } from "@/services/emailBff";
import { duplicateFieldErrors } from "@/utils/duplicateCheck";
import { supabase } from "../../../lib/supabase";

const AcademyContactSection = () => {
	const location = useLocation();
	const {
		settings: companySettings,
		isLoading: companySettingsLoading,
		errorMessage: companySettingsError,
	} = useCompanySettings();

	// Saves to the database first, then sends the email (same order as before)
	const submitAcademia = async (
		payload: SubmitPayload,
	): Promise<SubmitResult> => {
		const v = payload.values;
		// Insert data into Supabase (table: acdemia_form, fields: name, email, phone, course_intrest, message)
		const submission = {
			name: v.name,
			email: v.email,
			phone: v.phone,
			course_intrest: v.course, // spelling matches the database column
			message: v.optionalMessage ?? "",
			submitted_at: new Date().toISOString(),
		};

		const { error } = await supabase.from("acdemia_form").insert([submission]);
		if (error) {
			const dup = duplicateFieldErrors(error);
			if (dup) return { fieldErrors: dup };
			console.error(
				"Supabase error:",
				error.message,
				error.details,
				error.hint,
			);
			throw error;
		}

		try {
			await sendEmailNotification("academy-enquiry", {
				...submission,
				verification_proof: payload.otpProof,
			});
		} catch (emailError) {
			console.error("Email notification error:", emailError);
		}
	};

	// Social links based on path
	const isSchool = location.pathname.includes("/school/teacher");
	const isStudent = location.pathname.includes("/school/student");
	type SocialLink = {
		href: string;
		icon: string;
		color: string;
		label: string;
		size?: number;
	};
	const socialLinks = [
		{
			href: "https://www.linkedin.com/company/rareminds/",
			icon: "mdi:linkedin",
			color: "#0A66C2",
			label: "LinkedIn",
		},
		isSchool && {
			href: "https://www.instagram.com/rareminds.educators?igsh=MXRhcGZrMXN4Zzg2Zg==",
			icon: "mdi:instagram",
			color: "#E4405F",
			label: "Instagram",
		},
		isStudent && {
			href: "https://www.instagram.com/istudent_rareminds/?hl=en",
			icon: "mdi:instagram",
			color: "#E4405F",
			label: "Instagram",
		},
		isSchool && {
			href: "https://www.facebook.com/profile.php?id=61576617233176",
			icon: "mdi:facebook",
			color: "#1877F3",
			label: "Facebook",
		},
		isStudent && {
			href: "https://www.facebook.com/profile.php?id=61576552526095",
			icon: "mdi:facebook",
			color: "#1877F3",
			label: "Facebook",
		},
		{
			href: "https://x.com/minds_rare",
			icon: "fa6-brands:x-twitter",
			color: "",
			label: "Twitter (X)",
		},
		{
			href: "https://www.youtube.com/channel/UClkBtwJsScYxFzNoFdlifeA",
			icon: "mdi:youtube",
			color: "#FF0000",
			label: "YouTube",
			size: 40,
		},
	].filter((link): link is SocialLink => Boolean(link));

	return (
		<section
			id="academy-contact"
			className="section py-24 relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 bg-white"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="container mx-auto px-5 lg:px-14 relative "
			>
				<div className="text-center mb-16">
					<div className="bg-red-600 text-white w-16 h-16 rounded-[25px] mx-auto mb-4 flex items-center justify-center transform rotate-6">
						<Send size={32} />
					</div>
					<h2 className="text-3xl md:text-5xl text-center font-bold mb-4 text-gray-800">
						Partner With Us
					</h2>
					<p className="text-gray-600 max-w-3xl mx-auto text-lg text-center">
						Take the first step towards your tech career with our specialized
						training programs
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="lg:col-span-3"
					>
						<div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl overflow-hidden shadow-xl">
							<div className="p-8">
								<h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
									<span className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
										<Mail size={20} />
									</span>
									Request Course Information
								</h3>

								<VerticalForm
									config={academiaForm}
									showTitle={false}
									onSubmit={submitAcademia}
									className="pb-10"
									inputClassName="w-full rounded-md border bg-white/50 px-3 py-2 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 disabled:opacity-60"
									labelClassName="mb-2 block font-medium text-gray-700"
									buttonClassName="mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
							<div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl p-8 shadow-xl">
								<h3 className="text-2xl font-bold mb-6 text-gray-800">
									Get In Touch
								</h3>
								<div className="space-y-6">
									<div className="flex items-start gap-4">
										<div className="bg-indigo-100 text-red-600 p-3 rounded-xl">
											<Phone size={24} />
										</div>
										<div>
											<h4 className="font-semibold mb-1 text-gray-800">
												Helpline
											</h4>
											<p className="text-gray-600">+91 99023 26951</p>
											{/* <p className="text-gray-600">+91 82960 61534</p> */}
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="bg-indigo-100 text-red-600 p-3 rounded-xl">
											<Mail size={24} />
										</div>
										<div>
											<h4 className="font-semibold mb-1 text-gray-800">
												Email
											</h4>
											<p className="text-gray-600">marketing@rareminds.in</p>
											{/* <p className="text-gray-600">training@rareminds.in</p> */}
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="bg-indigo-100 text-red-600 p-3 rounded-xl">
											<MapPin size={24} />
										</div>
										<div>
											<h4 className="font-semibold mb-1 text-gray-800">
												Address
											</h4>
											<p className="text-gray-600 max-w-[300px]">
												{companySettingsLoading
													? "Loading company settings..."
													: companySettings
														? `Rareminds ${companySettings.office_address}`
														: companySettingsError ||
															"Company settings are unavailable."}
											</p>
											{companySettings && (
												<p className="text-gray-600">
													{formatCompanyAddressLine(companySettings)}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>

							<div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl px-8 py-7 shadow-xl flex flex-col items-center ">
								<h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
									<Icon
										icon="mdi:share-variant"
										width={22}
										height={22}
										className="text-corporate-black"
									/>
									Follow Us
								</h3>
								<motion.div
									className="flex items-center gap-4 mt-2"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
									variants={{
										hidden: {},
										visible: { transition: { staggerChildren: 0.12 } },
									}}
								>
									{socialLinks.map((item) => (
										<motion.a
											key={item.label + item.href}
											href={item.href}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={item.label}
											className="hover:scale-110 transition-transform"
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
												icon={item.icon}
												width={item.size || 32}
												height={item.size || 32}
												style={{ color: item.color }}
											/>
										</motion.a>
									))}
								</motion.div>
							</div>

							{/* <div className="bg-black opacity-30 text-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold mb-4">Why Choosen Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={20} className="mt-1 flex-shrink-0" />
                    <span>Industry-relevant curriculum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={20} className="mt-1 flex-shrink-0" />
                    <span>Experienced instructors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={20} className="mt-1 flex-shrink-0" />
                    <span>Placement assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={20} className="mt-1 flex-shrink-0" />
                    <span>Hands-on practical training</span>
                  </li>
                </ul>
              </div> */}
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
};

export default AcademyContactSection;
