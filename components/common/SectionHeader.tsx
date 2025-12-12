import React from 'react';

const SketchyUnderline = () => (
  <svg className="w-full h-3" viewBox="0 0 100 5" preserveAspectRatio="none">
    <path d="M0,3 Q25,1 50,3 T100,2" stroke="black" strokeWidth="2" fill="transparent" strokeLinecap="round" />
  </svg>
);

interface SectionHeaderProps {
    title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="mb-6">
      <h2 className="text-4xl md:text-5xl font-heading font-bold">{title}</h2>
      <SketchyUnderline />
    </div>
  );
};

export default SectionHeader;
