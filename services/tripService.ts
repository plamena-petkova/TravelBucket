export async function fetchTrip(id: string) {
  const res = await fetch(`/api/trips/${id}`);
  if (!res.ok) {
    const errorData = await res.json();
    return errorData; 
  }
  return res.json();
}