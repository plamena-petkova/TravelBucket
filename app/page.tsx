import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Suspense } from "react";
import Loading from "@/components/Loading";


export default function Home() {


  return (

    <main className="min-h-screen bg-white text-gray-900">
      <Suspense fallback={<Loading />}>
        <Hero />
        <Features />
        <Footer />
      </Suspense>
    </main>)
}