import React from 'react';
import Image from 'next/image';
import localFont from 'next/font/local';

const familyName = localFont({
  src: "../../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
});

/**
 * SponsorSection - A reusable component for displaying sponsor information sections
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.body - Section body text
 * @param {string} props.imageSrc - Path to the image
 * @param {string} props.imageAlt - Alt text for the image
 * @param {string} props.imagePosition - Position of the image ('left' or 'right')
 * @param {Object} props.imageStyle - Optional custom styles for the image
 */
const SponsorSection = ({ 
  title, 
  body, 
  imageSrc, 
  imageAlt, 
  imagePosition = 'right',
  imageStyle = {} 
}) => {
  // Determine the order of content based on image position
  const contentOrder = imagePosition === 'left' ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <div className={`flex flex-col ${contentOrder} gap-8 items-center justify-between mt-20 ${familyName.className}`}>
      <div className="md:w-1/2 px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          {title}
        </h1>
        <p className="text-lg text-neutral-300">
          {body}
        </p>
      </div>
      <div className="md:w-1/2 relative aspect-square px-4">
        <Image 
          src={imageSrc} 
          alt={imageAlt}
          height={1000}
          width={1000}
          className="rounded-xl object-cover"
          style={imageStyle}
        />
      </div>
    </div>
  );
};

/**
 * SponsorSections - A component to render multiple sponsor sections from a data array
 * @param {Object} props
 * @param {Array} props.sections - Array of section data objects
 */
export const SponsorSections = ({ sections }) => {
  return (
    <>
      {sections.map((section, index) => (
        <SponsorSection
          key={index}
          title={section.title}
          body={section.body}
          imageSrc={section.imageSrc}
          imageAlt={section.imageAlt || `Sponsor Section ${index + 1}`}
          imagePosition={section.imagePosition || 'right'}
          imageStyle={section.imageStyle || {}}
        />
      ))}
    </>
  );
};

export default SponsorSection;