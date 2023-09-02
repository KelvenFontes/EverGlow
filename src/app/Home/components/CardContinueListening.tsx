import Image from "next/image";

const CardContinueListening = () => {
  return (
    <div className="flex items-center gap-2 bg-darkLight h-12 rounded-md">
      <div className="relative h-12 w-12">
        <Image src="/logo.png" alt="logo" className="rounded-l-md" style={{ objectFit: 'cover' }} fill />
      </div>
      <p className="text-white text-sm">Coffe & Jazz</p>
    </div>
  );
}

export default CardContinueListening;
