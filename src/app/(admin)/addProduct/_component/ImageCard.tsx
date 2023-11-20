import Image from "next/image";
import React from "react";

type ImageCard = {
  src: string;
  alt: string;
  className?: string;
};

const ImageCard = ({ src, alt, className }: ImageCard) => {
  return (
    <div className="w-20 h-20 relative">
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover object-center ${className}`}
      />
    </div>
  );
};

export default ImageCard;
