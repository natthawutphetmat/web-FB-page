"use client"
import { useRouter } from 'next/navigation';
import { getData } from './data'
import React, { useState, useEffect } from 'react';

function Page() {
  const [urls, setUrls] = useState('');
  const [url, setUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();

      if (data && data[0] && data[0].urls) {
        setUrls(data[0].urls);
      } else {
        setUrl('ขออภัยในความไม่สะดวก กรุณาติดต่อ Admin ผ่านแชทแฟนเพจ Facebook ');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    router.push(urls);
  })

  return (
    <div className='text-center mt-5 h1 p-2'>
    {url}
    </div>
  );
}

export default Page;
