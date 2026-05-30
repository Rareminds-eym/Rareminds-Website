const Programs = () => {
  const programData = [
    {
      id: "01",
      title: "Welcome to India's Most Trusted Student Skill Training Platform",
      alt: "Student skill training platform overview illustration"
    },
    {
      id: "02", 
      title: "Spoken English & Public Speaking Bootcamps",
      alt: "Spoken English and public speaking training illustration"
    },
    {
      id: "03",
      title: "Career Counselling with Psychometric Assessments", 
      alt: "Career counselling and psychometric assessment illustration"
    },
    {
      id: "04",
      title: "EEE Training: English, Employability, Entrepreneurship",
      alt: "English, employability and entrepreneurship training illustration"
    },
    {
      id: "05",
      title: "Confidence-Building & Mindset Programs",
      alt: "Confidence building and mindset development illustration"
    }
  ];

  return (
    <div className="h-auto px-8 bg-white py-8" data-aos="fade-down-right">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto mb-6">
          <h1 className="text-3xl text-center font-bold mb-2">From Classrooms to Careers: Skill Up, Speak Up, Stand Out.</h1>
          <p className="text-gray-600 mb-8 text-center">
            Career Readiness | Spoken English | Employability | Entrepreneurship | NEP-aligned Learning for Students
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 mb-6 mt-16 place-items-center">
            {programData.map((program) => (
              <div key={`program-${program.id}`} className="w-80 h-80">
                <div className="w-full h-[80%] bg-white flex flex-col items-center justify-center relative">
                  <span className="text-lg font-semibold absolute left-11 top-12 text-white" aria-label={`Step ${program.id}`}>{program.id}</span>
                  <h2 className="text-xl absolute w-[250px] right-2 content-center">{program.title}</h2>
                  <img
                    src="/svgs/academy/teacher-text.svg"
                    alt={program.alt}
                    className="w-auto h-full object-contain"
                  />
                </div>
                <div className="w-full h-[20%] bg-white flex justify-end items-center">
                  <button type="button" className="px-6 py-2 bg-black hover:text-yellow-200 rounded-md text-white flex items-center justify-center">See More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;