'use client'
import Image from "next/image";
import heroImage from '@/public/assets/heroPicture.jpg'
import { useState } from "react";

export default function Register() {
    const [form, setForm] = useState<string>('register');

    const handleForm = (formName: string) => {
        setForm(formName);
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="card flex-col lg:card-side bg-base-100 shadow-sm">
                <figure>
                    <Image
                        src={heroImage}
                        alt="travel" />
                </figure>
                <div className="card-body items-center">
                    <div role="tablist" className="tabs tabs-border">
                        <a
                            onClick={() => handleForm('register')}
                            role="tab"
                            className={`tab ${form === 'register' ? 'tab-active' : ''}`}
                        >
                            Register
                        </a>
                        <a
                            onClick={() => handleForm('login')}
                            role="tab"
                            className={`tab ${form === 'login' ? 'tab-active' : ''}`}
                        >
                            Login
                        </a>
                    </div>
                    {form === 'register' && <><h2 className="card-title">Register Form</h2>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Name</legend>
                            <input type="text" className="input" placeholder="Type here" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input type="text" className="input" placeholder="Type here" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="text" className="input" placeholder="Type here" />
                        </fieldset>
                        <button className="btn btn-primary m-2">Register</button></>}

                    {form === 'login' && <><h2 className="card-title">Login Form</h2>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input type="text" className="input" placeholder="Type here" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="text" className="input" placeholder="Type here" />
                        </fieldset>
                        <button className="btn btn-primary m-2">Login</button>
                    </>}
                </div>
            </div>
        </div>
    )
}