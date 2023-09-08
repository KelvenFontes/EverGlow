import Footer from "@/components/Footer";
import Image from 'next/image';
import Link from "next/link";
import { BsArrowLeft, BsThreeDotsVertical } from "react-icons/bs";
// import Header from "./components/Header";
// import TopGenres from "./components/TopGenres";
// import BrowseAll from "./components/BrowseAll";

interface HeaderProps {
  musicId: string;
  openModal: () => void;
}

const Header = ({musicId, openModal}:HeaderProps) => {

  const customIconStyle = {
    strokeWidth: '1', // Ajuste o valor para alterar a espessura da linha
  };

  const handleGoBack = () => {
    window.history.back(); // Isso volta para a página anterior no histórico de navegação
  };

  return (
    <div className="pt-8 pb-3">
      <div className="flex items-center justify-around gap-10">
        <BsArrowLeft className="text-gray-200 text-3xl cursor-pointer" style={customIconStyle} onClick={handleGoBack} />
        <p className="text-white">From Playlist</p>
        {/* <Link href={`/Music/${musicId}/settings`}> */}
          <BsThreeDotsVertical className="text-gray-200 text-3xl cursor-pointer" onClick={openModal}/>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Header;
