'use client'

import CardRecommendation from "./CardRecommendation";
import Link from "next/link";

const Recommendation = () => {

  return (
    <div className="container mx-auto pl-5 pt-6">
      <h2 className="text-white text-lg font-semibold">Based on your recent listening</h2>
      <div className="container mx-auto mt-3 lg:mt-10">
        <div className="relative flex items-center lg:justify-center">
          <div className="w-full overflow-x-hidden scroll whitespace-nowrap scroll-smooth scrollbar-hide lg:flex lg:items-center lg:justify-center">
            {/* Primeiro Slide */}
            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardRecommendation />
                </div>
              </Link>
            </div>

            {/* Segundo Slide */}
            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardRecommendation />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardRecommendation />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardRecommendation />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardRecommendation />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardRecommendation />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardRecommendation />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardRecommendation />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardRecommendation />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardRecommendation />
                </div>
              </Link>
            </div>

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardRecommendation />
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommendation;
