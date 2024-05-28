"use client";
import ExchangeRates from "@/components/ExchangeRates";
import Image from "next/image";
import KmdIcon from "cryptocurrency-icons/svg/color/AAVE.svg";
import "./globals.css";
export default function Home() {
  return (
    <div>
      <ExchangeRates />

      <Image src={KmdIcon} width={50} height={50} />
    </div>
  );
}
