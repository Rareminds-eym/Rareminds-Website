import React from 'react';

interface SectionData {
  title: string;
  content: string;
}

interface HeaderSectionProps {
  section: SectionData;
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    backgroundColor: '#f8f9fa',
    padding: '80px 0',
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    marginTop: '0',
    marginBottom: '0',
  },
  inner: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 24px',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#111',
    marginBottom: '24px',
    letterSpacing: '-0.5px',
    lineHeight: '1.2',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    fontSize: '1rem',
    lineHeight: '1.7',
    color: '#444',
    textAlign: 'left' as const,
  },
  paragraph: {
    marginBottom: '20px',
  },
};

const HeaderSection: React.FC<HeaderSectionProps> = ({ section }) => {
  // Split content into paragraphs by line breaks or double spaces
  const paragraphs = section.content
    .split(/\n\n|\r\n\r\n/)
    .filter(para => para.trim().length > 0);

  return (
    <section style={styles.wrapper}>
      <div style={styles.inner}>
        {/* Main Title */}
        <h1 style={styles.title}>{section.title}</h1>
        
        {/* Content */}
        <div style={styles.content}>
          {paragraphs.length > 1 ? (
            paragraphs.map((para, idx) => (
              <p key={idx} style={styles.paragraph}>
                {para.trim()}
              </p>
            ))
          ) : (
            <p style={styles.paragraph}>{section.content}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;