import React from 'react';

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
    <section className="bg-[#f8f9fa] py-[80px] w-screen -ml-[calc(50vw-50%)] mt-0 mb-0">
      <div className="max-w-[1100px] mx-auto px-[24px] text-center">
        {/* Main Title */}
        <h1 className="text-[2.5rem] font-bold text-[#111] mb-[24px] tracking-[-0.5px] leading-[1.2]">{section.title}</h1>
        
        {/* Content */}
        <div className="max-w-[800px] mx-auto text-[1rem] leading-[1.7] text-[#444] text-left">
          {paragraphs.length > 1 ? (
            // ✅ This is correct for static paragraph lists
            paragraphs.map((para, index) => (
              <p key={index} className="mb-[20px]">
                {para.trim()}
              </p>
            ))
          ) : (
            <p className="mb-[20px]">{section.content.trim()}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;