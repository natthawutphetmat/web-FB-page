import React from 'react'
import Image from 'next/image'
async function getData() {
  const res = await fetch('https://Api-001.com/getpixel')

  
 
  if (!res.ok) {
   
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
 
async function facebookno() {
  const data = await getData()




  return (
    <>
       {data.length > 0 ? <>
        
        <noscript>
              <img
                height='1'
                width='1'
                className='ns'
                alt={'facebook pixel no script image'}
                src={`https://www.facebook.com/tr?id=${data[0].pixels}&ev=PageView&noscript=1`}
              />
            </noscript>
            </> : <> </>}
    </>
  )
}

export default facebookno
