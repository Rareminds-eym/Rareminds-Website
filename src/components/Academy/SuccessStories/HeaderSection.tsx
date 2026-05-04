interface SectionData {
  title: string;
  content: string;
}

interface HeaderSectionProps {
  section: SectionData;
}

const HeaderSection = ({ section }: HeaderSectionProps): JSX.Element => {
  return (
    <section 
      className="bg-gray-50 py-20 w-screen mt-0 mb-0 breakout"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Main Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">{section.title}</h1>
        
        {/* Content */}
        <div className="max-w-3xl mx-auto text-base leading-relaxed text-gray-600 text-left">
          <p className="mb-5">{section.content}</p>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;