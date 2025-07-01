import { UserProps } from "@/interfaces/interfaces";

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

export const fetchUserById = async (id: string) => {
  const isServer = typeof window === "undefined";
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    : "";

  const res = await fetch(`${baseUrl}/api/user/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
};

export const editUserById = async (
  id: string,
  data: Partial<UserProps>
): Promise<UserProps> => {
  const isServer = typeof window === "undefined";
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    : "";

  const response = await fetch(`${baseUrl}/api/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  const updatedUser: UserProps = await response.json();
  return updatedUser;
};
