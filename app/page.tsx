
import Footer from "@/components/Footer";
import Hero from "./../components/Hero";
import Features from "@/components/Features";


export default function Home() {

  const trip = {
    destination: "Paris",
    startDate: "2023-06-01",
    endDate: "2023-06-15",
    budgetAmount: 1000,
    currency: "USD",
    placesToStay: ["Hotel A", "Airbnb B", "Hostel C"],
    placesToVisit: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
    transport: "Train",
    events: ["Football Match", "Concert"],
  };
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Hero />
      <Features trip={trip} />
      <Footer />
    </main>
  )
}