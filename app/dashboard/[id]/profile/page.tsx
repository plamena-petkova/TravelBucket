'use client'

import { editUserById } from '@/services/userService';
import { useUserStore } from '@/stores/userStore';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

const ProfilePage = () => {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [changedValues, setChangedValues] = useState({
        name: user?.name,
        email: user?.email,
        avatarUrl: user?.avatarUrl
    });

    const handleEditProfile = async () => {
        setOpenModal(!openModal);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setChangedValues({
            name: user?.name,
            email: user?.email,
            avatarUrl: user?.avatarUrl
        })
    }

    const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChangedValues((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSaveProfile = async () => {
        if (!user || !changedValues.name || !changedValues.email) return;

        try {
            const updatedUser = await editUserById(user._id, changedValues);
           const response = await signIn('credentials', {
                redirect: false,
                email: changedValues.email,
                password: user.password, 
            });
            console.log('Response', response);
            setUser(updatedUser);
            setOpenModal(false);
        } catch (error) {
            console.error('Failed to update user:', error);
            alert('Something went wrong while saving.');
        }
    };

    return (
        <>
            {openModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Profile</h3>
                        <input onChange={handleChangeProfile} name='name' type="text" placeholder="Change your name" className="input input-bordered w-full mt-2" value={changedValues.name} />
                        <input onChange={handleChangeProfile} name='email' type="email" placeholder="Change your email" className="input input-bordered w-full mt-2" value={changedValues?.email} />
                        <input onChange={handleChangeProfile} name='image' type="url" placeholder="Change your image link" className="input input-bordered w-full mt-2" value={changedValues?.avatarUrl} />
                        <div className="modal-action">
                            <button onClick={handleSaveProfile} className="btn btn-primary">Save</button>
                            <button onClick={handleCloseModal} className="btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="card w-full bg-base-100 shadow-xl p-6">
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
                        </a> : null}

                    </div>
                </div>

                <div className="mt-6 text-center">
                    <button onClick={handleEditProfile} className="btn btn-primary">
                        Edit My Profile
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
