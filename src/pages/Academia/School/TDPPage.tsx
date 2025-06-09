import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AcademyHeader from '@/components/Header/AcademyHeader';

const tdpSections = [
	{
		key: 'academic-excellence',
		title: 'Academic Excellence',
		summary: `In a rapidly evolving educational landscape, academic excellence demands more than subject expertise. Today’s educators must master a range of student-centered, inclusive, and interdisciplinary strategies that make learning meaningful, measurable, and transformative. From innovative pedagogy to integrating sustainability and technology, this vertical equips teachers to raise both engagement and achievement across classrooms.`,
		whatMakesItDifferent: `This program goes beyond traditional teacher training—it fosters reflective practice, promotes experiential and inquiry-driven methods, and empowers educators to embed DEI and sustainability values into everyday teaching. It’s designed not just to inform, but to transform academic delivery.`,
		whyItMatters: [
			'Encourages personalized, inclusive, and high-impact learning for every student',
			'Bridges the gap between NEP goals, SDG alignment, and classroom execution',
			'Equips educators to lead with clarity, empathy, and innovation',
			'Strengthens academic integrity and outcomes across diverse learning environments',
		],
		howWeSupport: [
			'Modules on student-centered and active learning pedagogy',
			'Practical sessions on ICT tools, residential teaching models, and gamified instruction',
			'Frameworks for inclusive education, adaptive learning, and mentorship-based teaching',
			'Integration of SDGs, environmental literacy, and eco-conscious classroom practices',
		],
		programTitles: [
			{
				title: 'Innovative Teaching: Student-centric Methods',
				topics: [
					'Introduction to Student-centred Teaching',
					'Creating an Engaging Classroom Environment',
					'Active Learning Strategies',
					'Individualized Instruction and Differentiation',
					'Assessment in Student-centred Teaching',
					'Reflection and Continuous Improvement',
				],
			},
			{
				title: 'Information and Communication Technology (ICT) Enabled Teaching and its Challenges',
				topics: [
					'Online learning platforms',
					'Multimedia resources',
					'Virtual classrooms',
					'Gamification',
				],
			},
			{
				title: 'Building Effective Teaching Skills',
				topics: [
					'Facilitation Skills',
					'Participant-Centered Learning',
					'Teaching through cases',
					'Developing Cases',
					'Teaching through Simulation games',
					'Developing contemporary course outlines',
				],
			},
			{
				title: 'Program on creating a residential environment for teaching',
				topics: [
					'Understanding the Importance of a Supportive Residential Environment',
					'Creating a Sense of Community and Belonging',
					'Communication and Relationship Building',
					'Conflict Resolution and Mediation',
					'Academic and Personal Support',
					'Collaboration and Stakeholder Engagement',
				],
			},
			{
				title: 'Effective teaching qualities',
				topics: [
					'Core Teaching - Philosophy, values & expectations',
					'Student-Centered Pedagogy',
					'Collaborative Learning',
					'Experiential Learning',
					'Project-Based Learning',
					'Inquiry-Based Learning',
					'Flipped Classroom',
					'Blended Learning',
					'Adaptive Learning',
					'Mentorship/Gurukul Model',
					'Rote Learning',
					'Communication & Influence',
				],
			},
			{
				title: 'Effective teaching qualities - DEI',
				topics: [
					'Inclusive Teaching Practices',
					'Universal Design for Learning',
					'Supporting Students  with Diverse Abilities',
					'Understanding Student Diversity in Today’s Classrooms',
					'Ensuring Equity in Access, Participation, and Support',
					'Designing Inclusive Learning Environments',
					'Bias and Belonging: Shaping Teacher Mindsets',
					'Student Voice and Choice in School Development',
					'Collaborative Practices for Inclusive School Communities',
				],
			},
			{
				title: 'Education for Sustainable Development (ESD)',
				topics: [
					'Aligning SDGs with NEP Competency Goals',
					'Integrating Sustainability and SDGs into Daily Teaching',
					'Climate Literacy for Students and Educators',
					'Environmental Project-Based Learning and Community Engagement',
					'Building Green Habits: Waste, Energy, and Water Conservation in Schools',
					'Embedding Eco-Conscious Values through Classroom Activities',
				],
			},
		],
	},
	{
		key: 'capacity-building',
		title: 'Capacity Building',
		summary: `Schools thrive when teachers lead with vision, communicate with clarity, and collaborate with purpose. Capacity building is no longer an option—it is essential. This vertical equips educators with the personal, managerial, and leadership competencies they need to contribute meaningfully to institutional growth while advancing their own professional journey.`,
		whatMakesItDifferent: `The program blends leadership development with practical efficiency tools and emotional intelligence, fostering well-rounded educators who can perform, lead, and grow in dynamic school ecosystems. It nurtures teachers as change makers—not just content deliverers.`,
		whyItMatters: [
			'Builds resilience, flexibility, and confidence in academic teams',
			'Prepares teachers to navigate change, lead innovation, and manage diverse classrooms',
			'Elevates performance by embedding goal-setting, collaboration, and reflection',
			'Strengthens school systems through empowered individuals',
		],
		howWeSupport: [
			'Leadership, negotiation, and team-building modules tailored for school settings',
			'Sessions on data analysis, interdisciplinary instruction, and continuous improvement',
			'Training in soft skills like time management, emotional intelligence, and public speaking',
			'Applied models for teamwork, adaptability, and reflective teaching',
		],
		programTitles: [
			{
				title: 'Leadership & Administration',
				topics: [
					'Leadership and Organizational Change',
					'Self-Management and Leadership',
					'Negotiation and Conflict Management',
					'Leading High-Performance, Diverse Teams',
				],
			},
			{
				title: 'Managerial Skills',
				topics: [
					'Giving & Receiving Feedback',
					'Collaboration',
					'Continuous Learning',
					'Adaptability',
				],
			},
			{
				title: 'Proficiency & efficiency Development',
				topics: [
					'Data Analysis',
					'Interdisciplinary Teaching',
					'Reflective Teaching & Professional Growth',
				],
			},
			{
				title: 'Soft Skills & Smart Work',
				topics: [
					'Time Management',
					'Goal Setting',
					'Problem Solving & Creativity',
					'Presentation & Public Speaking',
					'Social & Emotional Intelligence',
				],
			},
			{
				title: 'Team Work',
				topics: [
					'Introduction to Effective Teamwork in an Academic Context',
					'Team Building through Chemistry',
					'Building Trust and Inclusivity in Teams',
					'Knowledge Sharing',
					'Collaborative Project Management',
				],
			},
		],
	},
	{
		key: 'current-affairs',
		title: 'CURRENT AFFAIRS',
		summary: `Teachers are not just facilitators—they are frontline responders to the realities of the 21st century. From mental health challenges to climate education, digital distractions to social change, educators need the tools to teach with context, compassion, and confidence. This vertical is designed to help teachers respond with relevance and resilience.`,
		whatMakesItDifferent: `It’s not about textbook updates—it’s about mindset evolution. This program prepares educators to contextualize learning in real-world events and equip students with the life skills needed to thrive in a complex, uncertain world.`,
		whyItMatters: [
			'Prepares schools to respond sensitively and strategically to contemporary issues',
			'Empowers teachers to make classrooms inclusive, ethical, and emotionally safe',
			'Promotes global citizenship, values-based learning, and mental well-being',
			'Builds teacher readiness to navigate crises and evolving learner needs',
		],
		howWeSupport: [
			'Modules on stress management, emotional well-being, and post-pandemic recovery',
			'Training in handling political, environmental, and digital disruptions in learning',
			'Frameworks for holistic teaching, SEL, and care-centered classroom cultures',
			'DEI-focused organizational inclusion strategies and communication practices',
		],
		programTitles: [
			{
				title: 'Stress management',
				topics: [
					'Understanding Stress Management',
					'Triple A Approach (Assess, Analyse, Action)',
					'Altering the Situation',
					'How to Reduce Stress?',
					'Environmental Relaxation Techniques',
					'Physical Relaxation Techniques',
					'Mental Health, Digital Fatigue, and Student Well-being',
				],
			},
			{
				title: 'Situations of the 21st Century',
				topics: [
					'Teaching in a Post-Pandemic World: Resilience and Recovery in Classrooms',
					'Understanding the Impact of Technology, AI, and Social Media on Learners',
					'Climate Change, Sustainability, and the Role of Schools',
					'Political and Social Events: Responding with Sensitivity in School Spaces',
					'Natural Disasters and Crisis Response in Schools',
				],
			},
			{
				title: 'Holistic teaching approach',
				topics: [
					'Multiple Intelligences',
					'Integrated Curriculum',
					'Authentic Assessments',
					'Community and Global Connections',
					'Experiential and Outdoor Learning',
				],
			},
			{
				title: 'Human values and caring',
				topics: [
					'Empathy in Action: Cultivating Social-Emotional Learning',
					'Teaching Respect, Kindness, and Inclusion Across Cultures',
					'Ethical Decision-Making and Integrity in School Life',
					'Care-Centered Classrooms: Supporting Well-being and Belonging',
					'Gratitude, Responsibility, and Global Citizenship',
				],
			},
			{
				title: 'Inclusiveness in the development of organizations',
				topics: [
					'Understanding Organizational Inclusion: Attitudes, Beliefs, and Culture (ABCs of Inclusive Education)',
					'Psychologists & Counsellors: Supporting Students Holistically',
					'Universal Design for Learning (UDL): Teaching Every Brain',
					'Auditing for Equity: Where Does Your School Stand?',
					'Inclusive Communication in Parent-Teacher Engagements',
					'Inclusive HR Practices: Hiring, Appraisals & Staff Support',
					'Accessibility in Action: Infrastructure and Digital Design',
					'From Policy to Practice: Inclusion in Communication and School Culture',
				],
			},
		],
	},
	{
		key: 'skill-upgradation',
		title: 'SKILL UPGRADATION',
		summary: `As education becomes increasingly digital and data-driven, teachers must continuously evolve to stay effective. Skill upgradation ensures that educators stay equipped with both the technical know-how and the professional edge required in modern classrooms. This vertical sharpens practical competencies for better planning, communication, and execution.`,
		whatMakesItDifferent: `It’s not just about learning new tools—it’s about integrating them meaningfully. This program focuses on upskilling teachers with actionable digital, administrative, and documentation skills—ensuring readiness for blended learning and institutional compliance.`,
		whyItMatters: [
			'Enhances digital fluency and communication effectiveness',
			'Empowers educators to manage classrooms, data, and documentation with ease',
			'Bridges gaps between planning, execution, and evaluation using smart tools',
			'Increases efficiency and confidence in everyday professional responsibilities',
		],
		howWeSupport: [
			'Practical sessions on digital tools, LMS platforms, and collaborative technologies',
			'Documentation, compliance, and data handling frameworks for schools',
			'Excel training from foundational to advanced levels for analysis and reporting',
			'Professional communication training for internal and external correspondence',
		],
		programTitles: [
			{
				title: 'Basic computer operation',
				topics: [
					'Lesson Planning and Preparation:',
					'Creating and editing lesson plans using word processing software, and integrated AI tools.',
					'Developing presentations, slideshows, and multimedia materials for instructional purposes.',
					'Researching and gathering teaching resources, including online articles, educational websites, and multimedia content.',
					'Instructional Delivery:',
					'Utilizing presentation software to deliver engaging and interactive lessons.',
					'Integrating multimedia into instructional materials for delivery using tools like Canva, PowerPoint, Padlet, and Lumen5.',
					'Conducting virtual or online classes using video conferencing tools and learning management systems.',
					'Assessment and Grading:',
					'Creating and administering online quizzes, tests, and assessments.',
					'Using spreadsheets to track and calculate grades.',
					'Providing feedback to students using annotation tools and online grading platforms like Turnitin, Google Classroom, and Microsoft Teams.',
					'Classroom Management:',
					'a. Utilizing classroom management software to monitor student behavior, participation, digital engagement, and assignment completion:',
					'Behavior: Track positive or negative conduct (e.g., respectful, disruptive, helpful)',
					'Participation: Measure frequency and quality of input (e.g., hands raised, comments shared)',
					'Digital Engagement: Monitor online focus (e.g., active tabs, time on task, app usage)',
					'Assignment Completion: Review task submission and quality (e.g., on-time, effort shown)',
					'Implementing educational software or applications to facilitate student collaboration and interaction.',
					'Managing student records, attendance, and progress using digital tools or student information systems.',
					'Communication and Collaboration:',
					'Sending and receiving emails to communicate with students, parents, and colleagues.',
					'Utilizing instant messaging or discussion platforms for online communication and collaboration.',
					'Using video conferencing tools for virtual meetings, parent-teacher conferences, or professional development sessions.',
					'Professional Development:',
					'Engaging in online courses, webinars, or virtual workshops to enhance teaching skills.',
					'Participating in online forums or social media platforms to connect with other educators and share best practices.',
					'Conducting research and staying updated on educational trends and advancements through online resources.',
					'Administrative Tasks:',
					'Managing schedules, calendars, and appointments using productivity software or online tools.',
					'Generating reports and analyzing data using spreadsheet or database software.',
					'Collaboration and Content Sharing:',
					'Collaborating with other teachers on shared projects or curriculum development using cloud-based platforms or document sharing tools.',
					'Sharing educational resources, lesson plans, and materials with colleagues through online repositories or educational platforms.',
				],
			},
			{
				title: 'Letter drafting/email communications',
				topics: [
					'Understanding the principles of effective letter drafting/email communications.',
					'Developing skills in writing clear and concise letters and emails.',
					'Improving email etiquette and professional communication practices.',
					'Enhancing knowledge of formatting, tone, and language usage in written communications.',
					'Addressing common challenges and best practices in written correspondence.',
					'Using Technology to improve vocabulary, grammar and professionalism',
				],
			},
			{
				title: 'Documentation and records maintenance',
				topics: [
					'Document Identification and Classification:',
					'Document Control',
					'Record Retention and Disposal',
					'Version Control',
					'Document Security',
					'Document Retrieval and Accessibility',
					'Training and Awareness',
					'Regular Audits and Reviews',
					'Collaboration and Sharing',
					'Document Archiving',
				],
			},
			{
				title: 'Policies and regulations of association, universities, and apex bodies',
				topics: [
					'Understanding School Governance: Boards, Bodies, and Mandates',
					'Roles and Responsibilities Under Educational Regulatory Frameworks',
					'Navigating CBSE, State Boards & Affiliation Norms',
					'Compliance Essentials: RTE Act, Safety, and Child Protection Policies',
					'Bridging School to Higher Education: Regulatory Awareness for Grades 9–12',
				],
			},
			{
				title: 'Excel Training Programme',
				topics: [
					'Flashback to Basics',
					'Convert Numbers to Text',
					'Custom Edit List, AutoFill',
					'NameBox, Set Name Ranges',
					'Special Paste Functions, Transpose',
					'Exploring the Excel Status Bar Tools',
					'Data Validation',
					'Reject Invalid Dates',
					'Budget Limit',
					'Product Codes',
					'Drop-down List',
					'Dependent Drop-down Lists',
					'Convert Kg to lbs – Assignment',
					'Prevent Duplicate Entries – Assignment',
					'Indulge in Intermediate',
					'Functions & Formulas',
					'Text (Join Strings | Left | Right | Mid | Len)',
					'Date & Time (Year, Month, Day | Date Function | Current Date & Time | Hour, Minute, Second | Time Function)',
					'Logical Operations (IF, AND, OR and NOT)',
					'Cell, Worksheet References (Relative Reference | Absolute Reference | Mixed Reference)',
					'Lookup & Reference Functions (VLOOKUP, HLOOKUP, MATCH, INDEX and CHOOSE)',
					'Statistical Functions (Average | Averageif | Median | Mode | Standard Deviation | Min | Max | Large | Small)',
					'Data Analysis',
					'Sort',
					'Filter',
					'Conditional Formatting (Manage Rules, Data Bars, Color Scales, Icon Sets, Find Duplicates, Shade Alternate Rows, Compare Two Lists, Conflicting Rules, Checklist, Heat Map)',
					'Pivot Tables, Multi Level & Slicers (to analyse Pivot Tables)',
					'Charts & Pivot Charts',
					'Peek into Advanced',
					'What If Analysis (Create Different Scenarios| Scenario Summary | Goal Seek)',
					'Dashboards –Samples , Tips & Tricks',
				],
			},
		],
	},
];

