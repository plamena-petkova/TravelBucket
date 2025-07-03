'use client'
import Image from "next/image";
import heroImage from '@/public/assets/heroPicture.jpg'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { UserProps } from "@/interfaces/interfaces";
import { useUserStore } from "@/stores/userStore";
import AlertComponent from "@/components/AlertComponent";

export default function Register() {

    const router = useRouter();
    const { setUser } = useUserStore();

    const [form, setForm] = useState<string>('register');
    const [registerValues, setRegisterValues] = useState<UserProps>({ _id: '', name: '', email: '', password: '', avatarUrl:'' })
    const [loginValues, setLoginValues] = useState<UserProps>({ _id: '', email: '', password: '', avatarUrl:'' })
    const [error, setError] = useState<string | null>(null);

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


    const handleRegisterSubmit = async () => {
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerValues),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Registration failed');
            if (res.ok) {
                router.push("/");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (typeof err === 'string') {
                setError(err);
            } else {
                setError('Registration failed!');
            }
        }
    }

    const handleLoginSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const { email, password } = loginValues

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (res?.ok) {
            const userRes = await fetch('/api/user');
            const userData = await userRes.json();
            setUser(userData);
            router.push('/');
        } else {
            setError('Login failed')
        }
    }

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);



    return (
        <>
            {error && (
                <AlertComponent alertPosition='bottom' alertType='alert-error' alertMessage={error} />
            )}
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
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Avatar</legend>
                               <input onChange={(e) => handleRegisterValues(e)} name="avatarUrl" type="url" className="input" placeholder="Type here" />
                            </fieldset>
                           
                            <button type="submit" onClick={handleRegisterSubmit} className="btn btn-primary m-2">Register</button></>}

                        {form === 'login' && <><h2 className="card-title">Login Form</h2>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Email</legend>
                                <input onChange={(e) => handleLoginValues(e)} name="email" type="text" className="input" placeholder="Type here" />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Password</legend>
                                <input onChange={(e) => handleLoginValues(e)} name="password" type="password" className="input" placeholder="Type here" />
                            </fieldset>
                            <button type="submit" onClick={handleLoginSubmit} className="btn btn-primary m-2">Login</button>
                        </>}

                    </div>
                </div>
            </div>
        </>
    )
}