import Image from "next/image";

import { IoMdNotificationsOutline } from 'react-icons/io';
import { LuSettings } from 'react-icons/lu';
import { BsSliders2Vertical } from 'react-icons/bs';

const Header = () => {
  return (
    <div className="grid grid-cols-3 p-4 pt-6 items-center">
      <div className="col-span-2">
        <div className="flex flex-row items-center gap-4">
          <Image src='/icon.png' alt="image" height={40} width={40} className="rounded-full" />
          <div>
            <p className="text-white font-semibold text-sm">Welcome back!</p>
            <p className="text-gray-300 text-sm">Kelven</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <BsSliders2Vertical color={'white'} size={18}/>
        <IoMdNotificationsOutline color={'white'} size={18}/>
        <LuSettings color={'white'} size={18}/>
      </div>
    </div>
  );
}

export default Header;
