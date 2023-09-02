import { BiBookBookmark, BiHomeAlt2, BiSearchAlt2 } from 'react-icons/bi';

const Footer = () => {
  return (
    <div className="flex items-center justify-around bg-black py-4 pb-5">
      <div className='flex flex-col items-center justify-center gap-1'>
        <BiHomeAlt2 className='text-primary' size={20}/>
        <span className='text-primary text-sm font-semibold'>Home</span>
      </div>
      <div className='flex flex-col items-center justify-center gap-1'>
        <BiSearchAlt2 className='text-white' size={20}/>
        <span className='text-white text-sm font-semibold'>Explore</span>
      </div>
      <div className='flex flex-col items-center justify-center gap-1'>
        <BiBookBookmark className='text-white' size={20}/>
        <span className='text-white text-sm font-semibold'>Library</span>
      </div>
    </div>
  );
}

export default Footer;
