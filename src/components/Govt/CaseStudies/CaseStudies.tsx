import { motion } from 'framer-motion';
import { useState } from 'react';
import { Trophy, TrendingUp, Puzzle, X, EyeIcon, Send ,Download,Mail } from 'lucide-react';
// import { supabase } from  '@/lib/supabaseClient';
import {supabase} from '../../../lib/supabaseClient'

const caseStudies = [
	{
		icon: Trophy,
		title: 'One College, 2 Months, 40% Jump in Placement ',
		institution: 'VELS University',
		details: '600 Students | Soft Skills + Resume Bootcamp',
		pdfUrl: 'institutions/pdfs/Vels.pdf',
	},
	{
		icon: TrendingUp,
		title: 'Fast Track Success: From Tier-3 to Interview Ready in a Month',
		institution: 'PES University',
		details: '350 Students | Food Tech + Hackathon',
		pdfUrl: 'institutions/pdfs/Pes.pdf',
	},
	{
		icon: Puzzle,
		title: 'From Theory to Job Offers: 45-Hour EV Bootcamp',
		institution: 'Thiruvalluvar University',
		details: '420 Students | EV & AI Modules',
		pdfUrl: 'institutions/pdfs/TVU.pdf',
	},
];

export default function CaseStudies() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isFormModalOpen, setIsFormModalOpen] = useState(false);
	const [selectedPdf, setSelectedPdf] = useState({ url: '', institution: '' });
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');
		setSuccess('');

		try {
			// Save to Supabase
			const { error: supabaseError } = await supabase
				.from('demo_pdf')
				.insert([
					{
						name: formData.name,
						email: formData.email,
						phone: formData.phone,
					},
				]);

			if (supabaseError) throw supabaseError;

			// Send email
			const response = await fetch('https://email-sender-ssmu.onrender.com/send-pdf', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: formData.email,
					name: formData.name,
					pdfUrl: selectedPdf.url,
				}),
			});

			const data = await response.json();
			
			if (!response.ok) {
				throw new Error(data.error || 'Failed to send email');
			}

			setSuccess(`${selectedPdf.institution} PDF has been sent to your email!`);
			setFormData({ name: '', email: '', phone: '' });
			// Only close the modal after a successful submission
			setTimeout(() => {
				setIsFormModalOpen(false);
				setIsLoading(false);
			}, 2000);
		} catch (err) {
			setIsLoading(false);
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('An error occurred. Please try again.');
			}
			console.error('Error details:', err);
		}
	};

	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h1 className="text-xl font-bold mb-4 bg-black bg-clip-text text-transparent">
						Delivering on Outcomes: Success Stories.
					</h1>
					<p className="text-sm text-gray-600 mx-auto">
						Colleges That Chose Outcomes and achieved them.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-10 px-12">
					{caseStudies.map((study, index) => (
						<div
							key={index}
							className="border-2 border-gray-100 bg-gradient-to-br from-white to-black/5 p-6 rounded-2xl shadow-md  duration-150 cursor-pointer hover:shadow-lg hover:bg-red-50 transition-all ease-in-out hover:transition-all hover:scale-105 delay-75 group"
							onClick={() => {
								setSelectedPdf({ url: study.pdfUrl, institution: study.institution });
								setIsFormModalOpen(true);
							}}
						>
							<study.icon className="w-7 h-7 text-red-500 mb-4 animate-pulse" />
							<h3 className="text-medium font-bold mb-4">{study.title}</h3>
							<p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600  mb-2">
								{study.institution} <Download className="inline-block ml-1 h-4 w-4 " />
							</p>
							<p className="text-gray-600 text-sm">{study.details}</p>
						</div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center mt-12"
				>
					<motion.div
						className="relative inline-block mt-10"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<button
							onClick={() => setIsModalOpen(true)}
							className="relative bg-[#222B33] text-white px-4 py-4 rounded-full w-68 h-10
                font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
						>
							<EyeIcon className="inline-block mr-1 h-5 w-5" />
							<span>See full Results By College Type</span>
						</button>
					</motion.div>
				</motion.div>
			</div>

			{isModalOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center px-4"
				>
					<motion.div
						initial={{ scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.95, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="bg-white max-w-xl w-full p-6 rounded-2xl shadow-lg relative"
					>
						<button
							onClick={() => setIsModalOpen(false)}
							className="absolute top-4 right-4 text-gray-600 hover:text-black"
						>
							<X className="w-6 h-6" />
						</button>
						<h3 className="text-medium font-semibold my-4 text-center">
							Download Case Studies
						</h3>
						<div className="space-y-4">
							{caseStudies.map((study, index) => (
								<div
									key={index}
									className="flex justify-between items-center border p-4 rounded-xl"
								>
									<div>
										<p className="font-normal">{study.institution}</p>
										<p className="text-sm text-gray-500">
											{study.details}
										</p>
									</div>
									<button
										onClick={(e) => {
											e.stopPropagation();
											setSelectedPdf({ url: study.pdfUrl, institution: study.institution });
											setIsFormModalOpen(true);
											setIsModalOpen(false);
										}}
										className="text-blue-600 hover:text-red-600 font-normal flex items-center gap-1 transition-all duration-75"
									>
										Send PDF <Mail className="inline-block ml-1 h-4 w-4 " />
									</button>
								</div>
							))}
						</div>
					</motion.div>
				</motion.div>
			)}

			{isFormModalOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center px-4"
				>
					<motion.div
						initial={{ scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.95, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="bg-white max-w-md w-full p-6 rounded-2xl shadow-lg relative"
					>
						<button
							onClick={() => setIsFormModalOpen(false)}
							className="absolute top-4 right-4 text-gray-600 hover:text-black"
						>
							<X className="w-6 h-6" />
						</button>
						<h3 className="text-medium font-semibold my-4 text-center">
							Get PDF: {selectedPdf.institution}
						</h3>
						<form onSubmit={handleFormSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Name
								</label>
								<input
									type="text"
									id="name"
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									required
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									required
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>
							<div>
								<label
									htmlFor="phone"
									className="block text-sm font-medium text-gray-700"
								>
									Phone (optional)
								</label>
								<input
									type="tel"
									id="phone"
									value={formData.phone}
									onChange={(e) =>
										setFormData({ ...formData, phone: e.target.value })
									}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>
							<div className="flex justify-between items-center">
								<button
									type="button"
									onClick={() => setIsFormModalOpen(false)}
									className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400 transition-all duration-200 mr-2"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isLoading}
									className={`w-full ${isLoading ? 'bg-blue-400' : 'bg-blue-600'} text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed`}
								>
									{isLoading ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
											<span>Sending...</span>
										</>
									) : (
										<>
											<Send className="w-4 h-4" />
											<span>Send PDF</span>
										</>
									)}
								</button>
							</div>
							{error && (
								<p className="text-red-500 text-sm text-center">{error}</p>
							)}
							{success && (
								<p className="text-green-500 text-sm text-center">{success}</p>
							)}
						</form>
					</motion.div>
				</motion.div>
			)}
		</section>
	);
}
