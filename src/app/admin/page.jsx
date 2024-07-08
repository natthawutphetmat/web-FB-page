"use client"

import React from 'react'
import Getitem from './Getitem'
import Item from './Item'
import Fromadds from './Fromadds'
import Sweets from './Sweets'
import Navbar from "../components/Navbar";


import { useSession } from 'next-auth/react';

function Admin  () {
  const { data: session } = useSession();

  if (!session) {


    return (<>  
      <div className="container">
        <div className="text-center mt-5">
          <h3> กรุณา Login ก่อน </h3>
          <a href="/login">Login</a>
        </div>
      </div>
      
       </>);
  
  }
  return (

    <div  >
      <Navbar />
      <div className='container'>
      <div className="d-flex justify-content-around">


     <div className="text-center">
     <Fromadds />
     </div>

     <div className="text-center">
      <Item/>
      </div>
      <div className="text-center">
      <Sweets />
      </div>
      </div>

   
    
      <div className='itmes'>  </div>
 
  
  <Getitem/>
 </div>
 </div>
   
  );
};

export default Admin

