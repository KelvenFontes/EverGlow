'use client'

import Link from 'next/link';
import { BiBookBookmark, BiHomeAlt2, BiSearchAlt2 } from 'react-icons/bi';

import { useButtonState } from './ButtonState';

const Footer = () => {

  const { activeButton, setActiveButton } = useButtonState();

  return (
    <div className="flex items-center justify-around bg-black py-4 pb-5 fixed bottom-0 left-0 right-0">
      <Link href="/Home">
        <button
          onClick={() => setActiveButton('home')}
          className={`flex flex-col items-center justify-center gap-1 ${activeButton === 'home' ? 'text-primary' : 'text-white'
            } cursor-pointer text-2xl`}
        >
          <BiHomeAlt2 className="size-20" />
          <span className="text-sm font-semibold">Home</span>
        </button>
      </Link>

      <Link href="/Search">
        <button
          onClick={() => setActiveButton('explore')}
          className={`flex flex-col items-center justify-center gap-1 ${activeButton === 'explore' ? 'text-primary' : 'text-white'
            } cursor-pointer text-2xl`}
        >
          <BiSearchAlt2 className="size-20" />
          <span className="text-sm font-semibold">Explore</span>
        </button>
      </Link>

      <Link href="/Library">
        <button
          onClick={() => setActiveButton('library')}
          className={`flex flex-col items-center justify-center gap-1 ${activeButton === 'library' ? 'text-primary' : 'text-white'
            } cursor-pointer text-2xl`}
        >
          <BiBookBookmark className="size-20" />
          <span className="text-sm font-semibold">Library</span>
        </button>
      </Link>

    </div>
  );
}

export default Footer;
