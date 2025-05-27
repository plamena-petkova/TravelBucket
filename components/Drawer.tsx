'use client'
import { UserProps } from '@/interfaces/interfaces';
import React, { useState } from 'react';
import TripCard from './TripCard';

function Drawer(user: UserProps) {

    const [menu, setMenu] = useState<string>('')


    const handleSelectMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenu(event.currentTarget.name)
        console.log('Button clicked:', event.currentTarget.textContent);
    }

    return (
        <div>
            <div className="lg:flex md:flex sm:flex-row h-screen m-3">

                <div className=" bg-base-200 p-4">

                    <ul className="lg:menu-lg md:menu-md sm:menu-sm menu bg-base-200 rounded-box w-56">
                        <li>
                            <button name='dashboard' onClick={handleSelectMenu}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>

                                Dashboard

                            </button>
                        </li>
                        <li>
                            <button name='trips' onClick={handleSelectMenu}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                My trips
                            </button>
                        </li>
                        <li>
                            <button name='profile' onClick={handleSelectMenu}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Profile
                            </button>
                        </li>
                    </ul>

                </div>

                {menu === 'dashboard' && <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold">Main Content Area</h1>
                    <h1>Profile: {user.name}</h1>
                    <p>Email: {user.email}</p>
                </div>}

                {menu === 'trips' && <div className='flex justify-center flex-wrap'></div>}

            </div>

        </div>
    );
}

export default Drawer;