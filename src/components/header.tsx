/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { LOGIN_ROUTE, REGISTER_ROUTE } from 'src/constants/routes';
import { app, auth } from 'src/services/firebase';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from 'src/assets/logo.png';
const Header = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const initialState = {
    user: null,
    isLogin: false,
  };
  const [user, setUser] = useState<any>(initialState);

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((userState) => {
      setUser({ isLogin: userState ? true : false, user: userState });
      setLoading(false);
    });
    return subscribe;
  }, []);

  async function handleLogout() {
    await signOut(getAuth(app));

    await fetch('/api/logout');

    router.push('/login');
  }

  return (
    <header className="h-20 flex px-10 px-sm-5 shadow-md text-black">
      <nav className="w-full mx-auto flex justify-between items-center px-2 text-black font-serif text-xl">
        <div>
          <Image src={logo} alt="Logo" width={150} height={50} />
        </div>
        <ul className="flex gap-4">
          {!user?.isLogin && (
            <>
              <Link href={LOGIN_ROUTE}>
                <li>Login</li>
              </Link>
              <Link href={REGISTER_ROUTE}>
                <li>Register</li>
              </Link>
            </>
          )}
          {user?.isLogin && (
            <>
              <li className=" cursor-pointer" onClick={handleLogout}>
                Logout
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
