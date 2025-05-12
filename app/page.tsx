import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import connectDB from "@/config/database";
import NavBar from "@/components/NavBar";


export default function Home() {

  return (
    <Suspense fallback={<Loading />}>
      <NavBar />
      <Hero />
      <Features />
      <Footer />
    </Suspense>
  )
}