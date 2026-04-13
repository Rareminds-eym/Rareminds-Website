interface SectionData {
  title: string;
  content: string;
}

interface HeaderSectionProps {
  section: SectionData;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ section }) => {
  // Split content into paragraphs by line breaks or double spaces
  const paragraphs = section.content
    .split(/\n\n|\r\n\r\n/)
    .filter(para => para.trim().length > 0);

  return (
    <section className="bg-gray-50 py-20 w-screen -ml-[calc(50vw-50%)] mt-0 mb-0">
      <div className="max-w-[1100px] mx-auto px-6 text-center">
        {/* Main Title */}
        <h1 className="text-[2.5rem] font-bold text-[#111] mb-6 tracking-[-0.5px] leading-[1.2]">{section.title}</h1>
        
        {/* Content */}
        <div className="max-w-[800px] mx-auto text-base leading-[1.7] text-[#444] text-left">
          {paragraphs.length > 1 ? (
            paragraphs.map((para, idx) => (
              <p key={`para-${idx}`} className="mb-5">
                {para.trim()}
              </p>
            ))
          ) : (
            <p className="mb-5">{section.content}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;