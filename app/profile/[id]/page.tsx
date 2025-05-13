// app/profile/[id]/page.tsx

type Props = {
  params: { id: string };
};

export default async function ProfilePage({ params }: Props) {
  const { id } = await params; 


  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    cache: 'no-store', 
  });

 
  if (!res.ok) {
    return (
      <div>
        <h1>User not found</h1>
      </div>
    );
  }

  
  const user = await res.json();

 
  return (
    <div>
      <h1>Profile: {user.name}</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
