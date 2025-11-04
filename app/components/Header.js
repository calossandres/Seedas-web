'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';

function Header() {
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  // Cambiar color del header según la página
  const headerColor = pathname === '/indexPage' ? '#000E25' : '#212626';

  const headerMenu = [
    { id: 1, name: 'PRODUCTOR', icon: '/feo.jpg', link: '/indexPage', alt: 'Logo productor' },
    { id: 2, name: 'TRANSPORTADOR', icon: '/logov.jpg', link: '/trasportaPage', alt: 'Logo transportador' },
    { id: 3, name: 'TRANSPORTE EN COMUNIDAD', icon: '/logozonaTrabajo.jpg', link: '/zonaTrabajo', alt: 'Logo zona de trabajo' },
  ];

  useEffect(() => {
    if (isLoaded && isSignedIn && pathname === '/') {
      router.push('/indexPage');
    }
  }, [isLoaded, isSignedIn, pathname, router]);

  const handleButtonClick = (name) => {
    const link = headerMenu.find(item => item.name === name)?.link;
    if (link) router.push(link);
  };

  return (
    <header
      className="p-4 md:p-5 border-b-2 border-gray-200"
      style={{ backgroundColor: headerColor }}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
        {/* Logo redondo */}
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/LOGO-SEEDAS.jpg"
            width={60}
            height={60}
            alt="Logo SEEDAS"
            className="rounded-full border-2 border-white shadow-md"
          />
          <span className="text-white text-lg font-semibold hidden md:block">SEEDAS</span>
        </a>

        {/* Menú visible solo si está autenticado */}
        {isSignedIn && (
          <nav className="flex flex-wrap gap-4 md:gap-6 items-center">
            {headerMenu.map((item) => (
              <button
                key={item.id}
                onClick={() => handleButtonClick(item.name)}
                className="flex gap-2 items-center bg-transparent text-white px-2 md:px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                <Image
                  src={item.icon}
                  width={22}
                  height={22}
                  alt={item.alt}
                  className="rounded-full"
                />
                <span className="text-sm md:text-base font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        )}

        {/* Botones de sesión o usuario */}
        <div className="flex items-center gap-2 md:gap-4">
          {!isSignedIn && (
            <>
              <a href="/sign-in">
                <button className="bg-gray-900 text-white px-3 md:px-4 py-2 rounded-md text-sm md:text-base">
                  Iniciar Sesión
                </button>
              </a>
              <a href="/sign-up">
                <button className="bg-gray-900 text-white px-3 md:px-4 py-2 rounded-md text-sm md:text-base">
                  Registrarse
                </button>
              </a>
            </>
          )}
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
