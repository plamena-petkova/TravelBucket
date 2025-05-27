import { TripProps } from '@/interfaces/interfaces';
import React from 'react';

const TripCard = (trip: TripProps) => {

    const handleClick = () => {
        console.log('Click')
    }

    return (
        <div className='m-3 p-3'>
            <div
                onClick={handleClick}
                role="button"
                tabIndex={0}
                className="cursor-pointer lg:card md:card-md sm:card-sm bg-base-100 w-96 shadow-sm hover:shadow-md transition"
                onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            >
                <div className="card-body">
                    <h2 className="card-title">Card Title</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                </div>
                <figure>
                    <img
                        src="https://cdn.pixabay.com/photo/2025/03/31/21/30/italy-9505446_1280.jpg"
                        alt="Trips" />
                </figure>
            </div>
        </div>
    );
};

export default TripCard;