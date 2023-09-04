'use client'

import { BsArrowLeft, BsThreeDotsVertical, BsHeart } from "react-icons/bs";
import { FaPlus, FaPlay, FaTrash, FaTags, FaUser, FaCompactDisc, FaInfoCircle, FaShare } from 'react-icons/fa';
import { useEffect } from "react";

const SettingsPage = () => {
  const customIconStyle = {
    strokeWidth: '1', // Ajuste o valor para alterar a espessura da linha
  };

  const handleGoBack = () => {
    window.history.back(); // Isso volta para a página anterior no histórico de navegação
  };

  useEffect(() => {
    // Adicione um event listener para executar handleGoBack no lado do cliente
    const arrowLeftIcon = document.querySelector(".arrow-left-icon");
    if (arrowLeftIcon) {
      arrowLeftIcon.addEventListener("click", handleGoBack);
    }

    return () => {
      // Remova o event listener quando o componente for desmontado
      if (arrowLeftIcon) {
        arrowLeftIcon.removeEventListener("click", handleGoBack);
      }
    };
  }, []);

  return (
    <div className="container mx-auto min-h-screen flex flex-col bg-dark">
      <div className="pt-8 pb-3">
        <div className="flex items-center justify-around gap-48">
          <BsArrowLeft
            className="text-gray-200 text-3xl cursor-pointer arrow-left-icon"
            style={customIconStyle}
          />

          <BsHeart className="text-gray-200 text-3xl cursor-pointer" />

        </div>
      </div>

      <div className="h-screen flex flex-col flex-1 justify-end px-5 mb-10">

        <ul className="text-white list-none p-0">
          <li className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <FaPlus className="mr-2" />
              <span className="text-lg">Add to playlist</span>
            </div>
          </li>
          <li className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <FaPlay className="mr-2" />
              <span className="text-lg">Add to queue</span>
            </div>
          </li>
          <li className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <FaTrash className="mr-2" />
              <span className="text-lg">Remove from playlist</span>
            </div>
          </li>
          <li className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <FaTags className="mr-2" />
              <span className="text-lg">Modify tags</span>
            </div>
          </li>
          <li className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <span className="text-lg">View artist</span>
            </div>
          </li>
          <li className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <FaCompactDisc className="mr-2" />
              <span className="text-lg">View album</span>
            </div>
          </li>
          <li className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <FaInfoCircle className="mr-2" />
              <span className="text-lg">Show Credits</span>
            </div>
          </li>
          <li className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <FaShare className="mr-2" />
              <span className="text-lg">Share</span>
            </div>
          </li>
        </ul>
      </div>
      
    </div >
  );
};

export default SettingsPage;
