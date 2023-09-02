import Image from "next/image";

const Header = () => {
  return (
    <div className="pt-8 items-center">
      <div className="col-span-2">
        <div className="flex flex-row items-center gap-6 pl-5">
          <Image src='/icon.png' alt="image" height={40} width={40} className="rounded-full" />
          <div>
          <h2 className="text-primary font-semibold text-2xl tracking-widest">Search</h2>

          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pt-6">
        <input type="text" className="h-10 w-[90%] rounded-2xl pl-6" placeholder="Songs, Artists, Podcasts & More"/>
      </div>

    </div>
  );
}

export default Header;
