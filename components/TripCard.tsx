import { TripProps } from '@/interfaces/interfaces';
import React from 'react';

interface TripCardProps {
    trip: TripProps;
}


const TripCard = ({ trip }: TripCardProps) => {

    const handleClick = () => {
        console.log('ClickTrip', trip)
    }

    return (
        <div className='m-3 p-3'>
            <div
                onClick={handleClick}
                role="button"
                tabIndex={0}
                className="cursor-pointer lg:card md:card-md sm:card-sm w-96 bg-base-100 shadow-sm hover:shadow-md transition"
                onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            >
                <div className="card-body">
                    <h2 className="card-title">{trip.title}</h2>
                    <p>
                        {trip.description}</p>
                    <div className="flex items-center-safe"> <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                    </svg>
                        <p>{trip.startDateTrip}</p>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                        </svg>
                        <p>{trip.endDateTrip}</p></div>
                    <div className='flex items-center-safe'>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 0v6M9.5 9A2.5 2.5 0 0 1 12 6.5" />
                        </svg><p>{trip.destination.city}, {trip.destination.country}</p>

                    </div>

                </div>
                <figure className="w-96 h-52 overflow-hidden">
                    <img
                        src={trip.coverImageUrl}
                        alt={trip.coverImageUrl?.at(3)}
                        className="w-full h-full object-cover"
                    />
                </figure>
            </div>

        </div>
    );
};

export default TripCard;