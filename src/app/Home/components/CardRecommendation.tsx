import Image from "next/image";

const CardRecommendation = () => {
  return (
    <div className="flex items-center h-40 w-40 rounded-md">
      <div className="relative h-40 w-40">
        <Image src="/logo.png" alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
        <p className="text-black text-xl font-bold absolute top-3 left-6 right-0 bottom-0 flex">Pop Mix</p>
      </div>

    </div>
  );
}

export default CardRecommendation;
