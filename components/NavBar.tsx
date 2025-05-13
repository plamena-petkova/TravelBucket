'use client'
import { useUserStore } from '@/stores/userStore';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

const NavBar = () => {
    const { clearUser } = useUserStore();
    const user = useUserStore((state) => state.user);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        clearUser();
        setIsDropdownOpen((prev) => !prev);
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
                        {user?.image ? <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /></div> : <div className="avatar avatar-placeholder">
                            <div className=" w-9 rounded-full bg-neutral text-neutral-content">
                                <span>{user?.name?.charAt(0).toUpperCase()}</span>
                            </div>
                        </div>}
                    </div>}

                    <ul

                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link href={`/profile/${user?._id}`}  className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
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