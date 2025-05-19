import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const stats = [
	{
		value: "14,600+",
		label: "Learners Trained",
		color: "#007bff",
		icon: "mdi:school",
	},
	{
		value: "13",
		label: "Languages Delivered",
		color: "#00bcd4",
		icon: "mdi:translate",
	},
	{
		value: "82%",
		label: "Avg. Knowledge Retention",
		color: "#28a745",
		icon: "mdi:brain",
	},
	{
		value: "74%",
		label: "Reduction in Post-training Attrition",
		color: "#dc3545",
		icon: "mdi:trending-down",
	},
	{
		value: "100+",
		label: "Org-Level Learning Dashboards Activated",
		color: "#ff9800",
		icon: "mdi:view-dashboard",
	},
	// Dummy card to fill last column
	{
		value: "",
		label: "",
		color: "#e0e7ef",
		icon: "mdi:star-outline",
		isDummy: true,
	},
];

const AnimatedNumber: React.FC<{ value: string; color: string }> = ({
	value,
	color,
}) => {
	const [display, setDisplay] = useState("0");
	const ref = useRef<number>(0);
	const [inView, setInView] = useState(false);
	const spanRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!spanRef.current) return;
		const observer = new window.IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.4 }
		);
		observer.observe(spanRef.current);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!inView) return;
		if (!value || value === "") return setDisplay("");
		const clean = value.replace(/[^\d+]/g, "");
		const isPercent = value.includes("%");
		const isPlus = value.includes("+");
		const target = parseInt(clean.replace(/,/g, ""), 10);
		if (isNaN(target)) return setDisplay(value);
		const duration = 1200;
		const startTime = performance.now();
		function animate(now: number) {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const current = Math.floor(progress * target);
			ref.current = current;
			let formatted = current.toLocaleString();
			if (isPlus) formatted += "+";
			if (isPercent) formatted += "%";
			setDisplay(formatted);
			if (progress < 1) requestAnimationFrame(animate);
			else setDisplay(value);
		}
		requestAnimationFrame(animate);
		// eslint-disable-next-line
	}, [value, inView]);
	return <span ref={spanRef} style={{ color }}>{display}</span>;
};

const Numbers: React.FC = () => {
	return (
		<section
			style={{
				padding: "5rem 0 3rem 0",
				background: "linear-gradient(120deg, #f8fafc 0%, #e9ecef 100%)",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					maxWidth: 1200,
					margin: "0 auto",
					textAlign: "center",
					position: "relative",
					zIndex: 1,
				}}
			>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-8 sm:mb-12"
				>
					<motion.h1
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-black bg-clip-text text-transparent"
					>
						The Data Wall
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="text-base sm:text-lg text-gray-600 mx-auto max-w-2xl"
					>
						You can't manage what you don't measure. We do both.
					</motion.p>
				</motion.div>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						gap: "2.5rem",
						alignItems: "stretch",
						margin: "0 auto",
						maxWidth: 1000,
					}}
				>
					{stats.map((stat, idx) => (
						<motion.div
							key={stat.label + idx}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.5, delay: idx * 0.12 }}
							className={`${idx == 5 ? "hidden sm:block" : ""}`}
							style={{
								background: stat.isDummy
									? "#f0f4f8"
									: "linear-gradient(135deg, #fff 60%, #f0f4f8 100%)",
								borderRadius: "2rem",
								boxShadow: stat.isDummy
									? "0 0 0 1px #e0e7ef"
									: `0 8px 32px 0 ${stat.color}18, 0 1.5px 0 0 #fff1`,
								minHeight: 200,
								padding: stat.isDummy
									? "2.5rem 1.5rem 1.7rem 1.5rem"
									: "2.5rem 1.5rem 1.7rem 1.5rem",
								textAlign: "center",
								position: "relative",
								border: stat.isDummy
									? "1.5px dashed #e0e7ef"
									: `2px solid ${stat.color}22`,
								transition: stat.isDummy
									? undefined
									: "transform 0.22s cubic-bezier(.4,2,.6,1), box-shadow 0.22s cubic-bezier(.4,2,.6,1)",
								cursor: stat.isDummy ? "default" : "pointer",
								overflow: "hidden",
								opacity: 1,
								flex: "1 1 280px",
								maxWidth: "320px",
								minWidth: "260px",
								margin: "0 auto",
							}}
							onMouseOver={
								stat.isDummy
									? undefined
									: (e) => {
											e.currentTarget.style.transform =
												"scale(1.045) rotate(-1deg)";
											e.currentTarget.style.boxShadow = `0 12px 40px 0 ${stat.color}44, 0 0 0 3px ${stat.color}55 inset`;
									  }
							}
							onMouseOut={
								stat.isDummy
									? undefined
									: (e) => {
											e.currentTarget.style.transform = "scale(1) rotate(0)";
											e.currentTarget.style.boxShadow = `0 8px 32px 0 ${stat.color}18, 0 1.5px 0 0 #fff1`;
									  }
							}
						>
							{!stat.isDummy && (
								<>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											width: 64,
											height: 64,
											margin: "0 auto 1rem auto",
											borderRadius: "50%",
											background: `linear-gradient(135deg, ${stat.color}22 60%, #fff 100%)`,
											boxShadow: `0 2px 12px 0 ${stat.color}22`,
										}}
									>
										<Icon
											icon={stat.icon}
											color={stat.color}
											width={36}
											height={36}
										/>
									</div>
									<h3
										style={{
											fontSize: "2rem",
											fontWeight: 700,
											color: stat.color,
											margin: "0.4rem 0",
											letterSpacing: "0.01em",
										}}
									>
										<AnimatedNumber value={stat.value} color={stat.color} />
									</h3>
									<p
										style={{
											fontSize: "1.08rem",
											color: "#495057",
											margin: 0,
											fontWeight: 500,
											letterSpacing: "0.01em",
										}}
									>
										{stat.label}
									</p>
								</>
							)}
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Numbers;
