import Link from 'next/link';
import React from 'react';
Link
const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footerContent'>
        <div className='logoSection'>
          <img src="/img/img/logo.png" alt="Logo" className='logo'/>
          <p>© 2024 Company Name. All rights reserved.</p>
        </div>
        <div className='linksSection'>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li>Service</li>
            <li>review</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className='socialSection'>
          <h4>Follow Us</h4>
          <div>
            <Link href="https://facebook.com"><img src="/img/fb-icon.png" alt="Facebook" /></Link>
            <Link href="https://Youtube.com"><img src="/img/ty.png" alt="Youtube" /></Link>
            <Link href="https://instagram.com"><img src="/img/it.icon.png" alt="Instagram" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
