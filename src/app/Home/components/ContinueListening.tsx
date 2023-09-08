import CardContinueListening from "./CardContinueListening";
import Image from "next/image";

interface ContinueListeningProps {
  recommendedTracks: any;
}

const ContinueListening = ({ recommendedTracks }: ContinueListeningProps) => {
  return (
    <div className="container mx-auto pt-2 ">
      <div className="flex items-center space-x-2 bg-darkLight h-12 rounded-md">
        <div className="relative h-12 w-12">
          <Image src={recommendedTracks.album.images[0].url} alt="logo" className="rounded-l-md" style={{ objectFit: 'cover' }} fill />
        </div>
        <p className="text-gray-400 text-sm w-24 truncate overflow-hidden">{recommendedTracks.name}</p>
      </div>
      {/* Outra coluna aqui, se necessário */}
    </div>
  );
}

export default ContinueListening;
