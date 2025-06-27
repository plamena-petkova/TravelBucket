import { TripFormState } from "@/interfaces/interfaces";

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


export async function createTrip(trip: TripFormState): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const res = await fetch('/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trip),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error?.errors?.title?.message || 'Unknown error' };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: 'Network error' };
  }
}
