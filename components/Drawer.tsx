'use client';
import { UserProps } from '@/interfaces/interfaces';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Drawer = ({ user }: { user: UserProps }) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="bg-base-200 p-4 w-56">
      <ul className="menu rounded-box">
        <li><Link className={isActive(`/dashboard/${user._id}`) ? 'active' : ''} href={`/dashboard/${user._id}`}>🏠 Dashboard</Link></li>
        <li><Link className={isActive(`/dashboard/${user._id}/trips`) ? 'active' : ''} href={`/dashboard/${user._id}/trips`}>✈️ My Trips</Link></li>
        <li><Link className={isActive(`/dashboard/${user._id}/profile`) ? 'active' : ''} href={`/dashboard/${user._id}/profile`}>👤 Profile</Link></li>
        <li><Link href={`/dashboard/${user._id}/add-trip`} className="btn btn-accent w-full">➕ Add Trip</Link></li>
      </ul>
    </div>
  );
};

export default Drawer;
