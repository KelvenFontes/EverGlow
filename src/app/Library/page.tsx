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

      <div className="relative flex items-center pt-8 px-5 lg:justify-center ">
        <div className="w-full overflow-x-hidden scrollbar-hide whitespace-no-wrap">
          <div className="flex space-x-4">
            {categories.map((category: SpotifyCategoryItem, i: number) => (
              <div key={category.id}>
                <CardCategoryName category={category} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pt-8">
        <h3 className="text-primary font-semibold text-lg tracking-widest">Recently played</h3>
      </div>

      <Footer />
    </div>
  );
}

export default Search;