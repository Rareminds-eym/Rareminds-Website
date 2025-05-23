import { MessageSquareQuote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./testimonials.css";

const testimonials = [
	{
		img: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Testimonials/PCC.webp",
		content:
			"I want to take a moment to express our sincere appreciation for your outstanding support in our recruitment efforts at Park Controls and Communications Private Limited. The quality of service from you and your team has been truly commendable, and we are consistently impressed by your dedication and professionalism. A special thanks for successfully onboarding for three candidates whose contributions are already making a positive impact. Your commitment to excellence and ability to identify top talent reaffirm the strength of our partnership. We are grateful for this collaboration with Rareminds and look forward to continued success together.",
		author: "Manisha Borse",
		position: "DGM – HR & Admin",
		company: "Park Controls and Communications Private Limited",
		rating: 5,
	},
	{
		img: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Testimonials/PFC.webp",
		content:
			"A big 'Thank you' to you and your team for being consistent and diligent and finally closing this vacancy for us. Hope to continue our collaboration with Rareminds.",
		author: "Aarohee Aaron",
		position: "Director- HR",
		company: "Plastics For Change",
		rating: 5,
	},
	{
		img: "https://itvhjkgfafikpqmuunlh.supabase.co/storage/v1/object/public/images/Corporate/Recruitment/Index/Testimonials/infolab.webp",
		content:
			"I wish to convey our profound appreciation for your outstanding support. The quality of service from your team has consistently impressed us. Special thanks for onboarding Riyaaz; his contributions are already proving invaluable. Additionally, the introductions of Sireesha and Rajireddy align perfectly with our needs. Your commitment to excellence and the caliber of talent you provide reinforce our partnership's strength. We're grateful for our collaboration and look forward to continued success together.",
		author: "Srikanth M",
		position: "TA Manager",
		company: "Infolob Solutions India Pvt. Ltd.",
		rating: 4,
	},
];

const TestimonialsSection = () => {
	return (
		<section className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
			<div className="container lg:px-14 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<div className="bg-corporate-black text-white w-16 h-16 rounded-[25px] mx-auto mb-4 flex items-center justify-center transform rotate-6">
						<MessageSquareQuote size={32} />
					</div>
					<h2 className="text-3xl md:text-5xl text-center font-bold mb-4 text-corporate-black">
						What Our Clients Say
					</h2>
					<p className="text-corporate-grey max-w-3xl mx-auto text-lg text-center mb-16">
						Don't just take our word for it. Hear from the companies that trust
						Rareminds with their most important asset—their people.
					</p>
				</motion.div>
				<div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 40, scale: 0.95 }}
							whileInView={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="relative bg-white rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-shadow duration-300 flex flex-col border-2 border-transparent hover:border-corporate-primary-light/60 group"
						>
							<div className="absolute -top-4 -right-4 bg-corporate-black text-white p-2 rounded-xl transform rotate-12 shadow-md">
								<Icon icon="ph:quotes" width="20" height="20" />
							</div>
							<div className="mb-6 flex justify-center">
								<img
									src={testimonial.img}
									alt={`${testimonial.company} logo`}
									className={`h-14 object-contain bg-white ${
										index === 0 || index === 2 ? "w-[150px]" : "w-14"
									}`}
								/>
							</div>
							<div className="flex items-center gap-1 mb-4 justify-center">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={18}
										className={`${
											i < testimonial.rating
												? "text-yellow-400 fill-current"
												: "text-gray-300"
										}`}
									/>
								))}
							</div>
							<div className="h-[180px] overflow-y-auto mb-6 prose prose-sm scrollbar-thin scrollbar-thumb-corporate-primary-light/30 scrollbar-track-transparent px-2">
								<p className="text-gray-600 leading-relaxed text-center">
									"{testimonial.content}"
								</p>
							</div>
							<div className="flex items-center gap-4 mt-auto pt-6 border-t border-corporate-primary-light/20">
								<div className="flex-grow text-center">
									<h4 className="font-semibold text-corporate-black text-lg">
										{testimonial.author}
									</h4>
									<p className="text-sm text-gray-500 mt-1">
										{testimonial.position}
									</p>
									<p className="text-xs text-corporate-primary mt-1 font-semibold">
										{testimonial.company}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TestimonialsSection;
