import React from "react";
import Image from "next/image";

export interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center">
      {/* Logo */}
      <div className="animate-fade-in">
        <Image
          src="/logo.png"
          alt="Smokey FM"
          width={180}
          height={180}
          className="drop-shadow-[0_0_40px_rgba(235,139,139,0.3)]"
          priority
        />
      </div>

      {/* Tagline */}
      <p className="mt-6 animate-fade-up font-display text-title-lg tracking-widest text-white/80 text-glow-bright sm:text-title-xl">
        All original video radio
      </p>

      {/* Subtle scroll indicator */}
      <div className="absolute bottom-8 animate-fade-in opacity-40">
        <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-white/60 to-transparent" />
      </div>
    </section>
  );
};
export default Hero;
