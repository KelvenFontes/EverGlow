import Image from "next/image";

interface CardRecommendationProps {
  recommendedTracks: any
}

const CardRecommendation = ({ recommendedTracks }: CardRecommendationProps) => {
  return (
    <div className="flex items-center h-40 w-40 rounded-md">
      <div>
        <div className="relative h-40 w-40">
          {recommendedTracks.album && (
            <Image src={recommendedTracks.album.images[0].url} alt="logo" className="rounded-md hover:scale-105" style={{ objectFit: 'cover' }} fill />
          )}

          {recommendedTracks.images && (
            <Image src={recommendedTracks.images[0].url} alt="logo" className="rounded-md hover:scale-105" style={{ objectFit: 'cover' }} fill />
          )}



        </div>
        <p className="text-gray-400 w-40 truncate overflow-hidden">{recommendedTracks.name}</p>
      </div>
    </div>
  );
}

export default CardRecommendation;
