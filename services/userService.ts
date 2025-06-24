export const fetchUser = async () => {
  const res = await fetch("/api/user");
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
};

export const fetchUsers = async () => {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};
