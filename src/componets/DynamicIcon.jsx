"use client";
import Image from "next/image";
import React from "react";

const DynamicIcon = ({ currency }) => {
  const src = `/node_modules/cryptocurrency-icons/svg/color/${currency.toLowerCase()}.svg`;
  return (
    <Image
      src={src}
      alt={`${currency} Icon`}
      width={32}
      height={32}
      unoptimized
    />
  );
};

export default DynamicIcon;
