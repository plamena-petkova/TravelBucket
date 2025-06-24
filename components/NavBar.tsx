'use client'
import { useUserStore } from '@/stores/userStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const NavBar = () => {
    const clearUser = useUserStore((state) => state.clearUser);
    const user = useUserStore((state) => state.user);
    const router = useRouter();

    const handleLogout = () => {
        clearUser();
        router.push('/');
        const elem = document.activeElement;
        if (elem instanceof HTMLElement) {
            elem.blur();
        }
    }

    const handleDashboardView = () => {
        router.push(`/dashboard/${user?._id}`);
        const elem = document.activeElement;
        if (elem instanceof HTMLElement) {
            elem.blur();
        }

    }


    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link href={'/'} className="btn btn-ghost text-xl">Travel Bucket</Link>
            </div>
            <div className="flex gap-2">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                <div className="dropdown dropdown-end">
                    {user && <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        {user?.avatarUrl ? <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.avatarUrl} /></div> : <div className="avatar avatar-placeholder">
                            <div className=" w-9 rounded-full bg-neutral text-neutral-content">
                                <span>{user?.name?.charAt(0).toUpperCase()}</span>
                            </div>
                        </div>}
                    </div>}

                    <ul

                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <button onClick={handleDashboardView} className="justify-between">
                                Dashboard
                            </button>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;