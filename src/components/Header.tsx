'use client'

import Image from "next/image";

import { IoMdNotificationsOutline } from 'react-icons/io';
import { LuSettings } from 'react-icons/lu';
import { BsSliders2Vertical } from 'react-icons/bs';
import { Key, useEffect, useState } from "react";
import Link from "next/link";

interface HeaderProps {
  profile: any;
}

const Header = ({ profile }: HeaderProps) => {

  const [token, setToken] = useState('');
  const [playlists, setPlaylists] = useState<any>([]);


  // async function getCategory(token: string) {

  //   const params = {
  //     // method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + token
  //     },
  //   };

  //   const result = await fetch(`https://api.spotify.com/v1/browse/categories`, params);
  //   const data = await result.json();

  //   console.log(data);

  //   if (data.categories) {
  //     setCategories(data.categories.items);
  //   }

  // }

  async function getPlaylist(token: string) {

    const parame = {
      // method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    };

    const result = await fetch("https://api.spotify.com/v1/me/playlists", parame);
    console.log(result);
    const data = await result.json();
    console.log(data);
    setPlaylists(data.items);
    // setGenres(data.categories.items);
    // console.log(data.categories.items);
  }


  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    setToken(access_token!);
    if (access_token) {
      console.log('Access Token:', access_token);
      // getCategory(access_token);
      // getMusics(access_token)
      getPlaylist(access_token);
    } else {
      console.log('Access Token não encontrado no localStorage.');
    }

  }, []);



  return (
    <>
      <div className="grid grid-cols-3 p-4 pt-6 items-center lg:hidden">
        <div className="col-span-2">
          <div className="flex flex-row items-center gap-4">
            <Image src={'https://i.scdn.co/image/ab6775700000ee85bae311e2dcda70e4644933a3'} alt="image" height={40} width={40} className="rounded-full" />
            <div>
              <p className="text-white font-semibold text-sm">Welcome back!</p>
              <p className="text-gray-300 text-sm">Kelven</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-evenly">
          <BsSliders2Vertical color={'white'} size={18} />
          <IoMdNotificationsOutline color={'white'} size={18} />
          <LuSettings color={'white'} size={18} />
        </div>
      </div>




      {/* <div className="lg:w-1/3">
        <div className="flex flex-row items-center gap-4">
          <Image src={'https://i.scdn.co/image/ab6775700000ee85bae311e2dcda70e4644933a3'} alt="image" height={40} width={40} className="rounded-full" />
          <div>
            <p className="text-white font-semibold text-sm">Welcome back!</p>
            <p className="text-gray-300 text-sm">Kelven</p>
          </div>
        </div>
      </div> */}






      {/* Barra de navegação lateral (condicional) */}
      <div className="hidden lg:flex lg:flex-col p-4 items-start">
        <div className="lg:w-80 mb-3">
          <nav className="bg-dark h-30 text-white py-4 px-2 rounded-xl">
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-center gap-2">
                  <BsSliders2Vertical color={'white'} size={18} />
                  <span>Início</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2">
                  <IoMdNotificationsOutline color={'white'} size={18} />
                  <span>Buscar</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="lg:w-80">
          <nav className="bg-dark h-screen text-white py-4 px-2 rounded-xl">
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-center gap-2">
                  <LuSettings color={'white'} size={18} />
                  <span>Biblioteca</span>
                </a>
              </li>
            </ul>

            {playlists.map((playlist: null | undefined | any) => (

              <div key={playlist?.id} className="flex items-center pb-4" >
                {
                  playlist.images && playlist.images.length > 0 ? (
                    <Image src={playlist.images[0].url} alt={playlist.name} height={50} width={50} className="object-cover rounded-lg" />
                  ) : (
                    <Image src='/icon.png' alt={playlist.name} height={50} width={50} className="object-cover rounded-lg" />
                  )
                }

                < div className="ml-4" >
                  <h3 className="text-lg text-gray-300 font-medium">{playlist.name}</h3>
                </div >
              </div >
            ))}

          </nav>
        </div>

        {/* Ícones de ação no cabeçalho */}
        {/* <div className="lg:hidden flex items-center justify-evenly w-full mt-4">
          <BsSliders2Vertical color={'white'} size={18} />
          <IoMdNotificationsOutline color={'white'} size={18} />
          <LuSettings color={'white'} size={18} />
        </div> */}
      </div>

    </>
  );
}

export default Header;
