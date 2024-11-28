'use client';  
import React, { useEffect, useState } from 'react'; // Importar useState  
import Image from 'next/image';  
import { UserButton, useUser } from '@clerk/nextjs';  
import { useRouter } from 'next/navigation';  

function Header() {  
    const [headerColor, setHeaderColor] = useState('#212626'); // Estado para el color del header  

    const headerMenu = [  
        {  
            id: 2,  
            name: 'PRODUCTOR',  
            icon: '/feo.jpg',  
            link: '/indexPage',  
            alt: 'Logo productor'  
        },  
        {  
            id: 1,  
            name: 'TRANSPORTADOR',  
            icon: '/logov.jpg',  
            link: '/trasportaPage',  
            alt: 'Logo transportador'  
        },  
        {  
            id: 3,  
            name: 'ZONA DE TRABAJO',  
            icon: '/logozonaTrabajo.jpg',  
            link: '/zonaTrabajo',  
            alt: 'Logo zona de trabajo'  
        }  
    ];  

    const router = useRouter();  
    const { isSignedIn } = useUser();  

    useEffect(() => {  
        if (isSignedIn) {  
            router.push('/indexPage');  
        }  
    }, [isSignedIn, router]);  

    const handleUserClick = () => {  
        if (isSignedIn) {  
            router.push('/indexPage');  
        } else {  
            router.push('/sign-in');  
        }  
    };  

    const handleButtonClick = (name) => {  
        if (name === 'TRANSPORTADOR') {  
            setHeaderColor('#000E25'); // Cambia a azul oscuro  
        } else {  
            setHeaderColor('#212626'); // Mantiene el color original  
        }  
        router.push(headerMenu.find(item => item.name === name).link);  
    };  

    return (  
        <div className='p-5 pb-3 pl-10 border-b-[2px] border-gray-200 flex items-center justify-between' style={{ backgroundColor: headerColor }}>  
            <div className='flex gap-24 items-center'>  
                <a href="/indexPage">  
                    <Image   
                        src='/LOGO-SEEDAS.jpg'  
                        width={70}  
                        height={100}  
                        alt='Logo SEEDAS'  
                        className="cursor-pointer rounded-md" // Agregar clase para redondear esquinas  
                    />  
                </a>  
                <div className='flex gap-6 items-center'>  
                    {headerMenu.map((item) => (  
                        <button   
                            key={item.id}   
                            className='flex gap-2 items-center bg-transparent text-white px-4 py-2 rounded-md cursor-pointer'  
                            onClick={() => handleButtonClick(item.name)} // Actualiza el clic  
                        >  
                            <Image  
                                src={item.icon}  
                                width={20}  
                                height={20}  
                                alt={`Icono de ${item.name}`}  // Descripción clara y precisa  
                                className="rounded-full"  
                            />  
                            <h2 className='text-[14px] font-medium'>{item.name}</h2>  
                        </button>  
                    ))}  
                </div>  
            </div>  
            {!isSignedIn && (  
            <div className='flex gap-4 ml-auto'>  
                <a href="/sign-in">  
                    <button className='bg-gray-900 text-white px-8 py-2 rounded-md cursor-pointer'>Iniciar Sesión</button>  
                </a>  
                <a href="/sign-up">  
                    <button className='bg-gray-900 text-white px-4 py-2 rounded-md cursor-pointer mr-4'>Registrarse</button>  
                </a>  
            </div>  
            )}  
            <div className="mr-4">  
                <UserButton />  
            </div>  
        </div>  
    );  
}  

export default Header;
