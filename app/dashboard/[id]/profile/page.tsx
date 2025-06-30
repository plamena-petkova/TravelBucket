'use client'

import { useUserStore } from '@/stores/userStore';
import React from 'react';

const ProfilePage = () => {
    const user = useUserStore((state) => state.user);

    const handleEditProfile = () => {
        // Add logic here
    }

    return (
        <>
            <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-6">
                <h1 className="text-4xl font-bold text-center mb-2">Welcome to your Profile!</h1>
                <h2 className="text-3xl font-semibold text-center mb-3">{user?.name}</h2>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            {user?.avatarUrl ? <img src={user?.avatarUrl} alt="Avatar" /> : <div className="avatar avatar-placeholder">
                                <div className=" w-24 rounded-full bg-neutral text-neutral-content">
                                    <span className='text-4xl'>{user?.name?.charAt(0).toUpperCase()}</span>
                                </div>
                            </div>}

                        </div>
                    </div>

                    <div className="text-center sm:text-left space-y-1">
                        <p className="text-lg font-medium text-base-content">{user?.name}</p>
                        <p className="text-sm text-base-content">{user?.email}</p>
                        {(user && user.avatarUrl) ? <a
                            href={user?.avatarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline cursor-pointer"
                        >
                            View Profile Picture
                        </a> : null }
                        
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <button onClick={handleEditProfile} className="btn btn-primary">
                        Edit My Profile
                    </button>
                </div>
            </div>


            <input type="checkbox" id="edit-profile-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Profile</h3>
                    <input type="text" placeholder="Name" className="input input-bordered w-full mt-2" />
                    <input type="email" placeholder="Email" className="input input-bordered w-full mt-2" />


                    <div className="modal-action">
                        <label htmlFor="edit-profile-modal" className="btn btn-primary">Save</label>
                        <label htmlFor="edit-profile-modal" className="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
