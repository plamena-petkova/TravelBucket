import Drawer from "@/components/Drawer";
import { UserProps } from "@/interfaces/interfaces";

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

  
  const user = await res.json() as UserProps;

 
  return (
    <div>
      <Drawer {...user} />
    </div>
  );
}
