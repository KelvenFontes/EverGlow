'use client'

import Button from '@/components/Button';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BsSpotify } from 'react-icons/bs'

import { BsApple } from 'react-icons/bs';

const Signin = () => {

  // const { status, data } = useSession();

  const handleLoginClick = () => {
    // signIn();
    const clientId = "c31682f453d342c7a7ebfb81009c987c";
    const redirectUrl = "http://localhost:3000/Home";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-state",
      "user-read-playback-position",
      "user-top-read",
      "user-library-read",
      "user-library-modify"
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&dhow_saialog=true`

  };

  return (
    <div className='flex flex-col items-center justify-center bg-dark h-screen gap-6'>

      <Image src='/iconBlack.png' width={250} height={250} alt='logo' />

      <h1 className='text-white font-semibold text-4xl'>lets get you in</h1>
      {/* {status === 'unauthenticated' && ( */}
      <div className='flex flex-col gap-4'>

        <Button className='flex align-center justify-start gap-5 text-sm font-semibold w-72 pl-10' variant='dark' onClick={handleLoginClick}>
          <BsSpotify color="#00ff00" size={20} />
          Continue with Spotify
        </Button>

        <Button className='flex align-center justify-start gap-5 text-sm font-semibold w-72 pl-10' variant='dark' onClick={handleLoginClick}>
          <Image src='/google.png' height={20} width={20} alt='google' />
          Continue with Google
        </Button>

        <Button className='flex align-center justify-start gap-5 text-sm font-semibold w-72 pl-10' variant='dark' onClick={handleLoginClick}>
          <Image src='/facebook.png' height={20} width={20} alt='facebook' />
          Continue with Facebook
        </Button>

        {/* <Button className='flex align-center justify-start gap-5 text-sm font-semibold w-72' variant='dark' onClick={handleLoginClick}>
            <BsApple />
            Continue with Apple
          </Button> */}

        <div className='flex items-center justify-center'>
          <div className='w-full h-[1px] bg-white'></div>
          <p className='px-5 text-whiteWater whitespace-nowrap'>or</p>
          <div className='w-full h-[1px] bg-white'></div>
        </div>

        <div className='flex flex-col items-center justify-center gap-5'>
          <Button className='flex align-center justify-center gap-5 text-sm font-semibold w-72' onClick={handleLoginClick}>
            Login in with a password
          </Button>
          <p className='text-white'>Dont have an account? <Link href='/signup' className='text-primary'>Sign Up</Link></p>
        </div>

      </div>
      {/* )} */}

      {/* {status === 'authenticated' && data.user && (
        <Button>Tela initial</Button>
      )} */}

    </div>
  );
}

export default Signin;
