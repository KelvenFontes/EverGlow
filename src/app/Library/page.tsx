'use client'

import Footer from "@/components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import CardCategoryName from "./components/CardCategoryName";

const Search = () => {

  const [categories, setCategories] = useState<SpotifyCategoryItem[]>([]);

  const access_token = localStorage.getItem('access_token');

  async function getCategory(token: string) {

    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };

    const result = await fetch(`https://api.spotify.com/v1/browse/categories`, params);
    const data = await result.json();

    console.log(data);

    if (data.categories) {
      setCategories(data.categories.items);
    }

  }

  useEffect(() => {
    if (access_token) {
      console.log('Access Token:', access_token);
      getCategory(access_token);
    } else {
      console.log('Access Token não encontrado no localStorage.');
    }

  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark">
        <Header />
      </div>


      <div className="relative flex items-center lg:justify-center">
        <div className="w-full overflow-x-hidden scroll whitespace-nowrap scroll-smooth scrollbar-hide lg:flex lg:items-center lg:justify-center">
          <div className="flex flex-wrap ">
            {categories.map((category: SpotifyCategoryItem, i: number) => (
              <div key={category.id} className="border rounded-full px-3">
                <p className="text-white">{category.name}</p>
              </div>
            ))}

          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
}

export default Search;
