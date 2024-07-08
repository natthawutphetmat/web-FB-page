"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


export default function Home() {
  const [urls, setUrls] = useState('')
  const router = useRouter();

  useEffect(() => {
    setUrls('https://nextjs.org/');
  })


  useEffect(() => {
    router.push(urls);
  })
  const handleClick = () => {
   
  };

  return (
    <div>
      <h1>หน้าแรก</h1>
      <button onClick={handleClick}>ไปที่หน้าปลายทาง</button>
    </div>
  );
}
