import Image from "next/image";

interface CardTopMixesProps {
  category: SpotifyCategory;
}

const CardTopMix = ({ category }: CardTopMixesProps) => {
  return (
    <div className="flex items-center h-32 w-32 rounded-md">
      <div className="relative h-32 w-32">
        <Image src={category.icons[0].url} alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
        <p className="text-gray-100 text-sm font-bold absolute top-2 left-4 right-0 bottom-0 flex">{category.name}</p>
      </div>
    </div>
  );
}

export default CardTopMix;
