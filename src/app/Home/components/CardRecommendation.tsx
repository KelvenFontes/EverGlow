import Image from "next/image";

interface CardRecommendationProps {
  recommendedTracks: any
}

const CardRecommendation = ({ recommendedTracks }: CardRecommendationProps) => {
  return (
    <div className="flex items-center h-40 w-40 rounded-md">
      <div className="relative h-40 w-40">
        <Image src={recommendedTracks.album.images[0].url} alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
        {/* <Image src="/logo.png" alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill /> */}
        {/* <p className="text-black text-xl font-bold absolute top-3 left-6 right-0 bottom-0 flex">{recommendedTracks.name}</p> */}
      </div>

    </div>
  );
}

export default CardRecommendation;
