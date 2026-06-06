import React from 'react';

const Ecosystem = () => {
  return (
    <section className="w-full bg-nature-white overflow-hidden border-b border-nature-beige/30">
      <div className="w-full overflow-x-auto custom-scrollbar md:overflow-visible">
        <div className="min-w-[800px] md:min-w-full">
          <img 
            src="/images/ecosystem_banner.webp" 
            alt="FISORA smart ingredients ecosystem banner" 
            className="w-full h-auto object-cover object-center block"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
