"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

const Getitem = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://Api-002.com/api/images');
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://Api-002.com/api/images/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };




  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
  
      <div className='box' >
       
          {data.map((item, index) => (
           
            <div className='boxitem' key={index}>
               <div className='citem' >
            <img src={`https://Api-002.com/${item.url}`} className='item' width="100%"/>
            
           

          
            </div>
            <button onClick={() => handleDelete(item.id)} className='btn btn-danger mb-5' >ลบ</button>
            </div>
          ))}
       
      </div>
    </div>
  );
};

export default Getitem;