"use client";
import ExchangeRates from "@/componets/ExchangeRates";
import Image from "next/image";
import KmdIcon from "cryptocurrency-icons/svg/color/AAVE.svg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ExchangeRates />
      <Image src={KmdIcon} width={50} height={50} />
    </main>
  );
}
