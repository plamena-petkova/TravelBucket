// Components/TripOverview.tsx
export default function TripOverview({ trip }: { trip: any }) {
    return (
      <section className="bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto my-8">
        <h2 className="text-3xl font-semibold text-blue-600">Trip Overview</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget */}
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg">💸 Budget</h3>
            <p className="text-xl font-semibold">{trip.budgetAmount} {trip.currency}</p>
          </div>
          
          {/* Transport */}
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg">🚗 Transport</h3>
            <p className="text-xl">{trip.transport}</p>
          </div>
  
          {/* Places to Stay */}
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg">🏨 Places to Stay</h3>
            <ul className="list-disc ml-4">
              {trip.placesToStay.map((place: string, idx: number) => (
                <li key={idx} className="text-lg">{place}</li>
              ))}
            </ul>
          </div>
  
          {/* Places to Visit */}
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg">🗺️ Places to Visit</h3>
            <ul className="list-disc ml-4">
              {trip.placesToVisit.map((place: string, idx: number) => (
                <li key={idx} className="text-lg">{place}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    )
  }
  