const otherCourses = [
	{ name: 'Communication and Personality Development', route: '/academia/school/Courses/communication-personality' },
	{ name: 'Mental Health and Counseling Training', route: '/academia/school/Courses/mental-health-counseling' },
	{ name: 'Domain-Specific Certification Programs', route: '/academia/school/Courses/domain-specific-certification' },
	{ name: 'Leadership and Career Growth', route: '/academia/school/Courses/leadership-career-growth' },
	{ name: 'Institutional Value-Added Services', route: '/academia/school/Courses/institutional-value-added' },
];

const illustrations = {
  'academic-excellence': {
    whatMakesItDifferent: '/academy/courseBanner/what-makes-different-academic.svg',
    whyItMatters: '/academy/courseBanner/why-it-matters-academic.svg',
    howWeSupport: '/academy/courseBanner/how-we-support-academic.svg',
  },
  'capacity-building': {
    whatMakesItDifferent: '/academy/courseBanner/what-makes-different-capacity.svg',
    whyItMatters: '/academy/courseBanner/why-it-matters-capacity.svg',
    howWeSupport: '/academy/courseBanner/how-we-support-capacity.svg',
  },
  'current-affairs': {
    whatMakesItDifferent: '/academy/courseBanner/what-makes-different-current.svg',
    whyItMatters: '/academy/courseBanner/why-it-matters-current.svg',
    howWeSupport: '/academy/courseBanner/how-we-support-current.svg',
  },
  'skill-upgradation': {
    whatMakesItDifferent: '/academy/courseBanner/what-makes-different-skill.svg',
    whyItMatters: '/academy/courseBanner/why-it-matters-skill.svg',
    howWeSupport: '/academy/courseBanner/how-we-support-skill.svg',
  },
};

