import Drawer from '@/components/Drawer';
import { fetchUserById } from '@/services/userService';
import { ReactNode } from 'react';
import { UserProps } from '@/interfaces/interfaces';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {

  const {id} = await params;

  const user: UserProps = await fetchUserById(id);

  if (!user) return <div>User not found</div>;

  return (
    <div className="lg:flex lg:h-screen md:flex md:h-screen gap-4 sm:flex-row m-3">
      <Drawer user={user} />
      <div className="p-3">{children}</div>
    </div>
  );
}
