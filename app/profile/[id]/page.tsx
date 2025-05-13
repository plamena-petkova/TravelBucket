import React from 'react';

type Props = {
  params: { id: string };
};

export default function ProfilePage({ params }: Props) {
  const { id } = params;

  return (
    <div>
      <h1>User Profile: {id}</h1>
    </div>
  );
}