export default function TDPPage() {
	const [selectedSection, setSelectedSection] = useState('academic-excellence');
	const section = tdpSections.find(s => s.key === selectedSection);
	const navigate = useNavigate();

	return (
		<>
			<AcademyHeader />
			<div className="relative h-[45vh] mb-12 overflow-hidden mt-[80px]">
				{/* Blurred and black & white background image */}
				<div
					className="absolute inset-0 bg-cover bg-center filter grayscale"
				  style={{ backgroundImage: `url(/academy/courseBanner/TDP.png)` }}
				></div>
				{/* Black overlay with 50% opacity */}
				<div className="absolute inset-0 bg-black opacity-30 backdrop-blur-sm z-0"></div>
				{/* Foreground content */}
				<div className="relative z-10 container mx-auto px-6 pl-[4%] p-6 flex flex-col justify-center h-full">
					<button
						onClick={() => navigate('/academia/school#course-cards-section')}
						className="text-white mb-7 text-lg flex items-center gap-2 hover:underline"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Courses
					</button>
					<h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
						Teacher Development Program (TDP)
					</h1>
					{/* {course.subtitle && (
                <p className="text-lg text-white/90 drop-shadow">{course.subtitle}</p>
              )} */}
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto py-12 px-4">
				{/* Left Sidebar */}

				{/* Main Content */}
				<main className="flex-1 bg-white rounded-lg shadow p-8">
					{/* <h1 className="text-3xl font-bold  text-center mb-12">Teacher Development Program (TDP)</h1> */}
					<h2 className="text-xl  mb-4 text-Red-700 md:text-3xl font-bold  md:mb-12">Empowering Educators. Transforming Schools.</h2>
					<p className="mb-6 text-gray-700">In today’s evolving educational landscape, the role of the teacher has expanded beyond instruction. Teachers are now leaders, facilitators, mentors, and change agents. The Teacher Development Program (TDP) is designed to meet this transformation head-on—equipping educators with the knowledge, skills, and mindsets needed to thrive in modern classrooms and learning ecosystems.</p>
					<p className="mb-6 text-gray-700">TDP is built on four foundational pillars:</p>
					<ul className="list-disc pl-6 mb-6 text-gray-800">
						<li>Academic Excellence</li>
						<li>Capacity Building</li>
						<li>Current Affairs</li>
						<li>Skill Upgradation</li>
					</ul>
					<p className="mb-8 text-gray-700 ">TDP is modular, customised, and aligned with NEP 2020 priorities. Whether the goal is academic innovation, inclusive classrooms, or operational excellence, the Teacher Development Program provides schools with a comprehensive framework to support educator growth and student success.<br/>Invest in your teachers. Transform your classrooms. Build future-ready institutions.</p>
					{/* Section Content */}
					
				</main>

        
				<aside className="md:w-1/4 w-full mb-8 md:mb-0">
					<div className="bg-white rounded-lg shadow p-6 mb-8">
						<h2 className="text-xl font-bold mb-4">Other Courses</h2>
						<ul className="space-y-2">
							{otherCourses.map(course => (
								<li key={course.name}>
									<button className="text-red-700 hover:underline text-left" onClick={() => navigate(course.route)}>{course.name}</button>
								</li>
							))}
						</ul>
					</div>
					<div className="bg-white rounded-lg shadow p-6">
						<h2 className="text-xl font-bold mb-4">TDP Sections</h2>
						<ul className="space-y-2">
							{tdpSections.map(sec => (
								<li key={sec.key}>
									<button
										className={`w-full text-left px-2 py-1 rounded ${selectedSection === sec.key ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'}`}
										onClick={() => setSelectedSection(sec.key)}
									>
										{sec.title}
									</button>
								</li>
							))}
						</ul>
						{/* <div className="mt-4 text-xs text-gray-500">
            <div><b>3: Current Affairs</b> – Teachers are not just facilitators—they are frontline responders to the realities of the 21st century. This vertical is designed to help teachers respond with relevance and resilience.</div>
            <div className="mt-2"><b>4: Skill Upgradation</b> – As education becomes increasingly digital and data-driven, teachers must continuously evolve to stay effective. This vertical sharpens practical competencies for better planning, communication, and execution.</div>
          </div> */}
					</div>
				</aside>

			</div>

            <div className='container mx-auto px-3 py-12'>
           {section ? (
						<section>
                            
							
      <h2 className="text-2xl font-bold mb-4 md:mb-4 text-center">
        {section.title}
      </h2>
      <div className="mx-auto w-16 h-1 mb-8 md:mb-16 bg-red-600 rounded-sm" style={{ marginTop: '-1rem' }} aria-hidden="true"></div>

							<p className=" text-gray-700 mb-6 md:mb-12">{section.summary}</p>

							{/* What Makes It Different - left text, right illustration */}
<div className="flex flex-col md:flex-row items-center gap-8 mb-10">
	<div className=" w-full">
		<h3 className="font-semibold mb-1 text-xl  pb-4">What Makes It Different</h3>
		<p className="mb-3 text-gray-700">{section.whatMakesItDifferent}</p>
	</div>
	{/* <div className="md:w-1/2 w-full flex justify-center">
		<img
          src={illustrations[section.key as keyof typeof illustrations]?.whatMakesItDifferent || '/academy/courseBanner/what-makes-different.svg'}
          alt="What Makes It Different"
          className="max-w-xs w-full h-auto"
        />
	</div> */}
</div>

{/* Why It Matters - left illustration, right text */}
<div className="flex flex-col md:flex-row items-center gap-8 mb-10">
	{/* <div className="md:w-1/2 w-full flex justify-center order-2 md:order-1">
		<img
          src={illustrations[section.key as keyof typeof illustrations]?.whyItMatters || '/academy/courseBanner/why-it-matters.svg'}
          alt="Why It Matters"
          className="max-w-xs w-full h-auto"
        />
	</div> */}
	<div className=" w-full order-1 md:order-2">
		<h3 className="font-semibold mb-1 text-xl  pb-4">Why It Matters</h3>
		<ul className="list-disc pl-6 mb-3 text-gray-700">
			{section.whyItMatters.map((item, idx) => <li key={idx}>{item}</li>)}
		</ul>
	</div>
</div>

{/* How We Support - left text, right illustration */}
<div className="flex flex-col md:flex-row items-center gap-8 mb-10">
	<div className=" w-full">
		<h3 className="font-semibold mb-1 text-xl pb-4">How We Support</h3>
		<ul className="list-disc pl-6 mb-3 text-gray-700">
			{section.howWeSupport.map((item, idx) => <li key={idx}>{item}</li>)}
		</ul>
	</div>
	{/* <div className="md:w-1/2 w-full flex justify-center">
		<img
          src={illustrations[section.key as keyof typeof illustrations]?.howWeSupport || '/academy/courseBanner/how-we-support.svg'}
          alt="How We Support"
          className="max-w-xs w-full h-auto"
        />
	</div> */}
</div>

							<h3 className="font-semibold mb-2 text-xl pt-6 pb-6">Program Titles & Topics</h3>
							<div className="space-y-4 ">
								{section.programTitles.map((prog) => (
									<div key={prog.title} className="border rounded p-4 bg-gray-50">
										<h4 className="font-bold mb-1">{prog.title}</h4>
										<ul className="list-disc pl-6 text-gray-700">
											{prog.topics.map((topic, i) => <li key={i}>{topic}</li>)}
										</ul>
									</div>
								))}
							</div>
						</section>
					) : (
						<section>
							<p className="text-red-500">Section not found.</p>
						</section>
					)}
            </div>
           
		</>
	);
}
