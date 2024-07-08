export async function getData() {
    const res = await fetch('https://Api-001.com/api')

    
   
    if (!res.ok) {
     
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }
   
