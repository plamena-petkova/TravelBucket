export async function fetchTrip(id: string) {
  const res = await fetch(`/api/trips/${id}`);
  if (!res.ok) {
    const errorData = await res.json();
    return errorData; 
  }
  return res.json();
}

  export const fetchTrips= async () => {
    const res = await fetch('/api/trips');
    if (!res.ok) throw new Error('Failed to fetch trips');
    return res.json();
  };