'use client'

import { useState } from "react";
import CardTopMix from "./CardTopMix";
import Link from "next/link";

interface TopMixesProps {
  category: any[];
}

const TopMixes = ({category}:TopMixesProps) => {

  console.log('esssas são as categorias' + category);

  return (
    <div className="container mx-auto pl-5 pt-8">
      {/* <h2 className="text-white text-lg font-semibold">Your Top Mixes</h2> */}
      <div className="container mx-auto mt-3 lg:mt-10">
        <div className="relative flex items-center lg:justify-center">
          <div className="w-full overflow-x-hidden scroll whitespace-nowrap scroll-smooth scrollbar-hide lg:flex lg:items-center lg:justify-center">

            <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  {/* <CardTopMix category={category}/> */}
                </div>
              </Link>
            </div>


            {/* <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105">
              <Link href={`/products/search/`}>
                <div className="text-orange-400 flex flex-col items-center justify-center lg:mr-10">
                  <CardTopMix />
                </div>
              </Link>
            </div> */}



          </div>
        </div>
      </div>
    </div>
  );
}

export default TopMixes;
