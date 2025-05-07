'use client'
import Image from "next/image";
import heroImage from '@/public/assets/heroPicture.jpg'
import React, { useState } from "react";

interface UserProps {
    name?: String,
    email: String,
    password: String
}

export default function Register() {
    const [form, setForm] = useState<string>('register');
    const [registerValues, setRegisterValues] = useState<UserProps>({ name: '', email: '', password: '' })
    const [loginValues, setLoginValues] = useState<UserProps>({ email: '', password: '' })

    const handleForm = (formName: string) => {
        setForm(formName);
    }

    const handleRegisterValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }

    const handleLoginValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }

    const handleSubmit = async () => {
    console.log('submit')
        try {
            const res = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerValues),
            });

            const data = await res.json();
            console.log('res', data)
            if (!res.ok) throw new Error(data.message || 'Registration failed');
            alert('Registration successful!');
        } catch (err) {
            console.error(err);
            alert('Registration error!');
        }

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
                            <input onChange={(e) => handleRegisterValues(e)} name="name" type="text" className="input" placeholder="Type here" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input onChange={(e) => handleRegisterValues(e)} name="email" type="text" className="input" placeholder="Type here" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input onChange={(e) => handleRegisterValues(e)} name="password" type="text" className="input" placeholder="Type here" />
                        </fieldset>
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary m-2">Register</button></>}

                    {form === 'login' && <><h2 className="card-title">Login Form</h2>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input onChange={(e) => handleLoginValues(e)} name="email" type="text" className="input" placeholder="Type here" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input onChange={(e) => handleLoginValues(e)} name="password" type="text" className="input" placeholder="Type here" />
                        </fieldset>
                        <button onClick={() => console.log('Login Values', loginValues)} className="btn btn-primary m-2">Login</button>
                    </>}
                </div>
            </div>
        </div>
    )
}