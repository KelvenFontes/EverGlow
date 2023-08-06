import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col bg-primary h-screen">
      <Image src="/logo.png" width={100} height={100} alt="logo" />
      <div className="relative w-full h-[407px] top-4">
        <Image src="/img_girl.png" style={{ objectFit: 'cover' }} fill alt="image" />
      </div>
      <div className="flex flex-col fixed bottom-0 text-center rounded-t-[50px] bg-black/95 pt-10 pl-6 pr-6 pb-20 gap-10 h-80">
        <p className="text-white font-semibold text-2xl">
          From the <span className="text-primary">latest</span> to the
          <span className="text-primary"> greatest</span> hits,
          play your favorite tracks on
          <span className="text-primary"> musium</span> now!
        </p>
        <Button className="text-xl"><Link href='/signin'>Get Started</Link></Button>
      </div>
    </div>

  )
}
