import { TripProps } from '@/interfaces/interfaces';
import React from 'react';

interface TripCardProps {
    trip: TripProps;
}


const TripCard = ({ trip }: TripCardProps) => {

    const handleClick = () => {
        console.log('Click', trip)
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
                    <p>{trip.description}</p>
                    <div className="flex"> <p>{trip.startDateTrip}</p>
                        <p>{trip.endDateTrip}</p></div>
                    <div>
                        <p>{trip.destination.city}, {trip.destination.country}</p>

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