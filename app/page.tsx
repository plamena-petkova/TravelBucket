import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import connectDB from "@/config/database";


export default function Home() {

  return (
    <Suspense fallback={<Loading />}>
      <Hero />
      <Features />
      <Footer />
    </Suspense>
  )
}