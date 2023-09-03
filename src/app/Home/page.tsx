'use client'

import Footer from "@/components/Footer";
import ContinueListening from "./components/ContinueListening";
import Header from "@/components/Header";
import TopMixes from "./components/TopMixes";
import Recommendation from "./components/Recommendation";
import { useEffect, useState } from "react";

const Home = () => {

  const [teste, setTeste] = useState();

  const CLIENT_ID = "4baee310607f4f12b6e000a5299decb2";
  const CLIENT_SECRET = "44900cac48ed4114990e9f37c47f978f";

  const paramsBody = {
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

  useEffect(() => {
    getAccessToken(CLIENT_ID, paramsBody)

    // getAlbum();



  }, [])


  // Funciona mas é apenas os dados do perfil
  // async function fetchProfile(token: string): Promise<any> {
  //   console.log(`esse é o token ${token}`)
  //   const result = await fetch("https://api.spotify.com/v1/me", {
  //     method: "GET", headers: { Authorization: `Bearer ${token}` }
  //   });
  //   console.log(result);

  //   return await result.json();
  // }



  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark">
        <Header />
      </div>

      <div className="flex-1 pb-24">
        <ContinueListening />
        <TopMixes />
        <Recommendation />
      </div>

      <Footer activePage={"home"} />
    </div>
  );
}

export default Home;
