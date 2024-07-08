"use client"
import React, { useEffect, useState } from 'react';
import { getData } from './data';
import Card from './components/Card';
import Game from './components/Game';

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
    <> 
      {data.length > 0 ? <Card /> : <Game />}
      </>
  );
}