'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CardMusicByPlaylistProps {
  musicByPlaylist: any;
}

const CardMusicByPlaylist = ({ musicByPlaylist }: CardMusicByPlaylistProps) => {

  console.log(musicByPlaylist);


  useEffect(() => {

    // const autenticato = localStorage.getItem('access_token');


    setTimeout(() => {
      // getMusicByPlaylist()
    }, 2000)
  }, [])



  return (
    <div>
      {
        musicByPlaylist.track? (
          <div key={musicByPlaylist.track.id} className="flex items-center pb-4" >
            {
              musicByPlaylist.track.images && musicByPlaylist.track.images.length > 0 ? (
                <Image src={musicByPlaylist.track.images[0].url} alt={musicByPlaylist.track.name} height={80} width={80} className="object-cover rounded-xl" />
              ) : (
                <Image src='/icon.png' alt={musicByPlaylist.track.name} height={80} width={80} className="object-cover rounded-xl" />
              )
            }

            < div className="ml-4" >
              <h3 className="text-lg  font-medium">{musicByPlaylist.track.name}</h3>
            </div >
          </div >
        ) : null}
    </div>
  );
}

export default CardMusicByPlaylist;
