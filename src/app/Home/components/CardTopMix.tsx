import Image from "next/image";

interface CardTopMixesProps {
  category: SpotifyCategory;
}

const CardTopMix = ({ category }: CardTopMixesProps) => {
  return (
    <div className="flex items-center h-44 w-32 rounded-md">
      <div>
        <div className="relative h-32 w-32">
          {category.icons && (

            <Image src={category.icons[0].url} alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
          )}

          {category.images && (
            <Image src={category.images[0].url} alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
          )}

          {category.album && (
            <Image src={category.album.images[0].url} alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
          )}

        </div>
        <p className="text-gray-400 w-32 truncate overflow-hidden">{category.name}</p>
      </div>
    </div>
  );
}

export default CardTopMix;
