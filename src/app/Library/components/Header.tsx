import Image from "next/image";

const Header = () => {
  return (
    <div className="pt-8 items-center">
      <div className="col-span-2">
        <div className="flex flex-row items-center gap-6 pl-5">
          <Image src='https://i.scdn.co/image/ab6775700000ee85bae311e2dcda70e4644933a3' alt="image" height={40} width={40} className="rounded-full" />
          <div>
          <h2 className="text-primary font-semibold text-2xl tracking-widest">Your Library</h2>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Header;
