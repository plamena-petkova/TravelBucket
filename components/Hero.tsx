'use client'
import { UserProps } from "@/interfaces/interfaces";
import { fetchUser } from "@/services/userService";
import { useUserStore } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link"

const Hero = () => {


  const { data, error, isLoading } = useQuery<UserProps, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
  });


  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: "url('./assets/heroPicture.jpg')" }}>
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there {data?.name ? <div>{data.name}</div>: ""}</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <Link href="/auth">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero;