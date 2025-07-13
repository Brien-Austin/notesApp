import React from "react";

interface HeroTextProps {
  content: string;
}
const HeroText: React.FC<HeroTextProps> = ({ content }) => {
  return (
    <div className=" flex items-center lg:text-2xl sm:lg-xl font-bold tracking-tight text-[#151515]">
      {content}
    </div>
  );
};

export default HeroText;
