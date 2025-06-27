'use client';
import { UserProps } from '@/interfaces/interfaces';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Drawer = ({ user }: { user: UserProps }) => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (


        <div className=" bg-base-200 p-4">

            <ul className="lg:menu-lg md:menu-md sm:menu-sm menu bg-base-200 rounded-box w-56 h-1/2 justify-around">
                <li><Link className={isActive(`/dashboard/${user._id}`) ? 'bg-red-300' : ''} href={`/dashboard/${user._id}`}>🏠 Dashboard</Link></li>
                <li><Link className={isActive(`/dashboard/${user._id}/trips`) ? 'bg-red-300' : ''} href={`/dashboard/${user._id}/trips`}>✈️ My Trips</Link></li>
                <li><Link className={isActive(`/dashboard/${user._id}/profile`) ? 'bg-red-300' : ''} href={`/dashboard/${user._id}/profile`}>👤 Profile</Link></li>
                <li><Link className="btn btn-accent w-full" href={`/dashboard/${user._id}/add-trip`} >➕ Add Trip</Link></li>
            </ul>
        </div>


    );
};

export default Drawer;
