import { Inter } from "next/font/google";
import "./styles/globals.css";
import "./styles/app.css";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CustomProviders } from "./components/provider";
import Script from "next/script";

import Facebook from "./facebook"
import Facebookno from "./facebookno"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "โทรศัพท์มือถือราคาถูก",
  description: "โทรศัพท์มือถือราคาถูก (สินค้าใหม่) สมาร์ทโฟน PG v9",
};

export default function RootLayout({ children }) {
  return (

  <>
    <html lang="en">
   
      <body className={inter.className}>

             
      <Facebook/>

        <CustomProviders> 
      
        {children}
        </CustomProviders>
      
      
        <Facebookno/>
       
        </body>
    </html>
   
  
  </>
  );
}
