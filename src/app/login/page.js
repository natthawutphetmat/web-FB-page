'use client';

import { useState, useEffect } from 'react';
import { getCsrfToken } from 'next-auth/react';

export default function SignIn() {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };

    fetchCsrfToken();
  }, []);

  return (
   <>
   <div className="login">
   <form method="post" className='loginform' action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
    
        <input name="username" type="text" className='form-control mb-3 mt-3'placeholder="username" />

     
        <input name="password" type="password" className='form-control'placeholder="password" />
    
      <br />
      <button type="submit" className='btn btn-info'>Sign in</button>
    </form>
   </div>
   
   </>
  );
}
