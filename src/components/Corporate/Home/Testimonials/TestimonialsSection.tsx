import { MessageSquareQuote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./testimonials.css";

const testimonials = [
	{
		img: "/Corporate/Images/Home/Testimonials/PCC.webp",
		content:
			"I want to take a moment to express our sincere appreciation for your outstanding support in our recruitment efforts at Park Controls and Communications Private Limited. The quality of service from you and your team has been truly commendable, and we are consistently impressed by your dedication and professionalism. A special thanks for successfully onboarding for three candidates whose contributions are already making a positive impact. Your commitment to excellence and ability to identify top talent reaffirm the strength of our partnership. We are grateful for this collaboration with Rareminds and look forward to continued success together.",
		author: "Manisha Borse",
		position: "DGM – HR & Admin",
		company: "Park Controls and Communications Private Limited",
		rating: 5,
	},
	{
		img: "/Corporate/Images/Home/Testimonials/PFC.webp",
		content:
			"A big 'Thank you' to you and your team for being consistent and diligent and finally closing this vacancy for us. Hope to continue our collaboration with Rareminds.",
		author: "Aarohee Aaron",
		position: "Director- HR",
		company: "Plastics For Change",
		rating: 5,
	},
	{
		img: "/Corporate/Images/Home/Testimonials/infolab.webp",
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
		<section className="py-24 relative overflow-hidden">
			<div className="container mx-auto relative z-10">
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

				<div className="mx-auto">
					<Swiper
						modules={[Navigation, Autoplay]}
						spaceBetween={30}
						slidesPerView={1}
						breakpoints={{
							768: {
								slidesPerView: 2,
								spaceBetween: 20,
							},
							1024: {
								slidesPerView: 3,
								spaceBetween: 30,
							},
						}}
						navigation={{
							nextEl: ".testimonials-next",
							prevEl: ".testimonials-prev",
						}}
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
							pauseOnMouseEnter: true,
						}}
						className="testimonials-swiper"
						loop={false}
					>
						{testimonials.map((testimonial, index) => (
							<SwiperSlide key={index} className="!mr-0">
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									viewport={{ once: true }}
									className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative h-full"
								>
									<div className="absolute -top-3 -right-3 bg-corporate-black text-white p-2 rounded-xl transform rotate-12">
										<Icon icon="ph:quotes" width="20" height="20" />
									</div>

									<div className="mb-6">
										<img
											src={testimonial.img}
											alt={`${testimonial.company} logo`}
											className="h-12 w-auto object-contain"
										/>
									</div>

									<div className="flex items-center gap-1 mb-4">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												size={16}
												className={`${
													i < testimonial.rating
														? "text-yellow-400 fill-current"
														: "text-gray-300"
												}`}
											/>
										))}
									</div>

									<div className="h-[200px] overflow-y-auto mb-6 prose prose-sm">
										<p className="text-gray-600 leading-relaxed">
											"{testimonial.content}"
										</p>
									</div>

									<div className="flex items-start gap-4 mt-6 pt-6 border-t">
										<div className="flex-grow">
											<h4 className="font-semibold text-gray-900">
												{testimonial.author}
											</h4>
											<p className="text-sm text-gray-500 mt-1">
												{testimonial.position}
											</p>
											<p className="text-xs text-corporate-black mt-1">
												{testimonial.company}
											</p>
										</div>
									</div>
								</motion.div>
							</SwiperSlide>
						))}
					</Swiper>
					<div className="flex justify-center items-center gap-4 mt-8">
						<button className="testimonials-prev bg-white text-corporate-black hover:bg-gray-50 px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2">
							<Icon icon="ph:arrow-left" width="24" height="24" />
							<span>Previous</span>
						</button>
						<button className="testimonials-next bg-white text-corporate-black hover:bg-gray-50 px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2">
							<span>Next</span>
							<Icon icon="ph:arrow-right" width="24" height="24" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TestimonialsSection;
