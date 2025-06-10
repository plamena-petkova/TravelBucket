export const fetchUser = async () => {
    const res = await fetch('/api/user');
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  };

  export const fetchTrips= async () => {
    const res = await fetch('/api/trips');
    if (!res.ok) throw new Error('Failed to fetch trips');
    return res.json();
  };