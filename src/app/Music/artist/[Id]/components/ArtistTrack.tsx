import Image from "next/image";

interface ArtistTrackProps {
  result: SpotifyCategoryItem;
}

const ArtistTrack = ({ result }:ArtistTrackProps) => {

  console.log('result');
  return (
    <div>
        <div className="flex items-center">
          {result.images && result.images.length > 0 ? (
            <Image src={result.album.images[0].url} alt={result.name} height={80} width={80} className="object-cover rounded-xl" />
          ) : (
            <Image src={result.imageURL} alt={result.name} height={80} width={80} className="object-cover rounded-xl" />
          )}

          <div className="ml-4">
            <h3 className="text-lg text-gray-300 font-medium">{result.name}</h3>
          </div>
        </div>

    </div>
  );
};

export default ArtistTrack;
