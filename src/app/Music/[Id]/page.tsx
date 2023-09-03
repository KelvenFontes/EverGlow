'use client'

import Footer from "@/components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { access } from "fs";


const Search = () => {

  const [teste, setTeste] = useState();

  const CLIENT_ID = "4baee310607f4f12b6e000a5299decb2";
  const CLIENT_SECRET = "44900cac48ed4114990e9f37c47f978f";

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
  };



  async function getAccessToken(clientId: string, code: any): Promise<string> {
    const result = await fetch("https://accounts.spotify.com/api/token", code);
    console.log(result);
    const { access_token } = await result.json();
    console.log(access_token);
    setTeste(access_token);

    // Armazene o access_token no localStorage
    localStorage.setItem('access_token', access_token);
    return access_token;
  }


  // Funciona mas é apenas os dados do perfil
  // async function fetchProfile(token: string): Promise<any> {
  //   console.log(`esse é o token ${token}`)
  //   const result = await fetch("https://api.spotify.com/v1/me", {
  //     method: "GET", headers: { Authorization: `Bearer ${token}` }
  //   });
  //   console.log(result);

  //   return await result.json();
  // }



  async function getAlbum() {

    const paramsAlbum = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + teste
      },
    };

    const result = await fetch(`https://api.spotify.com/v1/search?q=gustavo&type=artist`, paramsAlbum);
    console.log(result);
  }

  useEffect(() => {
    getAccessToken(CLIENT_ID, params)

    getAlbum();

    // async function tesete() {
    //   const profile = await fetchProfile(await tokenAcess);
    //   console.log(profile);
    // }
    // tesete();

  }, [])

  return (
    <div className="container mx-auto min-h-screen flex flex-col bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark">
        <Header />
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

export default Search;
