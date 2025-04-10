interface FeatureItem {
  emoji: string
  title: string
  description: string
}


const features: FeatureItem[] = [
  { emoji: '✈️', title: 'Your trips', description: 'Plan and organize your personal travel journeys with ease.' },
  { emoji: '💸', title: 'Budget and currency converter', description: 'Budgets with live currency converter' },
  { emoji: '🏨', title: 'Places to stay', description: 'Discover and bookmark accommodations, from hotels to local stays.' },
  { emoji: '🗺️', title: 'Places to visit', description: 'Explore must-see landmarks, hidden gems, and attractions for each destination.' },
  { emoji: '🚗', title: 'Transport', description: 'Manage transportation options including rentals, flights, and public transit.' },
  { emoji: '🎟️', title: 'Events', description: 'Find and save events happening at your destination — concerts, festivals, and more.' },

]

const Features = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-16 max-w-4xl mx-auto">
      {features.map((feature: FeatureItem) => (
        <div key={feature.title} className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <div className="text-4xl m-2">{feature.emoji}</div>
          </figure>
          <div className="card-body">
            <h2 className="card-title">{feature.title}</h2>
            <p>{feature.description}</p>

          </div>
        </div>

      ))}
    </section>
  )
}

export default Features;