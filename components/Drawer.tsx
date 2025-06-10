'use client'
import {  UserProps } from '@/interfaces/interfaces';
import React, { useState } from 'react';
import TripCard from './TripCard';
import { useTripsStore } from '@/stores/userStore';


function Drawer(user: UserProps) {

    const trips = useTripsStore((state) => state.trips);
    console.log('Trips', trips);

    const [menu, setMenu] = useState<string>('')


    const handleSelectMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenu(event.currentTarget.name)
        console.log('Button clicked:', event.currentTarget.textContent);
    }

    return (
        <div>
            <div className="lg:flex md:flex sm:flex-row h-screen m-3">

                <div className=" bg-base-200 p-4">

                    <ul className="lg:menu-lg md:menu-md sm:menu-sm menu bg-base-200 rounded-box w-56 h-1/2 justify-around">
                        <li>
                            <button name='dashboard' onClick={handleSelectMenu}>
                                🏠 Dashboard
                            </button>
                        </li>
                        <li>
                            <button name='trips' onClick={handleSelectMenu}>
                                ✈️ My Trips
                            </button>
                        </li>
                        <li>
                            <button name='profile' onClick={handleSelectMenu}>
                                👤 Profile

                            </button>
                        </li>
                        <li>
                            <a className='btn btn-accent w-full' href={`${user._id}/add-trip`}>➕ Add Trip</a>
                        </li>
                    </ul>

                </div>

                {menu === 'dashboard' && <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold">Main Content Area</h1>
                    <h1>Profile: {user.name}</h1>
                    <p>Email: {user.email}</p>
                </div>}

                {menu === 'trips' && <div className='flex justify-center flex-wrap'>{trips?.map((trip) => {
                    return <TripCard trip={trip}/>
                })}</div>}

            </div>

        </div>
    );
}

export default Drawer;