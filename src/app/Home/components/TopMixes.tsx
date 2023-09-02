'use client'

import { useState } from "react";
import CardTopMix from "./CardTopMix";
import Link from "next/link";

const TopMixes = () => {

  return (
    <div className="container mx-auto pl-5 pt-8">
      <h2 className="text-white text-lg font-semibold pb-3">Your Top Mixes</h2>
      <div className="container mx-auto mt-5 lg:mt-10">
        <div className="relative flex items-center pt-3 lg:justify-center">
          <div className="w-full overflow-x-hidden scroll whitespace-nowrap scroll-smooth scrollbar-hide lg:flex lg:items-center lg:justify-center">
            {/* Primeiro Slide */}
            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardTopMix />
                </div>
              </Link>
            </div>

            {/* Segundo Slide */}
            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardTopMix />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardTopMix />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardTopMix />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardTopMix />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardTopMix />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardTopMix />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardTopMix />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardTopMix />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardTopMix />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardTopMix />
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TopMixes;