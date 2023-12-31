// import Image from "next/image";

import Link from "next/link";
import { BsArrowLeft, BsThreeDotsVertical } from "react-icons/bs";

const Header = () => {

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
        <Link href={'/'}>
          <BsThreeDotsVertical className="text-gray-200 text-3xl cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
