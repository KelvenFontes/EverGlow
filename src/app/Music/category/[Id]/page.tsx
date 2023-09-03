'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

// interface CardTopMixesProps {
//   category: SpotifyCategory;
// }

const CategoryList = ({ params }: { params: { Id: string } }) => {

  const [teste, setTeste] = useState();
  const [token, setToken] = useState<string | undefined | null>();
  const [genres, setGenres] = useState<SpotifyCategory[]>([]);
  const categoryId = params.Id;

  const paramse = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + token
    },
    // body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
  };

  async function getRecommendationGenres() {
    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${categoryId}`, paramse);
    console.log(result);
    const data = await result.json();
    console.log(data);
    setGenres(data.categories.items);
    console.log(data.categories.items);

    // const { access_token } = await result.json();
    // console.log(access_token);
    // setTeste(access_token);

    // Armazene o access_token no localStorage
    // localStorage.setItem('access_token', access_token);
    // return access_token;
  }



  useEffect(() => {
    // getAccessToken(CLIENT_ID, paramsBody)

    const token = localStorage.getItem('access_token');
    setToken(token);

    getRecommendationGenres();
    // getAlbum();



  }, [])


  return (
    <div className="flex items-center h-32 w-32 rounded-md">
      <div className="relative h-32 w-32">
        <p>teste</p>
        {/* <Image src={category.icons[0].url} alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill /> */}
        {/* <p className="text-gray-100 text-sm font-bold absolute top-2 left-4 right-0 bottom-0 flex">{category.name}</p> */}
      </div>
    </div>
  );
}

export default CategoryList;
function setToken(token: string | null) {
  throw new Error("Function not implemented.");
}

