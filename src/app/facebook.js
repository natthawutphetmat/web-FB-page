import React from 'react'
import Script from "next/script";
async function getData() {
  const res = await fetch('https://Api-001.com/getpixel')

  
 
  if (!res.ok) {
   
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 


async function facebook() {
  const data = await getData()
  return (
    <>
  {data.length > 0 ? <>
    <Script id='fb-pixel' strategy='afterInteractive'>
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${data[0].pixels}');
              fbq('track', 'PageView');
            `}
          </Script>
</> : <> </>}
             
    </>
  )
}

export default facebook
