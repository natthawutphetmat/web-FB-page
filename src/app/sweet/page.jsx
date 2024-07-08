"use client"
import React, { useEffect, useState } from 'react';
import { getData } from './data';
import Home from '../home/page';
import Admin from '../admin/page';

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.length > 0 ? <Home /> : <Admin />}
    </div>
  );
}
