import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="bg-bg-secondary py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <p className="eyebrow mb-3">Our Story</p>
          <h2 className="heading-serif text-3xl sm:text-5xl text-text-primary leading-tight mb-6">
            Style Made For Everyday Confidence.
          </h2>
          <div className="gold-divider mb-6 max-w-[80px]" />
          <p className="text-text-secondary text-base leading-relaxed max-w-lg">
            SK COLLECTION is a men's clothing store in Sattur offering stylish, quality and affordable
            ready-made collections.
          </p>
        </div>
        <div className="order-1 lg:order-2 relative aspect-[4/5] overflow-hidden">
          <img
            src="https://picsum.photos/seed/sk-about/1000/1250"
            alt="SK COLLECTION store style"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 border border-gold/30" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
