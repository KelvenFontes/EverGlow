import Footer from "@/components/Footer";
import Image from 'next/image';
// import ContinueListening from "./components/ContinueListening";
// import Header from "@/components/Header";
// import TopMixes from "./components/TopMixes";
// import Recommendation from "./components/Recommendation";

const TracksArtist = () => {
  return (
    <div className="container mx-auto min-h-screen flex flex-col bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark">
        {/* <Header /> */}
      </div>
      <p className="text-white">teste</p>
      <Image src="/Music/Rectangle 19.png" alt="logo" height={252} width={263} className="mt-20" />
    </div>
    // <div className="flex flex-col bg-dark">
    //   <div className="bg-gradient-to-b from-primaryLight to-dark">
    //     <Header />
    //   </div>

    //   {/* <div className="relative h-20 w-[100%]"> */}

    //   {/* <Image src="/Music/Rectangle 19.png" alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill /> */}

    //   {/* </div> */}

    //   <div className="flex-1 pb-24">
    //   <Image src="/Music/Rectangle 19.png" alt="logo" height={252} width={263} className="mt-20" />
    //   <p className="text-black text-xl font-bold absolute top-3 left-6 right-0 bottom-0 flex">Pop Mix</p>
    //     {/* <TopGenres />
    //     <BrowseAll /> */}
    //   </div>

    //   <Footer />
    // </div>
  );
}

export default TracksArtist;
