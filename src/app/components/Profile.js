"use client"
import React from 'react';
import { useSession, signOut } from 'next-auth/react';

const Profile = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p> </p>;
  }

  return (
    <div>
  
      <p> {session.user.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Profile;
