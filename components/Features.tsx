import TripOverview from "../components/TripOverview";


const Features = ({ trip }: { trip: any }) => {
  return (
    <section className="bg-white p-8 shadow-lg rounded-lg max-w-6xl mx-auto my-8">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
        Explore Your Trip Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <TripOverview trip={trip} />
        </div>
      </div>
    </section>
  );
};

export default Features;
