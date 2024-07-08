"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from "../components/Navbar";
const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  const router = useRouter();


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

  const myurls = (e) =>{
    router.push('/myurl');
  }

  return (
    < >
  <Navbar/>
      <div className='box' >
       
          {data.map((item, index) => (
            <div key={index}>
               <div className='item' onClick={myurls} >

            <img src={`https://Api-002.com/${item.url}`} className='itemimg' width="100%"/>
            
            </div>
            </div>
          ))}
       

       <div className="fixed-bottom mb-3">
      
       
       <Link type="button" href="https://main.365win.me/register?f=MzY1YTgxMA==" className="btn btn-primary">สมัครรับสิทธิพิเศษกันเลย</Link>

 
       </div>


      </div>
    </>
  );
};

export default Home;