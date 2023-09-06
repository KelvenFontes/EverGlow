'use client'

import CardRecommendation from "./CardRecommendation";
import Link from "next/link";

interface RecommendationProps {
  recommendedTracks: any[];
}

const Recommendation = ({ recommendedTracks }: RecommendationProps) => {

  return (
    <div className="container mx-auto pl-5 pt-6">
      <h2 className="text-white text-lg font-semibold">Based on your recent listening</h2>
      <div className="container mx-auto mt-3 lg:mt-10">
        <div className="relative flex items-center lg:justify-center">
          <div className="w-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide lg:flex lg:items-center lg:justify-center">




            {recommendedTracks.map((track, index) => (
              <div className="inline-block cursor-pointer pr-6 transform transition-transform hover:scale-105" key={index}>


                    <CardRecommendation recommendedTracks={track}  />



              </div>
            ))}



          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommendation;
